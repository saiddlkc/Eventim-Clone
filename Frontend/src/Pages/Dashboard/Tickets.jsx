import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const TABLE_HEAD = [
  "Event Name",
  "Category",
  "Genre",
  "artist",
  "price",
  "event_date",

  "buyer",
  "barcode",
  "organizer",
  "Event iIformation",
  "additional_info",
  "age_restriction",
  "ticket_availability",
  "tickets_sold",
  "event_status",
  "event_type",
  "seating",
  "type",
  "available_seats",
  "seat_number",
  "actions",
];

export function MembersTable() {
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({
    event_name: "",
    category: "",
    genre: "",
    artist: "",
    price: "",
    buyer: { name: "", email: "", phone: "" },
    barcode: "",
    event_date: "",
    organizer: "",
    event_information: "",
    additional_info: {
      age_restriction: "",
      ticket_availability: "",
      tickets_sold: "",
      event_status: "",
      event_type: "",
      seating: { type: "", available_seats: "", seat_number: "" },
    },
    profilePicture: "",
    profile: "",
  });
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/dashboard/tickets", formData);
      toast.success("ticket added successfully");
      console.log(formData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    // setTickets((prev) => ({ ...prev, [name.name]: value.value }));
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };
  const handleNestedChange = (e, parentKey) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [parentKey]: {
        ...formData[parentKey],
        [name]: value,
      },
    });
    console.log(formData);
  };

  const handleDelete = async (ticketsID) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/dashboard/tickets/${ticketsID}`
      );
      setTickets(res.data.tickets.filter((ticket) => ticket._id !== ticketsID));
      toast.success("ticket deleted successfully");
      console.log("Deleting ticket with ID:", ticketsID);
      console.log(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Error deleting ticket. Please try again.");
    }
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Tickets List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all Tickets
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add ticket
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
              <form onSubmit={handleSubmit}>
                <div className="flex gap-4 p-2">
                  <Input
                    type="text"
                    size="md"
                    label="Event Name"
                    name="event_name"
                    onChange={handleChange}
                  />
                  <Input
                    type="text"
                    label="Category"
                    className="pr-20"
                    containerProps={{
                      className: "min-w-0",
                    }}
                    name="category"
                    onChange={handleChange}
                  />
                  <Input type="text" size="md" label="Genre" name="genre" />
                  <Input type="text" size="md" label="Artist" name="artist" />
                  <Input type="text" size="md" label="Price" name="price" />
                </div>
                <div className="flex gap-4 p-2">
                  {" "}
                  <Input
                    type="text"
                    size="md"
                    label="Event Date"
                    name="event_date"
                    onChange={handleChange}
                  />
                  <Input
                    type="text"
                    size="md"
                    label="Event Information"
                    name="event_information"
                    onChange={handleChange}
                  />{" "}
                  <Input
                    type="text"
                    size="md"
                    label="Organizer"
                    name="organizer"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex gap-4 p-2">
                  <Input
                    type="text"
                    size="md"
                    label="Name"
                    name="name"
                    onChange={(e) => handleNestedChange(e, "buyer")}
                  />

                  <Input
                    type="text"
                    size="md"
                    label="Email"
                    name="email"
                    onChange={(e) => handleNestedChange(e, "buyer")}
                  />
                  <Input
                    type="text"
                    size="md"
                    label="Phone"
                    name="phone"
                    onChange={(e) => handleNestedChange(e, "buyer")}
                  />
                  <Input
                    type="text"
                    size="md"
                    label="Event Type"
                    name="event_type"
                    onChange={(e) => handleNestedChange(e, "additional_info")}
                  />
                  <Input
                    type="text"
                    size="md"
                    label="Barcode"
                    name="barcode"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex gap-4 p-2">
                  <Input
                    size="md"
                    type="text"
                    label="Age Restriction"
                    name="age_restriction"
                    onChange={(e) => handleNestedChange(e, "additional_info")}
                  />
                  <Input
                    type="text"
                    label="Ticket Availability "
                    name=" ticket_availability"
                    onChange={handleChange}
                  />
                  <Input
                    size="md"
                    type="text"
                    label="Type"
                    name="type"
                    onChange={(e) => handleNestedChange(e, "seating")}
                  />
                  <Input
                    type="text"
                    size="md"
                    label="Barcode"
                    name="barcode"
                    onChange={handleChange}
                  />
                  <Input
                    type="text"
                    label="Event Status"
                    name="event_status"
                    onChange={(e) => handleNestedChange(e, "additional_info")}
                  />
                  <Input
                    size="md"
                    type="text"
                    label="Available Seats"
                    name="available_seats"
                    onChange={(e) => handleNestedChange(e, "seating")}
                  />

                  <Input
                    size="md"
                    type="text"
                    label="Seat Number"
                    name="seat_number"
                    onChange={(e) => handleNestedChange(e, "seating")}
                  />
                </div>
                <div className="flex gap-4 p-2">
                  <div className="flex-grow" style={{ flexBasis: "70%" }}>
                    <Input
                      type="file"
                      size="md"
                      label="Profile"
                      name="profile"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex-grow" style={{ flexBasis: "30%" }}>
                    <Button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      Add ticket
                    </Button>
                  </div>
                </div>
              </form>
            </td>
          </tr>
        </tbody>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
                  // venue,
                  // city,
                  // address,
                  buyer: { name, email, phone },
                  barcode,
                  event_date,
                  organizer,
                  event_information,
                  additional_info: {
                    age_restriction,
                    ticket_availability,
                    tickets_sold,
                    event_status,
                    event_type,
                    seating: { type, available_seats },
                  },
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
                        {artist}
                      </Typography>
                    </td>
                    {/* price */}
                    <td className={classes}>
                      <div className="w-max">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {price}
                        </Typography>
                      </div>
                    </td>
                    {/* event_date */}
                    <td className={classes}>
                      <div className="w-max">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {event_date}
                        </Typography>
                      </div>
                    </td>
                    {/* location */}
                    {/* <td className={classes}>
                      <div className="w-max">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {venue}, {city}, {address}
                        </Typography>
                      </div>
                    </td> */}
                    {/* buyer */}
                    <td className={classes}>
                      <div className="w-max">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {" "}
                          {name},{email},{phone}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <Tooltip content="Update ticket">
                        <Link to={`./update/${tickets._id}`}>
                          <IconButton variant="text">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Link>
                      </Tooltip>
                    </td>

                    <td className={classes}>
                      <Tooltip content="Delete ticket">
                        <IconButton
                          variant="text"
                          onClick={() => handleDelete(tickets._id)}
                        >
                          <TrashIcon className="h-4 w-4 text-red-500" />
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
