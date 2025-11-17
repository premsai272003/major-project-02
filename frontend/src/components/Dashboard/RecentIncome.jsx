// src/components/Dashboard/RecentIncome.jsx
import React from 'react';
import moment from 'moment';
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg text-gray-800 dark:text-white">Income</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.length > 0 ? (
          transactions.slice(0, 5).map((income) => (
            <TransactionInfoCard
              key={income._id}
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format("DD MMM YYYY")}
              amount={income.amount}
              type="income"
              hideDeleteBtn
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No income found</p>
        )}
      </div>
    </div>
  );
};

export default RecentIncome;
