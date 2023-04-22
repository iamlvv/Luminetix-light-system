import { View, Text, Image, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { contextDetail } from '../../redux/actions/contextActions';
import { ScrollView, Switch, TextInput } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown'
import CheckBox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';

import axios from 'axios';
const ipaddress = "10.0.145.226";
const ContextInfo = ({ route }) => {
  const color = ["Red", "Blue", "Yellow"]
  const repeatList = ["Today", "Everyday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const id = route.params.id;

  const [toggleButtonTemp, setToggleButtonTemp] = React.useState(false);
  const [toggleButtonHum, setToggleButtonHum] = React.useState(false);
  const [toggleButtonHumanDetection, setToggleButtonHumanDetection] = React.useState(false);
  const [toggleButtonLED, setToggleButtonLED] = React.useState(false);
  const [toggleButtonFan, setToggleButtonFan] = React.useState(false);
  const [toggleButtonSystem, setToggleButtonSystem] = React.useState(false);
  const [toggleButtonLight, setToggleButtonLight] = React.useState(false);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [fromTemp, setFromTemp] = React.useState("");
  const [toTemp, setToTemp] = React.useState("");
  const [fromHum, setFromHum] = React.useState("");
  const [toHum, setToHum] = React.useState("");
  const [fromLight, setFromLight] = React.useState("");
  const [toLight, setToLight] = React.useState("");
  const [repeat, setRepeat] = React.useState("");
  const [starttime, setStartTime] = React.useState("");
  const [endtime, setEndTime] = React.useState("");
  const [LEDColor, setLEDColor] = React.useState("");
  const [fanLevel, setFanLevel] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [fanStatus, setFanStatus] = React.useState(false);
  const [LEDStatus, setLEDStatus] = React.useState(false);
  const [dateTime, setDateTime] = React.useState(false);
  useEffect(() => {
    getContextDetail(id);
  }, [dispatch, id])

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [mode1, setMode1] = useState('date');
  const [mode2, setMode2] = useState('date');
  const onChangeStartTime = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow1(false);
    setDate1(currentDate);
    temp = new Date(currentDate);
    setStartTime(temp.getUTCHours() + 7 + ":" + temp.getUTCMinutes())
  };
  const onChangeEndTime = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow2(false);
    setDate2(currentDate);
    temp = new Date(currentDate);
    setEndTime(temp.getUTCHours() + 7 + ":" + temp.getUTCMinutes())
  };
  const showMode1 = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow1(true);
    }
    setMode1(currentMode);
  };
  const showMode2 = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow2(true);
    }
    setMode2(currentMode);
  }
  const showTimepicker1 = () => {
    showMode1('time');
  };
  const showTimepicker2 = () => {
    showMode2('time');
  }
  const getContextDetail = async (id) => {

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.get(`http://${ipaddress}:5000/api/contexts`, config);
      const data = response.data.find(x => x._id == id);
      setName(data.name)
      setDescription(data.description)
      setFromTemp(data.input.active_temperature.min)
      setToTemp(data.input.active_temperature.max)
      setFromHum(data.input.active_humidity.min)
      setToHum(data.input.active_humidity.max)
      setRepeat(data.output.frequency.today)
      setToggleButtonTemp(data.input.active_temperature.active)
      setToggleButtonHum(data.input.active_humidity.active)
      setToggleButtonHumanDetection(data.input.human_detection.active)
      setToggleButtonLight(data.input.active_light.active)
      setToggleButtonLED(data.output.control_led[0].status)
      setToggleButtonFan(data.output.control_fan[0].status)
      setRepeat(data.output.frequency.today ? "Today" : data.output.frequency.repeat.daily ? "Everyday" : data.output.frequency.weekly[0] ? "Monday" : data.output.frequency.weekly[1] ? "Tuesday" : data.output.frequency.weekly[2] ? "Wednesday" : data.output.frequency.weekly[3] ? "Thursday" : data.output.frequency.weekly[4] ? "Friday" : data.output.frequency.weekly[5] ? "Saturday" : data.output.frequency.weekly[6] ? "Sunday" : "")
      setStartTime(data.output.active_time.start_time)
      setEndTime(data.output.active_time.end_time)
    }

    catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    dispatch(contextDetail(id));
  }, [dispatch, id])

  const handleSubmit = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    var input = {
      active_temperature: {
        min: parseInt(fromTemp),
        max: parseInt(toTemp),
        active: toggleButtonTemp,
      },
      active_light: {
        min: parseInt(fromLight),
        max: parseInt(toLight),
        active: toggleButtonLight,
      },
      active_humidity: {
        min: parseInt(fromHum),
        max: parseInt(toHum),
        active: toggleButtonHum,
      },
      human_detection: {
        value: toggleButtonHumanDetection,
        active: toggleButtonHumanDetection,
      },
    }
    var output = {
      frequency: {
        today: repeat === "Today" ? true : false,
        repeat: {
          daily: repeat === 'Everyday' ? true : false,
          weekly: false,
          adjust_weekly: {
            monday: repeat === 'Monday' ? true : false,
            tuesday: repeat === 'Tuesday' ? true : false,
            wednesday: repeat === 'Wednesday' ? true : false,
            thursday: repeat === 'Thursday' ? true : false,
            friday: repeat === 'Friday' ? true : false,
            saturday: repeat === 'Saturday' ? true : false,
            sunday: repeat === 'Sunday' ? true : false,
          }
        }
      },
      active_time: {
        start_time: starttime,
        end_time: endtime,
      },
      control_led: [
        {
          name: 'LED',
          status: toggleButtonLED,
          value: LEDColor === 'Red' ? "#ff0000" : LEDColor === 'Blue' ? "#0000ff" : LEDColor === 'Yello' ? "#ffff00" : "#ffffff",
        }
      ],
      control_fan: [
        {
          name: 'Fan',
          status: toggleButtonFan,
          value: fanSpeed,
        }
      ],
      notification: {
        email: email,
        message: message,
        included_info: {
          fan_status: fanStatus !== "" ? true : false,
          light_status: LEDStatus !== "" ? true : false,
          date_time: dateTime !== "" ? true : false,
        }
      }
    }
    fetch(`http://${ipaddress}:5000/api/contexts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        input: input,
        output: output,
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      }
      )
      .catch((error) => {
        //console.error('Error:', error);
        alert("Error: " + error)
      }
      );
  }
  return (
    <View>
      <ScrollView>
        <View className='bg-white mt-5 rounded-2xl ml-5 mr-5 p-5'>
          <Text className='ml-5 mt-2 font-bold'>Context name</Text>
          <TextInput value={name || ""} onChangeText={(text) => setName(text)}
            className='ml-5 mr-5 mt-2 rounded-2xl border border-gray-200 p-2'
          />
          <Text className='ml-5 mt-2 font-bold'>Context Description</Text>
          <TextInput value={description || ""} onChangeText={(text) => setDescription(text)}
            className='ml-5 mr-5 mt-2 rounded-2xl border border-gray-200 p-2'
          />
        </View>
        <Text className='font-bold text-xl bg-white ml-5 mr-5 mt-10 p-5 rounded-2xl mb-5'>Input</Text>
        <View className="flex flex-1 justify-center gap-2 flex-row ml-3 mr-3">
          <View className='flex flex-col rounded-2xl shadow-lg p-2 flex-1 items-center bg-white'>
            <View className='items-center'>
              <Switch value={toggleButtonTemp} onValueChange={() => setToggleButtonTemp(!toggleButtonTemp)}
                trackColor={{ false: '#E3E5E5', true: '#593EFF' }}
                thumbColor={toggleButtonTemp ? '#f4f3f4' : '#593EFF'}
              />
              <Text className='items-center mt-3 mb-3'>Temperature</Text>
            </View>
            <View className='flex flex-row items-center'>
              <Text>From</Text>
              <TextInput value={fromTemp || ""} onChangeText={(text) => setFromTemp(text)}
                className='border border-gray-200 rounded-sm mr-1'
              />
              <Text>To</Text>
              <TextInput value={toTemp || ""} onChangeText={(text) => setToTemp(text)}
                className='border border-gray-200 rounded-sm mr-1'
              />
            </View>
          </View>
          <View className='flex flex-col rounded-2xl shadow-lg p-2 flex-1 items-center bg-white'>
            <View className='items-center'>
              <Switch value={toggleButtonHum} onValueChange={() => setToggleButtonHum(!toggleButtonHum)}
                trackColor={{ false: '#E3E5E5', true: '#593EFF' }}
                thumbColor={toggleButtonHum ? '#f4f3f4' : '#593EFF'}
              />
              <Text className='mt-3 mb-3'>Humidity</Text>
            </View>
            <View className='flex flex-row items-center'>
              <Text>From</Text>
              <TextInput value={fromHum || ""} onChangeText={(text) => setFromHum(text)}
                className='border border-gray-200 rounded-sm mr-1'
              />
              <Text>To</Text>
              <TextInput value={toHum || ""} onChangeText={(text) => setToHum(text)}
                className='border border-gray-200 rounded-sm mr-1'
              />
            </View>
          </View>
          <View className='flex flex-col rounded-2xl shadow-lg p-2 flex-1 items-center bg-white'>
            <View className='items-center'>

              <Switch value={toggleButtonLight} onValueChange={() => setToggleButtonLight(!toggleButtonLight)}
                trackColor={{ false: '#E3E5E5', true: '#593EFF' }}
                thumbColor={toggleButtonLight ? '#f4f3f4' : '#593EFF'}
              />
              <Text className='mt-3 mb-3'>Light</Text>
            </View>
            <View className='flex flex-row items-center'>
              <Text>From</Text>
              <TextInput value={fromLight || ""} onChangeText={(text) => setFromLight(text)}
                className='border border-gray-200 rounded-sm mr-1'
              />
              <Text>To</Text>
              <TextInput value={toLight || ""} onChangeText={(text) => setToLight(text)}
                className='border border-gray-200 rounded-sm mr-1'
              />
            </View>
          </View>
        </View>
        <View className='items-center mt-5'>
          <View className='flex flex-row items-center justify-center bg-white rounded-2xl w-2/3 mb-5 ml-5 mr-5 p-5'>
            <Text className=''>Detect People</Text>
            <Switch value={toggleButtonHumanDetection} onValueChange={() => setToggleButtonHumanDetection(!toggleButtonHumanDetection)}
              trackColor={{ false: '#E3E5E5', true: '#593EFF' }}
              thumbColor={toggleButtonHumanDetection ? '#f4f3f4' : '#593EFF'}
            />
          </View>
        </View>
        <View className='flex flex-1 items-center justify-between flex-row bg-white mt-1 ml-5 mr-5 rounded-2xl p-5'>
          <View className='items-center flex flex-col gap-4'>
            <Text>Start time : {starttime}</Text>
            {/* <TextInput value={starttime || ""} onChangeText={(text) => setStartTime(text)} /> */}
            <TouchableOpacity onPress={showTimepicker1}
              className='bg-violet-500 rounded-2xl p-2'
            >
              <Text className='text-white font-bold'>Show start time</Text>
            </TouchableOpacity>
            {show1 && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date1}
                mode={mode1}
                is24Hour={true}
                onChange={onChangeStartTime}
              />
            )}
          </View>
          <View className='items-center flex flex-col gap-4'>
            <Text>End time : {endtime}</Text>
            {/* <TextInput value={endtime || ""} onChangeText={(text) => setEndTime(text)} /> */}
            <TouchableOpacity onPress={showTimepicker2}
              className='bg-violet-500 rounded-2xl p-2'
            >
              <Text className='text-white font-bold'>Show end time</Text>
            </TouchableOpacity>
            {show2 && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date2}
                mode={mode2}
                is24Hour={true}
                onChange={onChangeEndTime}
              />
            )}
          </View>
        </View>
        <View className='bg-white mt-5 mb-5 p-5 items-center rounded-2xl ml-5 mr-5'>
          <Text className=' mb-5'>Repeat: {repeat}</Text>
          {/* <TextInput value={repeat || ""} onChangeText={(text) => setRepeat(text)} /> */}
          <SelectDropdown
            data={repeatList}
            onSelect={(selectedItem, index) => {
              setRepeat(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              return item
            }}
            buttonTextStyle={{ color: '#000', fontSize: 12 }}
            buttonStyle={{ width: 150, height: 40, backgroundColor: '#fff', borderRadius: 5, borderWidth: 1, borderColor: '#ccc', justifyContent: 'center', alignItems: 'center' }}
          />
        </View>
        <Text className='font-bold text-xl bg-white ml-5 mr-5 mt-5 p-5 rounded-2xl mb-5'>Output</Text>
        <View className='bg-white rounded-2xl ml-5 mr-5 p-5'>
          <View className='flex flex-1 justify-center flex-row'>
            <View className='flex flex-1 justify-center flex-col items-center'>
              <View className='flex flex-1 flex-row items-center gap-9'>
                <View>
                  <Image source={require('../../images/led.png')} />
                  <Text>LED</Text>
                </View>
                <Switch value={toggleButtonLED} onValueChange={() => setToggleButtonLED(!toggleButtonLED)} />
              </View>
              <View className='mt-5'>
                <SelectDropdown
                  data={color}
                  onSelect={(selectedItem, index) => {
                    setLEDColor(selectedItem)
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {
                    return item
                  }}
                  buttonTextStyle={{ color: '#000', fontSize: 12 }}
                  buttonStyle={{ width: 100, height: 40, backgroundColor: '#fff', borderRadius: 5, borderWidth: 1, borderColor: '#ccc', justifyContent: 'center', alignItems: 'center' }}
                />
              </View>
            </View>
            <View className='flex flex-1 justify-center flex-col items-center'>
              <View className='flex flex-1 flex-row items-center gap-9'>
                <View>
                  <Image source={require('../../images/fan.png')} />
                  <Text>Fan</Text>
                </View>
                <Switch value={toggleButtonFan} onValueChange={() => setToggleButtonFan(!toggleButtonFan)} />
              </View>
              <View className='mt-5'>
                <TextInput value={fanLevel || ""} onChangeText={(text) => setFanLevel(text)}
                  className='border border-gray-200 rounded-sm mr-1'
                />
              </View>
            </View>
          </View>
          <View className='mt-5'>
            <View>
              <Text>Message</Text>
              <TextInput value={message || ""} onChangeText={(text) => setMessage(text)}
                className='border border-gray-200 rounded-2xl mr-1 mt-2 mb-2'
              />
              <Text>Email</Text>
              <TextInput value={email || ""} onChangeText={(text) => setEmail(text)}
                className='border border-gray-200 rounded-2xl mr-1 mt-2 mb-2'
              />
              <View className='flex flex-1 gap-5 flex-col'>
                <View className='flex flex-1 gap-2 flex-row'>
                  <CheckBox
                    disabled={false}
                    value={fanStatus}
                    onValueChange={(newValue) => setFanStatus(newValue)}
                  />
                  <Text>Fan Status</Text>
                </View>
                <View className='flex flex-1 gap-2 flex-row'>
                  <CheckBox
                    disabled={false}
                    value={LEDStatus}
                    onValueChange={(newValue) => setLEDStatus(newValue)}
                  />
                  <Text>LED Status</Text>
                </View>
                <View className='flex flex-1 gap-2 flex-row'>
                  <CheckBox
                    disabled={false}
                    value={dateTime}
                    onValueChange={(newValue) => setDateTime(newValue)}
                  />
                  <Text>Date and Time</Text>
                </View>
              </View>
            </View>
            <View className='items-center mt-5'>
              <TouchableOpacity className='bg-violet-500 py-2 px-3 rounded-2xl'
                onPress={handleSubmit}
              >
                <Text className='text-white font-bold text-xl'>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default ContextInfo