import React, { useState, useEffect } from "react";
import Sidebar from "./Dashboard/Sidebar";
import TopBar from "./Dashboard/Topbar";
import Table from "./Dashboard/Table";
import "../index.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">

        <TopBar />
            <Table users={users} />
      </div>
          <Routes>
            {/* <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/events" element={<Events />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/logout" element={<Logout />} /> */}
          </Routes>
       
    </div>
  );
};

export default Dashboard;
