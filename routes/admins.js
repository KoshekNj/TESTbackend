const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

//Get all users
router.get("/", authenticateToken, async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;
