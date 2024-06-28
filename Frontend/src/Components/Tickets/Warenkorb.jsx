import React from "react";
import { useLocation } from "react-router-dom";

const Warenkorb = () => {
  const location = useLocation();
  const { ticket, quantity, totalPrice } = location.state || {};

  if (!ticket) {
    return <p>Warenkorb ist leer.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Warenkorb</h1>
      <div className="bg-white shadow-md rounded p-6 mt-6 w-full max-w-lg">
        <h2 className="text-xl font-bold">{ticket.title}</h2>
        <p>{ticket.eventLocation}</p>
        <p>{ticket.date}</p>
        <p>{ticket.city}</p>
        <div className="flex items-center justify-between mt-4">
          <p className="text-lg">Anzahl: {quantity}</p>
          <p className="text-lg">
            Preis: {ticket.currency} {totalPrice.toFixed(2)}
          </p>
        </div>
        <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Warenkorb;
