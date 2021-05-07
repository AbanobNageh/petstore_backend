'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pet.hasMany(models.Pet_Photo, { foreignKey: 'pet_id' });
      Pet.belongsTo(models.Category, { foreignKey: 'category_id' });
      Pet.belongsToMany(models.Tag, { through: models.Pet_Tag, foreignKey: 'pet_id' });
      Pet.hasOne(models.Order, { foreignKey: 'pet_id' });
      Pet.hasOne(models.User_Bid, { foreignKey: 'pet_id' });
    }
  };
  Pet.init({
    category_id: DataTypes.BIGINT,
    name: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: ["available", "pending", "sold"],
    }
  }, {
    sequelize,
    modelName: 'Pet',
  });
  return Pet;
};