import React, { useState, useEffect, useContext } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import useUserAuth from '../../hooks/useUserAuth';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import { LuPlus, LuDownload, LuFilter, LuLoader as LuLoader2 } from 'react-icons/lu';
import moment from 'moment';
import toast from 'react-hot-toast';

// Import the new components
import AddExpenseModal from '../../components/Modals/AddExpenseModal';
import FilterModal from '../../components/Modals/FilterModal';
import DownloadModal from '../../components/Modals/DownloadModal';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import TransactionInfoCard from '../../components/Cards/TransactionInfoCard';

const Expense = () => {
  useUserAuth();
  const { user } = useContext(UserContext);

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openDownloadModal, setOpenDownloadModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Filtered data for display and download
  const filteredExpenseData = startDate && endDate ? expenseData.filter(expense => {
    const expenseDate = new Date(expense.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return expenseDate >= start && expenseDate <= end;
  }) : expenseData;

  // Fetch All Expense Details
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL);
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
      // You should add a toast notification here
    } finally {
      setLoading(false);
    }
  };

  // Add New Expense
  const handleAddExpense = async (expense) => {
    try {
      const response = await axiosInstance.post(API_PATHS.EXPENSE.ADD, expense);
      if (response.data) {
        fetchExpenseDetails(); // Refresh data
        setOpenAddExpenseModal(false); // Close modal
        toast.success("Expense added successfully!");
      }
    } catch (error) {
      console.error("Failed to add expense:", error);
      toast.error("Failed to add expense. Please try again.");
    }
  };

  // Delete Expense
  const deleteExpense = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE.replace(':id', id));
      fetchExpenseDetails(); // Refresh data
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };



  // Handle Filter
  const handleApplyFilter = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  useEffect(() => {
    if (user) {
      fetchExpenseDetails();
    }
  }, [user]); // Fetch data when user is loaded

  return (
    <DashboardLayout activeMenu="Expense">
      {/* Add Modal */}
      {openAddExpenseModal && (
        <AddExpenseModal
          onClose={() => setOpenAddExpenseModal(false)}
          onSave={handleAddExpense}
        />
      )}
      {openFilterModal && (
        <>
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40">
            <h1 className="text-6xl font-bold text-gray-200 dark:text-gray-800">Expense</h1>
          </div>
          <FilterModal
            isOpen={openFilterModal}
            onClose={() => setOpenFilterModal(false)}
            onApplyFilter={handleApplyFilter}
            type="expense"
          />
        </>
      )}

      <div className="my-5 mx-auto max-w-7xl">
        {/* Header: Title and Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Expenses</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpenFilterModal(true)}
              className="flex items-center gap-2 text-sm text-primary font-medium py-2 px-4 rounded-lg hover:bg-purple-50"
            >
              <LuFilter size={18} />
              Filter
            </button>
            <button
              onClick={() => setOpenAddExpenseModal(true)}
              className="flex items-center gap-2 bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <LuPlus size={20} />
              Add Expense
            </button>
          </div>
        </div>

        {/* Chart Overview */}
        <ExpenseOverview transactions={expenseData} startDate={startDate} endDate={endDate} />

        {/* All Expenses List */}
        <div className="card mt-6 p-4 rounded-2xl shadow-md bg-white">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold text-gray-800 dark:text-white">All Expenses</h5>
            <button
              onClick={() => setOpenDownloadModal(true)}
              className="flex items-center gap-2 text-sm text-primary font-medium py-2 px-4 rounded-lg hover:bg-purple-50"
            >
              <LuDownload size={18} />
              Download
            </button>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            {loading && (
              <div className="flex justify-center p-8">
                <LuLoader2 className="animate-spin text-primary" size={32} />
              </div>
            )}
            {!loading && filteredExpenseData.length > 0 ? (
              filteredExpenseData.map((expense) => (
                <TransactionInfoCard
                  key={expense._id}
                  title={expense.category}
                  icon={expense.icon} // Assuming you have an icon field
                  date={moment(expense.date).format("DD MMM YYYY")}
                  amount={expense.amount}
                  type="expense"
                  onDelete={() => deleteExpense(expense._id)}
                />
              ))
            ) : (
              !loading && (
                <p className="text-gray-500 text-sm text-center p-6">
                  No expenses found. Click "Add Expense" to get started.
                </p>
              )
            )}
          </div>
        </div>
      </div>
      {openDownloadModal && (
        <DownloadModal
          isOpen={openDownloadModal}
          onClose={() => setOpenDownloadModal(false)}
          data={filteredExpenseData}
          type="expense"
        />
      )}
    </DashboardLayout>
  );
};

export default Expense;