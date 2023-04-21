import { View, Text, Button, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import FrequentlyUsedDevices from './components/FrequentlyUsedDevices';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/actions/userActions';
import { createStackNavigator } from '@react-navigation/stack';
import Notification from './Notification';

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
function HomepageHome({ navigation }) {
  const [name, setName] = React.useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const dispatch2 = useDispatch();
  useEffect(() => {
    if (userInfo) {
      dispatch(getUserDetails("profile"));
    }
  }, [userInfo, dispatch]);
  useEffect(() => {
    if (user) {
      setName(user.fullname);
    }
  }, [dispatch2, user]);
  return (
    <View className='ml-5 mr-5'>
      <View className="bg-violet-500 mt-7 h-20 flex flex-row justify-between rounded-2xl items-center">
        <Text className='ml-10 text-white text-lg font-bold'>Hello {name}</Text>
        <TouchableOpacity className='bg-white rounded-full mt-2 mb-4 p-3 mr-5'
          onPress={() => navigation.navigate('Notifications')}
        >
          <Ionicons name="notifications-outline" size={31} color="black" />
        </TouchableOpacity>
      </View>
      <Text className='mt-5 font-bold text-lg'>Frequently Used Devices</Text>
      <View className='h-max mt-10'>
        <FrequentlyUsedDevices />
      </View>
    </View>
  )
}
export default function Homepage() {
  return <MyStack />
}