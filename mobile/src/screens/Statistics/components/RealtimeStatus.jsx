import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import client from '../../../mqtt/mqtt';
import { getHumanFoundState, getHumidityStatFirst, getLightStatFirst, getTemperatureStatFirst } from '../../../redux/actions/deviceActions';

const getHumidityStatistics = (handleget) => {
    client.subscribe("Tori0802/feeds/w-humi");
    client.on("message", function (topic, message) {
        if (topic === "Tori0802/feeds/w-humi") {
            const value = JSON.parse(message.toString());
            handleget(value);
        }
    });
}
const getTemperatureStatistics = (handleget) => {
    client.subscribe("Tori0802/feeds/w-temp");
    client.on("message", function (topic, message) {
        if (topic === "Tori0802/feeds/w-temp") {
            const value = JSON.parse(message.toString());
            handleget(value);
        }
    });
}
const getLightStatistics = (handleget) => {
    client.subscribe("Tori0802/feeds/w-light");
    client.on("message", function (topic, message) {
        if (topic === "Tori0802/feeds/w-light") {
            const value = JSON.parse(message.toString());
            handleget(value);
        }
    });
}
const styles = {
    maincolorBG: {
        backgroundColor: '#5E44FF',
    },
    maincolorTXT: {
        color: '#5E44FF',
    },
    secondarycolorBG: {
        backgroundColor: '#DFDAFF',
    },
}
const RealtimeStatus = () => {
    const dispatch = useDispatch();
    //get data from sensors through redux
    const HumanFoundStat = useSelector((state) => state.humanDetectionState);

    const { humanFoundState } = HumanFoundStat;
    const TempStatFirst = useSelector((state) => state.temperatureStatFirst);
    const HumidStatFirst = useSelector((state) => state.humidityStatFirst);
    const LightStatFirst = useSelector((state) => state.lightStatFirst);

    const { temperatureStatFirst } = TempStatFirst;
    const { humidityStatFirst } = HumidStatFirst;
    const { lightStatFirst } = LightStatFirst;

    const [lStat, setLStat] = React.useState(lightStatFirst);
    const [tStat, setTStat] = React.useState(temperatureStatFirst);
    const [hStat, setHStat] = React.useState(humidityStatFirst);
    useEffect(() => {

        dispatch(getTemperatureStatFirst());
        dispatch(getHumidityStatFirst());
        dispatch(getLightStatFirst());
        // Get Stat and State using MQTT
        getHumidityStatistics(setHStat);
        getTemperatureStatistics(setTStat);
        getLightStatistics(setLStat);
        dispatch(getHumanFoundState())
    }, []);
    return (
        <View className='flex flex-col bg-white rounded-lg px-3 mx-3 py-2 shadow-xs shadow-black'>
            <View className=''>
                <Text className='text-xl mb-3 font-bold text-center' style={styles.maincolorTXT}>Current status</Text>
            </View>
            <View className='flex flex-row justify-between mt-2 items-center'>
                <Text className='text-md'>Temperature</Text>
                <Text className='text-md font-bold' style={styles.maincolorTXT}>{31.2}</Text>
            </View>
            <View className='flex flex-row justify-between mt-2 items-center'>
                <Text className='text-md'>Humidity</Text>
                <Text className='text-md font-bold' style={styles.maincolorTXT}>{31.2}</Text>
            </View>
            <View className='flex flex-row justify-between mt-2 items-center'>
                <Text className='text-md'>Light</Text>
                <Text className='text-md font-bold' style={styles.maincolorTXT}>{31.2}</Text>
            </View>
        </View>
  )
}

export default RealtimeStatus