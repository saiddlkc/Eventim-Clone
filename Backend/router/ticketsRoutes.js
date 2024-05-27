import express from "express";
import { GetTeckets, PostTickes } from "../contraoller/ticketsController.js";
import bodyParser from "body-parser";
const ticketsRoutes = express.Router();
ticketsRoutes.use(bodyParser.json());

ticketsRoutes.get("/", GetTeckets).post("/", PostTickes);
export default ticketsRoutes;
