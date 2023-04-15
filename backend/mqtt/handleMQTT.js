const User = require("../models/userModel");
const Light = require("../models/deviceModel/lightModel");
const Humidity = require("../models/deviceModel/humidityModel");
const Temperature = require("../models/deviceModel/temperatureModel");
const Fan = require("../models/deviceModel/fanModel");
const LED = require("../models/deviceModel/LEDModel");
const { addNoti } = require("../controllers/notiControllers");

const handleDeviceMessage = async (topic, message) => {
  const hasDigit = /\d/.test(topic);
  const topicArray = topic.split("-");
  const deviceType = hasDigit ? topicArray.slice(0, topicArray.length - 1).join('-'): topic ;
  const deviceName = hasDigit ? (topicArray[topicArray.length-2] + topicArray[topicArray.length-1]) : topicArray[topicArray.length-1];
  const data = message;

  console.log(`Received message on topic ${topic}: ${data}`);

  let updateQuery = {};

  switch (deviceType) {
    case "w-light":
      updateQuery = { value: JSON.parse(data) };
      break;
    case "w-temp":
      updateQuery = { value: JSON.parse(data) };
      break;
    case "w-humi":
      updateQuery = { value: JSON.parse(data) };
      break;
    case "w-led":
      updateQuery = { value: data };
      break;
    case "w-fan":
      updateQuery = { value: JSON.parse(data) };
      break;
    case "w-s-light":
      updateQuery = { status: (data==="L_ON")? true: false  };
      break;
    case "w-s-temp":
      updateQuery = { status: (data==="T_ON")? true: false };
      break;
    case "w-s-humi":
      updateQuery = { status: (data==="H_ON")? true: false };
      break;
    default:
      console.log(`Unknown device type: ${deviceType}`);
      return;
  }

  const deviceModel =
    deviceType === "w-light" || "w-s-light"
      ? Light
      : deviceType === "w-humi" || "w-s-humi"
      ? Humidity
      : deviceType === "w-temp" || "w-s-temp"
      ? Temperature
      : deviceType === "w-fan"
      ? Fan
      : deviceType === "w-led"
      ? LED
      : null;

  if (!deviceModel) {
    console.log(`Unknown device type: ${deviceType}`);
    return;
  }

  const updatedDevice = await deviceModel.findOneAndUpdate(
    { name: deviceName },
    updateQuery,
    { new: true, upsert: true }
  );

  console.log(`Updated ${deviceType} ${deviceName}: ${updatedDevice}`);

  // Add notifications if light value <10 or LED is off
  if (deviceType === "w-light" && data < 10) {
    const users = await User.find({});
    for (const user of users) {
      await addNoti({
        body: {
          name: "Low Light Alert",
          type: "alert",
          message: `The light level is very low: ${data}%`,
        },
        user: user,
      });
    }
  } else if (deviceType === "w-led" && data === "#000000") {
    const users = await User.find({});
    for (const user of users) {
      await addNoti({
        body: {
          name: "LED Status",
          type: "alert",
          message: `LED is turn off at ${new Date().getHours()}:${new Date().getMinutes()} `,
        },
        user: user,
      });
    }
  }
};

module.exports = { handleDeviceMessage };
