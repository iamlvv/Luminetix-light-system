import React, { useEffect } from 'react'
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
} from "recharts";
import axios from 'axios';
import ChartStats from './ChartStats';

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

export default function StatisticsSum({ typeofstats, period }) {
	const [tempDataDay, setTempDataDay] = React.useState([]);
	const [humiDataDay, setHumiDataDay] = React.useState([]);
	const [lightDataDay, setLightDataDay] = React.useState([]);

	const [tempDataWeek, setTempDataWeek] = React.useState([]);
	const [humiDataWeek, setHumiDataWeek] = React.useState([]);
	const [lightDataWeek, setLightDataWeek] = React.useState([]);

	const [tempDataMonth, setTempDataMonth] = React.useState([]);
	const [humiDataMonth, setHumiDataMonth] = React.useState([]);
	const [lightDataMonth, setLightDataMonth] = React.useState([]);

	const getTempStatDay = async () => {
		const startTime = new Date().toISOString().slice(0, 11) + "00:00:00Z";
		const endTime = new Date().toISOString().slice(0, 11) + "23:59:59Z";
		const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-temp/data/chart');
		var result = solveDataDay("2023-04-06T00:00:00Z", "2023-04-06T23:23:595Z", response.data.data);
		setTempDataDay(result);
	}
	const getHumidStatDay = async () => {
		const startTime = new Date().toISOString().slice(0, 11) + "00:00:00Z";
		const endTime = new Date().toISOString().slice(0, 11) + "23:59:59Z";
		const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-humi/data/chart');
		var result = solveDataDay("2023-04-06T00:00:00Z", "2023-04-06T23:23:595Z", response.data.data);
		setHumiDataDay(result);
	}
	const getLightStatDay = async () => {
		const startTime = new Date().toISOString().slice(0, 11) + "00:00:00Z";
		const endTime = new Date().toISOString().slice(0, 11) + "23:59:59Z";
		const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-light/data/chart');
		var result = solveDataDay("2023-04-06T00:00:00Z", "2023-04-06T23:23:595Z", response.data.data);
		setLightDataDay(result);
	}

	const getTempStatWeek = async () => {
		const now = new Date();
		const startTimeISO = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6).toISOString().slice(0, 11) + "00:00:00Z";
		const endTime = new Date().toISOString().slice(0, 11) + "23:59:59Z";
		const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-temp/data/chart');
		var result = solveDataWeek(startTimeISO, endTime, response.data.data);
		setTempDataWeek(result);
	}
	const getHumidStatWeek = async () => {
		const now = new Date();
		const startTimeISO = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6).toISOString().slice(0, 11) + "00:00:00Z";
		const endTime = new Date().toISOString().slice(0, 11) + "23:59:59Z";
		const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-humi/data/chart');
		var result = solveDataWeek(startTimeISO, endTime, response.data.data);
		setHumiDataWeek(result);
	}
	const getLightStatWeek = async () => {
		const now = new Date();
		const startTimeISO = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6).toISOString().slice(0, 11) + "00:00:00Z";
		const endTime = new Date().toISOString().slice(0, 11) + "23:59:59Z";
		const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-light/data/chart');
		var result = solveDataWeek(startTimeISO, endTime, response.data.data);
		setLightDataWeek(result);
	}

	const getTempStatMonth = async () => {
		const now = new Date();
		const startTimeISO = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29).toISOString().slice(0, 11) + "00:00:00Z";
		const endTime = new Date().toISOString().slice(0, 11) + "23:59:59Z";
		const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-temp/data/chart');
		var result = solveDataMonth(startTimeISO, endTime, response.data.data);
		setTempDataMonth(result);
	}
	const getHumidStatMonth = async () => {
		const now = new Date();
		const startTimeISO = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29).toISOString().slice(0, 11) + "00:00:00Z";
		const endTime = new Date().toISOString().slice(0, 11) + "23:59:59Z";
		const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-humi/data/chart');
		var result = solveDataMonth(startTimeISO, endTime, response.data.data);
		setHumiDataMonth(result);
	}
	const getLightStatMonth = async () => {
		const now = new Date();
		const startTimeISO = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29).toISOString().slice(0, 11) + "00:00:00Z";
		const endTime = new Date().toISOString().slice(0, 11) + "23:59:59Z";
		const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-light/data/chart');
		var result = solveDataMonth(startTimeISO, endTime, response.data.data);
		setLightDataMonth(result);
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
	}, [])

	let data = [];
	if (typeofstats === "temperature" && period === "day") {
		data = tempDataDay;
	}
	else if (typeofstats === "humidity" && period === "day") {
		data = humiDataDay;
	}
	else if (typeofstats === "light" && period === "day") {
		data = lightDataDay;
	}
	else if (typeofstats === "temperature" && period === "week") {
		data = tempDataWeek;
	}
	else if (typeofstats === "humidity" && period === "week") {
		data = humiDataWeek;
	}
	else if (typeofstats === "light" && period === "week") {
		data = lightDataWeek;
	}
	else if (typeofstats === "temperature" && period === "month") {
		data = tempDataMonth;
	}
	else if (typeofstats === "humidity" && period === "month") {
		data = humiDataMonth;
	}
	else if (typeofstats === "light" && period === "month") {
		data = lightDataMonth;
	}
	return (
		<ChartStats data={data} typeofstats={typeofstats} />
	);
}

