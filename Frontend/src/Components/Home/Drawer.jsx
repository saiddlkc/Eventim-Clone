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

export default function DrawerDefault({ setBackgroundColor }) {
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const sidenavColors = {
    white: "#ffffff",

    blue: "#3B82F6",
    teal: "#14B8A6",
    purple: "#8B5CF6",
    yellow: "#F59E0B",
    green: "#34D399",
    orange: "#FB923C",
    red: "#F87171",
    pink: "#F472B6",
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
            Eventhub Settings
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
          </IconButton>
        </div>
        <div className="py-2 px-2">
          <div className="mb-10">
            <Typography variant="h6" color="blue-gray">
              Home Page Background Colors
            </Typography>
            <div className="mt-3 flex items-center gap-1">
              {Object.keys(sidenavColors).map((color) => (
                <span
                  key={color}
                  className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 border-gray-700`}
                  onClick={() => setBackgroundColor(sidenavColors[color])}
                  style={{ backgroundColor: sidenavColors[color] }}
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
