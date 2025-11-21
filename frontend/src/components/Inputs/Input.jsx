import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash, FaCalendarAlt, FaEnvelope, FaLock, FaUser } from "react-icons/fa";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const getIcon = () => {
    switch (type) {
      case 'email':
        return <FaEnvelope className="text-gray-400" size={16} />;
      case 'password':
        return showPassword ?
          <FaRegEye className="text-primary cursor-pointer hover:text-purple-700 transition-colors" onClick={toggleShowPassword} size={16} /> :
          <FaRegEyeSlash className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" onClick={toggleShowPassword} size={16} />;
      case 'date':
        return <FaCalendarAlt className="text-gray-400" size={16} />;
      default:
        return <FaUser className="text-gray-400" size={16} />;
    }
  };

  return (
    <div className="w-full mb-6">
      <label className={`block mb-2 text-sm font-medium transition-colors duration-200 ${
        isFocused ? 'text-primary' : 'text-gray-700 dark:text-gray-300'
      }`}>
        {label}
      </label>

      <div className={`relative flex items-center border-2 rounded-xl px-4 py-3 bg-white dark:bg-gray-800 transition-all duration-300 ${
        isFocused
          ? 'border-primary shadow-lg shadow-purple-500/20 dark:shadow-purple-500/10'
          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
      }`}>
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm"
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoComplete={type === 'email' ? 'email' : type === 'tel' ? 'tel' : type === 'password' ? 'current-password' : 'off'}
        />

        <div className="ml-2 flex-shrink-0">
          {getIcon()}
        </div>
      </div>
    </div>
  )
}

export default Input
