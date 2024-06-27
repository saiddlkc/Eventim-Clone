import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import createTicketsForCities from "../../Components/Tickets/createTicketsForCities";

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (id && event) {
      createTicketsForCities(id, event);
    }
  }, [id, event]);

  useEffect(() => {
    const fetchEventAndTickets = async () => {
      try {
        console.log(`Fetching event with id: ${id}`);
        const eventRes = await axios.get(
          `http://localhost:4000/dashboard/event/${id}`
        );
        const eventData = eventRes.data;
        console.log("Event data:", eventData);
        setEvent(eventData);

        console.log("Fetching tickets...");
        const ticketsRes = await axios.get(
          `http://localhost:4000/dashboard/tickets/`
        );
        const allTickets = ticketsRes.data;
        console.log("All tickets:", allTickets);

        if (!eventData.titel) {
          console.error("Event title is undefined or null");
          setLoading(false);
          return;
        }

        const eventTitle = eventData.titel.trim().toLowerCase();
        console.log("Event title for filtering:", eventTitle);

        const filteredTickets = allTickets.filter((ticket) => {
          if (!ticket.artist) {
            console.warn("Ticket artist is undefined or null:", ticket);
            return false;
          }
          const ticketArtist = ticket.artist.trim().toLowerCase();
          console.log(
            `Comparing ticket artist: "${ticketArtist}" with event title: "${eventTitle}"`
          );
          return eventTitle.includes(ticketArtist);
        });

        console.log("Filtered tickets:", filteredTickets);
        setTickets(filteredTickets);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching event and tickets:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchEventAndTickets();
    }
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString("de-DE", options);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Event not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 container mx-auto text-center">
      {/* Hintergrundbild mit Overlay-Text */}
      <div className="relative lg:flex sm:flex-col items-center justify-start w-full font-extrabold bg-gray-300">
        <img
          src={event.headerUrl}
          alt={event.titel}
          className="h-full w-full lg:object-cover"
        />
        <div className="lg:absolute sm:relative top-0 lg:w-full h-full flex items-center justify-start p-4 sm:left-0 italic bg-opacity-25 bg-black">
          <div className="lg:ml-16 md:ml-5 sm:mt-5 lg:mt-1">
            <h2 className="font-extrabold sm:mb-1 lg:m-6 lg:text-white sm:text-black">
              {event.titel}
            </h2>
            <p className="lg:text-white sm:mb-1 lg:m-6">{event.beschreibung}</p>
            <div className="lg:text-white sm:text-black sm:mb-3 lg:m-6 text-xs">
              <p className="mt-3">
                {formatDate(event.startDatum)} - {formatDate(event.endDatum)}
              </p>
            </div>
          </div>
        </div>
      </div>
      {tickets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-4"
            >
              <div className="md:flex">
                <div className="md:shrink-0">
                  <img
                    className="h-48 w-full object-cover md:h-full md:w-48"
                    src={ticket.image || event.headerUrl} // Use ticket image if available, otherwise use event header
                    alt="Ticket image"
                  />
                </div>
                <div className="p-8 flex-grow">
                  <p className="text-black text-3xl">{ticket.city}</p>
                  <p className="mt-2 text-slate-500">
                    <span className="font-bold">{formatDate(ticket.date)}</span>
                  </p>
                  <p className="mt-2 text-slate-500">{ticket.title}</p>
                  <p>{ticket.eventLocation}</p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-lg font-bold">
                      ab {ticket.currency} {ticket.price}
                    </p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Buy Ticket
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-500">
          No tickets available for this event.
        </p>
      )}
    </div>
  );
};

export default EventDetails;
