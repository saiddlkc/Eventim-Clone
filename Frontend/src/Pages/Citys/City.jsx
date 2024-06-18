import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet, useParams } from "react-router-dom";
import { format } from "date-fns";
import "../../index.css";

const cityImages = {
  berlin:
    "https://www.eventim.de/obj/media/DE-eventim/teaser/cities/evoHeader/berlin-city-header-1440x244.jpg",
  hamburg:
    "https://www.eventim.de/obj/media/DE-eventim/teaser/cities/evoHeader/hamburg-city-header-1440x244.jpg",
  münchen:
    "https://www.eventim.de/obj/media/DE-eventim/teaser/cities/evoHeader/muenchen-city-header-1440x244.jpg",
  köln:
    "https://www.eventim.de/obj/media/DE-eventim/teaser/cities/evoHeader/koeln-city-header-1440x244.jpg",
  frankfurt:
    "https://www.eventim.de/obj/media/DE-eventim/teaser/cities/evoHeader/frankfurt-city-header-1440x244.jpg",
  stuttgart:
    "https://www.eventim.de/obj/media/DE-eventim/teaser/cities/evoHeader/stuttgart-city-header-1440x244.jpg",
  leipzig:
    "https://www.eventim.de/obj/media/DE-eventim/teaser/cities/evoHeader/leipzig-city-header-1440x244.jpg",
  bremen:
    "https://www.eventim.de/obj/media/DE-eventim/teaser/cities/evoHeader/bremen-city-header-1440x244.jpg",
  düsseldorf:
    "https://www.eventim.de/obj/media/DE-eventim/teaser/cities/evoHeader/duesseldorf-city-header-1440x244.jpg",
};

const City = () => {
  const [events, setEvents] = useState([]);
  const [cityImage, setCityImage] = useState("");
  const { city } = useParams();

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

      if (cityImages[city]) {
        setCityImage(cityImages[city]);
      } else {
        setCityImage("");
      }
    }
  }, [city]);

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd.MM.yyyy");
  };

  const formatTime = (dateString) => {
    return format(new Date(dateString), "HH:mm");
  };

  return (
    <div>
      <Outlet />
      <div className="flex flex-col">
        <div className="flex bg-orange-500 items-center justify-start relative">
          {cityImage && (
            <img
              src={cityImage}
              alt={city}
              className="h-96 w-full object-center "
            />
          )}
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-8xl text-bold text-white italic bg-opacity-15 bg-black">
            {city.toUpperCase()}
          </div>
        </div>
        <p className="text-5xl text-center p-4">
          Beliebtesten Events in Berlin
        </p>

        <div className="flex flex-wrap justify-center">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event._id}
                className="p-8 m-4 border-orange-700 border-2  w-full max-w-4xl flex rounded-2xl bg-white shadow-lg"
              >
                <img
                  className="w-64 h-48 border-orange-700 border-2 rounded-md "
                  src={event.bild}
                  alt={event.titel}
                />
                <div className="ml-4 flex flex-col flex-1">
                  <div>
                    <h2 className="text-xl font-bold">{event.titel}</h2>
                    <p className="mt-2 opacity-70">{event.beschreibung}</p>
                    <p className="mt-2 opacity-70">{event.ort.adresse}</p>
                    <p className="mt-2 opacity-70">
                      Beginnt am: {formatDate(event.startDatum)}
                    </p>
                    <p className="mt-2 opacity-70">
                      {" "}
                      Endet am: {formatDate(event.endDatum)}
                    </p>
                  </div>
                  <div className="flex justify-end mt-auto">
                    <Link to={`/events/${event._id}`}>
                      <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
                        Zu den Tickets
                      </button>
                    </Link>
                  </div>
                </div>
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

export default City;
