import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full mb-4">
      {/*  Fixed label visibility */}
      <label className="block mb-1 text-[13px] text-slate-800 dark:text-white">{label}</label>

      <div className="flex items-center border border-black rounded-md px-2 py-1 bg-white">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-black placeholder-gray-500"
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          showPassword ? (
            <FaRegEye
              size={20}
              className="text-primary cursor-pointer"
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEyeSlash
              size={20}
              className="text-slate-400 cursor-pointer"
              onClick={toggleShowPassword}
            />
          )
        )}
        {type === "date" && (
          <div className="text-blue-500 cursor-pointer">
            
          </div>
        )}
      </div>
    </div>
  )
}

export default Input
