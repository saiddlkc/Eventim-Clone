import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  InboxArrowDownIcon,
  PowerIcon,
  ChevronDownIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { useAuthContext } from "../../hooks/useAuthContext.jsx";

const profileMenuItems = [
  {
    label: "Home",
    icon: HomeIcon,
    to: "/",
  },
  {
    label: "My Tickets",
    icon: UserCircleIcon,
    to: "/admin/profile?tab=app",
  },
  {
    label: "Edit Profile",
    icon: UserCircleIcon,
    to: "/admin/profile?tab=settings",
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
    to: "/admin/profile?tab=message",
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    action: "logout",
    to: "/login",
  },
];

function ProfileMenu() {
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const handleMenuItemClick = (action, to) => {
    if (action === "logout") {
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
      navigate(to);
    } else {
      navigate(to);
    }
    closeMenu();
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={user && user.profilePicture}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, to, action }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => handleMenuItemClick(action, to)}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default function Topbar() {
  const location = useLocation();
  const { user } = useAuthContext();
  return (
    <div className="flex justify-between items-center p-4">
      <div className="fixed top-0 right-0 left-64 mx-3 p-3 z-10 bg-gray-300 rounded-xl ">
        <div className="flex justify-between items-center">
          <Typography
            as="span"
            variant="h6"
            className="font-medium text-blue-gray-900"
          >
            {location.pathname === "/admin"
              ? "Dashboard"
              : location.pathname.slice(1).charAt(0).toUpperCase() +
                location.pathname.slice(2)}
            {user ? <p>Welcome, {user.name}!</p> : <p>Please log in.</p>}
          </Typography>
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
}
