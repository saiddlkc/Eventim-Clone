import React from "react";
import "./styles.css";
import axios from "axios";
import { useEffect } from "react";
import AddTable from "../../Components/Dashboard/AddTable";
import ReadOnly from "../../Components/Dashboard/ReadOnly";
import { Fragment } from "react";

const TicketTable = () => {
  const [tickets, setTickets] = React.useState([]);
  const [addForm, setAddForm] = React.useState({
    title: "",
    description: "",
    location: "",
    attendees: "",
    createdAt: "",
  });
  const [addTicketsData, setAddTicketsData] = React.useState({
    title: "",
    description: "",
    location: "",
    attendees: "",
    createdAt: "",
  });
  const [addTicketsID, setAddTicketsID] = React.useState(null);
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
      const response = await axios.post(
        "http://localhost:4000/dashboard",
        addForm
      );

      // Update the tickets state with the newly added ticket
      setTickets((prevTickets) => [...prevTickets, response.data]);
      // Reset the addForm state to clear the form
      setAddForm({
        title: "",
        description: "",
        location: "",
        attendees: "",
        createdAt: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddChange = (e) => {
    e.preventDefault();
    setAddTicketsData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const addTickets = {
      title: addTicketsData.title,
      description: addTicketsData.description,
      location: addTicketsData.location,
      attendees: addTicketsData.attendees,
      createdAt: addTicketsData.createdAt,
    };
    const newTickets = [...tickets];
    const index = tickets.findIndex((ticket) => ticket._id === addTicketsID);
    newTickets[index] = addTickets;
    setTickets(newTickets);
    setAddTicketsID(null);
  };

  const handleAddClick = (e, ticket) => {
    e.preventDefault();
    setAddTicketsID(ticket._id);
    const { title, description, location, attendees, createdAt } = ticket;
    setAddTicketsData({ title, description, location, attendees, createdAt });
  };

  const handleCancelClick = async (e, ticket) => {
    e.preventDefault();
    setAddTicketsID(null);
  };
  const handleDeleteClick = (ticketId) => {
    const newTickets = [...tickets];
    const index = tickets.findIndex((ticket) => ticket._id === ticketId);
    newTickets.splice(index, 1);
    setTickets(newTickets);

    axios.delete(`http://localhost:4000/dashboard/${ticketId}`);
  };
  return (
    <div className="app-container">
      <h2>Add A Ticket</h2>
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
        <button type="submit" className="btn">
          Add
        </button>
      </form>
      <form onSubmit={handleFormSubmit}>
        {" "}
        <table>
          <thead>
            <tr>
              <th className="title">title</th>
              <th>description</th>
              <th>location</th>
              <th>attendees</th>
              <th className="">createdAt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <Fragment>
                {addTicketsID === ticket._id ? (
                  <AddTable
                    addTicketsData={addTicketsData}
                    handleAddChange={handleAddChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnly
                    ticket={ticket}
                    handleAddClick={handleAddClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default TicketTable;
