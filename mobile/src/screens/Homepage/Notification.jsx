import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const Tab = createMaterialTopTabNavigator();
const ipaddress = process.env.IPADDRESS;
function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="All" component={All} 
            />
            <Tab.Screen name="Alerts" component={Alerts} />
            <Tab.Screen name="Contexts" component={Contexts} />
        </Tab.Navigator>
    );
}
const convertISOtoString = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const dt = newDate.getDate();
    return `${year}-${month}-${dt}`;
}
function All() {
    const dispatch = useDispatch();
    const [notificationlist, setNotificationList] = React.useState([]); // Initialize notificationlist with empty array

    // get user Info
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const getNotificationList = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.get(`http://${ipaddress}:5000/api/users/noti`, config);
        const { notifications } = data;
        setNotificationList(notifications);
    }
    useEffect(() => {
        if (userInfo) {
            getNotificationList()
        }
    }, [userInfo, dispatch]);

    return (
        <View className = 'bg-white mt-2 mb-2 ml-2 mr-2 rounded-2xl p-5'>
            <ScrollView>
                {notificationlist.slice(0).reverse().map((item) => (
                    <View key={item._id} className = "flex flex-col pb-5 border-b border-gray-100">
                        <Text className = "font-bold mt-5">{item.name}</Text>
                        <Text className = 'text-gray-500 mt-5'>{item.message}</Text>
                        <Text className = 'mt-5'>{convertISOtoString(item.created_date)}</Text>
                    </View>
                ))}

            </ScrollView>
        </View>
    )
}
function Alerts() {
    const dispatch = useDispatch();
    const [notificationlist, setNotificationList] = React.useState([]); // Initialize notificationlist with empty array

    // get user Info
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const getNotificationList = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.get(`http://${ipaddress}:5000/api/users/noti`, config);
        const { notifications } = data;
        setNotificationList(notifications.filter(notification => notification.type === 'alert'));
    }

    useEffect(() => {
        if (userInfo) {
            getNotificationList()
        }
    }, [userInfo, dispatch]);

    return (
        <View className = 'bg-white mt-2 mb-2 ml-2 mr-2 rounded-2xl p-5'>
            <ScrollView>
                {notificationlist ? notificationlist.slice(0).reverse().map((item) => (
                    <View key={item._id} className = "flex flex-col pb-5 border-b border-gray-100">
                        <Text className = "font-bold mt-5">{item.name}</Text>
                        <Text className = 'text-gray-500 mt-5'>{item.message}</Text>
                        <Text className = 'mt-5'>{convertISOtoString(item.created_date)}</Text>
                    </View>
                )) : <ActivityIndicator size="large" color="#593EFF" />}

            </ScrollView>
        </View>
    )
}
function Contexts() {
    const dispatch = useDispatch();
    const [notificationlist, setNotificationList] = React.useState([]); // Initialize notificationlist with empty array

    // get user Info
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const getNotificationList = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.get(`http://${ipaddress}:5000/api/users/noti`, config);
        const { notifications } = data;
        setNotificationList(notifications.filter(notification => notification.type === 'context'));
    }

    useEffect(() => {
        if (userInfo) {
            getNotificationList()
        }
    }, [userInfo, dispatch]);

    return (
        <View className = 'bg-white mt-2 mb-2 ml-2 mr-2 rounded-2xl p-5'>
            <ScrollView>
                {notificationlist.slice(0).reverse().map((item) => (
                    <View key={item._id} className = "flex flex-col pb-5 border-b border-gray-100">
                        <Text className = "font-bold mt-5">{item.name}</Text>
                        <Text className = 'text-gray-500 mt-5'>{item.message}</Text>
                        <Text className = 'mt-5'>{convertISOtoString(item.created_date)}</Text>
                    </View>
                ))}

            </ScrollView>
        </View>
    )
}
const Notification = () => {
    return (
        <MyTabs />
    )
}

export default Notification