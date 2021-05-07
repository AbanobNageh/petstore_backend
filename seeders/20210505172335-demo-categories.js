'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Dogs",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cats",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Birds",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
