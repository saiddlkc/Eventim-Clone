const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderController");

router.post("/orders", orderController.createOrder);

module.exports = router;
