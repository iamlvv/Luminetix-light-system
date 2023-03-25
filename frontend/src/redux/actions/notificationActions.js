import listOfNoti from "../../mockdata/Notifications";
import {
    NOTIFICATION_LIST_REQUEST,
    NOTIFICATION_LIST_SUCCESS,
    NOTIFICATION_LIST_FAIL,

    NOTIFICATION_DETAIL_REQUEST,
    NOTIFICATION_DETAIL_SUCCESS,
    NOTIFICATION_DETAIL_FAIL,

    NOTIFICATION_CREATE_REQUEST,
    NOTIFICATION_CREATE_SUCCESS,
    NOTIFICATION_CREATE_FAIL,

    NOTIFICATION_UPDATE_REQUEST,
    NOTIFICATION_UPDATE_SUCCESS,
    NOTIFICATION_UPDATE_FAIL,

    NOTIFICATION_DELETE_REQUEST,
    NOTIFICATION_DELETE_SUCCESS,
    NOTIFICATION_DELETE_FAIL,
} from "../../constants/notificationConstants";

export const notificationList = () => async (dispatch) => {
    try {
        dispatch({ type: NOTIFICATION_LIST_REQUEST });
        dispatch({ type: NOTIFICATION_LIST_SUCCESS, payload: listOfNoti });
    } catch (error) {
        dispatch({ type: NOTIFICATION_LIST_FAIL, payload: error.message });
    }
}

export const notificationDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: NOTIFICATION_DETAIL_REQUEST });
        dispatch({ type: NOTIFICATION_DETAIL_SUCCESS, payload: listOfNoti.find(x => x.id === id) });
    } catch (error) {
        dispatch({ type: NOTIFICATION_DETAIL_FAIL, payload: error.message });
    }
}

export const notificationCreate = (notification) => async (dispatch) => {
    try {
        dispatch({ type: NOTIFICATION_CREATE_REQUEST });
        dispatch({ type: NOTIFICATION_CREATE_SUCCESS, payload: notification });
    } catch (error) {
        dispatch({ type: NOTIFICATION_CREATE_FAIL, payload: error.message });
    }
}

export const notificationUpdate = (notificationId) => async (dispatch) => {
    try {
        dispatch({ type: NOTIFICATION_UPDATE_REQUEST });
        dispatch({ type: NOTIFICATION_UPDATE_SUCCESS, payload: notificationId });
    } catch (error) {
        dispatch({ type: NOTIFICATION_UPDATE_FAIL, payload: error.message });
    }
}

export const notificationDelete = (notificationId) => async (dispatch) => {
    try {
        dispatch({ type: NOTIFICATION_DELETE_REQUEST });
        dispatch({ type: NOTIFICATION_DELETE_SUCCESS, payload: notificationId });
    } catch (error) {
        dispatch({ type: NOTIFICATION_DELETE_FAIL, payload: error.message });
    }
}

