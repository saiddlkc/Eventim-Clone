import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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
import { useEffect, useState } from "react";
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

const TABLE_HEAD = ["Event Name", "Category", "Genre", "Event Date", ""];

export function MembersTable() {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios(
          "http://localhost:4000/dashboard/tickets/"
        );
        setTickets(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTickets();
  }, []);

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Members list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
        <tbody>
          <tr>
            <td className="p-4">
              <div className="flex gap-4 p-2">
                <Input type="text" size="md" label="Event Name" />
                <Input
                  type="text"
                  label="Category"
                  className="pr-20"
                  containerProps={{
                    className: "min-w-0",
                  }}
                />
                <Input type="text" size="md" label="Genre" />
                <Input type="text" size="md" label="Artist" />
                <Input type="text" size="md" label="price" />
                <Input type="text" size="md" label="Event Date" />
              </div>
              <div className="flex gap-4 p-2">
                <Input type="text" size="md" label="location" />
                <Input type="text" size="md" label="City" />
                <Input type="text" size="md" label="Address" />
                <Input type="text" size="md" label="Buyer" />
                <Input type="text" size="md" label="Barcode" />
                <Input type="text" size="md" label="Organizer" />
              </div>
              <div className="flex gap-4 p-2">
                <Input type="text" size="md" label="Event Information" />
                <Input type="text" size="md" label="genre" />
                <Input type="text" size="md" label="Artist" />{" "}
                <Input type="text" size="md" label="genre" />
                <Input type="text" size="md" label="Artist" />
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
          </CardHeader>
          <CardBody className=" px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-500 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                      <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tickets.map(
              (
                {
                  event_name,
                  category,
                  genre,
                  artist,
                  price,
                  img,
                  // location: { venue, city, address },
                  buyer,
                  barcode,
                  event_date,
                  organizer,
                  event_information,
                  // additional_info: {
                  //   age_restriction,
                  //   ticket_availability,
                  //   tickets_sold,
                  //   event_status,
                  //   event_type,
                  //   seating: { type, available_seats },
                  // },
                },
                index
              ) => {
                const isLast = index === tickets.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={event_name}>
                    {/* event_name */}
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={img} alt={event_name} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {event_name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {artist}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    {/* category */}
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {category}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        ></Typography>
                      </div>
                    </td>
                    {/* genre */}
                    <td className={classes}>
                      <div className="w-max">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {genre}
                        </Typography>
                      </div>
                    </td>
                    {/* event_date */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {event_date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
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
          Page 1 of 10
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
  );
}
export default MembersTable;
