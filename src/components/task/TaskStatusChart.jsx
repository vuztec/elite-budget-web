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
import { getTaskStatus, themeColors, varyingColors } from "../../utils";
import Title from "../Title";
import { MdOutlineTask } from "react-icons/md";

export const TaskStatusChart = ({ updatedTaskData }) => {
  const TaskStatus = ["Ahead", "On-Track", "Delayed"];
  const countOccurrencesBystatus = (data) => {
    const statusCounts = TaskStatus?.reduce((counts, status) => {
      counts[status] = data?.reduce((total, item) => {
        const actual = Number(item.ActualComplete);
        const startDate = new Date(item.StartDate);
        const taskDuration = Number(item.TaskDuration);

        const itemStatus = getTaskStatus(actual, startDate, taskDuration);

        if (
          status === itemStatus &&
          item.Stage !== "On-Hold" &&
          item.Stage !== "Completed" &&
          item.Stage !== "Cancelled"
        ) {
          total++;
        }

        return total;
      }, 0);

      return counts;
    }, {});

    const chartData = TaskStatus?.map((status) => ({
      x: status,
      y: statusCounts[status] || 0,
    }));

    return chartData.filter(({ y }) => y > 0);
  };

  const statusChartData = countOccurrencesBystatus(updatedTaskData);

  const chartWidth = "98%";
  const chartHeight = "80%";

  return (
    <>
      {updatedTaskData?.length > 0 && (
        <div className="w-full flex flex-col items-left shadow-md rounded bg-white">
          <div className="flex items-center justify-start m-5 gap-2">
            <MdOutlineTask className={`text-2xl text-[${themeColors[1]}]`} />
            <Title title="Active Tasks by Flag" />
          </div>
          <AccumulationChartComponent
            id="task-status-chart"
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
                dataSource={statusChartData}
                xName="x"
                yName="y"
                type="Pie"
                name="status"
                radius="80%"
                innerRadius="40%"
                dataLabel={{
                  visible: true,
                  position: "Outside",
                  template: "${point.x}: <b>${point.y}</b>",
                  fill: "whitesmoke",
                  textAlignment: "Center",
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
