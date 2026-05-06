"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert("Contacts", [
      {
        name: "Ali Rezaei",
        mobile: "+98 912 345 6789",
        message:
          "Hello, I want more information about your products and pricing.",
        status: "unread",
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Sara Mohammadi",
        mobile: "+98 930 112 3344",
        message: "Do you have delivery in Tehran? Please contact me.",
        status: "read",
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Mehdi Karimi",
        mobile: "+98 991 778 9900",
        message: "I would like to collaborate with your company.",
        status: "unread",
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Contacts", null, {});
  },
};
