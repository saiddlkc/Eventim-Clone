import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TicketsSchema = new Schema({
  event_name: {
    type: String,
    // required: true,
  },
  category: {
    type: String,
    enum: ["Music", "Theater", "Sports", "Comedy", "Conference"], // Add more categories as needed
    // required: true,
  },
  genre: {
    type: String,
    enum: ["Classical", "Jazz", "Rock", "Pop", "Opera"], // Add more genres as needed
    // required: true,
  },
  artist: {
    type: String,
    // required: true,
  },
  price: {
    type: String,
    // required: true,
  },
  location: {
    venue: {
      type: String,
      // required: true,
    },
    city: {
      type: String,
      enum: ["Berlin", "Munich", "Hamburg", "Cologne", "Frankfurt"], // Add more cities as needed
      // required: true,
    },
    address: {
      type: String,
      // required: true,
    },
  },
  date_time: {
    type: Date,
    // required: true,
  },
  organizer: {
    type: String,
    // required: true,
  },
  additional_info: {
    age_restriction: {
      type: String,
      // required: true,
    },
    ticket_availability: {
      type: Number,
      // required: true,
    },
    tickets_sold: {
      type: Number,
      // required: true,
    },
    event_status: {
      type: String,
      enum: ["Active", "Sold Out", "Cancelled"],
      // required: true,
    },
    event_type: {
      type: String,
      // required: true,
    },
    seating: {
      type: String,
      // required: true,
      available_seats: {
        type: Number,
      },
    },
  },
});

// Pre-save middleware to validate date_time
TicketsSchema.pre("save", function (next) {
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
