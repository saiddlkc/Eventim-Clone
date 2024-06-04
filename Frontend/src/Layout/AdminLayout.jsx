import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashbord/Sidebar";
import Topbar from "../components/Dashbord/Topbar";

function AdminLayout() {
  return (
    <div>
      <Sidebar />
      <div
        className="flex-1 flex flex-col m-4 p-6"
        style={{ marginLeft: "250px" }}
      >
        <Topbar />
        <main className="flex-1 p-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
