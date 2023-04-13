const mqtt = require("mqtt");
const User = require("../models/userModel");
const Light = require("../models/deviceModel/lightModel");
const Humidiy = require("../models/deviceModel/humidityModel");
const Temperature = require("../models/deviceModel/temperatureModel");
const Fan = require("../models/deviceModel/fanModel");
const LED = require("../models/deviceModel/ledModel");

const {
  getUserNoti,
  addNoti,
  deleteNoti,
  markNotiAsRead,
} = require("../controllers/notiControllers");

//const LED = require("../models/deviceModel/LEDModel")

const connectMQTT = async () => {
  try {
    const client = await mqtt.connect("mqtt://io.adafruit.com", {
      username: "Tori0802",
      password: "aio_QHDt28fa22bJ57TTS1w6nyCwdn9m",
    });
    const subscribe = await client.on("connect", () => {
      console.log("Connected to MQTT broker");
      client.subscribe("Tori0802/feeds/w-light", (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Subscribed to feeds "w-light"');
        }
      });
      client.subscribe("Tori0802/feeds/w-temp", (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Subscribed to feeds "w-temp"');
        }
      });
      client.subscribe("Tori0802/feeds/w-humi", (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Subscribed to feeds "w-humi"');
        }
      });
      client.subscribe("Tori0802/feeds/w-led", (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Subscribed to feeds "w-led"');
        }
      });
      client.subscribe("Tori0802/feeds/w-fan", (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Subscribed to feeds "w-fan"');
        }
      });
    });

    //// Handle incoming MQTT messages

    const message = await client.on("message", async (topic, message) => {
      const data = message.toString();
      if (topic === "Tori0802/feeds/w-light") {
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
          }
        }
      }
      if (topic === "Tori0802/feeds/w-temp") {
        console.log("w-temp:", data);
        const temperature = await Temperature.findOneAndUpdate(
          { name: "w-temp" },
          { value: JSON.parse(data) },
          { new: true, upsert: true }
        );
        console.log("Temperature data have update");
      };
      if (topic === "Tori0802/feeds/w-humi") {
        console.log("w-humi:", data);
        const humidity = await Humidiy.findOneAndUpdate(
          { name: "w-humi" },
          { value: JSON.parse(data) },
          { new: true, upsert: true }
        );
        console.log("Humidity data have update");
      };
      if (topic === "Tori0802/feeds/w-led") {
        console.log("w-led:", data);
        const led = await LED.findOneAndUpdate(
          { name: "w-led" },
          { value: data },
          { new: true, upsert: true }
        );
        console.log("LED data have update");
      };
      if (topic === "Tori0802/feeds/w-fan") {
        console.log("w-fan:", data);
        const fan = await Fan.findOneAndUpdate(
          { name: "w-fan" },
          { value: JSON.parse(data) },
          { new: true, upsert: true }
        );
        console.log("Fan data have update");
      };
  })} catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectMQTT;
