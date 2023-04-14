import {
  LED_STATE_REQUEST,
  FAN_STATE_REQUEST,
  TEMPERATURE_STATE_REQUEST,
  HUMIDITY_STATE_REQUEST,
  LIGHT_STATE_REQUEST,
  HUMAN_FOUND_STATE_REQUEST,
  LED_STATE_VALID,
  FAN_STATE_VALID,
  TEMPERATURE_STATE_VALID,
  HUMIDITY_STATE_VALID,
  LIGHT_STATE_VALID,
  HUMAN_FOUND_STATE_VALID,
  LED_STATE_INVALID,
  FAN_STATE_INVALID,
  TEMPERATURE_STATE_INVALID,
  HUMIDITY_STATE_INVALID,
  LIGHT_STATE_INVALID,
  HUMAN_FOUND_STATE_INVALID,
  LED_TURN_ON,
  LED_TURN_OFF,
  FAN_TURN_ON,
  FAN_TURN_OFF,
  TEMPERATURE_TURN_ON,
  TEMPERATURE_TURN_OFF,
  HUMIDITY_TURN_ON,
  HUMIDITY_TURN_OFF,
  LIGHT_TURN_ON,
  LIGHT_TURN_OFF,
  HUMAN_FOUND_TURN_ON,
  HUMAN_FOUND_TURN_OFF,
  LED_TURN_ON_SUCCESS,
  LED_TURN_OFF_SUCCESS,
  FAN_TURN_ON_SUCCESS,
  FAN_TURN_OFF_SUCCESS,
  TEMPERATURE_TURN_ON_SUCCESS,
  TEMPERATURE_TURN_OFF_SUCCESS,
  HUMIDITY_TURN_ON_SUCCESS,
  HUMIDITY_TURN_OFF_SUCCESS,
  LIGHT_TURN_ON_SUCCESS,
  LIGHT_TURN_OFF_SUCCESS,
  HUMAN_FOUND_TURN_ON_SUCCESS,
  HUMAN_FOUND_TURN_OFF_SUCCESS,
  LED_TURN_ON_FAIL,
  LED_TURN_OFF_FAIL,
  FAN_TURN_ON_FAIL,
  FAN_TURN_OFF_FAIL,
  TEMPERATURE_TURN_ON_FAIL,
  TEMPERATURE_TURN_OFF_FAIL,
  HUMIDITY_TURN_ON_FAIL,
  HUMIDITY_TURN_OFF_FAIL,
  LIGHT_TURN_ON_FAIL,
  LIGHT_TURN_OFF_FAIL,
  HUMAN_FOUND_TURN_ON_FAIL,
  HUMAN_FOUND_TURN_OFF_FAIL,
  TEMPERATURE_STAT_REQUEST,
  HUMIDITY_STAT_REQUEST,
  FAN_STAT_REQUEST,
  LIGHT_STAT_REQUEST,
  TEMPERATURE_STAT_VALID,
  HUMIDITY_STAT_VALID,
  FAN_STAT_VALID,
  LIGHT_STAT_VALID,
  TEMPERATURE_STAT_INVALID,
  HUMIDITY_STAT_INVALID,
  FAN_STAT_INVALID,
  LIGHT_STAT_INVALID,

  FAN_STATE_REQUEST_FIRST,
    FAN_STATE_VALID_FIRST,
    FAN_STATE_INVALID_FIRST,

    HUMIDITY_STATE_REQUEST_FIRST,
    HUMIDITY_STATE_VALID_FIRST,
    HUMIDITY_STATE_INVALID_FIRST,

    LIGHT_STATE_REQUEST_FIRST,
    LIGHT_STATE_VALID_FIRST,
    LIGHT_STATE_INVALID_FIRST,

    TEMPERATURE_STATE_REQUEST_FIRST,
    TEMPERATURE_STATE_VALID_FIRST,
    TEMPERATURE_STATE_INVALID_FIRST,

    HUMAN_FOUND_STATE_REQUEST_FIRST,
    HUMAN_FOUND_STATE_VALID_FIRST,
    HUMAN_FOUND_STATE_INVALID_FIRST,

    LED_STATE_REQUEST_FIRST,
    LED_STATE_VALID_FIRST,
    LED_STATE_INVALID_FIRST,

    TEMPERATURE_STAT_REQUEST_FIRST,
    TEMPERATURE_STAT_VALID_FIRST,
    TEMPERATURE_STAT_INVALID_FIRST,

    HUMIDITY_STAT_REQUEST_FIRST,
    HUMIDITY_STAT_VALID_FIRST,
    HUMIDITY_STAT_INVALID_FIRST,

    FAN_STAT_REQUEST_FIRST,
    FAN_STAT_VALID_FIRST,
    FAN_STAT_INVALID_FIRST,

    LIGHT_STAT_REQUEST_FIRST,
    LIGHT_STAT_VALID_FIRST,
    LIGHT_STAT_INVALID_FIRST,
} from "../../constants/deviceConstants";
import { client } from "mqtt";
import axios from "axios";


