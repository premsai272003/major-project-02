import React, { useState } from 'react';
import Input from '../Inputs/Input';

const FilterModal = ({ isOpen, onClose, onApplyFilter, type }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilter(startDate, endDate);
    onClose();
  };

  const handleClear = () => {
    setStartDate('');
    setEndDate('');
    onApplyFilter('', '');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className={`relative w-full max-w-md bg-white dark:bg-gray-800 border-4 ${type === 'income' ? 'border-blue-500' : 'border-yellow-500'} rounded-2xl shadow-xl p-6`}>
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 cursor-pointer"
            title="Close"
          >
            ✕
          </button>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Filter by Date</h3>
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {type === 'income' ? 'Income' : 'Expense'} transactions
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              value={startDate}
              onChange={({ target }) => setStartDate(target.value)}
              label="From Date"
              placeholder="Select start date"
              type="date"
            />

            <Input
              value={endDate}
              onChange={({ target }) => setEndDate(target.value)}
              label="To Date"
              placeholder="Select end date"
              type="date"
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button type="button" onClick={handleClear} className="btn-secondary flex-1 cursor-pointer hover:scale-105 transition-transform duration-200">
              Clear Filter
            </button>
            <button type="submit" className="btn-primary flex-1 cursor-pointer">
              Apply Filter
            </button>
          </div>
        </form>


      </div>
    </div>
  );
};

export default FilterModal;
