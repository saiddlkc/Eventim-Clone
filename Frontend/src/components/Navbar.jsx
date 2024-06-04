import React from "react";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className="font-bold text-5xl text-gray-100 fixed bg-green-600 w-full p-10 z-10">
      <h1> Page Paradise</h1>
      <NavLink to="/">Home</NavLink>
      {/* <NavLink to="/add">Add</NavLink> */}
      <NavLink to="/Register">Register</NavLink>
      <NavLink to="/Login">Login</NavLink>
    </nav>
  );
};

export default NavBar;
