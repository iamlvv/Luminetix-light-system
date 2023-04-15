import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
// const data = [
//   {
//     name: "12h00",
//     light: 58,
//     temp: 40,
//     humidity: 30,
//   },
//   {
//     name: "13h00",
//     light: 50,
//     temp: 45,
//     humidity: 20,
//   },
//   {
//     name: "14h00",
//     light: 90,
//     temp: 30,
//     humidity: 50,
//   },
//   {
//     name: "15h00",
//     light: 80,
//     temp: 50,
//     humidity: 42,
//   },
//   {
//     name: "16h00",
//     light: 60,
//     temp: 60,
//     humidity: 65,
//   },
//   {
//     name: "17h00",
//     light: 85,
//     temp: 50,
//     humidity: 61,
//   },
// ];
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

export default function StatisticsToday() {
  const [tempDataDay, setTempDataDay] = React.useState([]);
	const [humiDataDay, setHumiDataDay] = React.useState([]);
	const [lightDataDay, setLightDataDay] = React.useState([]);

  const getTempStatDay = async () => {
		const startTime = new Date().toISOString().slice(0, 11) + "00:00:00Z";
		const endTime = new Date().toISOString();
		console.log(endTime)
		const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-temp/data/chart');
		var result = solveDataDay(startTime, endTime, response.data.data);
		setTempDataDay(result);
	}
	const getHumidStatDay = async () => {
		const startTime = new Date().toISOString().slice(0, 11) + "00:00:00Z";
		const endTime = new Date().toISOString();
		const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-humi/data/chart');
		var result = solveDataDay(startTime, endTime, response.data.data);
		setHumiDataDay(result);
	}
	const getLightStatDay = async () => {
		const startTime = new Date().toISOString().slice(0, 11) + "00:00:00Z";
		const endTime = new Date().toISOString();
		const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-light/data/chart');
		var result = solveDataDay(startTime, endTime, response.data.data);
		setLightDataDay(result);
	}
  useEffect(() => {
		getTempStatDay();
		getHumidStatDay();
		getLightStatDay();
	}, [])
  let data = [];
  if (tempDataDay.length !== 0 && humiDataDay.length !== 0 && lightDataDay.length !== 0) {
    for (let i = 0; i < 24; i++) {
      data.push({
        name: tempDataDay[i].name,
        temp: tempDataDay[i].value,
        humidity: humiDataDay[i].value,
        light: lightDataDay[i].value
      })
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-10 text-gray-500 font-bold">
      <LineChart
      className=""
        width={847}
        height={300}
        data={data}
        // margin={{
        //   top: 5,
        //   right: 30,
        //   left: 20,
        //   bottom: 5,
        // }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="light"
          stroke="#F2C94C"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="temp"
          stroke="#FE4F60"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="humidity"
          stroke="#00B4D3"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
}
