// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaCalendarAlt, FaTicketAlt, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="w-54 bg-gray-900 text-white flex flex-col h-screen">
      <div className="p-4">
        <span className="text-xl font-semibold hidden md:inline-block"></span>
      </div>
      <ul>
        <li className="mb-4">
          <Link to="/" className="text-white hover:bg-gray-700 p-2 flex items-center rounded">
            <FaHome className="h-6 w-6 mr-2" />
            <span className="hidden md:inline-block">Home</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/users" className="text-white hover:bg-gray-700 p-2 flex items-center rounded">
            <FaUsers className="h-6 w-6 mr-2" />
            <span className="hidden md:inline-block">Users</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/events" className="text-white hover:bg-gray-700 p-2 flex items-center rounded">
            <FaCalendarAlt className="h-6 w-6 mr-2" />
            <span className="hidden md:inline-block">Events</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/tickets" className="text-white hover:bg-gray-700 p-2 flex items-center rounded">
            <FaTicketAlt className="h-6 w-6 mr-2" />
            <span className="hidden md:inline-block">Tickets</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/logout" className="text-white hover:bg-gray-700 p-2 flex items-center rounded">
            <FaSignOutAlt className="h-6 w-6 mr-2" />
            <span className="hidden md:inline-block">Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
