import { View, Text, Switch, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import Slider from '@react-native-community/slider';

const FrequentlyUsedDevices = () => {
    const [toggleButton1, setToggleButton1] = useState(false);
    const [toggleButton2, setToggleButton2] = useState(false);
    const [toggleButton3, setToggleButton3] = useState(false);
    const [toggleButton4, setToggleButton4] = useState(false);
    const [valueFan, setValueFan] = useState(0);
    const handleHumidityChange = () => {
        setToggleButton1(!toggleButton1)
    }
    const handleTemperatureChange = () => {
        setToggleButton2(!toggleButton2)
    }
    const handleLightChange = () => {
        setToggleButton3(!toggleButton3)
    }
    const handleFanChange = () => {
        setToggleButton4(!toggleButton4)
    }
    return (
        <View className='h-4/5'>
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
                    <View className='bg-white shadow-sm rounded-2xl p-5 items-center'>
                        <View>
                            <Switch
                                trackColor={{ false: '#767577', true: '#593EFF' }}
                                thumbColor={toggleButton4 ? '#ffff' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={handleFanChange}
                                value={toggleButton4}
                            />
                        </View>
                        <View className='mt-5 mb-5'>
                            <Slider
                                style={{ width: 200, height: 40 }}
                                minimumValue={0}
                                maximumValue={100}
                                step={1}
                                minimumTrackTintColor="#593EFF"
                                maximumTrackTintColor="#000000"
                                onValueChange={value => setValueFan(value)}
                            />
                        </View>
                        <Text className='mb-1'>{valueFan}</Text>
                        <Text className='font-bold'>Fan</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default FrequentlyUsedDevices