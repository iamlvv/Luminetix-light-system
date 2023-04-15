import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import NotificationsBar from "../components/homepage/NotificationsBar";
import lighticon from "../images/lighticon2.png";
import client from "../mqtt/mqtt";
import LightControl from "../components/manualcontrol/LightControl";
import FanControl from "../components/manualcontrol/FanControl";
import fanicon from "../images/Fan.png";
import axios from "axios";

function ManualControl() {
  const [isLightControl, setisLightControl] = useState(false);
  const [isFanControl, setisFanControl] = useState(true);
  const [devices, setDevices] = useState([]);

  // const [isRedLight, setisRedLight] = useState(true);
  // const [isBlueLight, setisBlueLight] = useState(false);
  // const [isYellowLight, setisYellowLight] = useState(false);
  // const [isLightOn, setisLightOn] = useState(true);
  // const [isSchedule, setisSchedule] = useState(false);
  // const [LedState, setLedState] = useState("");
  // const [FanState, setFanState] = useState("");
  const fetchDevices = async () => {
    try {
      const led_res = await axios.get("http://localhost:5000/api/devices/led");
      const fan_res = await axios.get("http://localhost:5000/api/devices/fan");
      const devices = [...led_res.data.leds, ...fan_res.data.fans];
      console.log(devices);
      setDevices(devices);
    } catch (error) {
      console.error(error);
    }
  };
  const handleLightControl = () => {
    setisLightControl(true);
    setisFanControl(false);
  }
  const handleFanControl = () => {
    setisFanControl(true);
    setisLightControl(false);
  }
  useEffect(() => {
    fetchDevices();
  }, []);
  if (!Array.isArray(devices)) {
    return <p>Loading...</p>;
  }
  // useEffect(() => {
  //   client.on("message", (topic, message) => {
  //     if (topic === "Tori0802/feeds/w-led") {
  //       console.log("Led Stat: ", message.toString());
  //       if (message.toString() === "#000000") {
  //         setisLightOn(false);
  //       } else {
  //         setisLightOn(true);
  //         if (message.toString() === "#ff0000") {
  //           setisRedLight(true);
  //           setisBlueLight(false);
  //           setisYellowLight(false);
  //         } else if (message.toString() === "#ffffff") {
  //           setisRedLight(false);
  //           setisBlueLight(false);
  //           setisYellowLight(true);
  //         } else if (message.toString() === "#0000ff") {
  //           setisRedLight(false);
  //           setisBlueLight(true);
  //           setisYellowLight(false);
  //         }
  //       }
  //     } else {
  //       console.log("error");
  //     }
  //   });
  // });

  return (
    <div>
      <NavBar />
      <div className="grid grid-cols-4 ml-28">
        <div className="col-span-3 rounded-2xl grid grid-cols-3">
          {/* <LightControl/> OR <FanControl/> */}
          {
            isLightControl ? (
              <LightControl />
            ) : (
              <FanControl />
            )
          }

          {/* <DeviceList /> */}
          <div className="col-span-1 bg-purple-100 rounded-3xl">
            <div className="text-xl font-bold m-4">
              <p>Devices</p>
            </div>

            {devices.map((device) => (
              <div
                key={device._id}
                className="grid grid-cols-4 m-3 border rounded-3xl bg-purple-200 text-left"
              >
                {
                  device.name === "w-led" ? (
                    <button className="col-span-1 bg-white rounded-3xl p-3 m-2" onClick={handleLightControl}>
                      <img src={lighticon} alt="" />
                    </button>
                  ) : (
                    <button className="col-span-1 bg-white rounded-3xl p-3 m-2" onClick={handleFanControl}>
                      <img src={fanicon} alt="" />
                    </button>
                  )
                }
                {device.name === "w-led" ? (
                  <button className="col-span-3 m-2 text-left" onClick={handleLightControl}>
                    <p className="font-bold text-lg text-gray-900">{device.name}</p>
                    {
                      device.value === "#000000" ? (<p className="text-sm">OFF</p>) : (
                        device.value === "#ffff00" ? (<p className="text-sm">Yellow</p>) : (
                          device.value === "#ff0000" ? (<p className="text-sm">Red</p>) : (
                            device.value === "#0000ff" ? (<p className="text-sm">Blue</p>) : (<p> </p>)
                          )
                        )
                      )
                    }
                  </button>
                ) : (
                  <button className="col-span-3 m-2 text-left" onClick={handleFanControl}>
                    <p className="font-bold text-lg text-gray-900">{device.name}</p>
                    <p className="text-sm">{device.value}</p>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1 mt-10 p-5">
          <NotificationsBar />
        </div>

      </div>
    </div>
  );
}

export default ManualControl;
