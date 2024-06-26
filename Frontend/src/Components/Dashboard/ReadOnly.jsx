import React from "react";

const ReadOnly = ({ ticket, handleEditClick, handleDeleteClick }) => {
  return (
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
          {ticket.artist}
        </p>
      </td>
      {/* 
      <td className="p-4 border-b boder-blue-gray-50">
        <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
          {" "}
          {ticket.description}
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
      </td> */}
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
          {ticket.city}
        </p>
      </td>
      <td className="p-4 border-b boder-blue-gray-50">
        <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
          {ticket.eventLocation}
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
      {/* <td className="p-4 border-b boder-blue-gray-50">
        <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
          {ticket.qrCode}
        </p>
      </td> */}

      <td className="p-4 border-b boder-blue-gray-50">
        <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
          {" "}
          {ticket.seat}
        </p>
      </td>
      <td className="p-4 border-b boder-blue-gray-50">
        <p className="blo antialiased font-sane text-sm leading-normal text-blue-gray-900">
          {" "}
          {ticket.row}
        </p>
      </td>

      <td>
        <button type="button" onClick={(e) => handleEditClick(e, ticket)}>
          Edit
        </button>
        <button onClick={() => handleDeleteClick(ticket._id)}>delete</button>
      </td>
    </tr>
  );
};

export default ReadOnly;
