import mongoose from "mongoose";
import moment from "moment-timezone";
const { Schema, model } = mongoose;

const TicketsSchema = new Schema({
  event_name: { type: String },
  category: {
    type: String,
    enum: ["Music", "Theater", "Sports", "Comedy", "Conference"],
  },
  genre: {
    type: String,
    enum: ["Classical", "Jazz", "Rock", "Pop", "Opera", "Hip Hop"],
  },
  artist: { type: String },
  price: { type: String },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  buyer: {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: false,
    },
  },
  barcode: {
    type: String,

    unique: true,
  },
  event_date: {
    type: Date,
    default: () =>
      new Date(
        new Date().toLocaleString("en-US", { timeZone: "Europe/Berlin" })
      ),
  },
  creatItDate: { type: Date, default: Date.now },
  updateItDate: { type: Date, default: Date.now },
  organizer: { type: String },
  event_information: { type: String },
  additional_info: {
    age_restriction: { type: String },
    ticket_availability: { type: Number },
    tickets_sold: { type: Number },
    event_status: {
      type: String,
      enum: ["Active", "Sold Out", "Cancelled"],
    },
    event_type: { type: String },
    seating: {
      type: { type: String },
      available_seats: { type: Number },
      seat_number: { type: Number },
    },
  },
});

// Pre-save middleware to validate date_time
TicketsSchema.pre("save", function (next) {
  // Change here
  if (this.date_time < new Date()) {
    return next(new Error("Event date and time must be in the future"));
  }
  next();
});

// Custom method to update ticket availability
TicketsSchema.methods.updateTicketAvailability = function (ticketsSold) {
  this.additional_info.tickets_sold += ticketsSold;
  this.additional_info.ticket_availability -= ticketsSold;

  if (this.additional_info.ticket_availability <= 0) {
    this.additional_info.event_status = "Sold Out";
  }

  return this.save();
};

const Tickets = model("Tickets", TicketsSchema);

export default Tickets;
