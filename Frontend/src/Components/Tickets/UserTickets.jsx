import React, { useState, useEffect } from "react";
import axios from "axios";

const UserTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const FetchTickets = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/orders/");
        setTickets(res.data);
        console.log("Tickets:", res.data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Tickets:", error);
      }
    };
    FetchTickets();
  }, []);

  // Funktion zur Formatierung des Datums
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate.toUpperCase();
  };

  return (
    <div className="flex flex-wrap justify-center p-4">
      {tickets.map((ticket, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row w-full max-w-4xl h-auto md:h-80 border border-gray-300 bg-gray-100 shadow-lg m-4 overflow-hidden"
        >
          <div className="flex justify-center items-center w-full md:w-1/3">
            <img
              src={ticket.image || "placeholder.jpg"} // Hier ersetzen Sie "placeholder.jpg" durch den Pfad Ihrer Platzhalterbild-URL
              alt={ticket.artist}
              className="w-full h-full object-cover border-b-4 border-dotted border-gray-300 md:border-r-4 md:border-b-0"
            />
          </div>
          <div className="w-full md:w-1/2 p-5 flex flex-col justify-between">
            <div className="flex justify-center font-bold items-center">
              <p className="date text-2xl flex justify-center text-[#d8475e]">
                {formatDate(ticket.date)}
              </p>
            </div>
            <h1 className="artist my-5 flex justify-center text-[#2d3b76]">
              {ticket.artist}
            </h1>
            <div className="trs flex justify-around mb-5 bg-gray-300 p-5">
              <div className="time text-center text-[#d8475e]">
                <p className="text-sm">TIME</p>
                <p className="text-2xl text-[#2d3b56]">{ticket.startTime}</p>
              </div>
              <div className="row text-center text-[#d8475e]">
                <p className="text-sm">ROW</p>
                <p className="text-2xl text-[#2d3b56]">{ticket.row}</p>
              </div>
              <div className="seat text-center text-[#d8475e]">
                <p className="text-sm">SEAT</p>
                <p className="text-2xl text-[#2d3b56]">{ticket.seat}</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">{ticket.venue}</p>
          </div>
          <div className="n flex flex-col justify-center items-center w-full md:w-1/6 p-5 bg-gray-100 border-t-4 border-dotted border-gray-300 md:border-t-0 md:border-l-4">
            <div className="text-center">
              <p>{ticket.artist}</p>
              <div className="flex flex-col items-center">
                <p className="text-sm">SEAT</p>
                <p className="text-sm">{ticket.seat}</p>
                <p className="text-sm">ROW</p>
                <p className="text-sm">{ticket.row}</p>
                <p className="text-sm">TIME</p>
                <p className="text-sm">{ticket.startTime}</p>
              </div>
              <div className="text-xs text-gray-600 mt-2 flex flex-col">
                <img
                  className="text-xs text-gray-600 mt-2"
                  src={ticket.qrCodeImage}
                  alt=""
                />
                <p>{ticket.qrCode}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserTickets;
