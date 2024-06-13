const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    venueName: {
      type: String,
      required: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    state: String,
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  organizer: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  ticketType: {
    type: String,
    required: true,
  },
  quantityAvailable: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  qrCode: {
    type: String,
    unique: true,
  },
  additionalInfo: {
    ageRestriction: String,
    dressCode: String,
    accessibilityInfo: String,
    parkingInfo: String,
    contactInfo: String,
  },
});

const Tickets = mongoose.model("Tickets", ticketSchema);

module.exports = Tickets;
