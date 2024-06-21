import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { FaEdit, FaTrashAlt, FaSave, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventsTableList = () => {
  const [events, setEvents] = useState([]);
  const [editEventId, setEditEventId] = useState(null);
  const [editEventData, setEditEventData] = useState({});
  const [showNewEventForm, setShowNewEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    titel: "",
    kategorie: "",
    beschreibung: "",
    startDatum: "",
    endDatum: "",
    bild: "",
    headerUrl: "",
    ort: {
      adresse: "",
      stadt: "",
      bundesland: "",
      land: "",
    },
    veranstalter: {
      name: "",
      kontakt: {
        email: "",
      },
    },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  useEffect(() => {
    axios
      .get("http://localhost:4000/dashboard/event")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (eventId) => {
    axios
      .delete(`http://localhost:4000/dashboard/event/${eventId}`)
      .then(() => {
        setEvents(events.filter((event) => event._id !== eventId));
        toast.success("Event deleted successfully");
      })
      .catch((err) => {
        console.error("Error deleting event:", err);
        toast.error("Error deleting event");
      });
  };

  const handleEdit = (event) => {
    setEditEventId(event._id);
    setEditEventData(event);
  };

  const handleSave = () => {
    axios
      .put(
        `http://localhost:4000/dashboard/event/${editEventId}`,
        editEventData
      )
      .then((res) => {
        setEvents(
          events.map((event) => (event._id === editEventId ? res.data : event))
        );
        setEditEventId(null);
        toast.success("Event updated successfully");
      })
      .catch((err) => {
        console.error("Error updating event:", err);
        toast.error("Error updating event");
      });
  };

  const handleCancel = () => {
    setEditEventId(null);
    toast.error("Cancelled editing event");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditEventData({ ...editEventData, [name]: value });
  };

  const handleNewEventChange = (e) => {
    const { name, value } = e.target;

    setNewEvent((prevEvent) => {
      const newEvent = { ...prevEvent };

      switch (name) {
        case "titel":
        case "kategorie":
        case "beschreibung":
        case "startDatum":
        case "endDatum":
        case "bild":
        case "headerUrl":
          newEvent[name] = value;
          break;
        case "adresse":
        case "stadt":
        case "bundesland":
        case "land":
          newEvent.ort = { ...newEvent.ort, [name]: value };
          break;
        case "veranstalterName":
          newEvent.veranstalter = { ...newEvent.veranstalter, name: value };
          break;
        case "kontaktEmail":
          newEvent.veranstalter = {
            ...newEvent.veranstalter,
            kontakt: { ...newEvent.veranstalter.kontakt, email: value },
          };
          break;
        default:
          break;
      }

      return newEvent;
    });
  };

  const handleAddEvent = () => {
    axios
      .post("http://localhost:4000/dashboard/event", newEvent)
      .then((res) => {
        setEvents([...events, res.data]);
        setNewEvent({
          titel: "",
          kategorie: "",
          beschreibung: "",
          startDatum: "",
          endDatum: "",
          bild: "",
          headerUrl: "",
          ort: {
            adresse: "",
            stadt: "",
            bundesland: "",
            land: "",
          },
          veranstalter: {
            name: "",
            kontakt: {
              email: "",
            },
          },
        });
        setShowNewEventForm(false);
        toast.success("Event added successfully");
      })
      .catch((err) => {
        console.error("Error adding event:", err);
        toast.error("Error adding event");
      });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(events.length / eventsPerPage))
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const TABLE_HEAD = [
    "Bild",
    "Titel",
    "Kategorie",
    "Beschreibung",
    "Datum",
    "Ort",
    "Veranstalter",
    "Aktionen",
  ];

  const currentEvents = events.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  return (
    <div className="mt-4">
      <ToastContainer />
      <div className="mb-4">
        <Card className="h-full w-full bg-blue-gray-100 p-3">
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none bg-blue-gray-100"
          >
            <div className="flex justify-between items-center">
              <Typography
                variant="4"
                color="blue-gray"
                className="flex items-center justify-between gap-2 font-normal leading-none capitalize"
              >
                Add New Event
              </Typography>
              <Button
                variant="solid"
                color="black"
                onClick={() => setShowNewEventForm(!showNewEventForm)}
              >
                {showNewEventForm ? "Hide Form" : "Show Form"}
              </Button>
            </div>
          </CardHeader>
          {showNewEventForm && (
            <CardBody>
              <div className="flex flex-col gap-4">
                <Input
                  type="text"
                  name="titel"
                  label="Title"
                  value={newEvent.titel}
                  onChange={handleNewEventChange}
                  color="black"
                  className="bg-gray-50"
                />
                <Input
                  type="text"
                  name="kategorie"
                  label="Category"
                  value={newEvent.kategorie}
                  onChange={handleNewEventChange}
                  className="bg-gray-50"
                />
                <Input
                  type="text"
                  name="beschreibung"
                  label="Description"
                  value={newEvent.beschreibung}
                  onChange={handleNewEventChange}
                  className="bg-gray-50"
                />
                <Input
                  type="text"
                  name="bild"
                  label="Image URL"
                  value={newEvent.bild}
                  onChange={handleNewEventChange}
                  className="bg-gray-50"
                />
                <Input
                  type="text"
                  name="headerUrl"
                  label="Header Image URL"
                  value={newEvent.headerUrl}
                  onChange={handleNewEventChange}
                  className="bg-gray-50"
                />
                <Input
                  type="date"
                  name="startDatum"
                  label="Start Date"
                  value={newEvent.startDatum}
                  onChange={handleNewEventChange}
                  className="bg-gray-50"
                />
                <Input
                  type="date"
                  name="endDatum"
                  label="End Date"
                  value={newEvent.endDatum}
                  onChange={handleNewEventChange}
                  className="bg-gray-50"
                />
                <Input
                  type="text"
                  name="adresse"
                  label="Address"
                  value={newEvent.ort.adresse}
                  onChange={handleNewEventChange}
                  className="bg-gray-50"
                />
                <Input
                  type="text"
                  name="stadt"
                  label="City"
                  value={newEvent.ort.stadt}
                  onChange={handleNewEventChange}
                  className="bg-gray-50"
                />
                <Input
                  type="text"
                  name="bundesland"
                  label="State"
                  value={newEvent.ort.bundesland}
                  onChange={handleNewEventChange}
                  className="bg-gray-50"
                />
                <Input
                  type="text"
                  name="land"
                  label="Country"
                  value={newEvent.ort.land}
                  onChange={handleNewEventChange}
                  className="bg-gray-50"
                />
                <Input
                  type="text"
                  name="veranstalterName"
                  label="Organizer Name"
                  value={newEvent.veranstalter.name}
                  onChange={handleNewEventChange}
                  className="bg-gray-50"
                />
                <Input
                  type="email"
                  name="kontaktEmail"
                  label="Organizer Email"
                  value={newEvent.veranstalter.kontakt.email}
                  onChange={handleNewEventChange}
                  className="bg-gray-50"
                />
                <Button variant="solid" color="black" onClick={handleAddEvent}>
                  Add Event
                </Button>
              </div>
            </CardBody>
          )}
        </Card>
      </div>

      <div className="m-4">
        <Card className="h-full w-full bg-blue-gray-100">
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none bg-blue-gray-100"
          >
            <div className="flex justify-between items-center">
              <Typography variant="h5" color="blue-gray">
                Events List
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0 ">
            <table className="container mx-auto w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="w-[100px] cursor-pointer border-y border-blue-gray-100 bg-blue-gray-500 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70 capitalize"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentEvents.map((event, index) => {
                  const isLast = index === events.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  const isEditing = editEventId === event._id;

                  return (
                    <tr key={event._id}>
                      <td className={classes}>
                        <Avatar
                          src={event.bild}
                          alt="Event Bild"
                          size="lg"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                      </td>
                      <td className={classes}>
                        {isEditing ? (
                          <Input
                            type="text"
                            name="titel"
                            value={editEventData.titel}
                            onChange={handleChange}
                          />
                        ) : (
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {event.titel || "No Title"}
                          </Typography>
                        )}
                      </td>
                      <td className={classes}>
                        {isEditing ? (
                          <Input
                            type="text"
                            name="kategorie"
                            value={editEventData.kategorie}
                            onChange={handleChange}
                          />
                        ) : (
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {event.kategorie || "No Category"}
                          </Typography>
                        )}
                      </td>
                      <td className={classes}>
                        {isEditing ? (
                          <Input
                            type="text"
                            name="beschreibung"
                            value={editEventData.beschreibung}
                            onChange={handleChange}
                          />
                        ) : (
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {event.beschreibung || "No Description"}
                          </Typography>
                        )}
                      </td>
                      <td className={classes}>
                        {isEditing ? (
                          <>
                            <Input
                              type="date"
                              name="startDatum"
                              value={
                                editEventData.startDatum
                                  ? new Date(editEventData.startDatum)
                                      .toISOString()
                                      .split("T")[0]
                                  : ""
                              }
                              onChange={handleChange}
                            />
                            <Input
                              type="date"
                              name="endDatum"
                              value={
                                editEventData.endDatum
                                  ? new Date(editEventData.endDatum)
                                      .toISOString()
                                      .split("T")[0]
                                  : ""
                              }
                              onChange={handleChange}
                            />
                          </>
                        ) : (
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {event.startDatum
                              ? new Date(event.startDatum).toLocaleDateString()
                              : "No Start Date"}{" "}
                            -{" "}
                            {event.endDatum
                              ? new Date(event.endDatum).toLocaleDateString()
                              : "No End Date"}
                          </Typography>
                        )}
                      </td>
                      <td className={classes}>
                        {isEditing ? (
                          <>
                            <Input
                              type="text"
                              name="ort.adresse"
                              value={editEventData.ort?.adresse || ""}
                              onChange={handleChange}
                            />
                            <Input
                              type="text"
                              name="ort.stadt"
                              value={editEventData.ort?.stadt || ""}
                              onChange={handleChange}
                            />
                            <Input
                              type="text"
                              name="ort.bundesland"
                              value={editEventData.ort?.bundesland || ""}
                              onChange={handleChange}
                            />
                            <Input
                              type="text"
                              name="ort.land"
                              value={editEventData.ort?.land || ""}
                              onChange={handleChange}
                            />
                          </>
                        ) : (
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {event.ort?.adresse || "No Address"},{" "}
                            {event.ort?.stadt || "No City"},{" "}
                            {event.ort?.bundesland || "No State"},{" "}
                            {event.ort?.land || "No Country"}
                          </Typography>
                        )}
                      </td>
                      <td className={classes}>
                        {isEditing ? (
                          <>
                            <Input
                              type="text"
                              name="veranstalter.name"
                              value={editEventData.veranstalter?.name || ""}
                              onChange={handleChange}
                            />
                            <Input
                              type="email"
                              name="veranstalter.kontakt.email"
                              value={
                                editEventData.veranstalter?.kontakt?.email || ""
                              }
                              onChange={handleChange}
                            />
                          </>
                        ) : (
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {event.veranstalter?.name || "No Organizer"} (
                            {event.veranstalter?.kontakt?.email || "No Email"})
                          </Typography>
                        )}
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-2">
                          {isEditing ? (
                            <>
                              <Tooltip content="Save Changes">
                                <IconButton variant="text" onClick={handleSave}>
                                  <FaSave className="h-5 w-5" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip content="Cancel Editing">
                                <IconButton
                                  variant="text"
                                  onClick={handleCancel}
                                >
                                  <FaTimes className="h-5 w-5" />
                                </IconButton>
                              </Tooltip>
                            </>
                          ) : (
                            <>
                              <Tooltip content="Edit Event">
                                <IconButton
                                  variant="text"
                                  onClick={() => handleEdit(event)}
                                >
                                  <FaEdit className="h-5 w-5" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip content="Delete Event">
                                <IconButton
                                  variant="text"
                                  onClick={() => handleDelete(event._id)}
                                >
                                  <FaTrashAlt className="h-5 w-5" />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Page {currentPage} of {Math.ceil(events.length / eventsPerPage)}
            </Typography>
            <div className="flex gap-2">
              <Button
                variant="outlined"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                size="sm"
                onClick={handleNextPage}
                disabled={
                  currentPage === Math.ceil(events.length / eventsPerPage)
                }
              >
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default EventsTableList;
