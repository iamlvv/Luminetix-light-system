import { View, Text, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

import axios from 'axios';
import ChartStats from './components/ChartStats';
const ipaddress = process.env['IPADDRESS'];

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
  const styles = {
    maincolorBG: {
      backgroundColor: '#5E44FF',
    },
    maincolorTXT: {
      color: '#5E44FF',
    },
    secondarycolorBG: {
      backgroundColor: '#DFDAFF',
    },
  }
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

  const isFocused = useIsFocused();

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
  }, [period, typeofstats, isFocused])

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
  const dayActive = 'bg-violet-200 text-violet-500 rounded-xl px-5 py-1 mx-1';
  const dayInactive = 'bg-gray-200 text-violet-500 rounded-xl px-5 py-1 mx-1';
  const weekActive = 'bg-violet-200 text-violet-500 rounded-xl px-5 py-1 mx-1';
  const weekInactive = 'bg-gray-200 text-violet-500 rounded-xl px-5 py-1 mx-1';
  const monthActive = 'bg-violet-200 text-violet-500 rounded-xl px-5 py-1 mx-1';
  const monthInactive = 'bg-gray-200 text-violet-500 rounded-xl px-5 py-1 mx-1';

  return (
    <View className=''>
      <ScrollView>

        <View className="items-center mt-10">
          <Text className="font-bold text-2xl">Statistics</Text>
        </View>

        <View style={styles.secondarycolorBG} className='flex flex-col m-3 p-5 rounded-xl'>
          <View className='flex flex-row justify-center items-center'>
            {/* Average figure */}
            <View className='flex flex-col bg-white rounded-md px-3 mx-3 py-2 shadow-xs shadow-black'>
              <View className=''>
                <Text className='text-xl mb-3 font-bold text-center' style={styles.maincolorTXT}>Average Figure</Text>
              </View>
              <View className='flex flex-row justify-between mt-2 items-center'>
                <Text className='text-md'>Temperature</Text>
                <Text className='text-md font-bold' style={styles.maincolorTXT}>{31.2}</Text>
              </View>
              <View className='flex flex-row justify-between mt-2 items-center'>
                <Text className='text-md'>Humidity</Text>
                <Text className='text-md font-bold' style={styles.maincolorTXT}>{31.2}</Text>
              </View>
              <View className='flex flex-row justify-between mt-2 items-center'>
                <Text className='text-md'>Light</Text>
                <Text className='text-md font-bold' style={styles.maincolorTXT}>{31.2}</Text>
              </View>
            </View>
            {/* Current figure */}
            <View className='flex flex-col bg-white rounded-lg px-3 mx-3 py-2 shadow-xs shadow-black'>
              <View className=''>
                <Text className='text-xl mb-3 font-bold text-center' style={styles.maincolorTXT}>Current status</Text>
              </View>
              <View className='flex flex-row justify-between mt-2 items-center'>
                <Text className='text-md'>Temperature</Text>
                <Text className='text-md font-bold' style={styles.maincolorTXT}>{31.2}</Text>
              </View>
              <View className='flex flex-row justify-between mt-2 items-center'>
                <Text className='text-md'>Humidity</Text>
                <Text className='text-md font-bold' style={styles.maincolorTXT}>{31.2}</Text>
              </View>
              <View className='flex flex-row justify-between mt-2 items-center'>
                <Text className='text-md'>Light</Text>
                <Text className='text-md font-bold' style={styles.maincolorTXT}>{31.2}</Text>
              </View>
            </View>
          </View>
          {/* Export title */}
          <View className='flex flex-col mt-5'>
            <Text className='text-xl font-bold' style={styles.maincolorTXT}>Export data</Text>
            <Text className='text-sm italic text-gray-500'>Please select the time before you export data</Text>
          </View>
          {/* Export */}
          <View className='flex flex-row mt-5 items-center justify-between'>
            <View className='flex flex-row bg-white justify-center p-2 rounded-xl shadow-lg shadow-black'>
              {
                periodList.map((item, index) => {
                  return (
                    <TouchableOpacity onPress={() => {
                      setPeriod(item.toLowerCase());
                      setActive(index + 1);
                    }}
                      key={index}
                      style={styles.secondarycolorBG}
                      className={item === 'Day' ? (active === 1 ? dayActive : dayInactive) : item === 'Week' ? (active === 2 ? weekActive : weekInactive) : active === 3 ? monthActive : monthInactive}
                    >
                      <Text className="font-semibold text-sm" style={styles.maincolorTXT}>{item}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
            {/* Export button */}
            <View className='py-2 px-4 rounded-xl' style={styles.maincolorBG}>
              <TouchableOpacity onPress={() => { }}>
                <Text className='text-md font-bold text-white'>Export</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Graph option */}
        <View className='flex flex-row justify-between items-center mx-3 mt-3'>
          <View className='mx-1'>
            <Text className='text-base font-bold' style={styles.maincolorTXT}>Type of graph</Text>
          </View>
          <View className='flex flex-row justify-between bg-white rounded-xl p-2'>
            {
              typeofstatsList.map((item, index) => {
                return (
                  <TouchableOpacity onPress={() => setTypeofstats(item)} key={index}
                    className={
                      typeofstats === item ?
                        item === 'temperature'
                          ?
                          'py-1 mx-3 border-b-4 border-red-500'
                          :
                          item === 'humidity'
                            ?
                            'py-1 mx-3 border-b-4 border-blue-500'
                            :
                            item === 'light'
                              ?
                              'py-1 mx-3 border-b-4 border-yellow-500'
                              :
                              'py-1 mx-3'
                        :
                        'py-1 mx-3'
                    }
                  >
                    <Text className={
                      typeofstats === item
                        ?
                        item === 'temperature'
                          ?
                          'font-bold text-base text-red-500 '
                          :
                          item === 'humidity'
                            ?
                            'font-bold text-base text-blue-500'
                            :
                            item === 'light'
                              ?
                              'font-bold text-base text-yellow-500'
                              :
                              'font-bold text-base'
                        :
                        'font-bold text-base text-gray-300'
                    }
                    >{item}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>

        <View className='items-center mx-5 flex flex-col justify-around'>
          <View className='rounded-full px-3 my-4' style={styles.maincolorBG}>
            <Text className='text-base font-semibold text-white'>Today data</Text>
          </View>
          <ChartStats data={data} typeofstats={typeofstats} period={"day"} />
          
          <View className='rounded-full px-3 my-4' style={styles.maincolorBG}>
            <Text className='text-base font-semibold text-white'>This week data</Text>
          </View>
          <ChartStats data={data} typeofstats={typeofstats} period={"week"} />

          <View className='rounded-full px-3 my-4' style={styles.maincolorBG}>
            <Text className='text-base font-semibold text-white'>This month data</Text>
          </View>
          <ChartStats data={data} typeofstats={typeofstats} period={"month"} />
        </View>
      </ScrollView>
    </View>
  )
}

export default Statistics