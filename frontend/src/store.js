import { configureStore } from '@reduxjs/toolkit';
import * as contextReducers from './redux/reducers/contextReducers'
import * as notificationReducers from './redux/reducers/notificationReducers'

const store = configureStore({
    reducer: {
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
    },
})

export default store