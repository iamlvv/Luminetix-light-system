const User = require("../models/userModel");
const Light = require("../models/deviceModel/lightModel");
const Humidiy = require("../models/deviceModel/humidityModel");
const Temperature = require("../models/deviceModel/temperatureModel");
const Fan = require("../models/deviceModel/fanModel");
const LED = require("../models/deviceModel/LEDModel");
const connectMQTT = require("./connectMQTT");

const { addNoti, deleteNoti } = require("../controllers/notiControllers");

const handleLightMessage = async (message) => {
  const data = message.toString();
  console.log("w-light:", data);
  const light = await Light.findOneAndUpdate(
    { name: "w-light" },
    { value: JSON.parse(data) },
    { new: true, upsert: true }
  );
  console.log("Light data have update");

  // Add notifications if light value <10
  const users = await User.find({});
  for (const user of users) {
    if (data < 10) {
      console.log(data);
      await addNoti({
        body: {
          name: "Low Light Alert",
          type: "alert",
          message: `The light level is very low: ${data}%`,
        },
        user: user,
      });
    }
  }
};

const handleTempMessage = async (message) => {
  data = message.toString();
  console.log("w-temp:", data);
  const temperature = await Temperature.findOneAndUpdate(
    { name: "w-temp" },
    { value: JSON.parse(data) },
    { new: true, upsert: true }
  );
  console.log("Temperature data have update");
};
const handleHumiMessage = async (message) => {
  data = message.toString();
  console.log("w-humi:", data);
  const humidity = await Humidiy.findOneAndUpdate(
    { name: "w-humi" },
    { value: JSON.parse(data) },
    { new: true, upsert: true }
  );
  console.log("Humidity data have update");
};
const handleLed1 = async (message) => {
  data = message.toString();
  console.log("w-led:", data);
  const led = await LED.findOneAndUpdate(
    { name: "w-led" },
    { value: data },
    { new: true, upsert: true }
  );
  console.log("LED data have update");

  // Add notifications if LED is off
  const users = await User.find({});
  for (const user of users) {
    if (data == "#000000") {
      console.log(data);
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
const handleFan1 = async (message) => {
  data = message.toString();
  console.log("w-fan:", data);
  const fan = await Fan.findOneAndUpdate(
    { name: "w-fan" },
    { value: JSON.parse(data) },
    { new: true, upsert: true }
  );
  console.log("Fan data have update");
};
const handleSLight = async (message) => {
  data = message.toString();
  console.log("w-s-light:", data);
  const light = await Light.findOneAndUpdate(
    { name: "w-light" },
    { status: (data === "L_ON") ? true : false },
    { new: true, upsert: true }
  );
  console.log("Light status have update");

  // Add notifications if Light sensor is off
  const users = await User.find({});
  for (const user of users) {
    if (data == "L_OFF") {
      console.log(data);
      await addNoti({
        body: {
          name: "Light Sensor Status",
          type: "alert",
          message: `Light Sensor is turn off at ${new Date().getHours()}:${new Date().getMinutes()}  `,
        },
        user: user,
      });
    }
  }
};
const handleSTemp = async (message) => {
  data = message.toString();
  console.log("w-s-temp:", data);
  const temperature = await Temperature.findOneAndUpdate(
    { name: "w-temp" },
    { status: (data === "T_ON") ? true : false },
    { new: true, upsert: true }
  );
  console.log("Temperature status have update");
  // Add notifications if Temp sensor is off
  const users = await User.find({});
  for (const user of users) {
    if (data == "T_OFF") {
      console.log(data);
      await addNoti({
        body: {
          name: "Temperature Sensor Status",
          type: "alert",
          message: `Temperature Sensor is turn off at ${new Date().getHours()}:${new Date().getMinutes()}  `,
        },
        user: user,
      });
    }
  }
};
const handleSHumi = async (message) => {
  data = message.toString();
  console.log("w-s-humi:", data);
  const humidity = await Humidiy.findOneAndUpdate(
    { name: "w-humi" },
    { status: (data === "H_ON") ? true : false },
    { new: true, upsert: true }
  );
  console.log("Humidity status have update");
  // Add notifications if Humi sensor is off
  const users = await User.find({});
  for (const user of users) {
    if (data == "H_OFF") {
      console.log(data);
      await addNoti({
        body: {
          name: "Humidity Sensor Status",
          type: "alert",
          message: `Humidity Sensor is turn off at ${new Date().getHours()}:${new Date().getMinutes()}  `,
        },
        user: user,
      });
    }
  }
};

const topics = [
  {
    topicName: "w-light",
    messageHandler: handleLightMessage,
  },
  {
    topicName: "w-temp",
    messageHandler: handleTempMessage,
  },
  {
    topicName: "w-humi",
    messageHandler: handleHumiMessage,
  },
  {
    topicName: "w-s-light",
    messageHandler: handleSLight,
  },
  {
    topicName: "w-s-temp",
    messageHandler: handleSTemp,
  },
  {
    topicName: "w-s-humi",
    messageHandler: handleSHumi,
  },
  {
    topicName: "w-led",
    messageHandler: handleLed1,
  },
  {
    topicName: "w-fan",
    messageHandler: handleFan1,
  },
];

const credentials = {
  username: process.env.REACT_APP_ADAFRUIT_USERNAME,
  password: process.env.REACT_APP_ADAFRUIT_KEY,
};

connectMQTT(topics, credentials);

module.exports = connectMQTT;
