import React from "react";
import { MdFiberNew, MdRateReview } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import clsx from "clsx";
import { themeColors, getStatusColor } from "../../utils";
import {
  LatestMainCosts,
  PoCosts,
  InvoiceCost,
  CostCategoryChart,
} from "../../components/cost";
import { ProjectCostChart } from "../../components/project";
import { BiSolidXSquare } from "react-icons/bi";

export const CostDashView = ({
  gridData,
  customDateFormat,
  usedCurrency,
  projectData,
}) => {
  const stats = [
    {
      _id: "1",
      label: "Quote",
      total: gridData?.filter((item) => item.Stage === "Quote").length || 0,
      icon: <MdFiberNew />,
      footer: "quote records",
    },
    {
      _id: "2",
      label: "PO",
      total: gridData?.filter((item) => item.Stage === "PO").length || 0,
      icon: <MdRateReview />,
      footer: "po records",
    },
    {
      _id: "3",
      label: "Invoice",
      total: gridData?.filter((item) => item.Stage === "Invoice").length,
      icon: <MdRateReview />,
      footer: "invoice records",
    },
    {
      _id: "4",
      label: "Paid",
      total: gridData?.filter((item) => item.Stage === "Paid").length || 0,
      icon: <FaCheckSquare />,
      footer: "payment records",
    },
    {
      _id: "5",
      label: "Void",
      total: gridData?.filter((item) => item.Stage === "Void").length,
      icon: <BiSolidXSquare />,
      footer: "void records",
    },
  ];

  const Card = ({ label, count, icon, footer }) => {
    return (
      <div className="w-full h-fit bg-white px-5 py-3 shadow-md rounded-md gap-5 flex flex-col justify-between text-center">
        <p className="text-base text-blue-900 font-semibold">{label}</p>
        <div className="h-full flex flex-row items-center justify-center gap-2">
          <span
            className={clsx(
              "px-2 text-5xl font-bold",
              `text-[${themeColors[0]}]`
            )}
          >
            {count}
          </span>
          <div
            className={clsx(
              "min-w-16 h-16 rounded-full flex items-center justify-center text-3xl md:text-4xl",
              getStatusColor(label)
            )}
          >
            {icon}
          </div>
        </div>
        <div>
          <span className="text-sm text-gray-400">{footer}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 py-0">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 2xl:gap-5">
        {stats.map(({ icon, label, total, footer }, index) => (
          <Card
            key={index}
            icon={icon}
            label={label}
            count={total}
            footer={footer}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-5">
        <CostCategoryChart
          updatedCostData={gridData}
          usedCurrency={usedCurrency}
        />

        <ProjectCostChart
          updatedCostData={gridData}
          updatedProjectData={projectData}
          usedCurrency={usedCurrency}
        />
      </div>

      <div className="w-full flex flex-col xl:flex-row gap-4 2xl:gap-5 pt-0">
        <InvoiceCost
          updatedCostData={gridData}
          customDateFormat={customDateFormat}
          usedCurrency={usedCurrency}
          projectData={projectData}
        />
      </div>

      <div className="w-full flex flex-col xl:flex-row gap-4 2xl:gap-5 pt-0">
        <PoCosts
          updatedCostData={gridData}
          customDateFormat={customDateFormat}
          usedCurrency={usedCurrency}
          projectData={projectData}
        />
      </div>

      <div className="w-full flex flex-col xl:flex-row gap-4 2xl:gap-5 pt-0">
        <LatestMainCosts
          updatedCostData={gridData}
          customDateFormat={customDateFormat}
          usedCurrency={usedCurrency}
          projectData={projectData}
        />
      </div>
    </div>
  );
};
