import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import ticketsRoutes from "./router/ticketsRoutes.js";
const app = express();
app.use(express.json());
app.use(cors());

const MongoDb = async () => {
  mongoose.connect(
    "mongodb+srv://finalproject218:cZLcrlEDrqQGfETJ@eventim.zbmpi1k.mongodb.net/Tickets"
  );
  console.log("MangoDb Is Connected");
};
MongoDb().catch((e) => {
  console.log(e, "error");
});
app.use("/tickets", ticketsRoutes);

const Port = 3000;
app.listen(Port, () => {
  console.log("it port", Port);
});
