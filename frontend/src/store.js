import { configureStore } from '@reduxjs/toolkit';
import * as contextReducers from './redux/reducers/contextReducers'


const store = configureStore({
    reducer: {
        contextList: contextReducers.contextListReducer,
        contextDetail: contextReducers.contextDetailReducer,
        contextCreate: contextReducers.contextCreateReducer,
        contextUpdate: contextReducers.contextUpdateReducer,
        contextDelete: contextReducers.contextDeleteReducer,
    },
})

export default store