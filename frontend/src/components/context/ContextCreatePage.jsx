import { Slider } from '@mui/material';
import Switch from 'react-switch';
import React from 'react'

import { NavLink } from 'react-router-dom'
import NavBar from '../NavBar';
import ContextSideBar from './ContextSideBar';

function ContextCreatePage() {
  var contextname = localStorage.getItem('name');
  const [toggleButton1, setToggleButton1] = React.useState(false);
  const [toggleButton2, setToggleButton2] = React.useState(false);
  const [toggleButton3, setToggleButton3] = React.useState(false);
  return (
    <div>
      <div>
        <NavBar />
        <div className='ml-28 grid grid-cols-4 gap-9' >
          <div className='bg-violet-100 rounded-2xl col-span-3 p-5 mt-5'>
            <div className=''>
              <input type='text' name='content' placeholder={contextname ? contextname : 'Context name'} className='w-full p-3 rounded-2xl border border-black' />
            </div>
            <div className='mt-5'>
              <input type='text' name='content' placeholder="Context content" className='w-full p-3 rounded-2xl border border-black' />
            </div>
            <div>
              {/* Progress Bar */}
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
                  <div className='grid grid-cols-2  mt-5 leading-9'>
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
                  <div className='mt-5'>
                    <select>
                      <option>0-10</option>
                      <option>10-20</option>
                      <option>20-30</option>
                    </select>
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
                        <input type='text' name='content' placeholder={"0 hour"} className='w-full p-2 rounded-2xl border' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-5'>
                <h1 className='font-bold mb-5'>Date and time</h1>
                <div className='grid grid-cols-3 gap-9'>
                  <div className='bg-white shadow-sm rounded-2xl p-5'>
                    <label>Day</label>
                    <input type="text" name="day" />
                  </div>
                  <div className='bg-white shadow-sm rounded-2xl p-5'>
                    <label>Start time</label>
                    <input type="text" name="starttime" />
                  </div>
                  <div className='bg-white shadow-sm rounded-2xl p-5'>
                    <label>End time</label>
                    <input type="text" name="endtime" />
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