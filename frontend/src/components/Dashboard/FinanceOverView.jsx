import React from "react";
import CustomPiChart from "../Charts/CustomPiChart"; // ✅ Make sure this import exists

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverView = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

  return (
    <div className="card p-4 shadow-md rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        {/* ❌ You had an extra quote in className */}
        <h5 className="text-lg font-semibold text-gray-800">
          Financial Overview
        </h5>
      </div>

      {/* ✅ Props formatted properly */}
      <CustomPiChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${totalBalance}`}
        colors={COLORS}
        showTextAnchor={true}
      />
    </div>
  );
};

export default FinanceOverView;
