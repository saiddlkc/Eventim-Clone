import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import ticketsRoutes from "./router/ticketsRoutes.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/tickest", ticketsRoutes);
const MongoDb = async () => {
  mongoose.connect("");
  console.log("MangoDb Is Connected");
};
MongoDb().catch((e) => {
  console.log(e, "error");
});

const Port = 3000;
app.listen(Port, () => {
  console.log("it port", Port);
});
