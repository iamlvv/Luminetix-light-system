import React, { useEffect } from "react";
import lighticon from "../../images/lighticon2.png";
import yellowlighticon from "../../images/yellowlighticon.png";
import redlighticon from "../../images/redlighticon.png";
import bluelighticon from "../../images/greenlighticon.png";
import shutdown from "../../images/shutdown.png";
import arrow from "../../images/straight-arrow.png";
import client from "../../mqtt/mqtt";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getLedStateFirst } from "../../redux/actions/deviceActions";
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Swal from 'sweetalert2';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useSelector } from "react-redux";
const url = process.env.REACT_APP_API_URL;

// Nhận data qua database/AIO để render lần đầu tiên
const getLedState = async (setisBlueLight, setisYellowLight, setisRedLight, setisLightOn) => {
    const { data } = await axios.get("https://io.adafruit.com/api/v2/Tori0802/feeds/w-led/data")
    const { value } = data[0];

    if (value === "#000000") {
        setisLightOn(false);
        setisRedLight(false);
        setisBlueLight(false);
        setisYellowLight(false);
    }
    else if (value === "#ff0000") {
        setisLightOn(true);
        setisRedLight(true);
        setisBlueLight(false);
        setisYellowLight(false);
    }
    else if (value === "#ffff00") {
        setisLightOn(true);
        setisRedLight(false);
        setisBlueLight(false);
        setisYellowLight(true);
    }
    else if (value === "#0000ff") {
        setisLightOn(true);
        setisRedLight(false);
        setisBlueLight(true);
        setisYellowLight(false);
    }
}

