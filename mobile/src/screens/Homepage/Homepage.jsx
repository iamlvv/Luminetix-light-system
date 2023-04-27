import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import FrequentlyUsedDevices from './components/FrequentlyUsedDevices';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/actions/userActions';
import { createStackNavigator } from '@react-navigation/stack';
import Notification from './Notification';
import { useNavigation } from '@react-navigation/native';
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Homepagehome" component={HomepageHome} options={{
        headerShown: false,
      }} />
      <Stack.Screen name="Notifications" component={Notification} />
    </Stack.Navigator>
  );
}
function HomepageHome() {
  const navigation = useNavigation();
  const [name, setName] = React.useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const dispatch2 = useDispatch();
  console.log(userInfo)
  useEffect(() => {
    if (userInfo) {
      dispatch(getUserDetails("profile"));
    }
    else {
      navigation.navigate('Login');
    }
  }, [userInfo, dispatch]);
  useEffect(() => {
    if (user) {
      setName(user.fullname);
    }
  }, [dispatch2, user]);
  return (
    <View className='mt-6 mx-3'>
      {/* Header */}
      <View className='flex flex-row mt-5 justify-center items-center'>
        <View className='items-center ml-10'>
        </View>
        {/* Title */}
        <View View className='mx-auto' >
          <Text className='font-semibold text-2xl'>Welcome, {name}!</Text>
        </View>
        {/* Noti button */}
        <View View className='items-center mr-5' >
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}
          >
            <Ionicons name="notifications-outline" size={25} color="#5E44FF" />
          </TouchableOpacity>
        </View>
      </View>

      <Text className='mt-5 font-bold text-base mx-auto'>Frequently Used Devices</Text>
      <View className='mt-5 mb-32'>
        <FrequentlyUsedDevices />
      </View>
    </View>
  )
}
export default function Homepage() {
  return <MyStack />
}