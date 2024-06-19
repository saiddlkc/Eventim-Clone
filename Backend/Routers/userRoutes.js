const express = require("express");
const userRouter = express.Router();
const userController = require("../Controllers/userController");
// const { checkRole } = require("../Controllers/authController");

userRouter.post("/users", userController.createUser);
userRouter.get("/users", userController.getUsers);
userRouter.get("/users/:id", userController.getUser);
userRouter.put("/users/:id", userController.updateUser);
userRouter.delete("/users/:id", userController.deleteUser);

module.exports = userRouter;

// userRouter.post("/users", userController.createUser);
// userRouter.get(
//   "/users/:id",
//   checkRole(["admin", "organizer", "customer"]),
//   userController.getUsers
// );
// userRouter.put(
//   "/users/:id",
//   checkRole(["admin", "organizer"]),
//   userController.updateUser
// );
// userRouter.delete(
//   "/users/:id",
//   checkRole(["admin"]),
//   userController.deleteUser
// );
