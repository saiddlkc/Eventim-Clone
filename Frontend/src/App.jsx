import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import UsersTable from "./Components/Dashboard/Table";
import TicketTable from "./Pages/Dashboard/TicketTable";
import Statistics from "./Pages/Dashboard/StatisticTable";
import Sidebar from "./Components/Dashboard/Sidebar";
import Topbar from "./Components/Dashboard/Topbar";
import MainLayoutDashnoard from "./Layout/MainLayoutDashboard";

function App() {
  return (
    <div>
      <Sidebar />
      <div
        className="flex-1 flex flex-col m-4 p-6"
        style={{ marginLeft: "250px" }}
      >
        <Topbar />
        <main className="flex-1 mt-18 p-6">
          <Routes>
            <Route path="/" element={<MainLayoutDashnoard />}>
              <Route index element={<Statistics />} />
              <Route path="/users" element={<UsersTable />} />
              <Route path="/tickets" element={<TicketTable />} />
              <Route path="/events" element={<UsersTable />} />
            </Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
