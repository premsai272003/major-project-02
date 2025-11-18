// src/components/Charts/CustomBarChart.jsx
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";

// removed unused CustomTooltip import (you already use a local tooltip below)

const CustomBarChart = ({ data = [] }) => {
  const colors = [
    "#875cf5", // Purple
    "#cfbefb", // Light purple
    "#f59e0b", // Amber
    "#10b981", // Emerald
    "#ef4444", // Red
    "#3b82f6", // Blue
    "#8b5cf6", // Violet
    "#06b6d4", // Cyan
    "#84cc16", // Lime
    "#f97316", // Orange
  ];

  const getBarColor = (index) => colors[index % colors.length];

  const LocalTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-2 border border-gray-300 dark:border-gray-600'>
          <p className='text-xs font-semibold text-purple-800 dark:text-purple-300 mb-1'>
            {payload[0].payload.name}
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

  return (
    <div className='bg-white dark:bg-gray-800 mt-6 p-4 rounded-lg'>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          {/* ✅ use "name" because prepareBarChartData returns { name, amount } */}
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={<LocalTooltip />} />
          <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
