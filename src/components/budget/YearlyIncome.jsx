import React from "react";
import {
  getGrossYearlyTotal,
  getNetYearlyTotal,
} from "../../utils/budget.calculation";
import useUserStore from "../../app/user";

const YearlyIncome = ({ incomeGridData }) => {
  const { user } = useUserStore();

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full xl:w-full flex flex-col gap-2">
        <div className="w-full bg-black text-[#ffe99b] flex text-left p-2 rounded-md font-bold">
          <p>YEARLY INCOME</p>
        </div>
        <table className="w-[99%] bg-gray-400/10">
          <tbody>
            <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left p-2 font-bold">
              <td className="px-2 py-2 border-r w-2/3 border-gray-300">
                Gross Yearly Income
              </td>
              <td className="px-2 bg-[#ffe99b]">
                {getGrossYearlyTotal(user, incomeGridData)}
              </td>
            </tr>
            <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left p-2 font-bold">
              <td className="px-2 py-2 border-r w-2/3 border-gray-300">
                Net Yearly Income
              </td>
              <td className="px-2 bg-[#ffe99b]">
                {getNetYearlyTotal(user, incomeGridData)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default YearlyIncome;
