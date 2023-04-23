import { View, Text, Switch, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import ContextInfo from './ContextInfo';
import { useDispatch, useSelector } from 'react-redux';
import { contextToggle, listOfContexts } from '../../redux/actions/contextActions';
import { ScrollView, RefreshControl } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import ContextCreate from './ContextCreate';

const Stack = createStackNavigator();
const ipaddress = process.env.IPADDRESS;

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ContextHome" component={ContextHome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="ContextInfo" component={ContextInfo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="ContextCreate" component={ContextCreate}
        options={{
          headerShown: false,
        }}
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
    console.log(`listOfContext - Contextsetup: ${contextlist}`);
    console.log(`ipaddress: ${ipaddress}`);
  }, [isFocused]);

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
    <View className='mt-6 mx-3'>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View className='flex flex-row mt-5 justify-center items-center'>
          <View className='items-center ml-10'>
          </View>
          {/* Title */}
          <View View className='mx-auto' >
            <Text className='font-semibold text-2xl'>Context setup</Text>
          </View>
          {/* Noti button */}
          <View View className='items-center mr-5' >
            <TouchableOpacity
              onPress={() => { }}
            >
              <Ionicons name="notifications-outline" size={25} color="#5E44FF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Context create button */}
        <View className='my-5 ml-auto px-3'>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ContextCreate")
            }}
          >
            <Text className='text-green-700 font-bold shadow-xl bg-green-200 py-3 px-10 rounded-lg text-center'>Add new context</Text>
          </TouchableOpacity>
        </View>

        {/* Context list */}
        <View>
          <ScrollView>

            {
              contextList ? contextlist.map((context) => (
                <View className='m-1 flex flex-row mb-5 items-center' key={scene._id}>
                  {/* Item */}
                  <View className='bg-white flex flex-row justify-between items-center mx-auto rounded-2xl py-2 active:bg-violet-500'>
                    {/* Delete button */}
                    <View className='ml-3 justify-center bg-red-200 rounded-xl p-2'>
                      <TouchableOpacity
                        onPress={() => handleDeleteContext(scene._id)}
                      >
                        <MaterialIcons name="delete-outline" size={24} color="#fc5162" />
                      </TouchableOpacity>
                    </View>
                    {/* Touchable area */}
                    <TouchableOpacity
                      onPress={() => {
                        console.log(scene._id)
                        navigation.navigate("ContextInfo", { id: scene._id })
                      }}
                    >
                      <View className='mx-3'>
                        {/* Context name and button */}
                        <View className='h-auto flex flex-row justify-between items-center'>
                          <View className='bg-purple-200 rounded-lg w-56'>
                            <Text className='font-bold mx-2 text-base text-purple-600' numberOfLines={1}>{context.name}</Text>
                          </View>
                          <View className=''>
                            <Switch
                              value={scene.active}
                              onValueChange={() => { }}
                              trackColor={{ false: '#767577', true: '#593EFF' }}
                              thumbColor={scene.active ? '#f4f3f4' : '#593EFF'}
                            />
                          </View>
                        </View>
                        {/*  Description */}
                        <View className='items-center w-72 mb-2'>
                          <Text className='text-gray-500 text-left text-xs' numberOfLines={3}>{context.description}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )) : (
                <ActivityIndicator size="large" color="#593EFF" />
              )
            }

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