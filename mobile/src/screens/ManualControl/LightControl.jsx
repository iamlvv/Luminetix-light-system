import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import client from '../../mqtt/mqtt.js';

const LightControl = ({ navigation }) => {
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [date1, setDate1] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [mode1, setMode1] = useState('date');
    const [mode2, setMode2] = useState('date');
    const [starttime, setStartTime] = React.useState("");
    const [endtime, setEndTime] = React.useState("");
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
    // ------------------LED STATE------------------
    const [ledState, setLedState] = React.useState("#ff0000");
    const [prevLedState, setPrevLedState] = React.useState(ledState);

    const isFocused = useIsFocused();

    const convertLedState = (ledState) => {
        switch (ledState) {
            case "#ffff00": return "Yellow";
            case "#ff0000": return "Red";
            case "#0000ff": return "Blue";
            case "#000000": return "OFF";

            default: return "";
        }
    }

    // Nhận data qua database/AIO để render lần đầu tiên
    const fetchDevices = async () => {
        try {
            const led_res = await axios.get("https://io.adafruit.com/api/v2/Tori0802/feeds/w-led/data")
            const led_data = led_res.data[0].value;
            // console.log(`fetchDevices - LightControl: ${led_data}`);

            (led_data !== "#000000")
                ? setLedState(led_data)
                : setLedState(led_data);
        } catch (err) {
            console.log(err);
        }
    }
    // Nhận data qua mqtt và re-render Led State trên UI
    useEffect(() => {
        client.on("message", (topic, message) => {
            if (topic === "Tori0802/feeds/w-led") {
                // console.log("Led Stat: ", message.toString());
                if (message.toString() === "#000000") {
                    setLedState("#000000");
                } else {
                    if (message.toString() === "#ff0000") {
                        setLedState("#ff0000");
                    } else if (message.toString() === "#ffff00") {
                        setLedState("#ffff00");
                    } else if (message.toString() === "#0000ff") {
                        setLedState("#0000ff");
                    }
                }
            } else {
                console.log("topic not w-led");
            }
        });
    });
    // Gửi data qua mqtt và update Led State trên UI
    const handleRedLed = () => {
        if (client) {
            client.publish(
                "Tori0802/feeds/w-led",
                JSON.stringify({ value: "#ff0000" })
            );
        }
        setLedState("#ff0000");
    }
    const handleBlueLed = () => {
        if (client) {
            client.publish(
                "Tori0802/feeds/w-led",
                JSON.stringify({ value: "#0000ff" })
            );
        }
        setLedState("#0000ff");
    }
    const handleYellowLed = () => {
        if (client) {
            client.publish(
                "Tori0802/feeds/w-led",
                JSON.stringify({ value: "#ffff00" })
            );
        }
        setLedState("#ffff00");
    }
    const handleLightState = () => {
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
    }
    const handleNotiBtn = () => {

    }
    // ------------------TIME IN SCHEDULING------------------

    const [mode, setMode] = React.useState('time');
    const [showStartTime, setShowStartTime] = React.useState(false);
    const [showEndTime, setShowEndTime] = React.useState(false);

    const handleScheduling = () => {
        if (starttime === "" || endtime === "") {
            alert ("Please choose start time and end time");
        }
        var name = "LED Scheduling";
        var description = "";
        var output = {
            active_time: {
                start_time: starttime,
                end_time: endtime
            },
            control_fan: [
                {
                    name: "Fan",
                    value: 0,
                    status: false
                }
            ],
            control_led: [
                {
                    name: "LED",
                    value: ledState,
                    status: ledState !== "#000000" ? true : false
                }
            ]
        }
        fetch(`${url}/contexts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
            body: JSON.stringify({
                name, description, output
            })
        })
            .then(response => response.json())
            .then(data => {
                alert("Success")
                console.log("Success", data)
            }
            )
            .catch((error) => {
                alert("Error")
                console.error('Error:', error);
            }
            );
    }
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

    console.log("Current LedState: ", convertLedState(ledState));
    return (
        <View className='h-5/6 mt-6 mx-3'>
            {/* Header */}
            <View className='flex flex-row mt-5 items-center'>
                {/* Back button */}
                <TouchableOpacity onPress={() => navigation.navigate("ManualControl")} className='items-center ml-5 flex flex-row'>
                    <Ionicons name="chevron-back-outline" size={25} color="#5E44FF" />
                </TouchableOpacity>
                {/* Profile title */}
                <View className='mx-auto' >
                    <Text className='font-semibold text-2xl'>Light</Text>
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
                        convertLedState(ledState) === "Yellow" ? (
                            <View className='bg-yellow-200 rounded-full justify-center mx-auto' style={{ height: 250, width: 250 }}>
                                <View className='flex flex-col mx-auto'>
                                    <Ionicons name="bulb-outline" className='' size={70} color="orange" />
                                    <Text className='justify-center mx-auto mt-2 font-bold text-2xl'>Led</Text>
                                    <Text className='justify-center mx-auto'>{convertLedState(ledState)}</Text>
                                </View>
                            </View>
                        ) : (
                            convertLedState(ledState) === "Red" ? (
                                <View className='bg-red-200 rounded-full justify-center mx-auto' style={{ height: 250, width: 250 }}>
                                    <View className='flex flex-col mx-auto'>
                                        <Ionicons name="bulb-outline" className='' size={70} color="red" />
                                        <Text className='justify-center mx-auto mt-2 font-bold text-2xl'>Led</Text>
                                        <Text className='justify-center mx-auto'>{convertLedState(ledState)}</Text>
                                    </View>
                                </View>
                            ) : (
                                convertLedState(ledState) === "Blue" ? (
                                    <View className='bg-blue-200 rounded-full justify-center mx-auto' style={{ height: 250, width: 250 }}>
                                        <View className='flex flex-col mx-auto'>
                                            <Ionicons name="bulb-outline" className='' size={70} color="blue" />
                                            <Text className='justify-center mx-auto mt-2 font-bold text-2xl'>Led</Text>
                                            <Text className='justify-center mx-auto'>{convertLedState(ledState)}</Text>
                                        </View>
                                    </View>
                                ) : (
                                    <View className='bg-gray-200 rounded-full justify-center mx-auto' style={{ height: 250, width: 250 }}>
                                        <View className='flex flex-col mx-auto'>
                                            <Ionicons name="bulb-outline" className='' size={70} color="black" />
                                            <Text className='justify-center mx-auto mt-2 font-bold text-2xl'>Led</Text>
                                            <Text className='justify-center mx-auto'>{convertLedState(ledState)}</Text>
                                        </View>
                                    </View>
                                )
                            )
                        )
                    }
                    {/* Control button */}
                    <View className='flex flex-row justify-between items-center mt-20'>
                        {
                            convertLedState(ledState) === "Yellow" ? (
                                <View className='flex flex-row bg-violet-100 items-center rounded-full justify-around py-2 px-2'>
                                    <View className='rounded-full'>
                                        <TouchableOpacity className='rounded-full p-1 m-2 bg-white' onPress={handleRedLed}>
                                            <Ionicons name="sunny-outline" size={45} color="red" />
                                        </TouchableOpacity>
                                    </View>
                                    <View className='bg-violet-200 rounded-full'>
                                        <TouchableOpacity className='rounded-full p-1 m-2 bg-white' onPress={handleYellowLed}><Ionicons name="sunny-outline" size={45} color="orange" /></TouchableOpacity>
                                    </View>
                                    <View className='rounded-full'>
                                        <TouchableOpacity className='rounded-full p-1 m-2 bg-white' onPress={handleBlueLed}><Ionicons name="sunny-outline" size={45} color="blue" /></TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                convertLedState(ledState) === "Red" ? (
                                    <View className='flex flex-row bg-violet-100 items-center rounded-full justify-around py-2 px-2'>
                                        <View className='bg-violet-200 rounded-full'>
                                            <TouchableOpacity className='rounded-full p-1 m-2 bg-white' onPress={handleRedLed}><Ionicons name="sunny-outline" size={45} color="red" /></TouchableOpacity>
                                        </View>
                                        <View className='rounded-full'>
                                            <TouchableOpacity className='rounded-full p-1 m-2 bg-white' onPress={handleYellowLed}><Ionicons name="sunny-outline" size={45} color="orange" /></TouchableOpacity>
                                        </View>
                                        <View className='rounded-full'>
                                            <TouchableOpacity className='rounded-full p-1 m-2 bg-white' onPress={handleBlueLed}><Ionicons name="sunny-outline" size={45} color="blue" /></TouchableOpacity>
                                        </View>
                                    </View>
                                ) : (
                                    convertLedState(ledState) === "Blue" ? (
                                        <View className='flex flex-row bg-violet-100 items-center rounded-full justify-around py-2 px-2'>
                                            <View className='rounded-full'>
                                                <TouchableOpacity className='rounded-full p-1 m-2 bg-white' onPress={handleRedLed}><Ionicons name="sunny-outline" size={45} color="red" /></TouchableOpacity>
                                            </View>
                                            <View className='rounded-full'>
                                                <TouchableOpacity className='rounded-full p-1 m-2 bg-white' onPress={handleYellowLed}><Ionicons name="sunny-outline" size={45} color="orange" /></TouchableOpacity>
                                            </View>
                                            <View className='bg-violet-200 rounded-full'>
                                                <TouchableOpacity className='rounded-full p-1 m-2 bg-white' onPress={handleBlueLed}><Ionicons name="sunny-outline" size={45} color="blue" /></TouchableOpacity>
                                            </View>
                                        </View>
                                    ) : (
                                        <View className='flex flex-row bg-violet-100 items-center rounded-full justify-around py-2 px-2'>
                                            <View className='rounded-full'>
                                                <TouchableOpacity className='rounded-full p-1 m-2 bg-white' onPress={handleRedLed}><Ionicons name="sunny-outline" size={45} color="red" /></TouchableOpacity>
                                            </View>
                                            <View className='rounded-full'>
                                                <TouchableOpacity className='rounded-full p-1 m-2 bg-white' onPress={handleYellowLed}><Ionicons name="sunny-outline" size={45} color="orange" /></TouchableOpacity>
                                            </View>
                                            <View className='rounded-full'>
                                                <TouchableOpacity className='rounded-full p-1 m-2 bg-white' onPress={handleBlueLed}><Ionicons name="sunny-outline" size={45} color="blue" /></TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                )
                            )}
                        <View className='bg-violet-200 ml-3 rounded-full p-2'>
                            <TouchableOpacity className='rounded-full p-3 bg-violet-700'><Ionicons name="power-outline" size={35} color="white" onPress={handleLightState} /></TouchableOpacity>
                        </View>
                    </View>
                    {/* Schedule */}
                    <View className='flex flex-col my-10 rounded-2xl pt-5 pb-3 bg-white px-5'>
                        {/* Schedule title */}
                        <View className='flex flex-row justify-between'>
                            <Text className='font-bold text-2xl'>Schedule</Text>
                            <TouchableOpacity className='py-1 px-2 rounded-2xl border-gray-400 border'
                                onPress={handleScheduling}
                            >
                                <Ionicons name="add-outline" size={30} color="#593EFF" />
                            </TouchableOpacity>
                        </View>
                        {/* Time */}
                        <View className='flex flex-row justify-between mt-3'>
                            <View>
                                <Text className='text-lg text-gray-400'>From</Text>
                                <View>
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
                            </View>

                            <View className='items-center justify-center mt-5 mx-10'>
                                <Ionicons name="arrow-forward-outline" size={20} color="#9E8FFF" />
                            </View>

                            <View>
                                <Text className='text-lg text-gray-400'>To</Text>
                                <View>
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
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default LightControl