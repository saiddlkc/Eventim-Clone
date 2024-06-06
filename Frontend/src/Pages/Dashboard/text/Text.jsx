import axios from "axios";
import React, { useState, useEffect } from "react";
import Add from "./Add";
import { Link } from "react-router-dom";

import "./styles.css";

const Text = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/dashboard/tickets/"
        );
        console.log(response.data);
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" app-container">
      <Add />
      <table className=" ">
        <thead className=" ">
          <tr className="">
            <th className="text-center">Event Name</th>
            <th>Category</th>
            <th>Genre</th>
            <th>Artist</th>
            <th>Price</th>
            {/* <th>Event Date</th> */}
            {/* <th>Venue</th>
            <th>City</th>
            <th>Address</th> */}
            {/* <th>Buyer Name</th>
            <th>Buyer Email</th>
            <th>Buyer Phone</th> */}
            {/* <th>Barcode</th>
            <th>Organizer</th> */}
            {/* <th>Event Information</th> */}
            <th>Age Restriction</th>
            <th>Ticket Availability</th>
            <th>Tickets Sold</th>
            <th>Event Status</th>
            {/* <th>Seating Type</th>
            <th>Available Seats</th>
            <th>Seat Number</th> */}
            <th>Add</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="">
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>{ticket.event_name}</td>
              <td>{ticket.category}</td>
              <td>{ticket.genre}</td>
              <td>{ticket.artist}</td>
              <td>{ticket.price}</td>
              {/* <td>{ticket.event_date}</td> */}
              {/* <td>{ticket.location.venue}</td> */}
              {/* <td>{ticket.location.city}</td> */}
              {/* <td>{ticket.location.address}</td> */}
              {/* <td>{ticket.buyer.name}</td>
              <td>{ticket.buyer.email}</td>
              <td>{ticket.buyer.phone}</td> */}
              {/* <td>{ticket.barcode}</td>
              <td>{ticket.organizer}</td> */}
              {/* <td>{ticket.event_information}</td> */}
              <td>{ticket.additional_info.age_restriction}</td>
              <td>{ticket.additional_info.event_type}</td>
              <td>{ticket.additional_info.event_status}</td>
              <td>{ticket.ticket_availability}</td>
              <td>{ticket.tickets_sold}</td>
              {/* <td>{ticket.seating.type}</td> */}
              {/* <td>{ticket.seating.available_seats}</td> */}
              {/* <td>{ticket.seating.seat_number}</td> */}
              <td>
                <button>
                  <Link to="/textadd">Add</Link>{" "}
                </button>
              </td>
              <td>
                {" "}
                <button type="submit">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Text;
