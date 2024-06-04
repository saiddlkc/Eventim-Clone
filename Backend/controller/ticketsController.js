import Ticktes from "../model/TicketsSchema.js";

const GetTeckets = async (req, res) => {
  try {
    const tickets = await Ticktes.find({});
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).json(error);
  }
};

const PostTickets = async (req, res) => {
  const {
    event_name,
    category,
    genre,
    artist,
    price,
    location: { venue, city, address },
    buyer,
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
  } = req.body;
  try {
    const tickets = await Ticktes.create({
      event_name,
      category,
      genre,
      artist,
      price,
      location: { venue, city, address },
      buyer,
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
    });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).json(error);
  }
};

const GetTicketsID = async (req, res) => {
  try {
    const { id } = req.params;
    const tickets = await Ticktes.findById(id);
    if (!tickets) {
      res.status(400).json({ message: "ticket is not found" });
    }
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).json(error);
  }
};

const UpdateTicketsID = async (req, res) => {
  const { id } = req.params;
  const {
    event_name,
    category,
    genre,
    artist,
    price,
    location: { venue, city, address },
    buyer,
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
  } = req.body;
  try {
    const tickets = await Ticktes.findByIdAndUpdate(id, {
      event_name,
      category,
      genre,
      artist,
      price,
      location: { venue, city, address },
      buyer,
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
    });
    if (!tickets) {
      res.status(400).json({ message: "ticket is not found" });
    }
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).json(error);
  }
};

const DeleteTicketsID = async (req, res) => {
  const { id } = req.params;
  try {
    const tickets = await Ticktes.findByIdAndDelete(id);
    if (!tickets) {
      res.status(400).json({ message: "ticket is not found" });
    }
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).json(error);
  }
};
export {
  GetTeckets,
  PostTickets,
  GetTicketsID,
  UpdateTicketsID,
  DeleteTicketsID,
};
