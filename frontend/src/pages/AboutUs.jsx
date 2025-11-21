import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBriefcase, FaSearch, FaStar, FaClock, FaSignInAlt } from "react-icons/fa";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex flex-col">
      
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-end">
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
          <span className="text-white">
            Perfect Financial Tracking
          </span>
          Partner
        </h1>

        <p className="mt-4 text-gray-600 max-w-xl">
          Manage your expenses effortlessly with smart insights, analytics, and
          real-time tracking.
        </p>

        {/* Center Box/Search Styled */}
        <div className="mt-10 bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl">
          <p className="text-gray-700 text-lg">
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
          <div className="flex flex-col items-center bg-white shadow-md p-6 rounded-xl">
            <FaBriefcase className="text-green-600 text-3xl mb-2" />
            <h3 className="text-xl font-semibold">10k+</h3>
            <p className="text-gray-500 text-sm">Users Registered</p>
          </div>

          <div className="flex flex-col items-center bg-white shadow-md p-6 rounded-xl">
            <FaStar className="text-yellow-500 text-3xl mb-2" />
            <h3 className="text-xl font-semibold">Smart Insights</h3>
            <p className="text-gray-500 text-sm">Expense Analysis</p>
          </div>

          <div className="flex flex-col items-center bg-white shadow-md p-6 rounded-xl">
            <FaClock className="text-blue-500 text-3xl mb-2" />
            <h3 className="text-xl font-semibold">24/7</h3>
            <p className="text-gray-500 text-sm">Real-Time Tracking</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
