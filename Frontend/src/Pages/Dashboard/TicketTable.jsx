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
        const response = await axios.get(
          "http://localhost:4000/dashboard/tickets"
        );
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
        "http://localhost:4000/dashboard/tickets",
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
  const TicketsID = location.pathname.split("/")[2];

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

  const handleAddClick = async (e, ticket) => {
    e.preventDefault();

    setAddTicketsID(ticket._id);
    const { title, description, location, attendees, createdAt } = ticket;
    setAddTicketsData({ title, description, location, attendees, createdAt });
  };

  const handleCancelClick = async (e, ticket) => {
    e.preventDefault();
    setAddTicketsID(null);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/dashboard/tickets/${id}`);
      const response = await axios.get(
        "http://localhost:4000/dashboard/tickets"
      );
      setTickets(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="app-container">
      <h2 className=" ">
        <h5 className=" black antialiased  font-bold">Add A Ticket</h5>
      </h2>
      <form
        onSubmit={handleClick}
        className="border rounded-lg
        border-blue-gray-200 p-4 shadow-sm bg-white w-full  mx-auto mt-4
      "
      >
        <div>
          <input
            type="text"
            className=" antialiased font-sant text-sm leanding-normal  text-red-500 "
            placeholder="title..."
            name="title"
            value={addForm.title}
            onChange={handleChange}
          />
          <input
            type="text"
            className=" antialiased font-sant text-sm leanding-normal  text-red-500 "
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
        </div>

        {/* text text  */}
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
        <button
          type="submit"
          className="bg-black text-white px-5 py-1 rounded-lg"
        >
          Add Ticket
        </button>
      </form>
      <form onSubmit={handleFormSubmit} className="">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-500 p-4 transition-colors hover:bg-blue-gray-50">
                <h6 className="antialiased traching-normal font-sans text-base text-blue-gray-900 flex items-center justify-between gap-2 font-normal leanding-none opacity-70 capitalize">
                  title
                </h6>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-500 p-4 transition-colors hover:bg-blue-gray-50">
                <h6 className="antialiased traching-normal font-sans text-base text-blue-gray-900 flex items-center justify-between gap-2 font-normal leanding-none opacity-70 capitalize">
                  description
                </h6>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-500 p-4 transition-colors hover:bg-blue-gray-50">
                <h6 className="antialiased traching-normal font-sans text-base text-blue-gray-900 flex items-center justify-between gap-2 font-normal leanding-none opacity-70 capitalize">
                  location
                </h6>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-500 p-4 transition-colors hover:bg-blue-gray-50">
                <h6 className="antialiased traching-normal font-sans text-base text-blue-gray-900 flex items-center justify-between gap-2 font-normal leanding-none opacity-70 capitalize">
                  attendees
                </h6>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-500 p-4 transition-colors hover:bg-blue-gray-50">
                <h6 className="antialiased traching-normal font-sans text-base text-blue-gray-900 flex items-center justify-between gap-2 font-normal leanding-none opacity-70 capitalize">
                  createdAt
                </h6>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-500 p-4 transition-colors hover:bg-blue-gray-50">
                <h6 className="antialiased traching-normal font-sans text-base text-blue-gray-900 flex items-center justify-between gap-2 font-normal leanding-none opacity-70 capitalize">
                  Action
                </h6>
              </th>
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
