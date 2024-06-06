import Tickets from "../model/TicketsSchema.js";

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const tickets = await Tickets.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single event by ID
const getEventById = async (req, res) => {
  try {
    const ticket = await Tickets.findById(req.params.id);
    if (ticket) {
      res.status(200).json(ticket);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new event
const createEvent = async (req, res) => {
  const ticket = new Tickets({
    event_name: req.body.event_name,
    category: req.body.category,
    genre: req.body.genre,
    artist: req.body.artist,
    price: req.body.price,
    event_date: req.body.event_date,
    location: req.body.location,
    buyer: req.body.buyer,
    barcode: req.body.barcode,
    organizer: req.body.organizer,
    event_information: req.body.event_information,
    additional_info: req.body.additional_info,
    seating: req.body.seating,
  });

  try {
    const save = await ticket.save();
    res.status(201).json(save);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing event by ID
const updateEvent = async (req, res) => {
  try {
    const ticket = await Tickets.findById(req.params.id);
    if (ticket) {
      Object.assign(ticket, req.body);
      const updatedEvent = await ticket.save();
      res.status(200).json(updatedEvent);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an event by ID
const deleteEvent = async (req, res) => {
  try {
    const ticket = await Tickets.findById(req.params.id);
    if (ticket) {
      await ticket.remove();
      res.status(200).json({ message: "Event deleted" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };
