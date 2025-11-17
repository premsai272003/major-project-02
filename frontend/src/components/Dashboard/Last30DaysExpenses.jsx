import React, { useEffect, useState } from 'react'
import { prepareBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';


const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareBarChartData(data, "category");
    setChartData(result);

    return () => {};
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg text-gray-800 dark:text-white">Last 30 Days Expenses</h5>
      </div>

      <CustomBarChart data={chartData} />
    </div>
  );
};

export default Last30DaysExpenses;