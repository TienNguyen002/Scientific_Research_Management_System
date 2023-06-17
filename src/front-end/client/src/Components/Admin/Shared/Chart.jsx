import React from "react";
import "./style/admin-component.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Tháng 1", Total: 10 },
  { name: "Tháng 2", Total: 2 },
  { name: "Tháng 3", Total: 30 },
  { name: "Tháng 4", Total: 12 },
  { name: "Tháng 5", Total: 20 },
  { name: "Tháng 6", Total: 5 },
];

const Chart = () => {
  return (
    <div className="chart">
      <div className="chart-title">6 tháng gần đây</div>
        <ResponsiveContainer width="100%" aspect={2/1}>
          <AreaChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="gray" />
            <CartesianGrid strokeDasharray="3 3" className="chart-grid" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Total"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#total)"
            />
          </AreaChart>
        </ResponsiveContainer>
    </div>
  );
};

export default Chart;
