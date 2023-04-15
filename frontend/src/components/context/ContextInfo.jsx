import { Slider } from '@mui/material';
import  Switch  from 'react-switch';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { contextDetail, listOfContexts } from '../../redux/actions/contextActions'
import NavBar from '../NavBar';
import ContextSideBar from './ContextSideBar';
function ContextInfo() {
  const dispatch = useDispatch();
  const contextdetail = useSelector(state => state.contextDetail);
  const { loading, error, context } = contextdetail;
  const { id } = useParams();
  useEffect(() => {
    dispatch(contextDetail((id)));
  },[])
  const contextList = useSelector((state) => state.contextList);
  const { load, err, contextlist } = contextList;
  useEffect(() => {
    dispatch(listOfContexts());
  }, [dispatch]);
  const [toggleButton1, setToggleButton1] = React.useState(false);
  const [toggleButton2, setToggleButton2] = React.useState(false);
  const [toggleButton3, setToggleButton3] = React.useState(false);
  const [toggleButton4, setToggleButton4] = React.useState(true);
  return (
    <div>
      <div>
        <NavBar />
        <div className='ml-28 grid grid-cols-4 gap-9' >
          <div className='bg-violet-100 rounded-xl col-span-3 p-5 mt-5'>
            <h1 className='font-bold text-2xl mb-5'>{context.name}</h1>
            <div>
              <input type='text' name='content' placeholder={context.description} className='w-full p-3 rounded-xl border border-black' />
            </div>
            {/* Body */}
            <div>
              {/* Progress Bar */}
            </div>
            <h1 className='font-bold text-2xl mt-10 mb-2'>Input</h1>
            <h2 className='text-gray-500 mb-5'>Choose condition that will start the routine</h2>
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
                      // onChange={() => setToggleButton1(!toggleButton1)}
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
                    defaultValue={34}
                    step={1}
                    min={0}
                    max={100}
                    valueLabelDisplay="on"
                    color="secondary"
                    key={`slider-${context._id}`} 
                    onChange = {(e, value) => console.log(value)}
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
                      // onChange={() => setToggleButton2(!toggleButton2)}
                      checked={toggleButton2}
                      onColor="#593EFF"
                      height={24}
                      width={48}
                      className="react-switch my-auto ml-auto"
                    />
                  </div>
                  {/* <div className='mt-5'>
                    <select>
                      <option>{context.humidstat}</option>
                      <option>10-20</option>
                      <option>20-30</option>
                    </select>
                  </div> */}
                  <div className='flex justify-between gap-9 p-5 text-left'>
                    <div>
                      <label className='text-xs font-bold'>From</label>
                      <input type='number' name='fromhumid' placeholder={"0%"} className='w-full p-2 rounded-lg border' />
                    </div>
                    <div>
                      <label className='text-xs font-bold'>To</label>
                      <input type='number' name='fromhumid' placeholder={25 + '%'} className='w-full p-2 rounded-lg border' />
                    </div>
                  </div>
                </div>
                <div className='grid grid-rows-2'>
                {/* Detecting people */}
                  <div className='bg-white shadow-sm rounded-xl  py-2 px-5 grid grid-cols-4 text-center row-span-1 mb-3'>
                    <div className='col-span-3 my-auto'>
                      <h1 className='font-bold'>Detecting human</h1>
                      <p className=' text-xs text-gray-500'>Human detection sensor</p>
                    </div> 
                    <Switch
                      // onChange={() => setToggleButton3(!toggleButton3)}
                      checked={toggleButton3}
                      onColor="#593EFF"
                      height={24}
                      width={48}
                      className="text-right my-auto ml-auto"
                    />
                  </div>
                  {/* Lighting time limit */}
                  {/* <div className='mt-5'>
                    <h1 className='font-bold mb-2'>Lighting time limit</h1>
                    <div>
                      <input type='text' name='content' placeholder={context.lighttimelimit + " hour"} className='w-full p-2 rounded-2xl border' />
                    </div>
                  </div> */}
                  <div className='bg-white shadow-sm rounded-xl py-5 px-5 grid grid-cols-4 text-center row-span-1 mt-3'>
                      <div className='grid grid-rows-2 col-span-3'>
                        <h1 className='font-bold'>Lighting time limit</h1>
                        <input type='number' name='content' placeholder={24 + " hour"} className=' text-center w-3/4 p-1 rounded-md border mx-auto' />
                        {/* <p className=' text-xs text-gray-500 mt-2'>The light will turn off after this time</p> */}
                      </div> 
                      <Switch
                        // onChange={() => setToggleButton4(!toggleButton4)}
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
                    <input type="text" name="day" className='m-auto col-span-2 border mx-3 rounded'/>
                  </div>
                  {/* Start time */}
                  <div className='bg-white shadow-sm rounded-xl p-5 grid grid-cols-3'>
                    <label className='font-bold col-span-1 my-auto mr-auto'>Start time</label>
                    <input type="text" name="starttime" className='m-auto col-span-2 border mx-3 rounded'/>
                  </div>
                  {/* End time */}
                  <div className='bg-white shadow-sm rounded-xl p-5 grid grid-cols-3'>
                    <label className='font-bold col-span-1 my-auto mr-auto'>End time</label>
                    <input type="text" name="endtime" className='m-auto col-span-2 border mx-3 rounded'/>
                  </div>
                </div>
              </div>

              <div className='flex flex-row justify-between mt-10'>
                <NavLink to='/contextsetup'><button className='font-bold bg-violet-500 hover:bg-violet-600 transition ease-in text-white py-2 px-5 rounded-lg'>Back</button></NavLink>
                <NavLink to={`/contextsetup/${context._id}/2`}><button className='font-bold bg-violet-500 hover:bg-violet-600 transition ease-in text-white py-2 px-5 rounded-lg'>Next</button></NavLink>
              </div>
            </div>
          </div>
          <ContextSideBar />
        </div>
      </div>
    </div>
  )
}

export default ContextInfo