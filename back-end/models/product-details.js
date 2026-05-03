const { DataTypes } = require("sequelize");
const db = require("../db.js");

const Details = db.define("Details", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
    require: true,
  },
  title: {
    type: DataTypes.STRING,
    require: true,
  },
  description: {
    type: DataTypes.STRING,
    require: true,
  },
});
module.exports = Details;
