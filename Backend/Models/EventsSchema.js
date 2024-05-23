const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  titel: { type: String, required: true },
  beschreibung: { type: String, required: true },
  startDatum: { type: Date, required: true },
  endDatum: { type: Date, required: true },
  ort: {
    adresse: { type: String, required: true },
    stadt: { type: String, required: true },
    bundesland: { type: String, required: true },
    land: { type: String, required: true },
    postleitzahl: { type: String, required: true },
  },
  veranstalter: {
    name: { type: String, required: true },
    kontakt: {
      email: { type: String, required: true },
      telefon: { type: String, required: true },
    },
  },
  teilnehmer: [
    {
      name: String,
      email: String,
    },
  ],
  kategorie: { type: String, required: true },
  bild: { type: String },
  tickets: [
    {
      typ: { type: String, required: true },
      preis: { type: Number, required: true },
      menge: { type: Number, required: true },
    },
  ],
  erstelltAm: { type: Date, default: Date.now },
  aktualisiertAm: { type: Date, default: Date.now },
});

eventSchema.pre("save", function (next) {
  this.aktualisiertAm = Date.now();
  next();
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
