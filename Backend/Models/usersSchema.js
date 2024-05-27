const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Users Schema
const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "organizer", "customer"],
    default: "customer",
  },
  profilePicture: {
    type: String,
    default: "",
  },
  //   events: [
  //     {
  //       type: Schema.Types.ObjectId,
  //       ref: "Events",
  //     },
  //   ],
  //   createdEvents: [
  //     {
  //       type: Schema.Types.ObjectId,
  //       ref: "Events",
  //     },
  //   ],
  //   bookedEvents: [
  //     {
  //       type: Schema.Types.ObjectId,
  //       ref: "Events",
  //     },
  //   ],
});

module.exports = mongoose.model("Users", usersSchema);

// Events Schema
// Tickets Schema
