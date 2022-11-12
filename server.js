const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const sequelize = require("./config/database");
const User = require("./models/user");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

app.use(bodyParser.json());

//middleware
app.use(async function (req, res, next) {
  console.log("Called" + req.body.email);
  const email = req.body.email;
  if (email) {
    req.user = await User.findOne({
      where: { email: req.body.email },
      raw: true,
    });
    console.log(req.user);
  }
  next();
});

const adminsRouter = require("./routes/admins");
app.use("/admins", adminsRouter);
const authsRouter = require("./routes/auths");
app.use("/auths", authsRouter);

app.listen(PORT, console.log(`Server started on port ${PORT}`));

app.get("/", (req, res) => res.send("index"));

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Amazing Developer",
      },
      servers: ["http://localhost:5000"],
    },
  },
  apis: [".routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
