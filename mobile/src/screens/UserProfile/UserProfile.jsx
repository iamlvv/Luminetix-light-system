import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
const UserProfile = () => {
  return (
    <View className='h-full'>
      <ScrollView>
        <View className='flex justify-between flex-row mt-5 items-center'>
          <View className='mx-auto'>
          <Text className='font-bold text-xl'>Profile</Text>
          </View>
          <TouchableOpacity className='bg-white rounded-full mt-2 mb-4 p-3 mr-5'>
            <Ionicons name="notifications-outline" size={31} color="black" />
          </TouchableOpacity>
        </View>
        <View className='mx-auto'>
          <TextInput value='Johnny' className='font-bold'/>
        </View>
        <View className='ml-5 mr-5'>
          <Text className='mb-5 mt-5'>Full Name</Text>
          <TextInput value='Johnny Depp' className='border-2  p-2 rounded-2xl border-gray-300'/>
        </View>
        <View className='ml-5 mr-5'>
          <Text className='mb-5 mt-5'>User Name</Text>
          <TextInput value='johnny' className='border-2  p-2 rounded-2xl border-gray-300'/>
        </View>
        <View className='ml-5 mr-5'>
          <Text className='mb-5 mt-5'>Email</Text>
          <TextInput value='john@hgmail.com' className='border-2  p-2   rounded-2xl border-gray-300' keyboardType='email-address'/>
        </View>
        <View className='ml-5 mr-5'>
          <Text className='mb-5 mt-5'>Phone Number</Text>
          <TextInput value='0123456789' className='border-2  p-2   rounded-2xl border-gray-300' keyboardType='phone-pad'/>
        </View>
        <View>
          <TouchableOpacity className='bg-violet-500 mt-5 mb-5 rounded-2xl p-2 w-1/2 mx-auto'>
            <Text className='text-white text-center'>Save</Text>
          </TouchableOpacity>
        </View>
        <View className='mx-auto'>
          <Text className='font-bold text-lg'>Password</Text>
        </View>
        <View className='ml-5 mr-5'>
          <Text className='mb-5 mt-5'>Current Password</Text>
          <TextInput className='border-2  p-2   rounded-2xl border-gray-300' textContentType='password'/>
        </View>
        <View className='ml-5 mr-5'>
          <Text className='mb-5 mt-5'>New Password</Text>
          <TextInput value='Johnny Depp' className='border-2  p-2  rounded-2xl border-gray-300' textContentType='password'/>
        </View>
        <View className='ml-5 mr-5'>
          <Text className='mb-5 mt-5'>Confirm new password</Text>
          <TextInput value='Johnny Depp' className='border-2  p-2   rounded-2xl border-gray-300' textContentType='password'/>
        </View>
        <View className='mx-auto'>
          <TouchableOpacity className='bg-violet-500 mt-5 mb-5 rounded-2xl p-2 w-1/2'>
            <Text className='text-white text-center'>Password Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default UserProfile