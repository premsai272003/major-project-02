import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold gradient-text mb-2">Expense Tracker</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Take control of your finances</p>
        </div>
        <div className="animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
