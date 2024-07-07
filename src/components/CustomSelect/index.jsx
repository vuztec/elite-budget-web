import clsx from "clsx";
import React, { useState } from "react";

const CustomSelect = React.forwardRef(({ onChange, value, options, label, disabled }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue) => {
    if (value?.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange(value ? [...value, optionValue] : [optionValue]);
    }
  };

  return (
    <div className="relative">
      {label && <label className="text-slate-800">{label}</label>}
      <div
        className={clsx("cursor-pointer flex flex-auto flex-wrap w-full p-2 text-sm border border-gray-300 rounded-lg", {
          "bg-[whitesmoke] cursor-not-allowed": disabled,
          "bg-transparent": !disabled,
        })}
        onClick={toggleDropdown}>
        {value?.length > 0
          ? options
              .filter((opt) => value?.includes(opt.value))
              .map((opt, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                  <div className="text-xs font-normal leading-none flex-initial">{opt.label}</div>
                </div>
              ))
          : "Select options..."}
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full p-2 mt-1 bg-white border border-gray-300 rounded-lg shadow" ref={ref}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`p-2 hover:bg-gray-100 w-full cursor-pointer text-sm ${value?.includes(option.value) ? "bg-gray-200" : ""}`}
              onClick={() => handleSelect(option.value)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default CustomSelect;
