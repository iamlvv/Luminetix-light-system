import { View, Text, Switch, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import client from '../../../mqtt/mqtt';
import { useIsFocused } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import { getHumidityStatFirst, getHumidityStateFirst, getLightStatFirst, getLightStateFirst, getTemperatureStatFirst, getTemperatureStateFirst, turnOffHumidity, turnOffLight, turnOffTemperature, turnOnHumidity, turnOnLight, turnOnTemperature } from '../../../redux/actions/deviceActions';
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

const getHumidityState = (handleget) => {
    client.subscribe("Tori0802/feeds/w-s-humi");
    client.on("message", function (topic, message) {
        if (topic === "Tori0802/feeds/w-s-humi") {

            const value = message.toString();
            if (value === "H_ON") {
                handleget(true);
            }
            else if (value === "H_OFF") {
                handleget(false);
            }
        }
    });
}
const getTemperatureState = (handleget) => {
    client.subscribe("Tori0802/feeds/w-s-temp");
    client.on("message", function (topic, message) {
        if (topic === "Tori0802/feeds/w-s-temp") {
            const value = message.toString();
            if (value === "T_ON") {
                handleget(true);
            }
            else if (value === "T_OFF") {
                handleget(false);
            }
        }
    });
}

const getLightState = (handleget) => {
    client.subscribe("Tori0802/feeds/w-s-light");
    client.on("message", function (topic, message) {
        if (topic === "Tori0802/feeds/w-s-light") {
            const value = message.toString();
            if (value === "L_ON") {
                handleget(true);
            }
            else if (value === "L_OFF") {
                handleget(false);
            }
        }
    });
}

const FrequentlyUsedDevices = () => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    //get data from sensors through redux
    //get data from sensors through redux in first render
    const TempStatFirst = useSelector((state) => state.temperatureStatFirst);
    const HumidStatFirst = useSelector((state) => state.humidityStatFirst);
    const LightStatFirst = useSelector((state) => state.lightStatFirst);

    const { temperatureStatFirst } = TempStatFirst;
    const { humidityStatFirst } = HumidStatFirst;
    const { lightStatFirst } = LightStatFirst;

    //get data from state of devices through redux in first render
    const TempStateFirst = useSelector((state) => state.temperatureStateFirst);
    const HumidityStateFirst = useSelector((state) => state.humidityStateFirst);
    const LightStateFirst = useSelector((state) => state.lightStateFirst);

    const { temperatureStateFirst } = TempStateFirst;
    const { humidityStateFirst } = HumidityStateFirst;
    const { lightStateFirst } = LightStateFirst;

    const [toggleButton1, setToggleButton1] = React.useState(false);
    const [toggleButton2, setToggleButton2] = React.useState(false);
    const [toggleButton3, setToggleButton3] = React.useState(false);

    const [lStat, setLStat] = React.useState("0");
    const [tStat, setTStat] = React.useState("0");
    const [hStat, setHStat] = React.useState("0");

    const [lState, setLState] = React.useState(null);
    const [tState, setTState] = React.useState(null);
    const [hState, setHState] = React.useState(null);
    useEffect(() => {

        dispatch(getTemperatureStateFirst());
        dispatch(getTemperatureStatFirst());
        dispatch(getHumidityStatFirst());
        dispatch(getHumidityStateFirst());
        dispatch(getLightStatFirst());
        dispatch(getLightStateFirst());
        // Get Stat and State using MQTT
        getHumidityStatistics(setHStat);
        getTemperatureStatistics(setTStat);
        getLightStatistics(setLStat);
        getHumidityState(setHState);
        getTemperatureState(setTState);
        getLightState(setLState);
    }, [isFocused])
    useEffect(() => {
        if (temperatureStateFirst && tState === null) {
            setToggleButton3(temperatureStateFirst);
        }
        else if (tState !== null) {
            setToggleButton3(tState);
        }
        if (humidityStateFirst && hState === null) {
            setToggleButton1(humidityStateFirst);
        }
        else if (hState !== null) {
            setToggleButton1(hState);
        }
        if (lightStateFirst && lState === null) {
            setToggleButton2(lightStateFirst);
        }
        else if (lState !== null) {
            setToggleButton2(lState);
        }
    }, [tState, hState, lState, temperatureStateFirst, humidityStateFirst, lightStateFirst]);
    const handleChangeTempState = () => {
        //Nếu true thì tắt đèn đi (true == sáng)
        if (toggleButton3 === true) {
          dispatch(turnOffTemperature());
          setToggleButton3(false);
    
        } else if (toggleButton3 === false) {
          dispatch(turnOnTemperature());
          setToggleButton3(true);
        }
      }
      const handleChangeHumidState = () => {
        //Nếu true thì tắt cảm biến độ ẩm đi (true == đang bật)
        if (toggleButton1 === true) {
          dispatch(turnOffHumidity());
          setToggleButton1(false);
        } else if (toggleButton1 === false) {
    
          dispatch(turnOnHumidity());
          setToggleButton1(true);
        }
      }
    
      const handleChangeLightState = () => {
        //Nếu true thì tắt cảm biến ánh sáng đi (true == đang bật)
        if (toggleButton2 === true) {
          dispatch(turnOffLight());
          setToggleButton2(false);
        } else if (toggleButton2 === false) {
          dispatch(turnOnLight());
          setToggleButton2(true);
        }
      }

    return (
        <View className='mb-20'>
            <ScrollView>
                <View className="flex flex-col my-2 gap-5">
                    {/* Temperature */}
                    <View className='bg-white rounded-xl items-center flex flex-row justify-around'>
                        <View className='flex flex-col items-center'>
                            <Text className='font-bold text-xl mx-5'>Temperature</Text>
                            <Text className='font-bold text-xl mx-5'>sensor</Text>
                            <Text className='text-gray-400 text-xs italic'>Value range from 0°C to 100°C</Text>
                        </View>
                        <View className='flex flex-col items-center justify-center mt-3 mr-4'>
                            <AnimatedCircularProgress
                                size={100}
                                width={8}
                                fill={tStat === "0" ? temperatureStatFirst : tStat}
                                rotation={235}
                                arcSweepAngle={250}
                                lineCap="round"
                                tintColor="#FE4F60"
                                duration={500}
                                backgroundColor="#3d5875">
                                {
                                    () => (
                                        <Text className='text-lg px-6 py-5 rounded-full text-red-500 font-bold'>{tStat === "0" ? temperatureStatFirst : tStat}</Text>
                                    )
                                }
                            </AnimatedCircularProgress>
                            <Switch
                                trackColor={{ false: '#767577', true: '#593EFF' }}
                                thumbColor={toggleButton3 ? '#ffff' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={handleChangeTempState}
                                value={toggleButton3}
                            />
                        </View>
                    </View>
                    {/* Humidity */}
                    <View className='bg-white rounded-xl items-center flex flex-row justify-around'>
                        <View className='flex flex-col items-center'>
                            <Text className='font-bold text-xl '>Humidity sensor</Text>
                            <Text className='text-gray-400 text-xs italic'>Value range from 0% to 100%</Text>
                        </View>
                        <View className='flex flex-col items-center justify-center mt-3 mr-4'>
                            <AnimatedCircularProgress
                                size={100}
                                width={8}
                                fill={hStat === "0" ? humidityStatFirst : hStat}
                                rotation={235}
                                arcSweepAngle={250}
                                lineCap="round"
                                tintColor="#6AAAE9"
                                duration={500}
                                backgroundColor="#3d5875">
                                {
                                    () => (
                                        <View className = 'bg-'>
                                        <Text className='text-lg px-6 py-5 rounded-full text-blue-500 font-bold' >{hStat === "0" ? humidityStatFirst : hStat}</Text>
                                        </View>
                                    )
                                }
                            </AnimatedCircularProgress>
                            <Switch
                                trackColor={{ false: '#767577', true: '#593EFF' }}
                                thumbColor={toggleButton1 ? '#ffff' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={handleChangeHumidState}
                                value={toggleButton1}
                            />
                        </View>
                    </View>
                    {/* Light */}
                    <View className='bg-white rounded-xl items-center flex flex-row justify-around'>
                        <View className='flex flex-col items-center'>
                            <Text className='font-bold text-xl'>Light sensor</Text>
                            <Text className='text-gray-400 text-xs italic'>Value range from 0% to 100%</Text>
                        </View>
                        <View className='flex flex-col items-center justify-center mt-3 mr-4'>
                            <AnimatedCircularProgress
                                size={100}
                                width={8}
                                fill={lStat === "0" ? lightStatFirst : lStat}
                                rotation={235}
                                arcSweepAngle={250}
                                lineCap="round"
                                tintColor="#d9aa00"
                                duration={500}
                                backgroundColor="#3d5875">
                                {
                                    () => (
                                        <Text className='text-lg px-6 py-5 rounded-full text-yellow-500 font-bold'>{lStat === "0" ? lightStatFirst : lStat}</Text>
                                    )
                                }
                            </AnimatedCircularProgress>
                            <Switch
                                trackColor={{ false: '#767577', true: '#593EFF' }}
                                thumbColor={toggleButton2 ? '#ffff' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={handleChangeLightState}
                                value={toggleButton2}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default FrequentlyUsedDevices