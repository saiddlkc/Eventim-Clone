import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { FaUsers, FaCalendarAlt, FaTicketAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="fixed top-0 left-0 h-full w-64 p-4 shadow-xl shadow-blue-gray-900/5 bg-gray-300">
      <div className="mb-2 p-4">
        <Typography variant="h4" color="blue-gray">
          Logo
        </Typography>
      </div>
      <List>
        <Link to="/">
          <ListItem selected={location.pathname === "/"}>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>
        <Link to="/users">
          <ListItem selected={location.pathname === "/users"}>
            <ListItemPrefix>
              <FaUsers className="h-5 w-5" />
            </ListItemPrefix>
            Users
          </ListItem>
        </Link>
        <Link to="/events">
          <ListItem selected={location.pathname === "/events"}>
            <ListItemPrefix>
              <FaCalendarAlt className="h-5 w-5" />
            </ListItemPrefix>
            Events
          </ListItem>
        </Link>
        <Link to="/tickets">
          <ListItem selected={location.pathname === "/tickets"}>
            <ListItemPrefix>
              <FaTicketAlt className="h-5 w-5" />
            </ListItemPrefix>
            Tickets
          </ListItem>
        </Link>
        <Link to="/profile">
          <ListItem selected={location.pathname === "/profile"}>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
        </Link>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </div>
  );
}
