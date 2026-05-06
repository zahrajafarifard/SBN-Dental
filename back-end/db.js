const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "sbn-db",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "root",
  {
    dialect: "mysql",
    // host: process.env.DB_HOST || "localhost",
    host: "mysql",
    port: process.env.DB_PORT || 3306,
    pool: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

module.exports = sequelize;
