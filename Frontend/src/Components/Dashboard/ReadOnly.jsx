import React from "react";
// import "../pages/Tickets/styles.css";

const ReadOnly = ({ ticket, handleAddClick, handleDeleteClick }) => {
  return (
    <tr key={ticket._id}>
      <td>{ticket.title}</td>
      <td>{ticket.description}</td>
      <td>{ticket.location}</td>
      <td>{ticket.attendees}</td>
      <td>{ticket.createdAt}</td>
      <td>
        <button type="button" onClick={(e) => handleAddClick(e, ticket)}>
          Add
        </button>
        <button type="button" onClick={() => handleDeleteClick(ticket.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnly;
