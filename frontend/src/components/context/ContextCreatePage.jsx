import { Slider } from '@mui/material';
import Switch from 'react-switch';
import React from 'react'
import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';

import { NavLink } from 'react-router-dom'
import NavBar from '../NavBar';
import ContextSideBar from './ContextSideBar';
import lighticon2 from '../../images/lighticon2.png'
import fanicon2 from '../../images/fanicon1.jpg'
import "react-step-progress-bar/styles.css";

function ContextCreatePage() {

  const [toggleButtonTemp, setToggleButtonTemp] = React.useState(false);
  const [toggleButtonHum, setToggleButtonHum] = React.useState(false);
  const [toggleButtonHumanDetection, setToggleButtonHumanDetection] = React.useState(false);
  const [toggleButtonLED, setToggleButtonLED] = React.useState(false);
  const [toggleButtonFan, setToggleButtonFan] = React.useState(false);
  const [toggleButtonSystem, setToggleButtonSystem] = React.useState(false);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [fromTemp, setFromTemp] = React.useState("");
  const [toTemp, setToTemp] = React.useState("");
  const [fromHum, setFromHum] = React.useState("");
  const [toHum, setToHum] = React.useState("");
  const [repeat, setRepeat] = React.useState("");
  const [starttime, setStartTime] = React.useState("");
  const [endtime, setEndTime] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
  }
  return (
    <div>
      <div>
        <NavBar />
        <div className='ml-28 grid grid-cols-4 gap-9' >
          <form className='bg-violet-100 rounded-xl col-span-3 p-5 mt-5'
            onSubmit = {handleSubmit}
          >
            <div>
              <input type='text' name='content' value={name || ""} className='w-full p-3 rounded-2xl border border-black'
                 onChange={(e) => setName(e.target.value)}
               />
            </div>
            <div className='mt-5'>
              <input type='text' name='description' value = {description || ""} className='w-full p-3 rounded-2xl border border-black' 
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {/* Body */}
            <div className='bg-white mt-10 mb-5 rounded-2xl p-5'>
            <h1 className='font-bold text-2xl mb-2'>Input</h1>
            <h2 className='text-gray-500'>Choose condition that will start the context.</h2>
            </div>
            <div>
              <h1 className='font-bold mb-5'>Sensors status</h1>
              <div className='grid grid-cols-3 gap-9'>
                {/* Temperature */}
                <div className='bg-white shadow-sm rounded-xl text-center p-5'>
                  <div className='grid grid-cols-2'>
                    <div className='grid grid-rows-2'>
                      <h1 className='font-bold'>Temperature</h1>
                      <p className=' text-xs text-gray-500'>Choose temperature level that trigger context</p>
                    </div>
                    <Switch
                      // onChange={() => setToggleButton2(!toggleButton2)}
                      checked={toggleButtonTemp}
                      onColor="#593EFF"
                      height={24}
                      width={48}
                      className="react-switch my-auto ml-auto"
                    />
                  </div>
                  <div className='flex justify-between gap-9 p-5 text-left'>
                    <div>
                      <label className='text-xs font-bold'>From</label>
                      <input type='text' name='fromtemp' value={fromTemp || ""} className='w-full p-2 rounded-lg border'
                        onChange={(e) => setFromTemp(e.target.value)} />
                    </div>
                    <div>
                      <label className='text-xs font-bold'>To</label>
                      <input type='text' name='totemp' value={toTemp || ""} className='w-full p-2 rounded-lg border'
                        onChange={(e) => setToTemp(e.target.value)}
                      />
                    </div>
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
                      onChange={() => setToggleButtonHum(!toggleButtonHum)}
                      checked={toggleButtonHum}
                      onColor="#593EFF"
                      height={24}
                      width={48}
                      className="react-switch my-auto ml-auto"
                    />
                  </div>
                  <div className='flex justify-between gap-9 p-5 text-left'>
                    <div>
                      <label className='text-xs font-bold'>From</label>
                      <input type='number' name='fromhumid' value={fromHum || ""} className='w-full p-2 rounded-lg border'
                        onChange={(e) => setFromHum(e.target.value)}

                      />
                    </div>
                    <div>
                      <label className='text-xs font-bold'>To</label>
                      <input type='number' name='fromhumid' value={toHum || ""} className='w-full p-2 rounded-lg border' 
                        onChange={(e) => setToHum(e.target.value)}
                      />
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
                      onChange={() => setToggleButtonHumanDetection(!toggleButtonHumanDetection)}
                      checked={toggleButtonHumanDetection}
                      onColor="#593EFF"
                      height={24}
                      width={48}
                      className="text-right my-auto ml-auto"
                    />
                  </div>
                  {/* Lighting time limit */}
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
                      <select className='w-full border rounded text-gray-500 px-4 text-xs p-1'
                        onChange={(e) => setRepeat(e.target.value)}
                      >
                        <option>today</option>
                        <option>Everyday</option>
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                        <option>Saturday</option>
                        <option>Sunday</option>
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
              <div>
                <div className='p-5 bg-white rounded-2xl mt-10 mb-5'>
                <h1 className='font-bold text-2xl mb-2'>Then...</h1>
                <h2 className='text-gray-500'>Choose what you want to happen with your devices.</h2>
                </div>
                <div >
                  <h1 className='font-bold'>Control devices</h1>
                  {/* Control devices */}
                  <div className='grid grid-cols-3 gap-9 text-center mt-5'>
                    {/* Light */}
                    <div className='bg-white shadow-sm rounded-xl p-5 grid grid-rows-2'>
                      <div className='grid grid-cols-2 row-span-1'>
                        <div className='w-10 m-auto'>
                          <img src={lighticon2} alt='light' className='mx-auto' />
                        </div>
                        <Switch
                          onChange={() => setToggleButtonLED(!toggleButtonLED)}
                          checked={toggleButtonLED}
                          onColor="#593EFF"
                          height={24}
                          width={48}
                          className="react-switch my-auto ml-auto"
                        />
                      </div>
                      <div className='grid grid-cols-2 row-span-1'>
                        <h1 className='font-bold col-span-1 m-auto'>LED</h1>
                        <div className='my-auto ml-auto'>
                          <select className='border px-4 py-1 rounded'>
                            <option>Yellow</option>
                            <option>Red</option>
                            <option>Blue</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* Fan */}
                    <div className='bg-white shadow-sm rounded-xl p-5 grid grid-rows-2'>
                      <div className='grid grid-cols-2 row-span-1'>
                        <div className='w-10 m-auto'>
                          <img src={fanicon2} alt='fan' className='mx-auto' />
                        </div>
                        <Switch
                          onChange={() => setToggleButtonFan(!toggleButtonFan)}
                          checked={toggleButtonFan}
                          onColor="#593EFF"
                          height={24}
                          width={48}
                          className="react-switch my-auto ml-auto"
                        />
                      </div>
                      <div className='grid grid-cols-2 row-span-1'>
                        <h1 className='font-bold col-span-1 m-auto'>Fan</h1>
                        <div className='my-auto ml-auto'>
                          <select className='border px-4 py-1 rounded'>
                            <option>Level 1</option>
                            <option>Level 2</option>
                            <option>Level 3</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* System */}
                    <div className='bg-white shadow-sm rounded-xl p-5 grid grid-cols-4'>
                      <h1 className='font-bold m-auto col-span-3'>Control the whole system</h1>
                      <Switch
                        onChange={() => setToggleButtonSystem(!toggleButtonSystem)}
                        checked={toggleButtonSystem}
                        onColor="#593EFF"
                        height={24}
                        width={48}
                        className="react-switch my-auto ml-auto"
                      />
                    </div>
                  </div>
                </div>
                {/* Notification */}
                <div className='mt-5'>
                  <h1 className='font-bold'>Notifications</h1>
                  <div className='grid grid-cols-2 gap-10 ml-20 mr-20 mt-3'>
                    <div className='p-3 bg-white rounded-xl shadow-sm'>
                      {/* Message */}
                      <div className='mx-3 my-1 col-span-2'>
                        <label className='font-bold text-gray-900 text-sm'>Message</label>
                        <input type='text' placeholder='Enter your message' className='border rounded-xl p-3 mb-5 w-full' />
                      </div>
                      {/* Email */}
                      <div className='mx-3 my-1 col-span-2'>
                        <label className='font-bold text-gray-900 text-sm'>Email</label>
                        <input type='text' placeholder='Enter your email' className='border rounded-xl p-3 mb-5 w-full' />
                      </div>
                    </div>
                    {/* Include info */}
                    <div className='py-5 px-10 bg-white rounded-xl shadow-sm'>
                      <h1 className='font-bold mb-5'>Include information</h1>
                      <div className='flex flex-col gap-5'>
                        <div>
                          <input type='checkbox' className='mr-3 mb-4' />
                          <label>Fan status</label>
                        </div>
                        <div>
                          <input type='checkbox' className='mr-3 mb-4' />
                          <label>Light status</label>
                        </div>
                        <div>
                          <input type='checkbox' className='mr-3 mb-4' />
                          <label>Date and time</label>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className='flex flex-row justify-between mt-10'>
                <NavLink to='/contextsetup'><button className='font-bold bg-violet-500 hover:bg-violet-600 transition ease-in text-white py-2 px-5 rounded-lg'>Back</button></NavLink>
                <NavLink to={`/contextsetup/createnew/2`}><button className='font-bold bg-violet-500 hover:bg-violet-600 transition ease-in text-white py-2 px-5 rounded-lg' type='submit'>Next</button></NavLink>
              </div>
            </div>
          </form>
          <ContextSideBar />
        </div>
      </div>
    </div>
  )
}

export default ContextCreatePage