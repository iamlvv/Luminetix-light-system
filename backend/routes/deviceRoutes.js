const express = require("express");
const router = express.Router();
const {
    getLED,getFan
} = require("../controllers/deviceControllers");

const { protect } = require("../middleware/authMiddleware.js");

router
  .route("/led")
  .get(getLED);
router
   .route("/fan")
  .get(getFan);
module.exports = router;


