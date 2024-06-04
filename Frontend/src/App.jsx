// import Tickest from "./Pages/Dashboard/Tickets";
// import EventList from "./components/EventList";
// import CreateEvent from "./components/CreateEvent";
// import GetEvent from "./components/GetEvent";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Tickets from "./Pages/Dashboard/Tickets";
import Add from "./Pages/Dashboard/Add";
import Update from "./Pages/Dashboard/Update";

function App() {
  return (
    <div className="">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Tickets />} />
        {/* <Route path="/add" element={<Add />} />
        <Route path="/update/:id" element={<Update />} /> */}
        {/* <Route path="Register" element={<Register />} />
          <Route path="Login" element={<Login />} /> */}
      </Routes>
    </div>
  );
}

export default App;
