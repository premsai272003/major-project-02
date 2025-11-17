// src/components/Charts/CustomLineChart.jsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart
} from "recharts";

// Using the same tooltip style as your other charts
const LocalTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-2 border border-gray-300 dark:border-gray-600'>
        <p className='text-xs font-semibold text-purple-800 dark:text-purple-300 mb-1'>
          {payload[0].payload.date} {/* Show date on hover */}
        </p>
        <p className='text-sm text-gray-600 dark:text-gray-300'>
          Amount:{" "}
          <span className='text-sm font-medium text-gray-900 dark:text-white'>
            ₹{payload[0].payload.amount}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomLineChart = ({ data = [] }) => {
  return (
    <div className='bg-white dark:bg-gray-800 mt-6 p-4 rounded-lg shadow-md'>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#875cf5" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis
            dataKey="date" // We'll format this data in the helper.js
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
            domain={['auto', 'auto']}
          />
          <Tooltip content={<LocalTooltip />} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#875cf5"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorAmount)"
            dot={{ r: 4, fill: '#875cf5' }}
            activeDot={{ r: 6, fill: '#875cf5' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;