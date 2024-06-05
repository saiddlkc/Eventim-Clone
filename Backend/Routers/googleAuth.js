const express = require("express");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

const router = express.Router();
const client = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID);

router.post("/google", async (req, res) => {
  const { token } = req.body;
  console.log(token);
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.VITE_GOOGLE_CLIENT_ID,
    });
    console.log(ticket);
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    // Überprüfe den Benutzer in deiner Datenbank und erstelle eine Session oder einen JWT-Token
    res.json({ token: "your-jwt-token" });
  } catch (error) {
    res.status(401).send("Invalid Google token");
  }
});
// Durmus hier wirst du lesen, dass wir den Google Token überprüfen und dann einen JWT-Token zurückgeben.
module.exports = router;
