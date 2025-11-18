import React, { useState } from 'react';
import Input from '../Inputs/Input';
import { LuX, LuDownload } from 'react-icons/lu';
import moment from 'moment';
import { exportToCSV } from '../../utils/helper';

const DownloadModal = ({ isOpen, onClose, data = [], type }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleDownload = () => {
    let dataToExport = data;

    // Apply date filter if dates are provided
    if (startDate && endDate) {
      if (new Date(startDate) > new Date(endDate)) {
        alert('Start date cannot be after end date.');
        return;
      }

      dataToExport = data.filter(item => {
        const itemDate = new Date(item.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return itemDate >= start && itemDate <= end;
      });
    }

    if (dataToExport.length === 0) {
      alert('No data found for the selected criteria.');
      return;
    }

    const csvData = dataToExport.map(item => ({
      [type === 'income' ? 'Source' : 'Category']: type === 'income' ? item.source : item.category,
      Amount: item.amount,
      Date: moment(item.date).format('DD-MM-YYYY'),
    }));

    const filename = startDate && endDate ? `${type}_${startDate}_to_${endDate}.csv` : `${type}_all.csv`;
    exportToCSV(csvData, filename);
    onClose();
  };

  const handleClear = () => {
    setStartDate('');
    setEndDate('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-md glass-effect shadow-2xl p-6 animate-slide-up">
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 cursor-pointer"
            title="Close"
          >
            <LuX size={24} />
          </button>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Download {type === 'income' ? 'Income' : 'Expense'} Data
        </h3>
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Select date range to download {type} transactions (optional)
        </div>

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
          <button
            type="button"
            onClick={handleClear}
            className="btn-secondary flex-1 cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="btn-primary flex-1 cursor-pointer"
          >
            <LuDownload size={18} className="inline mr-2" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
