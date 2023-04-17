const User = require("../models/userModel");
const Light = require("../models/deviceModel/lightModel");
const Humidity = require("../models/deviceModel/humidityModel");
const Temperature = require("../models/deviceModel/temperatureModel");
const HumanDetection = require("../models/deviceModel/humanDetectionModel");
const Fan = require("../models/deviceModel/fanModel");
const LED = require("../models/deviceModel/LEDModel");
const { addNoti } = require("../controllers/notiControllers");
const { context } = require("../controllers/contextControllers");
const Context = require("../models/contextModel.js");
const { controlDevice } = require("../utils/mqtt/publishMQTT");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const moment = require("moment");

// Define the job to run at 12pm every day
const autoUpdateContext = cron.schedule("0 12 * * *", async (client) => {
  const currentTime = moment().utc();
  // Find all contexts that need to be checked
  const contexts = await Context.find({
    $or: [
      { "output.frequency.repeat.daily": true },
      { "putput.frequency.repeat.weekly": true },
    ],
  });
  // Check each context to see if it needs to be activated or deactivated
  for (const context of contexts) {
    const currentDayOfWeek = currentTime.getUTCDay();
    const currentDayOfWeekStr = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ][currentDayOfWeek];
    if (
      frequency.repeat.daily ||
      (frequency.repeat.weekly && frequency.adjust_weekly[currentDayOfWeekStr])
    ) {
      // Schedule auto-active at the begin of the active time range
      if (context.active_time.start_time) {
        const start = new Date(
          currentTime.toDateString() + " " + context.active_time.start_time
        );
        const timeUntilStart = start - currentTime;
        setTimeout(() => {
          updateAutoActive(context, true);
          handleContext(context, client);
        }, timeUntilStart);
      }
      // Schedule auto-active at the end of the active time range
      if (context.active_time.end_time) {
        const end = new Date(
          currentTime.toDateString() + " " + context.active_time.end_time
        );
        const timeUntilEnd = end - currentTime;
        setTimeout(() => {
          updateAutoActive(context, false);
        }, timeUntilEnd);
      }
    }
  }
});

async function updateAutoActive(context, active_stage) {
  await Context.updateOne({ _id: context._id }, { auto_active: active_stage });
}

function isContextActive(active_time, frequency, active, auto_active) {
  // Check if the context is active at the moment
  return (active && auto_active);
  // Otherwise, return the context's current active state
}

const checkContext = async (context) => {
  let satisfied = true;
  if (
    !isContextActive(
      context.output.active_time,
      context.output.frequency,
      context.active,
      context.auto_active
    )
  ) {
    satisfied = false;
    return satisfied;
  }
  if (context.input.active_temperature.active) {
    const { min, max } = context.input.active_temperature;
    const temps = await Temperature.find({
      status: true,
      value: { $lt: max, $gt: min },
    });
    if (temps.length === 0) {
      satisfied = false;
      return satisfied;
    }
  }
  if (context.input.active_light.active) {
    const { min, max } = context.input.active_light;
    const lights = await Light.find({
      status: true,
      value: { $lt: max, $gt: min },
    });
    if (lights.length === 0) {
      satisfied = false;
      return satisfied;
    }
  }
  if (context.input.active_humidity.active) {
    const { min, max } = context.input.active_humidity;
    const humis = await Humidity.find({
      status: true,
      value: { $lt: max, $gt: min },
    });
    if (humis.length === 0) {
      satisfied = false;
      return satisfied;
    }
  }
  if (context.input.human_detection.active) {
    // Add human detection logic here
    const humans = await HumanDetection.find({
      status: true,
      value: context.input.human_detection,
    });
    if (humis.length === 0) {
      satisfied = false;
      return satisfied;
    }
  }

  return satisfied;
};
const handleContext = async (context, client) => {
  console.log(`Evaluate context ${context.name}.`);
  let satisfied = await checkContext(context);
  if (satisfied) {
    console.log(`Context ${context.name} is satisfied!`);
    const fans = context.output.control_fan;
    if (fans.length > 0) {
      fans.forEach(async (fan) => {
        controlDevice("w-fan", fan.name, fan.value, client);
      });
    }
    const leds = context.output.control_led;
    if (leds.length > 0) {
      leds.forEach(async (led) => {
        controlDevice("w-led", led.name, led.value, client);
      });
    }
    //message
    let message = context.notification.message
      ? context.notification.message
      : context.description;
    if (context.notification.included_info.fan_status) {
      message += "\nFan status:";
      actualFans = await Fan.find({});
      actualFans.forEach((fan) => {
        message += `\n${fan.name} value: ${fan.value}`;
      });
    }
    if (context.notification.included_info.light_status) {
      message += "\nLED status:";
      actualLEDs = await LED.find({});
      actualLED.forEach((led) => {
        message += `\n${led.name} value: ${led.value}`;
      });
    }
    if (context.notification.included_info.date_time) {
      message += "\nDate time: ";
      message += `${new Date().getHours()}:${new Date().getMinutes()} ${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`;
    }
    if (context.notification.email) {
      // Code for seinding email notifications goes here
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER, // your email address
          pass: process.env.EMAIL_PASSWORD, // your email password
        },
      });

      // send mail with defined transport object
      const emailSetup = {
        from: process.env.EMAIL_USER, // sender address
        to: context.notification.email, // list of receivers
        subject: `[Luminetix] Notification for Context: ${context.name}`, // Subject line
        text: message, // plain text body
      };

      transporter.sendMail(emailSetup, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Email sent: ${info.response}`);
        }
      });
    }
    // Send context notification to user
    const users = await User.find({});
    for (const user of users) {
      await addNoti({
        body: {
          name: `Context: ${context.name}`,
          type: "context",
          message: message,
        },
        user: user,
      });
    }
    if (
      context.output.frequency.no_repeat ||
      !context.output.active_time.end_time
    )
      updateAutoActive(context, false);
  }
};
const trackingContext = async (deviceType, message, client) => {
  try {
    let contexts = {};
    if (deviceType === "w-temp") {
      contexts = await Context.find({
        "active": true,
        "auto_active": true,
        "input.active_temperature.active": true,
      });
    }
    if (deviceType === "w-light") {
      contexts = await Context.find({
        active: true,
        "auto_active": true,
        "input.active_light.active": true,
      });
    }
    if (deviceType === "w-humi") {
      contexts = await Context.find({
        active: true,
        "auto_active": true,
        "input.active_humidity.active": true,
      });
    }
    if (deviceType == "w-s-temp" && message == "T_OFF") {
      contexts = await Context.find({
        active: true,
        "auto_active": true,
        "input.active_temperature.active": false,
      });
    }
    if (deviceType == "w-s-light" && message == "L_OFF") {
      contexts = await Context.find({
        active: true,
        "auto_active": true,
        "input.active_light.active": false,
      });
    }
    if (deviceType == "w-s-humi" && message == "H_OFF") {
      contexts = await Context.find({
        active: true,
        "auto_active": true,
        "input.active_humidity.active": false,
      });
    }
    if (contexts.length > 0) {
      contexts.forEach(async (context) => {
        handleContext(context, client);
      });
    }
  } catch (err) {
    console.log("Context tracking error: ", err);
  }
};

module.exports = { trackingContext, autoUpdateContext };
