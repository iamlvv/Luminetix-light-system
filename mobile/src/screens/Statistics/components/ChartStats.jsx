import { View, Text, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { LineChart } from "react-native-chart-kit";

const ChartStats = ({ data, typeofstats, period }) => {
    const [dataChart, setDataChart] = React.useState([])
    useEffect(() => {
        setDataChart(data)
    }, [data]);

    let stroke = "";
    if (typeofstats === "temperature") stroke = "#FE4F60";
    else if (typeofstats === "humidity") stroke = "#00B4D3";
    else if (typeofstats === "light") stroke = "#d9aa00";

    const mdt_day = {
        labels: ["", "2", "", "4", "", "6", "", "8", "", "10", "", "12", "", "14", "", "16", "", "18", "", "20", "", "22", "", "24"],
        // labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
        datasets: [
            {
                data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                ]
            }
        ]
    }
    const mdt_month = {
        // labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        labels: ["1", "", "", "", "5", "", "", "", "", "10", "", "", "", "", "15", "", "", "", "", "20", "", "", "", "", "25", "", "", "", "", "30"],
        datasets: [
            {
                data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                ]
            }
        ]
    }
    const mdt_week = {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        // labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
        datasets: [
            {
                data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                ]
            }
        ]
    }
    const mdt_year = {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        // labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                ]
            }
        ]
    }

    return (
        <View className='pt-8 pr-5' style={{ backgroundColor: '#ffffff' }}>
            {
                period === "month" ?
                    (
                        dataChart.length !== 0 ?
                            <LineChart
                                data={mdt_month}
                                width={Dimensions.get("window").width - 10}
                                height={300}
                                yAxisLabel=""
                                yAxisSuffix=""
                                yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    backgroundGradientFrom: "#ffffff",
                                    backgroundGradientTo: "#ffffff",
                                    fillShadowGradientFrom: stroke,
                                    fillShadowGradientTo: stroke,
                                    decimalPlaces: 1, // optional, defaults to 2dp
                                    color: () => `${stroke}`,
                                    // color: (opacity = 1) => `rgba(94, 68, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    propsForDots: {
                                        r: "2",
                                        strokeWidth: "1",
                                        stroke: stroke,
                                        // stroke: stroke, 
                                    },
                                }}
                                bezier
                                style={{
                                    // marginVertical: 10,
                                    // padding: 10,
                                    // borderRadius: 10,
                                    // borderColor: "#000000",
                                    // borderWidth: 1,
                                }}
                                className = ''
                            />
                            : <ActivityIndicator size="large" color="#593EFF" />
                    ) : (
                        period === "day" ? (
                            dataChart.length !== 0 ?
                                <LineChart
                                    data={mdt_day}
                                    width={Dimensions.get("window").width - 10}
                                    height={300}
                                    yAxisLabel=""
                                    yAxisSuffix=""
                                    yAxisInterval={1} // optional, defaults to 1
                                    chartConfig={{
                                        backgroundGradientFrom: "#ffffff",
                                        backgroundGradientTo: "#ffffff",
                                        fillShadowGradientFrom: stroke,
                                        fillShadowGradientTo: stroke,
                                        decimalPlaces: 1, // optional, defaults to 2dp
                                        color: () => `${stroke}`,
                                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                        propsForDots: {
                                            r: "2",
                                            strokeWidth: "1",
                                            stroke: stroke,
                                            // stroke: stroke, 
                                        },
                                    }}
                                    bezier
                                    style={{
                                        // marginVertical: 10,
                                        // padding: 10,
                                        // borderRadius: 10,
                                        // borderColor: "#000000",
                                        // borderWidth: 1,
                                    }}
                                />
                                : <ActivityIndicator size="large" color="#593EFF" />
                        ) : (
                            period === "week" ? (
                                dataChart.length !== 0 ?
                                    <LineChart
                                        data={mdt_week}
                                        width={Dimensions.get("window").width - 10}
                                        height={300}
                                        yAxisLabel=""
                                        yAxisSuffix=""
                                        yAxisInterval={1} // optional, defaults to 1
                                        chartConfig={{
                                            backgroundGradientFrom: "#ffffff",
                                            backgroundGradientTo: "#ffffff",
                                            fillShadowGradientFrom: stroke,
                                            fillShadowGradientTo: stroke,
                                            decimalPlaces: 1, // optional, defaults to 2dp
                                            color: () => `${stroke}`,
                                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                            propsForDots: {
                                                r: "2",
                                                strokeWidth: "0.5",
                                                stroke: stroke,
                                                // stroke: stroke, 
                                            },
                                        }}
                                        bezier
                                        style={{
                                            // marginVertical: 10,
                                            // padding: 10,
                                            // borderRadius: 10,
                                            // borderColor: "#000000",
                                            // borderWidth: 1,
                                        }}
                                    />
                                    : <ActivityIndicator size="large" color="#593EFF" />
                            ) : (
                                <View></View>
                            )
                        )
                    )
            }

        </View>
    )
}

export default ChartStats