'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      pet_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Pets',
          key: 'id',
        }
      },
      user_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Users',
          key: 'id',
        }
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      ship_data: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM,
        values: ["placed", "approved", "delivered"],
      },
      complete: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};