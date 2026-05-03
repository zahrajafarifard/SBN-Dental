const { DataTypes } = require("sequelize");
const db = require("../db.js");

const User = db.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
    require: true,
  },
  mobile: {
    type: DataTypes.STRING,
    require: true,
  },
  password: {
    type: DataTypes.STRING,
    require: true,
  },
  securityCode: {
    type: DataTypes.STRING,
  },
});
module.exports = User;
