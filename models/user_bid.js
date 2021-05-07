'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User_Bid.belongsTo(models.Pet, { foreignKey: 'pet_id' });
      User_Bid.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  };
  User_Bid.init({
    pet_id: DataTypes.BIGINT,
    user_id: DataTypes.BIGINT,
    amount: DataTypes.DECIMAL(10, 2)
  }, {
    sequelize,
    modelName: 'User_Bid',
  });
  return User_Bid;
};