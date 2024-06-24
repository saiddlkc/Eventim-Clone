import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Input,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UserCircleIcon,
  InboxArrowDownIcon,
  PowerIcon,
  ShoppingCartIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { BsBuildings, BsBuildingFill } from "react-icons/bs";
import { PiBuildingApartmentFill, PiBuildingsFill } from "react-icons/pi";
import { RiBuilding3Fill } from "react-icons/ri";
import {
  FaBuildingWheat,
  FaBuildingLock,
  FaBuildingColumns,
} from "react-icons/fa6";
import { FaReact } from "react-icons/fa";
import { MdOutlineTheaterComedy } from "react-icons/md";
import { IoIosMusicalNotes } from "react-icons/io";
import { RiSlideshow2Line } from "react-icons/ri";
import { BiSolidParty } from "react-icons/bi";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { MdSportsKabaddi } from "react-icons/md";

import logo from "../../assets/img/eventhub-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext.jsx";

const navListMenuItems = [
  {
    title: "Berlin",
    description:
      " Entdecken Sie die vielfältigen kulturellen Highlights der Hauptstadt",
    icon: FaBuildingWheat,
    link: "/cities/berlin",
  },
  {
    title: "Düsseldorf",
    description: "Erleben Sie den einzigartigen Charme am Rhein",
    icon: RiBuilding3Fill,
    link: "/cities/düsseldorf",
  },
  {
    title: "Köln",
    description: "Besuchen Sie den berühmten Kölner Dom und die Altstadt",
    icon: BsBuildingFill,
    link: "/cities/köln",
  },
  {
    title: "Stuttgart",
    description: "Genießen Sie das Automobilmuseum und die Feste",
    icon: BsBuildings,
    link: "/cities/stuttgart",
  },
  {
    title: "München",
    description:
      "Tauchen Sie ein in das bayerische Lebensgefühl und das Oktoberfest",
    icon: FaBuildingLock,
    link: "/cities/münchen",
  },
  {
    title: "Hamburg",
    description: " Erkunden Sie den Hafen und die berühmte Reeperbahn.",
    icon: PiBuildingsFill,
    link: "/cities/hamburg",
  },
  {
    title: "Leipzig",
    description:
      "Erleben Sie die historische Altstadt und das pulsierende Kulturleben",
    icon: PiBuildingApartmentFill,
    link: "/cities/leipzig",
  },
  {
    title: "Frankfurt",
    description:
      " Bewundern Sie die beeindruckende Skyline und die Finanzmetropole",
    icon: FaBuildingColumns,
    link: "/cities/frankfurt",
  },
  {
    title: "Bremen",
    description:
      "Spazieren Sie durch das historische Schnoorviertel und besuchen Sie die Bremer Stadtmusikanten",
    icon: BsBuildings,
    link: "/cities/bremen",
  },
];

const navCategoryMenuItems = [
  {
    title: "Comedy",
    description: "Lachen Sie sich schlapp bei den besten Comedians",
    icon: MdOutlineTheaterComedy,
    link: "/categories/comedy",
  },
  {
    title: "Musical",
    description: " Erleben Sie die besten Musicals live",
    icon: IoIosMusicalNotes,
    link: "/categories/musical",
  },
  {
    title: "Show",
    description: " Erleben Sie die besten Shows live",
    icon: RiSlideshow2Line,
    link: "/categories/show",
  },
  {
    title: "Theater",
    description: " Genießen Sie die besten Theaterstücke live",
    icon: MdOutlineTheaterComedy,
    link: "/categories/theater",
  },
  {
    title: "Konzert",
    description:
      " Tauchen Sie ein in die Welt der Musik und erleben Sie die besten Konzerte live",
    icon: BiSolidParty,
    link: "/categories/konzert",
  },
  {
    title: "Sport",
    description: " Erleben Sie die besten Sportevents live",
    icon: MdOutlineSportsSoccer,
    link: "/categories/sport",
  },
  {
    title: "Kultur",
    description: " Erleben Sie die besten Kulturveranstaltungen live",
    icon: FaReact,
    link: "/categories/kultur",
  },
  {
    title: "Boxen & Wrestling ",
    description: " Erleben Sie die besten Box- und Wrestlingevents live",
    icon: MdSportsKabaddi,
    link: "/categories/boxen-wrestling",
  },
];

