const sequelizeUtils = require("../../common utils/sequelize_utils");
const models = require("../../../models/index");

const userModel = models.User;

/**
*
* Returns if there is a user currently registered with the given username.
* @param {String} userUsername The username to look up.
* @returns {Boolean} Returns true a user exists for the given username, false otherwise.
*/
module.exports.isUserRegisteredByUsername = async (userUsername) => {
  const user = await userModel.findOne({
    where: {
      username: userUsername,
    },
  });

  if (user != null) {
    return true;
  }

  return false;
};

/**
*
* Returns a user by a given username.
* @param {String} userUsername The username to look up.
* @param {Boolean} includePassword If this is true the password will be included in the user data.
* @returns {Object} Returns the user data with the given username.
*/
module.exports.findUserByUsername = async (userUsername, includePassword = false) => {
  const excludedAttributes = ["createdAt", "updatedAt"];

  if (!includePassword) {
    excludedAttributes.push("password");
  }

  const user = await userModel.findOne({
    attributes: {
      exclude: excludedAttributes,
    },
    where: {
      username: userUsername,
    },
  });

  return await sequelizeUtils.simplifySequelizeObject(user);
};
