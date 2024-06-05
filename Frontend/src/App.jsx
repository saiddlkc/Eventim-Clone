import { Routes, Route } from "react-router-dom";
import UsersTable from "./components/Dashbord/Table";
import TicketTable from "./Pages/Dashboard/Tickets";
import Statistics from "./Pages/Dashboard/StatisticTable";
import Profile from "./Pages/Dashboard/Profile";
import EventsTableList from "./Pages/Dashboard/EventsTableList";
import Update from "./Pages/Dashboard/Update";
// import SignUp from "./Pages/Login/Register";
import AdminLayout from "./Layout/AdminLayout";
// import Login from "./Pages/Login/Login";

function App() {
  return (
    <Routes>
      {/* <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login />} /> */}
      <Route element={<AdminLayout />}>
        <Route index element={<Statistics />} />
        <Route path="/users" element={<UsersTable />} />
        <Route path="/tickets" element={<TicketTable />} />
        <Route path="/events" element={<EventsTableList />} />
        <Route path="/update" element={<Update />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
