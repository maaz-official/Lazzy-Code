import React, { useState } from 'react';

export default function InputBox({ type, placeholder, value, onChange, id, name, icon, theme }) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={`relative w-full mb-4 ${theme === "dark" ? "dark" : ""}`}>
      <input 
        type={inputType}
        placeholder={placeholder}
        defaultValue={value} // Use value instead of defaultValue for controlled input
        onChange={onChange} 
        id={id} 
        name={name}
        className={`input-box ${theme === "dark" ? "dark:bg-gray-700 dark:text-white" : "bg-gray-200 text-black"}`}
      />

      {icon && <i className={`fi ${icon} input-icon ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}></i>}

      {type === "password" && (
        <i
          className={`fi ${showPassword ? 'fi-rr-eye' : 'fi-rr-eye-crossed'} absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}
          onClick={() => setShowPassword(!showPassword)}
        ></i>
      )}
    </div>
  );
}
