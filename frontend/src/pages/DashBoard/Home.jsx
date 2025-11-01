import React, { useEffect, useState, useContext } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/Cards/InfoCard";

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from "../../utils/helper";
import { UserContext } from "../../context/UserContext";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
// ⚠️ Missing import added for FinanceOverView
import FinanceOverView from "../../components/Dashboard/FinanceOverView";

const Home = () => {
  useUserAuth(); // check authentication
  const { user } = useContext(UserContext); // logged-in user

  const navigate = useNavigate();
  const [DashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch Dashboard Data
  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">

        {/* User Image & Welcome Section */}
        <div className="flex items-center gap-4 mb-6">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-medium">
              {user?.fullName?.[0] || "U"}
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Welcome back, {user?.fullName || "User"}
            </h2>
            <p className="text-sm text-gray-500">
              Here’s your financial summary
            </p>
          </div>
        </div>

        {/* Info Cards Section */}
        {/* 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(DashboardData?.totalBalance || 0)}
            color="bg-primary"
          />

          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(DashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />

          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeparator(DashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div> 
        */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={DashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverView
            totalBalance={DashboardData?.totalBalance || 0}
            totalIncome={DashboardData?.totalIncome || 0}
            totalExpense={DashboardData?.totalExpense || 0}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
