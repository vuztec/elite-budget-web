import React from "react";

const ToolTip = ({ text }) => {
  return (
    <div
      className={`hidden group-hover:block transition-opacity bg-gray-800 mt-2 px-4 z-10 py-1 text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full`}
    >
      {text}
    </div>
  );
};

export default ToolTip;
