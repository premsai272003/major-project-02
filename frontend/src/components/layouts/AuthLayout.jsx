import React from 'react';
import CARD_2 from '../../assets/images/card2.png';
import { LuTrendingUpDown, LuDollarSign, LuTarget } from 'react-icons/lu';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row w-screen min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

      {/* Left side: Form */}
      <div className="w-full md:w-[60vw] px-6 md:px-12 pt-8 pb-12 flex flex-col justify-center min-h-screen">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold gradient-text mb-2">Expense Tracker</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Take control of your finances</p>
          </div>
          <div className="animate-fade-in">
            {children}
          </div>
        </div>
      </div>

      {/* Right side: Enhanced design */}
      <div className="w-full md:w-[40vw] min-h-[50vh] md:min-h-screen relative overflow-hidden flex justify-center items-center">

        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-500/5 to-pink-500/10 dark:from-purple-600/20 dark:via-blue-500/10 dark:to-pink-500/20" />

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full opacity-20 animate-bounce-subtle" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg rotate-45 opacity-15 animate-bounce-subtle" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-32 left-20 w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full opacity-25 animate-bounce-subtle" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg rotate-12 opacity-20 animate-bounce-subtle" style={{animationDelay: '0.5s'}} />

        {/* Feature cards */}
        <div className="absolute top-16 left-8 z-20 animate-slide-up">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Expenses"
            value="Real-time"
            color="bg-gradient-to-r from-purple-500 to-purple-600"
          />
        </div>

        <div className="absolute top-32 right-12 z-20 animate-slide-up" style={{animationDelay: '0.2s'}}>
          <StatsInfoCard
            icon={<LuDollarSign />}
            label="Manage Income"
            value="Smart"
            color="bg-gradient-to-r from-blue-500 to-blue-600"
          />
        </div>



        {/* Main image with enhanced styling */}
        <div className="relative z-10 animate-fade-in" style={{animationDelay: '0.6s'}}>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl transform rotate-6" />
          <img
            src={CARD_2}
            alt="Expense Tracker Dashboard"
            className="relative w-80 sm:w-96 md:w-[85%] shadow-2xl shadow-purple-500/25 rounded-2xl transform hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Bottom decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent dark:from-gray-900/50" />
      </div>

    </div>
  );
};

export default AuthLayout;

/* StatsInfoCard Component */
const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200/50 dark:border-gray-700 z-10 items-center">
      <div
        className={`w-12 h-12 flex items-center justify-center text-2xl text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</h6>
        <span className="text-lg font-semibold text-black dark:text-white">{value}</span>
      </div>
    </div>
  );
};
