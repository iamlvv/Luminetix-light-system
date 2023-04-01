const mongoose = require("mongoose");

const lightSchema = mongoose.Schema(
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
      // Light sensor value
      type: Number,
      min: 0,
      max: 100,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Light = mongoose.model("Light", lightSchema);

module.exports = Light;
