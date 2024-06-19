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
            <>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {original.veranstalter.name}
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {original.veranstalter.kontakt.email}
              </Typography>
            </>
          ),
      },
      {
        Header: "Aktionen",
        accessor: "_id",
        Cell: ({ row: { original } }) =>
          editEventId === original._id ? (
            <>
              <Button
                onClick={handleSave}
                className="bg-blue-500 text-white px-2 py-1 rounded-md"
              >
                <FaSave />
              </Button>
              <Button
                onClick={handleCancel}
                className="bg-red-500 text-white px-2 py-1 rounded-md"
              >
                <FaTimes />
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => handleEdit(original)}
                className="bg-green-500 text-white px-2 py-1 rounded-md"
              >
                <FaEdit />
              </Button>
              <Button
                onClick={() => handleDelete(original._id)}
                className="bg-red-500 text-white px-2 py-1 rounded-md"
              >
                <FaTrashAlt />
              </Button>
            </>
          ),
      },
    ],
    [editEventId, editEventData]
  );

  const data = useMemo(() => events, [events]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
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
      data,
    },
    useSortBy,
    usePagination
  );

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <Typography variant="h5">Events</Typography>
        <Button onClick={() => setShowNewEventForm(!showNewEventForm)}>
          <UserPlusIcon className="h-5 w-5 text-white" />
          Add New Event
        </Button>
      </CardHeader>
      <CardBody>
        {showNewEventForm && (
          <div className="space-y-4 mb-4">
            <input
              type="text"
              name="titel"
              placeholder="Titel"
              value={newEvent.titel}
              onChange={handleNewEventChange}
              className="block w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="kategorie"
              placeholder="Kategorie"
              value={newEvent.kategorie}
              onChange={handleNewEventChange}
              className="block w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="beschreibung"
              placeholder="Beschreibung"
              value={newEvent.beschreibung}
              onChange={handleNewEventChange}
              className="block w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="date"
              name="startDatum"
              value={newEvent.startDatum}
              onChange={handleNewEventChange}
              className="block w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="date"
              name="endDatum"
              value={newEvent.endDatum}
              onChange={handleNewEventChange}
              className="block w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="bild"
              placeholder="Bild URL"
              value={newEvent.bild}
              onChange={handleNewEventChange}
              className="block w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="adresse"
              placeholder="Adresse"
              value={newEvent.ort.adresse}
              onChange={handleNewEventChange}
              className="block w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="stadt"
              placeholder="Stadt"
              value={newEvent.ort.stadt}
              onChange={handleNewEventChange}
              className="block w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="bundesland"
              placeholder="Bundesland"
              value={newEvent.ort.bundesland}
              onChange={handleNewEventChange}
              className="block w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="land"
              placeholder="Land"
              value={newEvent.ort.land}
              onChange={handleNewEventChange}
              className="block w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="veranstalterName"
              placeholder="Veranstalter Name"
              value={newEvent.veranstalter.name}
              onChange={handleNewEventChange}
              className="block w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              name="kontaktEmail"
              placeholder="Veranstalter Email"
              value={newEvent.veranstalter.kontakt.email}
              onChange={handleNewEventChange}
              className="block w-full p-2 border border-gray-300 rounded"
            />
            <Button
              onClick={handleAddEvent}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Event
            </Button>
          </div>
        )}
        <table
          {...getTableProps()}
          className="min-w-full divide-y divide-gray-200"
        >
          <thead className="bg-gray-50">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " ▼"
                          : " ▲"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="bg-white divide-y divide-gray-200"
          >
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
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
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </CardBody>
      <CardFooter>
        <ToastContainer />
      </CardFooter>
    </Card>
  );
};

export default EventsTableList;
