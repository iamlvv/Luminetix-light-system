import React, { useEffect } from 'react'
import { AiOutlineArrowRight } from "react-icons/ai";
import Switch from "react-switch";
import Slider from "@mui/material/Slider";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getFanStatFirst,
  getFanStateFirst,
  getHumidityStatFirst,
  getHumidityStateFirst,
  getLightStatFirst,
  getLightStateFirst,
  getTemperatureStatFirst,
  getTemperatureStateFirst,
  turnOffFan,
  turnOffHumidity,
  turnOffLight,
  turnOffTemperature,
  turnOnFan,
  turnOnHumidity,
  turnOnLight,
  turnOnTemperature,
} from '../../redux/actions/deviceActions';
import client from '../../mqtt/mqtt';

const getHumidityStatistics = (handleget) => {
  client.subscribe("Tori0802/feeds/w-humi");
  client.on("message", function (topic, message) {
    if (topic === "Tori0802/feeds/w-humi") {
      const value = JSON.parse(message.toString());
      handleget(value);
    }
  });
}
const getTemperatureStatistics = (handleget) => {
  client.subscribe("Tori0802/feeds/w-temp");
  client.on("message", function (topic, message) {
    if (topic === "Tori0802/feeds/w-temp") {
      const value = JSON.parse(message.toString());
      handleget(value);
    }
  });
}
const getLightStatistics = (handleget) => {
  client.subscribe("Tori0802/feeds/w-light");
  client.on("message", function (topic, message) {
    if (topic === "Tori0802/feeds/w-light") {
      const value = JSON.parse(message.toString());
      handleget(value);
    }
  });
}
const getFanStatistics = (handleget) => {
  client.subscribe("Tori0802/feeds/w-fan");
  client.on("message", function (topic, message) {
    if (topic === "Tori0802/feeds/w-fan") {
      const value = JSON.parse(message.toString());
      handleget(value);
    }
  });
}
const getHumidityState = (handleget) => {
  client.subscribe("Tori0802/feeds/w-s-humi");
  client.on("message", function (topic, message) {
    if (topic === "Tori0802/feeds/w-s-humi") {

      const value = message.toString();
      if (value === "H_ON") {
        handleget(true);
      }
      else if (value === "H_OFF") {
        handleget(false);
      }
    }
  });
}
const getTemperatureState = (handleget) => {
  client.subscribe("Tori0802/feeds/w-s-temp");
  client.on("message", function (topic, message) {
    if (topic === "Tori0802/feeds/w-s-temp") {
      const value = message.toString();
      if (value === "T_ON") {
        handleget(true);
      }
      else if (value === "T_OFF") {
        handleget(false);
      }
    }
  });
}

const getLightState = (handleget) => {
  client.subscribe("Tori0802/feeds/w-s-light");
  client.on("message", function (topic, message) {
    if (topic === "Tori0802/feeds/w-s-light") {
      const value = message.toString();
      if (value === "L_ON") {
        handleget(true);
      }
      else if (value === "L_OFF") {
        handleget(false);
      }
    }
  });
}
const getFanState = (handleget) => {
  client.subscribe("Tori0802/feeds/w-s-fan");
  client.on("message", function (topic, message) {
    if (topic === "Tori0802/feeds/w-s-fan") {
      const value = JSON.parse(message.toString());
      if (value != "0") {
        handleget(true);
      }
      else if (value == "0") {
        handleget(false);
      }
    }
  });
}

