import { View, Text, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import FrequentlyUsedDevices from './components/FrequentlyUsedDevices';

export default function Homepage() {
  return (
    <View className='ml-5 mr-5'>
      <View className="bg-violet-500 mt-7 h-20 flex flex-row justify-between rounded-2xl items-center">
        <Text className='ml-10 text-white text-lg font-bold'>Hello Guest</Text>
        <TouchableOpacity className='bg-white rounded-full mt-2 mb-4 p-3 mr-5'>
          <Ionicons name="notifications-outline" size={31} color="black" />
        </TouchableOpacity>
      </View>
      <Text className='mt-10 font-bold text-lg'>Frequently Used Devices</Text>
      <View>
        <FrequentlyUsedDevices />
      </View>
    </View>
  )
}