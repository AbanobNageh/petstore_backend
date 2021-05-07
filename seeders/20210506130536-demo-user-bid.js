'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "User_Bids",
      [
        {
          pet_id: 1,
          user_id: 1,
          amount: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          pet_id: 1,
          user_id: 2,
          amount: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          pet_id: 1,
          user_id: 3,
          amount: 280,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          pet_id: 1,
          user_id: 4,
          amount: 320,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User_Bids', null, {});
  }
};
