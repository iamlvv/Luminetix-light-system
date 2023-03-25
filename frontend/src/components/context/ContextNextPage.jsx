import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom';
import { contextDetail } from '../../redux/actions/contextActions'
import NavBar from '../NavBar';
import ContextSideBar from './ContextSideBar';
import Switch from "react-switch";
import lighticon2 from '../../images/lighticon2.png'
import fanicon2 from '../../images/fanicon2.png'


function ContextNextPage() {
    const dispatch = useDispatch();
    const contextdetail = useSelector(state => state.contextDetail);
    const { loading, error, context } = contextdetail;
    const { id } = useParams();
    useEffect(() => {
        dispatch(contextDetail(Number(id)));
    }, [dispatch, id])

    return (
        <div>
            <NavBar />
            <div className='ml-28 grid grid-cols-4 gap-9'>
                <div className='bg-violet-100 col-span-3 mt-5 rounded-2xl p-5'>
                    <h1 className='font-bold text-2xl'>{context.name}</h1>
                    <div>
                        {/* Progress Bar */}
                    </div>
                    <h1 className='font-bold text-2xl mt-10 mb-2'>Then...</h1>
                    <h2 className='text-gray-500 mb-5'>Choose what you want to happen</h2>
                    <div >
                        <h1 className='font-bold'>Control devices</h1>
                        <div className='grid grid-cols-3 gap-9 text-center mt-5'>
                            <div className='bg-white shadow-sm rounded-2xl p-5'>
                                <div className='grid grid-cols-2'>
                                    <div><img src={lighticon2} alt='light' className='mx-auto' /></div>
                                    <Switch
                                        //onChange={() => setToggleButton1(!toggleButton1)}
                                        checked={context.lightstate}
                                        onColor="#593EFF"
                                        height={24}
                                        width={48}
                                        className="react-switch"
                                    />
                                </div>
                                <h1 className='font-bold'>Light</h1>
                                <div>
                                    <select>
                                        <option>{context.lightcolor}</option>
                                        <option>Red</option>
                                        <option>Blue</option>
                                    </select>
                                </div>
                            </div>

                            <div className='bg-white shadow-sm rounded-2xl p-5'>
                                <div className='grid grid-cols-2'>
                                    <div><img src={fanicon2} alt='light' className='mx-auto' /></div>
                                    <Switch
                                        //onChange={() => setToggleButton1(!toggleButton1)}
                                        checked={context.fanstate}
                                        onColor="#593EFF"
                                        height={24}
                                        width={48}
                                        className="react-switch"
                                    />
                                </div>
                                <h1 className='font-bold'>Light</h1>
                                <div>
                                    <select>
                                        <option>{context.fanlevel}</option>
                                        <option>Red</option>
                                        <option>Blue</option>
                                    </select>
                                </div>
                            </div>
                            <div className='bg-white shadow-sm rounded-2xl p-5'>
                                <h1 className='font-bold mb-10'>Turn off the whole system</h1>
                                <Switch
                                    //onChange={() => setToggleButton1(!toggleButton1)}
                                    checked={false}
                                    onColor="#593EFF"
                                    height={24}
                                    width={48}
                                    className="react-switch"
                                />
                            </div>
                        </div>

                    </div>
                    <div className='mt-10'>
                        <h1 className='font-bold'>Notifications</h1>
                        <div className='grid grid-cols-2 gap-20 ml-20 mr-20 mt-5'>
                            <div className='p-10 bg-white rounded-2xl shadow-sm'>
                                <h1 className='font-bold'>Messages</h1>
                                <div className='mt-5'>
                                    <input type='text' placeholder='Enter your message' className='border rounded-xl p-3 mb-5' />
                                </div>
                                <h1 className='font-bold'>Email</h1>
                                <div className='mt-5'>
                                    <input type='text' placeholder='Enter your email' className='border rounded-xl p-3 mb-5' />
                                </div>
                            </div>
                            <div className='p-10 bg-white rounded-2xl shadow-sm'>
                                <h1 className='font-bold mb-10'>Include information</h1>
                                <div className='flex flex-col gap-9'>
                                    <div>
                                        <input type='checkbox' />
                                        <label>Fan status</label>
                                    </div>
                                    <div>
                                        <input type='checkbox' />
                                        <label>Light status</label>
                                    </div>
                                    <div>
                                        <input type='checkbox' />
                                        <label>Date and time</label>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='text-right mt-5'>
                            <NavLink to={`/contextsetup/${context.id}/3`}><button className='bg-violet-500 text-white font-bold rounded-2xl p-3 hover:bg-violet-600 transition ease-in'>Next</button></NavLink>
                        </div>
                    </div>
                </div>
                <ContextSideBar />
            </div>
        </div>
    )
}

export default ContextNextPage