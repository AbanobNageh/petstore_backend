'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.Pet, { foreignKey: 'pet_id' });
      Order.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  };
  Order.init({
    pet_id: DataTypes.BIGINT,
    user_id: DataTypes.BIGINT,
    quantity: DataTypes.INTEGER,
    ship_data: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM,
      values: ["placed", "approved", "delivered"],
    },
    complete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};