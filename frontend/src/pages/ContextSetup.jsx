import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import contextsetupicon from '../images/contextsetupicon.png'
import Switch from "react-switch";
import { AiOutlinePlus } from "react-icons/ai"
import RealtimeStatus from '../components/RealtimeStatus';
import listofscenes from '../mockdata/ListOfScenes';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { listOfContexts } from '../redux/actions/contextActions';

const ContextHomeScreen = () => {
    return (
        <div className='bg-violet-100 rounded-2xl p-5'>
        <Header />
        <div className='grid grid-cols-2 gap-9 mt-10 mb-10'>
          <div className='bg-white rounded-2xl p-5'>
            <h1 className='font-bold mb-5'>Tutorial</h1>
            <div className='text-gray-500'>
              <h2>2 steps:</h2>
              <ul>
                <li>Create input, condition</li>
                <li>Set up reaction</li>
              </ul>
            </div>
          </div>
          <div className='bg-white rounded-2xl p-5'>
            <h1 className='font-bold mb-5'>Next step</h1>
            <div className='text-gray-500'>
              <ul>
                <li>Choose a scene to modify on List of scences</li>
                <li>Create a new scene</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-9'>
          <div className='bg-white rounded-2xl grid grid-cols-4 p-5'>
            <div className='text-center mx-auto'>
              <img src={contextsetupicon} alt="contextsetupicon" />
            </div>
            <div className='col-span-3'>
              <h1 className='font-bold'>Name of your new scene</h1>
              <form>
                <div className='mt-5 mb-5'>
                  <input type="text" name="name" className='border-black border py-1 px-2 rounded-2xl' />
                </div>

                <button className='bg-violet-500 text-white py-2 px-5 font-bold rounded-2xl hover:bg-violet-600 transition ease-in '>Create</button>
              </form>
            </div>
          </div>
          <div className='bg-white rounded-2xl grid grid-cols-4 p-5'>
            <div className='text-center mx-auto'>
              <img src={contextsetupicon} alt="contextsetupicon" />
            </div>
            <div className='col-span-3'>
              <h1 className='font-bold'>Choose a scene to modify</h1>
              <form>
                <div className='mb-7 mt-5'>
                  <select>
                    <option value="scene1">Scene 1</option>
                    <option value="scene2">Scene 2</option>
                    <option value="scene3">Scene 3</option>
                  </select>
                </div>

                <button className='bg-violet-500 text-white py-2 px-5 font-bold rounded-2xl hover:bg-violet-600 transition ease-in '>Select</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}
export default function ContextSetup() {
    const [toggleButton1, setToggleButton1] = React.useState(false);
    const dispatch = useDispatch();
    const contextList = useSelector((state) => state.contextList);
    const { loading, error, contextlist } = contextList;
    useEffect(() => {
        dispatch(listOfContexts());
    }, [dispatch]);
    console.log(contextlist);
    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="ml-28 grid grid-cols-4 gap-9">
                <div className='mt-5 col-span-3'>
                    <ContextHomeScreen />
                </div>
                <div className='mt-5 mr-9'>
                    <h1 className='text-2xl font-bold'>List of scenes</h1>
                    {(
                        contextlist.map((scene) => (
                            <NavLink
                                to = {`/contextsetup/${scene.id}`}
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
                    <div>
                        <RealtimeStatus />
                    </div>
                </div>
            </div>
        </div>
    )
}
