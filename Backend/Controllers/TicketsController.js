// const Ticket = require("../models/ticket");
// const QRCode = require("qrcode");

// // Get all tickets
// const GetTicket = async (req, res) => {
//   try {
//     const tickets = await Ticket.find();
//     res.status(200).json(tickets);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Create a new ticket
// const PostTickets = async (req, res) => {
//   const {
//     title,
//     description,
//     location,
//     attendees,
//     price,
//     eventDate,
//     organizer,
//     genre,
//   } = req.body;

//   try {
//     // Generate QR Code
//     const ticketData = {
//       title,
//       description,
//       location,
//       attendees,
//       price,
//       eventDate,
//       organizer,
//       genre,
//     };
//     const qrCodeUrl = await QRCode.toDataURL(JSON.stringify(ticketData));

//     const newTicket = new Ticket({ ...ticketData, qrCode: qrCodeUrl });
//     await newTicket.save();
//     res.status(201).json(newTicket);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get one ticket by ID
// const GetOne = async (req, res) => {
//   try {
//     const ticket = await Ticket.findById(req.params.id);
//     if (!ticket) return res.status(404).json({ message: "Ticket not found" });
//     res.status(200).json(ticket);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a ticket by ID
// const updateTickets = async (req, res) => {
//   const {
//     title,
//     description,
//     location,
//     attendees,
//     price,
//     eventDate,
//     organizer,
//     genre,
//   } = req.body;

//   try {
//     const ticket = await Ticket.findById(req.params.id);
//     if (!ticket) return res.status(404).json({ message: "Ticket not found" });

//     const updatedData = {
//       title,
//       description,
//       location,
//       attendees,
//       price,
//       eventDate,
//       organizer,
//       genre,
//     };

//     // Generate new QR Code if data changes
//     const qrCodeUrl = await QRCode.toDataURL(JSON.stringify(updatedData));
//     ticket.set({ ...updatedData, qrCode: qrCodeUrl });

//     await ticket.save();
//     res.status(200).json(ticket);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete a ticket by ID
// const deleteTicket = async (req, res) => {
//   try {
//     const ticket = await Ticket.findById(req.params.id);
//     if (!ticket) return res.status(404).json({ message: "Ticket not found" });

//     await ticket.remove();
//     res.status(200).json({ message: "Ticket deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   GetTicket,
//   PostTickets,
//   GetOne,
//   updateTickets,
//   deleteTicket,
// };
