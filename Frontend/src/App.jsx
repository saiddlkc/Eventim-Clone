import { Routes, Route } from "react-router-dom";
import UsersTable from "./Components/Dashboard/Table";
import TicketTable from "./Pages/Dashboard/TicketTable";
import Statistics from "./Pages/Dashboard/StatisticTable";
import Profile from "./Pages/Dashboard/Profile";
import EventsTableList from "./Pages/Dashboard/EventsTableList";
import SignUp from "./Pages/Login/Register";
import AdminLayout from "./Layout/AdminLayout";
import Login from "./Pages/Login/Login";
import Tickets from "./Components/Tickets/Tickets";
import Seat from "./Components/Tickets/seat/SeatPicker";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route element={<AdminLayout />}>
        <Route index element={<Statistics />} />
        <Route path="/users" element={<UsersTable />} />
        <Route path="/tickets" element={<TicketTable />} />
        <Route path="/ticket" element={<Tickets />} />
        <Route path="/seat" element={<Seat />} />
        <Route path="/events" element={<EventsTableList />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
