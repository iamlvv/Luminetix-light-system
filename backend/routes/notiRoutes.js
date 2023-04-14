const express = require("express");
const router = express.Router();
const {
    getUserNoti,
    addNoti,
    deleteNoti,
    markNotiAsRead
} = require("../controllers/notiControllers");

const { protect } = require("../middleware/authMiddleware.js");

router
  .route("/noti")
  .get(protect, getUserNoti)
  .delete(protect, deleteNoti)
  .patch(protect, markNotiAsRead);
module.exports = router;
