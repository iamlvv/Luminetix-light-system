import { View, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, StyleSheet, Keyboard, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, logout, updateUserPassword, updateUserProfile } from '../../redux/actions/userActions';
import { useNavigation } from '@react-navigation/native';

const UserProfile = () => {
  const navigation = useNavigation();
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUserName] = useState("");
  const [currentpassword, setCurrentPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error, loading } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserDetails("profile"));
    }
  }, []);
  useEffect(() => {
    if (user) {
      setFullName(user.fullname);
      setUserName(user.username);
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, [dispatch2, user]);
  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login');
  }
  const handleUpdateInfo = () => {
    dispatch(updateUserProfile({ id: user._id, fullname, username, email, phone }));
  }
  const handleUpdatePassword = () => {
    if (newpassword !== confirmpassword) {
      alert("New password and confirm password do not match!");
    }
    else {
      dispatch(updateUserPassword({ id: user._id, currentpassword, newpassword }));
    }
  }
  return (
    <View className='h-full'>
      <ScrollView>
      {/* Header */}
        <View className='flex justify-center flex-row mt-7 items-center'>
          {/* Profile title */}
          <View className='mx-auto'>
            <Text className='font-bold text-xl ml-16'>Profile</Text>
          </View>
          {/* Logout button */}
          <View className='items-center mr-10'>
            <TouchableOpacity
              onPress={handleLogout}
            >
              <Ionicons name="exit-outline" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      {/* Body Profile */}
        {/* Fullname */}
        <View className='ml-5 mr-5'>
          <Text className='mb-5 mt-5'>Full Name</Text>
          <TextInput value={fullname || ""} className='border-2  p-2 rounded-2xl border-gray-300'
            onChangeText={(text) => setFullName(text)}
          />
        </View>
        {/* Username */}
        <View className='ml-5 mr-5'>
          <Text className='mb-5 mt-5'>User Name</Text>
          <TextInput value={username || ""} className='border-2  p-2 rounded-2xl border-gray-300'
            onChangeText={(text) => setUserName(text)}
          />
        </View>
        {/* Email */}
        <View className='ml-5 mr-5'>
          <Text className='mb-5 mt-5'>Email</Text>
          <TextInput value={email || ""} className='border-2  p-2   rounded-2xl border-gray-300' keyboardType='email-address'
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        {/* Phone number */}
        <View className='ml-5 mr-5'>
          <Text className='mb-5 mt-5'>Phone Number</Text>
          <TextInput value={phone || ""} className='border-2  p-2   rounded-2xl border-gray-300' keyboardType='phone-pad'
            onChangeText={(text) => setPhone(text)}
          />
        </View>
        {/* Save changes button */}
        <View>
          <TouchableOpacity className='bg-violet-500 mt-5 mb-5 rounded-2xl p-2 w-1/2 mx-auto'
            onPress={handleUpdateInfo}
          >
            <Text className='text-white text-center font-bold'>Save changes</Text>
          </TouchableOpacity>
        </View>
        {/* Password */}
        <View className='mx-auto'>
          <Text className='font-bold text-lg'>Password</Text>
        </View>
        {/* Current password */}
        <View className='ml-5 mr-5'>
          <Text className='mb-5 mt-5'>Current Password</Text>
          <TextInput className='border-2  p-2   rounded-2xl border-gray-300' textContentType='password' secureTextEntry={true}
            value={currentpassword || ""}
            onChangeText={(text) => setCurrentPassword(text)}
          />
        </View>
        {/* New password */}
        <View className='ml-5 mr-5'>
          <Text className='mb-5 mt-5'>New Password</Text>
          <TextInput className='border-2  p-2  rounded-2xl border-gray-300' textContentType='password' secureTextEntry={true}
            value={newpassword || ""}
            onChangeText={(text) => setNewPassword(text)}
          />
        </View>
        {/* Confirm new password */}
        <View className='ml-5 mr-5'>
          <Text className='mb-5 mt-5'>Confirm new password</Text>
          <TextInput value={confirmpassword || ""} className='border-2  p-2   rounded-2xl border-gray-300' textContentType='password' secureTextEntry={true}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
        {/* Password changes button */}
        <View className='mx-auto'>
          <TouchableOpacity className='bg-violet-500 mt-5 mb-5 rounded-2xl p-2 w-1/2'
            onPress={handleUpdatePassword}
          >
            <Text className='text-white text-center font-bold'>Password Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default UserProfile