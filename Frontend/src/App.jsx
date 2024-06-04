import { Routes, Route } from "react-router-dom";
import UsersTable from "./Components/Dashboard/Table";
import TicketTable from "./Pages/Dashboard/TicketTable";
import Statistics from "./Pages/Dashboard/StatisticTable";
import Profile from "./Pages/Dashboard/Profile";
import EventsTableList from "./Pages/Dashboard/EventsTableList";
import SignUp from "./Pages/Login/Register";
import AdminLayout from "./Layout/AdminLayout";

function App() {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUp />} />
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
