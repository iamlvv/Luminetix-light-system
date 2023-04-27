const mongoose = require("mongoose");

const LEDSchema = mongoose.Schema(
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
      type: String,
      enum: ["#ffffff", "#ffff00", "#0000ff", "#ff0000", "#000000"],
      required: true,
      default: "#000000",
    },
  },
  {
    timestamps: true,
  }
);

const LED = mongoose.model("LED", LEDSchema);

module.exports = LED;
