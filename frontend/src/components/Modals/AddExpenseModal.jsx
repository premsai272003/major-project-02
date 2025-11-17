import React, { useState } from "react";
import Input from "../Inputs/Input"; // Use your existing Input component
import { LuX } from "react-icons/lu";

const AddExpenseModal = ({ onSave, onClose }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);

  const handleSave = () => {
    if (!category) {
      setError("Please enter the expense category.");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (!date) {
      setError("Please select a date.");
      return;
    }

    setError(null);
    onSave({ category, amount: Number(amount), date });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-md glass-effect shadow-2xl p-6 animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 cursor-pointer"
          title="Close"
        >
          <LuX size={24} />
        </button>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Add Expense</h3>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="flex flex-col gap-4">
          {/* We are skipping "Pick Icon" as it's complex and not provided */}

          <Input
            label="Category"
            placeholder="Rent, Groceries, etc"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type="text"
          />

          <Input
            label="Amount"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
          />

          {/* Use type="date" for a simple date picker */}
          <Input
            label="Date"
            placeholder="dd/mm/yyyy"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
          />

          <button
            onClick={handleSave}
            className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:bg-purple-700 transition-colors mt-4"
          >
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseModal;