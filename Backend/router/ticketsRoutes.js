import express from "express";
import Ticktes from "../model/TicketsSchema.js";
const ticketsRoutes = express.Router();

ticketsRoutes
  .get("/", async (req, res) => {
    try {
      const tickets = await Ticktes.find({});
      res.status(200).json(tickets);
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .post("/", async (req, res) => {
    try {
      const {
        event_name,
        category,
        genre,
        artist,
        price,
        location,
        city,
        address,
        date_time,
        organizer,
        additional_info,
        ticket_availability,
        tickets_sold,
        event_status,
        event_type,
        seating,
        available_seats,
      } = req.body;
      const tickets = await Ticktes.create({
        event_name,
        category,
        genre,
        artist,
        price,
        location,
        city,
        address,
        date_time,
        organizer,
        additional_info,
        ticket_availability,
        tickets_sold,
        event_status,
        event_type,
        seating,
        available_seats,
      });
      res.status(200).json(tickets);
    } catch (error) {
      res.status(400).json(error);
    }
  });
