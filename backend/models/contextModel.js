const mongoose = require("mongoose");

const contextSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now, required: true },
    description: { type: String, required: false },
    active: { type: Boolean, required: true, default: true },
    auto_active: { type: Boolean, required: true, default: true },
    input: {
      active_temperature: {
        min: {
          type: Number,
          min: 0,
          max: 100,
          default: 0,
        },
        max: {
          type: Number,
          min: 0,
          max: 100,
          default: 0,
        },
        active: { type: Boolean, default: false },
      },
      active_light: {
        min: {
          type: Number,
          min: 0,
          max: 100,
          default: 0,
        },
        max: {
          type: Number,
          min: 0,
          max: 100,
          default: 0,
        },
        active: { type: Boolean, default: false },
      },
      active_humidity: {
        min: {
          type: Number,
          min: 0,
          max: 100,
          default: 0,
        },
        max: {
          type: Number,
          min: 0,
          max: 100,
          default: 0,
        },
        active: { type: Boolean, default: false },
      },
      human_detection: {
        value: {
          type: Boolean,
          default: false,
        },
        active: { type: Boolean, default: false },
      }
    },
    output: {
      frequency: {
        no_repeat: { type: Boolean, default: true },
        repeat: {
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
          type: String,
          match: /^([01]\d|2[0-3]):([0-5]\d)$/,
          default: "00:00"
        },
        end_time: {
          type: String,
          match: /^([01]\d|2[0-3]):([0-5]\d)$/
        }
      },      
      control_led: [
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
      ],
      control_fan: [
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
          },
        },
      ],
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
