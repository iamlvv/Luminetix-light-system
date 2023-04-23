import { View, Text, Switch, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Paho from 'paho-mqtt'

//const mqtt = require('mqtt');

const client = new Paho.Client('io.adafruit.com', Number(8883), 'clientId-' + Math.round(Math.random(100000000, 1000000000)*1000000000));

const FrequentlyUsedDevices = () => {
    const [toggleButton1, setToggleButton1] = useState(false);
    const [toggleButton2, setToggleButton2] = useState(false);
    const [toggleButton3, setToggleButton3] = useState(false);
    useEffect(() => {
        client.connect({
            onSuccess: () => {
                console.log('connected')
                client.subscribe('Tori0802/feeds/w-s-humi')
                client.onMessageArrived = onMessage
            },
            // userName: options.username,
            // password: options.password,
            onFailure: (errorMessage) => {
                console.log('Connection failed: ' + errorMessage.errorMessage);
            }
        })
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