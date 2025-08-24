import React from 'react';
import CARD_2 from '../../assets/images/card2.png';
import { LuTrendingUpDown } from 'react-icons/lu';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row w-screen h-screen">
      
      {/* Left side: Form */}
      <div className="w-full md:w-[60vw] px-6 md:px-12 pt-8 pb-12 flex flex-col">
        <h2 className="text-2xl font-bold text-black mb-6">Expense Tracker</h2>
        {children}
      </div>

      {/* Right side: Image and decorations */}
      <div className="w-full md:w-[40vw] h-[40vh] md:h-full bg-violet-50 relative overflow-hidden p-4 md:p-8 flex justify-center items-center">
        
        {/* Decorative circles and rectangle */}
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-5" />
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute bottom-7 left-5" />

        {/* Stats card */}
        <div className="absolute top-8 left-8 z-20">
          <StatsInfoCard 
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="430,000"
            color="bg-primary"
          />
        </div>

        {/* Main image */}
        <img
          src={CARD_2}
          alt="Card"
          className="w-64 sm:w-80 md:w-[90%] absolute bottom-10 right-4 shadow-lg shadow-blue-400/15 rounded-xl"
        />
      </div>

    </div>
  );
};

export default AuthLayout;

/* StatsInfoCard Component */
const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-4 bg-white p-4 rounded-xl shadow-md border border-gray-200/50 z-10 items-center">
      <div
        className={`w-12 h-12 flex items-center justify-center text-2xl text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-lg font-semibold">{value}</span>
      </div>
    </div>
  );
};
