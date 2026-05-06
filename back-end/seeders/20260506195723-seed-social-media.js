'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert("SocialMedia", [
      {
        telegram: "https://t.me/yourbrand_tehran",
        insta: "https://instagram.com/yourbrand_tehran",
        whatsApp: "+98 912 345 6789",
        phone: "+98 21 1234 5678",
        address: "Tehran, Iran, Vanak Square, Zafar Street, Building 12",
        email: "info@yourbrand.ir",
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("SocialMedia", null, {});
  },
};