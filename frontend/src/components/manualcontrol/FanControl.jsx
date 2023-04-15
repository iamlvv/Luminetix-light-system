import React from 'react';
import shutdown from '../../images/shutdown.png';
import arrow from '../../images/straight-arrow.png';
import fanicon from "../../images/Fan.png"
import { useEffect } from 'react';
import client from '../../mqtt/mqtt';
import Slider from "@mui/material/Slider";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getFanStatFirst } from '../../redux/actions/deviceActions';
const getFanStat = async(handleget) => {
    const { data } = await axios.get("https://io.adafruit.com/api/v2/Tori0802/feeds/w-fan/data");
    const { value } = data[0];
    handleget(value);
}
function LightControl() {
    const [device, setDevice] = React.useState([]);
    const [isFanOn, setisFanOn] = React.useState(true);

    const dispatch = useDispatch();
    const FanStatFirst = useSelector((state) => state.fanStatFirst)
    
    const { fanStatFirst } = FanStatFirst;

    const [fanStat, setFanStat] = React.useState(null);


    const fetchDevice = async () => {
        try {
            const fan_res = await axios.get("http://localhost:5000/api/devices/fan");
            const device = [...fan_res.data.fans]
            setDevice(device[0]);
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        fetchDevice();
        getFanStat(setFanStat);
        dispatch(getFanStatFirst())
    }, []);

    console.log(fanStat, fanStatFirst)
    useEffect(() => {
        client.on("message", (topic, message) => {
            if (topic === "Tori0802/feeds/w-fan") {
                console.log("Fan Stat", parseInt(message.toString()));
                if (message.toString() === "0") {
                    setisFanOn(false);
                    setFanStat(0);
                } else {
                    setisFanOn(true);
                    setFanStat(parseInt(message.toString()));
                }
            } else {
                console.log("topic not w-fan");
            }
        });
    });

    const handleFanOn = () => {
        if (!isFanOn) {
            if (client) {
                client.publish(
                    "Tori0802/feeds/w-fan",
                    JSON.stringify({ value: 100 })
                );
            }
            setFanStat(100);
            setisFanOn(true);
        }
        else {
            if (client) {
                client.publish(
                    "Tori0802/feeds/w-fan",
                    JSON.stringify({ value: 0 })
                );
            }
            setFanStat(0);
            setisFanOn(false);
        }
    }

    const [isSchedule, setisSchedule] = React.useState(false);
    const handleSchedule = () => {
        setisSchedule(!isSchedule);
    }

    const handleFanOnChange = (e) => {
        setFanStat(parseInt(e.target.value));

    }
    const handleFanOnChangeCommitted = (e) => {
        if (client) {
            client.publish(
                "Tori0802/feeds/w-fan",
                JSON.stringify({ value: fanStat })
            );
        }
    }
    return (
        <div className='col-span-2 grid grid-rows-5 p-10 '>
            <div className='row-span-3'>
                <h1 className='text-3xl font-semibold'>Fan</h1>
                {

                    isFanOn ? (
                        <div className='bg-white w-64 h-64 mx-auto my-10 rounded-full border border-gray-300 grid grid-rows-2 gap-10'>
                            <img src={fanicon} alt="light" className='w-2/5 mx-auto my-10 justify-between row-span-1' />
                            <div className='row-span-1 text-center text-gray-900 font-semibold'>
                                <p>Fan on</p>
                            </div>
                        </div>
                    ) : (
                        <div className='bg-gray-300 w-64 h-64 mx-auto my-10 rounded-full grid grid-rows-2 gap-10'>
                            <img src={fanicon} alt="light" className='w-2/5 mx-auto my-10 justify-between row-span-1' />
                            <div className='row-span-1 text-center text-gray-900 font-semibold'>
                                <p>Fan off</p>
                            </div>
                        </div>
                    )
                }
            </div>
            {/* Schedule */}
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
                                        <input type="startTime" className='w-24' defaultValue={"10:00 AM"} />
                                    </div>
                                </div>
                                <div className='col-span-2'>
                                    <img src={arrow} alt="" className='pt-2 px-2' />
                                </div>
                                <div className='col-span-1 m-1'>
                                    <p className='text-sm font-bold text-gray-400'>End time</p>
                                    <div className='border rounded-2xl text-center py-2'>
                                        <input type="endTime" className='w-24' defaultValue={"10:00 AM"} />
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
                                        <input type="startTime" className='w-24' defaultValue={"10:00 AM"} />
                                    </div>
                                </div>
                                <div className='col-span-2'>
                                    <img src={arrow} alt="" className='pt-2 px-2' />
                                </div>
                                <div className='col-span-1 m-1'>
                                    <p className='text-sm font-bold text-gray-400'>End time</p>
                                    <div className='border rounded-2xl text-center py-2'>
                                        <input type="endTime" className='w-24' defaultValue={"10:00 AM"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* Control button */}
            <div className='row-span-1 grid grid-cols-4'>
                <div className='col-span-3 bg-purple-50 m-10 rounded-full p-3'>
                    <Slider
                        defaultValue={device.value}
                        value={fanStat === null ? fanStatFirst : fanStat}
                        onChange={handleFanOnChange}
                        onChangeCommitted={handleFanOnChangeCommitted}
                        valueLabelDisplay='on'
                        step={10}
                        min={0}
                        max={100}
                        className="w-3/4 mt-2 slider"
                    />
                </div>
                <div className='col-span-1 py-10'>
                    <button className='w-16 h-16 m-auto bg-purple-50 rounded-full p-3 border' onClick={handleFanOn}>
                        <img src={shutdown} alt="control" className='h-10 w-10 bg-purple-50 rounded-full m-auto' />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LightControl;