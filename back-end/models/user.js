const { DataTypes } = require("sequelize");
const db = require("../db.js");

const User = db.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  securityCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
module.exports = User;
