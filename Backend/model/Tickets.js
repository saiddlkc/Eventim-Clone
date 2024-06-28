// models/Ticket.js

const mongoose = require("mongoose");
const qrcode = require("qrcode");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

// Function to generate the QR code data
async function generateQRCodeData(ticket) {
  const qrCodeData = {
    _id: ticket._id.toString(),
    title: ticket.title.toString(),
    artist: ticket.artist.toString(),
    description: ticket.description,
    date: ticket.date,
    startTime: ticket.startTime,
    endTime: ticket.endTime,
    price: ticket.price,

    qrCode: uuidv4(), // UUID for unique identification
  };
  return JSON.stringify(qrCodeData);
}

// Function to generate the QR code image as Base64
async function generateQRCodeImage(qrCodeData) {
  try {
    // Example: Create QR code with only _id and qrCode properties
    const qrCodeDataURL = await qrcode.toDataURL(qrCodeData);
    return qrCodeDataURL;
  } catch (error) {
    console.error("Error generating QR code image:", error);
    throw error;
  }
}

const ticketSchema = new mongoose.Schema({
  title: { type: String },
  artist: { type: String },
  description: { type: String },
  date: { type: Date },
  startTime: { type: String },
  endTime: { type: String },
  city: { type: String },
  eventLocation: { type: String },
  organizer: { type: String },
  price: { type: Number },
  currency: { type: String },
  ticketType: { type: String },
  quantityAvailable: { type: Number },
  image: { type: String },
  qrCode: { type: String, unique: true, maxlength: 100 },
  qrCodeImage: { type: String, unique: true, maxlength: 10000 },
  seat: { type: String },
  row: { type: String },
  selectedSeats: [String],
});

// Pre-save hook to generate QR codes and QR code images
ticketSchema.pre("save", async function (next) {
  try {
    const qrCodeData = await generateQRCodeData(this);
    const qrCodeImageData = await generateQRCodeImage(qrCodeData);

    this.qrCode = JSON.parse(qrCodeData).qrCode;
    this.qrCodeImage = qrCodeImageData;

    next();
  } catch (error) {
    next(error);
  }
});

// Method to check availability of tickets
ticketSchema.methods.checkAvailability = async function () {
  try {
    const soldTicketsCount = await Ticket.countDocuments({
      _id: { $ne: this._id },
      date: this.date,
    }); // Count sold tickets for the same date (excluding current ticket)
    const availableTickets = this.quantityAvailable - soldTicketsCount;
    return availableTickets;
  } catch (error) {
    console.error("Error checking ticket availability:", error);
    throw error;
  }
};

const Ticket = mongoose.model("Tickets", ticketSchema);

module.exports = Ticket;
