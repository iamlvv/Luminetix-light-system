import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import StatisticsSum from "../components/statistics/StatisticsSum";
import StatisticsHeader from "../components/statistics/StatisticsHeader";
import RealtimeStatus from "../components/RealtimeStatus";
import AverageFigure from "../components/statistics/AverageFigure";
import Header from "../components/Header";

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

	return contain;
}
const solveDataWeek = (startTime, endTime, dataNeedSolving) => {
	let dataSolved = [];
	let temp = ""

	for (let i = 0; i < dataNeedSolving.length; i++) {
		if (dataNeedSolving[i][0] >= startTime && dataNeedSolving[i][0] <= endTime) {
			if (dataNeedSolving[i][0].slice(0, 10) !== temp) {
				temp = dataNeedSolving[i][0].slice(0, 10)
			}
			dataSolved.push(dataNeedSolving[i]);
		}
	}
	let contain = [{}]
	const now = new Date()
	for (let i = 0; i < 7; i++) {
		contain[i] = {
			name: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6 + i).toISOString().slice(5, 10),
			value: 0,
			quantity: 0
		}
	}
	for (let j = 0; j < dataSolved.length; j++) {
		let temp = dataSolved[j][0].slice(8, 10);
		for (let i = 0; i < 7; i++) {
			if (parseInt(temp) === parseInt(contain[i].name.slice(3, 5))) {
				contain[i].value += parseInt(dataSolved[j][1])
				contain[i].quantity++;
			}
		}
	}
	for (let i = 0; i < 7; i++) {
		if (contain[i].value !== 0) {
			contain[i].value = Math.round(contain[i].value / contain[i].quantity)
		}
	}
	return contain;
}
const solveDataMonth = (startTime, endTime, dataNeedSolving) => {
	let dataSolved = [];
	let temp = ""

	for (let i = 0; i < dataNeedSolving.length; i++) {
		if (dataNeedSolving[i][0] >= startTime && dataNeedSolving[i][0] <= endTime) {
			if (dataNeedSolving[i][0].slice(0, 10) !== temp) {
				temp = dataNeedSolving[i][0].slice(0, 10)
			}
			dataSolved.push(dataNeedSolving[i]);
		}
	}
	let contain = [{}]
	const now = new Date()
	for (let i = 0; i < 30; i++) {
		contain[i] = {
			name: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29 + i).toISOString().slice(5, 10),
			value: 0,
			quantity: 0
		}
	}
	for (let j = 0; j < dataSolved.length; j++) {
		let temp = dataSolved[j][0].slice(8, 10);
		for (let i = 0; i < 30; i++) {
			if (parseInt(temp) === parseInt(contain[i].name.slice(3, 5))) {
				contain[i].value += parseInt(dataSolved[j][1])
				contain[i].quantity++;
			}
		}
	}
	for (let i = 0; i < 30; i++) {
		if (contain[i].value !== 0) {
			contain[i].value = Math.round(contain[i].value / contain[i].quantity)
		}
	}
	return contain;
}

