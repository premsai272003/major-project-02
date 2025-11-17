import React, { useState, useContext } from "react";
import { HiOutlineMenu, HiOutlineX, HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import SideMenu from "./SideMenu";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200/50 dark:border-gray-700 py-4 px-7 sticky top-0 z-30">
      {/* Left Section: Mobile Menu Button + Title */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          className="block lg:hidden text-black dark:text-white"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        {/* App Title */}
        <h2 className="text-lg font-medium text-black dark:text-white">Expense Tracker</h2>
      </div>

      {/* Right Section: Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        {theme === "light" ? (
          <HiOutlineMoon className="text-xl" />
        ) : (
          <HiOutlineSun className="text-xl" />
        )}
      </button>

      {/* Mobile Side Menu (Drawer) */}
      {openSideMenu && (
        <div className="fixed top-[61px] left-0 w-64 h-[calc(100vh-61px)] bg-white dark:bg-gray-800 shadow-lg z-40">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
