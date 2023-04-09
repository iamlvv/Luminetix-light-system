import React, { useEffect } from 'react'
import lighticon from "../../images/lighticon.png";
import humidityicon from "../../images/humidityicon.png";
import temperatureicon from "../../images/temperatureicon.png";
import axios from 'axios';

const solveDataDay = (startTime, endTime, dataNeedSolving) => {
	let dataSolved = [];
	for (let i = 0; i < dataNeedSolving.length; i++) {
		if (dataNeedSolving[i][0] >= startTime && dataNeedSolving[i][0] <= endTime) {
			dataSolved.push(dataNeedSolving[i]);
		}
	}
	let contain = [{}]
	for (let i = 0; i < 24; i++) {
		contain[i] = {
			name: "",
			value: 0,
			quantity: 0
		}
	}
	for (let j = 0; j < dataSolved.length; j++) {
		let temp = dataSolved[j][0].slice(11, 13);
		for (let i = 0; i < 24; i++) {
			if (parseInt(temp) === i) {
				contain[i].value += parseInt(dataSolved[j][1])
				contain[i].quantity++;
			}
		}
	}
	for (let i = 0; i < 24; i++) {
		if (contain[i].value !== 0) {
			contain[i].value = Math.round(contain[i].value / contain[i].quantity)
			contain[i].name = i + ""
		}
	}
    let sum = 0;
    let count = 0;
    for (let i = 0; i < 24; i++) {
        if (contain[i].value !== 0) {
            sum += contain[i].value;
            count++;
        }
    }
    let average = sum / count;
    return average;
}

function AverageFigure() {
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
    const [tempAverage, setTempAverage] = React.useState(0);
    const [humidAverage, setHumidAverage] = React.useState(0);
    const [lightAverage, setLightAverage] = React.useState(0);

    const getTempStatDay = async () => {
		const startTime = new Date().toISOString().slice(0, 11) + "00:00:00Z";
		const endTime = new Date().toISOString().slice(0, 11) + "23:59:59Z";
		const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-temp/data/chart');
		var result = solveDataDay("2023-04-06T00:00:00Z", "2023-04-06T23:23:595Z", response.data.data);
		setTempAverage(result);
	}
    const getHumidStatDay = async () => {
        const startTime = new Date().toISOString().slice(0, 11) + "00:00:00Z";
        const endTime = new Date().toISOString().slice(0, 11) + "23:59:59Z";
        const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-humi/data/chart');
        var result = solveDataDay("2023-04-06T00:00:00Z", "2023-04-06T23:23:595Z", response.data.data);
        setHumidAverage(result);
    }
    const getLightStatDay = async () => {
        const startTime = new Date().toISOString().slice(0, 11) + "00:00:00Z";
        const endTime = new Date().toISOString().slice(0, 11) + "23:59:59Z";
        const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-light/data/chart');
        var result = solveDataDay("2023-04-06T00:00:00Z", "2023-04-06T23:23:595Z", response.data.data);
        setLightAverage(result);
    }
    useEffect(() => {
        getTempStatDay();
        getHumidStatDay();
        getLightStatDay();
    }, []);
    return (
        <div>
            <h1 className="text-xl text-violet-500 font-bold">Average figures</h1>

            <div className="grid grid-rows-3 gap-2 mt-5">
                <div className="row-span-1 grid grid-cols-2">
                    <div className='grid grid-cols-4'>
                        <img src={temperatureicon} alt='tempicon' className='m-auto w-7 my-3'/>
                        <h1 className='col-span-3 text-lg font-bold my-auto mr-auto px-3'>Temperature</h1>
                    </div>
                    <h1 className="text-2xl text-red-500 font-bold m-auto">{tempAverage}°C</h1>
                </div>
                <div className="row-span-1 grid grid-cols-2">
                    <div className='grid grid-cols-4'>
                        <img src={humidityicon} alt='humidicon' className='m-auto w-7 my-3'/>
                        <h1 className='col-span-3 text-lg font-bold my-auto mr-auto px-3'>Humidity</h1>
                    </div>
                    <h1 className="text-2xl text-blue-500 font-bold m-auto">{humidAverage}%</h1>
                </div>
                <div className='frow-span-1 grid grid-cols-2'>
                    <div className='grid grid-cols-4'>
                        <img src={lighticon} alt='lighticon' className='m-auto w-7 my-3'/>
                        <h1 className='col-span-3 text-lg font-bold my-auto mr-auto px-3'>Light</h1>
                    </div>
                    <h1 className="text-2xl text-yellow-500 font-bold m-auto">{lightAverage}%</h1>
                </div>
            </div>
        </div>
    )
}

export default AverageFigure;