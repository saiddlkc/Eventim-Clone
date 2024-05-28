import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { SortableTable } from "./Pages/Dashboard/Users";

import "./App.css";

function App() {
  return (
    <div className="container mx-auto p-4">
      <Routes>
        <Route path="/dashboard" element={<SortableTable />} />
      </Routes>
    </div>
  );
}

export default App;
