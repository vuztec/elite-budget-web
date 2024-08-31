import React from 'react';
import {
  getFormattedValue,
  getFormattedValueTotal,
  getHouseHoldMarketValueTotal,
  getMarketValueTotal,
  getOtherAssetMarketValueTotal,
  getRealEstateMarketValueTotal,
  getUnformattedBankBalanceTotal,
  getUnformattedMarketValueTotal,
  getUnformattedOpeningBalanceTotal,
  getVehicleMarketValueTotal,
} from '../../utils/budget.calculation';
import useUserStore from '../../app/user';

export const Assets = ({ savingsGridData, retirementGridData, expenseGridData, transactionGridData, bankGridData }) => {
  const { user } = useUserStore();
  const totalSavMarketValue = getUnformattedMarketValueTotal(savingsGridData);
  const totalRetMarketValue = getUnformattedMarketValueTotal(retirementGridData);
  const totalExpMarketValue = getUnformattedMarketValueTotal(expenseGridData);
  const totalOpeningBalance = getUnformattedOpeningBalanceTotal(bankGridData);
  const totalBankBalance = getUnformattedBankBalanceTotal(transactionGridData);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full px-2 py-1 flex flex-col xl:flex-row gap-0 xl:gap-5">
        <div className="w-full xl:w-1/2 ">
          <table className="w-[99%]">
            <tbody>
              <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left p-2 font-bold">
                <td className="px-2 py-2 border-r w-2/3 border-gray-300 font-normal">
                  Checking, Savings & Investment Accounts
                </td>
                <td className="px-2">
                  {getFormattedValueTotal(
                    user,
                    Number(totalSavMarketValue) + Number(totalOpeningBalance) + Number(totalBankBalance),
                  )}
                </td>
              </tr>
              <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left p-2 font-bold">
                <td className="px-2 py-2 xl:py-1.5 border-r w-2/3 border-gray-300 font-normal">
                  Household (Incl. furnishings, kitchen appliances, clothes, shoes, purses, jewelry, etc.)
                </td>
                <td className="px-2">
                  {getHouseHoldMarketValueTotal(user, expenseGridData, 'Children', 'Household, Personal Care & Gifts')}
                </td>
              </tr>
              <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left  p-2 font-bold">
                <td className="px-2 py-2 xl:py-1.5 border-r w-2/3 border-gray-300 font-normal">
                  Other Assets: Recreation: RV, Boat, Jetski, Sports Equipment, etc.
                </td>
                <td className="px-2">{getOtherAssetMarketValueTotal(user, expenseGridData, 'Recreation')}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full xl:w-1/2">
          <table className="w-[99%]">
            <tbody>
              <tr className="xl:border-t border-l border-r border-b border-gray-300 text-sm xl:text-[16px]  text-left p-2 font-bold">
                <td className="px-2 py-2 border-r w-2/3 border-gray-300 font-normal">Real Estate</td>
                <td className="px-2">
                  {getRealEstateMarketValueTotal(user, expenseGridData, 'Housing', 'Rental Property')}
                </td>
              </tr>
              <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left p-2 font-bold">
                <td className="px-2 py-2 xl:py-4 border-r w-2/3 border-gray-300 font-normal">Retirement Accounts</td>
                <td className="px-2">{getMarketValueTotal(user, retirementGridData)}</td>
              </tr>
              <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left  p-2 font-bold">
                <td className="px-2 py-2 xl:py-4 border-r w-2/3 border-gray-300 font-normal">Vehicles</td>
                <td className="px-2">{getVehicleMarketValueTotal(user, expenseGridData, 'Transportation')}</td>
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
              <tr className="xl:border-t border-l border-r border-b border-gray-300 text-sm xl:text-[16px] bg-gray-400/50 text-left p-2 font-bold">
                <td className="px-2 py-2 border-r w-2/3 border-gray-300 font-normal">Total Assets</td>
                <td className="px-2">
                  {getFormattedValueTotal(
                    user,
                    Number(totalSavMarketValue) +
                      Number(totalOpeningBalance) +
                      Number(totalBankBalance) +
                      Number(totalRetMarketValue) +
                      Number(totalExpMarketValue),
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Assets;
