const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Users Schema
const usersSchema = new Schema(
  {
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
    // events: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Events",
    //   },
    // ],
    // createdEvents: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Events",
    //   },
    // ],
    // bookedEvents: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Events",
    //   },
    // ],
  },
  { timestamps: true } // Burada timestamps özelliğini ekleyin
);

// Pre-save middleware to set default profile picture
usersSchema.pre("save", function (next) {
  if (!this.profilePicture) {
    this.profilePicture = `https://robohash.org/${encodeURIComponent(
      this.name
    )}`;
  }
  next();
});

module.exports = mongoose.model("Users", usersSchema);
