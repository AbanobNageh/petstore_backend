'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet_Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pet_Photo.belongsTo(models.Pet, { foreignKey: 'pet_id' });
    }
  };
  Pet_Photo.init({
    pet_id: DataTypes.BIGINT,
    photo_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pet_Photo',
  });
  return Pet_Photo;
};