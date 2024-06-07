import { useState } from "react";

import "./App.css";
import Tickets from "./pages/Tickets/Tickets";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Tickets />
    </>
  );
}

export default App;
