const Context = require("../models/contextModel.js");
const User = require("../models/userModel.js");
const { addNoti } = require("../controllers/notiControllers.js");
const asyncHandler = require("express-async-handler");
const Light = require("../models/deviceModel/lightModel");
const Humidity = require("../models/deviceModel/humidityModel");
const Temperature = require("../models/deviceModel/temperatureModel");
const HumanDetection = require("../models/deviceModel/humanDetectionModel");
const Fan = require("../models/deviceModel/fanModel");
const LED = require("../models/deviceModel/LEDModel");
const { controlDevice } = require("../utils/mqtt/publishMQTT");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const { CronJob } = require("cron");
const moment = require("moment");

const scheduleContext = {};
// @desc    Create a new context
// @route   POST /api/contexts
// @access  Private
const createContext = asyncHandler(async (req, res) => {
  const { name, description, input, output, notification } = req.body;

  try {
    const context = await Context.create({
      name,
      description,
      input,
      output,
      notification,
    });
    if (
      (context.output.frequency.repeat.daily ||
        context.output.frequency.repeat.weekly) &&
      !context.output.active_time.endTime
    ) {
      context.output.active_time.endTime = "23:59";
      await context.save();
    }
    handleActiveTime(context);
    res.status(201).json(context);
    const users = await User.find({});
    for (const user of users) {
      await addNoti({
        body: {
          name: "New context",
          type: "context",
          message: `Create new context: ${context.name}`,
        },
        user: user,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating context", error });
  }
});

// @desc    Delete a context by ID
// @route   DELETE /api/contexts/:id
// @access  Private
const deleteContext = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const context = await Context.findById(id);
    if (!context) {
      return res.status(404).json({ message: "Context not found" });
    }
    if (!scheduleContext[id]) {
    }
    const job = scheduleContext[id];

    if (job.start) {
      job.start.stop();
    }

    if (job.end) {
      job.end.stop();
    }
    delete scheduleContext[id];
    await context.deleteOne();
    res.status(200).json({ message: "Context deleted successfully" });
    const users = await User.find({});
    for (const user of users) {
      await addNoti({
        body: {
          name: `Delete context`,
          type: "context",
          message: `Delete context: ${context.name}`,
        },
        user: user,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting context" });
  }
});

// @desc    Delete all context
// @route   DELETE /api/contexts
// @access  Private
const deleteAllContext = asyncHandler(async (req, res) => {
  try {
    try {
      await Context.deleteMany({});
      for(let id in scheduleContext)
      {
        let job = scheduleContext[id];
        if (job.start) {
          job.start.stop();
        }
        if (job.end) {
          job.end.stop();
        }
      delete job;
      }
      res.status(200).json({ message: "All contexts deleted successfully." });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting all context" });
  }
});

// @desc    Get all contexts
// @route   GET /api/contexts
// @access  Private
const getAllContexts = asyncHandler(async (req, res) => {
  try {
    const contexts = await Context.find();
    res.status(200).json(contexts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting contexts" });
  }
});

// @desc    Update context information
// @route   PUT /api/contexts/:id/edit
// @access  Private
const updateContext = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const context = await Context.findById(id);

  if (!context) {
    return res.status(404).json({ error: `Context id ${id} not found` });
  }

  const updatedFields = req.body;
  const allowedFields = [
    "name",
    "description",
    "active",
    "input",
    "output",
    "notification",
  ];

  const isValidUpdate = Object.keys(updatedFields).every((field) =>
    allowedFields.includes(field)
  );

  if (!isValidUpdate) {
    return res.status(400).json({ error: "Invalid update fields" });
  }

  const updatedContext = await Context.findByIdAndUpdate(
    id,
    updatedFields,
    { new: true } // add this option to get the updated document
  );
  const outputUpdate = updatedFields.hasOwnProperty("output");
  const activeTimeUpdate =
    outputUpdate && updatedFields.output.hasOwnProperty("active_time");

  if (activeTimeUpdate) {
    console.log("The active_time was changed!");
    await handleActiveTime(updatedContext);
  }

  const subscribedUsers = await User.find({ subscribedContexts: id });

  const notifications = subscribedUsers.map(async (user) => {
    await addNoti({
      body: {
        name: `Context Updated`,
        type: "context",
        message: `Context "${updatedContext.name}" was updated!`,
      },
      user,
    });
  });

  await Promise.all(notifications);

  return res.json({
    message: `Context "${updatedContext.name}" was updated!`,
  });
});

// @desc    Turn context on or off
// @route   PATCH /api/contexts/:id
// @access  Private
const toggleContext = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const context = await Context.findById(id);
    if (!context) {
      return res.status(404).json({ error: `Context id ${id} not found` });
    }
    context.active = !context.active;
    await context.save();

    if (context.active) {
      handleContext(context);
    }

    const users = await User.find({});

    for (const user of users) {
      await addNoti({
        body: {
          name: `Adjust context`,
          type: "context",
          message: `Context "${context.name}" turned ${
            context.active ? "on" : "off"
          }`,
        },
        user: user,
      });
    }
    return res.json({
      message: `Context "${context.name}" turned ${
        context.active ? "on" : "off"
      }`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

// // Define the job to run at 12pm every day
// const dailyRepeatContext = new CronJob(
//   "15 02 * * *",
//   async () => {
//     const contexts = await Context.find({ "frequency.repeat.weekly": true });
//     for (const context of contexts) {
//       const daysOfWeek = [
//         "sunday",
//         "monday",
//         "tuesday",
//         "wednesday",
//         "thursday",
//         "friday",
//         "saturday",
//       ];

//       const currentDayOfWeek = daysOfWeek[moment().get("day")];
//       if (!scheduleContext[context._id]) {
//         scheduleContext[context._id] = {};
//         const job = scheduleContext[context._id];
//         const { active_time } = context.output;
//         const startTime = moment(
//           `${moment().format("YYYY-MM-DD")} ${active_time.start_time}`,
//           "YYYY-MM-DD HH:mm"
//         );
//         const endTime = active_time.end_time
//           ? moment(
//               `${moment().format("YYYY-MM-DD")} ${active_time.end_time}`,
//               "YYYY-MM-DD HH:mm"
//             )
//           : null;
//         job.start = new CronJob(
//           `${startTime.minutes()} ${startTime.hours()} * * *`,
//           () => jobLogic(context, true),
//           null,
//           true
//         );
//         if (endTime) {
//           job.end = new CronJob(
//             `${endTime.minutes()} ${endTime.hours()} * * *`,
//             () => jobLogic(context, false),
//             null,
//             true
//           );
//         } else job.end = null;
//       }
//       if (!context.output.frequency.repeat.adjust_weekly[currentDayOfWeek]) {
//         try {
//           context.auto_active = false;
//           await context.save();
//           if (scheduleContext[context._id].start)
//             scheduleContext[context._id].start.stop();
//           if (scheduleContext[context._id].end)
//             scheduleContext[context._id].end.stop();
//         } catch (err) {
//           console.log(`Error while checking weekly context:`, err);
//         }
//       } else {
//         scheduleContext[context._id].start.start();
//         if (scheduleContext[context._id].end)
//           scheduleContext[context._id].end.start();
//       }
//     }
//   },
//   null,
//   true
// );

async function handleActiveTime(context) {


  const currentTime = moment();
  if (
    context.output.frequency.no_repeat ||
    context.output.frequency.repeat.daily ||
    context.output.frequency.repeat.weekly //&& context.output.frequency.repeat.adjust_weekly[currentDayOfWeek])
  ) {
    const startTime = moment(
      `${currentTime.format("YYYY-MM-DD")} ${
        context.output.active_time.start_time
      }`,
      "YYYY-MM-DD HH:mm"
    );

    const endTime = context.output.active_time.end_time
      ? moment(
          `${currentTime.format("YYYY-MM-DD")} ${
            context.output.active_time.end_time
          }`,
          "YYYY-MM-DD HH:mm"
        )
      : null;
    if (startTime <= currentTime) {
      if (!endTime || endTime >= currentTime) {
        context.auto_active = true;
        await context.save();
        handleContext(context);
      }
    } else {
      try {
        context.auto_active = false;
        await context.save();
        if (!scheduleContext[context._id]) {
          scheduleContext[context._id] = {};
        }
        const job = scheduleContext[context._id];

        if (job.start) {
          job.start.stop();
        }

        if (job.end) {
          job.end.stop();
        }
        const daysOfWeek = [];
        if (context.output.frequency.repeat.weekly) {
          if (frequency.adjust_weekly.monday) daysOfWeek.push(1);
          if (frequency.adjust_weekly.tuesday) daysOfWeek.push(2);
          if (frequency.adjust_weekly.wednesday) daysOfWeek.push(3);
          if (frequency.adjust_weekly.thursday) daysOfWeek.push(4);
          if (frequency.adjust_weekly.friday) daysOfWeek.push(5);
          if (frequency.adjust_weekly.saturday) daysOfWeek.push(6);
          if (frequency.adjust_weekly.sunday) daysOfWeek.push(0);
        }
        const dayString = daysOfWeek.join();
        console.log("Repeat weekly: ", dayString);
        job.start = new CronJob(
          `${startTime.minutes()} ${startTime.hours()} * * ${dayString}`,
          () => jobLogic(context, true),
          null,
          true
        );
        job.end = endTime
          ? new CronJob(
              `${endTime.minutes()} ${endTime.hours()} * * ${daysOfWeekString}`,
              () => jobLogic(context, false),
              null,
              true
            )
          : null;
        console.log("Scheduled active_time!");
      } catch (err) {
        console.log("Error when create new Job", err);
      }
    }
  } else {
    context.auto_active = false;
    await context.save();
  }
}

const jobLogic = async (context, auto_active) => {
  try {
    context.auto_active = auto_active;
    await context.save();
    console.log("Update auto active");
    // handle context here
    await handleContext(context);
  } catch (err) {
    console.log("Error executing jobLogic", err);
  }
};

const checkContext = async (context) => {
  let satisfied = true;
  if (!context.active || !context.auto_active) {
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
const handleContext = async (context) => {
  console.log(`Evaluate context ${context.name}.`);
  let satisfied = await checkContext(context);
  if (satisfied) {
    console.log(`Context ${context.name} is satisfied!`);
    const fans = context.output.control_fan;
    if (fans.length > 0) {
      fans.forEach(async (fan) => {
        controlDevice("w-fan", fan.name, fan.value);
      });
    }
    const leds = context.output.control_led;
    if (leds.length > 0) {
      leds.forEach(async (led) => {
        controlDevice("w-led", led.name, led.value);
      });
    }

    //message
    let message = context.notification.message
      ? context.notification.message
      : context.description;
    if (context.notification.included_info.fan_status) {
      message += "\nFan status:";
      fans.forEach((fan) => {
        message += `\n${fan.name} value: ${fan.value}`;
      });
    }
    if (context.notification.included_info.light_status) {
      message += "\nLED status:";
      leds.forEach((led) => {
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
      !context.output.active_time.endTime
    )
      context.active = false;
    await context.save();
  } else {
    console.log(`Context ${context.name} is not satisfied! or already running`);
  }
};
const trackingContext = async (deviceType, message) => {
  try {
    let contexts = {};
    if (deviceType === "w-temp") {
      contexts = await Context.find({
        active: true,
        auto_active: true,
        "input.active_temperature.active": true,
      });
    }
    if (deviceType === "w-light") {
      contexts = await Context.find({
        active: true,
        auto_active: true,
        "input.active_light.active": true,
      });
    }
    if (deviceType === "w-humi") {
      contexts = await Context.find({
        active: true,
        auto_active: true,
        "input.active_humidity.active": true,
      });
    }
    if (deviceType === "w-human" && message=== "1") {
      contexts = await Context.find({
        active: true,
        auto_active: true,
        "input.active_human.active": true,
      });
    }
    if (deviceType == "w-s-temp" && message == "T_OFF") {
      contexts = await Context.find({
        active: true,
        auto_active: true,
        "input.active_temperature.active": false,
      });
    }
    if (deviceType == "w-s-light" && message == "L_OFF") {
      contexts = await Context.find({
        active: true,
        auto_active: true,
        "input.active_light.active": false,
      });
    }
    if (deviceType == "w-s-humi" && message == "H_OFF") {
      contexts = await Context.find({
        active: true,
        auto_active: true,
        "input.active_humidity.active": false,
      });
    }
    if (contexts.length > 0) {
      contexts.forEach(async (context) => {
        handleContext(context);
      });
    }
  } catch (err) {
    console.log("Context tracking error: ", err);
  }
};

module.exports = {
  createContext,
  deleteContext,
  deleteAllContext,
  getAllContexts,
  updateContext,
  toggleContext,
  trackingContext,
};
