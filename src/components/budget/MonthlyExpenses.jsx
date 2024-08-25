import React, { useEffect, useState } from 'react';
import useUserStore from '../../app/user';
import {
  getActualGoal,
  getActualGoalExp,
  getCatActualGoal,
  getCatIcon,
  getFormattedValueTotal,
  getIcon,
  getMonthlyBudgetTotal,
  getUniqueBudgetItemsWithSum,
  getUniqueDescriptionsWithSumForEachBudgetItem,
} from '../../utils/budget.calculation';

const MonthlyExpenses = ({ expenseGridData, incomeGridData, maingoals, expensegoals, owner }) => {
  const { user } = useUserStore();
  const [catData, setCatData] = useState({});
  const [descData, setDescData] = useState({});

  useEffect(() => {
    const filteredData = expenseGridData.filter((data) => data.MonthlyBudget > 0);

    const sortedData = filteredData.sort((a, b) => {
      // Determine the display names
      const aDisplayName = a.NickName || a.Description;
      const bDisplayName = b.NickName || b.Description;

      // First sort by Category
      if (a.Category < b.Category) return -1;
      if (a.Category > b.Category) return 1;

      // If Categories are equal, sort by display name (NickName or Description)
      if (aDisplayName < bDisplayName) return -1;
      if (aDisplayName > bDisplayName) return 1;

      return 0;
    });

    const uniqueExpenseBudgetItemsWithSum = getUniqueBudgetItemsWithSum(sortedData);
    setCatData(uniqueExpenseBudgetItemsWithSum);
    const uniqueExpenseDescriptionsWithSum = getUniqueDescriptionsWithSumForEachBudgetItem(sortedData);
    setDescData(uniqueExpenseDescriptionsWithSum);
  }, [expenseGridData]);
  return (
    <div className="w-full flex flex-col gap-5 text-sm xl:text-[16px]">
      <div className="w-full xl:w-full flex flex-col gap-2">
        <div className="w-full text-black flex flex-col text-left px-2 rounded-md font-bold">
          <div className="bg-[whitesmoke] px-2 py-2 rounded-md  border border-gray-300">
            <table className="w-full">
              <tbody>
                <tr className="text-left font-bold">
                  <td className="px-1 w-2/3 lg:w-1/3">MONTHLY EXPENSES</td>
                  <td className="px:0 lg:px-2 text-black">
                    <div className="flex w-full gap-1">
                      <p className="p-2 bg-white border border-gray-300 w-full lg:w-2/3">
                        {getMonthlyBudgetTotal(user, expenseGridData)}
                      </p>
                      <p className="p-2 bg-white border border-gray-300 w-1/5 hidden lg:block">
                        {owner === 'Joint' ? '' : getActualGoalExp(incomeGridData, expenseGridData, 'Expenses')}%
                      </p>
                      <p className="p-1 hidden lg:block">
                        {owner === 'Joint' ? '' : getIcon(incomeGridData, expenseGridData, 'Expenses', maingoals)}
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {catData?.uniqueBudgetItems?.map((budgetItem) => (
            <div key={budgetItem} className="w-full flex flex-col text-left px-2 py-1 rounded-md font-bold">
              <table className="w-[99%] bg-[whitesmoke] text-black">
                <thead>
                  <tr className="border border-gray-300 text-left p-2 font-bold">
                    <td className="px-1 py-2 w-2/3 lg:w-1/3 border-gray-300">{budgetItem}</td>
                    <td className="px-0 lg:px-2">
                      <div className="flex w-full gap-0">
                        <p className="p-2 bg-white border-l border-gray-300 w-full lg:w-2/3 text-black">
                          {getFormattedValueTotal(user, catData.budgetItemValue[budgetItem])}
                        </p>
                        <p className="p-2 bg-white border-l border-r border-gray-300 w-1/5 hidden lg:block">
                          {owner === 'Joint' ? '' : getCatActualGoal(incomeGridData, expenseGridData, budgetItem)}%
                        </p>
                        <p className="p-2 hidden lg:block">
                          {owner === 'Joint'
                            ? ''
                            : getCatIcon(incomeGridData, expenseGridData, budgetItem, expensegoals)}
                        </p>
                      </div>
                    </td>
                  </tr>
                </thead>
              </table>
              {descData?.[budgetItem] &&
                Object.entries(descData[budgetItem]).map(([description, descriptionValue]) => (
                  <div className="w-full pt-0 pl-2">
                    <table className="w-[99%] bg-white text-black font-normal">
                      <tbody>
                        <tr className="border-r border-b border-l border-gray-300 text-left p-2 bg-white">
                          <td className="px-2 py-2 border-r w-2/3 border-gray-300">{description}</td>
                          <td className="px-2 bg-white border-l border-gray-300">
                            <div className="flex w-full gap-0">
                              <p className="p-2 bg-white w-full lg:w-2/3">
                                {getFormattedValueTotal(user, descriptionValue)}
                              </p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthlyExpenses;
