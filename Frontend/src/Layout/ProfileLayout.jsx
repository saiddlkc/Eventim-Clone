import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
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
import { useAuthContext } from "../hooks/useAuthContext";
import logo from "../assets/img/logo-transparent-png.png";

const profileMenuItems = [
  {
    label: "Home",
    icon: HomeIcon,
    to: "/customer-dashboard",
  },
  {
    label: "My Profile",
    icon: UserCircleIcon,
    to: "/customer-dashboard?tab=app",
  },
  {
    label: "Edit Profile",
    icon: UserCircleIcon,
    to: "/customer-dashboard?tab=settings",
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
    to: "/customer-dashboard?tab=message",
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

function Topbar() {
  const location = useLocation();
  const { user } = useAuthContext();
  return (
    <div className="flex justify-between items-center p-4">
      <div className="fixed top-0 right-0 left-0  p-3 z-10 bg-gray-300 ">
        <div className="flex justify-between items-center">
          <Link to="/customer-dashboard">
            <img src={logo} alt="logo" className="h-16" />
          </Link>

          <ProfileMenu />
        </div>
      </div>
    </div>
  );
}

export default function ProfileLayout() {
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    } else {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, [navigate, dispatch]);

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="mt-10 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