function LightControl() {
    const [isRedLight, setisRedLight] = React.useState(true);
    const [isBlueLight, setisBlueLight] = React.useState(false);
    const [isYellowLight, setisYellowLight] = React.useState(false);
    const [isLightOn, setisLightOn] = React.useState(true);
    const [starttime, setStartTime] = React.useState("");
    const [endtime, setEndTime] = React.useState("");
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();

    // Nhận data qua mqtt và re-render Led State trên UI
    useEffect(() => {
        client.on("message", (topic, message) => {
            if (topic === "Tori0802/feeds/w-led") {
                console.log("Led Stat: ", message.toString());
                if (message.toString() === "#000000") {
                    setisLightOn(false);
                } else {
                    setisLightOn(true);
                    if (message.toString() === "#ff0000") {
                        setisRedLight(true);
                        setisBlueLight(false);
                        setisYellowLight(false);
                    } else if (message.toString() === "#ffff00") {
                        setisRedLight(false);
                        setisBlueLight(false);
                        setisYellowLight(true);
                    } else if (message.toString() === "#0000ff") {
                        setisRedLight(false);
                        setisBlueLight(true);
                        setisYellowLight(false);
                    }
                }
            } else {
                console.log("topic not w-led");
            }
        });
    });

    useEffect(() => {
        getLedState(setisBlueLight, setisYellowLight, setisRedLight, setisLightOn);
        dispatch(getLedStateFirst());
    }, []);

    // Gửi data qua mqtt và update Led State trên UI
    const handleRedLight = () => {
        if (client) {
            client.publish(
                "Tori0802/feeds/w-led",
                JSON.stringify({ value: "#ff0000" })
            );
        }
        setisRedLight(true);
        setisBlueLight(false);
        setisYellowLight(false);
    };
    const handleBlueLight = () => {
        if (client) {
            client.publish(
                "Tori0802/feeds/w-led",
                JSON.stringify({ value: "#0000ff" })
            );
        }
        setisRedLight(false);
        setisBlueLight(true);
        setisYellowLight(false);
    };
    const handleYellowLight = () => {
        if (client) {
            client.publish(
                "Tori0802/feeds/w-led",
                JSON.stringify({ value: "#ffff00" })
            );
        }
        setisRedLight(false);
        setisBlueLight(false);
        setisYellowLight(true);
    };
    // Lưu giữ state của đèn khi tắt và bật
    const handleLightState = () => {
        if (!isLightOn && isRedLight) {
            if (client) {
                client.publish(
                    "Tori0802/feeds/w-led",
                    JSON.stringify({ value: "#ff0000" })
                );
            }
        }
        else if (!isLightOn && isBlueLight) {
            if (client) {
                client.publish(
                    "Tori0802/feeds/w-led",
                    JSON.stringify({ value: "#0000ff" })
                );
            }
        }
        else if (!isLightOn && isYellowLight) {
            if (client) {
                client.publish(
                    "Tori0802/feeds/w-led",
                    JSON.stringify({ value: "#ffff00" })
                );
            }
        }
        else {
            if (client) {
                client.publish(
                    "Tori0802/feeds/w-led",
                    JSON.stringify({ value: "#000000" })
                );
            }
        }
        setisLightOn(!isLightOn);
    };
    const handleSchedule = () => {
        if (starttime === "" || endtime === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please check time range',
            })
            return;
        }
        var name = "LED Scheduling";
        var description = "";
        var output = {
            active_time: {
                start_time: starttime,
                end_time: endtime
            },
            control_fan: [
                {
                    name: "Fan",
                    value: 0,
                    status: false
                }
            ],
            control_led: [
                {
                    name: "LED",
                    value: isBlueLight ? "#0000ff" : isYellowLight ? "#ffff00" : "#ff0000",
                    status: isLightOn
                }
            ]
        }
        fetch(`${url}/contexts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
            body: JSON.stringify({
                name, description, output
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log("Success", data)
            }
            )
            .catch((error) => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
            );

    };
    return (
        <div className="col-span-2 flex flex-col p-10 h-screen">
            <div className="row-span-4">
                <h1 className="text-3xl font-semibold">Light</h1>
                {isLightOn && isRedLight ? (
                    <div className="bg-red-100 w-64 h-64 mx-auto my-10 rounded-full grid grid-rows-2 gap-10">
                        <img
                            src={lighticon}
                            alt="light"
                            className="w-2/5 mx-auto my-10 justify-between row-span-1"
                        />
                        <div className="row-span-1 text-center text-indigo-500 font-semibold">
                            <p>Light on</p>
                            <p>Red</p>
                        </div>
                    </div>
                ) : isLightOn && isBlueLight ? (
                    <div className="bg-blue-100 w-64 h-64 mx-auto my-10 rounded-full grid grid-rows-2 gap-10">
                        <img
                            src={lighticon}
                            alt="light"
                            className="w-2/5 mx-auto my-10 justify-between row-span-1"
                        />
                        <div className="row-span-1 text-center text-indigo-500 font-semibold">
                            <p>Light on</p>
                            <p>Blue</p>
                        </div>
                    </div>
                ) : isLightOn && isYellowLight ? (
                    <div className="bg-yellow-100 w-64 h-64 mx-auto my-10 rounded-full grid grid-rows-2 gap-10">
                        <img
                            src={lighticon}
                            alt="light"
                            className="w-2/5 mx-auto my-10 justify-between row-span-1"
                        />
                        <div className="row-span-1 text-center text-indigo-500 font-semibold">
                            <p>Light on</p>
                            <p>Yellow</p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-300 w-64 h-64 mx-auto my-10 rounded-full grid grid-rows-2 gap-10">
                        <img
                            src={lighticon}
                            alt="light"
                            className="w-2/5 mx-auto my-10 justify-between row-span-1"
                        />
                        <div className="row-span-1 text-center text-black font-semibold">
                            <p>Light off</p>
                        </div>
                    </div>
                )}
            </div>
            {/* Schedule */}
            <div className="row-span-2 border rounded-3xl px-8 py-5">
                <div className="grid grid-rows-3">
                    <div className="row-span-1 grid grid-cols-2">
                        <p className="col-span-1 text-xl font-bold">Schedule</p>
                        <button
                            className="w-20 pr-3 pl-2 mb-2 border border-red-500 rounded-lg col-span-1 justify-self-end"
                            onClick={handleSchedule}
                        >
                            <span className="text-red-500 font-bold text-mono">
                                ADD
                            </span>
                        </button>
                    </div>
                    <div className="row-span-2 grid grid-cols-2">
                        <div className="col-span-1 m-1">
                            <p className="text-sm font-bold text-gray-400">
                                Start time
                            </p>
                            <div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker
                                        label="Start time"
                                        value={starttime || null}
                                        ampm={false}
                                        defaultValue={starttime}
                                        className='block'
                                        onChange={(newValue) => setStartTime(dayjs(newValue).format('HH:mm'))}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            </div>
                        </div>
                        <div className="col-span-1 m-1">
                            <p className="text-sm font-bold text-gray-400">
                                End time
                            </p>
                            <div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker
                                        label="End time"
                                        value={endtime || null}
                                        ampm={false}
                                        defaultValue={endtime}
                                        className='block'
                                        onChange={(newValue) => setEndTime(dayjs(newValue).format('HH:mm'))}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Control button */}
            <div className="row-span-1 grid grid-cols-4">
                <div className="col-span-3 grid grid-cols-3 bg-purple-50 m-10 rounded-full">
                    {!isRedLight ? (
                        <button
                            className="rounded-full w-10 h-10 col-span-1 m-auto"
                            onClick={handleRedLight}
                        >
                            <img src={redlighticon} alt="" className="m-auto" />
                        </button>
                    ) : (
                        <button
                            className="w-14 h-14 bg-purple-200 col-span-1 m-auto rounded-full py-2"
                            onClick={handleRedLight}
                        >
                            <div className="rounded-full w-10 h-10 m-auto border border-solid border-purple-300 bg-white">
                                <img src={redlighticon} alt="" className="m-auto" />
                            </div>
                        </button>
                    )}
                    {!isYellowLight ? (
                        <button
                            className="rounded-full w-10 h-10 col-span-1 m-auto"
                            onClick={handleYellowLight}
                        >
                            <img src={yellowlighticon} alt="" className="m-auto" />
                        </button>
                    ) : (
                        <button
                            className="w-14 h-14 bg-purple-200 col-span-1 m-auto rounded-full py-2"
                            onClick={handleYellowLight}
                        >
                            <div className="rounded-full w-10 h-10 m-auto border border-solid border-purple-300 bg-white">
                                <img src={yellowlighticon} alt="" className="m-auto" />
                            </div>
                        </button>
                    )}
                    {!isBlueLight ? (
                        <button
                            className="rounded-full w-10 h-10 col-span-1 m-auto"
                            onClick={handleBlueLight}
                        >
                            <img src={bluelighticon} alt="" className="m-auto" />
                        </button>
                    ) : (
                        <button
                            className="w-14 h-14 bg-purple-200 col-span-1 m-auto rounded-full py-2"
                            onClick={handleBlueLight}
                        >
                            <div className="rounded-full w-10 h-10 m-auto border border-solid border-purple-300 bg-white">
                                <img src={bluelighticon} alt="" className="m-auto" />
                            </div>
                        </button>
                    )}
                </div>
                <div className="col-span-1 py-10">
                    <button
                        className="w-16 h-16 m-auto bg-purple-50 rounded-full p-3 border"
                        onClick={handleLightState}
                    >
                        <img
                            src={shutdown}
                            alt="control"
                            className="h-10 w-10 bg-purple-50 rounded-full m-auto"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LightControl;