import { View, Text, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { LineChart } from "react-native-chart-kit";

const ChartStats = ({ data, typeofstats }) => {
    const [dataChart, setDataChart] = React.useState([])
    useEffect(() => {
        setDataChart(data)
    }, [data])

    let stroke = "";
    if (typeofstats === "temperature") stroke = "#FE4F60";
    else if (typeofstats === "humidity") stroke = "#00B4D3";
    else if (typeofstats === "light") stroke = "#F2C94C";
    const example = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [
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
    return (
        <View>
            <View>
                {dataChart.length !== 0 ?
                    <LineChart
                        data={data}
                        width={Dimensions.get("window").width} // from react-native
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix=""
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: "#fff",
                            backgroundGradientFrom: "#fb8",
                            backgroundGradientTo: "#fff679",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: stroke
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                    : <ActivityIndicator size="large" color="#593EFF" />}
            </View>
        </View>
    )
}

export default ChartStats