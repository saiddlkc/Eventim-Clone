import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Dashboard/Sidebar";
import Topbar from "../Components/Dashboard/Topbar";
import { useAuthContext } from "../hooks/useAuthContext";

function AdminLayout() {
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    } else {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, [navigate, dispatch]);

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
