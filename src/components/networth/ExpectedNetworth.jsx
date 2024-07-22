import React from "react";

export const ExpectedNetworth = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full px-2 py-1 flex flex-col xl:flex-row gap-0 xl:gap-5">
        <div className="w-full xl:w-1/2 ">
          <table className="w-[99%]">
            <tbody>
              <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left p-2 font-bold">
                <td className="px-2 py-2 border-r w-2/3 border-gray-300">
                  Net Worth
                </td>
                <td className="px-2 bg-[#ffe99b]">Amount</td>
              </tr>
              <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left p-2 font-bold">
                <td className="px-2 py-2 border-r w-2/3 border-gray-300">
                  Expected Net Worth for Age & Annual household Income
                </td>
                <td className="px-2 bg-[#ffe99b]">Amount</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full xl:w-1/2">
          <table className="w-[99%]">
            <tbody>
              <tr className="xl:border-t border-l border-r border-b border-gray-300 text-sm xl:text-[16px]  text-left p-2 font-bold">
                <td className="px-2 py-2 border-r w-2/3 border-gray-300">
                  Difference between Expected Net Worth & Actual Net Worth
                </td>
                <td className="px-2 bg-[#ffe99b]">Amount</td>
              </tr>
              <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left p-2 font-bold">
                <td className="px-2 py-2 border-r w-2/3 border-gray-300">
                  Age (or oldest person's age for Household or Joint)
                </td>
                <td className="px-2 bg-[#ffe99b]">Amount</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full px-2 py-0 xl:py-1 flex flex-col xl:flex-row gap-0 xl:gap-5">
        <div className="w-full xl:w-1/2 hidden xl:block">
          <p className="bg-white"></p>
        </div>
        <div className="w-full xl:w-1/2">
          <table className="w-[99%]">
            <tbody>
              <tr className="xl:border-t border-l border-r border-b border-gray-300 text-sm xl:text-[16px] bg-gray-400/10 text-left p-2 font-bold">
                <td className="px-2 py-2 border-r w-2/3 border-gray-300">
                  Gross Annual Household Income from all sources
                </td>
                <td className="px-2 bg-[#ffe99b]">R100 000 000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpectedNetworth;
