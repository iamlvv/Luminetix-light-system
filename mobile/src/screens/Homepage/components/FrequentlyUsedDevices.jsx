import { View, Text, Switch, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
//const mimport Paho from 'paho-mqtt';
import Paho from 'paho-mqtt';

// const client = new Paho.Client('io.adafruit.com', Number(8883), 'clientId-' + Math.round(Math.random(100000000, 1000000000)*1000000000));



const FrequentlyUsedDevices = () => {
    const [toggleButton1, setToggleButton1] = useState(false);
    const [toggleButton2, setToggleButton2] = useState(false);
    const [toggleButton3, setToggleButton3] = useState(false);
    useEffect(() => {
        var client = new Paho.Client(
            'io.adafruit.com',
            Number(8883),
            '/',
            'clientId-' + Math.round(Math.random() * 1000000000)
        );
        client.onMessageArrived = function (message) {
            console.log('Topic: ' + message.destinationName + ", Message: " + message.payloadString)
        }
        client.connect({
            onSuccess: function () {
                console.log('connected');
            },
            userName: process.env.REACT_APP_ADAFRUIT_USERNAME,
            password: process.env.REACT_APP_ADAFRUIT_KEY,
            useSSL: true,
            onFailure: function (error) {
                console.log(error);
            }
        });
        // var ws = new WebSocket(`wss://io.adafruit.com:443/mqtt/${process.env.REACT_APP_ADAFRUIT_USERNAME}/w-humi`);
        // ws.onopen = function () {
        //     console.log('WebSocket Client Connected');
        //     ws.send('Hi this is web client.');
        // }
        // ws.addEventListener("message", (event) => {
        //     console.log("message")
        //     console.log("Message from server ", event.data);
        // });
        // ws.onmessage = function (e) {
        //     console.log("Received: '" + e.data + "'");
        // }
        // // ws.onclose = function () {
        // //     console.log('WebSocket Client Closed');
        // // }
        // ws.onerror = function (e) {
        //     console.log("Error: '" + e.data + "'");
        // }
    }, [])

    const handleHumidityChange = () => {
        setToggleButton1(!toggleButton1)
    }
    const handleTemperatureChange = () => {
        setToggleButton2(!toggleButton2)
    }
    const handleLightChange = () => {
        setToggleButton3(!toggleButton3)
    }

    return (
        <View className='h-5/6'>
            <ScrollView>
                <View className="flex flex-col gap-9">
                    <View className='bg-white shadow-sm rounded-2xl p-5 items-center'>
                        <View>
                            <Switch
                                trackColor={{ false: '#767577', true: '#593EFF' }}
                                thumbColor={toggleButton1 ? '#ffff' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={handleHumidityChange}
                                value={toggleButton1}
                            />
                        </View>
                        <View className='rounded-full bg-violet-300 w-20 h-20 mt-5 mb-5 items-center'>
                            <Text className='mt-8 font-bold text-white'>80</Text>
                        </View>
                        <Text className='font-bold'>Humidity</Text>
                    </View>
                    <View className='bg-white shadow-sm rounded-2xl p-5 items-center'>
                        <View>
                            <Switch
                                trackColor={{ false: '#767577', true: '#593EFF' }}
                                thumbColor={toggleButton2 ? '#ffff' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={handleTemperatureChange}
                                value={toggleButton2}
                            />
                        </View>
                        <View className='rounded-full bg-red-300 w-20 h-20 mt-5 mb-5 items-center'>
                            <Text className='mt-8 font-bold text-white'>80</Text>
                        </View>
                        <Text className='font-bold'>Temperature</Text>
                    </View>
                </View>
                <View className="flex flex-col gap-9 mt-0">
                    <View className='bg-white shadow-sm rounded-2xl p-5 items-center'>
                        <View>
                            <Switch
                                trackColor={{ false: '#767577', true: '#593EFF' }}
                                thumbColor={toggleButton3 ? '#ffff' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={handleLightChange}
                                value={toggleButton3}
                            />
                        </View>
                        <View className='rounded-full bg-yellow-300 w-20 h-20 mt-5 mb-5 items-center'>
                            <Text className='mt-8 font-bold text-white'>80</Text>
                        </View>
                        <Text className='font-bold'>Light</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default FrequentlyUsedDevices