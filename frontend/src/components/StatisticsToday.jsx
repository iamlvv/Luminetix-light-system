import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const data = [
  {
    name: "12h00",
    light: 58,
    temp: 40,
    humidity: 30,
  },
  {
    name: "13h00",
    light: 50,
    temp: 45,
    humidity: 20,
  },
  {
    name: "14h00",
    light: 90,
    temp: 30,
    humidity: 50,
  },
  {
    name: "15h00",
    light: 80,
    temp: 50,
    humidity: 42,
  },
  {
    name: "16h00",
    light: 60,
    temp: 60,
    humidity: 65,
  },
  {
    name: "17h00",
    light: 85,
    temp: 50,
    humidity: 61,
  },
];
const styles = {
    size: {
        width: "100%",
        height: "100%"
    }
}
export default function StatisticsToday() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-10 text-gray-500 font-bold">
      <LineChart
      className=""
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
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="light"
          stroke="#F2C94C"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="temp"
          stroke="#FE4F60"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="humidity"
          stroke="#00B4D3"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
}