const headers = {
  'Content-Type': 'application/json',
  'X-AIO-Key': process.env.ADAFRUIT_KEY,
};


export const getLedState = () => async (dispatch) => {
  try {
    dispatch({ type: LED_STATE_REQUEST });
    client.subscribe("Tori0802/feeds/w-led", (err) => {
      if (err) {
        throw new Error(err);
      }
    });
    client.on("message", (topic, message) => {
      if (topic === "Tori/feeds/w-led") {
        console.log("Led Stat: ", message.toString());
        dispatch({ type: LED_STATE_VALID, payload: message.toString() });
      }
    });
  } catch (error) {
    dispatch({ type: LED_STATE_INVALID, payload: error.message });
  }
};

export const getFanState = () => async (dispatch) => {
  try {
    dispatch({ type: FAN_STATE_REQUEST });
    client.subscribe("Tori0802/feeds/w-fan", (err) => {
      console.log("getFanStat");
      if (err) {
        throw new Error(err);
      }
    });
    client.on("message", (topic, message) => {
      if (topic === "Tori/feeds/w-fan") {
        dispatch({  
          type: FAN_STATE_VALID,
          payload: JSON.parse(message.toString()),
        });
      }
    });
  } catch (error) {
    dispatch({ type: FAN_STATE_INVALID, payload: error.message });
  }
};

export const getTemperatureState = () => async (dispatch) => {
  try {
    dispatch({ type: TEMPERATURE_STATE_REQUEST });
    client.subscribe("Tori0802/feeds/w-s-temp", (err) => {
      if (err) {
        throw new Error(err);
      }
    });
    client.on("message", (topic, message) => {
      if (topic === "Tori/feeds/w-s-temp") {
        if (JSON.parse(message.toString()) === "T_ON") {
          dispatch({ type: TEMPERATURE_STATE_VALID, payload: true });
        } else dispatch({ type: TEMPERATURE_STATE_VALID, payload: false });
      }
    });
  } catch (error) {
    dispatch({ type: TEMPERATURE_STATE_INVALID, payload: error.message });
  }
};


export const getHumidityState = () => async (dispatch) => {
  try {
    dispatch({ type: HUMIDITY_STATE_REQUEST });
    client.subscribe("Tori0802/feeds/w-s-humi", (err) => {
      if (err) {
        throw new Error(err);
      }
    });
    client.on("message", (topic, message) => {
      if (topic === "Tori/feeds/w-s-humi") {
        const { value } = JSON.parse(message.toString());
        if (value === "H_ON") {
          dispatch({ type: HUMIDITY_STATE_VALID, payload: true });
        } else dispatch({ type: HUMIDITY_STATE_VALID, payload: false });
      }
    });
  } catch (error) {
    dispatch({ type: HUMIDITY_STATE_INVALID, payload: error.message });
  }
};

