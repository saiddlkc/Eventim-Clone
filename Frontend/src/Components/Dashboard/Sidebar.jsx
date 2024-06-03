// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaCalendarAlt, FaTicketAlt, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="w-54 bg-gray-900 text-white flex flex-col max-h-screen">
      <div className="p-6 mt-4">
        <span className="text-xl font-semibold">LOGO</span>
      </div>
      <ul>
        <li className="mb-4">
          <Link to="/" className="text-white hover:bg-gray-300 p-3 flex items-center rounded">
            <FaHome className="h-6 w-6 mr-2" />
            <span className="p-2">Home</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/users" className="text-white hover:bg-gray-700 p-3 flex items-center rounded">
            <FaUsers className="h-6 w-6 mr-2" />
            <span className="p-2">Users</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/events" className="text-white hover:bg-gray-700 p-3 flex items-center rounded">
            <FaCalendarAlt className="h-6 w-6 mr-2" />
            <span className="p-2">Events</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/tickets" className="text-white hover:bg-gray-700 p-3 flex items-center rounded">
            <FaTicketAlt className="h-6 w-6 mr-2" />
            <span className=" p-2">Tickets</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/logout" className="text-white hover:bg-gray-700 p-3 flex items-center rounded">
            <FaSignOutAlt className="h-6 w-6 mr-2" />
            <span className="p-2">Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
