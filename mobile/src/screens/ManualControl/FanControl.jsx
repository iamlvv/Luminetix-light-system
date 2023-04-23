import { View, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, StyleSheet, Keyboard, Button, SafeAreaView } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import axios from 'axios';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

const FanControl = ({ navigation }) => {
    // --------------LED STATE--------------
    const isFocused = useIsFocused();

    const [fanStat, setFanStat] = React.useState(0);
    const [fanState, setFanState] = React.useState("OFF");

    // Nhận data qua database/AIO để render lần đầu tiên

    const fetchDevices = async () => {
        try {
            const fan_res = await axios.get('https://io.adafruit.com/api/v2/Tori0802/feeds/w-fan/data');
            const fan_data = parseInt(fan_res.data[0].value);
            console.log(`fetchDevices - FanControl: ${fan_data}`);

            if (fan_data === 0) {
                setFanStat(0);
                setFanState("OFF");
            } else {
                setFanStat(fan_data);
                setFanState("ON");
            }
        } catch (err) {
            console.log(err);
        }
    }
    // Nhận data qua mqtt và re-render Led State trên UI
    // Gửi data qua mqtt và update Led State trên UI (Handle slider change)
    const handleNotiBtn = () => {

    }
    const handleFanState = () => {
        if (fanState === "OFF" || fanStat === 0) {
            setFanState("ON");
            setFanStat(100);
        } else {
            setFanState("OFF");
            setFanStat(0);
        }
    }
    // --------------TIME IN SCHEDULING--------------
    const [startTime, setStartTime] = React.useState(new Date());
    const [endTime, setEndTime] = React.useState(new Date());
    const [mode, setMode] = React.useState('time');
    const [showStartTime, setShowStartTime] = React.useState(false);
    const [showEndTime, setShowEndTime] = React.useState(false);

    const showStartTimePicker = () => {
        setShowStartTime(!showStartTime);
    }
    const showEndTimePicker = () => {
        setShowEndTime(!showEndTime);
    }
    // const onChangeStartTime = (e, selectedDate) => {
    //   const currentTime = selectedDate || startTime;
    //   setShow(Platform.OS === 'ios');
    //   setStartTime(currentTime);
    // }
    // const onChangeEndTime = (e, selectedDate) => {
    //   const currentTime = selectedDate || endTime;
    //   setShow(Platform.OS === 'ios');
    //   setEndTime(currentTime);
    // }
    const localTime = (toLocaleTimeString) => {
        const time = toLocaleTimeString.split(":");
        const hour = time[0];
        const minute = time[1];
        return hour + ":" + minute;
    }

    useEffect(() => {
        fetchDevices();
    }, [isFocused]);

    console.log("Current - fanStat", fanStat, " - fanState: ", fanState);
    return (
        <View className='h-5/6 mt-6 mx-3'>
            {/* Header */}
            <View className='flex flex-row mt-5'>
                {/* Back button */}
                <TouchableOpacity onPress={() => navigation.navigate("ManualControl")} className='items-center ml-5'>
                    <Ionicons name="chevron-back-outline" size={25} color="#5E44FF" />
                </TouchableOpacity>
                {/* Profile title */}
                <View className='mx-auto' >
                    <Text className='font-semibold text-2xl'>Fan</Text>
                </View>
                {/* Noti button */}
                <View className='items-center mr-5' >
                    <TouchableOpacity
                        onPress={handleNotiBtn}
                    >
                        <Ionicons name="notifications-outline" size={25} color="#5E44FF" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Body */}
            <View className='flex flex-row mt-5 justify-center items-center'>
                {/* Light control */}
                <View className='mt-5  items-center justify-center'>
                    {/* View circle */}
                    {
                        fanStat === 0 || fanState === "OFF" ? (
                            <View className='bg-gray-200 rounded-full justify-center mx-auto' style={{ height: 250, width: 250 }}>
                                <View className='flex flex-col mx-auto'>
                                    <Ionicons name="aperture-outline" className='' size={70} color="black" />
                                    <Text className='justify-center mx-auto mt-2 font-bold text-2xl'>Fan</Text>
                                    <Text className='justify-center mx-auto'>{fanState}</Text>
                                </View>
                            </View>
                        ) : (
                            <View className='bg-white rounded-full justify-center mx-auto' style={{ height: 250, width: 250 }}>
                                <View className='flex flex-col mx-auto'>
                                    <Ionicons name="aperture-outline" className='' size={70} color="black" />
                                    <Text className='justify-center mx-auto mt-2 font-bold text-2xl'>Fan</Text>
                                    <Text className='justify-center mx-auto'>{fanStat}</Text>
                                </View>
                            </View>
                        )
                    }
                    {/* Control button */}
                    <View className='flex flex-row justify-between items-center mt-20'>
                        {/* Slider */}
                        <View>
                            <Slider
                                style={{ width: 200, height: 40 }}
                                minimumValue={0}
                                maximumValue={100}
                                step={10}
                                value={fanState === "OFF" ? 0 : fanStat}
                                minimumTrackTintColor="#000000"
                                maximumTrackTintColor="##5E44FF"
                                onSlidingComplete={value => { setFanStat(value); value === 0 ? setFanState("OFF") : setFanState("ON"); }}
                            />
                        </View>
                        <View className='bg-violet-200 ml-3 rounded-full p-2'>
                            <TouchableOpacity className='rounded-full p-3 bg-violet-700'><Ionicons name="power-outline" size={35} color="white" onPress={handleFanState} /></TouchableOpacity>
                        </View>
                    </View>
                    {/* Schedule */}
                    <View className='flex flex-col my-10 rounded-2xl pt-5 pb-3 bg-white px-5'>
                        {/* Schedule title */}
                        <View className='flex flex-row justify-between'>
                            <Text className='font-bold text-2xl'>Schedule</Text>
                            <TouchableOpacity className='py-1 px-2 rounded-2xl border-gray-400 border'>
                                <Ionicons name="add-outline" size={30} color="#593EFF" />
                            </TouchableOpacity>
                        </View>
                        {/* Time */}
                        <View className='flex flex-row justify-between mt-3'>
                            <View>
                                <Text className='text-lg text-gray-400'>From</Text>
                                <View>
                                    <TouchableOpacity onPress={showStartTimePicker} className='my-2 py-2 px-5 rounded-lg border border-gray-300'>
                                        <Text className='text-lg'>{localTime(startTime.toLocaleTimeString())}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View className='items-center justify-center mt-5 mx-10'>
                                <Ionicons name="arrow-forward-outline" size={20} color="#9E8FFF" />
                            </View>

                            <View>
                                <Text className='text-lg text-gray-400'>To</Text>
                                <View>
                                    <TouchableOpacity onPress={showEndTimePicker} className='my-2 py-2 px-5 rounded-lg border border-gray-300'>
                                        <Text className='text-lg'>{localTime(endTime.toLocaleTimeString())}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default FanControl