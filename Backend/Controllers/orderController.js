const Order = require("../Models/orderSchema");

exports.createOrder = async (req, res) => {
  try {
    const {
      ticketId,

      quantity,
      totalPrice,
      email,
      paymentMethod,
      userId,
    } = req.body;

    console.log("Received order data:", req.body); // Debugging output

    if (
      !ticketId ||
      !quantity ||
      !totalPrice ||
      !email ||
      !paymentMethod ||
      !userId
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newOrder = new Order({
      ticketId,

      quantity,
      totalPrice,
      email,
      paymentMethod,
      userId, // Hier wird die userId der Bestellung zugewiesen
    });

    await newOrder.save();

    res
      .status(200)
      .json({ message: "Bestellung erfolgreich!", order: newOrder });
  } catch (error) {
    console.error("Fehler beim Speichern der Bestellung:", error);
    res.status(500).json({ message: "Fehler beim Speichern der Bestellung." });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "_id username"); // Hier werden die Bestellungen mit Benutzerdaten (nur _id und username) verknüpft
    res.status(200).json(orders);
  } catch (error) {
    console.error("Fehler beim Abrufen der Bestellungen:", error);
    res.status(500).json({ message: "Fehler beim Abrufen der Bestellungen." });
  }
};
