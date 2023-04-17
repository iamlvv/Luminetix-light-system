const express = require("express");
const router = express.Router();
const {
  createContext,
  deleteContext,
  getAllContexts,
  toggleContext
} = require("../controllers/contextControllers");

const { protect } = require("../middleware/authMiddleware.js");

router
.route("/")
.get(protect, getAllContexts)
.post(createContext);
router
.route("/:id")
.delete(protect,deleteContext)
.patch(toggleContext);

module.exports = router;
