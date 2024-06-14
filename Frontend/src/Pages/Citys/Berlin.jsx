import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

const AllCities = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/dashboard/event")
      .then((response) => {
        // Filter events to only include those with ort.stadt === "Berlin"
        const berlinEvents = response.data.filter(
          (event) => event.ort.stadt === "Berlin"
        ); // Replace "d" with "Berlin" if needed
        setEvents(berlinEvents);
        console.log(berlinEvents); // Log the filtered events
      })
      .catch((error) => {
        console.error("There was an error fetching the events!", error);
      });
  }, []);

  return (
    <div>
      <Outlet />
      <div className="flex flex-col">
        <div>
          <img
            className=" bg-inherit w-full h-96 object-cover"
            src="https://www.travelandleisure.com/thmb/Etq4zWgOW-z9H7ZScs5_6WDcDvQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/berlin-germany-aerial-lead-BERLINTG0921-475e3a333c7f4fdea7743c6fc2f261af.jpg"
            alt=""
          />
          <p>BERLIN</p>
        </div>
        <div className="flex">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event._id}
                className="p-4 m-4 border-red-700 border-2 w-96"
              >
                <h2>{event.titel}</h2>
                <img className="w-72 h-52" src={event.bild} alt={event.titel} />
                <p>
                  Hier geht weiter zu den Tickets für
                  <Link to={`/events/${event._id}`}>{event.titel}</Link>
                </p>
              </div>
            ))
          ) : (
            <p>No events found for Berlin.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCities;
