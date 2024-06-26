// routes/qr.js

const express = require("express");
const router = express.Router();
const Ticket = require("../model/Tickets");

// POST route to handle QR code scanning
router.post("/", async (req, res) => {
  const { qrCode } = req.body;

  try {
    // Find ticket by QR code
    const ticket = await Ticket.findOne({ qrCode });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Return ticket information
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
