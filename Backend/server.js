import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
// import ticketsRoutes from "./router/ticketsRoutes.js";
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;
const DataBase = process.env.DataBase;
const MongoDb = async () => {
  mongoose.connect(DataBase);
  console.log("DataBase Is Connected");
};
MongoDb().catch((e) => {
  console.log(e, "error");
});

// Routen
// app.use("/dashboard/tickets", ticketsRoutes);
// Starten des Servers
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
