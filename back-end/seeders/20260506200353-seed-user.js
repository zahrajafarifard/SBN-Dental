"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // plain passwords (ONLY for dev/testing)
    const plainUsers = [
      {
        mobile: "16047350175",
        password: "123456",
      },
    ];

    // hash passwords
    const users = await Promise.all(
      plainUsers.map(async (user) => ({
        mobile: user.mobile,
        password: await bcrypt.hash(user.password, 10),
        securityCode: null,
        createdAt: now,
        updatedAt: now,
      })),
    );

    await queryInterface.bulkInsert("Users", users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
