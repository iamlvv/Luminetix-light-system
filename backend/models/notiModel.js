const mongoose = require("mongoose");

const notiSchema = mongoose.Schema(
  {
    name: {
      type: String
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
    type: {
      alert: {
        type: Boolean,
      },
      context: {
        type: Boolean,
      },
      required: true
    },
    created_date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    message: {
      type: String, // String hoặc Object từ deviceModel?
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Noti = mongoose.model("Noti", notiSchema);

module.exports = Noti;
