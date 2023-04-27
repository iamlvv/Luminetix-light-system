import { View, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, StyleSheet, Keyboard, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, logout, updateUserPassword, updateUserProfile } from '../../redux/actions/userActions';
import { useNavigation } from '@react-navigation/native';

const UserProfile = () => {
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
    dispatch(logout({ navigation }));
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
    <View className='h-full mt-6 mx-3'>
      {/* Header */}
      <View className='flex flex-row mt-5 justify-center items-center'>
        <View className='items-center ml-10'>
        </View>
        {/* Title */}
        <View View className='mx-auto' >
          <Text className='font-semibold text-2xl'>User profile</Text>
        </View>
        {/* Noti button */}
        <View View className='items-center mr-5' >
          <TouchableOpacity
            onPress={handleLogout}
          >
            <Ionicons name="exit-outline" size={25} color="#5E44FF" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView className='mb-5'>
        {/* Body Profile */}
        {/* Fullname */}
        <View className='ml-5 mr-5'>
          <Text className='mb-2 mt-5 text-sm font-semibold'>Full Name</Text>
          <TextInput value={fullname || ""} className='border py-2 px-4 rounded-lg bg-white border-gray-200'
            onChangeText={(text) => setFullName(text)}
          />
        </View>
        {/* Username */}
        <View className='ml-5 mr-5'>
          <Text className='mb-2 mt-5 text-sm font-semibold'>User Name</Text>
          <TextInput value={username || ""} className='border py-2 px-4 rounded-lg bg-white border-gray-200'
            onChangeText={(text) => setUserName(text)}
          />
        </View>
        {/* Email */}
        <View className='ml-5 mr-5'>
          <Text className='mb-2 mt-5 text-sm font-semibold'>Email</Text>
          <TextInput value={email || ""} className='border py-2 px-4 rounded-lg bg-white border-gray-200'
            keyboardType='email-address'
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        {/* Phone number */}
        <View className='ml-5 mr-5'>
          <Text className='mb-2 mt-5 text-sm font-semibold'>Phone Number</Text>
          <TextInput value={phone || ""} className='border py-2 px-4 rounded-lg bg-white border-gray-200'
            keyboardType='phone-pad'
            onChangeText={(text) => setPhone(text)}
          />
        </View>
        {/* Save changes button */}
        <View>
          <TouchableOpacity className='bg-violet-500 my-5 rounded-xl py-3 px-5 mx-auto'
            onPress={handleUpdateInfo}
            style={styles.maincolorBG}
          >
            <Text className='text-white text-center font-bold'>Save changes</Text>
          </TouchableOpacity>
        </View>
        {/* Password */}
        {/* Current password */}
        <View className='ml-5 mr-5'>
          <Text className='mb-2 mt-5 text-sm font-semibold'>Current Password</Text>
          <TextInput className='border py-2 px-4 rounded-lg bg-white border-gray-200'
            textContentType='password'
            secureTextEntry={true}
            value={currentpassword || ""}
            onChangeText={(text) => setCurrentPassword(text)}
          />
        </View>
        {/* New password */}
        <View className='ml-5 mr-5'>
          <Text className='mb-2 mt-5 text-sm font-semibold'>New Password</Text>
          <TextInput className='border py-2 px-4 rounded-lg bg-white border-gray-200'
            textContentType='password'
            secureTextEntry={true}
            value={newpassword || ""}
            onChangeText={(text) => setNewPassword(text)}
          />
        </View>
        {/* Confirm new password */}
        <View className='ml-5 mr-5'>
          <Text className='mb-2 mt-5 text-sm font-semibold'>Confirm new password</Text>
          <TextInput value={confirmpassword || ""} className='border py-2 px-4 rounded-lg bg-white border-gray-200'
            textContentType='password'
            secureTextEntry={true}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
        {/* Password changes button */}
        <View className='mx-auto'>
          <TouchableOpacity className='bg-violet-500 my-5 rounded-xl py-3 px-5 mx-auto'
            onPress={handleUpdatePassword}
            style={styles.maincolorBG}
          >
            <Text className='text-white text-center font-bold'>Password Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default UserProfile