import React from "react";
import {
  getFormattedValueTotal,
  getGrossYearlyTotal,
  getNetYearlyTotal,
} from "../../utils/budget.calculation";
import useUserStore from "../../app/user";

const YearlyIncome = ({
  incomeGridData,
  owner,
  selfContribution,
  partnerContribution,
}) => {
  const { user } = useUserStore();

  return (
    <div className="w-full flex flex-col gap-5 text-sm xl:text-[16px]">
      <div className="w-full xl:w-full flex flex-col gap-2">
        <div className="w-full bg-[whitesmoke] text-black border border-gray-300 flex text-left px-2 py-4 rounded-md font-bold">
          <p>
            {owner === "Joint" ? "YEARLY JOINT CONTRIBUTION" : "YEARLY INCOME"}
          </p>
        </div>
        <table className="w-[99%] bg-white">
          <tbody>
            <tr className="border border-gray-300 text-left p-2 font-bold">
              <td className="px-2 py-2 border-r w-2/3 border-gray-300 font-normal">
                {owner === "Joint"
                  ? "Self Yearly Contribution"
                  : "Gross Yearly Income"}
              </td>
              <td className="px-2">
                {owner === "Joint"
                  ? getFormattedValueTotal(user, 12 * Number(selfContribution))
                  : getGrossYearlyTotal(user, incomeGridData)}
              </td>
            </tr>
            <tr className="border border-gray-300 text-left p-2 font-bold">
              <td className="px-2 py-2 border-r w-2/3 border-gray-300 font-normal">
                {owner === "Joint"
                  ? "Partner Yearly Contribution"
                  : "Net Yearly Income"}
              </td>
              <td className="px-2">
                {owner === "Joint"
                  ? getFormattedValueTotal(
                      user,
                      12 * Number(partnerContribution)
                    )
                  : getNetYearlyTotal(user, incomeGridData)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default YearlyIncome;
