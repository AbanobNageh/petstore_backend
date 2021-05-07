const sequelizeUtils = require("../../common utils/sequelize_utils");
const models = require("../../../models/index");

const petModel = models.Pet;

/**
*
* Returns if there is a pet registered with this id.
* @param {Number} petId The pet id to look up.
* @return {Boolean} Returns true if a pet exists for the given id, false otherwise.
*
*/
module.exports.isPetRegisteredById = async (petId) => {
  const pet = await petModel.findOne({
    where: {
      id: petId,
    },
  });

  if (pet != null) {
    return true;
  }

  return false;
};

/**
*
* Return the pet with the given pet id.
* @param {Number} petId The pet id to look up.
* @return {Object} The pet corresponding to the given pet id.
*
*/
module.exports.findPetById = async (petId) => {
  const pet = await petModel.findOne({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    where: {
      id: petId,
    },
  });

  return await sequelizeUtils.simplifySequelizeObject(pet);
};
