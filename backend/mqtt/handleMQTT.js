const User = require("../models/userModel");
const Light = require("../models/deviceModel/lightModel");
const Humidiy = require("../models/deviceModel/humidityModel");
const Temperature = require("../models/deviceModel/temperatureModel");
const Fan = require("../models/deviceModel/fanModel");
const LED = require("../models/deviceModel/ledModel");
const connectMQTT = require("./connectMQTT");

const {
  addNoti,
  deleteNoti
} = require("../controllers/notiControllers");


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
      if (data<10) {
        console.log(data);
        await addNoti({
          body: {
            name: "Low Light Alert",
            type: "alert",
            message: `The light level is very low: ${data}%`,
          },
          user: user,
        });
      }};
 };

const handleTempMessage = async (message) => {
  console.log("w-temp:", data);
  const temperature = await Temperature.findOneAndUpdate(
    { name: "w-temp" },
    { value: JSON.parse(data) },
    { new: true, upsert: true }
  );
  console.log("Temperature data have update");
  
    }
const handleHumiMessage = async (message) => {
  console.log("w-humi:", data);
  const humidity = await Humidiy.findOneAndUpdate(
    { name: "w-humi" },
    { value: JSON.parse(data) },
    { new: true, upsert: true }
  );
  console.log("Humidity data have update");};
const handleLed1 = async (message) => {
  console.log("w-led:", data);
  const led = await LED.findOneAndUpdate(
    { name: "w-led" },
    { value: data },
    { new: true, upsert: true }
  );
  console.log("LED data have update");};
const handleFan1 = async (message) => {
  console.log("w-fan:", data);
  const fan = await Fan.findOneAndUpdate(
    { name: "w-fan" },
    { value: JSON.parse(data) },
    { new: true, upsert: true }
  );
  console.log("Fan data have update");};

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
    topicName: "w-led",
    messageHandler: handleLed1,
  },
  {
    topicName: "w-fan",
    messageHandler: handleFan1,
  }
];

const credentials = {
  username: process.env.ADAFRUIT_USENAME,
  password: process.env.ADAFRUIT_USENAME
};

connectMQTT(topics, credentials);

module.exports = connectMQTT;
