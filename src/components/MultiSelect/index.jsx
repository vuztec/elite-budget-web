import React, { useState } from 'react';

const MultiSelectDropdown = ({ options, placeholder, value, setValue, toggleDropdown, isDropdownOpen }) => {
  const handleOptionClick = (option) => {
    if (value.includes(option)) {
      setValue(value.filter((item) => item !== option));
    } else {
      setValue([...value, option]);
    }
  };

  const isSelected = (option) => value.includes(option);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <div className="bg-white border border-gray-300 rounded p-1 cursor-pointer" onClick={toggleDropdown}>
        <span className="text-gray-600 text-sm">{placeholder}</span>
      </div>

      {isDropdownOpen && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded mt-1 z-10">
          {options.map((option, index) => (
            <div
              key={index}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${isSelected(option) ? 'bg-blue-100' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
