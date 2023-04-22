import { View, Text, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';

import axios from 'axios';
import ChartStats from './components/ChartStats';
const ipaddress = "10.0.145.226";

const solveDataDay = (startTime, endTime, dataNeedSolving) => {
  let dataSolved = [];
  for (let i = 0; i < dataNeedSolving.length; i++) {
    if (dataNeedSolving[i][0] >= startTime && dataNeedSolving[i][0] <= endTime) {
      dataSolved.push(dataNeedSolving[i]);
    }
  }
  let contain = [{}]
  let labels = []
  let data = []
  for (let i = 0; i < 24; i++) {
    contain[i] = {
      name: "",
      value: 0,
      quantity: 0
    }
    labels.push(i + "")
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
    data.push(contain[i].value)
  }

  return {
    labels,
    datasets: [
      {
        data
      }
    ]
  };
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
  let labels = []
  let data = []
  const now = new Date()
  for (let i = 0; i < 7; i++) {
    contain[i] = {
      name: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6 + i).toISOString().slice(5, 10),
      value: 0,
      quantity: 0
    }
    labels.push(contain[i].name)
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
    data.push(contain[i].value)
  }
  return {
    labels,
    datasets: [
      {
        data
      }
    ]
  };
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
  let labels = []
  let data = []
  const now = new Date()
  for (let i = 0; i < 30; i++) {
    contain[i] = {
      name: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29 + i).toISOString().slice(5, 10),
      value: 0,
      quantity: 0
    }
    labels.push(contain[i].name)
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
    data.push(contain[i].value)
  }
  return {
    labels,
    datasets: [
      {
        data
      }
    ]
  };
}


