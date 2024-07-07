import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  DataLabel,
  Category,
  Tooltip,
  BarSeries,
} from "@syncfusion/ej2-react-charts";
import { themeColors, varyingColors } from "../../utils";
import Title from "../Title";
import { GrProjects } from "react-icons/gr";
import useUserStore from "../../app/user";
import { getFinancialPermission } from "../../utils/permissions";

export const ProjectCostChart = ({
  updatedProjectData,
  updatedCostData,
  usedCurrency,
}) => {
  const { user } = useUserStore();
  const hasFin = getFinancialPermission(user);
  const CostType = [
    "Total Budget",
    "Total POs",
    "Total Invoices",
    "Total Payments",
    "Used Budget",
    "Remaining Budget",
  ];

  const getTotalCost = (updatedCostData, type) => {
    const matchingCosts = updatedCostData?.filter(
      (cost) => cost.Stage === type
    );
    const totalCost = matchingCosts?.reduce(
      (total, cost) => total + (Number(cost?.CostAmount) || 0),
      0
    );
    return totalCost;
  };

  const getTotalBudget = (gridData) => {
    const totalBudget = gridData?.reduce(
      (total, project) => total + (Number(project.Budget) || 0),
      0
    );
    return totalBudget;
  };
  const totalBudget = getTotalBudget(updatedProjectData);
  const totalPOs = getTotalCost(updatedCostData, "PO");
  const totalInvoices = getTotalCost(updatedCostData, "Invoice");
  const totalPayments = getTotalCost(updatedCostData, "Paid");
  const totalUsedBudget =
    Number(totalPOs) + Number(totalInvoices) + Number(totalPayments);
  const totalRemainingBudget = Number(totalBudget) - Number(totalUsedBudget);

  const getValueByType = (
    totalBudget,
    totalPOs,
    totalInvoices,
    totalPayments,
    totalUsedBudget,
    totalRemainingBudget,
    CostType
  ) => {
    const typeColorMap = {
      "Total Budget": varyingColors[0],
      "Total POs": varyingColors[1],
      "Total Invoices": varyingColors[2],
      "Total Payments": varyingColors[3],
      "Used Budget": varyingColors[4],
      "Remaining Budget": varyingColors[5],
    };

    const typeValues = CostType.map((type) => {
      let yValue;
      switch (type) {
        case "Total Budget":
          yValue = totalBudget;
          break;
        case "Total POs":
          yValue = totalPOs;
          break;
        case "Total Invoices":
          yValue = totalInvoices;
          break;
        case "Total Payments":
          yValue = totalPayments;
          break;
        case "Used Budget":
          yValue = totalUsedBudget;
          break;
        case "Remaining Budget":
          yValue = totalRemainingBudget;
          break;
        default:
          yValue = 0;
      }
      return {
        x: type,
        y: yValue,
        color: typeColorMap[type] || themeColors[0],
      };
    });

    return typeValues;
  };

  const costChartData = getValueByType(
    totalBudget,
    totalPOs,
    totalInvoices,
    totalPayments,
    totalUsedBudget,
    totalRemainingBudget,
    CostType
  );

  const chartWidth = "98%";
  const chartHeight = "330px";
  const marker = {
    dataLabel: {
      visible: true,
      labelFormat: usedCurrency + " # ###",
      font: {
        color: "#20409A",
        background: "red",
        fontWeight: "bold",
        size: "16px",
        fontFamily: "Segoe UI",
        zIndex: 99,
      },
    },
  };

  const primaryxAxisBar = {
    minimum: 0,
    visible: true,
    isInversed: true,
    valueType: "Category",
    labelStyle: {
      color: "#20409A",
      fontWeight: "normal",
      size: "14px",
      fontFamily: "Segoe UI",
    },
  };

  const primaryyAxisBar = {
    visible: false,
    labelFormat: usedCurrency + " # ###",
  };

  const tooltip = { enable: false, shared: false };

  return (
    <>
      {updatedProjectData?.length > 0 && (
        <div className="w-full flex flex-col pb-7 items-left shadow-md rounded bg-white">
          <div className="flex items-center justify-start m-5 gap-2">
            <GrProjects className={`text-xl text-[${themeColors[1]}]`} />
            <Title title="Budget vs Cost" />
          </div>
          {hasFin && (
            <ChartComponent
              id="costChart"
              width={chartWidth}
              height={chartHeight}
              primaryXAxis={primaryxAxisBar}
              primaryYAxis={primaryyAxisBar}
              tooltip={tooltip}
            >
              <Inject services={[BarSeries, Tooltip, Category, DataLabel]} />
              <SeriesCollectionDirective>
                <SeriesDirective
                  dataSource={costChartData}
                  xName="x"
                  yName="y"
                  type="Bar"
                  name="cost"
                  marker={marker}
                  pointColorMapping="color"
                />
              </SeriesCollectionDirective>
            </ChartComponent>
          )}
        </div>
      )}
    </>
  );
};
