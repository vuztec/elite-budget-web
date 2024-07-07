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

export const TaskStageChart = ({ updatedTaskData }) => {
  const TaskStage = [
    "Completed",
    "Review",
    "Backlog",
    "On-Hold",
    "In-Progress",
    "To-Do",
  ];
  const countOccurrencesByStage = (data, stageArray) => {
    const stageCounts = stageArray.reduce((counts, stage) => {
      const count = data?.filter((item) => item.Stage === stage).length;
      if (count !== 0) {
        // Exclude priorities with count 0
        counts[stage] = count;
      }
      return counts;
    }, {});

    return Object.keys(stageCounts).map((stage) => ({
      x: stage,
      y: stageCounts[stage],
    }));
  };
  const stageChartData = countOccurrencesByStage(updatedTaskData, TaskStage);

  const chartWidth = "98%";
  const chartHeight = "80%";

  return (
    <>
      {updatedTaskData?.length > 0 && (
        <div className="w-full flex flex-col items-left shadow-md rounded bg-white">
          <div className="flex items-center justify-start m-5 gap-2">
            <MdOutlineTask className={`text-2xl text-[${themeColors[1]}]`} />
            <Title title="All Tasks by status" />
          </div>
          <AccumulationChartComponent
            id="task-stage-chart"
            width={chartWidth}
            height={chartHeight}
            centerLabel={{
              text: `${updatedTaskData?.length}`,
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
                dataSource={stageChartData}
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
