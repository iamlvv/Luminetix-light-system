import { View, Text, Image, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ScrollView, Switch, TextInput } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown'
import CheckBox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
const url = process.env.REACT_APP_API_URL;
const ContextInfo = ({ route }) => {
  const navigation = useNavigation();
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
  const color = ["Red", "Blue", "Yellow"]
  const repeatList = ["Today", "Everyday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
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
  }, [id])

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
      const response = await axios.get(`${url}/contexts`, config);
      const data = response.data.find(x => x._id == id);
      setName(data.name)
      setDescription(data.description)
      setLEDColor(data.output.control_led.length > 0 ? data.output.control_led[0].value.toString() : "")
      setFanLevel(data.output.control_fan.length > 0 ? data.output.control_fan[0].value.toString() : "")
      setEmail(data.notification.email ? data.notification.email : "")
      setMessage(data.notification.message ? data.notification.message : "")
      setFanStatus(data.notification.included_info.fan_status)
      setLEDStatus(data.notification.included_info.light_status)
      setDateTime(data.notification.included_info.date_time)
      setFromTemp(data.input.active_temperature.min ? data.input.active_temperature.min.toString() : "")
      setToTemp(data.input.active_temperature.max ? data.input.active_temperature.max.toString() : "")
      setFromHum(data.input.active_humidity.min ? data.input.active_humidity.min.toString() : "")
      setToHum(data.input.active_humidity.max ? data.input.active_humidity.max.toString() : "")
      setFromLight(data.input.active_light.min ? data.input.active_light.min.toString() : "")
      setToLight(data.input.active_light.max ? data.input.active_light.max.toString() : "")
      setToggleButtonTemp(data.input.active_temperature.active)
      setToggleButtonHum(data.input.active_humidity.active)
      setToggleButtonHumanDetection(data.input.human_detection.active)
      setToggleButtonLight(data.input.active_light.active)
      setRepeat(data.output.frequency.no_repeat ? "Today" : data.output.frequency.repeat.daily ? "Everyday" : 
      data.output.frequency.repeat.adjust_weekly.monday ? "Monday" : data.output.frequency.repeat.adjust_weekly.tuesday ? "Tuesday" : 
      data.output.frequency.repeat.adjust_weekly.wednesday ? "Wednesday" : data.output.frequency.repeat.adjust_weekly.thursday ? "Thursday" : 
      data.output.frequency.repeat.adjust_weekly.friday ? "Friday" : data.output.frequency.repeat.adjust_weekly.saturday ? "Saturday" : data.output.frequency.repeat.adjust_weekly.sunday ? "Sunday" : "")
      setStartTime(data.output.active_time.start_time)
      setEndTime(data.output.active_time.end_time)
      setToggleButtonLED(data.output.control_led.length > 0 ? data.output.control_led[0].status : false)
      setToggleButtonFan(data.output.control_fan.length > 0 ? data.output.control_fan[0].status : false)
      
    }

    catch (error) {
      console.log(error)
    }

  }

  const handleSubmit = async () => {
    if (name === "") {
      alert("Please fill in the name");
      return;
    }
    if (toggleButtonTemp && (fromTemp === "" || toTemp === "" || parseInt(fromTemp) > parseInt(toTemp) || parseInt(toTemp) == 0 || parseInt(fromTemp) < 0 || parseInt(toTemp) > 100 || parseInt(toTemp) < 0)) {
      alert("Please check temperature range");
      return;
    }
    if (toggleButtonHum && (fromHum === "" || toHum === "" || parseInt(fromHum) > parseInt(toHum) || parseInt(fromHum) < 0 || parseInt(toHum) > 100 || parseInt(toHum) == 0 || parseInt(toHum) < 0)) {
      alert("Please check humidity range");
      return;
    }
    if (toggleButtonLight && (fromLight === "" || toLight === "" || parseInt(fromLight) > parseInt(toLight) || parseInt(fromLight) < 0 || parseInt(toLight) > 100 || parseInt(toLight) == 0 || parseInt(toLight) < 0)) {
      alert("Please check light range");
      return;
    }
    if ((message === "" && email !== "") || (message !== "" && email === "")) {
      alert("Please fill in both email and message");
      return;
    }
    if (toggleButtonFan && (fanLevel === "" || parseInt(fanLevel) <= 0 || parseInt(fanLevel) > 100)) {
      alert("Please check fan speed");
      return;
    }
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
        today: (repeat === "Today" || !repeat) ? true : false,
        repeat: {
          daily: repeat === 'Everyday' ? true : false,
          weekly: repeat in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] ? true : false,
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
          value: LEDColor === 'Red' ? "#ff0000" : LEDColor === 'Blue' ? "#0000ff" : LEDColor === 'Yellow' ? "#ffff00" : "#000000",
        }
      ],
      control_fan: [
        {
          name: 'Fan',
          status: toggleButtonFan,
          value: fanLevel,
        }
      ]
    }
    var notification = {
      email: email,
      message: message,
      included_info: {
        fan_status: fanStatus !== "" ? true : false,
        light_status: LEDStatus !== "" ? true : false,
        date_time: dateTime !== "" ? true : false,
      }
    }
    fetch(`${url}/contexts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({
        name, description, input, output, notification
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
      {/* Header */}
      <View className='flex flex-row mt-10 justify-center items-center'>
        <View className='items-center'>
          <TouchableOpacity onPress={() => navigation.navigate("ContextHome")} className='items-center ml-5 flex flex-row'>
            <Ionicons name="chevron-back-outline" size={25} color="#5E44FF" />
          </TouchableOpacity>
        </View>
        {/* Title */}
        <View View className='mx-auto' >
          <Text className='font-semibold text-2xl'>Context setup</Text>
        </View>
        {/* Noti button */}
        <View View className='items-center mr-5' >
          <TouchableOpacity
            onPress={() => { }}
          >
            <Ionicons name="notifications-outline" size={25} color="#5E44FF" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView className='mb-24'>
        {/* Context info */}
        <View className='bg-white mt-5 rounded-xl mx-5 p-2'>
          <Text className='m-2 font-bold'>Context name</Text>
          <TextInput value={name || ""} onChangeText={(text) => setName(text)}
            className='mx-2 mb-2 rounded-lg border border-gray-200 p-2'
          />
          <Text className='m-2 font-bold'>Context Description</Text>
          <TextInput value={description || ""} onChangeText={(text) => setDescription(text)}
            className='mx-2 mb-2 rounded-lg border border-gray-200 p-2'
          />
        </View>
        {/* Input heading*/}
        <View className='flex flex-row justify-between mx-5 mt-3 mb-1'>
          <View className=' rounded-2xl px-5 py-1' style={styles.secondarycolorBG}>
            <Text className='font-bold text-xl rounded-xl' style={styles.maincolorTXT}>Input information</Text>
          </View>
        </View>
        {/* Sensor setting */}
        <View className="flex flex-row mx-3 items-center">
          {/* Temp and humidity sensor*/}
          <View className='flex flex-col'>
            {/* Temperature sensor*/}
            <View className='rounded-xl p-2 bg-white m-2'>
              <View className='flex flex-row items-center justify-between'>
                <Text className='m-2 text-base font-semibold'>Temperature</Text>
                <Switch value={toggleButtonTemp} onValueChange={() => setToggleButtonTemp(!toggleButtonTemp)}
                  trackColor={{ false: '#E3E5E5', true: '#593EFF' }}
                  thumbColor={toggleButtonTemp ? '#f4f3f4' : '#593EFF'}
                />
              </View>
              {/* Input for temp */}
              <View className='flex flex-col items-center justify-between m-2'>
                {/* From */}
                <View className='flex flex-row items-center justify-between'>
                  <Text className='w-10'>From</Text>
                  <TextInput value={fromTemp ? fromTemp : "" || ""} onChangeText={(text) => setFromTemp(text)}
                    className='border border-gray-200 rounded-lg w-20 ml-1 my-1 px-2'
                    keyboardType='numeric'
                  />
                </View>
                {/* To */}
                <View className='flex flex-row items-center justify-between'>
                  <Text className='w-10'>To</Text>
                  <TextInput value={toTemp || ""} onChangeText={(text) => setToTemp(text)}
                    className='border border-gray-200 rounded-lg w-20 ml-1 my-1 px-2'
                    keyboardType='numeric'
                  />
                </View>
              </View>
            </View>

            {/* Humidity sensor*/}
            <View className='bg-white rounded-xl p-2 m-2'>
              <View className='items-center flex flex-row justify-between'>
                <Text className='m-2 text-base font-semibold'>Humidity</Text>
                <Switch value={toggleButtonHum} onValueChange={() => setToggleButtonHum(!toggleButtonHum)}
                  trackColor={{ false: '#E3E5E5', true: '#593EFF' }}
                  thumbColor={toggleButtonHum ? '#f4f3f4' : '#593EFF'}
                />
              </View>
              {/* Input humidity */}
              <View className='flex flex-col items-center justify-between m-2'>
                {/* From */}
                <View className='flex flex-row items-center justify-between'>
                  <Text className='w-10'>From</Text>
                  <TextInput value={fromHum ? fromHum : "" || ""} onChangeText={(text) => setFromHum(text)}
                    className='border border-gray-200 rounded-lg w-20 ml-1 my-1 px-2'
                    keyboardType='numeric'
                  />
                </View>
                {/* To */}
                <View className='flex flex-row items-center justify-between'>
                  <Text className='w-10'>To</Text>
                  <TextInput value={toHum || ""} onChangeText={(text) => setToHum(text)}
                    className='border border-gray-200 rounded-lg w-20 ml-1 my-1 px-2'
                    keyboardType='numeric'
                  />
                </View>
              </View>
            </View>
          </View>

          {/* light and human dect */}
          <View className='flex flex-col'>
            {/* Light */}
            <View className='bg-white rounded-xl p-2 m-2'>
              <View className='items-center flex flex-row justify-between'>
                <Text className='m-2 text-base font-semibold'>Light</Text>
                <Switch value={toggleButtonLight} onValueChange={() => setToggleButtonLight(!toggleButtonLight)}
                  trackColor={{ false: '#E3E5E5', true: '#593EFF' }}
                  thumbColor={toggleButtonLight ? '#f4f3f4' : '#593EFF'}
                />
              </View>
              {/* Input light */}
              <View className='flex flex-col items-center justify-between m-2'>
                {/* From */}
                <View className='flex flex-row items-center justify-between'>
                  <Text className='w-10'>From</Text>
                  <TextInput value={fromLight ? fromLight : "" || ""} onChangeText={(text) => setFromLight(text)}
                    className='border border-gray-200 rounded-lg w-20 ml-1 my-1 px-2'
                    keyboardType='numeric'
                  />
                </View>
                {/* To */}
                <View className='flex flex-row items-center justify-between'>
                  <Text className='w-10'>To</Text>
                  <TextInput value={toLight || ""} onChangeText={(text) => setToLight(text)}
                    className='border border-gray-200 rounded-lg w-20 ml-1 my-1 px-2'
                    keyboardType='numeric'
                  />
                </View>
              </View>
            </View>

            {/* Human Detection */}
            <View className='bg-white rounded-xl p-2 m-2 py-14'>
              <View className='flex flex-row items-center justify-between'>
                <Text className='m-2 text-base font-semibold'>Detect People</Text>
                <Switch value={true} onValueChange={() => setToggleButtonHumanDetection(true)}
                  trackColor={{ false: '#E3E5E5', true: '#593EFF' }}
                  thumbColor={toggleButtonHumanDetection ? '#f4f3f4' : '#593EFF'}
                />
              </View>
            </View>
          </View>
        </View>

        <View className='flex flex-row mx-3'>
          {/* Time for scheduling */}
          <View className='flex items-center flex-col bg-white m-2 rounded-xl p-3'>
            {/* Start time */}
            <View className='items-center flex flex-row m-2 gap-1 justify-between'>
              <Text className='text-base font-semibold'>Start time</Text>
              <TouchableOpacity onPress={showTimepicker1}>
                <Text className='border rounded-lg w-16 border-gray-200 p-2'>
                  {starttime}
                </Text>
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
            {/* End time */}
            <View className='items-center flex flex-row m-2 gap-1 justify-between'>
              <Text className='text-base font-semibold mx-2'>End time</Text>
              <TouchableOpacity onPress={showTimepicker2}>
                <Text className='border rounded-lg w-16 border-gray-200 p-2'>
                  {endtime}
                </Text>
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
          {/* Repeat */}
          <View className='bg-white m-2 flex flex-col justify-between items-center rounded-2xl p-6'>
            <Text className='text-base font-semibold'>Repeat: {repeat}</Text>
            <SelectDropdown
              data={repeatList}
              onSelect={(selectedItem, index) => {
                setRepeat(selectedItem)
              }}
              defaultValue={repeat}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
              buttonTextStyle={{ color: '#000', fontSize: 12 }}
              buttonStyle={{ width: 135, height: 35, backgroundColor: '#fff', borderRadius: 5, borderWidth: 1, borderColor: '#ccc', justifyContent: 'center', alignItems: 'center' }}
            />
          </View>
        </View>

        {/* Output heading*/}
        <View className='flex flex-row justify-between mx-5 mt-3 mb-1'>
          <View className='rounded-2xl px-5 py-1' style={styles.secondarycolorBG}>
            <Text className='font-bold text-xl rounded-xl' style={styles.maincolorTXT}>Output information</Text>
          </View>
        </View>

        {/* Device control */}
        <View className='flex flex-row items-center justify-between'>
          {/* Light control */}
          <View className='flex flex-col items-center justify-between bg-white my-5 ml-5 rounded-xl'>
            <View className='flex flex-row px-4 pt-3'>
              <View className='flex flex-col items-center justify-center mr-12 px-2'>
                <Image source={require('../../images/led.png')} />
                <Text className='text-sm font-bold'>LED</Text>
              </View>
              <Switch value={toggleButtonLED} onValueChange={() => setToggleButtonLED(!toggleButtonLED)}
                trackColor={{ false: '#E3E5E5', true: '#593EFF' }}
                thumbColor={toggleButtonLED ? '#f4f3f4' : '#593EFF'}
              />
            </View>
            <View className='p-6'>
              <SelectDropdown
                data={color}
                onSelect={(selectedItem, index) => {
                  setLEDColor(selectedItem)
                }}
                defaultValue={LEDColor}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                  return item
                }}
                buttonTextStyle={{ color: '#000', fontSize: 12 }}
                buttonStyle={{ width: 100, height: 35, backgroundColor: '#fff', borderRadius: 5, borderWidth: 1, borderColor: '#ccc', justifyContent: 'center', alignItems: 'center' }}
              />
            </View>
          </View>
          {/* Fan control */}
          <View className='flex flex-col items-center justify-between bg-white my-5 mr-6 rounded-xl'>
            <View className='flex flex-row px-4 pt-3'>
              <View className='flex flex-col items-center justify-center mr-14 px-2'>
                <Image source={require('../../images/fan.png')} className='m-1' />
                <Text className='text-sm font-bold'>FAN</Text>
              </View>
              <Switch value={toggleButtonFan} onValueChange={() => setToggleButtonFan(!toggleButtonFan)}
                trackColor={{ false: '#E3E5E5', true: '#593EFF' }}
                thumbColor={toggleButtonFan ? '#f4f3f4' : '#593EFF'}
              />
            </View>
            <View className='p-5'>
              <TextInput value={fanLevel || ""} onChangeText={(text) => setFanLevel(text)}
                className='border border-gray-300 rounded-md w-24 my-1 py-1 px-5 text-center'
                keyboardType='numeric'
              />
            </View>
          </View>
        </View>

        {/* Message control */}
        <View>
          {/* Message input */}
          <View className='flex flex-col justify-center mx-5 bg-white p-5 rounded-xl'>
            <Text className='text-base font-bold'>Message</Text>
            <TextInput value={message || ""} onChangeText={(text) => setMessage(text)}
              className='border border-gray-200 rounded-xl mr-1 my-2 py-2 px-5'
              placeholder='Enter your message'
            />
          </View>
          {/* Email address */}
          <View className='flex flex-col justify-center mx-5 my-5 bg-white p-5 rounded-xl'>
            <Text className='text-base font-bold'>Email</Text>
            <TextInput value={email || ""} onChangeText={(text) => setEmail(text)}
              className='border border-gray-200 rounded-xl mr-1 my-2 py-2 px-5'
              keyboardType='email-address'
              placeholder='Enter your email'
            />
          </View>
          {/* Device status option */}
          <View className='flex flex-row justify-around mx-5 mt-1 mb-5 bg-white p-5 rounded-xl'>
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
        {/* Save button */}
        <View className='flex flex-row items-center justify-center'>
          <TouchableOpacity className='py-2 px-10 rounded-xl'
            onPress={handleSubmit}
            style={styles.maincolorBG}
          >
            <Text className='font-bold text-xl text-white' style={styles.maincolorBG}>Save</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  )
}

export default ContextInfo