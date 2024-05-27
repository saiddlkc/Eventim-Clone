const express = require("express");
const router = express.Router();
const eventController = require("../Controllers/eventController.js");

router.get("/event", eventController.getAllEvents);
router.get("/event/:id", eventController.getEventById);
router.post("/event", eventController.createEvent);
router.put("/event/:id", eventController.updateEvent);
router.delete("/event/:id", eventController.deleteEvent);

module.exports = router;
