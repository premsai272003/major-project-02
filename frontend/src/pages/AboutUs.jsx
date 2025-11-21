import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaBriefcase, FaSearch, FaStar, FaClock, FaSignInAlt } from "react-icons/fa";
import ThemeToggle from "../components/ThemeToggle";
import { ThemeContext } from "../context/ThemeContext";

const AboutUs = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen flex flex-col transition duration-300 
      ${theme === "dark" 
        ? "bg-gray-900 text-white" 
        : "bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-gray-900"
      }`}
    >

      {/* Header */}
      <header className={`p-4 flex justify-between items-center shadow 
        ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
      >
        <ThemeToggle />

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2 cursor-pointer"
          >
            <FaSignInAlt />
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
          >
            Register
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-4 mt-12">

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Find Your{" "}
          <span className={`${theme === "dark" ? "text-yellow-300" : "text-white"}`}>
            Perfect Financial Tracking
          </span>
          Partner
        </h1>

        <p className={`mt-4 max-w-xl 
          ${theme === "dark" ? "text-gray-300" : "text-gray-100"}`}
        >
          Manage your expenses effortlessly with smart insights, analytics, and real-time tracking.
        </p>

        {/* Center Box */}
        <div className={`mt-10 shadow-lg rounded-xl p-6 w-full max-w-3xl 
          ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"}`}
        >
          <p className="text-lg">
            Track your daily expenses, income, savings and get meaningful insights.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition cursor-pointer"
          >
            Get Started
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl w-full">

          <div className={`flex flex-col items-center shadow-md p-6 rounded-xl 
            ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white"}`}
          >
            <FaBriefcase className="text-green-500 text-3xl mb-2" />
            <h3 className="text-xl font-semibold">10k+</h3>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              Users Registered
            </p>
          </div>

          <div className={`flex flex-col items-center shadow-md p-6 rounded-xl 
            ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white"}`}
          >
            <FaStar className="text-yellow-400 text-3xl mb-2" />
            <h3 className="text-xl font-semibold">Smart Insights</h3>
            <p className="text-gray-400 text-sm">Expense Analysis</p>
          </div>

          <div className={`flex flex-col items-center shadow-md p-6 rounded-xl 
            ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white"}`}
          >
            <FaClock className="text-blue-400 text-3xl mb-2" />
            <h3 className="text-xl font-semibold">24/7</h3>
            <p className="text-gray-400 text-sm">Real-Time Tracking</p>
          </div>
        </div>

      </section>
    </div>
  );
};

export default AboutUs;
