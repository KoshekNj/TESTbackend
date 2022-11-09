const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const Admin = sequelize.define(
  "tbl_admin",
  {
    username: {
      type: Sequelize.STRING,
      required: true,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      required: true,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      required: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Admin;
