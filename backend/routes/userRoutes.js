const express = require("express");
const router = express.Router();
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
} = require("../controllers/userControllers.js");

const { protect } = require("../middleware/authMiddleware.js");

router.route("/").post(registerUser).get(protect);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/password").put(protect, updateUserPassword);
module.exports = router;
