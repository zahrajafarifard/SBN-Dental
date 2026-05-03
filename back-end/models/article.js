const { DataTypes } = require("sequelize");
const sequelize = require("../db");

// Define the Article model
const Article = sequelize.define("Article", {
  articleTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortDescription: {
    type: DataTypes.STRING,
  },
  authorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sectionOneTitle: {
    type: DataTypes.STRING,
  },
  sectionOneText: {
    type: DataTypes.TEXT,
  },
  sectionTwoTitle: {
    type: DataTypes.STRING,
  },
  sectionTwoText: {
    type: DataTypes.TEXT,
  },
  sectionThreeTitle: {
    type: DataTypes.STRING,
  },
  sectionThreeText: {
    type: DataTypes.TEXT,
  },
  sectionFourTitle: {
    type: DataTypes.STRING,
  },
  sectionFourText: {
    type: DataTypes.TEXT,
  },
  sectionFiveTitle: {
    type: DataTypes.STRING,
  },
  sectionFiveText: {
    type: DataTypes.TEXT,
  },
  sectionSixTitle: {
    type: DataTypes.STRING,
  },
  sectionSixText: {
    type: DataTypes.TEXT,
  },
  mainImage: {
    type: DataTypes.STRING,
  },
  sectionTwoImage: {
    type: DataTypes.STRING,
  },
  sectionFourImage: {
    type: DataTypes.STRING,
  },
  sectionFiveImage: {
    type: DataTypes.STRING,
  },
  view: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  readingTime: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

// Sync model with database
// sequelize.sync().then(() => console.log('Database synced'));

module.exports = Article;
