const Order = require("../Models/orderSchema");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { ticketId, eventId, quantity, totalPrice, email, paymentMethod } =
      req.body;

    if (
      !ticketId ||
      !eventId ||
      !quantity ||
      !totalPrice ||
      !email ||
      !paymentMethod
    ) {
      return res
        .status(400)
        .json({ message: "Alle Felder sind erforderlich." });
    }

    const newOrder = new Order({
      ticketId,
      eventId,
      quantity,
      totalPrice,
      email,
      paymentMethod,
    });

    await newOrder.save();

    res.status(200).json({ message: "Bestellung erfolgreich!" });
  } catch (error) {
    console.error("Fehler beim Speichern der Bestellung:", error);
    res.status(500).json({ message: "Fehler beim Speichern der Bestellung." });
  }
};
