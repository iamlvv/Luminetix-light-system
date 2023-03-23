import { Slider, Switch } from '@mui/material';
import React, { useEffect } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { contextDetail, listOfContexts } from '../../redux/actions/contextActions'
import NavBar from '../NavBar';
function ContextInfo() {
  const dispatch = useDispatch();
  const contextdetail = useSelector(state => state.contextDetail);
  const { loading, error, context } = contextdetail;
  const { id } = useParams();
  useEffect(() => {
    dispatch(contextDetail(Number(id)));
  }, [dispatch, id])

  const contextList = useSelector((state) => state.contextList);
  const { load, err, contextlist } = contextList;
  useEffect(() => {
    dispatch(listOfContexts());
  }, [dispatch]);

  const [toggleButton1, setToggleButton1] = React.useState(context.tempstate);
  const [toggleButton2, setToggleButton2] = React.useState(context.humidstate);
  const [toggleButton3, setToggleButton3] = React.useState(context.viewstate);
  return (
    <div>
      <div>
        <NavBar />
        <div className='ml-28 mt-5 grid grid-cols-4 gap-9' >
          <div className='bg-violet-100 rounded-2xl col-span-3 p-5'>
            <h1 className='font-bold text-2xl mb-5'>{context.name}</h1>
            <div>
              <input type='text' name='content' placeholder={context.content} className='w-full p-3 rounded-2xl border border-black' />
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
                  <div>
                    <Slider
                      defaultValue={context.tempstat}
                      aria-label="Default"
                      valueLabelDisplay="auto"
                      step={1}
                      marks
                      min={0}
                      max={100}
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
                      <option>{context.humidstat}</option>
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
                        <input type='text' name='content' placeholder={context.lighttimelimit + " hour"} className='w-full p-2 rounded-2xl border' />
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
              <div className='mt-5 bg-white rounded-2xl shadow-sm p-5'>
                <h1 className='font-bold mb-5'>Applied rooms</h1>
                <div className='flex flex-row gap-9'>
                  <div>
                    <input type="checkbox" id="room1" name="room1" value="Room1" />
                    <label for="room1"> Room 1</label>
                  </div>
                  <div>
                    <input type="checkbox" id="room2" name="room2" value="Room2" />
                    <label for="room2"> Room 2</label>
                  </div>
                </div>
              </div>
              <div className='flex flex-row justify-between mt-10'>
                <NavLink to='/contextsetup'><button className='font-bold bg-violet-500 hover:bg-violet-600 transition ease-in text-white py-2 px-3 rounded-2xl'>Back</button></NavLink>
                <button className='font-bold bg-violet-500 hover:bg-violet-600 transition ease-in text-white py-2 px-3 rounded-2xl'>Next</button>
              </div>
            </div>
          </div>
          <div className='mr-9'>
            <h1 className='text-2xl font-bold'>List of scenes</h1>
            {(
              contextlist.map((scene) => (
                <NavLink
                  to={`/contextsetup/${scene.id}`}
                >
                  <div key={scene.id}
                    className='mt-5 grid grid-cols-4 gap-5 shadow-xl rounded-2xl p-3 hover:cursor-pointer hover:bg-gray-200 transition ease-in'
                  >
                    <div className='col-span-3'>
                      <h1 className='font-bold'>{scene.name}</h1>
                      <h2 className='text-gray-500 text-sm'>{scene.content}</h2>
                    </div>
                    <div>
                      <Switch
                        onChange={() => setToggleButton1(!scene.contextstate)}
                        checked={scene.contextstate}
                        onColor="#593EFF"
                        height={24}
                        width={48}
                        className="react-switch"
                      />
                    </div>
                  </div>
                </NavLink>

              ))
            )}
            <div>
              <button className='mt-5 border-dashed border-violet-500 border-2 rounded-2xl py-2 px-3 hover:bg-violet-100 transition ease-in leading-8'>Create new scene <AiOutlinePlus className='inline' /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContextInfo