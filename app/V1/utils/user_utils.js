const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
*
* Hashes a plain password and returns it in encrypted form.
* @param {String} plainPassword The plain password to hash.
* @returns {String} The hash password.
*/
module.exports.hashPlainPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  return hashedPassword;
};
