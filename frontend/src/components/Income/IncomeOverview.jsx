// frontend/src/components/Dashboard/Income/IncomeOverview.jsx
import React, { useEffect, useState } from 'react';
// FIX: Corrected path to go up three levels (from components/Dashboard/Income to utils)
import { prepareBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const IncomeOverview = ({ transactions, startDate, endDate }) => {
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

 // We'll group by source (category) and sum the amounts
 const result = prepareBarChartData(filteredTransactions, "source");
 setChartData(result);
 }, [transactions, startDate, endDate]);

 return (
 <div className="card col-span-1 p-4 rounded-2xl shadow-md">
 <div className="flex items-center justify-between mb-4">
 <h5 className="text-lg font-semibold text-gray-800 dark:text-white">Income Overview</h5>
 </div>

 {chartData.length > 0 ? (
 <CustomBarChart data={chartData} />
 ) : (
 <div className="flex items-center justify-center h-[300px]">
 <p className="text-gray-500">No income data available for the chart.</p>
 </div>
 )}
 </div>
 );
};

export default IncomeOverview;
