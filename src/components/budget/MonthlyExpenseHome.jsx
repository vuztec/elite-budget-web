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

const MonthlyExpenseHome = ({ expenseGridData, incomeGridData, maingoals }) => {
  const { user } = useUserStore();

  return (
    <div className="w-full flex flex-col gap-5 text-sm xl:text-[16px]">
      <div className="w-full xl:w-full flex flex-col gap-2">
        <div className="w-full bg-[whitesmoke] text-black border border-gray-300 flex text-left px-2 py-2 rounded-md font-bold">
          <table className="w-full">
            <tbody>
              <tr className="text-left font-bold">
                <td className="px-2 w-2/3 lg:w-1/3">MONTHLY EXPENSES</td>
                <td className="px:0 lg:px-2 text-black">
                  <div className="flex w-full gap-1">
                    <p className="p-2 bg-white border border-gray-300 w-full lg:w-2/3">
                      {getMonthlyBudgetTotal(user, expenseGridData)}
                    </p>
                    <p className="p-2 bg-white border border-gray-300 w-1/5 hidden lg:block">
                      {getActualGoal(
                        incomeGridData,
                        expenseGridData,
                        "Expenses"
                      )}
                      %
                    </p>
                    <p className="p-2 hidden lg:block">
                      {getIcon(
                        incomeGridData,
                        expenseGridData,
                        "Expenses",
                        maingoals
                      )}
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <table className="w-[99%]">
          <tbody>
            <tr className="border border-gray-300 text-left p-2">
              <td className="px-2 py-2 border-r w-2/3 border-gray-300">
                Total annual Expenses
              </td>
              <td className="px-2 font-bold">
                {getYearlyBudgetTotal(user, expenseGridData)}
              </td>
            </tr>
            <tr className="border border-gray-300 text-left p-2">
              <td className="px-2 py-2 border-r w-2/3 border-gray-300">
                Percentage of Annual Net Income
              </td>
              <td className="px-2  font-bold">
                {getActualGoal(incomeGridData, expenseGridData, "Expenses")}%
              </td>
            </tr>
            <tr className="border border-gray-300 text-left p-2">
              <td className="px-2 py-2 border-r w-2/3 border-gray-300">Goal</td>
              <td className="px-2 font-bold">
                {getBudgetGoal(maingoals, "Expenses")}%
              </td>
            </tr>
            <tr className="border border-gray-300 text-left p-2">
              <td className="px-2 py-2 border-r w-2/3 border-gray-300">
                {getLabel(
                  incomeGridData,
                  expenseGridData,
                  "Expenses",
                  maingoals
                )}
              </td>
              <td className="px-2 font-bold">
                {getDifference(
                  incomeGridData,
                  expenseGridData,
                  "Expenses",
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

export default MonthlyExpenseHome;
