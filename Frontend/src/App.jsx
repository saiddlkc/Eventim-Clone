import { Routes, Route } from "react-router-dom";
import UsersTable from "./Pages/Dashboard/UsersTable";
import TicketTable from "./Pages/Dashboard/Tickets";
import Statistics from "./Pages/Dashboard/StatisticTable";
import Profile from "./Pages/Dashboard/Profile";
import EventsTableList from "./Pages/Dashboard/EventsTableList";
// import SignUp from "./Pages/Login/Register";
import AdminLayout from "./Layout/AdminLayout";
import Text from "./Pages/Dashboard/text/Text";
// import Login from "./Pages/Login/Login";

function App() {
  return (
    <div>
      <Text />
    </div>
    // <Routes>
    //   {/* <Route path="/sign-up" element={<SignUp />} />
    //   <Route path="/login" element={<Login />} /> */}
    //   {/* <Route element={<AdminLayout />}> */}
    //     {/* <Route index element={<Statistics />} />
    //     <Route path="/users" element={<UsersTable />} /> */}

    //     {/* <Route path="/events" element={<EventsTableList />} />
    //     <Route path="/profile" element={<Profile />} /> */}
    //   </Route>
    // </Routes>
  );
}

export default App;
