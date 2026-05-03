const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const SocialMedia = sequelize.define("SocialMedia", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  telegram: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  insta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  whatsApp: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = SocialMedia;
