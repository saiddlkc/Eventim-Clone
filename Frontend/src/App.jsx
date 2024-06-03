import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import "./App.css";
import Dashboard from "./Components/Dashboard";
import UsersTable from "./Components/Dashboard/Table";
import TicketTable from "./Pages/Dashboard/TicketTable";
import Statistics from "./Pages/Dashboard/StatisticTable";
import TopBar from "./Components/Dashboard/Topbar";

function App() {
  return (
    <div className="flex ">
      
      <Dashboard></Dashboard>
      <div className="w-full">

      <TopBar></TopBar>
      
      <Routes className="w-full">
        <Route path="/" element={<Statistics />} />
        <Route path="/users" element={<UsersTable />} />
        <Route path="/tickets" element={<TicketTable />} />
        <Route path="/events" element={<UsersTable />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
