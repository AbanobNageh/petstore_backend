'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Pets",
      [
        {
          category_id: 1,
          name: "Dog 1",
          status: "available",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_id: 2,
          name: "Cat 1",
          status: "available",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_id: 3,
          name: "Bird 1",
          status: "available",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Pets', null, {});
  }
};
