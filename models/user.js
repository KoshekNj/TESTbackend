const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "tbl_admin",
  {
    name: {
      type: Sequelize.STRING,
      required: true,
    },
    surname: {
      type: Sequelize.STRING,
      required: true,
    },
    email: {
      type: Sequelize.STRING,
      required: true,
      unique: true,
    },
    dateOfBirth: {
      type: Sequelize.DATE,
      required: true,
    },
    gender: {
      type: Sequelize.ENUM("male", "female"),
      required: true,
    },
    country: {
      type: Sequelize.STRING,
      required: true,
    },
    levelOfAccess: {
      type: Sequelize.ENUM("user", "admin"),
      required: true,
    },
    walletID: {
      type: Sequelize.STRING,
    },
    profileImageURL: {
      type: Sequelize.STRING,
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

module.exports = User;
