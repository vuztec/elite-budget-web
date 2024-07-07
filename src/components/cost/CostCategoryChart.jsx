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
import { LiaMoneyCheckAltSolid } from "react-icons/lia";

export const CostCategoryChart = ({ updatedCostData }) => {
  const categoryChartData = updatedCostData?.reduce((chartData, item) => {
    const category = item.Category;
    chartData[category] = (chartData[category] || 0) + 1;
    return chartData;
  }, {});

  // Filter out categories with y value equal to 0
  const filteredCategoryChartData = Object.keys(categoryChartData)
    .filter((category) => categoryChartData[category] !== 0)
    .map((category) => ({ x: category, y: categoryChartData[category] }));

  const chartWidth = "98%";
  const chartHeight = "330px";

  return (
    <>
      {updatedCostData?.length > 0 && (
        <div className="w-full flex flex-col pb-7 items-left shadow-md rounded bg-white">
          <div className="flex items-center justify-start m-5 gap-2">
            <LiaMoneyCheckAltSolid
              className={`text-3xl text-[${themeColors[1]}]`}
            />
            <Title title="Records by Category" />
          </div>
          <AccumulationChartComponent
            id="Cost-rating-chart"
            width={chartWidth}
            height={chartHeight}
            centerLabel={{
              text: `${
                updatedCostData?.filter((item) => item.Status !== "Decided")
                  .length
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
                dataSource={filteredCategoryChartData}
                xName="x"
                yName="y"
                type="Pie"
                name="rating"
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
