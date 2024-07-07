import React from "react";
import { ProgressBarComponent } from "@syncfusion/ej2-react-progressbar";
import {
  progressBarColor,
  themeColors,
  trackBarColor,
  varyingColors,
} from "../../utils";
import Title from "../Title";
import { MdOutlineTask } from "react-icons/md";

export const PercentageCompleteChart = ({ updatedTaskData }) => {
  const getPercentageComplete = (data) => {
    const activeMatchingData = data?.filter(
      (item) => item.Stage !== "Cancelled" && item.Stage !== "On-Hold"
    );

    // Calculate the total duration of all tasks
    const totalDuration = activeMatchingData?.reduce((total, task) => {
      const taskDuration = Number(task.TaskDuration);
      return !isNaN(taskDuration) ? total + taskDuration : total;
    }, 0);

    //loop through each task in activeMatchingData to calculate the project % complete
    const totalComplete = activeMatchingData?.reduce((total, task) => {
      // Calculate the completion percentage for each task
      const taskDuration = task.TaskDuration ? Number(task.TaskDuration) : 0;
      const actualComplete = task.ActualComplete
        ? parseFloat(task.ActualComplete)
        : 0;
      const taskComplete = (actualComplete * taskDuration) / totalDuration;
      return total + taskComplete;
    }, 0);

    return totalComplete;
  };
  const overallPercentageComplete = getPercentageComplete(updatedTaskData);
  //const formattedComplete = {totalComplete.toFixed(0)}+"%"

  const chartWidth = "100%";
  const chartHeight = "330px";

  return (
    <>
      {updatedTaskData?.length > 0 && (
        <div className="w-full flex flex-col pb-7 items-left shadow-md rounded bg-white">
          <div className="flex items-center justify-start m-5 gap-2">
            <MdOutlineTask className={`text-2xl text-[${themeColors[1]}]`} />
            <Title title="Overall Actual % Complete" />
          </div>
          <ProgressBarComponent
            id="percentage"
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
            trackColor={trackBarColor}
            progressColor={progressBarColor}
            trackThickness={70}
            progressThickness={70}
            //animation={{enable: true, duration: 2000, delay: 0}}
          ></ProgressBarComponent>
        </div>
      )}
    </>
  );
};
