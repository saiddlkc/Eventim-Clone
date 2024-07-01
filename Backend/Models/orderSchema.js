const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  email: { type: String, required: true },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["Paypal", "Klarna", "Rechnung"],
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
