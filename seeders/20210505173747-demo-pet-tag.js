'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Pet_Tags",
      [
        {
          pet_id: 1,
          tag_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          pet_id: 2,
          tag_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          pet_id: 3,
          tag_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Pet_Tags', null, {});
  }
};
