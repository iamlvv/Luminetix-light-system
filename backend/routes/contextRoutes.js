const express = require("express");
const router = express.Router();
const {
  createContext,
  deleteContext,
  deleteAllContext,
  getAllContexts,
  toggleContext,
  updateContext
} = require("../controllers/contextControllers");

const { protect } = require("../middleware/authMiddleware.js");

router
.route("/")
.get(protect, getAllContexts)
.post(protect,createContext)
.delete(protect,deleteAllContext);
router
.route("/:id")
.delete(protect,deleteContext)
.patch(protect, toggleContext);
router
.route("/:id/edit")
.put(protect,updateContext);


module.exports = router;
