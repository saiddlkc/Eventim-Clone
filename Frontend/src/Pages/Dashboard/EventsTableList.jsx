import React, { useEffect, useState, useMemo } from "react";
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
import { useTable, usePagination, useSortBy } from "react-table";

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
    toast.info("Edit cancelled");
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

  const columns = useMemo(
    () => [
      {
        Header: "Bild",
        accessor: "bild",
        Cell: ({ cell: { value } }) => (
          <img
            src={value}
            alt="Event"
            className="h-10 w-10 rounded-full object-cover"
          />
        ),
      },
      {
        Header: "Titel",
        accessor: "titel",
        Cell: ({ row: { original } }) =>
          editEventId === original._id ? (
            <input
              type="text"
              name="titel"
              value={editEventData.titel}
              onChange={handleChange}
            />
          ) : (
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {original.titel}
            </Typography>
          ),
      },
      {
        Header: "Kategorie",
        accessor: "kategorie",
        Cell: ({ row: { original } }) =>
          editEventId === original._id ? (
            <input
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
              {original.kategorie}
            </Typography>
          ),
      },
      {
        Header: "Beschreibung",
        accessor: "beschreibung",
        Cell: ({ row: { original } }) =>
          editEventId === original._id ? (
            <input
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
              {original.beschreibung}
            </Typography>
          ),
      },
      {
        Header: "Datum",
        accessor: "startDatum",
        Cell: ({ row: { original } }) =>
          editEventId === original._id ? (
            <>
              <input
                type="date"
                name="startDatum"
                value={editEventData.startDatum}
                onChange={handleChange}
              />
              <input
                type="date"
                name="endDatum"
                value={editEventData.endDatum}
                onChange={handleChange}
              />
            </>
          ) : (
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {original.startDatum} - {original.endDatum}
            </Typography>
          ),
      },
      {
        Header: "Ort",
        accessor: "ort",
        Cell: ({ row: { original } }) =>
          editEventId === original._id ? (
            <>
              <input
                type="text"
                name="adresse"
                value={editEventData.ort.adresse}
                onChange={handleChange}
              />
              <input
                type="text"
                name="stadt"
                value={editEventData.ort.stadt}
                onChange={handleChange}
              />
              <input
                type="text"
                name="bundesland"
                value={editEventData.ort.bundesland}
                onChange={handleChange}
              />
              <input
                type="text"
                name="land"
                value={editEventData.ort.land}
                onChange={handleChange}
              />
            </>
          ) : (
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {original.ort.adresse}, {original.ort.stadt},{" "}
              {original.ort.bundesland}, {original.ort.land}
            </Typography>
          ),
      },
      {
        Header: "Veranstalter",
        accessor: "veranstalter",
        Cell: ({ row: { original } }) =>
          editEventId === original._id ? (
            <>
              <input
                type="text"
                name="veranstalterName"
                value={editEventData.veranstalter.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="kontaktEmail"
                value={editEventData.veranstalter.kontakt.email}
                onChange={handleChange}
              />
            </>
          ) : (
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {original.veranstalter.name},{" "}
              {original.veranstalter.kontakt.email}
            </Typography>
          ),
      },
      {
        Header: "Aktionen",
        Cell: ({ row: { original } }) =>
          editEventId === original._id ? (
            <>
              <Tooltip content="Save">
                <IconButton variant="text" color="green" onClick={handleSave}>
                  <FaSave className="h-4 w-4" />
                </IconButton>
              </Tooltip>
              <Tooltip content="Cancel">
                <IconButton variant="text" color="red" onClick={handleCancel}>
                  <FaTimes className="h-4 w-4" />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip content="Edit">
                <IconButton
                  variant="text"
                  color="blue"
                  onClick={() => handleEdit(original)}
                >
                  <FaEdit className="h-4 w-4" />
                </IconButton>
              </Tooltip>
              <Tooltip content="Delete">
                <IconButton
                  variant="text"
                  color="red"
                  onClick={() => handleDelete(original._id)}
                >
                  <FaTrashAlt className="h-4 w-4" />
                </IconButton>
              </Tooltip>
            </>
          ),
      },
    ],
    [editEventId, editEventData]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: events,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <ToastContainer />
      <div>
        <Card>
          <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
            <div className="flex justify-between">
              <Typography variant="h6" color="white">
                Add New Event
              </Typography>
              <Button
                color="blue"
                size="small"
                onClick={() => setShowNewEventForm(!showNewEventForm)}
              >
                {showNewEventForm ? "Close Form" : "New Event"}
              </Button>
            </div>
          </CardHeader>
          {showNewEventForm && (
            <CardBody className="pt-0">
              <div className="flex flex-col gap-4">
                <Input
                  label="Title"
                  name="titel"
                  value={newEvent.titel}
                  onChange={handleNewEventChange}
                />
                <Input
                  label="Category"
                  name="kategorie"
                  value={newEvent.kategorie}
                  onChange={handleNewEventChange}
                />
                <Input
                  label="Description"
                  name="beschreibung"
                  value={newEvent.beschreibung}
                  onChange={handleNewEventChange}
                />
                <div className="flex gap-4">
                  <Input
                    type="date"
                    label="Start Date"
                    name="startDatum"
                    value={newEvent.startDatum}
                    onChange={handleNewEventChange}
                  />
                  <Input
                    type="date"
                    label="End Date"
                    name="endDatum"
                    value={newEvent.endDatum}
                    onChange={handleNewEventChange}
                  />
                </div>
                <Input
                  label="Image URL"
                  name="bild"
                  value={newEvent.bild}
                  onChange={handleNewEventChange}
                />
                <div className="flex gap-4">
                  <Input
                    label="Address"
                    name="adresse"
                    value={newEvent.ort.adresse}
                    onChange={handleNewEventChange}
                  />
                  <Input
                    label="City"
                    name="stadt"
                    value={newEvent.ort.stadt}
                    onChange={handleNewEventChange}
                  />
                </div>
                <div className="flex gap-4">
                  <Input
                    label="State"
                    name="bundesland"
                    value={newEvent.ort.bundesland}
                    onChange={handleNewEventChange}
                  />
                  <Input
                    label="Country"
                    name="land"
                    value={newEvent.ort.land}
                    onChange={handleNewEventChange}
                  />
                </div>
                <Input
                  label="Organizer Name"
                  name="veranstalterName"
                  value={newEvent.veranstalter.name}
                  onChange={handleNewEventChange}
                />
                <Input
                  label="Contact Email"
                  name="kontaktEmail"
                  type="email"
                  value={newEvent.veranstalter.kontakt.email}
                  onChange={handleNewEventChange}
                />
                <Button color="green" onClick={handleAddEvent}>
                  Add Event
                </Button>
              </div>
            </CardBody>
          )}
        </Card>
      </div>

      <div className="mt-6">
        <Card className="h-full w-full bg-blue-gray-100">
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none bg-blue-gray-100"
          >
            <div className="flex items-center justify-between gap-8">
              <Typography variant="h5" color="blue-gray">
                Events
              </Typography>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <div className="w-full md:w-72">
                  <Input
                    label="Search"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0">
            <table
              className="mt-4 w-full min-w-max table-auto text-left"
              {...getTableProps()}
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                        >
                          {column.render("Header")}
                          <ChevronUpDownIcon
                            className="h-4 w-4"
                            strokeWidth={2}
                          />
                        </Typography>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td
                          className="p-4 border-b border-blue-gray-50"
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
          <CardFooter>
            <div className="flex justify-between">
              <Button
                variant="text"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Previous
              </Button>
              <div className="flex items-center gap-2">
                <span>
                  Page{" "}
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>{" "}
                </span>
                <span>
                  | Go to page:{" "}
                  <input
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      gotoPage(page);
                    }}
                    style={{ width: "50px" }}
                  />
                </span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                  }}
                >
                  {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                variant="text"
                onClick={() => nextPage()}
                disabled={!canNextPage}
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
