import React, { useEffect, useState } from 'react'
import Clock from "react-live-clock";

import avatar from "../../images/avatardefault1.png";
import viewicon from "../../images/viewicon.png";
import lighticon from "../../images/lighticon.png";
import humidityicon from "../../images/humidityicon.png";
import temperatureicon from "../../images/temperatureicon.png";

import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from "../../redux/actions/userActions";
import clockicon from "../../images/clock.png";

import { getHumanFoundState, getHumidityStat, getLightStat, getTemperatureStat } from '../../redux/actions/deviceActions';

export default function Header() {
    const [name, setName] = React.useState("");
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const userDetails = useSelector((state) => state.userDetails);
    const { user } = userDetails;
    const dispatch2 = useDispatch();

    useEffect(() => {
        if (userInfo) {
            dispatch(getUserDetails("profile"));
        }
    }, [userInfo, dispatch]);
    useEffect(() => {
        if (user) {
            setName(user.fullname);
        }
    }, [dispatch2, user]);

    const TempStat = useSelector((state) => state.temperatureStat);
    const HumidStat = useSelector((state) => state.humidityStat);
    const LightStat = useSelector((state) => state.lightStat);
    const HumanFoundStat = useSelector((state) => state.humanDetectionState);

    const { temperatureStat } = TempStat;
    const { humidityStat } = HumidStat;
    const { lightStat } = LightStat;
    const { humanFoundState } = HumanFoundStat;

    useEffect(() => {

        dispatch(getTemperatureStat());
        dispatch(getHumidityStat());
        dispatch(getLightStat());
        dispatch(getHumanFoundState())

    }, []);
    useEffect(() => {
        setInterval(() => {
            dispatch(getTemperatureStat());
            dispatch(getHumidityStat());
            dispatch(getLightStat());
            dispatch(getHumanFoundState())
        }, 20000);
    }, [dispatch]);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    switch (mm) {
        case "01":
            mm = "Jan";
            break;
        case "02":
            mm = "Feb";
            break;
        case "03":
            mm = "Mar";
            break;
        case "04":
            mm = "Apr";
            break;
        case "05":
            mm = "May";
            break;
        case "06":
            mm = "Jun";
            break;
        case "07":
            mm = "Jul";
            break;
        case "08":
            mm = "Aug";
            break;
        case "09":
            mm = "Sep";
            break;
        case "10":
            mm = "Oct";
            break;
        case "11":
            mm = "Nov";
            break;
        case "12":
            mm = "Dec";
            break;
        default:
            mm = "Jan";
    }
    today = mm + ", " + dd + ", " + yyyy;
    return (
        <div className="grid grid-cols-3 gap-9">
            <div className="grid grid-cols-2 bg-white rounded-2xl shadow-sm">
                <img src={avatar} alt="avatar" className="w-1/2 mx-auto my-auto h-auto" />
                <h1 className="my-auto text-2xl font-bold">Hello, {name}!</h1>
            </div>

            <div className='grid grid-cols-4 bg-white rounded-xl p-2'>
                <div className="col-span-1 grid grid-cols-1 justify-between">
                    <div className="m-auto">
                        <img src={temperatureicon} alt="tempicon" className='w-8 p-1'/>
                    </div>
                    <div className='mx-auto'>
                        <h1 className="text-md text-red-500 font-bold">{temperatureStat}°C</h1>
                    </div>
                </div>

                <div className="col-span-1 grid grid-cols-1 justify-between">
                    <div className="m-auto">
                        <img src={humidityicon} alt="humidicon" className='w-8 p-1'/>
                    </div>
                    <div className='mx-auto'>
                        <h1 className="text-md text-blue-500 font-bold">{humidityStat}%</h1>
                    </div>
                </div>

                <div className="col-span-1 grid grid-cols-1 justify-between">
                    <div className="m-auto">
                        <img src={lighticon} alt="lighticon" className='w-8 p-1'/>
                    </div>
                    <div className='mx-auto'>
                        <h1 className="text-md text-yellow-500 font-bold mx-auto">{lightStat}%</h1>
                    </div>
                </div>

                <div className="col-span-1 grid grid-cols-1 justify-between">
                    <div className="m-auto">
                        <img src={viewicon} alt="viewicon" className='w-8'/>
                    </div>
                    <div className='mx-auto'>
                        <h1 className="text-md text-violet-500 font-bold">{humanFoundState === "0" ? "No" : "Yes"}</h1>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm grid grid-cols-2 px-3 py-5">
                <img src={clockicon} alt="clockicon" className="w-1/2 mx-auto my-auto h-auto col-span-1" />
                <div className="grid grid-cols-1 text-violet-700 font-bold">
                    <div className="text-2xl row-span-1 ">
                        <Clock format={"HH:mm:ss"} ticking={true} />
                    </div>
                    <h1 className="text-sm">{today}</h1>
                </div>
            </div>
        </div>
    )
}
