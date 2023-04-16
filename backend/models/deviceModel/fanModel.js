const mongoose = require("mongoose");

const fanSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
    value: {
      // fan speed
      type: Number,
      min: 0,
      max: 100,
      default: 0,
      required: true,
      set: function(val) {
        if (val === 0) {
          this.status = false;
        } else {
          this.status = true;
        }
        return val;
      }
    },
  },
  {
    timestamps: true,
  }
);


const Fan = mongoose.model("Fan", fanSchema);

module.exports = Fan;
