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
  const [toggleButton4, setToggleButton4] = React.useState(false);
  const [starttime, setStartTime] = React.useState('');
  const [endtime, setEndTime] = React.useState('');
  return (
    <div>
      <div>
        <NavBar />
        <div className='ml-28 grid grid-cols-4 gap-9' >
          <div className='bg-violet-100 rounded-xl col-span-3 p-5 mt-5'>
            <div>
              <input type='text' name='content' placeholder="Context name" className='w-full p-3 rounded-2xl border border-black' />
            </div>
            <div className='mt-5'>
              <input type='text' name='content' placeholder="Context desscription" className='w-full p-3 rounded-2xl border border-black' />
            </div>
            {/* Body */}
            <h1 className='font-bold text-2xl mt-10 mb-2'>Input</h1>
            <h2 className='text-gray-500 mb-5'>Choose condition that will start the context.</h2>
            <div>
              <h1 className='font-bold mb-5'>Sensors status</h1>
              <div className='grid grid-cols-3 gap-9'>
                {/* Temperature */}
                <div className='p-5 rounded-2xl shadow-sm bg-white text-center'>
                  <div className='grid grid-cols-2 leading-9'>
                  <div className='grid grid-rows-2'>
                    <h1 className='font-bold'>Temperature</h1>
                    <p className=' text-xs text-gray-500'>Choose temperature that trigger context</p>
                  </div>
                    <Switch
                      onChange={() => setToggleButton1(!toggleButton1)}
                      checked={toggleButton1}
                      onColor="#593EFF"
                      height={24}
                      width={48}
                      className="react-switch my-auto ml-auto"
                    />
                  </div>
                  <div className='pt-10'>
                    <Slider
                      aria-label="temperature"
                      defaultValue={30}
                      step={1}
                      min={0}
                      max={100}
                      valueLabelDisplay="on"
                      color="secondary"
                    />
                  </div>
                </div>
                {/* Humidity */}
                <div className='bg-white shadow-sm rounded-xl text-center p-5'>
                  <div className='grid grid-cols-2'>
                    <div className='grid grid-rows-2'>
                      <h1 className='font-bold'>Humidity</h1>
                      <p className=' text-xs text-gray-500'>Choose humidity level that trigger context</p>
                    </div>  
                    <Switch
                      onChange={() => setToggleButton2(!toggleButton2)}
                      checked={toggleButton2}
                      onColor="#593EFF"
                      height={24}
                      width={48}
                      className="react-switch my-auto ml-auto"
                    />
                  </div>
                  <div className='flex justify-between gap-9 p-5 text-left'>
                    <div>
                      <label className='text-xs font-bold'>From</label>
                      <input type='number' name='fromhumid' placeholder={"0%"} className='w-full p-2 rounded-lg border' />
                    </div>
                    <div>
                      <label className='text-xs font-bold'>To</label>
                      <input type='number' name='fromhumid' placeholder={"100%"} className='w-full p-2 rounded-lg border' />
                    </div>
                  </div>
                </div>
                  <div className='grid grid-rows-2'>
                {/* Dectecting people */}
                    <div className='bg-white shadow-sm rounded-xl py-2 px-5 grid grid-cols-4 text-center row-span-1 mb-3'>
                      <div className='col-span-3 my-auto'>
                        <h1 className='font-bold'>Detecting human</h1>
                        <p className=' text-xs text-gray-500'>Human detection sensor</p>
                      </div> 
                      <Switch
                        onChange={() => setToggleButton3(!toggleButton3)}
                        checked={toggleButton3}
                        onColor="#593EFF"
                        height={24}
                        width={48}
                        className="text-right my-auto ml-auto"
                      />
                    </div>
                    {/* Lighting time limit */}
                    <div className='bg-white shadow-sm rounded-xl py-5 px-5 grid grid-cols-4 text-center row-span-1 mt-3'>
                      <div className='grid grid-rows-2 col-span-3'>
                        <h1 className='font-bold'>Lighting time limit</h1>
                        <input type='number' name='content' placeholder={"0 hour"} className=' text-center w-3/4 p-1 rounded-md border mx-auto' />
                        {/* <p className=' text-xs text-gray-500 mt-2'>The light will turn off after this time</p> */}
                      </div> 
                      <Switch
                        onChange={() => setToggleButton4(!toggleButton4)}
                        checked={toggleButton4}
                        onColor="#593EFF"
                        height={24}
                        width={48}
                        className="text-right my-auto ml-auto"
                      />
                    </div>
                  </div>
              </div>
              {/* Date and time */}
              <div className='mt-5'>
                <h1 className='font-bold mb-5'>Date and time</h1>
                <div className='grid grid-cols-3 gap-9'>
                  {/* Repeat */}
                  <div className='bg-white shadow-sm rounded-xl p-5 grid grid-cols-3'>
                    <label className='font-bold col-span-1 my-auto mr-auto'>Repeat</label>
                    <div className='m-auto col-span-2'>
                      <select className='w-full border rounded text-gray-500 px-4 text-xs p-1'>
                        <option>Only today</option>
                        <option>Everyday</option>
                        <option>Every Monday</option>
                        <option>Every Tuesday</option>
                        <option>Every Wednesday</option>
                        <option>Every Thursday</option>
                        <option>Every Friday</option>
                        <option>Every Saturday</option>
                        <option>Every Sunday</option>
                      </select>
                    </div>
                  </div>
                  {/* Start time */}
                  <div className='bg-white shadow-sm rounded-xl p-5 grid grid-cols-3'>
                    <label className='font-bold col-span-1 my-auto mr-auto'>Start time</label>
                    <div className='m-auto col-span-2'>
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
                  {/* End time */}
                  <div className='bg-white shadow-sm rounded-xl p-5 grid grid-cols-3'>
                    <label className='font-bold col-span-1 my-auto mr-auto'>End time</label>
                    <div className='m-auto col-span-2'>
                      <TimePicker
                        placeholder="Select End Time"
                        use12Hours
                        showSecond={false}
                        focusOnOpen={true}
                        format="hh:mm A"
                        onChange={e => setStartTime(e.format('LT'))}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-row justify-between mt-10'>
                <NavLink to='/contextsetup'><button className='font-bold bg-violet-500 hover:bg-violet-600 transition ease-in text-white py-2 px-5 rounded-lg'>Back</button></NavLink>
                <NavLink to={`/contextsetup/createnew/2`}><button className='font-bold bg-violet-500 hover:bg-violet-600 transition ease-in text-white py-2 px-5 rounded-lg'>Next</button></NavLink>
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