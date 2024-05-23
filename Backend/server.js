import express from "express";
import mongoose from "mongoose";
const app = express();
const MongoDb = async () => {
  try {
    const data = mongoose.connect(
      "mongodb+srv://finalproject218:cZLcrlEDrqQGfETJ@eventim.zbmpi1k.mongodb.net/Tickets"
    );
    console.log("database connected");
  } catch (error) {
    console.log("database erroe", error);
  }
};
MongoDb();
app.get("/", (req, res) => {
  res.json("hallo weld");
});
const Port = 3000;
app.listen(Port, () => {
  console.log("it port", Port);
});
