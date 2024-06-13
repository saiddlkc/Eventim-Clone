import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Input,
  Modal,
} from "@material-tailwind/react";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ticketType, setTicketType] = useState("");
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/dashboard/event")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the events!", error);
      });
  }, []);

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  const handleBuyTickets = () => {
    if (!selectedEvent || !ticketType || ticketQuantity < 1) return;

    const event = { ...selectedEvent };
    const ticket = event.tickets.find((t) => t.typ === ticketType);

    if (ticket && ticket.menge >= ticketQuantity) {
      ticket.menge -= ticketQuantity;
      axios
        .put(`http://localhost:4000/dashboard/event/${event._id}`, event)
        .then((response) => {
          setEvents(
            events.map((e) => (e._id === event._id ? response.data : e))
          );
          closeModal();
        })
        .catch((error) => {
          console.error("There was an error updating the event!", error);
        });
    } else {
      alert("Nicht genügend Tickets verfügbar.");
    }
  };

  return (
    <div className="p-6">
      <Typography variant="h2" color="blue-gray" className="mb-6">
        Verfügbare Events
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event._id} className="shadow-lg">
            <CardHeader className="relative h-56">
              <img
                src={event.bild}
                alt={event.titel}
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray">
                {event.titel}
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                {event.beschreibung}
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                {new Date(event.startDatum).toLocaleDateString()} -{" "}
                {new Date(event.endDatum).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                {event.ort.stadt}, {event.ort.land}
              </Typography>
              <Button
                color="blue"
                onClick={() => openModal(event)}
                className="mt-4"
              >
                Tickets kaufen
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>

      {selectedEvent && (
        <Modal size="lg" active={isModalOpen} toggler={closeModal}>
          <Modal.Header toggler={closeModal}>
            Tickets kaufen für {selectedEvent.titel}
          </Modal.Header>
          <Modal.Body>
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                label="Ticket Typ"
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value)}
              />
              <Input
                type="number"
                label="Menge"
                value={ticketQuantity}
                onChange={(e) => setTicketQuantity(e.target.value)}
                min="1"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="blue" onClick={handleBuyTickets}>
              Kaufen
            </Button>
            <Button color="gray" onClick={closeModal}>
              Schließen
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default EventsPage;
