import Ticktes from "../model/Tickets.js";
import express from "express";

const route = express.Router();
route.get("/", async (req, res) => {
  try {
    const tickets = await Ticktes.create(r);
  } catch (error) {}
});
