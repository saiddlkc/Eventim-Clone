import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/dashboard/event/${id}`)
        .then((response) => {
          setEvent(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the event!", error);
        });
    }
  }, [id]);

  if (!event) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-4xl">
        <img
          className="w-full h-64 object-cover"
          src={event.bild}
          alt={event.titel}
        />
        <div className="p-8 container">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            {event.titel}
          </h1>
          <p className="text-lg text-gray-600 mb-4">{event.beschreibung}</p>
          <div className="text-lg text-gray-700">
            <p className="mb-2">
              <span className="font-semibold">Stadt:</span> {event.ort.stadt}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Adresse:</span>{" "}
              {event.ort.adresse}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Beginnt am:</span>{" "}
              {formatDate(event.startDatum)}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Endet am:</span>{" "}
              {formatDate(event.endDatum)}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Uhrzeit:</span> 21:00
            </p>
          </div>
          <div className="flex justify-center">
            <button className="bg-orange-600 text-white py-2 px-8 rounded-lg hover:bg-orange-700 transition duration-300">
              Kaufen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("de-DE", options);
};

export default EventDetails;
