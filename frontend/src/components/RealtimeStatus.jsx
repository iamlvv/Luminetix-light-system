import React, { useEffect } from 'react'
import Clock from "react-live-clock";
import viewicon from "../images/viewicon.png";
import lighticon from "../images/lighticon.png";
import humidityicon from "../images/humidityicon.png";
import temperatureicon from "../images/temperatureicon.png";
import { useDispatch, useSelector } from "react-redux";
import { getHumanFoundState, getHumidityStat, getLightStat, getTemperatureStat } from '../redux/actions/deviceActions';
export default function RealtimeStatus() {
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
    const dispatch = useDispatch();
    //get data from sensors through redux
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
    return (
        <div>
            <h1 className="text-center mt-10 font-bold text-2xl text-violet-500">
                Current
            </h1>
            <div className="text-gray-500 mt-10 leading-5 flex flex-col mr-9">
                <div className="grid grid-cols-5 justify-between mb-5">
                    <div className="mx-auto">
                        <img src={temperatureicon} alt="tempicon" />
                    </div>
                    <div className="col-span-3">
                        <Clock format={"HH:mm"} ticking={true} />
                        <h1>{today}</h1>
                    </div>
                    <div>
                        <h1 className="text-2xl text-red-500 font-bold italic">{temperatureStat}</h1>
                    </div>
                </div>
                <div className="grid grid-cols-5 justify-between mb-5">
                    <div className="mx-auto">
                        <img src={humidityicon} alt="humidicon" />
                    </div>
                    <div className="col-span-3">
                        <Clock format={"HH:mm"} ticking={true} />
                        <h1>{today}</h1>
                    </div>
                    <div>
                        <h1 className="text-2xl text-blue-500 font-bold italic">{humidityStat}%</h1>
                    </div>
                </div>
                <div className="grid grid-cols-5 justify-between mb-5">
                    <div className="mx-auto">
                        <img src={lighticon} alt="lighticon" />
                    </div>
                    <div className="col-span-3">
                        <Clock format={"HH:mm"} ticking={true} />
                        <h1>{today}</h1>
                    </div>
                    <div>
                        <h1 className="text-2xl text-yellow-500 font-bold italic">{lightStat}%</h1>
                    </div>
                </div>
                <div className="grid grid-cols-5 justify-between mb-5">
                    <div className="mx-auto">
                        <img src={viewicon} alt="viewicon" />
                    </div>
                    <div className="col-span-3">
                        <Clock format={"HH:mm"} ticking={true} />
                        <h1>{today}</h1>
                    </div>
                    <div>
                        <h1 className="text-2xl text-violet-500 font-bold italic">{humanFoundState === "0" ? "No" : "Yes"}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
