'use strict';
const userUtils = require("../app/V1/utils/index").userUtils;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "user1",
          first_name: "John",
          last_name: "Doe",
          email: "user1@gmail.com",
          password: await userUtils.hashPlainPassword("123456"),
          phone: "01234567891",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "user2",
          first_name: "John",
          last_name: "Smith",
          email: "user2@gmail.com",
          password: await userUtils.hashPlainPassword("123456"),
          phone: "01234567892",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "user3",
          first_name: "Sara",
          last_name: "Conor",
          email: "user3@gmail.com",
          password: await userUtils.hashPlainPassword("123456"),
          phone: "01234567893",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "user4",
          first_name: "Martin",
          last_name: "Fowler",
          email: "user4@gmail.com",
          password: await userUtils.hashPlainPassword("123456"),
          phone: "01234567894",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
