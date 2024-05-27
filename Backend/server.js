require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./Routers/userRoutes");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/dashboard", userRoutes);

mongoose
  .connect(process.env.SERVER)
  .then(() => {
    console.log("connected to db");
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        `connected to dbatlas , server is running on port ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
