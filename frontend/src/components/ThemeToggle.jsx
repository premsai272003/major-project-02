import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.85 }}
      className="w-12 h-12 flex items-center justify-center rounded-full
                 bg-gray-200 dark:bg-gray-800 shadow-lg cursor-pointer 
                 transition-all duration-300"
    >
      {/* Sun Icon */}
      <motion.span
        key="sun"
        initial={{ rotate: -90, opacity: 0 }}
        animate={{
          rotate: theme === "light" ? 0 : 90,
          opacity: theme === "light" ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
        className="absolute text-yellow-500 text-2xl"
      >
        <BsSunFill />
      </motion.span>

      {/* Moon Icon */}
      <motion.span
        key="moon"
        initial={{ rotate: 90, opacity: 0 }}
        animate={{
          rotate: theme === "dark" ? 0 : -90,
          opacity: theme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
        className="absolute text-blue-300 text-2xl"
      >
        <BsMoonStarsFill />
      </motion.span>
    </motion.button>
  );
};

export default ThemeToggle;
