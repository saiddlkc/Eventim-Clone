import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import UsersTable from "./Components/Dashboard/Table";
import TicketTable from "./Pages/Dashboard/TicketTable";
import Statistics from "./Pages/Dashboard/StatisticTable";
import Sidebar from "./Components/Dashboard/Sidebar";
import Topbar from "./Components/Dashboard/Topbar";
import EventsTableList from "./Pages/Dashboard/EventsTableList";

function App() {
  return (
    <div className="">
      <Dashboard />
      <Routes>
        <Route path="/" element={<Statistics />} />
        <Route path="/users" element={<UsersTable />} />
        <Route path="/tickets" element={<TicketTable />} />
        <Route path="/events" element={<UsersTable />} />
      </Routes>
    </div>
  );
}

export default App;
