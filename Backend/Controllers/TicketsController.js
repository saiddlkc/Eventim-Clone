const Tickets = require("../model/Tickets");

const GetTicket = async (req, res) => {
  try {
    const tickets = await Tickets.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const PostTickets = async (req, res) => {
  const { title, description, date, location, attendees, createdAt } = req.body;
  try {
    const tickets = await Tickets.create({
      title,
      description,
      date,
      location,
      attendees,
      createdAt,
    });
    res.status(201).json(tickets); // 201 status code for resource creation
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetOne = async (req, res) => {
  try {
    const ticketsID = req.params.id;
    const result = await Tickets.findById(ticketsID); // Corrected to use Tickets model
    if (!result) {
      return res.status(404).send("Ticket doesn't exist");
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(404).send("Ticket doesn't exist");
  }
};

const updateTickets = async (req, res) => {
  try {
    const ticketsID = req.params.id;
    const { title, description, date, location, attendees, createdAt } =
      req.body;
    const result = await Tickets.findByIdAndUpdate(
      ticketsID,
      {
        title,
        description,
        date,
        location,
        attendees,
        createdAt,
      },
      { new: true } // To return the updated document
    );
    if (!result) {
      return res.status(404).send("Ticket doesn't exist");
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const ticketsID = req.params.id;
    const result = await Tickets.findByIdAndDelete(ticketsID);
    if (!result) {
      return res.status(404).send("Ticket doesn't exist");
    }
    res.status(200).send(`Deleted successfully: ${ticketsID}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  GetTicket,
  PostTickets,
  GetOne,
  updateTickets,
  deleteTicket,
};
