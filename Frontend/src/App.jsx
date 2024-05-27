import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { TableWithStripedColumns } from "./Pages/Dashboard/Users";

import "./App.css";
import Dashboard from './Components/Dashboard'

function App() {
  return (
    <div className="container mx-auto p-4">
      <Routes>
        <Route path="/dashboard" element={<TableWithStripedColumns />} />
      </Routes><Dashboard></Dashboard>
    </div>
  );
}

export default App;
