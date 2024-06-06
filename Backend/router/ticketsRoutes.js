import express from "express";
const router = express.Router();
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controller/ticketsController.js";

// Route to get all events
router.get("/", getAllEvents);

// Route to get a single event by ID
router.get("/:id", getEventById);

// Route to create a new event
router.post("/", createEvent);

// Route to update an existing event by ID
router.put("/:id", updateEvent);

// Route to delete an event by ID
router.delete("/:id", deleteEvent);

export default router;
