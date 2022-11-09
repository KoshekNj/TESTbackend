require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const PORT = 3000;
const Admin = require("./models/admin");
const sequelize = require("./config/database");
app.use(express.json());

app.use(bodyParser.json());
//Log in
app.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const admin = await Admin.findOne({ where: { email: req.body.email } });
    if (!admin) return res.status(404).json({ message: "User not found" });

    if (req.body.password !== admin.password)
      return res.status(400).json({ message: "Authentication failed" });

    const token = generateAccessToken({
      username: admin.username,
      email: admin.email,
    });
    console.log(token);

    const refreshToken = jwt.sign(
      {
        username: admin.username,
        email: admin.email,
      },
      process.env.REFRESH_SECRET_TOKEN
    );
    console.log(refreshToken);
    res.status(200).json(admin);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

function generateAccessToken(user) {
  console.log("generate function");
  return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "1d" });
}

app.listen(PORT, console.log(`Server started on port ${PORT}`));

//Test connection

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));
