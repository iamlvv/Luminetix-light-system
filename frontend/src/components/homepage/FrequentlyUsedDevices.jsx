import React from 'react'
import { AiOutlineArrowRight } from "react-icons/ai";
import Switch from "react-switch";
import Slider from "@mui/material/Slider";
import { NavLink } from "react-router-dom";

export default function FrequentlyUsedDevices() {
    const [toggleButton1, setToggleButton1] = React.useState(false);
  const [toggleButton2, setToggleButton2] = React.useState(false);
  const [toggleButton3, setToggleButton3] = React.useState(false);
  const [toggleButton4, setToggleButton4] = React.useState(false);
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
            <div className="grid grid-cols-4 gap-9">
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <div className="grid grid-cols-2 mb-10">
                  <button className="bg-violet-700 text-white w-14 h-14 rounded-full">
                    80
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
                <div>
                  <select>
                    <option>Device 1</option>
                    <option>Device 2</option>
                    <option>Device 3</option>
                  </select>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <div className="grid grid-cols-2 mb-10">
                  <button className="bg-violet-700 text-white w-14 h-14 rounded-full">
                    80
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
                <div>
                  <select>
                    <option>Device 1</option>
                    <option>Device 2</option>
                    <option>Device 3</option>
                  </select>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <div className="grid grid-cols-2 mb-10">
                  <button className="bg-violet-700 text-white w-14 h-14 rounded-full">
                    80
                  </button>
                  <div className="text-right">
                    <Switch
                      onChange={() => setToggleButton3(!toggleButton3)}
                      checked={toggleButton3}
                      onColor="#593EFF"
                      height={24}
                      width={48}
                      className="react-switch"
                    />
                  </div>
                </div>
                <h1 className="font-bold text-lg mt-5 mb-5">Temperature</h1>
                <div>
                  <select>
                    <option>Device 1</option>
                    <option>Device 2</option>
                    <option>Device 3</option>
                  </select>
                </div>
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
                <div>
                  <select>
                    <option>Device 1</option>
                    <option>Device 2</option>
                    <option>Device 3</option>
                  </select>
                </div>
              </div>
            </div></div>
  )
}
