import Ticktes from "../model/Tickets.js";
import express from "express";

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
    try {
      const tickets = await Ticktes.create({});
      res.status(200).json(tickets);
    } catch (error) {
      res.status(400).json(error);
    }
  });
