import React, { useState, useEffect } from "react";
import Sidebar from "./Dashboard/Sidebar";
import TopBar from "./Dashboard/Topbar";
import Table from "./Dashboard/Table";
import "../index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TicketTable from "../Pages/Dashboard/TicketTable";
import Statistics from "../Pages/Dashboard/StatisticTable";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <TopBar />
        <Statistics></Statistics>
      </div>
    </div>
  );
};

export default Dashboard;
