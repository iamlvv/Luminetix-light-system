//import listofscenes from "../../mockdata/ListOfScenes";
import {
    CONTEXT_LIST_REQUEST,
    CONTEXT_LIST_SUCCESS,
    CONTEXT_LIST_FAIL,

    CONTEXT_DETAIL_REQUEST,
    CONTEXT_DETAIL_SUCCESS,
    CONTEXT_DETAIL_FAIL,

    CONTEXT_CREATE_REQUEST,
    CONTEXT_CREATE_SUCCESS,
    CONTEXT_CREATE_FAIL,

    CONTEXT_UPDATE_REQUEST,
    CONTEXT_UPDATE_SUCCESS,
    CONTEXT_UPDATE_FAIL,

    CONTEXT_DELETE_REQUEST,
    CONTEXT_DELETE_SUCCESS,
    CONTEXT_DELETE_FAIL,
    CONTEXT_TOGGLE_REQUEST,
    CONTEXT_TOGGLE_SUCCESS,
    CONTEXT_TOGGLE_FAIL,
} from "../../constants/contextConstants";
import axios from "axios";
export const listOfContexts = () => async (dispatch, getState) => {
    try {
        dispatch({ type: CONTEXT_LIST_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const response = await axios.get('http://localhost:5000/api/contexts', config);
        const { data } = response;
        dispatch({ type: CONTEXT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CONTEXT_LIST_FAIL, payload: error.message });
    }
}

export const contextDetail = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: CONTEXT_DETAIL_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const response = await axios.get('http://localhost:5000/api/contexts', config);
        const { data } = response;
        dispatch({ type: CONTEXT_DETAIL_SUCCESS, payload: data.find(x => x._id == id) });
    } catch (error) {
        dispatch({ type: CONTEXT_DETAIL_FAIL, payload: error.message });
    }
}

export const contextToggle = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: CONTEXT_TOGGLE_REQUEST })
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const response = await axios.patch(`http://localhost:5000/api/contexts/${id}`, config);
        console.log(response);
        dispatch({ type: CONTEXT_TOGGLE_SUCCESS, payload: response });
    }
    catch (error) {
        console.log(error)
        dispatch({ type: CONTEXT_TOGGLE_FAIL, payload: error.message });
    }
}
export const contextCreate = (context) => async (dispatch) => {
    try {
        dispatch({ type: CONTEXT_CREATE_REQUEST });
        dispatch({ type: CONTEXT_CREATE_SUCCESS, payload: context });
    } catch (error) {
        dispatch({ type: CONTEXT_CREATE_FAIL, payload: error.message });
    }
}

export const contextUpdate = (contextId) => async (dispatch) => {
    try {
        dispatch({ type: CONTEXT_UPDATE_REQUEST });
        dispatch({ type: CONTEXT_UPDATE_SUCCESS, payload: contextId });
    } catch (error) {
        dispatch({ type: CONTEXT_UPDATE_FAIL, payload: error.message });
    }
}

export const contextDelete = (contextId) => async (dispatch) => {
    try {
        dispatch({ type: CONTEXT_DELETE_REQUEST });
        dispatch({ type: CONTEXT_DELETE_SUCCESS, payload: contextId });
    } catch (error) {
        dispatch({ type: CONTEXT_DELETE_FAIL, payload: error.message });
    }
}


