import React, { useState, useEffect } from "react";
import axios from "axios";
import lighticon from "../../images/lighticon2.png";
import fanicon from "../../images/Fan.png";
const url = process.env.REACT_APP_API_URL;


function DeviceList() {
  const [devices, setDevices] = useState([]);
  const [LedState, setLedState] = useState("");
  const [FanState, setFanState] = useState("");
  const fetchDevices = async () => {
    try {
      const led_res = await axios.get(`${url}/devices/led`);
      const fan_res = await axios.get(`${url}/devices/fan`);
      const devices = [...led_res.data.leds, ...fan_res.data.fans];
      console.log(devices);
      setDevices(devices);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);
  if (!Array.isArray(devices)) {
    return <p>Loading...</p>;
  }
  return (
    <div className="col-span-1 bg-purple-100 rounded-3xl">
      <div className="text-xl font-bold m-4">
        <p>Devices</p>
      </div>

      {devices? devices.map((device) => (
        <div
          key={device._id}
          className="grid grid-cols-4 m-3 border rounded-3xl bg-purple-200"
        >
          {
            device.name === "w-led" ? (
              <div className="col-span-1 bg-white rounded-3xl p-3 m-2">
                <img src={lighticon} alt="" />
              </div>
            ) : (
              <div className="col-span-1 bg-white rounded-3xl p-3 m-2">
                <img src={fanicon} alt="" />
              </div>
            )
          }
          <div className="col-span-3 m-2">
            <p className="font-bold text-lg text-gray-900">{device.name}</p>
            {typeof device.value === "string" ? (
              <>
                {device.value === "#000000" && <p className="text-sm">OFF</p>}
                {device.value === "#FFFFFF" && <p className="text-sm">Yellow</p>}
                {device.value === "#FF0000" && <p className="text-sm">Red</p>}
                {device.value === "#0000FF" && <p className="text-sm">Blue</p>}
              </>
            ) : (
              <p className="text-sm">{device.value}</p>
            )}
          </div>
        </div>
      )): <p>Loading...</p>}
    </div>
  );
}

export default DeviceList;