export const getLightState = () => async (dispatch) => {
  try {
    dispatch({ type: LIGHT_STATE_REQUEST });
    client.subscribe("Tori0802/feeds/w-s-light", (err) => {
      if (err) {
        throw new Error(err);
      }
    });
    client.on("message", (topic, message) => {
      if (topic === "Tori/feeds/w-s-light") {
        const  value = JSON.parse(message.toString());
        console.log(value);
        if (value === "L_ON") {
          dispatch({ type: LIGHT_STATE_VALID, payload: true });
        } else dispatch({ type: LIGHT_STATE_VALID, payload: false });
      }
    });
  } catch (error) {
    dispatch({ type: LIGHT_STATE_INVALID, payload: error.message });
  }
};

export const getHumanFoundState = () => async (dispatch) => {
  try {
    dispatch({ type: HUMAN_FOUND_STATE_REQUEST });
    client.on("connect", function () {
      client.subscribe("Tori0802/feeds/w-human");
    });
    client.on("message", function (topic, message) {
      const { value } = JSON.parse(message.toString())[0];
      dispatch({ type: HUMAN_FOUND_STATE_VALID, payload: value });
    });
  } catch (error) {
    dispatch({ type: HUMAN_FOUND_STATE_INVALID, payload: error.message });
  }
};

export const turnOnLed = () => async (dispatch) => {
  try {
    dispatch({ type: LED_TURN_ON });
    client.publish(
      "Tori0802/feeds/w-led",
      JSON.stringify({ value: "#FFFFFF" }),
      (err) => {
        if (err) {
          throw new Error(err);
        }
      }
    );
    client.on("message", (topic, message) => {
      if (topic === "Tori0802/feeds/w-led") {
        dispatch({ type: LED_TURN_ON_SUCCESS, payload: message.toString() });
      }
    });
  } catch (error) {
    dispatch({ type: LED_TURN_ON_FAIL, payload: error.message });
  }
};

export const turnOffLed = () => async (dispatch) => {
  try {
    dispatch({ type: LED_TURN_OFF });
    client.publish(
      "Tori0802/feeds/w-led",
      JSON.stringify({ value: "#000000" }),
      (err) => {
        if (err) {
          throw new Error(err);
        }
      }
    );
    client.on("message", (topic, message) => {
      if (topic === "Tori0802/feeds/w-led") {
        dispatch({ type: LED_TURN_OFF_SUCCESS, payload: message.toString() });
      }
    });
  } catch (error) {
    dispatch({ type: LED_TURN_OFF_FAIL, payload: error.message });
  }
};

export const turnOnFan = () => async (dispatch) => {
  try {
    dispatch({ type: FAN_TURN_ON });
    client.publish(
      "Tori0802/feeds/w-fan",
      JSON.stringify({ value: "100" }),
      (err) => {
        if (err) {
          throw new Error(err);
        }
      }
    );
    client.on("message", (topic, message) => {
      if (topic === "Tori0802/feeds/w-fan") {
        dispatch({ type: FAN_TURN_ON_SUCCESS, payload: message.toString() });
      }
    });
  } catch (error) {
    dispatch({ type: FAN_TURN_ON_FAIL, payload: error.message });
  }
};

export const turnOffFan = () => async (dispatch) => {
  try {
    dispatch({ type: FAN_TURN_OFF });
    client.publish(
      "Tori0802/feeds/w-fan",
      JSON.stringify({ value: "0" }),
      (err) => {
        if (err) {
          throw new Error(err);
        }
      }
    );
    client.on("message", (topic, message) => {
      if (topic === "Tori0802/feeds/w-fan") {
        dispatch({ type: FAN_TURN_OFF_SUCCESS, payload: message.toString() });
      }
    });
  } catch (error) {
    dispatch({ type: FAN_TURN_OFF_FAIL, payload: error.message });
  }
};

