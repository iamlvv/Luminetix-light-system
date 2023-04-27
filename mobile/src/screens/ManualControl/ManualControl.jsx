import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Switch } from 'react-native-gesture-handler';
import LightControl from './LightControl';
import FanControl from './FanControl';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import client from '../../mqtt/mqtt';

const ipaddress = process.env['IPADDRESS'];
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ManualControl" component={ManualControlHome} options={{ headerShown: false }} />
      <Stack.Screen name="LightControl" component={LightControl} options={{ headerShown: false }} />
      <Stack.Screen name="FanControl" component={FanControl} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function ManualControlHome({ navigation }) {
  const isFocused = useIsFocused(); 

  const [ledState, setLedState] = useState('#000000');
  const [prevLedState, setPrevLedState] = useState('#000000');
  const [fanState, setFanState] = useState('OFF');
  const [fanStat, setFanStat] = useState('0');
  const [toggleLed, setToggleLed] = useState(false);
  const [toggleFan, setToggleFan] = useState(false);

  const handleNotiBtn = () => {

  }
  const convertLedState = (ledState) => {
    switch (ledState) {
      case "#ffff00": return "Yellow";
      case "#ff0000": return "Red";
      case "#0000ff": return "Blue";
      case "#000000": return "OFF";

      default: return "";
    }
  }
  const handleLedToggle = () => {
    if (ledState !== "#000000") {
      if (client) {
          client.publish(
              "Tori0802/feeds/w-led",
              JSON.stringify({ value: "#000000" })
          );
      }
      setPrevLedState(ledState);
      setLedState("#000000");
      console.log(`prevLedState: ${prevLedState}`)
  }
  else {
      if (client) {
          client.publish(
              "Tori0802/feeds/w-led",
              JSON.stringify({ value: prevLedState })
          );
      }
      setLedState(prevLedState);
  }
    setToggleLed(!toggleLed);
  };

  const handleFanToggle = () => {
    if (fanState === "OFF" || fanStat === 0) {
      if (client) {
          client.publish(
              "Tori0802/feeds/w-fan",
              JSON.stringify({ value: 100 })
          );
      }
      setFanState("ON");
      setFanStat(100);
  } else {
      if (client) {
          client.publish(
              "Tori0802/feeds/w-fan",
              JSON.stringify({ value: 0 })
          );
      }
      setFanState("OFF");
      setFanStat(0);
  }
    setToggleFan(!toggleFan);
  };

  // Lấy dữ liệu từ server adafruit (Lần đầu tiên)
  const fetchDevices = async () => {
    try {
      const led_res = await axios.get("https://io.adafruit.com/api/v2/Tori0802/feeds/w-led/data")
      const fan_res = await axios.get("https://io.adafruit.com/api/v2/Tori0802/feeds/w-fan/data")
      const led_data = led_res.data[0].value;
      const fan_data = fan_res.data[0].value;
      // console.log(`fetchDevices: led_data ${convertLedState(led_data)} - fan_data ${fan_data}`);

      // Set state cho đèn theo dữ liệu từ server
      if (led_data !== "#000000") {
        setLedState(led_data);
        setToggleLed(true);
      }
      else {
        setLedState(led_data);
        setToggleLed(false);
      }

      //  Set state cho quạt theo dữ liệu từ server
      if (fan_data !== "0") {
        setFanState("ON");
        setFanStat(fan_data);
        setToggleFan(true);
      }
      else {
        setFanState("OFF");
        setFanStat(fan_data);
        setToggleFan(false);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  // Lấy dữ liệu (Lần đầu tiên)
  useEffect(() => {
    if (isFocused) {
      fetchDevices();
    }
  }, [isFocused]);

  return (
    <View className='h-5/6 mt-6 mx-3'>
      {/* Header */}
      <View className='flex flex-row mt-5 justify-center items-center'>
        {/* Back button */}
        <View className='items-center'>
          {/* <TouchableOpacity
            onPress={handleBackBtn}
          >
            <Ionicons name="chevron-back-outline" size={25} color="#5E44FF" />
          </TouchableOpacity> */}
        </View>
        {/* Profile title */}
        <View className='mx-auto' >
          <Text className='font-semibold text-2xl'>Manual control</Text>
        </View>
        {/* Noti button */}
        <View className='items-center' >
          {/* <TouchableOpacity
            onPress={handleNotiBtn}
          >
            <Ionicons name="notifications-outline" size={25} color="#5E44FF" />
          </TouchableOpacity> */}
        </View>
      </View>

      {/* Control light */}
      <View className='flex flex-row items-center mt-5 bg-violet-200 px-3 py-3 rounded-xl justify-between'>
        <TouchableOpacity onPress={() => navigation.navigate("LightControl")}>
          {/* Device info */}
          <View className='flex flex-row items-center'>
            <View className='rounded-xl p-3 bg-white'>
              <Ionicons name="bulb-outline" size={35} color="#5E44FF" />
            </View>
            <View className=''>
              <Text className='font-semibold text-xl mx-3'>Light</Text>
              <Text className=' text-md mx-3 text-gray-500'>{convertLedState(ledState)}</Text>
            </View>
          </View>
          {/* Device control */}
        </TouchableOpacity>
        <View>
          <Switch
            trackColor={{ false: '#767577', true: '#593EFF' }}
            thumbColor={toggleLed ? '#ffff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleLedToggle}
            value={toggleLed}
          />
        </View>
      </View>

      {/* Control fan */}
      <View className='flex flex-row items-center mt-5 bg-violet-200 px-3 py-3 rounded-xl justify-between'>
        <TouchableOpacity onPress={() => navigation.navigate("FanControl")}>
          {/* Device info */}
          <View className='flex flex-row items-center'>
            <View className='rounded-xl p-3 bg-white'>
              <Ionicons name="aperture-outline" size={35} color="#5E44FF" />
            </View>
            <View className=''>
              <Text className='font-semibold text-xl mx-3'>Fan</Text>
              <Text className='text-md mx-3 text-gray-500'>{fanStat === '0' ? fanState : fanStat}</Text>
            </View>
          </View>
        </TouchableOpacity>
        {/* Device control */}
        <View>
          <Switch
            trackColor={{ false: '#767577', true: '#593EFF' }}
            thumbColor={toggleFan ? '#ffff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleFanToggle}
            value={toggleFan}
          />
        </View>
      </View>
    </View>
  )
}

const ManualControl = () => {
  return (
    <MyStack />
  )
}

export default ManualControl