const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken.js");
const User = require("../models/userModel.js");


// @desc    Get all noti
// @route   GET /api/users/noti
// @access  Private
const getUserNoti = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      notifications: user.notification,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Add noti
// @route   POST /api/users/noti
// @access  Private
const addNoti = asyncHandler(async (req, res) => {
  const { name, type, message } = req.body;
  const user = await User.findById(req.user._id);
  if (user) {
    user.notification.push({
      name,
      read: false,
      type,
      created_date: new Date(),
      message,
    });
    const updatedUser = await user.save();
    if (res) {
      res.status(201).json(updatedUser.notification[updatedUser.notification.length - 1]);
    }
  } else {
    if (res) {
      res.status(404);
      throw new Error("User not found");
    }
  }
});

// @desc    Delete all noti
// @route   DELETE /api/users/noti
// @access  Private
const deleteNoti = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.notification = [];
    const updatedUser = await user.save();
    res.json({
      message: "All notifications deleted",
      updatedNotifications: updatedUser.notification,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Mark noti as read
// @route   PATCH /api/users/noti
// @access  Private
const markNotiAsRead = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.notification.forEach((notification) => {
      notification.read = true;
    });
    const updatedUser = await user.save();
    res.json(updatedUser.notification);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  getUserNoti,
  addNoti,
  deleteNoti,
  markNotiAsRead,
};
