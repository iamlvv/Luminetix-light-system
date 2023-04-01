const mongoose = require("mongoose");

const humiditySchema = mongoose.Schema(
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
      // Humidity value
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

const Humidity = mongoose.model("Humidity", humiditySchema);

module.exports = Humidity;
