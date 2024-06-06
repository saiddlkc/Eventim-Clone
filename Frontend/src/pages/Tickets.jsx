import React from "react";
import "./styles.css";
import axios from "axios";
import { useEffect } from "react";

const Tickets = () => {
  const [tickets, setTickets] = React.useState([]);
  const [addForm, setAddForm] = React.useState({
    title: "",
    description: "",
    location: "",
    attendees: "",
    createdAt: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/dashboard");
        console.log(response.data);
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setAddForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/dashboard/", addForm);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app-container">
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>description</th>
            <th>location</th>
            <th>attendees</th>
            <th>createdAt</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>{ticket.title}</td>
              <td>{ticket.description}</td>
              <td>{ticket.location}</td>
              <td>{ticket.attendees}</td>
              <td>{ticket.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add A Tickets</h2>
      <form onSubmit={handleClick}>
        <input
          type="text"
          placeholder="title..."
          name="title"
          value={addForm.title}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="description..."
          name="description"
          value={addForm.description}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="location..."
          name="location"
          value={addForm.location}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="attendees..."
          name="attendees"
          value={addForm.attendees}
          onChange={handleChange}
        />
        <input
          type="date"
          placeholder="createdAt"
          name="createdAt"
          value={addForm.createdAt}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Tickets;
