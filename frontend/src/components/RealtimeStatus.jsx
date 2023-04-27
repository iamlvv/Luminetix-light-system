import React, { useEffect } from 'react'
import Clock from "react-live-clock";
import viewicon from "../images/viewicon.png";
import lighticon from "../images/lighticon.png";
import humidityicon from "../images/humidityicon.png";
import temperatureicon from "../images/temperatureicon.png";
import { useDispatch, useSelector } from "react-redux";
import { getHumanFoundState, getHumidityStatFirst, getLightStatFirst, getTemperatureStatFirst } from '../redux/actions/deviceActions';
import client from '../../mqtt/mqtt';

const getHumidityStatistics = (handleget) => {
    client.subscribe("Tori0802/feeds/w-humi");
    client.on("message", function (topic, message) {
        if (topic === "Tori0802/feeds/w-humi") {
            const value = JSON.parse(message.toString());
            handleget(value);
        }
    });
}
const getTemperatureStatistics = (handleget) => {
    client.subscribe("Tori0802/feeds/w-temp");
    client.on("message", function (topic, message) {
        if (topic === "Tori0802/feeds/w-temp") {
            const value = JSON.parse(message.toString());
            handleget(value);
        }
    });
}
const getLightStatistics = (handleget) => {
    client.subscribe("Tori0802/feeds/w-light");
    client.on("message", function (topic, message) {
        if (topic === "Tori0802/feeds/w-light") {
            const value = JSON.parse(message.toString());
            handleget(value);
        }
    });
}
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
    const HumanFoundStat = useSelector((state) => state.humanDetectionState);

    const { humanFoundState } = HumanFoundStat;
    const TempStatFirst = useSelector((state) => state.temperatureStatFirst);
    const HumidStatFirst = useSelector((state) => state.humidityStatFirst);
    const LightStatFirst = useSelector((state) => state.lightStatFirst);

    const { temperatureStatFirst } = TempStatFirst;
    const { humidityStatFirst } = HumidStatFirst;
    const { lightStatFirst } = LightStatFirst;

    const [lStat, setLStat] = React.useState(lightStatFirst);
  const [tStat, setTStat] = React.useState(temperatureStatFirst);
  const [hStat, setHStat] = React.useState(humidityStatFirst);
    useEffect(() => {

    dispatch(getTemperatureStatFirst());
    dispatch(getHumidityStatFirst());
    dispatch(getLightStatFirst());
    // Get Stat and State using MQTT
    getHumidityStatistics(setHStat);
    getTemperatureStatistics(setTStat);
    getLightStatistics(setLStat);
    dispatch(getHumanFoundState())
    }, []);

    return (
        <div>
            <h1 className="text-center mt-10 font-bold text-2xl text-violet-500">
                Current
            </h1>
            <div className="text-gray-500 mt-10 leading-5 flex flex-col mr-9">
                <div className="grid grid-cols-5 justify-between mb-5">
                    <div className="mx-auto">
                        <img src={temperatureicon} alt="tempicon" className='w-8 m-auto' />
                    </div>
                    <div className="col-span-3">
                        <Clock format={"HH:mm"} ticking={true} />
                        <h1>{today}</h1>
                    </div>
                    <div>
                        <h1 className="text-2xl text-red-500 font-bold">{tStat === "0" ? temperatureStatFirst : tStat}°C</h1>
                    </div>
                </div>

                <div className="grid grid-cols-5 justify-between mb-5">
                    <div className="mx-auto">
                        <img src={humidityicon} alt="humidicon" className='w-8 m-auto' />
                    </div>
                    <div className="col-span-3">
                        <Clock format={"HH:mm"} ticking={true} />
                        <h1>{today}</h1>
                    </div>
                    <div>
                        <h1 className="text-2xl text-blue-500 font-bold">{hStat === "0" ? humidityStatFirst : hStat}%</h1>
                    </div>
                </div>

                <div className="grid grid-cols-5 justify-between mb-5">
                    <div className="mx-auto">
                        <img src={lighticon} alt="lighticon" className='w-8 m-auto' />
                    </div>
                    <div className="col-span-3">
                        <Clock format={"HH:mm"} ticking={true} />
                        <h1>{today}</h1>
                    </div>
                    <div>
                        <h1 className="text-2xl text-yellow-500 font-bold">{lStat === "0" ? lightStatFirst : lStat}%</h1>
                    </div>
                </div>

                <div className="grid grid-cols-5 justify-between mb-5">
                    <div className="mx-auto">
                        <img src={viewicon} alt="viewicon" className='w-10 m-auto' />
                    </div>
                    <div className="col-span-3">
                        <Clock format={"HH:mm"} ticking={true} />
                        <h1>{today}</h1>
                    </div>
                    <div>
                        <h1 className="text-2xl text-violet-500 font-bold">{humanFoundState === "0" ? "No" : "Yes"}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
