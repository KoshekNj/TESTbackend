const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const sequelize = require("./config/database");
//Test connection

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

app.use(bodyParser.json());
const adminsRouter = require("./routes/admins");
app.use("/admins", adminsRouter);

app.listen(PORT, console.log(`Server started on port ${PORT}`));

app.get("/", (req, res) => res.send("index"));