export default function Statistics() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  const [dataTempDay, setDataTempDay] = useState([]);
  const [dataHumidDay, setDataHumidDay] = useState([]);
  const [dataLightDay, setDataLightDay] = useState([]);

  const [dataTempWeek, setDataTempWeek] = useState([]);
  const [dataHumidWeek, setDataHumidWeek] = useState([]);
  const [dataLightWeek, setDataLightWeek] = useState([]);

  const [dataTempMonth, setDataTempMonth] = useState([]);
  const [dataHumidMonth, setDataHumidMonth] = useState([]);
  const [dataLightMonth, setDataLightMonth] = useState([]);
  const getTempStatDay = async () => {
		const startTime = new Date().toISOString().slice(0, 11) + "00:00:00Z";
		const endTime = new Date().toISOString().slice(0, 11) + "23:59:59Z";
		const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-temp/data/chart');
		var result = solveDataDay("2023-04-06T00:00:00Z", "2023-04-06T23:23:595Z", response.data.data);
		setDataTempDay(result);
	}
	const getHumidStatDay = async () => {
		const startTime = new Date().toISOString().slice(0, 11) + "00:00:00Z";
		const endTime = new Date().toISOString().slice(0, 11) + "23:59:59Z";
		const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-humi/data/chart');
		var result = solveDataDay("2023-04-06T00:00:00Z", "2023-04-06T23:23:595Z", response.data.data);
		setDataHumidDay(result);
	}
	const getLightStatDay = async () => {
		const startTime = new Date().toISOString().slice(0, 11) + "00:00:00Z";
		const endTime = new Date().toISOString().slice(0, 11) + "23:59:59Z";
		const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-light/data/chart');
		var result = solveDataDay("2023-04-06T00:00:00Z", "2023-04-06T23:23:595Z", response.data.data);
		setDataLightDay(result);
	}

	const getTempStatWeek = async () => {
		const now = new Date();
		const startTimeISO = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6).toISOString().slice(0, 11) + "00:00:00Z";
		const endTime = new Date().toISOString().slice(0, 11) + "23:59:59Z";
		const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-temp/data/chart');
		var result = solveDataWeek(startTimeISO, endTime, response.data.data);
		setDataTempWeek(result);
	}
	const getHumidStatWeek = async () => {
		const now = new Date();
		const startTimeISO = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6).toISOString().slice(0, 11) + "00:00:00Z";
		const endTime = new Date().toISOString().slice(0, 11) + "23:59:59Z";
		const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-humi/data/chart');
		var result = solveDataWeek(startTimeISO, endTime, response.data.data);
		setDataHumidWeek(result);
	}
	const getLightStatWeek = async () => {
		const now = new Date();
		const startTimeISO = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6).toISOString().slice(0, 11) + "00:00:00Z";
		const endTime = new Date().toISOString().slice(0, 11) + "23:59:59Z";
		const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-light/data/chart');
		var result = solveDataWeek(startTimeISO, endTime, response.data.data);
		setDataLightWeek(result);
	}

	const getTempStatMonth = async () => {
		const now = new Date();
		const startTimeISO = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29).toISOString().slice(0, 11) + "00:00:00Z";
		const endTime = new Date().toISOString().slice(0, 11) + "23:59:59Z";
		const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-temp/data/chart');
		var result = solveDataMonth(startTimeISO, endTime, response.data.data);
		setDataTempMonth(result);
	}
	const getHumidStatMonth = async () => {
		const now = new Date();
		const startTimeISO = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29).toISOString().slice(0, 11) + "00:00:00Z";
		const endTime = new Date().toISOString().slice(0, 11) + "23:59:59Z";
		const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-humi/data/chart');
		var result = solveDataMonth(startTimeISO, endTime, response.data.data);
		setDataHumidMonth(result);
	}
	const getLightStatMonth = async () => {
		const now = new Date();
		const startTimeISO = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29).toISOString().slice(0, 11) + "00:00:00Z";
		const endTime = new Date().toISOString().slice(0, 11) + "23:59:59Z";
		const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-light/data/chart');
		var result = solveDataMonth(startTimeISO, endTime, response.data.data);
		setDataLightMonth(result);
	}
  useEffect(() => {
    getTempStatDay();
    getHumidStatDay();
    getLightStatDay();
    getTempStatWeek();
    getHumidStatWeek();
    getLightStatWeek();
    getTempStatMonth();
    getHumidStatMonth();
    getLightStatMonth();
  }, []);
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
  const [datatypes, setDatatypes] = React.useState('temperature');
  const [period, setPeriod] = React.useState('day');
  const handleChooseTemp = () => {
    setDatatypes('temperature');
  }
  const handleChooseHumid = () => {
    setDatatypes('humidity');
  }
  const handleChooseLight = () => {
    setDatatypes('light');
  }

  const exportData = (data) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  }
  const handleExportData = () => {
    let data = [];
    if (period === 'day') {
      // getHumidStatDay();
      // getTempStatDay();
      // getLightStatDay();
      console.log(dataTempDay)
      data = data.concat(dataTempDay).concat(dataHumidDay).concat(dataLightDay);
      exportData(data);
    }
    else if (period === 'week') {
      // getHumidStatWeek();
      // getTempStatWeek();
      // getLightStatWeek();
      data = data.concat(dataTempWeek).concat(dataHumidWeek).concat(dataLightWeek);
      exportData(data);
    }
    else if (period === 'month') {
      // getHumidStatMonth();
      // getTempStatMonth();
      // getLightStatMonth();
      data = data.concat(dataTempMonth).concat(dataHumidMonth).concat(dataLightMonth);
      exportData(data);
    }

    
  }
  const dayActive = 'bg-violet-200 text-violet-500 rounded-2xl p-2';
  const dayInactive = 'bg-white text-violet-500 rounded-2xl p-2';
  const weekActive = 'bg-violet-200 text-violet-500 rounded-2xl p-2';
  const weekInactive = 'bg-white text-violet-500 rounded-2xl p-2';
  const monthActive = 'bg-violet-200 text-violet-500 rounded-2xl p-2';
  const monthInactive = 'bg-white text-violet-500 rounded-2xl p-2';

  const [active, setActive] = useState("1");

  return (
    <div>

      <NavBar />

      <div className="ml-28 grid grid-cols-4 gap-9">
        <div className="col-span-3 bg-violet-100 mt-5 rounded-2xl p-5">
          <Header />
          <div className="grid grid-cols-2 gap-9">

          </div>
          <div className="bg-white rounded-2xl mt-10 p-5">
            <div className="grid grid-cols-4">
              <h1 className="col-span-1 text-xl text-violet-500 font-bold">Statistics</h1>
              <div className="grid grid-cols-3 col-span-3 gap-9">
                <button className="text-red-500 font-bold hover:bg-red-100 transition ease-in px-2 py-2 rounded-2xl" onClick={handleChooseTemp}>Temperature</button>
                <button className="text-blue-500 font-bold hover:bg-blue-100 transition ease-in px-2 py-2 rounded-2xl" onClick={handleChooseHumid}>Humidity</button>
                <button className="text-yellow-500 font-bold hover:bg-yellow-100 transition ease-in px-2 py-2 rounded-2xl" onClick={handleChooseLight}>Light</button>
              </div>
            </div>
            <div className="mt-10 ml-5">
              <StatisticsSum typeofstats={datatypes} period={period}
                onGetTempDay = {setDataTempDay}
                onGetTempWeek = {setDataTempWeek}
                onGetTempMonth = {setDataTempMonth}
                onGetHumidDay = {setDataHumidDay}
                onGetHumidWeek = {setDataHumidWeek}
                onGetHumidMonth = {setDataHumidMonth}
                onGetLightDay = {setDataLightDay}
                onGetLightWeek = {setDataLightWeek}
                onGetLightMonth = {setDataLightMonth}

              />
            </div>
            <div className="text-center">
              <button className="text-violet-500 font-bold hover:bg-violet-100 transition ease-in px-3 py-2 rounded-2xl"
                onClick={() => handleExportData()}
              >Export chart</button>
            </div>
          </div>
        </div>
        <div className="mr-9">
          <div className="border-2 p-2 rounded-2xl grid grid-cols-3 gap-5 mt-5 text-violet-500 font-bold text-center">
            <button className={active === "1" ? dayActive : dayInactive} id="1" onClick={(e) => {
              setActive(e.target.id);
              setPeriod('day')
            }}>Day</button>
            <button className={active === "2" ? weekActive : weekInactive} id="2" onClick={(e) => {
              setActive(e.target.id);
              setPeriod('week')
            }}>Week</button>
            <button className={active === "3" ? monthActive : monthInactive} id="3" onClick={(e) => {
              setActive(e.target.id);
              setPeriod('month')
            }}>Month</button>
          </div>
          <h1 className="text-2xl font-bold text-violet-500 mt-10 mb-5">Export Data</h1>
          <h2 className="text-gray-500">Please select the time before you export data</h2>
          <h2 className="text-gray-500">Downloaded data including parameters and chart</h2>
          <div className="text-center mt-10">
            <button className="bg-violet-500 text-white py-2 w-full rounded-2xl font-bold hover:bg-violet-700"
              onClick={() => handleExportData()}
            >Export</button>
          </div>
          
          <div className="mt-5 bg-violet-100 p-3 rounded-xl">
            <AverageFigure />
          </div>

        </div>
      </div>
    </div>
  );
}
