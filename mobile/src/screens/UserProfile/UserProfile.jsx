import { View, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, StyleSheet, Keyboard, Button } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, logout } from '../../redux/actions/userActions';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});

const UserProfile = ({navigation}) => {
  const [fullName, setFullName] = React.useState('')
  const [userName, setUserName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [currentPassword, setCurrentPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
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
  console.log(user)
  useEffect(() => {
    if (user) {
      setFullName(user.fullname);
      setUserName(user.username);
      setEmail(user.email);
      setPhoneNumber(user.phone);
    }
  }, [dispatch2, user]);
  const handleLogout = () => {
    dispatch(logout({navigation}));
  }
  return (
    <View className='h-full'>
      <ScrollView>

        <View className='flex justify-center flex-row mt-7 items-center'>
          <View className='mx-auto'>
            <Text className='font-bold text-xl ml-16'>Profile</Text>
          </View>
          <View className='items-center mr-10'>
            <TouchableOpacity
              onPress={handleLogout}
            >
              <Ionicons name="exit-outline" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View className='ml-5 mr-5'>
          <Text className='mb-5 mt-5'>Full Name</Text>
          <TextInput value={fullName} className='border-2  p-2 rounded-2xl border-gray-300' />
        </View>
        <View className='ml-5 mr-5'>
          <Text className='mb-5 mt-5'>User Name</Text>
          <TextInput value={userName} className='border-2  p-2 rounded-2xl border-gray-300' />
        </View>
        <View className='ml-5 mr-5'>
          <Text className='mb-5 mt-5'>Email</Text>
          <TextInput value={email} className='border-2  p-2   rounded-2xl border-gray-300' keyboardType='email-address' />
        </View>
        <View className='ml-5 mr-5'>
          <Text className='mb-5 mt-5'>Phone Number</Text>
          <TextInput value={phoneNumber} className='border-2  p-2   rounded-2xl border-gray-300' keyboardType='phone-pad' />
        </View>
        <View>
          <TouchableOpacity className='bg-violet-500 mt-5 mb-5 rounded-2xl p-2 w-1/2 mx-auto'>
            <Text className='text-white text-center font-bold'>Save</Text>
          </TouchableOpacity>
        </View>
        <View className='mx-auto'>
          <Text className='font-bold text-lg'>Password</Text>
        </View>
        <View className='ml-5 mr-5'>
          <Text className='mb-5 mt-5'>Current Password</Text>
          <TextInput className='border-2  p-2   rounded-2xl border-gray-300' textContentType='password' secureTextEntry={true} />
        </View>
        <View className='ml-5 mr-5'>
          <Text className='mb-5 mt-5'>New Password</Text>
          <TextInput value='Johnny Depp' className='border-2  p-2  rounded-2xl border-gray-300' textContentType='password' secureTextEntry={true} />
        </View>
        <View className='ml-5 mr-5'>
          <Text className='mb-5 mt-5'>Confirm new password</Text>
          <TextInput value='Johnny Depp' className='border-2  p-2   rounded-2xl border-gray-300' textContentType='password' secureTextEntry={true} />
        </View>

        <View className='mx-auto'>
          <TouchableOpacity className='bg-violet-500 mt-5 mb-5 rounded-2xl p-2 w-1/2'>
            <Text className='text-white text-center font-bold'>Password Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default UserProfile