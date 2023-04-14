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
  getFanStat,
  getFanState,
  getHumidityStat,
  getHumidityState,
  getLightStat,
  getLightState,
  getTemperatureStat,
  getTemperatureState
} from '../../redux/actions/deviceActions';

export default function FrequentlyUsedDevices() {
  const dispatch = useDispatch();
  //get data from sensors through redux
  const TempStat = useSelector((state) => state.temperatureStat);
  const HumidStat = useSelector((state) => state.humidityStat);
  const LightStat = useSelector((state) => state.lightStat);
  const FanStat = useSelector((state) => state.fanStat);
  //get data from sensors through redux in first render
  const TempStatFirst = useSelector((state) => state.temperatureStatFirst);
  const HumidStatFirst = useSelector((state) => state.humidityStatFirst);
  const LightStatFirst = useSelector((state) => state.lightStatFirst);
  const FanStatFirst = useSelector((state) => state.fanStatFirst)

  const { temperatureStat } = TempStat;
  const { humidityStat } = HumidStat;
  const { lightStat } = LightStat;
  const { fanStat } = FanStat;

  const { temperatureStatFirst } = TempStatFirst;
  const { humidityStatFirst } = HumidStatFirst;
  const { lightStatFirst } = LightStatFirst;
  const { fanStatFirst } = FanStatFirst;

  //get data from state of devices through redux
  const TempState = useSelector((state) => state.temperatureState);
  const HumidityState = useSelector((state) => state.humidityState);
  const LightState = useSelector((state) => state.lightState);
  const FanState = useSelector((state) => state.fanState);

  //get data from state of devices through redux in first render
  const TempStateFirst = useSelector((state) => state.temperatureStateFirst);
  const HumidityStateFirst = useSelector((state) => state.humidityStateFirst);
  const LightStateFirst = useSelector((state) => state.lightStateFirst);
  const FanStateFirst = useSelector((state) => state.fanStateFirst);

  const { temperatureState } = TempState;
  const { humidityState } = HumidityState;
  const { lightState } = LightState;
  const { fanState } = FanState;

  const { temperatureStateFirst } = TempStateFirst;
  const { humidityStateFirst } = HumidityStateFirst;
  const { lightStateFirst } = LightStateFirst;
  const { fanStateFirst } = FanStateFirst;

  const [toggleButton1, setToggleButton1] = React.useState(false);
  const [toggleButton2, setToggleButton2] = React.useState(false);
  const [toggleButton3, setToggleButton3] = React.useState(false);
  const [toggleButton4, setToggleButton4] = React.useState(false);
  const [valueFan, setValueFan] = React.useState(0);

  // const [lStat, setLStat] = React.useState(lightStatFirst);
  // const [tStat, setTStat] = React.useState(temperatureStatFirst);
  // const [hStat, setHStat] = React.useState(humidityStatFirst);
  // const [fStat, setFStat] = React.useState(fanStatFirst);

  //Lấy dữ liệu mới nhất khi component render lần đầu
  useEffect(() => {
    dispatch(getFanStat());
    dispatch(getFanStatFirst());
    dispatch(getFanState());
    dispatch(getFanStateFirst());

    dispatch(getTemperatureState());
    dispatch(getTemperatureStateFirst());
    dispatch(getTemperatureStat());
    dispatch(getTemperatureStatFirst());

    dispatch(getHumidityStat());
    dispatch(getHumidityStatFirst());
    dispatch(getHumidityState());
    dispatch(getHumidityStateFirst());

    dispatch(getLightStat());
    dispatch(getLightStatFirst());
    dispatch(getLightState());
    dispatch(getLightStateFirst());
  }, []);

  useEffect(() => {
    if (temperatureState) {
      setToggleButton3(temperatureState);
    }
    if (humidityState) {
      setToggleButton1(humidityState);
    }
    if (lightState) {
      setToggleButton2(lightState);
    }
    if (fanState) {
      setToggleButton4(fanState);
    }
  }, [temperatureState, humidityState, lightState, fanState]);
  //Lấy dữ liệu mới nhất sau mỗi 20s
  const mark = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 100,
      label: "100",
    },
  ];
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

  const handleChangeFanState = () => {
    //Nếu true thì tắt quạt đi (true == đang bật)
    if (toggleButton4 === true) {
      dispatch(turnOffFan());
      setToggleButton4(false);
    } else if (toggleButton4 === false) {
      dispatch(turnOnFan());
      setToggleButton4(true);
    }
  }
  return (
    <div>
      <div className="grid grid-cols-2 mb-10">
        <h1 className="text-xl font-bold">Frequently Used Devices</h1>
        <NavLink to="/manualcontrol">
          <div className="text-right text-violet-700">
            <h2>
              More settings <AiOutlineArrowRight className="inline" />
            </h2>
          </div>
        </NavLink>
      </div>
      <div className="grid grid-cols-4 gap-9 text-center">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="grid grid-cols-2 mb-10">
            <button className="bg-sky-700 text-white w-14 h-14 rounded-full">
              {humidityStat ? humidityStat : humidityStatFirst}
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
          <div className="grid grid-cols-2 mb-10">
            <button className="bg-yellow-700 text-white w-14 h-14 rounded-full">
              {lightStat ? lightStat : lightStatFirst}
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
          <div className="grid grid-cols-2 mb-10">
            <button className="bg-red-700 text-white w-14 h-14 rounded-full">
              {temperatureStat ? temperatureStat : temperatureStatFirst}
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
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="grid grid-cols-2">
            <div></div>
            <div className="text-right" key={toggleButton4}>
              <Switch
                onChange={handleChangeFanState}
                checked={toggleButton4}
                onColor="#593EFF"
                height={24}
                width={48}
                className="react-switch"

              />
            </div>
          </div>
          <div className="mb-2 mt-10">
            {/* <Slider
              aria-label="Fan"
              value={fanStat ? parseInt(fanStat) : 0}
              step={1}
              min={0}
              max={100}
              valueLabelDisplay="on"
              marks={mark}
              color="secondary"
            /> */}
            <div>
              <input type='range'
                min={0}
                max={100}
                step={1}
                onChange={(e) => setValueFan(e.target.value)}
                className="slider"
                id="myRange"

              />
            </div>
          </div>
          <h1 className="font-bold text-lg mb-5">Fan</h1>

        </div>
      </div></div>
  )
}