function NavListMenu({ closeNav }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description, link }, key) => (
      <Link to={link} key={key} onClick={closeNav}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2">
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-5 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </Link>
    )
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Link to={"/allevents"}>
            <Typography as="div" variant="small" className="font-medium">
              <ListItem
                className="flex items-center gap-2 py-2 pr-3 font-medium text-gray-900 text-lg"
                selected={isMenuOpen || isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((cur) => !cur)}
              >
                All events
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`hidden h-3 w-3 transition-transform lg:block ${
                    isMenuOpen ? "rotate-180" : ""
                  }`}
                />
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`block h-3 w-3 transition-transform lg:hidden ${
                    isMobileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </ListItem>
            </Typography>
          </Link>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-1 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function AllCities({ closeNav }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description, link }, key) => (
      <Link to={link} key={key} onClick={closeNav}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2">
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-5 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </Link>
    )
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Link to={"/allcities"}>
            <Typography as="div" variant="small" className="font-medium">
              <ListItem
                className="flex items-center gap-2 py-2 pr-3 font-medium text-gray-900 text-lg"
                selected={isMenuOpen || isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((cur) => !cur)}
              >
                All cities
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`hidden h-3 w-3 transition-transform lg:block ${
                    isMenuOpen ? "rotate-180" : ""
                  }`}
                />
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`block h-3 w-3 transition-transform lg:hidden ${
                    isMobileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </ListItem>
            </Typography>
          </Link>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-1 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList({ closeNav }) {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-2 w-full">
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-3 text-lg">
          <Link to="/" onClick={closeNav}>
            Home
          </Link>
        </ListItem>
      </Typography>
      <NavListMenu closeNav={closeNav} />
      <AllCities closeNav={closeNav} />
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-3 text-lg">
          <Link to="/contact" onClick={closeNav}>
            Contact Us
          </Link>
        </ListItem>
      </Typography>
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-3 text-lg">
          <Link to="/about" onClick={closeNav}>
            About Us
          </Link>
        </ListItem>
      </Typography>
      <div className="relative flex items-center w-full lg:w-auto gap-2">
        <Input
          type="search"
          color="black"
          label="Type here..."
          className="pr-20"
          containerProps={{
            className: "min-w-[200px] w-full lg:w-auto",
          }}
        />
        <Button
          size="sm"
          color="black"
          className="!absolute right-1 top-1 rounded bg-[#f76b1b] w-[4.5rem]"
        >
          Search
        </Button>
      </div>
    </List>
  );
}

const profileMenuItems = [
  {
    label: "Home",
    icon: HomeIcon,
    to: "/",
  },
  {
    label: "My Profile",
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
    <div className="flex items-center ">
      <div className="flex space-x-4 pr-2">
        <ShoppingCartIcon className="h-6 w-6 text-black" />
        <BellIcon className="h-6 w-6 text-black" />
      </div>
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
              alt="User Profile"
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
    </div>
  );
}

export function NavbarWithMegaMenu() {
  const [openNav, setOpenNav] = React.useState(false);
  const { user } = useAuthContext();

  const closeNav = () => setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="sticky top-0 z-50 mx-auto max-w-full px-2 py-2 bg-white">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="h-12 md:h-14 lg:h-16" />
        </Link>
        <div className="hidden lg:block">
          <NavList closeNav={closeNav} />
        </div>
        <div className="hidden gap-2 lg:flex">
          {user ? (
            <ProfileMenu />
          ) : (
            <>
              <Link to={"/login"}>
                <Button variant="text" size="sm" color="blue-gray">
                  Log In
                </Button>
              </Link>
              <Link to={"/sign-up"}>
                <Button variant="gradient" size="sm">
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center lg:hidden">
          <IconButton
            variant="text"
            color="blue-gray"
            className="ml-2"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        <NavList closeNav={closeNav} />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden px-2">
          {user ? (
            <ProfileMenu />
          ) : (
            <>
              <div className="w-full">
                <Link to={"/login"}>
                  <Button
                    variant="outlined"
                    size="sm"
                    color="blue-gray"
                    fullWidth
                  >
                    Log In
                  </Button>
                </Link>
              </div>
              <div className="w-full">
                <Link to={"/sign-up"}>
                  <Button variant="gradient" size="sm" fullWidth>
                    Sign In
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
}