export const turnOffTemperature = () => async (dispatch) => {
  dispatch({ type: TEMPERATURE_TURN_OFF });
  client.publish(
    "Tori0802/feeds/w-s-temp",
    JSON.stringify({ value: "T_OFF" }),
    (err) => {
      if (err) {
        dispatch({ type: TEMPERATURE_TURN_OFF_FAIL, payload: err.message });
      } else {
        dispatch({ type: TEMPERATURE_TURN_OFF_SUCCESS });
      }
    }
  );
};
export const turnOnTemperature = () => async (dispatch) => {
  dispatch({ type: TEMPERATURE_TURN_ON });
  client.publish(
    "Tori0802/feeds/w-s-temp",
    JSON.stringify({ value: "T_ON" }),
    (err) => {
      if (err) {
        dispatch({ type: TEMPERATURE_TURN_ON_FAIL, payload: err.message });
      } else {
        dispatch({ type: TEMPERATURE_TURN_ON_SUCCESS });
      }
    }
  );
};

export const turnOnHumidity = () => async (dispatch) => {
  dispatch({ type: HUMIDITY_TURN_ON });
  client.publish(
    "Tori0802/feeds/w-s-humi",
    JSON.stringify({ value: "H_ON" }),
    (err) => {
      if (err) {
        dispatch({ type: HUMIDITY_TURN_ON_FAIL, payload: err.message });
      } else {
        dispatch({ type: HUMIDITY_TURN_ON_SUCCESS });
      }
    }
  );
};

export const turnOffHumidity = () => async (dispatch) => {
  dispatch({ type: HUMIDITY_TURN_OFF });
  client.publish(
    "Tori0802/feeds/w-s-humi",
    JSON.stringify({ value: "H_OFF" }),
    (err) => {
      if (err) {
        dispatch({ type: HUMIDITY_TURN_OFF_FAIL, payload: err.message });
      } else {
        dispatch({ type: HUMIDITY_TURN_OFF_SUCCESS });
      }
    }
  );
};

export const turnOnLight = () => async (dispatch) => {
  dispatch({ type: LIGHT_TURN_ON });
  client.publish(
    "Tori0802/feeds/w-s-light",
    JSON.stringify({ value: "L_ON" }),
    (err) => {
      if (err) {
        dispatch({ type: LIGHT_TURN_ON_FAIL, payload: err.message });
      } else {
        dispatch({ type: LIGHT_TURN_ON_SUCCESS });
      }
    }
  );
};

export const turnOffLight = () => async (dispatch) => {
  dispatch({ type: LIGHT_TURN_OFF });
  client.publish(
    "Tori0802/feeds/w-s-light",
    JSON.stringify({ value: "L_OFF" }),
    (err) => {
      if (err) {
        dispatch({ type: LIGHT_TURN_OFF_FAIL, payload: err.message });
      } else {
        dispatch({ type: LIGHT_TURN_OFF_SUCCESS });
      }
    }
  );
};

export const turnOnHumanFound = () => async (dispatch) => {
  try {
    dispatch({ type: HUMAN_FOUND_TURN_ON });
    client.publish("/devices/humanfound", "H_ON");
    dispatch({
      type: HUMAN_FOUND_TURN_ON_SUCCESS,
      payload: "Human found turned ON",
    });
  } catch (error) {
    dispatch({ type: HUMAN_FOUND_TURN_ON_FAIL, payload: error.message });
  }
};

export const turnOffHumanFound = () => async (dispatch) => {
  try {
    dispatch({ type: HUMAN_FOUND_TURN_OFF });
    client.publish("/devices/humanfound", "H_OFF");
    dispatch({
      type: HUMAN_FOUND_TURN_OFF_SUCCESS,
      payload: "Human found turned OFF",
    });
  } catch (error) {
    dispatch({ type: HUMAN_FOUND_TURN_OFF_FAIL, payload: error.message });
  }
};

export const getTemperatureStat = () => async (dispatch) => {
  try {
    dispatch({ type: TEMPERATURE_STAT_REQUEST });
    client.subscribe("Tori0802/feeds/w-temp");
    client.on("message", function (topic, message) {
      if (topic === "Tori0802/feeds/w-temp") {
      const value = JSON.parse(message.toString());
      dispatch({ type: TEMPERATURE_STAT_VALID, payload: value });
  }});
  } catch (error) {
    dispatch({ type: TEMPERATURE_STAT_INVALID, payload: error.message });
  }
};

