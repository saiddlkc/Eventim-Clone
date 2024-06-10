const express = require("express");
const contactRouter = express.Router();
const ContactController = require("../Controllers/contactController");

contactRouter.post("/contact", ContactController.createContact);
contactRouter.delete("/contact/:id", ContactController.deleteContact);
contactRouter.get("/contacts", ContactController.getContacts);

module.exports = contactRouter;
