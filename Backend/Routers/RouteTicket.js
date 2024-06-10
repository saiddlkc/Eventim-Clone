const express = require("express");
const bodyParser = require("body-parser");
const {
  GetTicket,
  PostTickets,
  GetOne,
  updateTickets,
  deleteTicket,
} = require("../Controllers/TicketsController");

const route = express.Router();
route.use(bodyParser.json());
route.get("/tickets", GetTicket).post("/tickets", PostTickets);

route
  .get("/tickets/:id", GetOne)
  .patch("/tickets/:id", updateTickets)
  .delete("/tickets/:id", deleteTicket);

module.exports = route;
