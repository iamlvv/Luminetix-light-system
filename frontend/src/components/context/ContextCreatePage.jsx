import { Slider } from '@mui/material';
import Switch from 'react-switch';
import React from 'react'
import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';

import { NavLink } from 'react-router-dom'
import NavBar from '../NavBar';
import ContextSideBar from './ContextSideBar';

import { ProgressBar } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";

function ContextCreatePage() {
  const [toggleButton1, setToggleButton1] = React.useState(false);
  const [toggleButton2, setToggleButton2] = React.useState(false);
  const [toggleButton3, setToggleButton3] = React.useState(false);
  const [starttime, setStartTime] = React.useState('');
  const [endtime, setEndTime] = React.useState('');
  return (
    <div>
      <div>
        <NavBar />
        <div className='ml-28 grid grid-cols-4 gap-9' >
          <div className='bg-violet-100 rounded-2xl col-span-3 p-5 mt-5'>
            <div className=''>
              <input type='text' name='content' placeholder="Context name" className='w-full p-3 rounded-2xl border border-black' />
            </div>
            <div className='mt-5'>
              <input type='text' name='content' placeholder="Context content" className='w-full p-3 rounded-2xl border border-black' />
            </div>
            <div className='mt-5'>
            </div>
            <h1 className='font-bold text-2xl mt-10 mb-2'>Input</h1>
            <h2 className='text-gray-500 mb-5'>Choose condition that will start the routine</h2>
            <div>
              <h1 className='font-bold mb-5'>Sensors and devices status</h1>
              <div className='grid grid-cols-3 gap-9'>
                <div className='p-5 rounded-2xl shadow-sm bg-white text-center'>
                  <div className='grid grid-cols-2 leading-9'>
                    <h1 className='font-bold'>Temperature</h1>
                    <Switch
                      onChange={() => setToggleButton1(!toggleButton1)}
                      checked={toggleButton1}
                      onColor="#593EFF"
                      height={24}
                      width={48}
                      className="react-switch"
                    />
                  </div>
                  <div className='pt-10'>
                    <Slider
                      aria-label="temperature"
                      defaultValue={0}
                      step={1}
                      min={0}
                      max={100}
                      valueLabelDisplay="on"
                      color="secondary"
                    //key={`slider-${context.tempstat}`} 

                    />
                  </div>
                </div>
                <div className='bg-white shadow-sm rounded-2xl text-center'>
                  <div className='grid grid-cols-2 mt-5 leading-9'>
                    <h1 className='font-bold'>Humidity</h1>
                    <Switch
                      onChange={() => setToggleButton2(!toggleButton2)}
                      checked={toggleButton2}
                      onColor="#593EFF"
                      height={24}
                      width={48}
                      className="react-switch"
                    />
                  </div>
                  <div className='mt-5 flex justify-between gap-9 p-5'>
                    <div>
                      <label>From</label>
                      <input type='number' name='fromhumid' placeholder={"0%"} className='w-full p-2 rounded-2xl border' />
                    </div>
                    <div>
                      <label>To</label>
                      <input type='number' name='fromhumid' placeholder={"100%"} className='w-full p-2 rounded-2xl border' />
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div className='bg-white shadow-sm rounded-2xl p-2 grid grid-cols-2 text-center leading-9'>
                      <h1 className='font-bold'>Detecting people</h1>
                      <Switch
                        onChange={() => setToggleButton3(!toggleButton3)}
                        checked={toggleButton3}
                        onColor="#593EFF"
                        height={24}
                        width={48}
                        className="text-right"
                      />
                    </div>
                    <div className='mt-5'>
                      <h1 className='font-bold mb-2'>Lighting time limit</h1>
                      <div>
                        <input type='number' name='content' placeholder={"0 hour"} className='w-full p-2 rounded-2xl border' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-5'>
                <h1 className='font-bold mb-5'>Date and time</h1>
                <div className='grid grid-cols-3 gap-9'>
                  <div className='bg-white shadow-sm rounded-2xl p-5'>
                    <label className='font-bold mb-3'>Day</label>
                    <div>
                      <select>
                        <option>Today</option>
                        <option>Every Monday</option>
                        <option>Every Tuesday</option>
                        <option>Every Wednesday</option>
                        <option>Every Thursday</option>
                        <option>Every Friday</option>
                        <option>Every Saturday</option>
                        <option>Every Sunday</option>
                        <option>Everyday</option>
                      </select>
                    </div>
                  </div>
                  <div className='bg-white shadow-sm rounded-2xl p-5'>
                    <label className='font-bold mb-3'>Start time</label>
                    <div>
                      <TimePicker
                        placeholder="Select Start Time"
                        use12Hours
                        showSecond={false}
                        focusOnOpen={true}
                        format="hh:mm A"
                        onChange={e => setStartTime(e.format('LT'))}
                      />
                    </div>
                  </div>
                  <div className='bg-white shadow-sm rounded-2xl p-5'>
                    <label className='font-bold mb-3'>End time</label>
                    <div>
                      <TimePicker
                        placeholder="Select End Time"
                        use12Hours
                        showSecond={false}
                        focusOnOpen={true}
                        format="hh:mm A"
                        onChange={e => setEndTime(e.format('LT'))}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-row justify-between mt-10'>
                <NavLink to='/contextsetup'><button className='font-bold bg-violet-500 hover:bg-violet-600 transition ease-in text-white py-2 px-3 rounded-2xl'>Back</button></NavLink>
                <NavLink to={`/contextsetup/createnew/2`}><button className='font-bold bg-violet-500 hover:bg-violet-600 transition ease-in text-white py-2 px-3 rounded-2xl'>Next</button></NavLink>
              </div>
            </div>
          </div>
          <ContextSideBar />
        </div>
      </div>
    </div>
  )
}

export default ContextCreatePage