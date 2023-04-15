const express = require("express");
const router = express.Router();
const {
    getLED,getFan, getFanByID, getLEDByID
} = require("../controllers/deviceControllers");

const { protect } = require("../middleware/authMiddleware.js");

router
  .route("/led")
  .get(protect,getLED);
router
  .route("/led/:id")
  .get(protect,getLEDByID);
router
   .route("/fan")
  .get(protect,getFan);
router
   .route("/fan/:id")
  .get(protect,getFanByID);
module.exports = router;