export const getHumidityStat = () => async (dispatch) => {
  try {
    dispatch({ type: HUMIDITY_STAT_REQUEST });
    client.subscribe("Tori0802/feeds/w-humi");
    client.on("message", function (topic, message) {
      if (topic === "Tori0802/feeds/w-humi") {
      const  value = JSON.parse(message.toString());
      dispatch({ type: HUMIDITY_STAT_VALID, payload: value });
  }});
  } catch (error) {
    dispatch({ type: HUMIDITY_STAT_INVALID, payload: error.message });
  }
};

export const getLightStat = () => async (dispatch) => {
  try {
    dispatch({ type: LIGHT_STAT_REQUEST });
    client.subscribe("Tori0802/feeds/w-light");
    client.on("message", function (topic, message) {
      if (topic === "Tori0802/feeds/w-light") {
      const  value = message.toString();
      dispatch({ type: LIGHT_STAT_VALID, payload: value });
      }
    });
  } catch (error) {
    dispatch({ type: LIGHT_STAT_INVALID, payload: error.message });
  }
};
export const getFanStat = () => async (dispatch) => {
  try {
    dispatch({ type: FAN_STAT_REQUEST });
    client.subscribe("Tori0802/feeds/w-fan");
    client.on("message", function (topic, message) {
      if (topic === "Tori0802/feeds/w-fan") {
      const  value = message.toString();
      dispatch({ type: FAN_STAT_VALID, payload: value });
      }
    });
  } catch (error) {
    dispatch({ type: FAN_STAT_INVALID, payload: error.message });
  }
};

// export const setFanValue = (value) => async (dispatch) => {
//   try {
//     dispatch({ type: FAN_VALUE_REQUEST });
//     client.publish("Tori0802/feeds/w-fan", JSON.stringify({ value }), (err) => {
//       if (err) {
//         throw new Error(err);
//       }
//     });
//     client.on("message", (topic, message) => {
//       if (topic === "Tori0802/feeds/w-fan") {
//         dispatch({ type: FAN_VALUE_SUCCESS, payload: JSON.parse(message.toString()) });
//       }
//     });
//   } catch (error) {
//     dispatch({ type: FAN_VALUE_FAIL, payload: error.message });
//   }
// };

// export const setLEDValue = (value) => async (dispatch) => {
//   try {
//     dispatch({ type: LED_VALUE_REQUEST });
//     client.publish("Tori0802/feeds/w-led", JSON.stringify({ value }), (err) => {
//       if (err) {
//         throw new Error(err);
//       }
//     });
//     client.on("message", (topic, message) => {
//       if (topic === "Tori0802/feeds/w-led") {
//         dispatch({ type: LED_VALUE_SUCCESS, payload: JSON.parse(message.toString()) });
//       }
//     });
//   } catch (error) {
//     dispatch({ type: LED_VALUE_FAIL, payload: error.message });
//   }
// };
export const getFanStatFirst = () => async (dispatch) => {
  try {
    dispatch({ type: FAN_STAT_REQUEST_FIRST });
    const { data } = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent('https://io.adafruit.com/api/v2/Tori0802/feeds/w-fan/data')}`, headers);
    const { value } = JSON.parse(data.contents)[0];
    dispatch({ type: FAN_STAT_VALID_FIRST, payload: value });
} catch (error) {
    dispatch({ type: FAN_STAT_INVALID_FIRST, payload: error.message });
}
}
export const getFanStateFirst = () => async (dispatch) => {
  try {
    dispatch({ type: FAN_STATE_REQUEST });
    const { data } = await axios.get("https://io.adafruit.com/api/v2/Tori0802/feeds/w-fan/data", headers);
    const { value } = data[0];
    if (value === "0") {
        dispatch({ type: FAN_STATE_VALID_FIRST, payload: false });
    }
    else dispatch({ type: FAN_STATE_VALID_FIRST, payload: true });
} catch (error) {
    dispatch({ type: FAN_STATE_INVALID_FIRST, payload: error.message });
}
}
export const getTemperatureStateFirst = () => async (dispatch) => {
  try {
      dispatch({ type: TEMPERATURE_STATE_REQUEST_FIRST });
      const { data } = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent('https://io.adafruit.com/api/v2/Tori0802/feeds/w-s-temp/data')}`, headers);
      const { value } = JSON.parse(data.contents)[0];
      if (value === "T_ON") {
          dispatch({ type: TEMPERATURE_STATE_VALID_FIRST, payload: true });
      }
      else dispatch({ type: TEMPERATURE_STATE_VALID_FIRST, payload: false });
  } catch (error) {
      dispatch({ type: TEMPERATURE_STATE_INVALID_FIRST, payload: error.message });
  }
}

