import React, { useState, useEffect } from "react";
import axios from "axios";

const TicketTable = () => {
  const [tickets, setTickets] = useState([]);
  const [editFormData, setEditFormData] = useState(null);
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
    price: 0,
    currency: "",
    ticketType: "",
    quantityAvailable: 0,
    image: "",
    termsAndConditions: "",
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
        termsAndConditions: "",
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
      termsAndConditions: "",
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

  const handleEdit = (ticket) => {
    setEditFormData({ ...ticket });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/dashboard/tickets/${id}`);
      setTickets(tickets.filter((ticket) => ticket._id !== id));
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/dashboard/tickets/${editFormData._id}`,
        editFormData
      );

      const updatedTickets = tickets.map((ticket) =>
        ticket._id === editFormData._id ? response.data : ticket
      );

      setTickets(updatedTickets);
      setEditFormData(null);
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Tickets</h1>
      <form
        className="bg-white p-6 mb-4 border border-gray-200"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              className="border border-gray-300 rounded p-2 w-full"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              required
            />
          </div>
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
            name="additionalInfo.accessibilityInfo"
            value={formData.additionalInfo.accessibilityInfo}
            onChange={handleChange}
            placeholder="Accessibility Info"
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
      <div className="relative flex flex-col bg-clip-border rounded-xl text-gray-70 shadow-md h-full w-full bg-blue-gray-100">
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
                    Accessibility Info{" "}
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
              {tickets.map((ticket) => (
                <tr key={ticket._id} className="border border-gray-300">
                  <td className="p-4 border-b boder-blue-gray-50">
                    {editFormData && editFormData._id === ticket._id ? (
                      <input
                        type="text"
                        value={editFormData.title}
                        onChange={(e) => handleChange(e, "title")}
                      />
                    ) : (
                      <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                        {" "}
                        {ticket.title}
                      </p>
                    )}
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    {editFormData && editFormData._id === ticket._id ? (
                      <input
                        type="text"
                        value={editFormData.description}
                        onChange={(e) => handleChange(e, "description")}
                      />
                    ) : (
                      <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                        {ticket.description}
                      </p>
                    )}
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    {editFormData && editFormData._id === ticket._id ? (
                      <input
                        type="text"
                        value={editFormData.location.venueName}
                        onChange={(e) => handleChange(e, "location.venueName")}
                      />
                    ) : (
                      <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                        {ticket.location.venueName}
                      </p>
                    )}
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    {editFormData && editFormData._id === ticket._id ? (
                      <input
                        type="text"
                        value={editFormData.location.addressLine1}
                        onChange={(e) =>
                          handleChange(e, "location.addressLine1")
                        }
                      />
                    ) : (
                      <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                        {ticket.location.addressLine1}
                      </p>
                    )}
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    {editFormData && editFormData._id === ticket._id ? (
                      <input
                        type="text"
                        value={editFormData.location.state}
                        onChange={(e) => handleChange(e, "location.state")}
                      />
                    ) : (
                      <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                        {ticket.location.state}
                      </p>
                    )}
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    {editFormData && editFormData._id === ticket._id ? (
                      <input
                        type="text"
                        value={editFormData.location.postalCode}
                        onChange={(e) => handleChange(e, "location.postalCode")}
                      />
                    ) : (
                      <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                        {ticket.location.postalCode}
                      </p>
                    )}
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    {editFormData && editFormData._id === ticket._id ? (
                      <input
                        type="text"
                        value={editFormData.location.country}
                        onChange={(e) => handleChange(e, "location.country")}
                      />
                    ) : (
                      <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                        {ticket.location.country}
                      </p>
                    )}
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    {editFormData && editFormData._id === ticket._id ? (
                      <input
                        type="date"
                        value={editFormData.date}
                        onChange={(e) => handleChange(e, "date")}
                      />
                    ) : (
                      <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                        {ticket.date}
                      </p>
                    )}
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    {editFormData && editFormData._id === ticket._id ? (
                      <input
                        type="time"
                        value={editFormData.startTime}
                        onChange={(e) => handleChange(e, "startTime")}
                      />
                    ) : (
                      <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                        {ticket.startTime}
                      </p>
                    )}
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    {editFormData && editFormData._id === ticket._id ? (
                      <input
                        type="time"
                        value={editFormData.endTime}
                        onChange={(e) => handleChange(e, "endTime")}
                      />
                    ) : (
                      <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                        {ticket.endTime}
                      </p>
                    )}
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    {editFormData && editFormData._id === ticket._id ? (
                      <input
                        type="text"
                        value={editFormData.organizer}
                        onChange={(e) => handleChange(e, "organizer")}
                      />
                    ) : (
                      <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                        {ticket.organizer}
                      </p>
                    )}
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    {editFormData && editFormData._id === ticket._id ? (
                      <input
                        type="number"
                        value={editFormData.price}
                        onChange={(e) => handleChange(e, "price")}
                      />
                    ) : (
                      <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                        {ticket.price}
                      </p>
                    )}
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    {editFormData && editFormData._id === ticket._id ? (
                      <input
                        type="text"
                        value={editFormData.currency}
                        onChange={(e) => handleChange(e, "currency")}
                      />
                    ) : (
                      <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                        {ticket.currency}
                      </p>
                    )}
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    {editFormData && editFormData._id === ticket._id ? (
                      <input
                        type="text"
                        value={editFormData.ticketType}
                        onChange={(e) => handleChange(e, "ticketType")}
                      />
                    ) : (
                      <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                        {ticket.ticketType}
                      </p>
                    )}
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    {editFormData && editFormData._id === ticket._id ? (
                      <input
                        type="number"
                        value={editFormData.quantityAvailable}
                        onChange={(e) => handleChange(e, "quantityAvailable")}
                      />
                    ) : (
                      <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                        {ticket.quantityAvailable}
                      </p>
                    )}
                  </td>
                  <td className="p-4 border-b boder-blue-gray-50">
                    {editFormData && editFormData._id === ticket._id ? (
                      <input
                        type="text"
                        value={editFormData.image}
                        onChange={(e) => handleChange(e, "image")}
                      />
                    ) : (
                      <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                        {ticket.image}
                      </p>
                    )}
                  </td>

                  <td className="p-4 border-b boder-blue-gray-50">
                    {editFormData && editFormData._id === ticket._id ? (
                      <input
                        type="text"
                        value={editFormData.additionalInfo.ageRestriction}
                        onChange={(e) =>
                          handleChange(e, "additionalInfo.ageRestriction")
                        }
                      />
                    ) : (
                      <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                        {ticket.additionalInfo.ageRestriction}
                      </p>
                    )}
                  </td>

                  <td className="p-4 border-b boder-blue-gray-50">
                    {editFormData && editFormData._id === ticket._id ? (
                      <input
                        type="text"
                        value={editFormData.additionalInfo.accessibilityInfo}
                        onChange={(e) =>
                          handleChange(e, "additionalInfo.accessibilityInfo")
                        }
                      />
                    ) : (
                      <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                        {ticket.additionalInfo.accessibilityInfo}
                      </p>
                    )}
                  </td>

                  <td className="p-4 border-b boder-blue-gray-50">
                    {editFormData && editFormData._id === ticket._id ? (
                      <input
                        type="text"
                        value={editFormData.additionalInfo.contactInfo}
                        onChange={(e) =>
                          handleChange(e, "additionalInfo.contactInfo")
                        }
                      />
                    ) : (
                      <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
                        {ticket.additionalInfo.contactInfo}
                      </p>
                    )}
                  </td>

                  <td>
                    {editFormData && editFormData._id === ticket._id ? (
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={handleUpdate}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                        onClick={() => handleEdit(ticket)}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => handleDelete(ticket._id)}
                    >
                      Delete
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
