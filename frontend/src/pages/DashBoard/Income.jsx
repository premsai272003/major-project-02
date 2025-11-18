import React, { useState, useEffect, useContext } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
// FIX: Corrected import to use the proper export name with Lu prefix
import { LuPlus, LuDownload, LuFilter, LuLoader as Loader2} from "react-icons/lu";
import moment from "moment";
import toast from "react-hot-toast";

// FIX: Corrected component path from ../../components/Income/ to ../../components/Dashboard/Income/
import AddIncomeModal from "../../components/Modals/AddIncomeModal";
import FilterModal from "../../components/Modals/FilterModal";
import DownloadModal from "../../components/Modals/DownloadModal";
import IncomeOverview from "../../components/Income/IncomeOverview";
import TransactionInfoCard from "../../components/Cards/TransactionInfoCard";

const Income = () => {
 useUserAuth();
 const { user } = useContext(UserContext);

 const [incomeData, setIncomeData] = useState([]);
 const [loading, setLoading] = useState(false);
 const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
 const [openFilterModal, setOpenFilterModal] = useState(false);
 const [openDownloadModal, setOpenDownloadModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Filtered data for display and download
  const filteredIncomeData = startDate && endDate ? incomeData.filter(income => {
    const incomeDate = new Date(income.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return incomeDate >= start && incomeDate <= end;
  }) : incomeData;

  // Fetch All Income Details
 const fetchIncomeDetails = async () => {
 if (loading) return;
 setLoading(true);
 try {
 const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL);
 if (response.data) {
 setIncomeData(response.data);
 }
 } catch (error) {
 console.error("Failed to fetch incomes:", error);
 } finally {
 setLoading(false);
 }
 };

 // Handle Add Income
 const handleAddIncome = async (income) => {
 try {
 await axiosInstance.post(API_PATHS.INCOME.ADD, income);
 fetchIncomeDetails();
 setOpenAddIncomeModal(false);
 toast.success("Income added successfully!");
 } catch (error) {
 console.error("Failed to add income:", error);
 toast.error("Failed to add income. Please try again.");
 }
 };

 // Delete Income
 const deleteIncome = async (id) => {
 if (!window.confirm("Are you sure you want to delete this income?")) return;
 try {
 await axiosInstance.delete(API_PATHS.INCOME.DELETE.replace(":id", id));
 fetchIncomeDetails();
 } catch (error) {
 console.error("Failed to delete income:", error);
 }
 };



 // Handle Filter
 const handleApplyFilter = (newStartDate, newEndDate) => {
   setStartDate(newStartDate);
   setEndDate(newEndDate);
 };

 useEffect(() => {
 if (user) {
 fetchIncomeDetails();
 }
 }, [user]);

return (
 <DashboardLayout activeMenu="Income">
 {openAddIncomeModal && (
 <AddIncomeModal
 onClose={() => setOpenAddIncomeModal(false)}
 onSave={handleAddIncome}
 />
 )}
 {openFilterModal && (
 <>
 <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40">
 <h1 className="text-6xl font-bold text-gray-200 dark:text-gray-800">Income</h1>
 </div>
 <FilterModal
 isOpen={openFilterModal}
 onClose={() => setOpenFilterModal(false)}
 onApplyFilter={handleApplyFilter}
 type="income"
 />
 </>
 )}
 <div className="my-5 mx-auto max-w-7xl">
 {/* Header */}
 <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
 <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Income</h2>
 <div className="flex items-center gap-4">
 <button
 onClick={() => setOpenFilterModal(true)}
 className="flex items-center gap-2 text-sm text-primary font-medium py-2 px-4 rounded-lg hover:bg-purple-50"
>
 <LuFilter size={18} />
 Filter
 </button>
 <button
 onClick={() => setOpenDownloadModal(true)}
 className="flex items-center gap-2 text-sm text-primary font-medium py-2 px-4 rounded-lg hover:bg-purple-50"
>
 <LuDownload size={18} />
 Download
 </button>
 <button
 onClick={() => setOpenAddIncomeModal(true)}
 className="flex items-center gap-2 bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
>
 <LuPlus size={20} />
Add Income
 </button>
 </div>
 </div>
 {/* Chart */}
 <IncomeOverview transactions={incomeData} startDate={startDate} endDate={endDate} />

 {/* All Income List */}
 <div className="card mt-6 p-4 rounded-2xl shadow-md bg-white">
 <h5 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
 All Income Sources
 </h5>

 <div className="mt-6 flex flex-col gap-2">
 {/* Loader */}
 {loading && (
 <div className="flex justify-center p-8">
 <Loader2 className="animate-spin text-primary" size={32} /> {/* Using the correct Loader2 name */}
 </div>
 )}

  {/* Income List */}
  {!loading && filteredIncomeData.length > 0 ? (
  filteredIncomeData.map((income) => (
  <TransactionInfoCard
  key={income._id}
  title={income.source}
  icon={income.icon}
  date={moment(income.date).format("DD MMM YYYY")}
  amount={income.amount}
  type="income"
  onDelete={() => deleteIncome(income._id)}
  />
))
) : (
  !loading && (
  <p className="text-gray-500 text-sm text-center p-6">
  No income found. Click "Add Income" to get started.
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
      data={filteredIncomeData}
      type="income"
    />
  )}
 </DashboardLayout>
);
};

export default Income;