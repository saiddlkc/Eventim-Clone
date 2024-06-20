import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Button } from "@material-tailwind/react";

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/dashboard/event")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h2" className="mb-4">
        EVENTHUB Charts
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.slice(0, 10).map((event, index) => (
            <div
              key={event._id}
              className="relative rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={event.bild}
                alt={event.titel}
                className="w-full h-20 object-cover object-fit"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-between">
                <div className="text-center flex items-center justify-center mx-4">
                  <Typography
                    variant="h5"
                    color="white"
                    className="border rounded-full border-white w-10 h-10 flex items-center justify-center "
                  >
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </Typography>
                  <Typography variant="h6" color="white" className="pl-2">
                    {event.titel}
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
        {events[0] && (
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img
              src={events[0].bild}
              alt={events[0].titel}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0  flex items-center justify-center"></div>
          </div>
        )}
      </div>
    </div>
  );
}
