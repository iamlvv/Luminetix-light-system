import * as deviceConstants from '../../constants/deviceConstants';

export const LEDStateReducer = (state = { LEDState: false }, action) => {
    switch (action.type) {
        case deviceConstants.LED_STATE_REQUEST:
            return { loading: true };
        case deviceConstants.LED_STATE_VALID:
            return { loading: false, LEDState: action.payload };
        case deviceConstants.LED_STATE_INVALID:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const fanStateReducer = (state = { fanState: false }, action) => {
    switch (action.type) {
        case deviceConstants.FAN_STATE_REQUEST:
            return { loading: true };
        case deviceConstants.FAN_STATE_VALID:
            return { loading: false, fanState: action.payload };
        case deviceConstants.FAN_STATE_INVALID:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const temperatureStateReducer = (state = { temperatureState: false }, action) => {
    switch (action.type) {
        case deviceConstants.TEMPERATURE_STATE_REQUEST:
            return { loading: true };
        case deviceConstants.TEMPERATURE_STATE_VALID:
            return { loading: false, temperatureState: action.payload };
        case deviceConstants.TEMPERATURE_STATE_INVALID:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const humidityStateReducer = (state = { humidityState: false }, action) => {
    switch (action.type) {
        case deviceConstants.HUMIDITY_STATE_REQUEST:
            return { loading: true };
        case deviceConstants.HUMIDITY_STATE_VALID:
            return { loading: false, humidityState: action.payload };
        case deviceConstants.HUMIDITY_STATE_INVALID:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const lightStateReducer = (state = { lightState: false }, action) => {
    switch (action.type) {
        case deviceConstants.LIGHT_STATE_REQUEST:
            return { loading: true };
        case deviceConstants.LIGHT_STATE_VALID:
            return { loading: false, lightState: action.payload };
        case deviceConstants.LIGHT_STATE_INVALID:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const humanFoundStateReducer = (state = { humanFoundState: false }, action) => {
    switch (action.type) {
        case deviceConstants.HUMAN_FOUND_STATE_REQUEST:
            return { loading: true };
        case deviceConstants.HUMAN_FOUND_STATE_VALID:
            return { loading: false, humanFoundState: action.payload };
        case deviceConstants.HUMAN_FOUND_STATE_INVALID:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const temperatureStatReducer = (state = { temperatureStat: "0" }, action) => {
    switch (action.type) {
        case deviceConstants.TEMPERATURE_STAT_REQUEST:
            return { loading: true };
        case deviceConstants.TEMPERATURE_STAT_VALID:
            return { loading: false, temperatureStat: action.payload };
        case deviceConstants.TEMPERATURE_STAT_INVALID:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const humidityStatReducer = (state = { humidityStat: "0"}, action) => {
    switch (action.type) {
        case deviceConstants.HUMIDITY_STAT_REQUEST:
            return { loading: true };
        case deviceConstants.HUMIDITY_STAT_VALID:
            return { loading: false, humidityStat: action.payload };
        case deviceConstants.HUMIDITY_STAT_INVALID:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const fanStatReducer = (state = { fanStat: "0" }, action) => {
    switch (action.type) {
        case deviceConstants.FAN_STAT_REQUEST:
            return { loading: true };
        case deviceConstants.FAN_STAT_VALID:
            return { loading: false, fanStat: action.payload };
        case deviceConstants.FAN_STAT_INVALID:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const lightStatReducer = (state = { lightStat: "0" }, action) => {
    switch (action.type) {
        case deviceConstants.LIGHT_STAT_REQUEST:
            return { loading: true };
        case deviceConstants.LIGHT_STAT_VALID:
            return { loading: false, lightStat: action.payload };
        case deviceConstants.LIGHT_STAT_INVALID:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const turnOnTemperatureReducer = (state = {}, action) => {
    switch (action.type) {
        case deviceConstants.TEMPERATURE_TURN_ON:
            return { loading: true };
        case deviceConstants.TEMPERATURE_TURN_ON_SUCCESS:
            return { loading: false, success: true };
        case deviceConstants.TEMPERATURE_TURN_ON_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const turnOffTemperatureReducer = (state = {}, action) => {
    switch (action.type) {
        case deviceConstants.TEMPERATURE_TURN_OFF:
            return { loading: true };
        case deviceConstants.TEMPERATURE_TURN_OFF_SUCCESS:
            return { loading: false, success: true };
        case deviceConstants.TEMPERATURE_TURN_OFF_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const turnOnHumidityReducer = (state = {}, action) => {
    switch (action.type) {
        case deviceConstants.HUMIDITY_TURN_ON:
            return { loading: true };
        case deviceConstants.HUMIDITY_TURN_ON_SUCCESS:
            return { loading: false, success: true };
        case deviceConstants.HUMIDITY_TURN_ON_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const turnOffHumidityReducer = (state = {}, action) => {
    switch (action.type) {
        case deviceConstants.HUMIDITY_TURN_OFF:
            return { loading: true };
        case deviceConstants.HUMIDITY_TURN_OFF_SUCCESS:
            return { loading: false, success: true };
        case deviceConstants.HUMIDITY_TURN_OFF_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const turnOnFanReducer = (state = {}, action) => {
    switch (action.type) {
        case deviceConstants.FAN_TURN_ON:
            return { loading: true };
        case deviceConstants.FAN_TURN_ON_SUCCESS:
            return { loading: false, success: true };
        case deviceConstants.FAN_TURN_ON_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const turnOffFanReducer = (state = {}, action) => {
    switch (action.type) {
        case deviceConstants.FAN_TURN_OFF:
            return { loading: true };
        case deviceConstants.FAN_TURN_OFF_SUCCESS:
            return { loading: false, success: true };
        case deviceConstants.FAN_TURN_OFF_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const turnOnLightReducer = (state = {}, action) => {
    switch (action.type) {
        case deviceConstants.LIGHT_TURN_ON:
            return { loading: true };
        case deviceConstants.LIGHT_TURN_ON_SUCCESS:
            return { loading: false, success: true };
        case deviceConstants.LIGHT_TURN_ON_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const turnOffLightReducer = (state = {}, action) => {
    switch (action.type) {
        case deviceConstants.LIGHT_TURN_OFF:
            return { loading: true };
        case deviceConstants.LIGHT_TURN_OFF_SUCCESS:
            return { loading: false, success: true };
        case deviceConstants.LIGHT_TURN_OFF_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const fanStateFirstReducer = (state = {}, action) => {
    switch (action.type) {
        case deviceConstants.FAN_STATE_REQUEST_FIRST:
            return { loading: true };
        case deviceConstants.FAN_STATE_FIRST_SUCCESS:
            return { loading: false, success: true };
        case deviceConstants.FAN_STATE_FIRST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
 




