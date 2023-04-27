import { View, Text, Switch, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
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
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();
const ipaddress = process.env.IPADDRESS;
const url = process.env.REACT_APP_API_URL;
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
function ContextHome() {
  const navigation = useNavigation();
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
  const dispatch = useDispatch();
  const contextList = useSelector((state) => state.contextList);
  const { loading, error, contextlist } = contextList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [stateContext, setStateContext] = useState(null)
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
  const handleDeleteAllContexts = () => {
    Alert.alert('Delete all contexts', 'Are you sure you want to delete all contexts?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            const config = {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            };
            const response = await axios.delete(`${url}/contexts`, config);
            const { data } = response;
            dispatch(listOfContexts());
          } catch (error) {
            console.log(error);
          }
        }
      }
    ], { cancelable: false });

  }
  const handleDeleteContext = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.delete(`${url}/contexts/${id}`, config);
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
          <View className='items-center'>
          </View>
          {/* Title */}
          <View View className='mx-auto' >
            <Text className='font-semibold text-2xl'>Context setup</Text>
          </View>
          {/* Noti button */}
          <View View className='items-center' >
            {/* <TouchableOpacity
              onPress={() => {}}
            >
              <Ionicons name="notifications-outline" size={25} color="#5E44FF" />
            </TouchableOpacity> */}
          </View>
        </View>

        {/* Context create button */}
        <View className='my-5 ml-auto flex flex-row justify-center gap-9 mt-0'>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ContextCreate")
            }}
          >
            <Text className='text-white font-bold shadow-xl bg-green-500 py-3 px-2 rounded-lg text-center'>Add new context</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDeleteAllContexts}
          >
            <Text className='text-white font-bold shadow-xl bg-red-500 py-3 px-2 rounded-lg text-center'>Delete all contexts</Text>
          </TouchableOpacity>
        </View>

        {/* Context list */}
        <View>
          <ScrollView>

            {/* Paste contextList */}
            {
              contextList ? contextlist.map((scene) => (
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
                        navigation.navigate("ContextInfo", { id: scene._id })
                      }}
                    >
                      <View className='mx-3'>
                        {/* Context name and button */}
                        <View className='h-auto flex flex-row justify-between items-center'>
                          <View className='rounded-lg w-56' style={styles.secondarycolorBG}>
                            <Text className='font-bold mx-2 text-base' numberOfLines={1} style={styles.maincolorTXT}>{scene.name}</Text>
                          </View>
                          <View className=''>
                            <Switch
                              value={scene.active}
                              onValueChange={() => {
                                dispatch(contextToggle(scene._id, !scene.active));
                                setStateContext(contextlist.map((item) => {
                                  if (item._id == scene._id) {
                                    item.active = !item.active;
                                  }
                                  return item;
                                }
                                ))
                              }}
                              trackColor={{ false: '#767577', true: '#593EFF' }}
                              thumbColor={scene.active ? '#f4f3f4' : '#593EFF'}
                            />
                          </View>
                        </View>
                        {/*  Description */}
                        <View className='w-72 mb-2'>
                          <Text className='text-gray-500 text-xs text-left' numberOfLines={3}>{scene.description}</Text>
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