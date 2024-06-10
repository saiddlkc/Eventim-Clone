import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import "./index.css";
import { AuthContextProvider } from "./Context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthContextProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthContextProvider>
    </React.StrictMode>
  </BrowserRouter>
);
