import React from 'react'
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
} from "recharts";
function ChartStats({ data, typeofstats }) {
    let stroke = "";
    if (typeofstats === "temperature") stroke = "#FE4F60";
    else if (typeofstats === "humidity") stroke = "#00B4D3";
    else if (typeofstats === "light") stroke = "#F2C94C";
    else stroke = "#F83078";
  return (
    <div>
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
					dataKey="value"
					stroke={stroke}
					activeDot={{ r: 8 }}
				/>
			</LineChart>
    </div>
  )
}

export default ChartStats