import mongoose from "mongoose";
const { model, Schema } = mongoose();

const eventSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
  },
  location: {
    type: String,
  },
  attendees: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Ticktes = model("Ticktes", eventSchema);
export default Ticktes;
