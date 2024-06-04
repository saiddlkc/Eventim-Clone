import  { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { navItems } from "./navItems";
import { FaEarthAmericas } from "react-icons/fa6";
import { BsPersonFill } from "react-icons/bs";
import Dropdown from "./Dropdown";

function Navbar () {
  const [dropdown,setDropdown] = useState(false);
  
  

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          Logo
        </Link>
        <ul className="nav-items">
          {navItems.map((item) => {
            if (item.title === "Events" || item.title === "AlleOrte") {
              return (
                <li key={item.id} className={item.cName}onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)} >
                  <Link to={item.path} >{item.title}</Link>
                  {dropdown && <Dropdown />}
                </li>
              );
            }
            
            return (
              <li key={item.id} className={item.cName}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
        <div className="search">
          <input type="text" placeholder="Search" />
          {/* <CiSearch /> */}
        </div>
        <Link to="/sprachen" className="sprachen">
          <FaEarthAmericas />
        </Link>
        <Link to="/Login" className="Login">
          <BsPersonFill />
        </Link>
      </nav>
      
    </>
  );
}

export default Navbar;
