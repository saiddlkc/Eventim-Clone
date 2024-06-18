import React, { useState, useEffect } from "react";
import axios from "axios";

const TicketTable = () => {
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: {
      venueName: "",
      addressLine1: "",
      state: "",
      postalCode: "",
      country: "",
    },
    date: "",
    startTime: "",
    endTime: "",
    organizer: "",
    price: [],
    currency: "",
    ticketType: "",
    quantityAvailable: 0,
    image: "",
    qrCode: "",
    additionalInfo: {
      ageRestriction: "",
      dressCode: "",
      accessibilityInfo: "",
      parkingInfo: "",
      contactInfo: "",
    },
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/dashboard/tickets/"
      );
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    if (keys.length === 1) {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData((prevData) => {
        let nestedData = { ...prevData };
        let temp = nestedData;
        for (let i = 0; i < keys.length - 1; i++) {
          temp = temp[keys[i]];
        }
        temp[keys[keys.length - 1]] = value;
        return nestedData;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/dashboard/tickets/",
        formData
      );
      setTickets([...tickets, response.data]);
      setFormData({
        title: "",
        description: "",
        location: {
          venueName: "",
          addressLine1: "",
          state: "",
          postalCode: "",
          country: "",
        },
        date: "",
        startTime: "",
        endTime: "",
        organizer: "",
        price: 0,
        currency: "",
        ticketType: "",
        quantityAvailable: 0,
        image: "",

        qrCode: "",
        additionalInfo: {
          ageRestriction: "",
          dressCode: "",
          accessibilityInfo: "",
          parkingInfo: "",
          contactInfo: "",
        },
      });
    } catch (error) {
      console.error("Error adding ticket:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/dashboard/tickets/${id}`);
      setTickets(tickets.filter((ticket) => ticket._id !== id));
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };
  const handleAdd = () => {
    const newTicket = {
      title: "",
      description: "",
      location: {
        venueName: "",
        addressLine1: "",
        state: "",
        postalCode: "",
        country: "",
      },
      date: "",
      startTime: "",
      endTime: "",
      organizer: "",
      price: 0,
      currency: "",
      ticketType: "",
      quantityAvailable: 0,
      image: "",
      qrCode: "",
      additionalInfo: {
        ageRestriction: "",
        dressCode: "",
        accessibilityInfo: "",
        parkingInfo: "",
        contactInfo: "",
      },
    };

    setTickets([...tickets, newTicket]);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Tickets</h1>
      <form
        className="bg-white p-6 mb-4 border border-gray-200 rounded-xl shadow-xl"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="location.venueName"
            value={formData.location.venueName}
            onChange={handleChange}
            placeholder="Venue Name"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="location.addressLine1"
            value={formData.location.addressLine1}
            onChange={handleChange}
            placeholder="Address Line 1"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="location.state"
            value={formData.location.state}
            onChange={handleChange}
            placeholder="State"
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="location.postalCode"
            value={formData.location.postalCode}
            onChange={handleChange}
            placeholder="Postal Code"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="location.country"
            value={formData.location.country}
            onChange={handleChange}
            placeholder="Country"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="Date"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            placeholder="Start Time"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            placeholder="End Time"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="organizer"
            value={formData.organizer}
            onChange={handleChange}
            placeholder="Organizer"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            placeholder="Currency"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="ticketType"
            value={formData.ticketType}
            onChange={handleChange}
            placeholder="Ticket Type"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="number"
            name="quantityAvailable"
            value={formData.quantityAvailable}
            onChange={handleChange}
            placeholder="Quantity Available"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="additionalInfo.ageRestriction"
            value={formData.additionalInfo.ageRestriction}
            onChange={handleChange}
            placeholder="Age Restriction"
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="additionalInfo.dressCode"
            value={formData.additionalInfo.dressCode}
            onChange={handleChange}
            placeholder="Dress Code"
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="additionalInfo.accessibilityInfo"
            value={formData.additionalInfo.accessibilityInfo}
            onChange={handleChange}
            placeholder="Accessibility Info"
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="additionalInfo.parkingInfo"
            value={formData.additionalInfo.parkingInfo}
            onChange={handleChange}
            placeholder="Parking Info"
          />

          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="additionalInfo.contactInfo"
            value={formData.additionalInfo.contactInfo}
            onChange={handleChange}
            placeholder="Contact Info"
          />
        </div>
        <button
          className="bg-gray-900 text-white px-4 py-2 rounded mt-4 hover:bg-gray-600"
          type="submit"
        >
          Add Ticket
        </button>
      </form>
      <div className="relative flex flex-col bg-clip-border shadow-xl rounded-xl text-gray-70 shadow-md h-full w-full bg-blue-gray-100">
        <div className="relative bg-clip-border mt-4 mx-4 overflow-hidden text-gray-700 rounded-none bg-blue-gray-100">
          <div className="flex justify-between items-center ">
            <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900">
              Ticket List
            </h5>
          </div>
        </div>
        <div className="p-6 overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                  <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                    Title
                  </h6>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                  <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                    Description
                  </h6>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                  <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                    Venue Name
                  </h6>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                  <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                    Address Line 1
                  </h6>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                  <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                    State
                  </h6>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                  <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                    Postal Code
                  </h6>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                  <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                    Country
                  </h6>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                  <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                    Date
                  </h6>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                  <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                    Start Time
                  </h6>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                  <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                    End Time
                  </h6>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                  <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                    Organizer
                  </h6>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                  <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                    Price
                  </h6>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                  <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                    Currency{" "}
                  </h6>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                  <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                    Ticket Type
                  </h6>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                  <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                    Quantity Available
                  </h6>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                  <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                    Image{" "}
                  </h6>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                  <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                    Age Restriction{" "}
                  </h6>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                  <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                    Dress Code
                  </h6>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                  <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                    accessibilityInfo
                  </h6>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                  <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                    Parking Info
                  </h6>
                </th>

                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                  <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                    Contact Info{" "}
                  </h6>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                  <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                    Actions{" "}
                  </h6>
                </th>
              </tr>
            </thead>

            <tbody>
              {tickets.map((ticket, index) => (
                <tr key={ticket._id} className="border border-gray-300">
                  <td className="p-4 border-b boder-blue-gray-50">
                    <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                      {" "}
                      {ticket.title}
                    </p>
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                      {" "}
                      {ticket.description}
                    </p>
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                      {" "}
                      {ticket.location.venueName}
                    </p>
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                      {" "}
                      {ticket.location.addressLine1}
                    </p>
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                      {" "}
                      {ticket.location.state}
                    </p>
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                      {" "}
                      {ticket.location.postalCode}
                    </p>
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                      {" "}
                      {ticket.location.country}
                    </p>
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                      {" "}
                      {ticket.date}
                    </p>
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                      {" "}
                      {ticket.startTime}
                    </p>
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                      {" "}
                      {ticket.endTime}
                    </p>
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                      {" "}
                      {ticket.organizer}
                    </p>
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                      {" "}
                      {ticket.price}
                    </p>
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                      {" "}
                      {ticket.currency}
                    </p>
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                      {" "}
                      {ticket.ticketType}
                    </p>
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                      {" "}
                      {ticket.quantityAvailable}
                    </p>
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                      {ticket.image}
                    </p>
                  </td>

                  <td className="p-4 border-b boder-blue-gray-50">
                    <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                      {" "}
                      {ticket.additionalInfo.ageRestriction}
                    </p>
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                      {" "}
                      {ticket.additionalInfo.dressCode}
                    </p>
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                      {" "}
                      {ticket.additionalInfo.accessibilityInfo}
                    </p>
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                      {" "}
                      {ticket.additionalInfo.parkingInfo}
                    </p>
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                      {" "}
                      {ticket.additionalInfo.contactInfo}
                    </p>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(ticket._id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TicketTable;

// import React from "react";
// import axios from "axios";
// import { useEffect } from "react";
// import AddTable from "../../Components/Dashboard/AddTable";
// import ReadOnly from "../../Components/Dashboard/ReadOnly";
// import { Fragment } from "react";

// const TicketTable = () => {
//   const [tickets, setTickets] = React.useState([]);
//   const [addForm, setAddForm] = React.useState({
//     title: "",
//     description: "",
//     location: "",
//     attendees: "",
//     createdAt: "",
//     additionalInfo: {
//       ageRestriction: "",
//       dressCode: "",
//       accessibilityInfo: "",
//       parkingInfo: "",
//       contactInfo: "",
//     },
//   });
//   const [addTicketsData, setAddTicketsData] = React.useState({
//     title: "",
//     description: "",
//     location: "",
//     address: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     country: "",
//     attendees: "",
//     createdAt: "",
//     additionalInfo: {
//       ageRestriction: "",
//       dressCode: "",
//       accessibilityInfo: "",
//       parkingInfo: "",
//       contactInfo: "",
//     },
//   });
//   const [addTicketsID, setAddTicketsID] = React.useState(null);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:4000/dashboard/tickets"
//         );
//         console.log(response.data);
//         setTickets(response.data);
//       } catch (error) {
//         console.error("Error fetching tickets:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAddForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleClick = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:4000/dashboard/tickets",
//         addForm
//       );

//       // Update the tickets state with the newly added ticket
//       setTickets((prevTickets) => [...prevTickets, response.data]);
//       // Reset the addForm state to clear the form
//       setAddForm({
//         title: "",
//         description: "",
//         location: "",
//         attendees: "",
//         createdAt: "",
//         additionalInfo: {
//           ageRestriction: "",
//           dressCode: "",
//           accessibilityInfo: "",
//           parkingInfo: "",
//           contactInfo: "",
//         },
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleAddChange = (e) => {
//     const { name, value } = e.target;
//     setAddTicketsData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const newTickets = [...tickets];
//     const index = tickets.findIndex((ticket) => ticket._id === addTicketsID);
//     newTickets[index] = addTicketsData;
//     setTickets(newTickets);
//     setAddTicketsID(null);
//   };

//   const handleAddClick = (e, ticket) => {
//     e.preventDefault();
//     setAddTicketsID(ticket._id);
//     const {
//       title,
//       description,
//       location,
//       attendees,
//       createdAt,
//       additionalInfo,
//     } = ticket;
//     setAddTicketsData({
//       title,
//       description,
//       location,
//       attendees,
//       createdAt,
//       additionalInfo,
//     });
//   };

//   const handleCancelClick = async (e) => {
//     e.preventDefault();
//     setAddTicketsID(null);
//   };

//   const handleDeleteClick = async (ticketId) => {
//     try {
//       await axios.delete(`http://localhost:4000/dashboard/tickets/${ticketId}`);
//       const newTickets = tickets.filter((ticket) => ticket._id !== ticketId);
//       setTickets(newTickets);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="app-container">
//       <h2>Add A Ticket</h2>
//       <form onSubmit={handleClick}>
//         <input
//           type="text"
//           placeholder="Title..."
//           name="title"
//           value={addForm.title}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           placeholder="Description..."
//           name="description"
//           value={addForm.description}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           placeholder="Location..."
//           name="location"
//           value={addForm.location}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           placeholder="Address..."
//           name="address"
//           value={addForm.additionalInfo.address}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           placeholder="City..."
//           name="city"
//           value={addForm.additionalInfo.city}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           placeholder="State..."
//           name="state"
//           value={addForm.additionalInfo.state}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           placeholder="Postal Code..."
//           name="postalCode"
//           value={addForm.additionalInfo.postalCode}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           placeholder="Country..."
//           name="country"
//           value={addForm.additionalInfo.country}
//           onChange={handleChange}
//         />
//         <input
//           type="number"
//           placeholder="Attendees..."
//           name="attendees"
//           value={addForm.attendees}
//           onChange={handleChange}
//         />
//         <input
//           type="date"
//           placeholder="CreatedAt"
//           name="createdAt"
//           value={addForm.createdAt}
//           onChange={handleChange}
//         />
//         <button type="submit" className="btn">
//           Add
//         </button>
//       </form>
//       <form onSubmit={handleFormSubmit}>
//         <table className="mt-4 w-full min-w-max table-auto text-left">
//           <thead>
//             <tr>
//               <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-500 p-4 transition-colors hover:bg-blue-gray-50">
//                 <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70 capitalize">
//                   Title
//                 </h6>
//               </th>
//               <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-500 p-4 transition-colors hover:bg-blue-gray-50">
//                 <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70 capitalize">
//                   Description
//                 </h6>
//               </th>
//               <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-500 p-4 transition-colors hover:bg-blue-gray-50">
//                 <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70 capitalize">
//                   Location
//                 </h6>
//               </th>
//               <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-500 p-4 transition-colors hover:bg-blue-gray-50">
//                 <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70 capitalize">
//                   Address
//                 </h6>
//               </th>
//               <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-500 p-4 transition-colors hover:bg-blue-gray-50">
//                 <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70 capitalize">
//                   City
//                 </h6>
//               </th>
//               <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-500 p-4 transition-colors hover:bg-blue-gray-50">
//                 <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70 capitalize">
//                   State
//                 </h6>
//               </th>
//               <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-500 p-4 transition-colors hover:bg-blue-gray-50">
//                 <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70 capitalize">
//                   Postal Code
//                 </h6>
//               </th>
//               <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-500 p-4 transition-colors hover:bg-blue-gray-50">
//                 <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70 capitalize">
//                   Country
//                 </h6>
//               </th>
//               <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-500 p-4 transition-colors hover:bg-blue-gray-50">
//                 <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70 capitalize">
//                   createdAt
//                 </h6>
//               </th>

//               <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-500 p-4 transition-colors hover:bg-blue-gray-50">
//                 <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70 capitalize">
//                   Action
//                 </h6>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {tickets.map((ticket) => (
//               <Fragment key={ticket._id}>
//                 {addTicketsID === ticket._id ? (
//                   <AddTable
//                     addTicketsData={addTicketsData}
//                     handleAddChange={handleAddChange}
//                     handleCancelClick={handleCancelClick}
//                   />
//                 ) : (
//                   <ReadOnly
//                     ticket={ticket}
//                     handleAddClick={handleAddClick}
//                     handleDeleteClick={handleDeleteClick}
//                   />
//                 )}
//               </Fragment>
//             ))}
//           </tbody>
//         </table>
//       </form>
//     </div>
//   );
// };

// export default TicketTable;
