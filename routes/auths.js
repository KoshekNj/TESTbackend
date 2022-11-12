const express = require("express");
const router = express.Router();
const app = express();
const User = require("../models/user");
const bcrypt = require("bcrypt");

//Log in
router.post("/login", async (req, res) => {
  try {
    const admin = await User.findOne({ where: { email: req.body.email } });
    if (!admin) return res.status(404).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );

    if (!validPassword)
      return res.status(400).json({ message: "Authentication failed" });

    res.status(200).json(admin);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
