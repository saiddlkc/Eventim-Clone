import React, { useEffect, useState } from "react";
import axios from "axios";
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
} from "@material-tailwind/react";
import { FaEdit, FaTrashAlt, FaSave, FaTimes } from "react-icons/fa";

const EventsTableList = () => {
  const [events, setEvents] = useState([]);
  const [editEventId, setEditEventId] = useState(null);
  const [editEventData, setEditEventData] = useState({});

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
      })
      .catch((err) => {
        console.error("Error deleting event:", err);
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
      })
      .catch((err) => {
        console.error("Error updating event:", err);
      });
  };

  const handleCancel = () => {
    setEditEventId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditEventData({ ...editEventData, [name]: value });
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

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <Typography variant="h5" color="blue-gray">
            Events List
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
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
            {events.map((event, index) => {
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
                      size="md"
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
                            <IconButton variant="text" onClick={handleCancel}>
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
    </Card>
  );
};

export default EventsTableList;
