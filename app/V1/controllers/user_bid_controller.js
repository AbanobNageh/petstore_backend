const sequelizeUtils = require("../../common utils/sequelize_utils");
const models = require("../../../models/index");

const userBidModel = models.User_Bid;

/**
*
* Adds a new user bid.
* @param {Object} userBidData An object containing the data of the user bid.
* @return {Object} The user bid that was added.
*
*/
module.exports.addUserBid = async (userBidData) => {
  const userBid = await userBidModel.create(userBidData);
  return await this.findUserBidById(userBid.id);
};

/**
*
* Returns if the specified user has placed a bid on a specified pet.
* @param {Number} userId The user id to look up.
* @param {Number} petId The pet id to look up.
* @return {Boolean} Returns true if the given user has placed a bid on the given pet, false otherwise..
*
*/
module.exports.isUserBidRegistered = async (userId, petId) => {
  const bid = await userBidModel.findOne({
    where: {
      user_id: userId,
      pet_id: petId,
    },
  });

  if (bid != null) {
    return true;
  }

  return false;
};

/**
*
* Returns a user bid by its id.
* @param {Number} userBidId The given user bid id.
* @return {Object} The user bid data.
*
*/
module.exports.findUserBidById = async (userBidId) => {
  const userBid = await userBidModel.findOne({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    where: {
      id: userBidId,
    },
  });

  return await sequelizeUtils.simplifySequelizeObject(userBid);
};

/**
*
* Returns all bids by the given pet id.
* @param {Object} paginationData Pagination data that is used to paginate the response, can be null to return all bids.
* @param {Number} petId The given pet id.
* @param {Boolean} includeUserData If this is true the user data will be returned for each bid, default is false.
* @return The list of bids related to the given pet id.
*
*/
module.exports.findAllBidsByPetId = async (paginationData, petId, includeUserData = true) => {
  let offset = 0;
  let limit = 25;
  let bids;
  const includedModels = [];

  if (includeUserData) {
    includedModels.push({
      attributes: ['id', 'first_name', 'last_name'],
      model: models.User,
    });
  }

  if (paginationData != null) {
    if (paginationData.page_number != null && paginationData.page_size != null) {
      offset = (paginationData.page_number - 1) * paginationData.page_size;
      limit = paginationData.page_size;
    }
  }

  if (paginationData == null) {
    bids = await userBidModel.findAndCountAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        pet_id: petId,
      },
      include: includedModels,
    });
  } else {
    bids = await userBidModel.findAndCountAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        pet_id: petId,
      },
      include: includedModels,
      limit: limit,
      offset: offset,
    });
  }

  const simplifiedData = {
    data: await sequelizeUtils.simplifySequelizeObjectArray(bids.rows),
    count: bids.count,
    pages: paginationData != null ? Math.ceil(bids.count / limit) : 1,
  };

  return simplifiedData;
};