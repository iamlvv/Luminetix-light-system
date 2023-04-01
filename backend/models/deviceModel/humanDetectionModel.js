const mongoose = require("mongoose");

const humanDetectionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    value: {
      // Human Detection
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const HumanDetection = mongoose.model("HumanDetection", humanDetectionSchema);

module.exports = HumanDetection;
