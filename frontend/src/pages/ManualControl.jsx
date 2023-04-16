import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import NotificationsBar from "../components/homepage/NotificationsBar";
import lighticon from "../images/lighticon2.png";
import client from "../mqtt/mqtt";
import LightControl from "../components/manualcontrol/LightControl";
import FanControl from "../components/manualcontrol/FanControl";
import fanicon from "../images/Fan.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function ManualControl() {
  const [isLightControl, setisLightControl] = useState(false);
  const [isFanControl, setisFanControl] = useState(true);
  const [devices, setDevices] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const fetchDevices = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const led_res = await axios.get("http://localhost:5000/api/devices/led", config);
      const fan_res = await axios.get("http://localhost:5000/api/devices/fan", config);
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

  const [isRedLight, setisRedLight] = React.useState(true);
  const [isBlueLight, setisBlueLight] = React.useState(false);
  const [isYellowLight, setisYellowLight] = React.useState(false);
  const [isLightOn, setisLightOn] = React.useState(true);
  const [isFanOn, setisFanOn] = React.useState(true);
  const [fanStat, setFanStat] = React.useState(null);

  const getLedState = async (setisBlueLight, setisYellowLight, setisRedLight, setisLightOn) => {
    const { data } = await axios.get("https://io.adafruit.com/api/v2/Tori0802/feeds/w-led/data")
    const { value } = data[0];
    // console.log("Led State - frontend: ",value);
    if (value === "#000000") {
      setisLightOn(false);
      setisRedLight(false);
      setisBlueLight(false);
      setisYellowLight(false);
    }
    else if (value === "#ff0000") {
      setisLightOn(true);
      setisRedLight(true);
      setisBlueLight(false);
      setisYellowLight(false);
    }
    else if (value === "#ffff00") {
      setisLightOn(true);
      setisRedLight(false);
      setisBlueLight(false);
      setisYellowLight(true);
    }
    else if (value === "#0000ff") {
      setisLightOn(true);
      setisRedLight(false);
      setisBlueLight(true);
      setisYellowLight(false);
    }
  }

  useEffect(() => {
    client.on("message", (topic, message) => {
      if (topic === "Tori0802/feeds/w-led") {
        console.log("Led Stat: ", message.toString());
        if (message.toString() === "#000000") {
          setisLightOn(false);
        } else {
          setisLightOn(true);
          if (message.toString() === "#ff0000") {
            setisRedLight(true);
            setisBlueLight(false);
            setisYellowLight(false);
          } else if (message.toString() === "#ffff00") {
            setisRedLight(false);
            setisBlueLight(false);
            setisYellowLight(true);
          } else if (message.toString() === "#0000ff") {
            setisRedLight(false);
            setisBlueLight(true);
            setisYellowLight(false);
          }
        }
      } else {
        console.log("topic not w-led");
      }
    });
  });

  useEffect(() => {
    client.on("message", (topic, message) => {
      if (topic === "Tori0802/feeds/w-fan") {
        console.log("Fan Stat", parseInt(message.toString()));
        if (message.toString() === "0") {
          setisFanOn(false);
          setFanStat(0);
        } else {
          setisFanOn(true);
          setFanStat(parseInt(message.toString()));
        }
      } else {
        console.log("topic not w-fan");
      }
    });
  });

  useEffect(() => {
    fetchDevices();
    getLedState(setisBlueLight, setisYellowLight, setisRedLight, setisLightOn);
  }, []);

  if (!Array.isArray(devices)) {
    return <p>Loading...</p>;
  }

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
                  device.name === "led" ? (
                    <button className="col-span-1 bg-white rounded-3xl p-3 m-2" onClick={handleLightControl}>
                      <img src={lighticon} alt="" />
                    </button>
                  ) : (
                    <button className="col-span-1 bg-white rounded-3xl p-3 m-2" onClick={handleFanControl}>
                      <img src={fanicon} alt="" />
                    </button>
                  )
                }
                {device.name === "led" ? (
                  <button className="col-span-3 m-2 text-left" onClick={handleLightControl}>
                    <p className="font-bold text-lg text-gray-900">{device.name}</p>
                    {
                      !isLightOn ? (<p className="text-sm">OFF</p>) : (
                        isLightOn && isYellowLight ? (<p className="text-sm">Yellow</p>) : (
                          isLightOn && isRedLight ? (<p className="text-sm">Red</p>) : (
                            isLightOn && isBlueLight ? (<p className="text-sm">Blue</p>) : (<p> </p>)
                          )
                        )
                      )
                    }
                  </button>
                ) : (
                  <button className="col-span-3 m-2 text-left" onClick={handleFanControl}>
                    <p className="font-bold text-lg text-gray-900">{device.name}</p>
                    {
                      fanStat === null ? (
                        device.value === 0 ? (
                          <p className="text-sm">OFF</p>
                        ) : (
                          <p className="text-sm">{device.value}</p>
                        )
                      ) : (
                        fanStat === 0 ? (
                          <p className="text-sm">OFF</p>
                        ) : (
                          <p className="text-sm">{fanStat}</p>
                        )
                      )
                    }
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
