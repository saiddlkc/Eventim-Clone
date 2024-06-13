import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet, useParams } from "react-router-dom";

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_ACCES_KEY;

const AllCities = () => {
  const [events, setEvents] = useState([]);
  const [cityImage, setCityImage] = useState("");
  const { city } = useParams(); // Hole den Stadtnamen aus der URL

  useEffect(() => {
    if (city) {
      axios
        .get("http://localhost:4000/dashboard/event")
        .then((response) => {
          const cityEvents = response.data.filter(
            (event) => event.ort.stadt.toLowerCase() === city.toLowerCase()
          );
          setEvents(cityEvents);
          console.log(cityEvents);
        })
        .catch((error) => {
          console.error("There was an error fetching the events!", error);
        });

      // Unsplash API Anfrage
      axios
        .get(
          `https://api.unsplash.com/search/photos?page=1&query=${city}&client_id=${UNSPLASH_ACCESS_KEY}`
        )
        .then((response) => {
          if (response.data.results.length > 0) {
            setCityImage(response.data.results[1].urls.regular);
            console.log(setCityImage);
          } else {
            setCityImage("");
          }
        })
        .catch((error) => {
          console.log(UNSPLASH_ACCESS_KEY);
          console.error("There was an error fetching the city image!", error);
        });
    }
  }, [city]);

  return (
    <div>
      <Outlet />
      <div className="flex flex-col">
        <div>
          {cityImage && (
            <img
              className="bg- w-full h-96 object-scale-down"
              src={cityImage}
              alt={city}
            />
          )}
          <p>{city.toUpperCase()}</p>
        </div>
        <div className="flex flex-wrap">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event._id}
                className="p-4 m-4 border-red-700 border-2 w-96"
              >
                <h2>{event.titel}</h2>
                <img className="w-72 h-52" src={event.bild} alt={event.titel} />
                <p>
                  Hier geht weiter zu den Tickets für{" "}
                  <Link to={`/events/${event._id}`}>
                    <span className="text-orange-700">{event.titel}</span>
                  </Link>
                </p>
              </div>
            ))
          ) : (
            <p>No events found for {city}.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCities;
