import React from 'react';

const ToolTip = ({ text }) => {
  return (
    <div
      className={`whitespace-nowrap hidden group-hover:block transition-opacity bg-gray-800 mt-2 px-4 z-10 py-1 text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full`}
    >
      {text}
    </div>
  );
};

export default ToolTip;

export const ToolTip2 = ({ showing, item }) => {
  return (
    <div className="pl-10">
      <ToolTip text={showing ? `Show your ${item}` : `Show all ${item}`} />
    </div>
  );
};
