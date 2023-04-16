const User = require("../models/userModel");
const Light = require("../models/deviceModel/lightModel");
const Humidity = require("../models/deviceModel/humidityModel");
const Temperature = require("../models/deviceModel/temperatureModel");
const Fan = require("../models/deviceModel/fanModel");
const LED = require("../models/deviceModel/LEDModel");
const { addNoti } = require("../controllers/notiControllers");
const Context = require("../models/contextModel.js");

const checkContext = async (context) => {
  let satisfied = true;
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
    const humis = await Humi.find({
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
  }

  return satisfied;
};
const evaluateContext = async (context,client) => {
  console.log(`Evaluate context ${context.name}.`);
  let satisfied = await checkContext(context);
          if (satisfied) {
            console.log(`Context ${context.name} is satisfied!`);
            const fans = context.output.control_fan;
            if (fans.length > 0) {
              fans.forEach(async (fan) => {
                const actualFan = await Fan.findOne({ name: fan.name });
                if (
                  actualFan.status != fan.status ||
                  actualFan.value != fan.value
                ) {
                  client.publish(
                    `Tori0802/feeds/w-${fan.name}`,
                    JSON.stringify({
                      value: fan.value,
                    }),
                    (err) => {
                      if (err) {
                        throw new Error(err);
                      }
                    }
                  );
                  actualFan.status = true;
                  await actualFan.save();
                }
                else console.log("Context already running!")
              });
            }
            const leds = context.output.control_led;
            if (leds.length > 0) {
              leds.forEach(async (led) => {
                const actualLed = await LED.findOne({ name: led.name });
                if (actualLed.value != led.value) {
                  client.publish(
                    `Tori0802/feeds/w-${led.name}`,
                    JSON.stringify({
                      value: led.value,
                      status: led.value === "#000000" ? false : true,
                    }),
                    (err) => {
                      if (err) {
                        throw new Error(err);
                      }
                    }
                  );
                }
              });
            }
            if (context.notification.email) {
              // Code for sending email notifications goes here
            }
            // Send context notification
            let message = context.notification.message
              ? context.notification.message
              : context.description;
            if (context.notification.included_info.fan_status) {
              message += "Fan status:\n";
              fans.forEach((fan) => {
                message += `${fan.name} value: ${fan.value}\n`;
              });
            }
            if (context.notification.included_info.light_status) {
              message += "LED status:\n";
              leds.forEach((led) => {
                message += `${led.name} value: ${led.value}\n`;
              });
            }
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
          }

}

const trackingContext = async (deviceType, client,message) => {
  try {
    let contexts = {};
    if (deviceType === "w-temp") {
      contexts = await Context.find({
        active: true,
        "input.active_temperature.active": true,
      });
    }
    if (deviceType === "w-light") {
      contexts = await Context.find({
        active: true,
        "input.active_light.active": true,
      });}
    if (deviceType === "w-humi") {
      contexts = await Context.find({
        active: true,
        "input.active_humi.active": true,
      });
    }
    if (deviceType== "w-s-temp" && message== "T_OFF") {
      contexts = await Context.find({
        active: true,
        "input.active_temp.active": false,
      });
    }
    if (deviceType== "w-s-light" && message== "L_OFF") {
      contexts = await Context.find({
        active: true,
        "input.active_light.active": false,
      });
    }
    if (deviceType== "w-s-humi" && message== "H_OFF") {
      contexts = await Context.find({
        active: true,
        "input.active_humi.active": false,
      });
    }
    

      if (contexts.length > 0) {
        contexts.forEach(async (context) => {
          evaluateContext(context,client);
        });
      }
    }
   catch (err) {
    console.log("Context tracking error: ", err);
  }
};

module.exports = { trackingContext };
