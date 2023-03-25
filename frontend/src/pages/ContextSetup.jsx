import React from 'react'
import NavBar from '../components/NavBar'
import contextsetupicon from '../images/contextsetupicon.png'

import Header from '../components/Header';
import ContextSideBar from '../components/context/ContextSideBar';
import { NavLink } from 'react-router-dom';


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
            <div>
              <div className='mt-5 mb-5'>
                <input type="text" name="name" className='border-black border py-1 px-2 rounded-2xl' />
              </div>

              <NavLink to='/contextsetup/createnew'><button className='bg-violet-500 text-white py-2 px-5 font-bold rounded-2xl hover:bg-violet-600 transition ease-in '>Create</button></NavLink>
            </div>
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
  
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="ml-28 grid grid-cols-4 gap-9">
        <div className='mt-5 col-span-3'>
          <ContextHomeScreen />
        </div>
        <ContextSideBar />
      </div>
    </div>
  )
}
