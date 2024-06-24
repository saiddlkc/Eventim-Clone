import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, Outlet } from "react-router-dom";
import "../../index.css";

const EventCategory = () => {
  const [events, setEvents] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:4000/dashboard/event")
      .then((response) => {
        const categoryEvents = response.data.filter(
          (event) => event.kategorie.toLowerCase() === category.toLowerCase()
        );
        setEvents(categoryEvents);
        console.log(categoryEvents);
      })
      .catch((error) => {
        console.error(
          "Beim Abrufen der Events ist ein Fehler aufgetreten!",
          error
        );
      });
  }, [category]);

  return (
    <div>
      <Outlet />
      <div className="flex flex-col bg-gray-100">
        <p className="text-5xl text-center p-4">
          Beliebtesten Events in der Kategorie{" "}
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </p>

        <div className="flex flex-wrap lg:grid md:grid-cols-5 justify-center container mx-auto">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event._id}
                className="p-2 m-2 border-orange-700 border-2 w-48 flex flex-col rounded-2xl bg-white shadow-lg"
              >
                <img
                  className="w-full h-32 object-cover object-top"
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
              Keine Events gefunden für die Kategorie{" "}
              {category.charAt(0).toUpperCase() + category.slice(1)}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCategory;
