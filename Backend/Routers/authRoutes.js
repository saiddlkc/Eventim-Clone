// authRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const Users = require("../Models/usersSchema");

const router = express.Router();

router.get("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Finde den Benutzer in der Datenbank
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Überprüfe das Passwort (ohne Hashing)
    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generiere das Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
