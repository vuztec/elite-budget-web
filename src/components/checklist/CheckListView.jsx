import React from "react";
import useUserStore from "../../app/user";
import { getFormattedValueTotal } from "../../utils/budget.calculation";

export const CheckListView = ({
  uniqueCategories,
  uniqueBudgetItemsByCategory,
  uniqueDescriptionsByCategory,
  monthHeaders,
}) => {
  const { user } = useUserStore();

  return (
    <div className="w-full h-fit bg-white py-2 mt-4 shadow-md rounded">
      <div className="flex flex-col gap-5 w-full">
        <div className="w-full overflow-x-auto">
          <table className="w-[97%] m-5 border border-gray-400">
            <thead>
              <tr className="text-black font-bold bg-[whitesmoke] border border-gray-400 text-left text-sm xl:text-[16px] uppercase">
                <th className="px-1 py-2">Savings & Spending</th>
                <th className="border-l border-gray-300 px-1 py-2m">Day Due</th>
                <th className="border-l border-gray-300 px-1 py-2">
                  Monthly Budget
                </th>
                <th className="border-l border-gray-300 px-1 py-2-sm">
                  Payment Method
                </th>
                {monthHeaders?.map((header, index) => (
                  <th
                    key={index}
                    className="border-l border-gray-300 px-1 py-2"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {uniqueCategories &&
                uniqueCategories?.map((category, categoryIndex) => (
                  <React.Fragment key={categoryIndex}>
                    <tr className="text-gray-600 font-bold bg-[whitesmoke] border-b border-t border-gray-200 text-left text-sm xl:text-[16px] uppercase">
                      <td className="px-1 lg:px-2 py-2">{category}</td>

                      <td className=""></td>
                      <td className=""></td>
                      <td className=""></td>
                      {monthHeaders?.map((index) => (
                        <td key={index} className=""></td>
                      ))}
                    </tr>
                    {uniqueBudgetItemsByCategory[category] &&
                      uniqueBudgetItemsByCategory[category].map(
                        (budgetItem, budgetItemIndex) => (
                          <React.Fragment
                            key={`${category}_${budgetItemIndex}`}
                          >
                            <tr className="text-gray-600 font-bold bg-[whitesmoke] border-b border-t border-gray-200 text-left text-sm xl:text-[16px]">
                              <td className="p-2 lg:px-5 py-2">{budgetItem}</td>

                              <td className=""></td>
                              <td className=""></td>
                              <td className=""></td>
                              {monthHeaders.map((index) => (
                                <td key={index} className=""></td>
                              ))}
                            </tr>
                            {uniqueDescriptionsByCategory[category] &&
                              uniqueDescriptionsByCategory[category][
                                budgetItem
                              ] &&
                              Object.entries(
                                uniqueDescriptionsByCategory[category][
                                  budgetItem
                                ]
                              )?.map(
                                ([description, details], descriptionIndex) => (
                                  <tr
                                    key={`${category}_${budgetItem}_${descriptionIndex}`}
                                    className="border-t border-b border-gray-300 text-sm xl:text-[16px] text-left"
                                  >
                                    <td className="max-w-[300px] whitespace-normal p-5 lg:px-10 py-2">
                                      {details.NickName
                                        ? details.NickName
                                        : description}
                                    </td>
                                    <td className="min-w-fit whitespace-nowrap border-l p-2 border-gray-200">
                                      {details.DueDate}
                                    </td>
                                    <td className="min-w-fit whitespace-nowrap border-l p-2 border-gray-200">
                                      {getFormattedValueTotal(
                                        user,
                                        details.MonthlyBudget
                                      )}
                                    </td>
                                    <td className="min-w-fit whitespace-nowrap border-l p-2 border-gray-200">
                                      {details.PaymentMethod}
                                    </td>
                                    {monthHeaders?.map((index) => (
                                      <td
                                        key={index}
                                        className="min-w-fit whitespace-nowrap border-l p-2 border-gray-200"
                                      ></td>
                                    ))}
                                  </tr>
                                )
                              )}
                          </React.Fragment>
                        )
                      )}
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};