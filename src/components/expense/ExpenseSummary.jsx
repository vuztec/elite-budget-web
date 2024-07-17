import React from "react";

import useUserStore from "../../app/user";
import {
  getExpenseSummaryMarketValueTotal,
  getExpenseSummaryLoanBalanceTotal,
  getExpenseSummaryMonthlyBudgetTotal,
  getExpenseSummaryYearlyBudgetTotal,
  getMarketValueTotal,
  getLoanBalanceTotal,
  getMonthlyBudgetTotal,
  getYearlyBudgetTotal,
} from "../../utils/budget.calculation";

export const ExpenseSummary = ({ gridData }) => {
  const { user } = useUserStore();
  const uniqueCategories = [
    ...new Set(gridData.map((record) => record.Category)),
  ];

  const TableHeader = () => (
    <thead>
      <tr className="border border-gray-300 bg-black text-white">
        <td className="min-w-fit whitespace-nowrap p-3 font-bold border-l border-gray-300">
          CATEGORY
        </td>
        <td className="min-w-fit whitespace-nowrap p-3 font-bold border-l border-gray-300">
          TOTAL MARKET VALUE
        </td>
        <td className="min-w-fit whitespace-nowrap p-3 font-bold border-l border-gray-300">
          TOTAL LOAN BALANCE
        </td>
        <td className="min-w-fit whitespace-nowrap p-3 font-bold border-l border-gray-300">
          TOTAL MONTHLY BUDGET
        </td>
        <td className="min-w-fit whitespace-nowrap p-3 font-bold border-l border-gray-300">
          TOTAL YEARLY COST
        </td>
      </tr>
    </thead>
  );

  const TableRow = ({ cat }) => (
    <tr className="border border-gray-300">
      <td className="min-w-fit whitespace-nowrap text-right p-2">{cat}</td>
      <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
        {getExpenseSummaryMarketValueTotal(user, gridData, cat)}
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
        {getExpenseSummaryLoanBalanceTotal(user, gridData, cat)}
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
        {getExpenseSummaryMonthlyBudgetTotal(user, gridData, cat)}
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
        {getExpenseSummaryYearlyBudgetTotal(user, gridData, cat)}
      </td>
    </tr>
  );

  const TableTotal = ({ gridData }) => (
    <tr className="border border-gray-300 bg-black text-white">
      <td className="min-w-fit whitespace-nowrap text-right p-2">Total</td>
      <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
        {getMarketValueTotal(user, gridData)}
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
        {getLoanBalanceTotal(user, gridData)}
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
        {getMonthlyBudgetTotal(user, gridData)}
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
        {getYearlyBudgetTotal(user, gridData)}
      </td>
    </tr>
  );

  return (
    <div className="w-full h-fit bg-white py-6 mt-4 shadow-md rounded">
      <div className="flex flex-col gap-5 w-fit">
        <div className="w-full overflow-x-auto">
          <table className="w-[97%] ml-5 -mb-5">
            <thead>
              <tr>
                <th className="p-2 w-full uppercase bg-black text-white flex items-center justify-center">
                  EXPENSE SUMMARY
                </th>
              </tr>
            </thead>
          </table>
          <table className="w-[97%] m-5">
            <TableHeader />
            <tbody>
              {uniqueCategories?.map((cat, index) => (
                <TableRow key={index} cat={cat} />
              ))}
              <TableTotal gridData={gridData} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
