import React from "react";
import { MdFiberNew, MdRateReview } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import clsx from "clsx";
import { themeColors, getStatusColor } from "../../utils";
import { GiProgression } from "react-icons/gi";
import { BsHourglassTop, BsSignStopFill } from "react-icons/bs";
import {
  DelayedTasks,
  LatestMainTasks,
  PercentageCompleteChart,
  TaskPriorityChart,
  TaskStatusChart,
  UrgentTasks,
} from "../../components/task";

export const TaskDashView = ({ gridData, customDateFormat, projectData }) => {
  const stats = [
    {
      _id: "1",
      label: "To-Do",
      total: gridData?.filter((item) => item.Stage === "To-Do").length || 0,
      icon: <MdFiberNew />,
      bg: "bg-white",
      tx: "text-[#808080]",
      footer: "not yet complete",
    },
    {
      _id: "2",
      label: "In-Progress",
      total:
        gridData?.filter((item) => item.Stage === "In-Progress").length || 0,
      icon: <GiProgression />,
      bg: "bg-white",
      tx: "text-[#FFC000]",
      footer: "not yet closed",
    },
    {
      _id: "5",
      label: "On-Hold",
      total: gridData?.filter((item) => item.Stage === "On-Hold").length || 0,
      icon: <BsSignStopFill />,
      bg: "bg-white",
      tx: "text-[#FF0000]",
      footer: "waiting for a decision",
    },
    {
      _id: "6",
      label: "Backlog",
      total: gridData?.filter((item) => item.Stage === "Backlog").length || 0,
      icon: <BsHourglassTop />,
      bg: "bg-white",
      tx: "text-[#7030A0]",
      footer: "waiting for a decision",
    },
    {
      _id: "3",
      label: "Review",
      total: gridData?.filter((item) => item.Stage === "Review").length || 0,
      icon: <MdRateReview />,
      bg: "bg-white",
      tx: "text-[#92D050]",
      footer: "not yet closed",
    },
    {
      _id: "4",
      label: "Completed",
      total: gridData?.filter((item) => item.Stage === "Completed").length,
      icon: <FaCheckSquare />,
      bg: "bg-white",
      tx: "text-[#00B050]",
      footer: "not yet complete",
    },
  ];

  const Card = ({ label, count, bg, icon, footer, tx }) => {
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
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-5">
        {stats.map(({ icon, bg, label, total, footer, tx }, index) => (
          <Card
            key={index}
            icon={icon}
            bg={bg}
            tx={tx}
            label={label}
            count={total}
            footer={footer}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-5">
        <PercentageCompleteChart updatedTaskData={gridData} />
        <TaskPriorityChart updatedTaskData={gridData} />
        <TaskStatusChart updatedTaskData={gridData} />
      </div>

      <div className="w-full flex flex-col xl:flex-row gap-3 2xl:gap-5 pt-0">
        <UrgentTasks
          urgentTaskData={gridData}
          customDateFormat={customDateFormat}
          projectData={projectData}
        />
      </div>

      <div className="w-full flex flex-col xl:flex-row gap-3 2xl:gap-5 pt-0">
        <DelayedTasks
          delayedTaskData={gridData}
          customDateFormat={customDateFormat}
          projectData={projectData}
        />
      </div>

      <div className="w-full flex flex-col xl:flex-row gap-3 2xl:gap-5 pt-0">
        <LatestMainTasks
          latestTaskData={gridData}
          customDateFormat={customDateFormat}
          projectData={projectData}
        />
      </div>
    </div>
  );
};
