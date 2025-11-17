import React, { useEffect, useState } from 'react'
import CustomPiChart from '../Charts/CustomPiChart'

// keep COLORS as you had
const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4F39F6"];

/**
 * Changes made:
 * 1. Remove bad import (you had imported `data` from react-router-dom before).
 * 2. Ensure `data` defaults to [] so mapping is safe.
 * 3. Filter and coerce amounts to Number to avoid non-numeric values.
 * 4. If chartData is empty, show a friendly placeholder instead of empty card.
 *
 * Only lines that were problematic are changed — rest kept same.
 */

const RecentIncomeWithChart = ({ data = [], totalIncome = 0 }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    // ensure we have an array and ignore items without valid numeric amount
    const dataArr = (data || [])
      .filter((item) => item && (Number(item.amount) || item.amount === 0))
      .map((item) => ({
        name: item?.source || "Unknown",
        amount: Number(item.amount) || 0,
      }));

    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
    // no teardown needed
  }, [data]);

  return (
    <div className='card'>
      <div className='flex items-center justify-between '>
        <h5 className='text-lg text-gray-800 dark:text-white'>Last 60 Days Income</h5>
      </div>

      {chartData.length === 0 ? (
        // friendly placeholder when no data available
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-sm text-gray-500 mb-4">No income recorded in the last 60 days.</p>
          <p className="text-xs text-gray-400">Total Income</p>
          <p className="text-2xl font-semibold">₹{totalIncome}</p>
        </div>
      ) : (
        <CustomPiChart
          data={chartData}
          label="Total Income"
          totalAmount={`₹${totalIncome}`}
          showTextAnchor
          colors={COLORS}
        />
      )}
    </div>
  );
};

export default RecentIncomeWithChart;
