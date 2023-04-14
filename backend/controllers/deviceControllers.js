const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken.js");
const LED = require("../models/deviceModel/LEDModel.js");
const Fan = require("../models/deviceModel/fanModel.js");

const getLED = asyncHandler(async (req, res) => {
  const leds = await LED.find({});
  
  if (leds) {
    res.json({
      leds
    });
  } else {
    res.status(404);
    throw new Error("Led not found");
  }
});
const getFan = asyncHandler(async (req, res) => {
  const fans = await Fan.find({});
  
  if (fans) {
    res.json({
      fans
    });
  } else {
    res.status(404);
    throw new Error("Led not found");
  }
});
module.exports={
    getLED,getFan
}
