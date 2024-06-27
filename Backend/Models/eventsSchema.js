const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  titel: { type: String },
  artist: { String },
  beschreibung: { type: String },
  startDatum: { type: Date },
  endDatum: { type: Date },
  ort: {
    adresse: { type: String },
    stadt: { type: String },
    bundesland: { type: String },
    land: { type: String },
    postleitzahl: { type: String },
  },
  veranstalter: {
    name: { type: String },
    kontakt: {
      email: { type: String },
      telefon: { type: String },
    },
  },
  teilnehmer: [
    {
      name: String,
      email: String,
    },
  ],
  kategorie: { type: String },
  bild: String,
  headerUrl: String,
  tickets: [
    {
      typ: { type: String },
      preis: { type: Number },
      menge: { type: Number },
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
