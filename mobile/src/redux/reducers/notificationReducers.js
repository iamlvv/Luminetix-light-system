import * as notificationConstants from '../../constants/notificationConstants';

export const notificationListReducer = (state = { notificationlist: [] }, action) => {
    switch (action.type) {
        case notificationConstants.NOTIFICATION_LIST_REQUEST:
            return { loading: true, notificationlist: [] };
        case notificationConstants.NOTIFICATION_LIST_SUCCESS:
            return { loading: false, notificationlist: action.payload };
        case notificationConstants.NOTIFICATION_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const notificationDetailReducer = (state = { notification: {} }, action) => {
    switch (action.type) {
        case notificationConstants.NOTIFICATION_DETAIL_REQUEST:
            return { loading: true, ...state };
        case notificationConstants.NOTIFICATION_DETAIL_SUCCESS:
            return { loading: false, notification: action.payload };
        case notificationConstants.NOTIFICATION_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const notificationCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case notificationConstants.NOTIFICATION_CREATE_REQUEST:
            return { loading: true };
        case notificationConstants.NOTIFICATION_CREATE_SUCCESS:
            return { loading: false, success: true, notification: action.payload };
        case notificationConstants.NOTIFICATION_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const notificationUpdateReducer = (state = { notification: {} }, action) => {
    switch (action.type) {
        case notificationConstants.NOTIFICATION_UPDATE_REQUEST:
            return { loading: true };
        case notificationConstants.NOTIFICATION_UPDATE_SUCCESS:
            return { loading: false, success: true, notification: action.payload };
        case notificationConstants.NOTIFICATION_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const notificationDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case notificationConstants.NOTIFICATION_DELETE_REQUEST:
            return { loading: true };
        case notificationConstants.NOTIFICATION_DELETE_SUCCESS:
            return { loading: false, success: true };
        case notificationConstants.NOTIFICATION_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
