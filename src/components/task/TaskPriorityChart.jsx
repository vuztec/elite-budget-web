import React from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationTooltip,
  AccumulationDataLabel,
  PieSeries,
  Inject,
  Category,
} from "@syncfusion/ej2-react-charts";
import { themeColors, varyingColors } from "../../utils";
import Title from "../Title";
import { MdOutlineTask } from "react-icons/md";

export const TaskPriorityChart = ({ updatedTaskData }) => {
  const TaskPriority = ["Urgent", "High", "Medium", "Low"];
  const countOccurrencesByPriority = (data, priorityArray) => {
    const priorityCounts = priorityArray?.reduce((counts, priority) => {
      const count = data?.filter(
        (item) =>
          item.Priority === priority &&
          item.Stage !== "On-Hold" &&
          item.Stage !== "Completed" &&
          item.Stage !== "Cancelled"
      ).length;
      if (count !== 0) {
        // Exclude priorities with count 0
        counts[priority] = count;
      }
      return counts;
    }, {});

    return Object.keys(priorityCounts).map((priority) => ({
      x: priority,
      y: priorityCounts[priority],
    }));
  };
  const priorityChartData = countOccurrencesByPriority(
    updatedTaskData,
    TaskPriority
  );

  const chartWidth = "98%";
  const chartHeight = "80%";

  return (
    <>
      {updatedTaskData?.length > 0 && (
        <div className="w-full flex flex-col items-left shadow-md rounded bg-white">
          <div className="flex items-center justify-start m-5 gap-2">
            <MdOutlineTask className={`text-2xl text-[${themeColors[1]}]`} />
            <Title title="Active Tasks by Priority" />
          </div>
          <AccumulationChartComponent
            id="task-priority-chart"
            width={chartWidth}
            height={chartHeight}
            centerLabel={{
              text: `${
                updatedTaskData?.filter(
                  (item) =>
                    item.Stage !== "On-Hold" &&
                    item.Stage !== "Completed" &&
                    item.Stage !== "Cancelled"
                ).length
              }`,
              textStyle: {
                size: "40px",
                color: `${themeColors[0]}`,
                fontWeight: "900",
                fontFamily: "Roboto",
                textAlignment: "Center",
              },
            }}
            legendSettings={{ visible: true, position: "Bottom" }}
            tooltip={{
              enable: false,
              format: "${point.x} : <b>${point.y}</b>",
            }}
          >
            <Inject
              services={[
                PieSeries,
                AccumulationTooltip,
                Category,
                AccumulationDataLabel,
              ]}
            />
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective
                dataSource={priorityChartData}
                xName="x"
                yName="y"
                type="Pie"
                name="Type"
                radius="80%"
                innerRadius="40%"
                dataLabel={{
                  visible: true,
                  position: "Outside",
                  template: "${point.x}: <b>${point.y}</b>",
                  fill: "whitesmoke",
                  font: {
                    fontWeight: "600",
                    size: "14px",
                    color: `${themeColors[0]}`,
                    fontFamily: "Roboto",
                    textAlignment: "Center",
                  },
                }}
                palettes={varyingColors}
              />
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
        </div>
      )}
    </>
  );
};
