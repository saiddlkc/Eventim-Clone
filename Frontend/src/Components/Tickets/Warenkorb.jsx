import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Warenkorb = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ticket, quantity, totalPrice } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Load email from localStorage if available
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      setEmail(user.email);
    }
  }, []);

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

      console.log("Order Data:", orderData); // Debugging output

      const response = await axios.post(
        "http://localhost:4000/api/orders",
        orderData
      );
      console.log("Bestellung erfolgreich:", response.data);
      navigate("/success"); // or redirect to a confirmation page
    } catch (error) {
      console.error("Fehler beim Checkout:", error);
      if (error.response) {
        setError(error.response.data.message || "Fehler beim Checkout.");
      } else {
        setError("Fehler beim Checkout.");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded p-6 mt-6 w-full max-w-lg">
        <img
          src={ticket.image}
          alt={ticket.title}
          className="w-full h-auto rounded-md"
        />
        <h2 className="text-xl font-bold mt-4">{ticket.title}</h2>
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
      <div className="bg-white shadow-md rounded p-6 mt-6 w-full max-w-lg ml-0 md:ml-6">
        <h2 className="text-xl font-bold mb-4">Zahlungsdetails</h2>
        <div>
          <label className="block mb-2">E-Mail:</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <label className="block mb-2 mt-4">Zahlungsmethode:</label>
        <select
          className="block w-full p-2 border rounded mb-4"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Bitte auswählen</option>
          <option value="Paypal">PayPal</option>
          <option value="Klarna">Klarna</option>
          <option value="Rechnung">Rechnung</option>
        </select>
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleCheckout}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Warenkorb;
