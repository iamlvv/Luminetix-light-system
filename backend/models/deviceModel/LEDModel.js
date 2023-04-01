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
      // LED color
      red: {
        type: Boolean,
        default: false,
      },
      blue: {
        type: Boolean,
        default: false,
      },
      yellow: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const LED = mongoose.model("LED", LEDSchema);

module.exports = LED;
