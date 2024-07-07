import React from "react";
import { ProgressBarComponent } from "@syncfusion/ej2-react-progressbar";
import {
  getTaskPlanPercentage,
  progressBarColorPlan,
  themeColors,
  trackBarColorPlan,
  varyingColors,
} from "../../utils";
import Title from "../Title";
import { MdOutlineTask } from "react-icons/md";

export const PlanPercentageCompleteChart = ({ updatedTaskData }) => {
  const getPlanProjectPercentageComplete = (data) => {
    const activeMatchingData = data?.filter(
      (item) => item.Stage !== "Cancelled" && item.Stage !== "On-Hold"
    );
    // Calculate the total planned duration of all tasks
    const totalDuration = activeMatchingData?.reduce((total, task) => {
      const taskDuration = Number(task.TaskDuration);
      return !isNaN(taskDuration) ? total + taskDuration : total;
    }, 0);
    // Loop through each task to calculate the project % complete based on planned duration
    let totalComplete = activeMatchingData?.reduce((total, task) => {
      // Calculate the completion percentage for each task based on planned duration
      const taskDuration = task.TaskDuration ? Number(task.TaskDuration) : 0;
      const taskPlan = getTaskPlanPercentage(task.StartDate, taskDuration);
      const taskComplete = (taskPlan * taskDuration) / totalDuration;
      return total + taskComplete;
    }, 0);
    totalComplete = parseFloat(totalComplete?.toFixed(0));
    return totalComplete;
  };
  const overallPercentageComplete =
    getPlanProjectPercentageComplete(updatedTaskData);

  const chartWidth = "100%";
  const chartHeight = "330px";

  return (
    <>
      {updatedTaskData?.length > 0 && (
        <div className="w-full flex flex-col pb-7 items-left shadow-md rounded bg-white">
          <div className="flex items-center justify-start m-5 gap-2">
            <MdOutlineTask className={`text-2xl text-[${themeColors[1]}]`} />
            <Title title="Overall Plan % Complete" />
          </div>
          <ProgressBarComponent
            id="plan-percentage"
            width={chartWidth}
            height={chartHeight}
            type="Circular"
            showProgressValue={true}
            textAlignment="Center"
            labelStyle={{
              size: "40px",
              color: `${varyingColors[0]}`,
              fontWeight: "900",
              fontFamily: "Roboto",
              textAlignment: "Center",
            }}
            radius="100%"
            innerRadius="100%"
            segmentCount={1}
            minimum={0}
            maximum={100}
            value={overallPercentageComplete}
            trackColor={trackBarColorPlan}
            progressColor={progressBarColorPlan}
            trackThickness={70}
            progressThickness={70}
            //animation={{enable: true, duration: 2000, delay: 0}}
          ></ProgressBarComponent>
        </div>
      )}
    </>
  );
};
