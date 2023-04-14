const express = require("express");
const router = express.Router();
const {
  createContext,
  deleteContext,
  getAllContexts,
} = require("../controllers/contextControllers");

const { protect } = require("../middleware/authMiddleware.js");

router
.route("/")
.get(protect, getAllContexts)
.post(protect,createContext)
.delete(protect,deleteContext);

module.exports = router;
