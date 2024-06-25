import { Routes, Route } from "react-router-dom";
import UsersTable from "./Components/Dashboard/Table";
import TicketTable from "./Pages/Dashboard/TicketTable";
import Statistics from "./Pages/Dashboard/StatisticTable";
import Profile from "./Pages/Dashboard/Profile";
import EventsTableList from "./Pages/Dashboard/EventsTableList";
import SignUp from "./Pages/Login/Register";
import AdminLayout from "./Layout/AdminLayout";
import Login from "./Pages/Login/Login";
import ProfileLayout from "./Layout/ProfileLayout";
import PrivateRoute from "./Components/Dashboard/PrivateRoute";
import AdminRoute from "./Components/Dashboard/AdminRoute";
import Inbox from "./Pages/Dashboard/Inbox";
import HomePage from "./Pages/Home/HomePage";
import EventsPage from "./Pages/Categories/EventsPage";
import HomeLayout from "./Layout/HomeLayout";
import AllCities from "./Pages/Citys/Allcities";
import City from "./Pages/Citys/City";
import EventDetails from "./Pages/Categories/EventDetails";
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
        <Route path="/events" element={<EventsTableList />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
