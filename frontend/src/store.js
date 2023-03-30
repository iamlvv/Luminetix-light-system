import { combineReducers, configureStore } from '@reduxjs/toolkit';
import * as contextReducers from './redux/reducers/contextReducers'
import * as notificationReducers from './redux/reducers/notificationReducers'
import * as deviceReducers from './redux/reducers/deviceReducers'
import * as userReducers from './redux/reducers/userReducers'

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

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
    userLogin: userReducers.userLoginReducer,
    userRegister: userReducers.userRegisterReducer,
    userDetails: userReducers.userDetailsReducer,
    userUpdateProfile: userReducers.userUpdateProfileReducer,
})
const store = configureStore({
    reducer,
    preloadedState: {
        userLogin: { userInfo: userInfoFromStorage },
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
})

export default store