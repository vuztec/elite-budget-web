import React from 'react';

export const getNoData = (item) => {
  return (
    <div className="w-fit h-fit bg-white text-red-600 py-5 shadow-md rounded-2xl">
      <span className="text-xl md:text-2xl italic m-5">{`No ${item} Available!!!`}</span>
    </div>
  );
};