const Statistics = () => {
  const [tempDataDay, setTempDataDay] = React.useState([]);
  const [humiDataDay, setHumiDataDay] = React.useState([]);
  const [lightDataDay, setLightDataDay] = React.useState([]);

  const [tempDataWeek, setTempDataWeek] = React.useState([]);
  const [humiDataWeek, setHumiDataWeek] = React.useState([]);
  const [lightDataWeek, setLightDataWeek] = React.useState([]);

  const [tempDataMonth, setTempDataMonth] = React.useState([]);
  const [humiDataMonth, setHumiDataMonth] = React.useState([]);
  const [lightDataMonth, setLightDataMonth] = React.useState([]);

  const [typeofstats, setTypeofstats] = React.useState("temperature");
  const [period, setPeriod] = React.useState("day");

  const periodList = ["Day", "Week", "Month"];
  const typeofstatsList = ["temperature", "humidity", "light"];

  const getTempStatDay = async () => {
    const startTime = new Date().toISOString().slice(0, 11) + "00:00:00Z";
    const endTime = new Date().toISOString();
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

  const getTempStatWeek = async () => {
    const now = new Date();
    const startTimeISO = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6).toISOString().slice(0, 11) + "00:00:00Z";
    const endTime = new Date().toISOString();
    const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-temp/data/chart');
    var result = solveDataWeek(startTimeISO, endTime, response.data.data);
    setTempDataWeek(result);
  }
  const getHumidStatWeek = async () => {
    const now = new Date();
    const startTimeISO = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6).toISOString().slice(0, 11) + "00:00:00Z";
    const endTime = new Date().toISOString();
    const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-humi/data/chart');
    var result = solveDataWeek(startTimeISO, endTime, response.data.data);
    setHumiDataWeek(result);
  }
  const getLightStatWeek = async () => {
    const now = new Date();
    const startTimeISO = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6).toISOString().slice(0, 11) + "00:00:00Z";
    const endTime = new Date().toISOString();
    const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-light/data/chart');
    var result = solveDataWeek(startTimeISO, endTime, response.data.data);
    setLightDataWeek(result);
  }

  const getTempStatMonth = async () => {
    const now = new Date();
    const startTimeISO = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29).toISOString().slice(0, 11) + "00:00:00Z";
    const endTime = new Date().toISOString();
    const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-temp/data/chart');
    var result = solveDataMonth(startTimeISO, endTime, response.data.data);
    setTempDataMonth(result);
  }
  const getHumidStatMonth = async () => {
    const now = new Date();
    const startTimeISO = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29).toISOString().slice(0, 11) + "00:00:00Z";
    const endTime = new Date().toISOString();
    const response = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-humi/data/chart');
    var result = solveDataMonth(startTimeISO, endTime, response.data.data);
    setHumiDataMonth(result);
  }
  const getLightStatMonth = async () => {
    const now = new Date();
    const startTimeISO = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29).toISOString().slice(0, 11) + "00:00:00Z";
    const endTime = new Date().toISOString();
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
  }, [period, typeofstats])


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
  const [active, setActive] = useState(0);
  const dayActive = 'bg-violet-200 text-violet-500 rounded-2xl p-2';
  const dayInactive = 'bg-white text-violet-500 rounded-2xl p-2';
  const weekActive = 'bg-violet-200 text-violet-500 rounded-2xl p-2';
  const weekInactive = 'bg-white text-violet-500 rounded-2xl p-2';
  const monthActive = 'bg-violet-200 text-violet-500 rounded-2xl p-2';
  const monthInactive = 'bg-white text-violet-500 rounded-2xl p-2';
  console.log(data)
  return (
    <View>
      <ScrollView>
        <View className="items-center mt-10">
          <Text className="font-bold text-2xl">Statistics</Text>
        </View>
        <View className='flex flex-1 flex-row justify-center gap-9 mb-10'>
          <View className='flex-1 flex flex-col bg-white rounded-2xl p-2'>
            <View className='items-center'>
              <Text className='font-bold text-violet-500'>Average Figure</Text>
            </View>
            <View className='flex flex-row justify-between gap-5'>
              <Text>Temperature</Text>
              <Text>{31.2}</Text>
            </View>
            <View className='flex flex-row justify-between gap-5'>
              <Text>Humidity</Text>
              <Text>{31.2}</Text>
            </View>
            <View className='flex flex-row justify-between gap-5'>
              <Text>Light</Text>
              <Text>{31.2}</Text>
            </View>
          </View>
          <View className='flex-1 flex flex-col bg-white rounded-2xl p-2'>
            <View className='items-center'>
              <Text className='font-bold text-violet-500'>Current Figure</Text>
            </View>
            <View className='flex flex-row justify-between gap-5'>
              <Text>Temperature</Text>
              <Text>{31.2}</Text>
            </View>
            <View className='flex flex-row justify-between gap-5'>
              <Text>Humidity</Text>
              <Text>{31.2}</Text>
            </View>
            <View className='flex flex-row justify-between gap-5'>
              <Text>Light</Text>
              <Text>{31.2}</Text>
            </View>
          </View>
        </View>
        <View className='flex flex-row mb-5 items-center justify-center gap-9'>
          {periodList.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => {
                setPeriod(item.toLowerCase());
                setActive(index + 1);
              }} key={index}
                className={item === 'Day' ? active === 1 ? dayActive : dayInactive : item === 'Week' ? active === 2 ? weekActive : weekInactive : active === 3 ? monthActive : monthInactive}
              >
                <Text className="font-bold text-xl">{item}</Text>
              </TouchableOpacity>
            )
          })
          }
        </View>
        <View className='flex flex-row gap-9'>
          {typeofstatsList.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => setTypeofstats(item)} key={index}
                className={typeofstats === item ? item === 'temperature' ? 'bg-violet-50 text-white rounded-2xl p-2' : item === 'humidity' ? 'bg-violet-50 text-white rounded-2xl p-2' : item === 'light' ? 'bg-violet-50 text-white rounded-2xl p-2' : 'bg-violet-50 text-white rounded-2xl p-2' : 'bg-white text-violet-500 rounded-2xl p-2'}
              >
                <Text className={typeofstats === item ? item === 'temperature' ? 'font-bold text-xl text-red-500 ' : item === 'humidity' ? 'font-bold text-xl text-blue-500' : item === 'light' ? 'font-bold text-xl text-yellow-500' : 'font-bold text-xl' : 'font-bold text-xl'}
                >{item}</Text>
              </TouchableOpacity>
            )
          })
          }
        </View>
        <View>
          <ChartStats data={data} typeofstats={typeofstats} />
        </View>
      </ScrollView>
    </View>
  )
}

export default Statistics