import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Dashboard/Sidebar";
import Topbar from "../Components/Dashboard/Topbar";

function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (!token) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);

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
