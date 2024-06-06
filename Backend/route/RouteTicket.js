import Ticktes from "../model/Tickets.js";
import express from "express";
import bodyParser from "body-parser";

const route = express.Router();
route
  .get("/", async (req, res) => {
    try {
      const tickets = await Ticktes.find();
      res.status(200).json(tickets);
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .post("/", async (req, res) => {
    const { title, description, date, location, attendees, createdAt } =
      req.body;
    try {
      const tickets = await Ticktes.create({
        title,
        description,
        date,
        location,
        attendees,
        createdAt,
      });
      res.status(200).json(tickets);
    } catch (error) {
      res.status(400).json(error);
    }
  });
