import React from "react";
import { MdFiberNew, MdRateReview } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import clsx from "clsx";
import { themeColors, getStatusColor } from "../../utils";
import { GiProgression } from "react-icons/gi";
import { BsSignStopFill } from "react-icons/bs";
import { PiPulseFill } from "react-icons/pi";
import { LatestProjects } from "../home";
import { ProjectCostChart } from "../../components/project";

import {
  PercentageCompleteChart,
  PlanPercentageCompleteChart,
  TaskPriorityChart,
  TaskStageChart,
  TaskStatusChart,
} from "../../components/task";

export const ProjectDashView = ({
  gridData,
  customDateFormat,
  usedCurrency,
  updatedCostData,
  updatedTaskData,
}) => {
  const stats = [
    {
      _id: "1",
      label: "Initiation",
      total:
        gridData?.filter((item) => item.ProjectStage === "Initiation").length ||
        0,
      icon: <MdFiberNew />,
      footer: "being identified",
    },
    {
      _id: "2",
      label: "Planning",
      total:
        gridData?.filter((item) => item.ProjectStage === "Planning").length ||
        0,
      icon: <MdRateReview />,
      footer: "putting plans in place",
    },
    {
      _id: "3",
      label: "Execution",
      total:
        gridData?.filter((item) => item.ProjectStage === "Execution").length ||
        0,
      icon: <GiProgression />,
      footer: "work in progress",
    },
    {
      _id: "4",
      label: "Monitoring",
      total:
        gridData?.filter((item) => item.ProjectStage === "Monitoring").length ||
        0,
      icon: <PiPulseFill />,
      footer: "implimenting",
    },
    {
      _id: "5",
      label: "Closing",
      total:
        gridData?.filter((item) => item.ProjectStage === "Closing").length || 0,
      icon: <FaCheckSquare />,
      footer: "all tasks completed",
    },
    {
      _id: "7",
      label: "On-Hold",
      total: gridData?.filter((item) => item.ProjectStage === "On-Hold").length,
      icon: <BsSignStopFill />,
      footer: "not working on",
    },
    // {
    //   _id: "6",
    //   label: "Cancelled",
    //   total: gridData?.filter((item) => item.ProjectStage === "Cancelled").length,
    //   icon: <BsSignStopFill />,
    //   footer: "not required",
    // },
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
    <div className="flex flex-col h-full py-0 gap-10">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-5">
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
      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-5">
        <PercentageCompleteChart updatedTaskData={updatedTaskData} />
        <PlanPercentageCompleteChart updatedTaskData={updatedTaskData} />
        <ProjectCostChart
          updatedProjectData={gridData}
          updatedCostData={updatedCostData}
          usedCurrency={usedCurrency}
        />
      </div>
      <div className="w-full flex flex-col xl:flex-row gap-5">
        <LatestProjects
          updatedProjectData={gridData}
          usedCurrency={usedCurrency}
          updatedCostData={updatedCostData}
          updatedTaskData={updatedTaskData}
          customDateFormat={customDateFormat}
        />
      </div>
      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-5">
        <TaskStageChart updatedTaskData={updatedTaskData} />
        <TaskPriorityChart updatedTaskData={updatedTaskData} />
        <TaskStatusChart updatedTaskData={updatedTaskData} />
      </div>
    </div>
  );
};
