const mongoose = require("mongoose");

const temperatureSchema = mongoose.Schema(
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
      // temperature
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Temperature = mongoose.model("Temperature", temperatureSchema);

module.exports = Temperature;
