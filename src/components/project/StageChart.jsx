import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  DataLabel,
  Category,
  Tooltip,
  ColumnSeries,
} from "@syncfusion/ej2-react-charts";
import { themeColors, varyingColors } from "../../utils";
import Title from "../Title";
import { GrProjects } from "react-icons/gr";

export const StageChart = ({ updatedProjectData }) => {
  const ProjectStage = [
    "Initiation",
    "Planning",
    "Execution",
    "Monitoring",
    "Closing",
    "On-Hold",
    "Cancelled",
  ];
  const countOccurrencesByStage = (data, stageArray) => {
    const stageColorMap = {
      Initiation: varyingColors[0],
      Planning: varyingColors[1],
      Execution: varyingColors[2],
      Monitoring: varyingColors[3],
      Closing: varyingColors[4],
      "On-Hold": varyingColors[5],
      Cancelled: varyingColors[6],
    };
    const stageCounts = stageArray?.reduce((counts, stage) => {
      counts[stage] = data?.filter(
        (item) => item.ProjectStage === stage
      ).length;
      return counts;
    }, {});

    return Object.keys(stageCounts)?.map((stage) => ({
      x: stage,
      y: stageCounts[stage],
      color: stageColorMap[stage] || themeColors[0],
    }));
  };
  const statusChartData = countOccurrencesByStage(
    updatedProjectData,
    ProjectStage
  );

  const chartWidth = "100%";
  const chartHeight = "330px";
  const primaryxAxis = {
    valueType: "Category",
    labelRotation: -60,
    labelStyle: {
      color: "#20409A",
      fontWeight: "normal",
      size: "14px",
      fontFamily: "Segoe UI",
    },
  };

  const primaryyAxis = { visible: false };
  const marker = {
    dataLabel: {
      visible: true,
      font: {
        color: "#20409A",
        background: "white",
        fontWeight: "bold",
        size: "16px",
        fontFamily: "Segoe UI",
      },
    },
  };

  const tooltip = { enable: false, shared: false };

  return (
    <>
      {updatedProjectData?.length > 0 && (
        <div className="w-full flex flex-col pb-7 items-left shadow-md rounded bg-white">
          <div className="flex items-center justify-start m-5 gap-2">
            <GrProjects className={`text-xl text-[${themeColors[1]}]`} />
            <Title title="Project by Stage" />
          </div>
          <ChartComponent
            id="stageChart"
            width={chartWidth}
            height={chartHeight}
            primaryXAxis={primaryxAxis}
            primaryYAxis={primaryyAxis}
            tooltip={tooltip}
          >
            <Inject services={[ColumnSeries, Tooltip, Category, DataLabel]} />
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={statusChartData}
                xName="x"
                yName="y"
                type="Column"
                name="status"
                marker={marker}
                pointColorMapping="color"
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      )}
    </>
  );
};
