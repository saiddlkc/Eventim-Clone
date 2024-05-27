import express from "express";
import bodyParser from "body-parser";
import {
  GetTeckets,
  PostTickets,
  GetTicketsID,
  UpdateTicketsID,
  DeleteTicketsID,
} from "../controller/ticketsController.js";
const ticketsRoutes = express.Router();
ticketsRoutes.use(bodyParser.json());

ticketsRoutes.get("/", GetTeckets).post("/", PostTickets);

ticketsRoutes
  .get("/:id", GetTicketsID)
  .patch("/:id", UpdateTicketsID)
  .delete("/:id", DeleteTicketsID);
export default ticketsRoutes;
