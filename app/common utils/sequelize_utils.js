/**
*
* simplify a created sequelize object.
* @param {Object} createdSequelizeObject The object to simplify.
* @returns {Object} Returns the simplified sequelize object.
*
*/
module.exports.simplifyCreatedSequelizeObject = async (
  createdSequelizeObject
) => {
  return JSON.parse(JSON.stringify(createdSequelizeObject));
};

/**
*
* simplify a sequelize object.
* @param {Object} sequelizeObject The object to simplify.
* @returns {Object} Returns the simplified sequelize object.
*
*/
module.exports.simplifySequelizeObject = async (sequelizeObject) => {
  if (!sequelizeObject) {
    return null;
  }

  return sequelizeObject.toJSON();
};

/**
*
* simplify an array of sequelize objects.
* @param {Array<Object>} sequelizeObjectArray The array of objects to simplify.
* @returns {Object} Returns the simplified sequelize object array.
*
*/
module.exports.simplifySequelizeObjectArray = async (sequelizeObjectArray) => {
  if (!sequelizeObjectArray) {
    return null;
  }

  const simpleArray = sequelizeObjectArray.map((object) => object.toJSON());
  return simpleArray;
};
