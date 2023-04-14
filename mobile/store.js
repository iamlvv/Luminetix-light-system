import { combineReducers, configureStore } from '@reduxjs/toolkit';
import * as contextReducers from './src/redux/reducers/contextReducers'
import * as notificationReducers from './src/redux/reducers/notificationReducers'
import * as deviceReducers from './src/redux/reducers/deviceReducers'
import * as userReducers from './src/redux/reducers/userReducers'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { composeWithDevTools } from 'redux-devtools-extension';

// const userInfoFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;
const getData = async() => {
    try {
        const jsonValue = await AsyncStorage.getItem('userInfo')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        // error reading value
        console.log("error reading value");
    }
}
const userInfoFromStorage = getData();

const reducer = combineReducers({
    contextList: contextReducers.contextListReducer,
    contextDetail: contextReducers.contextDetailReducer,
    contextCreate: contextReducers.contextCreateReducer,
    contextUpdate: contextReducers.contextUpdateReducer,
    contextDelete: contextReducers.contextDeleteReducer,
    notiList: notificationReducers.notificationListReducer,
    notificationDetail: notificationReducers.notificationDetailReducer,
    notificationCreate: notificationReducers.notificationCreateReducer,
    notificationUpdate: notificationReducers.notificationUpdateReducer,
    notificationDelete: notificationReducers.notificationDeleteReducer,
    LEDState: deviceReducers.LEDStateReducer,
    fanState: deviceReducers.fanStateReducer,
    temperatureState: deviceReducers.temperatureStateReducer,
    humidityState: deviceReducers.humidityStateReducer,
    lightState: deviceReducers.lightStateReducer,
    humanDetectionState: deviceReducers.humanFoundStateReducer,
    fanStat: deviceReducers.fanStatReducer,
    temperatureStat: deviceReducers.temperatureStatReducer,
    humidityStat: deviceReducers.humidityStatReducer,
    lightStat: deviceReducers.lightStatReducer,
    turnOnLight: deviceReducers.turnOnLightReducer,
    turnOffLight: deviceReducers.turnOffLightReducer,
    turnOnFan: deviceReducers.turnOnFanReducer,
    turnOffFan: deviceReducers.turnOffFanReducer,
    turnOnHumidity: deviceReducers.turnOnHumidityReducer,
    turnOffHumidity: deviceReducers.turnOffHumidityReducer,
    turnOnTemperature: deviceReducers.turnOnTemperatureReducer,
    turnOffTemperature: deviceReducers.turnOffTemperatureReducer,
    userLogin: userReducers.userLoginReducer,
    userRegister: userReducers.userRegisterReducer,
    userDetails: userReducers.userDetailsReducer,
    userUpdateProfile: userReducers.userUpdateProfileReducer,
    userUpdatePassword: userReducers.userUpdatePasswordReducer,
})
const store = configureStore({
    reducer,
    preloadedState: {
        userLogin: { userInfo: userInfoFromStorage },
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    }),
})

export default store