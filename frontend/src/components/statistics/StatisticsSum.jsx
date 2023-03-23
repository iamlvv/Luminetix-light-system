import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
  } from "recharts";

const data = [
    {
      name: "12h00",
      light: 58,
      temp: 40,
      humidity: 30,
      lamptime: 0
    },
    {
      name: "13h00",
      light: 50,
      temp: 45,
      humidity: 20,
      lamptime: 1
    },
    {
      name: "14h00",
      light: 90,
      temp: 30,
      humidity: 50,
      lamptime: 0.5
    },
    {
      name: "15h00",
      light: 80,
      temp: 50,
      humidity: 42,
      lamptime: 0.4
    },
    {
      name: "16h00",
      light: 60,
      temp: 60,
      humidity: 65,
      lamptime: 0
    },
    {
      name: "17h00",
      light: 85,
      temp: 50,
      humidity: 61,
      lamptime: 0.2
    },
  ];
export default function StatisticsSum({typeofstats}) {

  return (
     (typeofstats === "temperature") ? (
      <LineChart
        width={847}
        height={300}
        data={data}
        // margin={{
        //   top: 5,
        //   right: 30,
        //   left: 20,
        //   bottom: 5,
        // }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="temp"
          stroke="#FE4F60"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    ) : typeofstats === "humidity" ? (
      <LineChart
        width={847}
        height={300}
        data={data}
        
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="humidity"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    ) : typeofstats === "light" ? (
      <LineChart
        width={847}
        height={300}
        data={data}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="light"
          stroke="#F2C94C"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    ) : (
      <LineChart
        width={847}
        height={300}
        data={data}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="lamptime"
          stroke="#F83078"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    )
  );
}