export default function FrequentlyUsedDevices() {
  const dispatch = useDispatch();
  //get data from sensors through redux
  //get data from sensors through redux in first render
  const TempStatFirst = useSelector((state) => state.temperatureStatFirst);
  const HumidStatFirst = useSelector((state) => state.humidityStatFirst);
  const LightStatFirst = useSelector((state) => state.lightStatFirst);

  const { temperatureStatFirst } = TempStatFirst;
  const { humidityStatFirst } = HumidStatFirst;
  const { lightStatFirst } = LightStatFirst;

  //get data from state of devices through redux in first render
  const TempStateFirst = useSelector((state) => state.temperatureStateFirst);
  const HumidityStateFirst = useSelector((state) => state.humidityStateFirst);
  const LightStateFirst = useSelector((state) => state.lightStateFirst);

  const { temperatureStateFirst } = TempStateFirst;
  const { humidityStateFirst } = HumidityStateFirst;
  const { lightStateFirst } = LightStateFirst;

  const [toggleButton1, setToggleButton1] = React.useState(false);
  const [toggleButton2, setToggleButton2] = React.useState(false);
  const [toggleButton3, setToggleButton3] = React.useState(false);

  const [lStat, setLStat] = React.useState(lightStatFirst);
  const [tStat, setTStat] = React.useState(temperatureStatFirst);
  const [hStat, setHStat] = React.useState(humidityStatFirst);

  const [lState, setLState] = React.useState(null);
  const [tState, setTState] = React.useState(null);
  const [hState, setHState] = React.useState(null);

  //Lấy dữ liệu mới nhất khi component render lần đầu
  useEffect(() => {
    // Get Stat and State First by Redux
    dispatch(getTemperatureStateFirst());
    dispatch(getTemperatureStatFirst());
    dispatch(getHumidityStatFirst());
    dispatch(getHumidityStateFirst());
    dispatch(getLightStatFirst());
    dispatch(getLightStateFirst());
    // Get Stat and State using MQTT
    getHumidityStatistics(setHStat);
    getTemperatureStatistics(setTStat);
    getLightStatistics(setLStat);
    getHumidityState(setHState);
    getTemperatureState(setTState);
    getLightState(setLState);
  }, []);
  useEffect(() => {
    if (temperatureStateFirst && tState === null) {
      setToggleButton3(temperatureStateFirst);
    }
    else if (tState !== null) {
      setToggleButton3(tState);
    }
    if (humidityStateFirst && hState === null) {
      setToggleButton1(humidityStateFirst);
    }
    else if (hState !== null) {
      setToggleButton1(hState);
    }
    if (lightStateFirst && lState === null) {
      setToggleButton2(lightStateFirst);
    }
    else if (lState !== null) {
      setToggleButton2(lState);
    }
  }, [tState, hState, lState, temperatureStateFirst, humidityStateFirst, lightStateFirst]);
  //Lấy dữ liệu mới nhất sau mỗi 20s
  //Handle change States
  const handleChangeTempState = () => {
    //Nếu true thì tắt đèn đi (true == sáng)
    if (toggleButton3 === true) {
      dispatch(turnOffTemperature());
      setToggleButton3(false);

    } else if (toggleButton3 === false) {
      dispatch(turnOnTemperature());
      setToggleButton3(true);
    }
  }
  const handleChangeHumidState = () => {
    //Nếu true thì tắt cảm biến độ ẩm đi (true == đang bật)
    if (toggleButton1 === true) {
      dispatch(turnOffHumidity());
      setToggleButton1(false);
    } else if (toggleButton1 === false) {

      dispatch(turnOnHumidity());
      setToggleButton1(true);
    }
  }

  const handleChangeLightState = () => {
    //Nếu true thì tắt cảm biến ánh sáng đi (true == đang bật)
    if (toggleButton2 === true) {
      dispatch(turnOffLight());
      setToggleButton2(false);
    } else if (toggleButton2 === false) {
      dispatch(turnOnLight());
      setToggleButton2(true);
    }
  }
  return (
    <div>
      <div className="grid grid-cols-2 mb-10">
        <h1 className="text-xl font-bold">Frequently Used Devices</h1>
        <NavLink to="/manualcontrol">
          <div className="text-right text-violet-700">
            <h2 className='font-bold'>
              More settings <AiOutlineArrowRight className="inline" />
            </h2>
          </div>
        </NavLink>
      </div>
      <div className="grid grid-cols-3 gap-9 text-center ml-20 mr-20">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex justify-center gap-9 mb-10">
            <button className="bg-sky-700 text-white w-14 h-14 rounded-full">
              {hStat === "0" ? humidityStatFirst : hStat}
            </button>
            <div className="text-right" key={toggleButton1}>
              <Switch
                onChange={handleChangeHumidState}
                checked={toggleButton1}
                onColor="#593EFF"
                height={24}
                width={48}
                className="react-switch"

              />
            </div>
          </div>
          <h1 className="font-bold text-lg mb-5">Humidity</h1>

        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex justify-center gap-9 mb-10">
            <button className="bg-yellow-700 text-white w-14 h-14 rounded-full">
              {lStat === "0" ? lightStatFirst : lStat}
            </button>
            <div className="text-right" key={toggleButton2}>
              <Switch
                onChange={handleChangeLightState}
                checked={toggleButton2}
                onColor="#593EFF"
                height={24}
                width={48}
                className="react-switch"

              />
            </div>
          </div>
          <h1 className="font-bold text-lg mt-5 mb-5">Light</h1>

        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex justify-center gap-9 mb-10">
            <button className="bg-red-700 text-white w-14 h-14 rounded-full">
              {tStat === "0" ? temperatureStatFirst : tStat}
            </button>
            <div className="text-right" key={toggleButton3}>
              <Switch
                onChange={handleChangeTempState}
                checked={toggleButton3}
                onColor="#593EFF"
                height={24}
                width={48}
                className="react-switch"

              />
            </div>
          </div>
          <h1 className="font-bold text-lg mt-5 mb-5">Temperature</h1>
        </div>
      </div></div>
  )
}
