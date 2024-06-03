// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaCalendarAlt, FaTicketAlt, FaSignOutAlt } from 'react-icons/fa';
import "../../App.css";

const Sidebar = () => {
  return (
    <div className="w-54 bg-blue-gray-100 flex flex-col">
      <div className="p-6 mt-4">
        <span className="text-xl font-semibold">LOGO</span>
      </div>
      <ul>
        <li className="mb-4" >
          <Link to="/" className="hover:bg-blue-gray-500 transition duration-1000 ease-in-out p-1 m-2 flex items-center rounded">
            <FaHome className="h-6 w-6 mr-2" />
            <span className="p-2">Home</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/users" className="hover:bg-blue-gray-500 transition duration-1000 ease-in-out p-1 m-2 flex items-center rounded">
            <FaUsers className="h-6 w-6 mr-2" />
            <span className="p-2">Users</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/events" className=" hover:bg-blue-gray-500 transition duration-1000 ease-in-out p-1 m-2 flex items-center rounded">
            <FaCalendarAlt className="h-6 w-6 mr-2" />
            <span className="p-2">Events</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/tickets" className=" hover:bg-blue-gray-500 transition duration-1000 ease-in-out p-1 m-2 flex items-center rounded">
            <FaTicketAlt className="h-6 w-6 mr-2" />
            <span className=" p-2">Tickets</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/logout" className=" hover:bg-blue-gray-500 transition duration-1000 ease-in-out p-1 m-2 flex items-center rounded">
            <FaSignOutAlt className="h-6 w-6 mr-2" />
            <span className="p-2">Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
