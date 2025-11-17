import React from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      {/* Navbar */}
      <Navbar activeMenu={activeMenu} />

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Side Menu (Desktop only) */}
        <aside className="hidden lg:block w-64 bg-white dark:bg-gray-800 shadow-md">
          <SideMenu activeMenu={activeMenu} />
        </aside>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-100 dark:bg-gray-900">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
