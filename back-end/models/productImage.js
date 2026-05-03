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

////////////////////////

// const { DataTypes } = require('sequelize');
// const sequelize = require('../db');
// const Product = require('./Product'); // Adjust this path to the Product model

// const ProductImage = sequelize.define('ProductImage', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   imageUrl: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   productId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: Product,
//       key: 'id',
//     },
//   },
// }, {
//   tableName: 'product_images',
//   timestamps: true,
// });

// // Define the relationship between Product and ProductImage
// Product.hasMany(ProductImage, { foreignKey: 'productId', as: 'images' });
// ProductImage.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// module.exports = ProductImage;
