import React from 'react'
import { NavLink } from 'react-router-dom'
import NavBar from '../NavBar'
import ContextSideBar from './ContextSideBar'
import Switch from 'react-switch';
import lighticon2 from '../../images/lighticon2.png'
import fanicon2 from '../../images/fanicon1.jpg'
// import fanicon2 from '../../images/fanicon2.png'
function ContextNextPageCreate() {
    const [toggleButton1, setToggleButton1] = React.useState(false);
    const [toggleButton2, setToggleButton2] = React.useState(false);
    const [toggleButton3, setToggleButton3] = React.useState(false);
    return (
        <div>
            <NavBar />
            <div className='ml-28 grid grid-cols-4 gap-9'>
                <div className='bg-violet-100 col-span-3 mt-5 rounded-xl p-5'>
                    <div className='border bg-white p-5 rounded-xl'>
                        <h1 className='font-bold text-2xl'>Context Name</h1>
                        <p className='text-sm text-gray-500 my-2'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat dolor, cumque enim voluptas unde asperiores illum labore culpa sequi corporis eaque similique, laudantium doloremque, soluta molestias error deleniti consectetur ea.</p>
                    </div>
                    <div>
                    {/* Progress Bar */}
                    </div>
                        <h1 className='font-bold text-2xl mt-5 mb-2'>Then...</h1>
                        <h2 className='text-gray-500 mb-5'>Choose what you want to happen with your devices.</h2>
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
                                        onChange={() => setToggleButton1(!toggleButton1)}
                                        checked={toggleButton1}
                                        onColor="#593EFF"
                                        height={24}
                                        width={48}
                                        className="react-switch my-auto ml-auto"
                                    />
                                </div>
                                <div className='grid grid-cols-2 row-span-1'>
                                    <h1 className='font-bold col-span-1 m-auto'>Light</h1>
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
                                        onChange={() => setToggleButton2(!toggleButton2)}
                                        checked={toggleButton2}
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
                                    onChange={() => setToggleButton3(!toggleButton3)}
                                    checked={toggleButton3}
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
                                        <input type='checkbox' className='mr-3 mb-4'/>
                                        <label>Fan status</label>
                                    </div>
                                    <div>
                                        <input type='checkbox' className='mr-3 mb-4'/>
                                        <label>Light status</label>
                                    </div>
                                    <div>
                                        <input type='checkbox' className='mr-3 mb-4'/>
                                        <label>Date and time</label>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='text-right mt-5'>
                            <NavLink to={`/contextsetup/createnew/3`}><button className='bg-violet-500 text-white font-bold rounded-lg p-2 px-5 hover:bg-violet-600 transition ease-in'>Next</button></NavLink>
                        </div>
                    </div>
                </div>
                <ContextSideBar />
            </div>
        </div>
    )
}

export default ContextNextPageCreate