import React from "react";
// import "../pages/Tickets/styles.css";

const ReadOnly = ({ ticket, handleAddClick, handleDeleteClick }) => {
  return (
    <tr key={ticket._id}>
      <td className="p-4 border-b border-blue-gray-50">
        <div className="">
          <p className="block antialiased font-sant text-sm leanding-normal text-blue-gray-900">
            {ticket.title}
          </p>
        </div>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <p className="block antialiased font-sant text-sm leanding-normal text-blue-gray-900">
          {ticket.description}
        </p>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <p className="block antialiased font-sant text-sm leanding-normal text-blue-gray-900">
          {ticket.location}
        </p>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <p className="block antialiased font-sant text-sm leanding-normal text-blue-gray-900">
          {ticket.attendees}
        </p>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <p className="block antialiased font-sant text-sm leanding-normal text-blue-gray-900">
          {ticket.createdAt}
        </p>
      </td>
      <td>
        <button
          className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled-all disabled:opacity-50 disabled.shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
          type="button"
          onClick={(e) => handleAddClick(e, ticket)}
        >
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2 transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
        <button
          className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled-all disabled:opacity-50 disabled.shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
          type="button"
          onClick={() => handleDeleteClick(ticket._id)}
        >
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2 transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
      </td>
    </tr>
  );
};

export default ReadOnly;
