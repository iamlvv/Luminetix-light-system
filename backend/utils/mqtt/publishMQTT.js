const Light = require("../../models/deviceModel/lightModel");
const Humidity = require("../../models/deviceModel/humidityModel");
const Temperature = require("../../models/deviceModel/temperatureModel");
const Fan = require("../../models/deviceModel/fanModel");
const LED = require("../../models/deviceModel/LEDModel");

const controlDevice = async (deviceType, deviceName, message, client) => {
  try {
    let deviceModel;
    if (deviceType == "w-led") deviceModel = LED;
    else if (deviceType == "w-fan") deviceModel = Fan;
    else if (deviceType == "w-s-temp") deviceModel = Temperature;
    else if (deviceType == "w-s-light") deviceModel = Light;
    else if (deviceType == "w-s-humi") deviceModel = Humidity;
    else console.log(`Error: Invalid device type ${deviceType}`);
    const actualDevice = await deviceModel.findOne({ name: deviceName });
    if (!actualDevice) throw new Error("Device not found!");
    if (
      actualDevice.value != message
    ) {
      client.publish(
        `${process.env.ADAFRUIT_USERNAME}/feeds/w-${deviceName}`,
        JSON.stringify({
          value: message ,
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
  } catch (err) {
    console.log(err);
  }
};

module.exports = { controlDevice };
