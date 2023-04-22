import { View, Text, Switch, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import ContextInfo from './ContextInfo';
import { useDispatch, useSelector } from 'react-redux';
import { contextToggle, listOfContexts } from '../../redux/actions/contextActions';
import { ScrollView, RefreshControl } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import ContextCreate from './ContextCreate';
const Stack = createStackNavigator();
const ipaddress = "10.0.145.226";
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ContextHome" component={ContextHome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="ContextInfo" component={ContextInfo}
      />
      <Stack.Screen name="ContextCreate" component={ContextCreate}
      />
    </Stack.Navigator>
  );
}
function ContextHome({ route, navigation }) {
  const dispatch = useDispatch();
  const contextList = useSelector((state) => state.contextList);
  const { loading, error, contextlist } = contextList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [stateContext, setStateContext] = useState(null)
  const [id, setId] = useState(null)
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  useEffect(() => {
    dispatch(listOfContexts());
  }, [navigation, dispatch, id, refreshing, isFocused]);


  const handleToggleContext = async (id) => {
    dispatch(contextToggle(id));
    setStateContext(contextlist.map((scene) => {
      if (scene._id == id) {
        scene.active = !scene.active;
      }
      return scene;
    }
    ))
  }
  const handleDeleteContext = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.delete(`http://${ipaddress}:5000/api/contexts/${id}`, config);
      const { data } = response;
      dispatch(listOfContexts());
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View className=''>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View className='items-center mt-10 mb-10'>
          <Text className='font-bold text-xl'>Context Setup</Text>
        </View>
        <View className='mb-10 items-center'>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ContextCreate")
            }}
          >
            <Text className='text-violet-500 font-bold border border-violet-500 p-2 rounded-2xl w-40 text-center'>Add new context</Text>
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView>
            <View className='ml-10 mr-10'>
              {contextlist ? contextlist.map((scene) => (
                <View key={scene._id}
                  className='flex flex-row justify-between mb-5 shadow-md rounded-2xl p-5 active:bg-violet-500'>
                  <View className=''>
                    <TouchableOpacity
                      onPress={() => {
                        console.log(scene._id)
                        navigation.navigate("ContextInfo", { id: scene._id })
                      }}
                    >
                      <Text className='font-bold p-2'>{scene.name}</Text>
                      <Text className='text-gray-500 p-2'>{scene.description}</Text>
                    </TouchableOpacity>
                  </View>
                  <View className='items-center'>
                    <Switch
                      value={scene.active}
                      onValueChange={() => handleToggleContext(scene._id)}
                      trackColor={{ false: '#767577', true: '#593EFF' }}
                      thumbColor={scene.active ? '#f4f3f4' : '#593EFF'}
                    />
                    <TouchableOpacity
                      onPress={() => handleDeleteContext(scene._id)}
                    >
                      <MaterialIcons name="delete-outline" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              )) : <Text>Loading...</Text>}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  )
}
const ContextSetup = ({ navigation }) => {
  return (
    <MyStack />
  )
}

export default ContextSetup