require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

mongoose
  .connect(process.env.SERVER)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`connected to db , server is running`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/api/daten", async (req, res) => {
  try {
    const daten = await Daten.find();
    res.status(200).json(daten);
  } catch (err) {
    console.error("Fehler beim Abrufen der Daten:", err);
    res.status(500).json({ error: "Interner Serverfehler" });
  }
});
