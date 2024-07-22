import React from "react";

export const Assets = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full px-2 py-1 flex flex-col xl:flex-row gap-0 xl:gap-5">
        <div className="w-full xl:w-1/2 ">
          <table className="w-[99%]">
            <tbody>
              <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left p-2 font-bold">
                <td className="px-2 py-2 border-r w-2/3 border-gray-300">
                  Checking, Savings & Investment Accounts
                </td>
                <td className="px-2 bg-[#ffe99b]">Amount</td>
              </tr>
              <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left p-2 font-bold">
                <td className="px-2 py-2 border-r w-2/3 border-gray-300">
                  Household Furnishings & Appliances
                </td>
                <td className="px-2 bg-[#ffe99b]">Amount</td>
              </tr>
              <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left  p-2 font-bold">
                <td className="px-2 py-2 border-r w-2/3 border-gray-300">
                  Other Assets
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
                  Real Estate
                </td>
                <td className="px-2 bg-[#ffe99b]">Amount</td>
              </tr>
              <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left p-2 font-bold">
                <td className="px-2 py-2 border-r w-2/3 border-gray-300">
                  Retirement Accounts
                </td>
                <td className="px-2 bg-[#ffe99b]">Amount</td>
              </tr>
              <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left  p-2 font-bold">
                <td className="px-2 py-2 border-r w-2/3 border-gray-300">
                  Vehicles
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
                  Total Assets
                </td>
                <td className="px-2 bg-[#ffe99b]">Amount</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Assets;
