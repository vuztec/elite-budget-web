import React, { useEffect, useState } from "react";
import Title from "../Title";
import Button from "../Button";
import { MdOutlineTask } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import clsx from "clsx";
import { getTaskStatus, themeColors } from "../../utils";
import { useNavigate } from "react-router-dom";
import TaskListView from "./TaskListView";

export const DelayedTasks = ({
  delayedTaskData,
  customDateFormat,
  projectData,
}) => {
  const [gridData, setGridData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const UrgentTasks = delayedTaskData?.filter(
      (item) =>
        item.Stage !== "On-Hold" &&
        item.Stage !== "Completed" &&
        item.Stage !== "Cancelled" &&
        getTaskStatus(
          Number(item.ActualComplete),
          new Date(item.StartDate),
          Number(item.TaskDuration)
        ) === "Delayed"
    );
    setGridData(UrgentTasks);
  }, [delayedTaskData]);

  const viewAllClick = () => {
    navigate("/tasks?name=tasks&tab=2");
  };

  return (
    <>
      {gridData?.length > 0 && (
        <>
          <div className="w-full md:px-1 px-0 mb-0 shadow-md rounded bg-white">
            <div className="flex items-center justify-between m-5">
              <div className="flex items-center gap-2">
                <MdOutlineTask className="text-2xl text-red-600" />
                <Title title="Delayed tasks" />
              </div>
              <Button
                label="View All"
                icon={<FaEye className="text-lg" />}
                className={clsx(
                  "flex flex-row-reverse gap-1 items-center text-white hover:bg-viewcolor rounded-full px-2 py-1",
                  `bg-[${themeColors[1]}] hover:text-[${themeColors[1]}]`
                )}
                onClick={() => viewAllClick()}
              />
            </div>

            <div className="overflow-x-auto">
              <TaskListView
                gridData={gridData}
                customDateFormat={customDateFormat}
                projectData={projectData}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
