import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Warenkorb = () => {
  const location = useLocation();
  const { ticket, quantity, totalPrice } = location.state || {};
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  if (!ticket) {
    return <p>Warenkorb ist leer.</p>;
  }

  const handleCheckout = async () => {
    try {
      const orderData = {
        ticketId: ticket._id,
        eventId: ticket.eventId,
        quantity,
        totalPrice,
        email,
        paymentMethod,
      };

      const response = await axios.post(
        "http://localhost:4000/api/orders",
        orderData
      );

      if (response.status === 200) {
        alert("Bestellung erfolgreich!");
      } else {
        alert("Fehler bei der Bestellung.");
      }
    } catch (error) {
      console.error("Fehler beim Checkout:", error);
      alert("Fehler beim Checkout. Bitte versuchen Sie es erneut.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Warenkorb</h1>
      <div className="flex w-full max-w-4xl bg-white shadow-md rounded p-6">
        <div className="w-1/2 pr-6">
          <img
            src={ticket.image}
            alt={ticket.title}
            className="w-full rounded mb-4"
          />
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
        </div>
        <div className="w-1/2 pl-6">
          <h2 className="text-xl font-bold mb-4">Zahlungsinformationen</h2>
          <div className="mb-4">
            <label className="block text-gray-700">E-Mail</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Zahlungsmethode</label>
            <select
              className="w-full px-3 py-2 border rounded"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Zahlungsmethode wählen</option>
              <option value="PayPal">PayPal</option>
              <option value="Klarna">Klarna</option>
              <option value="Rechnung">Rechnung</option>
            </select>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Warenkorb;
