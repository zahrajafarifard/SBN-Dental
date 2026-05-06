"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "خمیر دندان",
          createdAt: now,
          updatedAt: now,
        },
        {
          name: "دهان شویه",
          createdAt: now,
          updatedAt: now,
        },
      ],
      { ignoreDuplicates: true },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
