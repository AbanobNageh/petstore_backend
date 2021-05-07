const express = require("express");

const controllers = require("../controllers/index");
const commonUtils = require("../../common utils/index");
const utils = require("../utils/index");

const errorUtils = commonUtils.errorUtils;

const userRouter = express.Router();
/**
*
* The route used by the pet owner to view the bids placed on a pet.
*/
userRouter.get("/bid/:petId", async (req, res) => {
  try {
    const petId = parseInt(req.params.petId);
    const page_number = parseInt(req.query.page_number);
    const page_size = parseInt(req.query.page_size);
    let paginationData = null;

    if (Number.isInteger(page_number) && Number.isInteger(page_size)) {
      if (page_number !== 0 && page_size !== 0) {
        paginationData = { page_number: page_number, page_size: page_size };
      }
    }

    if (petId == null || typeof petId != "number" || Number.isNaN(petId)) {
      return res.status(400).send(await errorUtils.getErrorObject(400, errorCodes.INCORRECT_INPUT, "en"));
    }

    if (!(await controllers.petController.isPetRegisteredById(petId))) {
      return res.status(404).send(await errorUtils.getErrorObject(404, errorCodes.PET_NOT_FOUND, "en"));
    }

    const petBids = await controllers.userBidController.findAllBidsByPetId(paginationData, petId, false);

    res.status(200).send(petBids);
  } catch (error) {
    console.log(error);
    return res.status(400).send(await errorUtils.getErrorObject(errorCodes.UNKNOWN_ERROR, "en"));
  }
});

/**
*
* The route used by the pet owner to view the results of an auction on a bet.
*/
userRouter.get("/auction/:petId", async (req, res) => {
  try {
    const petId = parseInt(req.params.petId);

    if (petId == null || typeof petId != "number" || Number.isNaN(petId)) {
      return res.status(400).send(await errorUtils.getErrorObject(400, errorCodes.INCORRECT_INPUT, "en"));
    }

    if (!(await controllers.petController.isPetRegisteredById(petId))) {
      return res.status(404).send(await errorUtils.getErrorObject(404, errorCodes.PET_NOT_FOUND, "en"));
    }

    const petBids = await controllers.userBidController.findAllBidsByPetId(null, petId, true);

    if (petBids.count == 0) {
      return res.status(200).send({ message: "No winners" });
    }

    let bidsMap = new Map();
    let bidAmounts = [];

    for (let petBid of petBids.data) {
      bidAmounts.push(petBid.amount);
      if (bidsMap.has(petBid.amount)) {
        const bidders = bidsMap.get(petBid.amount);
        bidders.push(petBid.User.first_name + " " + petBid.User.last_name);
        bidders.sort();
        bidsMap.set(petBid.amount, bidders);
      } else {
        const bidders = [];
        bidders.push(petBid.User.first_name + " " + petBid.User.last_name);
        bidsMap.set(petBid.amount, bidders);
      }
    }

    bidsMap = new Map([...bidsMap.entries()].sort((e1, e2) => e2[0] - e1[0]));
    bidAmounts.sort((e1, e2) => e2 - e1);

    let bidAmountIndex = 1;
    const resultMap = {};

    for (let [bidAmount, bidders] of bidsMap) {
      for (let bidder of bidders) {
        if (bidAmountIndex < bidAmounts.length) {
          resultMap[bidder] = bidAmounts[bidAmountIndex];
        } else {
          resultMap[bidder] = "Lost";
        }
        bidAmountIndex = bidAmountIndex + 1;
      }
    }

    res.status(200).send(resultMap);
  } catch (error) {
    console.log(error);
    return res.status(400).send(await errorUtils.getErrorObject(errorCodes.UNKNOWN_ERROR, "en"));
  }
});

module.exports = userRouter;
