import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TicketSelectionPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  const { ticket } = location.state || {}; // Holen Sie sich das Ticket-Objekt von der vorherigen Seite
  const [quantity, setQuantity] = useState(1);

  if (!ticket) {
    return <p>Kein Ticket ausgewählt.</p>;
  }

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const totalPrice = ticket.price * quantity;

  const handleAddToCart = () => {
    // Hier können Sie Logik hinzufügen, um das Ticket dem Warenkorb hinzuzufügen
    console.log("Ticket dem Warenkorb hinzugefügt:", { ticket, quantity });
    navigate("/cart", { state: { ticket, quantity, totalPrice } });
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("de-DE", options);
  };

  return (
    <div className="flex flex-col items-center mt-10 min-h-screen bg-gray-100">
      <div className="relative lg:flex sm:flex-col items-center justify-start w-full font-extrabold bg-gray-300">
        <img
          src={ticket.image}
          alt={ticket.title}
          className="h-96 w-96 lg:object-cover"
        />
        <div className="lg:absolute sm:relative top-0 lg:w-full h-full flex items-center justify-start p-4 sm:left-0 italic bg-opacity-25 bg-black">
          <div className="lg:ml-16 md:ml-5 sm:mt-5 lg:mt-1">
            <h2 className="font-extrabold sm:mb-1 lg:m-6 lg:text-white sm:text-black">
              {ticket.title}
            </h2>
            <p className="lg:text-white text-lg sm:mb-1 lg:m-6">
              {ticket.eventLocation}
              <p className="mt-3 text-lg">{ticket.city}</p>
            </p>
            <div className="lg:text-white text-lg sm:text-black sm:mb-3 lg:m-6">
              <p className="mt-3 text-lg">{formatDate(ticket.date)}</p>
              <p className="mt-3 text-lg">
                {ticket.startTime} - {ticket.endTime}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-4">
        <button onClick={handleDecrease} className="px-4 py-2 bg-gray-300">
          -
        </button>
        <p className="mx-4">{quantity}</p>
        <button onClick={handleIncrease} className="px-4 py-2 bg-gray-300">
          +
        </button>
      </div>
      <p className="text-xl mt-4">
        Total: {ticket.currency} {totalPrice.toFixed(2)}
      </p>
      <button
        onClick={handleAddToCart}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        In den Warenkorb
      </button>
    </div>
  );
};

export default TicketSelectionPage;
