import React from 'react';
import NavBar from '../components/NavBar';
import NotificationsBar from '../components/homepage/NotificationsBar';
import lighticon from '../images/lighticon2.png';
import yellowlighticon from '../images/yellowlighticon.png';
import redlighticon from '../images/redlighticon.png';
import bluelighticon from '../images/greenlighticon.png';
import shutdown from '../images/shutdown.png';
import arrow from '../images/straight-arrow.png';
import DeviceList from '../components/manualcontrol/DeviceList';
// import TimePicker from 'react-time-picker';

function ManualControl() {
    const [isRedLight, setisRedLight] = React.useState(true);
    const [isBlueLight, setisBlueLight] = React.useState(false);
    const [isYellowLight, setisYellowLight] = React.useState(false);
    const [isLightOn, setisLightOn] = React.useState(true);
    const [isSchedule, setisSchedule] = React.useState(false);
    // const [startTime, setstartTime] = React.useState('10:00');
    // const [endTime, setendTime] = React.useState('02:00');

    const handleRedLight = () => {
        setisRedLight(true);
        setisBlueLight(false);
        setisYellowLight(false);
    }
    const handleBlueLight = () => {
        setisRedLight(false);
        setisBlueLight(true);
        setisYellowLight(false);
    }
    const handleYellowLight = () => {
        setisRedLight(false);
        setisBlueLight(false);
        setisYellowLight(true);
    }
    const handleLightOn = () => {
        setisLightOn(!isLightOn);
    }
    const handleSchedule = () => {
        setisSchedule(!isSchedule);
    }
    // const handleChangeStartTime = (value) => {
    //     setstartTime(value);
    // }
    // const handleChangeEndTime = (value) => {
    //     setendTime(value);
    // }
    return (
        <div>
            <NavBar/>
            <div className='grid grid-cols-4 ml-28'>
                <div className='col-span-3 rounded-2xl grid grid-cols-3'>
                    <div className='col-span-2 grid grid-rows-5 h-screen p-10 shadow-2xl'>
                        <div className='row-span-3'>
                            <h1 className='text-3xl font-semibold'>Light</h1>
                            {
                                (isLightOn && isRedLight) ? (
                                    <div className='bg-red-100 w-64 h-64 mx-auto my-10 rounded-full grid grid-rows-2 gap-10'>
                                        <img src={lighticon} alt="light" className='w-2/5 mx-auto my-10 justify-between row-span-1'/> 
                                        <div className='row-span-1 text-center text-indigo-500 font-semibold'>
                                            <p>Light on</p>
                                            <p>Red</p>
                                        </div>
                                    </div>
                                ) : (
                                    isLightOn && isBlueLight ? (
                                        <div className='bg-blue-100 w-64 h-64 mx-auto my-10 rounded-full grid grid-rows-2 gap-10'>
                                            <img src={lighticon} alt="light" className='w-2/5 mx-auto my-10 justify-between row-span-1'/> 
                                            <div className='row-span-1 text-center text-indigo-500 font-semibold'>
                                                <p>Light on</p>
                                                <p>Blue</p>
                                            </div>
                                        </div>
                                    ) : 
                                    (
                                        isLightOn && isYellowLight ? (
                                            <div className='bg-yellow-100 w-64 h-64 mx-auto my-10 rounded-full grid grid-rows-2 gap-10'>
                                                <img src={lighticon} alt="light" className='w-2/5 mx-auto my-10 justify-between row-span-1'/> 
                                                <div className='row-span-1 text-center text-indigo-500 font-semibold'>
                                                    <p>Light on</p>
                                                    <p>Yellow</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='bg-gray-300 w-64 h-64 mx-auto my-10 rounded-full grid grid-rows-2 gap-10'>
                                                <img src={lighticon} alt="light" className='w-2/5 mx-auto my-10 justify-between row-span-1'/> 
                                                <div className='row-span-1 text-center text-black font-semibold'>
                                                    <p>Light off</p>
                                                </div>
                                            </div>
                                        )
                                    )
                                )
                            }
                        </div>
                        {
                            isSchedule ? (
                                <div className='row-span-1 border rounded-3xl px-8 py-5'>
                                    <div className='grid grid-rows-3'>
                                        <div className='row-span-1 grid grid-cols-2'>
                                            <p className='col-span-1 text-xl font-bold'>Schedule</p>
                                            <button className='w-20 pr-3 pl-2 mb-2 border border-red-500 rounded-lg col-span-1 justify-self-end' onClick={handleSchedule}><span className='text-red-500 font-bold text-mono'>DELETE</span></button>
                                        </div>
                                        <div className='row-span-2 grid grid-cols-4'>
                                            <div className='col-span-1 m-1'>
                                                <p className='text-sm font-bold text-gray-400'>Start time</p>
                                                <div className='border rounded-2xl text-center py-2'>
                                                <input type="startTime" className='w-24' defaultValue={"10:00 AM"}/>
                                                </div>
                                            </div>
                                            <div className='col-span-2'>
                                                <img src={arrow} alt="" className='pt-2 px-2'/>
                                            </div>
                                            <div className='col-span-1 m-1'>
                                                <p className='text-sm font-bold text-gray-400'>End time</p>
                                                <div className='border rounded-2xl text-center py-2'>
                                                    <input type="endTime" className='w-24' defaultValue={"10:00 AM"}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className='row-span-1 border rounded-3xl px-8 py-5'>
                                    <div className='grid grid-rows-3'>
                                        <div className='row-span-1 grid grid-cols-2'>
                                            <p className='col-span-1 text-xl font-bold'>Schedule</p>
                                            <button className='w-20 pr-3 pl-2 mb-2 border border-green-500 rounded-lg col-span-1 justify-self-end' onClick={handleSchedule}><span className='text-green-500 font-bold text-mono'>ADD</span></button>
                                        </div>
                                        <div className='row-span-2 grid grid-cols-4'>
                                            <div className='col-span-1 m-1'>
                                                <p className='text-sm font-bold text-gray-400'>Start time</p>
                                                <div className='border rounded-2xl text-center py-2'>
                                                    <input type="startTime" className='w-24' defaultValue={"10:00 AM"}/>
                                                </div>
                                            </div>
                                            <div className='col-span-2'>
                                                <img src={arrow} alt="" className='pt-2 px-2'/>
                                            </div>
                                            <div className='col-span-1 m-1'>
                                                <p className='text-sm font-bold text-gray-400'>End time</p>
                                                <div className='border rounded-2xl text-center py-2'>
                                                    <input type="endTime" className='w-24' defaultValue={"10:00 AM"}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        <div className='row-span-1 grid grid-cols-4'>
                            <div className='col-span-3 grid grid-cols-3 bg-purple-50 m-10 rounded-full'>
                                    {!isRedLight ? (
                                        <button className='rounded-full w-10 h-10 col-span-1 m-auto' onClick={handleRedLight}>
                                            <img src={redlighticon} alt="" className='m-auto'/>
                                        </button>
                                    ) : (
                                        <button className='w-14 h-14 bg-purple-200 col-span-1 m-auto rounded-full py-2' onClick={handleRedLight}>
                                            <div className='rounded-full w-10 h-10 m-auto border border-solid border-purple-300 bg-white'>
                                                <img src={redlighticon} alt="" className='m-auto'/>
                                            </div>
                                        </button>
                                    )}
                                    {!isYellowLight ? (
                                        <button className='rounded-full w-10 h-10 col-span-1 m-auto' onClick={handleYellowLight}>
                                            <img src={yellowlighticon} alt="" className='m-auto'/>
                                        </button>
                                    ) : (
                                        <button className='w-14 h-14 bg-purple-200 col-span-1 m-auto rounded-full py-2' onClick={handleYellowLight}>
                                            <div className='rounded-full w-10 h-10 m-auto border border-solid border-purple-300 bg-white'>
                                                <img src={yellowlighticon} alt="" className='m-auto'/>
                                            </div>
                                        </button>
                                    )}
                                    {!isBlueLight ? (
                                        <button className='rounded-full w-10 h-10 col-span-1 m-auto' onClick={handleBlueLight}>
                                            <img src={bluelighticon} alt="" className='m-auto'/>
                                        </button>
                                    ) : (
                                        <button className='w-14 h-14 bg-purple-200 col-span-1 m-auto rounded-full py-2' onClick={handleBlueLight}>
                                            <div className='rounded-full w-10 h-10 m-auto border border-solid border-purple-300 bg-white'>
                                                <img src={bluelighticon} alt="" className='m-auto'/>
                                            </div>
                                        </button>
                                    )}
                            </div>
                            <div className='col-span-1 py-10'>
                                <button className='w-16 h-16 m-auto bg-purple-50 rounded-full p-3 border' onClick={handleLightOn}>
                                    <img src={shutdown} alt="control" className='h-10 w-10 bg-purple-50 rounded-full m-auto'/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <DeviceList/>
                </div>
                <div className='col-span-1 mt-10 p-5'>
                    <NotificationsBar/>
                </div>
            </div>
        </div>
    );
}

export default ManualControl;