import React, { useEffect } from 'react'
import { AiOutlineArrowRight } from "react-icons/ai";
import Switch from "react-switch";
import Slider from "@mui/material/Slider";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getFanState, getHumidityStat, getLightStat, getTemperatureStat, getTemperatureState, turnOffTemperature, turnOnTemperature } from '../../redux/actions/deviceActions';

export default function FrequentlyUsedDevices() {
  const [toggleButton1, setToggleButton1] = React.useState(false);
  const [toggleButton2, setToggleButton2] = React.useState(false);
  const [toggleButton3, setToggleButton3] = React.useState(false);
  const [toggleButton4, setToggleButton4] = React.useState(false);
  // const getTempStat = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'X-AIO-Key': process.env.ADAFRUIT_KEY,
  //       }
  //     };
  //     const { data } = await axios.get('https://io.adafruit.com/api/v2/iamlvv/feeds/light/data', config);
  //     //console.log(data[0]);
  //     setTempData(data[0]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // const getHumidStat = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'X-AIO-Key': process.env.ADAFRUIT_KEY,
  //       }
  //     };
  //     const { data } = await axios.get('https://io.adafruit.com/api/v2/iamlvv/feeds/humidity/data', config);
  //     //console.log(data[0]);
  //     setHumidData(data[0]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   getTempStat();
  //   getHumidStat();
  // }, [tempData, humidData]);
  const dispatch = useDispatch();
  const TempStat = useSelector((state) => state.temperatureStat);
  const HumidStat = useSelector((state) => state.humidityStat);
  const LightStat = useSelector((state) => state.lightStat);
  const TempState = useSelector((state) => state.temperatureState);
  const { loading4, error4, temperatureState } = TempState;
  const { loading1, error1, temperatureStat } = TempStat;
  const { loading2, error2, humidityStat } = HumidStat;
  const { loading3, error3, lightStat } = LightStat;
  useEffect(() => {
   
      dispatch(getTemperatureStat());
      dispatch(getHumidityStat());
      dispatch(getLightStat());
      dispatch(getTemperatureState());
  }, []);
  useEffect(() => {
    
    setInterval(() => {
      dispatch(getTemperatureStat());
      dispatch(getHumidityStat());
      dispatch(getLightStat());
      dispatch(getTemperatureState());
      setToggleButton3(temperatureState);
    },20000);
    //clearInterval(loadHandle.current);
  }, [dispatch]);
  const mark = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 10,
      label: "10",
    },
  ];
  //Handle change States
  const handleChangeTempState = async () => {
    if (temperatureState && temperatureState === "T_ON") {
      dispatch(turnOffTemperature());
    } else {
      dispatch(turnOnTemperature());
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
            <button className="bg-violet-700 text-white w-14 h-14 rounded-full">
              {humidityStat ? humidityStat : "0"}
            </button>
            <div className="text-right">
              <Switch
                onChange={() => setToggleButton1(!toggleButton1)}
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
            <button className="bg-violet-700 text-white w-14 h-14 rounded-full">
              {lightStat ? lightStat : "0"}
            </button>
            <div className="text-right">
              <Switch
                onChange={() => setToggleButton2(!toggleButton2)}
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
            <button className="bg-violet-700 text-white w-14 h-14 rounded-full">
              {temperatureStat ? temperatureStat : "0"}
            </button>
            <div className="text-right">
              <Switch
                onChange={handleChangeTempState}
                checked={temperatureState ? temperatureState === "T_ON" ? true: false : false}
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
            <div className="text-right">
              <Switch
                onChange={() => setToggleButton4(!toggleButton4)}
                checked={toggleButton4}
                onColor="#593EFF"
                height={24}
                width={48}
                className="react-switch"
              />
            </div>
          </div>
          <div className="mb-2">
            <Slider
              aria-label="Fan"
              defaultValue={30}
              step={1}
              min={0}
              max={10}
              valueLabelDisplay="on"
              marks={mark}
              color="secondary"
            />
          </div>
          <h1 className="font-bold text-lg mb-5">Fan</h1>
          
        </div>
      </div></div>
  )
}
