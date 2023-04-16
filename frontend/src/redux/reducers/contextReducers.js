import * as contextConstants from '../../constants/contextConstants';

export const contextListReducer = (state = { contextlist: [] }, action) => {
    switch (action.type) {
        case contextConstants.CONTEXT_LIST_REQUEST:
            return { loading: true, contextlist: [] };
        case contextConstants.CONTEXT_LIST_SUCCESS:
            return { loading: false, contextlist: action.payload };
        case contextConstants.CONTEXT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const contextDetailReducer = (state = { context: {} }, action) => {
    switch (action.type) {
        case contextConstants.CONTEXT_DETAIL_REQUEST:
            return { loading: true, ...state };
        case contextConstants.CONTEXT_DETAIL_SUCCESS:
            return { loading: false, context: action.payload };
        case contextConstants.CONTEXT_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const contextCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case contextConstants.CONTEXT_CREATE_REQUEST:
            return { loading: true };
        case contextConstants.CONTEXT_CREATE_SUCCESS:
            return { loading: false, success: true, context: action.payload };
        case contextConstants.CONTEXT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const contextUpdateReducer = (state = { context: {} }, action) => {
    switch (action.type) {
        case contextConstants.CONTEXT_UPDATE_REQUEST:
            return { loading: true };
        case contextConstants.CONTEXT_UPDATE_SUCCESS:
            return { loading: false, success: true, context: action.payload };
        case contextConstants.CONTEXT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const contextDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case contextConstants.CONTEXT_DELETE_REQUEST:
            return { loading: true };
        case contextConstants.CONTEXT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case contextConstants.CONTEXT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const contextToggleReducer = (state = {}, action) => {
    switch (action.type) {
        case contextConstants.CONTEXT_TOGGLE_REQUEST:
            return { loading: true };
        case contextConstants.CONTEXT_TOGGLE_SUCCESS:
            return { loading: false, success: true };
        case contextConstants.CONTEXT_TOGGLE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
