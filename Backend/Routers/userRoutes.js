const express = require("express");
const userRouter = express.Router();
const userController = require("../Controllers/userController");
const { checkRole } = require("../Controllers/authController");

userRouter.post("/users", checkRole(["admin"]), userController.createUser);
userRouter.get(
  "/users/:id",
  checkRole(["admin", "organizer", "customer"]),
  userController.getUsers
);
userRouter.put(
  "/users/:id",
  checkRole(["admin", "organizer"]),
  userController.updateUser
);
userRouter.delete(
  "/users/:id",
  checkRole(["admin"]),
  userController.deleteUser
);

module.exports = userRouter;
