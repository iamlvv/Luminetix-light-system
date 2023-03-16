import React from 'react'
import { NavLink } from 'react-router-dom'
import footerlogin from '../images/footer-login.png'
export default function Signup() {
  return (
    <div>
        <form className='w-80 mx-auto mt-24 text-center mb-6'>
            <h1 className='text-6xl text-violet-500 font-bold '>
                Welcome
            </h1>
            <h2 className='mt-5 mb-5'>
                to our system
            </h2>
            <div>
                <div>
                    <input type="text" placeholder="Full name" className='py-2 px-3 rounded-xl w-80 bg-gray-200 shadow-lg'/>
                </div>
                <div className='mt-5'>
                    <input type="text" placeholder="Phone number" className='py-2 px-3 rounded-xl w-80 bg-gray-200 shadow-lg'/>
                </div>
                <div className='mt-5'>
                    <input type="text" placeholder="Username" className='py-2 px-3 rounded-xl w-80 bg-gray-200 shadow-lg'/>
                </div>
                <div className='mt-5'>
                    <input type="text" placeholder="Email" className='py-2 px-3 rounded-xl w-80 bg-gray-200 shadow-lg'/>
                </div>
                <div className='mt-5 mb-5'>
                    <input type="password" placeholder="Password" className='py-2 px-3 rounded-xl w-80 bg-gray-200 shadow-lg'/>
                </div>
                <div>
                    <button type="submit" className='py-2 px-3 bg-violet-500 rounded-2xl text-white hover:bg-violet-600 transition ease-in font-bold w-80'>Sign up</button>
                </div>
                <div className='flex flex-row justify-between ml-10 mr-10'>
                    <div>
                        Already have an account?
                    </div>
                    <NavLink to='/login'>
                    <div className='font-bold'>
                        Log in
                    </div>
                    </NavLink>
                    
                </div>
            </div>
        </form>
        <div>
            <img src={footerlogin} alt="footerlogin" className='w-full'/>
        </div>
    </div>
  )
}
