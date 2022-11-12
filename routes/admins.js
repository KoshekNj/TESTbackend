const express = require("express");
const router = express.Router();
const db = require("../config/database");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { authRole } = require("../middleware/authRole");

router.get("/", authRole("admin"), async (req, res) => {
  try {
    const admins = await User.findAll();
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
