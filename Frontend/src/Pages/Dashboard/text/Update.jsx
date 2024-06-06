import React from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const Add = () => {
  const [books, setBooks] = useState({
    event_name: "",
    category: "",
    genre: "",
    artist: " ",
    price: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const booksID = location.pathname.split("/")[2];
  console.log(booksID);
  console.log(navigate);
  const handleChange = (e) => {
    setBooks((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        "http://localhost:4000/dashboard/tickets/" + booksID,
        books
      );

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(books);
  return (
    <div className="form h-screen w-screen bg-gray-200 flex p-5 flex-col gap-3 justify-center">
      <h1 className="text-green-700 text-center font-bold font-sans text-3xl">
        Update New Book
      </h1>
      <input
        className="p-2 rounded-lg"
        type="text"
        placeholder="titel"
        onChange={handleChange}
        name="title"
      />
      <input
        className="p-2 rounded-lg"
        type="text"
        placeholder="autor"
        onChange={handleChange}
        name="autor"
      />
      <input
        className="p-2 rounded-lg"
        type="number"
        placeholder="ISBN"
        onChange={handleChange}
        name="ISBN"
      />
      <input
        className="p-2 rounded-lg"
        type="text"
        placeholder="cover"
        onChange={handleChange}
        name="cover"
      />
      <input
        className="p-2 rounded-lg"
        type="text"
        placeholder=" publication "
        onChange={handleChange}
        name="publication"
      />
      <input
        className="p-2 rounded-lg"
        type="text"
        placeholder="created "
        onChange={handleChange}
        name="created"
      />
      <input
        className="p-2 rounded-lg"
        type="text"
        placeholder=" updated "
        onChange={handleChange}
        name="updated"
      />
      <input
        className="p-2 rounded-lg"
        type="text"
        placeholder=" page"
        onChange={handleChange}
        name="page"
      />{" "}
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
