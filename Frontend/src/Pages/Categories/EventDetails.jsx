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
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 container mx-auto">
      {/* Hintergrundbild mit überlagertem Text */}
      <div className="relative lg:flex sm:flex-col   items-center justify-start w-full font-extrabold  bg-gray-300">
        <img
          src={event.headerUrl}
          alt={event.titel}
          className="h-full w-full  lg:object-cover "
        />
        <div className="lg:absolute sm:relative top-0 lg:w-full h-full flex items-center justify-start p-4 sm:left-0 italic bg-opacity-25  bg-black ">
          <div className="lg:ml-16 md:ml-5 sm:mt-5 lg:mt-1 ">
            <h2 className=" font-extrabold sm:mb-1 lg:m-6 lg:text-white sm:text-black">
              {event.titel}
            </h2>
            <p className=" lg:text-white  sm:text-black sm:mb-1 lg:m-6 ">
              {event.beschreibung}
            </p>
            <div className=" lg:text-white sm:text-black sm:mb-1 lg:m-6 text-xs">
              <p className="mb-4">
                {formatDate(event.startDatum)} - {formatDate(event.endDatum)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  return new Date(dateString).toLocaleDateString("de-DE", options);
};

export default EventDetails;
