// src/components/Dashboard/Expense/ExpenseOverview.jsx
import React, { useEffect, useState } from 'react';
import { prepareLineChartData } from '../../utils/helper'; // We will add this function
import CustomLineChart from '../Charts/CustomLineChart'; // The new component

const ExpenseOverview = ({ transactions, startDate, endDate }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Filter transactions based on date range if provided
    let filteredTransactions = transactions;

    if (startDate && endDate) {
      filteredTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return transactionDate >= start && transactionDate <= end;
      });
    }

    // We'll group by date and sum the amounts
    const result = prepareLineChartData(filteredTransactions);
    setChartData(result);
  }, [transactions, startDate, endDate]);

  return (
    <div className="card col-span-1 p-4 rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold text-gray-800 dark:text-white">Expense Overview</h5>
      </div>

       {chartData.length > 0 ? (
        <CustomLineChart data={chartData} />
      ) : (
        <div className="flex items-center justify-center h-[300px]">
            <p className="text-gray-500">No expense data available for the chart.</p>
        </div>
      )}
    </div>
  );
};

export default ExpenseOverview;
