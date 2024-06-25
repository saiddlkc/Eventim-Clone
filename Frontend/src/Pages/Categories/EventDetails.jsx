import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TicketBox from "../../Components/Tickets/TicketBox";
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
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-8 container mx-auto">
      <img className="mb-4" src={event.headerUrl} alt={event.titel} />
      <div className="bg-white shadow-md overflow-hidden w-full max-w-4xl">
        <div className="p-8">
          <h1 className="text-4xl font-extrabold mb-6 text-gray-800">
            {event.titel}
          </h1>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {event.beschreibung}
          </p>
          <div className="text-lg text-gray-700 mb-6">
            <p className="mb-4">
              <span className="font-semibold">Stadt:</span> {event.ort.stadt}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Adresse:</span>{" "}
              {event.ort.adresse}
            </p>
            <p className="mb-4">
              {formatDate(event.startDatum)} - {formatDate(event.endDatum)}
            </p>
          </div>
        </div>
      </div>
      <TicketBox />
    </div>
  );
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  return new Date(dateString).toLocaleDateString("de-DE", options);
};

export default EventDetails;
