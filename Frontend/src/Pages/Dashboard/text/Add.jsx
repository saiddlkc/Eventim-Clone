import React from "react";
import axios from "axios";
import { useState } from "react";

const Add = () => {
  const [tickets, setTickets] = React.useState({
    event_name: "",
    category: "",
    genre: "",
    artist: "",
    price: "",
  });
  // const navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    setTickets((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/dashboard/tickets/", tickets);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(tickets);
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
      <h1>Add New Book</h1>

      <form onSubmit={handleClick}>
        <input
          type="text"
          size="md"
          placeholder="Event Name"
          name="event_name"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Category"
          className="pr-20"
          containerProps={{
            className: "min-w-0",
          }}
          name="category"
          onChange={handleChange}
        />
        <input type="text" size="md" placeholder="Genre" name="genre" />
        <input type="text" size="md" placeholder="Artist" name="artist" />
        <input type="text" size="md" placeholder="Price" name="price" />
        <input type="text" size="md" placeholder="Price" name="price" />
      </form>
      <div className="btn">
        <button type="submit">Add</button>
      </div>
    </div>
  );
};

export default Add;
