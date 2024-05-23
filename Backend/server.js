require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./Routers/userRoutes");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/dashboard", userRouter);

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
