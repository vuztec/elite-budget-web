import React from "react";
import {
  getActualGoal,
  getBudgetGoal,
  getDifference,
  getIcon,
  getLabel,
  getMonthlyBudgetTotal,
  getYearlyBudgetTotal,
} from "../../utils/budget.calculation";
import useUserStore from "../../app/user";

const MonthlyRetirement = ({
  retirementGridData,
  incomeGridData,
  maingoals,
}) => {
  const { user } = useUserStore();
  return (
    <div className="w-full flex flex-col gap-5 text-sm xl:text-[14px]">
      <div className="w-full xl:w-full flex flex-col gap-2">
        <div className="w-full bg-black text-[#ffe99b] flex text-left px-2 py-1 rounded-md font-bold">
          <table className="w-full">
            <tbody>
              <tr className="text-left font-bold">
                <td className="px-2 w-2/3 lg:w-1/3">
                  MONTHLY RETIREMENT SAVINGS
                </td>
                <td className="px:0 lg:px-2 text-black">
                  <div className="flex w-full gap-1">
                    <p className="p-2 bg-[#ffe99b] w-full lg:w-2/3">
                      {getMonthlyBudgetTotal(user, retirementGridData)}
                    </p>
                    <p className="p-2 bg-[#ffe99b] w-1/5 hidden lg:block">
                      {getActualGoal(
                        incomeGridData,
                        retirementGridData,
                        "Retirement"
                      )}
                      %
                    </p>
                    <p className="p-2 hidden lg:block">
                      {getIcon(
                        incomeGridData,
                        retirementGridData,
                        "Retirement",
                        maingoals
                      )}
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <table className="w-[99%] bg-gray-400/10">
          <tbody>
            <tr className="border border-gray-300 text-left p-2 font-bold">
              <td className="px-2 py-2 border-r w-2/3 border-gray-300">
                Total annual retirement savings (Incl work ded)
              </td>
              <td className="px-2 bg-[#ffe99b]">
                {getYearlyBudgetTotal(user, retirementGridData)}
              </td>
            </tr>
            <tr className="border border-gray-300 text-left p-2 font-bold">
              <td className="px-2 py-2 border-r w-2/3 border-gray-300">
                Percentage of Annual Gross Income
              </td>
              <td className="px-2 bg-[#ffe99b]">
                {getActualGoal(
                  incomeGridData,
                  retirementGridData,
                  "Retirement"
                )}
                %
              </td>
            </tr>
            <tr className="border border-gray-300 text-left p-2 font-bold">
              <td className="px-2 py-2 border-r w-2/3 border-gray-300">Goal</td>
              <td className="px-2 bg-[#ffe99b]">
                {getBudgetGoal(maingoals, "Retirement")}%
              </td>
            </tr>
            <tr className="border border-gray-300 text-left p-2 font-bold">
              <td className="px-2 py-2 border-r w-2/3 border-gray-300">
                {getLabel(
                  incomeGridData,
                  retirementGridData,
                  "Retirement",
                  maingoals
                )}
              </td>
              <td className="px-2 bg-[#ffe99b]">
                {getDifference(
                  incomeGridData,
                  retirementGridData,
                  "Retirement",
                  maingoals,
                  user
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyRetirement;
