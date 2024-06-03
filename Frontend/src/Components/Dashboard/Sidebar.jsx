import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { FaUsers, FaCalendarAlt, FaTicketAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  return (
    <Card className="fixed top-3 left-3 h-full w-64 p-4 shadow-xl shadow-blue-gray-900/5 bg-gray-300">
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
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
