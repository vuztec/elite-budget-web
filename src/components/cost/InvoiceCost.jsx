import React, { useEffect, useState } from "react";
import Title from "../Title";
import Button from "../Button";
import clsx from "clsx";
import { getStatusColor, themeColors } from "../../utils";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { CostListView } from "./CostListView";
import { FaEye } from "react-icons/fa";

export const InvoiceCost = ({
  updatedCostData,
  customDateFormat,
  usedCurrency,
  projectData,
}) => {
  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    const highCosts = updatedCostData?.filter(
      (item) => item.Stage === "Invoice"
    );
    setGridData(highCosts);
  }, [updatedCostData]);

  const viewAllClick = () => {
    navigate("/costs?name=costs&tab=2");
  };

  return (
    <>
      {gridData?.length > 0 && (
        <>
          <div className="flex flex-col w-full gap-2 shadow-md rounded bg-white">
            <div className="flex items-center justify-between px-2 pt-3 md:px-5 ">
              <div className="flex items-center gap-2">
                <LiaMoneyCheckAltSolid
                  className={clsx(
                    "text-3xl rounded-full",
                    getStatusColor("Invoice")
                  )}
                />
                <Title title="Active Invoices" />
              </div>
              <Button
                label="View All"
                icon={<FaEye className="text-sm md:text-lg" />}
                className={clsx(
                  "flex flex-row-reverse gap-1 items-center text-white hover:bg-viewcolor rounded-full px-2 py-1",
                  `bg-[${themeColors[1]}] hover:text-[${themeColors[1]}]`
                )}
                onClick={() => viewAllClick()}
              />
            </div>
            <div className="overflow-x-auto">
              <CostListView
                gridData={gridData}
                customDateFormat={customDateFormat}
                usedCurrency={usedCurrency}
                projectData={projectData}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
