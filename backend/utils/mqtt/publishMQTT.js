const Light = require("../../models/deviceModel/lightModel");
const Humidity = require("../../models/deviceModel/humidityModel");
const Temperature = require("../../models/deviceModel/temperatureModel");
const Fan = require("../../models/deviceModel/fanModel");
const LED = require("../../models/deviceModel/LEDModel");
const mqtt = require("mqtt");

const credentials = {
  username: process.env.ADAFRUIT_USERNAME,
  password: process.env.ADAFRUIT_KEY,
};

const client = mqtt.connect("mqtt://io.adafruit.com", {
  username: credentials.username,
  password: credentials.password,
});

const controlDevice = async (deviceType, deviceName, message) => {
  try {
    let deviceModel;
    if (deviceType == "w-led") deviceModel = LED;
    else if (deviceType == "w-fan") deviceModel = Fan;
    else if (deviceType == "w-s-temp") deviceModel = Temperature;
    else if (deviceType == "w-s-light") deviceModel = Light;
    else if (deviceType == "w-s-humi") deviceModel = Humidity;
    else if (deviceType == "w-alert") deviceModel = null;
    else console.log(`Error: Invalid device type ${deviceType}`);
    if (!deviceModel) {
      client.publish(
        `${process.env.ADAFRUIT_USERNAME}/feeds/w-alert`,
        JSON.stringify({
          value: "ALERT",
        }),
        (err) => {
          if (err) {
            throw new Error(err);
          }
        }
      );
    } else {
      const actualDevice = await deviceModel.findOne({ name: deviceName });
      if (!actualDevice) throw new Error("Device not found!");
      if (actualDevice.value != message) {
        client.publish(
          `${process.env.ADAFRUIT_USERNAME}/feeds/w-${deviceName}`,
          JSON.stringify({
            value: message,
          }),
          (err) => {
            if (err) {
              throw new Error(err);
            }
          }
        );
        console.log(`Publish message to w-${deviceName} : ${message}`);
        if (
          (deviceType == "w-led" && message == "#00000") ||
          (deviceType == "w-fan" && message == "0")
        )
          actualDevice.status = false;
        else actualDevice.status = true;
        await actualDevice.save();
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { controlDevice };
