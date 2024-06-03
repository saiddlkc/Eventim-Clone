import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import axios from "axios";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

const TABLE_HEAD = ["Profile", "Name", "Role", "Employed", ""];

export function TicketTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/dashboard/Tickets")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 m-2">
      <Card className="h-full w-full mb-6">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
              Tickets Management
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all Tickets
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row p-4">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row ">
                <div className="w-full md:w-72 ">
                  <Input
                    label="Search"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className=" px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <Typography
                    variant="medium"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70 capitalize"
                  >
                    Add a new user <UserPlusIcon className="h-5 w-5" />
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4">
                  <div className="flex gap-4 p-2">
                    <Input size="md" label="Name" />
                    <Input
                      type="email"
                      label="Email Address"
                      className="pr-20"
                      containerProps={{
                        className: "min-w-0",
                      }}
                    />
                  </div>
                  <div className="flex gap-4 p-2">
                    <Input type="password" size="md" label="Password" />
                    <Input size="md" label="Role" />
                  </div>
                  <div className="flex gap-4 p-2">
                    <div className="flex-grow" style={{ flexBasis: "70%" }}>
                      <Input type="file" size="md" label="Profile" />
                    </div>
                    <div className="flex-grow" style={{ flexBasis: "30%" }}>
                      <Button className="w-full flex items-center justify-center gap-2">
                        Add user <UserPlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card className="h-full w-full">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none"
        ></CardHeader>
        <CardBody className=" px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="medium"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70 capitalize"
                    >
                      {capitalizeFirstLetter(head)}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(
                (
                  { _id, profilePicture, name, email, role, createdAt },
                  index
                ) => {
                  const isLast = index === users.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={_id}>
                      <td className={classes}>
                        <Avatar
                          src={profilePicture}
                          alt={name}
                          size="sm"
                          className="rounded-full border border-blue-gray-200 shadow-sm overflow-hidden w-12 h-12"
                        />
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {capitalizeFirstLetter(name)}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {email}
                          </Typography>
                        </div>
                      </td>
                      <td className={`${classes}`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal uppercase opacity-70"
                        >
                          {role}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {new Date(createdAt).toLocaleDateString()}
                        </Typography>
                      </td>
                      <td className={`${classes}`}>
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 5
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default TicketTable;