export const getHumidityStateFirst = () => async (dispatch) => {
  try {
      dispatch({ type: HUMIDITY_STATE_REQUEST_FIRST });
      const { data } = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent('https://io.adafruit.com/api/v2/Tori0802/feeds/w-s-humi/data')}`, headers);
      const { value } = JSON.parse(data.contents)[0];
      if (value === "H_ON") {
          dispatch({ type: HUMIDITY_STATE_VALID_FIRST, payload: true });
      }
      else dispatch({ type: HUMIDITY_STATE_VALID_FIRST, payload: false });
  } catch (error) {
      dispatch({ type: HUMIDITY_STATE_INVALID_FIRST, payload: error.message });
  }
}

export const getLightStateFirst = () => async (dispatch) => {
  try {
    dispatch({ type: LIGHT_STATE_REQUEST_FIRST });
    const { data } = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent('https://io.adafruit.com/api/v2/Tori0802/feeds/w-s-light/data')}`, headers);
    const { value } = JSON.parse(data.contents)[0];
    if (value === "L_ON") {
        dispatch({ type: LIGHT_STATE_VALID_FIRST, payload: true });
    }
    else dispatch({ type: LIGHT_STATE_VALID_FIRST, payload: false });
} catch (error) {
    dispatch({ type: LIGHT_STATE_INVALID_FIRST, payload: error.message });
}
}

export const getLightStatFirst = () => async (dispatch) => {
  try {
    dispatch({ type: LIGHT_STAT_REQUEST_FIRST });
    const { data } = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent('https://io.adafruit.com/api/v2/Tori0802/feeds/w-light/data')}`, headers);
    const { value } = JSON.parse(data.contents)[0];
    dispatch({ type: LIGHT_STAT_VALID_FIRST, payload: value });
} catch (error) {
    dispatch({ type: LIGHT_STAT_INVALID_FIRST, payload: error.message });
}
}

export const getHumidityStatFirst = () => async (dispatch) => {
  try {
    dispatch({ type: HUMIDITY_STAT_REQUEST_FIRST });
    const { data } = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent('https://io.adafruit.com/api/v2/Tori0802/feeds/w-humi/data')}`, headers);
    const { value } = JSON.parse(data.contents)[0];
    dispatch({ type: HUMIDITY_STAT_VALID_FIRST, payload: value });
} catch (error) {
    dispatch({ type: HUMIDITY_STAT_INVALID_FIRST, payload: error.message });
}
}

export const getTemperatureStatFirst = () => async (dispatch) => {
  try {
    dispatch({ type: TEMPERATURE_STAT_REQUEST_FIRST });
    const { data } = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent('https://io.adafruit.com/api/v2/Tori0802/feeds/w-temp/data')}`, headers);
    const { value } = JSON.parse(data.contents)[0];

    dispatch({ type: TEMPERATURE_STAT_VALID_FIRST, payload: value });
} catch (error) {
    dispatch({ type: TEMPERATURE_STAT_INVALID_FIRST, payload: error.message });
}
}

