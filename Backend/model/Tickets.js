// models/Ticket.js

const mongoose = require("mongoose");
const qrcode = require("qrcode");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

// Function to generate the QR code data
async function generateQRCodeData(ticket) {
  const qrCodeData = {
    _id: ticket._id.toString(),
    qrCode: uuidv4(), // UUID for unique identification
    qrCodeImage: ticket.qrCodeImage,
  };
  return JSON.stringify(qrCodeData);
}

// Function to generate the QR code image as Base64
async function generateQRCodeImage(qrCodeData) {
  try {
    const qrCodeDataURL = await qrcode.toDataURL(qrCodeData);
    return qrCodeDataURL;
  } catch (error) {
    console.error("Error generating QR code image:", error);
    throw error;
  }
}

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    venueName: { type: String, required: true },
    addressLine1: { type: String, required: true },
    state: String,
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  organizer: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  ticketType: { type: String, required: true },
  quantityAvailable: { type: Number, required: true },
  image: { type: String },
  qrCode: { type: String, unique: true },
  qrCodeImage: { type: String, unique: true },
  additionalInfo: {
    ageRestriction: { type: String },
    dressCode: { type: String },
    accessibilityInfo: { type: String },
    parkingInfo: { type: String },
    contactInfo: { type: String },
  },
  seat: { type: String, required: true },
  row: { type: String, required: true },
  selectedSeats: [String], // Array von ausgewählten Sitzplatz-IDs oder anderen relevanten Informationen
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
