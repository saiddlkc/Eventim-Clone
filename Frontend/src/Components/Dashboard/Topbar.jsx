import React from "react";
import { Link, useLocation } from "react-router-dom";
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

const profileMenuItems = [
  {
    label: "Home",
    icon: HomeIcon,
    to: "/",
  },
  {
    label: "My Profile",
    icon: UserCircleIcon,
    to: "/profile?tab=app",
  },
  {
    label: "Edit Profile",
    icon: UserCircleIcon,
    to: "/profile?tab=settings",
  },

  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
    to: "/profile?tab=message",
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    to: "/",
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

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
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
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
        {profileMenuItems.map(({ label, icon, to }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <Link to={to} key={label}>
              <MenuItem
                onClick={closeMenu}
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
            </Link>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default function Topbar() {
  const location = useLocation();

  return (
    <div className="flex justify-between items-center p-4">
      <div className="fixed top-0 right-0 left-64 mx-3 p-3 z-10 bg-gray-300 rounded-xl ">
        <div className="flex justify-between items-center">
          <Typography
            as="span"
            variant="h6"
            className="font-medium text-blue-gray-900"
          >
            {location.pathname === "/"
              ? "Dashboard"
              : location.pathname.slice(1).charAt(0).toUpperCase() +
                location.pathname.slice(2)}
          </Typography>
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
}
