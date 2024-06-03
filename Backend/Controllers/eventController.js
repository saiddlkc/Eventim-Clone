const Event = require("../Models/eventsSchema.js");

// Alle Events abrufen ab hier
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Einzelnes Event abrufen ab hier
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: "Event nicht gefunden" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Neues Event erstellen ab hier
exports.createEvent = async (req, res) => {
  const event = new Event(req.body);
  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Event aktualisieren ab hier
exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedEvent) {
      res.status(200).json(updatedEvent);
    } else {
      res.status(404).json({ message: "Event nicht gefunden" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Event löschen ab hier
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (deletedEvent) {
      res.status(200).json({ message: "Event gelöscht" });
    } else {
      res.status(404).json({ message: "Event nicht gefunden" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
