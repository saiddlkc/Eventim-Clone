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
  köln: "https://www.eventim.de/obj/media/DE-eventim/teaser/cities/evoHeader/koeln-city-header-1440x244.jpg",
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
  const [events, setEvents] = useState([]); // Zustand für die Events
  const [cityImage, setCityImage] = useState(""); // Zustand für das Stadtbild
  const { city } = useParams(); // Parameter für die Stadt aus der URL

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
          console.error(
            "Beim Abrufen der Events ist ein Fehler aufgetreten!",
            error
          );
        });

      if (cityImages[city]) {
        setCityImage(cityImages[city]);
      } else {
        setCityImage("");
      }
    }
  }, [city]);

  return (
    <div>
      <Outlet />
      <div className="flex flex-col">
        <div className="flex bg-orange-500 items-center justify-start relative">
          {cityImage && (
            <img
              src={cityImage}
              alt={city}
              className="h-96 w-full object-cover"
            />
          )}
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-5xl sm:text-6xl md:text-8xl lg:text-8xl font-bold text-white italic bg-opacity-15 bg-black">
            {city.toUpperCase()}
          </div>
        </div>
        <p className="text-5xl text-center p-4">
          Beliebtesten Events in {city.charAt(0).toUpperCase() + city.slice(1)}
        </p>

        <div className="flex flex-wrap justify-center">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event._id}
                className="p-2 m-2 border-orange-700 border-2 w-48 flex flex-col rounded-2xl bg-white shadow-lg"
              >
                <img
                  className="w-full h-32  object-cover object-top"
                  src={event.bild}
                  alt={event.titel}
                />
                <div className="p-2 flex flex-col flex-1">
                  <h2 className="text-lg font-bold">{event.titel}</h2>
                  <p className="mt-1 text-md">
                    Ticketpreis ab: {event.ticketPreis}€
                  </p>
                  <div className="flex-grow"></div>
                  <div className="flex justify-center mt-2">
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
            <p>
              Keine Events gefunden für{" "}
              {city.charAt(0).toUpperCase() + city.slice(1)}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default City;
