const express = require("express");

const controllers = require("../controllers/index");
const commonUtils = require("../../common utils/index");
const utils = require("../utils/index");

const errorUtils = commonUtils.errorUtils;

const userRouter = express.Router();

/**
*
* The route used by a user to bid on specific pet.
*/
userRouter.post("/bid/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const bidData = req.body;

    const user = await controllers.userController.findUserByUsername(username);

    if (!user) {
      return res.status(404).send(await errorUtils.getErrorObject(404, errorCodes.USER_NOT_FOUND, "en"));
    }

    if (bidData == null || bidData.pet_id == null || bidData.amount == null) {
      return res.status(400).send(await errorUtils.getErrorObject(400, errorCodes.INCORRECT_INPUT, "en"));
    }

    if (typeof bidData.pet_id != "number" || typeof bidData.amount != "number") {
      return res.status(400).send(await errorUtils.getErrorObject(400, errorCodes.INCORRECT_INPUT, "en"));
    }

    if (!(await controllers.petController.isPetRegisteredById(bidData.pet_id))) {
      return res.status(400).send(await errorUtils.getErrorObject(400, errorCodes.INCORRECT_INPUT, "en"));
    }

    if (await controllers.userBidController.isUserBidRegistered(user.id, bidData.pet_id)) {
      return res.status(400).send(await errorUtils.getErrorObject(400, errorCodes.BID_REGISTERED, "en"));
    }

    await controllers.userBidController.addUserBid({
      pet_id: bidData.pet_id,
      user_id: user.id,
      amount: bidData.amount,
    });

    res.status(200).send({ message: "bid has been added" });
  } catch (error) {
    console.log(error);
    return res.status(400).send(await errorUtils.getErrorObject(errorCodes.UNKNOWN_ERROR, "en"));
  }
});

module.exports = userRouter;
