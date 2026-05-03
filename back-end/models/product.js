const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  productTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mainDescriptionSectionOne: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  mainDescriptionItems: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  // productComposition: {
  //   type: DataTypes.TEXT,
  //   allowNull: true,
  // },
  // productDetailsTitle: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  // },
  // productDetailsDescription: {
  //   type: DataTypes.TEXT,
  //   allowNull: true,
  // },
  // usageInstructions: {
  //   type: DataTypes.TEXT,
  //   allowNull: true,
  // },
  keyWord1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  keyWord2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  keyWord3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bgColor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  view: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Product;
