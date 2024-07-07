import React from "react";
import CostCard from "./CostCard";

export const CostBoardView = ({
  costs,
  customDateFormat,
  usedCurrency,
  projectData,
}) => {
  return (
    <div className="w-full py-0 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-4 xl:gap-5">
      {costs?.map((cost, index) => (
        <CostCard
          cost={cost}
          key={index}
          customDateFormat={customDateFormat}
          usedCurrency={usedCurrency}
          projectData={projectData}
        />
      ))}
    </div>
  );
};

export default CostBoardView;
