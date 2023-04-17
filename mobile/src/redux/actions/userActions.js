import axios from "axios";
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_DETAILS_RESET,
    USER_UPDATE_PASSWORD_REQUEST,
    USER_UPDATE_PASSWORD_SUCCESS,
    USER_UPDATE_PASSWORD_FAIL,

} from "../../constants/userConstants";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ipaddress = "172.20.10.3";

const storeData = async (data) => {
    try {
        await AsyncStorage.setItem('userInfo', JSON.stringify(data))
    } catch (e) {
        // saving error
        console.log(e)
    }
}

const removeData = async () => {
    try {
        await AsyncStorage.removeItem('userInfo')
    } catch (e) {
        // remove error
        console.log(e)
    }
}

export const login = (email, password, navigation) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            `http://${ipaddress}:5000/api/users/login`,
            { email, password },
            config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });
        //localStorage.setItem("userInfo", JSON.stringify(data));
        storeData(data);
        navigation.navigate('Home');

    } catch (error) {
        alert("Login Failed");
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logout = ({navigation}) => (dispatch) => {
    //localStorage.removeItem("userInfo");
    
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
    //document.location.href = "/";
    removeData();
    navigation.navigate('Login');
};

export const register =
    (fullname, username, email, password, phone) => async (dispatch) => {
        try {
            dispatch({
                type: USER_REGISTER_REQUEST,
            });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                `http://${ipaddress}:5000/api/users`,
                { fullname, username, email, password, phone },
                config
            );

            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: data,
            });

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data,
            });

            //localStorage.setItem("userInfo", JSON.stringify(data));
            storeData(data);
        } catch (error) {
            alert("Registration Failed");
            dispatch({
                type: USER_REGISTER_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`http://${ipaddress}:5000/api/users/${id}`, config);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: message,
        });
    }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`http://${ipaddress}:5000/api/users/profile`, user, config);
        console.log(data);
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        });
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        //localStorage.setItem("userInfo", JSON.stringify(data));
        alert("Profile Updated successfully");
        storeData(data);
    } catch (error) {
        alert("Profile Update Failed");
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: message,
        });
    }
};

export const updateUserPassword = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_PASSWORD_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.put(`http://${ipaddress}:5000/api/users/password`, user, config);
        alert("Password Updated Successfully");
        dispatch({
            type: USER_UPDATE_PASSWORD_SUCCESS,
            payload: true,
        });
    }
    catch (error) {
        alert("Password Update Failed");
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: USER_UPDATE_PASSWORD_FAIL,
            payload: message,
        });
    }
}