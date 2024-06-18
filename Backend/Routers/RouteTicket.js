const express = require("express");
const router = express.Router();
const Ticket = require("../model/Tickets");
const fs = require("fs");

// GET alle Tickets
router.get("/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ein Ticket
router.get("/tickets/:id", getTicket, (req, res) => {
  res.json(res.ticket);
});

// POST ein Ticket
router.post("/tickets", async (req, res) => {
  const ticket = new Ticket(req.body);
  try {
    const newTicket = await ticket.save();
    res.status(201).json(newTicket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT ein Ticket aktualisieren
router.put("/tickets/:id", getTicket, async (req, res) => {
  if (req.body.title != null) {
    res.ticket.title = req.body.title;
  }
  if (req.body.description != null) {
    res.ticket.description = req.body.description;
  }
  // Füge hier alle weiteren Felder hinzu, die aktualisiert werden können...

  try {
    const updatedTicket = await res.ticket.save();
    res.json(updatedTicket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE ein Ticket
router.delete("/tickets/:id", getTicket, async (req, res) => {
  try {
    // Ticket abrufen, um den Dateipfad des QR-Codes zu erhalten
    const ticket = res.ticket;
    const qrCodeFilename = ticket.qrCodeImage; // Hier den Dateinamen des QR-Code-Bildes verwenden

    // QR-Code Datei löschen, wenn vorhanden
    if (qrCodeFilename) {
      // Passe den Dateipfad entsprechend deiner QR-Code-Speicherstruktur an
      const qrCodePath = `./qr_codes/${qrCodeFilename}`;
      // QR-Code Datei löschen
      fs.unlinkSync(qrCodePath);
      console.log("QR-Code erfolgreich gelöscht:", qrCodePath);
    }

    // Ticket löschen
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: "Ticket erfolgreich gelöscht" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware, um ein einzelnes Ticket anhand der ID zu erhalten
async function getTicket(req, res, next) {
  let ticket;
  try {
    ticket = await Ticket.findById(req.params.id);
    if (ticket == null) {
      return res.status(404).json({ message: "Ticket nicht gefunden" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.ticket = ticket;
  next();
}

module.exports = router;
