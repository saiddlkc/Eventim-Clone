import React from "react";
import { XMarkIcon, CogIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Typography,
  Drawer,
  Select,
  Option,
  Switch,
} from "@material-tailwind/react";
import logo from "../../assets/img/eventhub-logo.png";

export default function DrawerDefault() {
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const sidenavColors = {
    white: "from-gray-100 to-gray-100 border-gray-200",
    dark: "from-black to-black border-gray-200",
    green: "from-green-400 to-green-600",
    orange: "from-orange-400 to-orange-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
  };

  return (
    <React.Fragment>
      <div className="flex flex-wrap gap-4">
        <CogIcon
          className="h-6 w-6 text-white cursor-pointer"
          onClick={openDrawer}
        />
      </div>

      <Drawer
        open={open}
        onClose={closeDrawer}
        className="p-4"
        placement="right"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Eventhub
            <br /> Configurator
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
          </IconButton>
        </div>
        <div className="py-2 px-2">
          <div className="mb-10">
            <Typography variant="h6" color="blue-gray">
              Background Colors
            </Typography>
            <div className="mt-3 flex items-center gap-1">
              {Object.keys(sidenavColors).map((color) => (
                <span
                  key={color}
                  className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${sidenavColors[color]}`}
                />
              ))}
            </div>
          </div>
          <div className="mb-12">
            <Typography variant="h6" color="blue-gray">
              Mode
            </Typography>
            <Typography variant="small" color="gray">
              Change the color mode of the website
            </Typography>
            <div className="mt-3 flex items-center gap-2">
              <Button variant="outlined">Dark</Button>
              <Button variant="outlined">White</Button>
            </div>
          </div>
          <div className="mb-12 ">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Language
            </Typography>
            <Select label="Select Language">
              <Option value="de">German</Option>
              <Option value="en">English</Option>
              <Option value="es">Spanish</Option>
              <Option value="fr">French</Option>
              <Option value="tr">Turkish</Option>
            </Select>
          </div>
          <div className="mb-12">
            <Typography variant="h6" color="blue-gray">
              Notifications
            </Typography>
            <div className="flex items-center">
              <Switch id="email-notifications" label="Email Notifications" />
            </div>
            <div className="flex items-center mt-3">
              <Switch id="push-notifications" label="Push Notifications" />
            </div>
          </div>
          <div className="mb-12">
            <Typography variant="h6" color="blue-gray">
              Text Size
            </Typography>
            <div className="flex items-center gap-2 mt-3">
              <Button size="sm" variant="outlined">
                Small
              </Button>
              <Button size="sm" variant="outlined">
                Medium
              </Button>
              <Button size="sm" variant="outlined">
                Large
              </Button>
            </div>
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
