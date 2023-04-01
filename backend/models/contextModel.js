const mongoose = require("mongoose");

const contextSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now, required: true },
    description: { type: String, required: true },
    active_temperature: {
      value: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
      active: { type: Boolean, default: false },
      // required: true,
    },
    active_humidity: {
      value: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
      active: { type: Boolean, default: false },
      // required: true,
    },
    human_detection: {
      value: {
        type: Boolean,
        default: false,
      },
      active: { type: Boolean, default: false },
      // required: true,
    },
    lighting_time_limit: {
      type: Number,
      min: 1,
      max: 24,
      default: 0,
      // required: true,
    },
    frequency: {
      required: true,
      today: { type: Boolean, default: true },
      repeat: {
        required: true,
        daily: { type: Boolean, default: false },
        weekly: {
          type: Boolean,
          default: false,
        },
        adjust_weekly: {
          monday: { type: Boolean, default: false },
          tuesday: { type: Boolean, default: false },
          wednesday: { type: Boolean, default: false },
          thursday: { type: Boolean, default: false },
          friday: { type: Boolean, default: false },
          saturday: { type: Boolean, default: false },
          sunday: { type: Boolean, default: false },
        },
      },
    },
    active_time: {
      start_time: {
        type: Number,
        min: 0,
        max: 24,
        default: 0,
        required: true,
      },
      end_time: {
        type: Number,
        min: 0,
        max: 24,
        default: 0,
        required: true,
      },
      required: true,
    },
    control_light: {
      value: {
        type: Boolean,
        default: false,
      },
      light_color: {
        type: String,
        default: "white",
      },
    },
    control_fan: {
      value: {
        type: Boolean,
        default: false,
      },
      fan_speed: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
    },
    // control_system: {}
    notification: {
      email: {
        type: String,
      },
      message: {
        type: String,
      },
      included_info: {
        // current status of devices
        fan_status: {
          type: Boolean,
          default: false,
        },
        light_status: {
          type: Boolean,
          default: false,
        },
        date_time: {
          type: Boolean,
          default: false,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Context = mongoose.model("Context", contextSchema);

module.exports = Context;
