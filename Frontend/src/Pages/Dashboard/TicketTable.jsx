import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import ReadOnly from "../../Components/Dashboard/ReadOnly";
import EditableRow from "../../Components/Dashboard/EditableRow";

const TicketTable = () => {
  const [ticket, setTicket] = useState([]);
  const [addFormData, setAddFormData] = useState({
    title: "",
    artist: "",
    description: "",
    // location: {
    //   venueName: "",
    //   addressLine1: "",
    //   state: "",
    //   postalCode: "",
    //   country: "",
    // },
    date: "",
    startTime: "1",
    endTime: "",
    organizer: "",
    price: [],
    currency: "",
    ticketType: "",
    quantityAvailable: [],
    image: "",
    qrCode: "",
    qrCodeImage: "",
    seat: "",
    selectedSeats: [],
  });

  const [editFormData, setEditFormData] = useState(ticket);
  const [editTicketID, setEditTicketID] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get("http://localhost:4000/dashboard/tickets/");
        setTicket(res.data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Tickets:", error);
      }
    };
    fetchTickets();
  }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;
  // if (!ticket) return <div>No ticket data available</div>;

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
    console.log("editFormData", editFormData);
  };

  const handleAddFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/dashboard/tickets/", {
        ...addFormData,
      });
      console.log(res.data);
      setTicket([...ticket, res.data]);
      setAddFormData({
        title: "",
        artist: "",
        description: "",
        // location: {
        //   venueName: "",
        //   addressLine1: "",
        //   state: "",
        //   postalCode: "",
        //   country: "",
        // },
        date: "",
        startTime: "",
        endTime: "",
        organizer: "",
        price: [],
        currency: "",
        ticketType: "",
        quantityAvailable: [],
        image: "",
        qrCode: "",
        qrCodeImage: "",
        seat: "",
        selectedSeats: [],
      });
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Tickets:", error);
    }
  };

  // handleEditFormSubmit

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    const editedTicket = {
      _id: editTicketID,
      title: editFormData.title,
      artist: editFormData.artist,
      description: editFormData.description,
      // location: {
      //   venueName: editFormData.location.venueName,
      //   addressLine1: editFormData.location.addressLine1,
      //   state: editFormData.location.state,
      //   postalCode: editFormData.location.postalCode,
      //   country: editFormData.location.country,
      // },
      date: editFormData.date,
      startTime: editFormData.startTime,
      endTime: editFormData.endTime,
      organizer: editFormData.organizer,
      price: 25,
      currency: editFormData.currency,
      ticketType: editFormData.ticketType,
      quantityAvailable: 100,
      image: editFormData.image,
      qrCode: editFormData.qrCode,
      qrCodeImage: editFormData.qrCodeImage,
      seat: editFormData.seat,
      selectedSeats: [],
    };

    const newTickets = [...ticket];

    const index = ticket.findIndex((ticket) => ticket._id === editTicketID);

    newTickets[index] = editedTicket;

    setTicket(newTickets);
    setEditTicketID(null);
  };

  // handleCancelClick
  const handleCancelClick = () => {
    setEditTicketID(null);
  };

  const getTicketID = (event, ticket) => {
    event.preventDefault();
    setEditTicketID(ticket._id);
    console.log("ticketID", editTicketID);
  };

  // handleDeleteClick
  const handleDeleteClick = async (id) => {
    try {
      // API-Aufruf zum Löschen des Tickets
      await axios.delete(`http://localhost:4000/dashboard/tickets/${id}`);

      // Nach erfolgreichem Löschen das Ticket aus dem State entfernen
      setTicket((prevTickets) =>
        prevTickets.filter((ticket) => ticket._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // handleEditClick
  const handleEditClick = (event, ticket) => {
    event.preventDefault();
    setEditTicketID(ticket._id);
    const formValues = {
      title: ticket.title,
      artist: ticket.artist,
      description: ticket.description,
      // location: {
      //   venueName: ticket.location.venueName,
      //   addressLine1: ticket.location.addressLine1,
      //   state: ticket.location.state,
      //   postalCode: ticket.location.postalCode,
      //   country: ticket.location.country,
      // },
      date: ticket.date,
      startTime: ticket.startTime,
      endTime: ticket.endTime,
      organizer: ticket.organizer,
      price: ticket.price,
      currency: ticket.currency,
      ticketType: ticket.ticketType,
      quantityAvailable: ticket.quantityAvailable,
      image: ticket.image,
      qrCode: ticket.qrCode,
      qrCodeImage: ticket.qrCodeImage,
      seat: ticket.seat,
      selectedSeats: [],
    };

    setEditFormData(formValues);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Add a Tickets</h1>
      <form
        onSubmit={handleAddFormSubmit}
        className="bg-white p-6 mb-4 border border-gray-200 rounded-xl shadow-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="title"
            onChange={handleAddFormChange}
            placeholder="Title"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="artist"
            onChange={handleAddFormChange}
            placeholder="Artist"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="description"
            onChange={handleAddFormChange}
            placeholder="Description"
            required
          />
          {/* <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="location.venueName"
            onChange={handleAddFormChange}
            placeholder="Venue Name"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="location.addressLine1"
            onChange={handleAddFormChange}
            placeholder="Address Line 1"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="location.state"
            onChange={handleAddFormChange}
            placeholder="State"
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="location.postalCode"
            onChange={handleAddFormChange}
            placeholder="Postal Code"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="location.country"
            onChange={handleAddFormChange}
            placeholder="Country"
            required
          /> */}
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="date"
            name="date"
            onChange={handleAddFormChange}
            placeholder="Date"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="time"
            name="startTime"
            onChange={handleAddFormChange}
            placeholder="Start Time"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="time"
            name="endTime"
            onChange={handleAddFormChange}
            placeholder="End Time"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="organizer"
            onChange={handleAddFormChange}
            placeholder="Organizer"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="number"
            name="price"
            onChange={handleAddFormChange}
            placeholder="Price"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="currency"
            onChange={handleAddFormChange}
            placeholder="Currency"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="ticketType"
            onChange={handleAddFormChange}
            placeholder="Ticket Type"
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="number"
            name="quantityAvailable"
            onChange={handleAddFormChange}
            placeholder="Quantity Available"
            required
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="image"
            onChange={handleAddFormChange}
            placeholder="Image URL"
            required
          />

          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="seat"
            onChange={handleAddFormChange}
            placeholder=" Seat"
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            name="row"
            onChange={handleAddFormChange}
            placeholder="Row"
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
          <form onSubmit={handleEditFormSubmit}>
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
                      Artist
                    </h6>
                  </th>
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                    <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                      Description
                    </h6>
                  </th>
                  {/* <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
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
                  </th> */}
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
                      Seat
                    </h6>
                  </th>

                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                    <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                      Row
                    </h6>
                  </th>

                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray 500 p-4 transition-colors hover:bg-blue-gray-100">
                    <h6 className="antialiased tracking-normal font-sans text-base text-blue-gray-900  flex justify-between items-center gap-2 font-normal  leading-none opercity-70 capitalize ">
                      Actions
                    </h6>
                  </th>
                </tr>
              </thead>

              <tbody>
                {ticket.map((ticket) => (
                  <Fragment key={ticket._id}>
                    {editTicketID === ticket._id ? (
                      <EditableRow
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                        editTicketID={editTicketID}
                      />
                    ) : (
                      <ReadOnly
                        ticket={ticket}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketTable;
