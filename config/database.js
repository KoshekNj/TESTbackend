const { Sequelize } = require("sequelize");

module.exports = new Sequelize("TestDB", "postgres", "mgmt123", {
  host: "localhost",
  dialect: "postgres",
});
