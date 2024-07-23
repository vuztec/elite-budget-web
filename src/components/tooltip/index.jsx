import React from "react";

const ToolTip = ({ text }) => {
  return (
    <div className="group-hover:opacity-100 transition-opacity bg-gray-800 px-4 z-10 py-1 text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 mx-auto ">
      {text}
    </div>
  );
};

export default ToolTip;
