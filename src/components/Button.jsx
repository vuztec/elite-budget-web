import clsx from "clsx";
import React from "react";

const Button = ({ disabled = false, icon, className, label, type, onClick = () => {} }) => {
  return (
    <button
      type={type || "button"}
      disabled={disabled}
      className={clsx(
        "px-4 py-1 rounded-full text-sm font-semibold outline-none sm:w-auto",
        // `bg-[${themeColors[1]}] hover:bg-viewcolor`,
        className
      )}
      onClick={onClick}
    >
      <span>{label}</span>
      {icon && icon}
    </button>
  );
};

export default Button;
