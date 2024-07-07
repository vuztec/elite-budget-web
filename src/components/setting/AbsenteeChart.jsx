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
  Legend,
} from "@syncfusion/ej2-react-charts";
import { getRiskRating, themeColors, varyingColors } from "../../utils";
import { IoMdWarning } from "react-icons/io";
import Title from "../Title";
import { FaRegCalendarTimes } from "react-icons/fa";

export const AbsenteeChart = ({ updatedRiskData }) => {
  const riskRating = ["Sustainable", "Moderate", "Severe", "Critical"];

  const ratingChartData = riskRating.map((rating) => {
    const ratingColorMap = {
      Sustainable: varyingColors[3],
      Moderate: varyingColors[2],
      Severe: varyingColors[1],
      Critical: varyingColors[0],
    };
    const total = updatedRiskData?.reduce((count, item) => {
      const status = item.Status;
      const impact = item.Impact;
      const likelyhood = item.Likelyhood;
      const itemRating = getRiskRating(impact, likelyhood);
      if (rating === itemRating && (status === "New" || status === "Open")) {
        return count + 1;
      }
      return count;
    }, 0);

    return {
      x: rating,
      y: total,
      color: ratingColorMap[rating] || themeColors[0],
    };
  });

  const chartWidth = "100%"; // Set the desired chart width (e.g., "100%", "80px", etc.)
  const chartHeight = "80%"; // Set the desired chart width (e.g., "100%", "80px", etc.)
  const primaryxAxis = {
    valueType: "Category",
    isInversed: true,
    labelRotation: -45,
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
      {updatedRiskData?.length > 0 && (
        <div className="w-full md:px-1 px-0 mb-0 shadow-md rounded bg-white">
          <div className="flex items-center justify-left m-5 gap-5">
            <FaRegCalendarTimes
              className={`text-3xl text-[${themeColors[1]}]`}
            />
            <Title title="Absentee by Type" />
          </div>
          <ChartComponent
            id="absenteeChart"
            width={chartWidth}
            height={chartHeight}
            primaryXAxis={primaryxAxis}
            primaryYAxis={primaryyAxis}
            tooltip={tooltip}
          >
            <Inject services={[ColumnSeries, Tooltip, Category, DataLabel]} />
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={ratingChartData}
                xName="x"
                yName="y"
                type="Column"
                name="status"
                marker={marker}
                pointColorMapping="color"
                e
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      )}
    </>
  );
};
