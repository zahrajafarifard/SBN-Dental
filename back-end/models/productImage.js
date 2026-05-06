const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ProductImage = sequelize.define("ProductImage", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  mainImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = ProductImage;


