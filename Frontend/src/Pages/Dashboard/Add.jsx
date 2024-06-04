import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [event, setEvent] = React.useState({
    event_name: "",
    category: "",
    genre: "",
    artist: "",
    price: "",
    location: {
      venue: "",
      city: "",
      address: "",
    },
    buyer: "",
    barcode: "",
    event_date: "",
    organizer: "",
    event_information: "",
    additional_info: {
      age_restriction: "",
      ticket_availability: "",
      tickets_sold: "",
      event_status: "",
      event_type: "",
      seating: {
        type: "",
        available_seats: "",
      },
    },
  });

  const navigate = useNavigate();

  const updateNestedState = (keys, value, state) => {
    if (keys.length === 1) {
      return { ...state, [keys[0]]: value };
    }
    return {
      ...state,
      [keys[0]]: updateNestedState(keys.slice(1), value, state[keys[0]]),
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    setEvent((prev) => updateNestedState(keys, value, prev));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/dashboard/tickets/", event);
      navigate("/tickets"); // Navigate to tickets page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="form"
      style={{
        display: "flex",
        padding: "200px",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        gap: "10px",
      }}
    >
      <h1>Add New Event</h1>
      <form action="">
        <input
          type="text"
          placeholder="Event Name"
          onChange={handleChange}
          name="event_name"
          value={event.event_name}
        />
        <input
          type="text"
          placeholder="Category"
          onChange={handleChange}
          name="category"
          value={event.category}
        />
        <input
          type="text"
          placeholder="Genre"
          onChange={handleChange}
          name="genre"
          value={event.genre}
        />
        <input
          type="text"
          placeholder="Artist"
          onChange={handleChange}
          name="artist"
          value={event.artist}
        />
        <input
          type="text"
          placeholder="Price"
          onChange={handleChange}
          name="price"
          value={event.price}
        />
        <input
          type="text"
          placeholder="Venue"
          onChange={handleChange}
          name="location.venue"
          value={event.location.venue}
        />
        <input
          type="text"
          placeholder="City"
          onChange={handleChange}
          name="location.city"
          value={event.location.city}
        />
        <input
          type="text"
          placeholder="Address"
          onChange={handleChange}
          name="location.address"
          value={event.location.address}
        />
        <input
          type="text"
          placeholder="Buyer"
          onChange={handleChange}
          name="buyer"
          value={event.buyer}
        />
        <input
          type="text"
          placeholder="Barcode"
          onChange={handleChange}
          name="barcode"
          value={event.barcode}
        />
        <input
          type="text"
          placeholder="Event Date"
          onChange={handleChange}
          name="event_date"
          value={event.event_date}
        />
        <input
          type="text"
          placeholder="Organizer"
          onChange={handleChange}
          name="organizer"
          value={event.organizer}
        />
        <input
          type="text"
          placeholder="Event Information"
          onChange={handleChange}
          name="event_information"
          value={event.event_information}
        />
        <input
          type="text"
          placeholder="Age Restriction"
          onChange={handleChange}
          name="additional_info.age_restriction"
          value={event.additional_info.age_restriction}
        />
        <input
          type="text"
          placeholder="Ticket Availability"
          onChange={handleChange}
          name="additional_info.ticket_availability"
          value={event.additional_info.ticket_availability}
        />
        <input
          type="text"
          placeholder="Tickets Sold"
          onChange={handleChange}
          name="additional_info.tickets_sold"
          value={event.additional_info.tickets_sold}
        />
        <input
          type="text"
          placeholder="Event Status"
          onChange={handleChange}
          name="additional_info.event_status"
          value={event.additional_info.event_status}
        />
        <input
          type="text"
          placeholder="Event Type"
          onChange={handleChange}
          name="additional_info.event_type"
          value={event.additional_info.event_type}
        />
        <input
          type="text"
          placeholder="Seating Type"
          onChange={handleChange}
          name="additional_info.seating.type"
          value={event.additional_info.seating.type}
        />
        <input
          type="text"
          placeholder="Available Seats"
          onChange={handleChange}
          name="additional_info.seating.available_seats"
          value={event.additional_info.seating.available_seats}
        />
      </form>
      <button
        onClick={handleClick}
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          color: "white",
          borderRadius: "5px",
          cursor: "pointer",
          gap: "10px",
          backgroundColor: "green",
          border: "none",
        }}
      >
        Add
      </button>
    </div>
  );
};

export default Add;
