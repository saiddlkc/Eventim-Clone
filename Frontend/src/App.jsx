import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import ReactDOM from "react-dom";
import { TableWithStripedColumns } from "./Pages/Dashboard/Users";
import EventsTableList from "../src/Pages/Dashboard/EventsTableList.jsx";
import "./App.css";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <>
      <EventsTableList />
    </>
  );
}

export default App;
