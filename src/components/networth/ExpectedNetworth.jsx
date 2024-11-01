import React from 'react';
import {
  getAge,
  getFormattedValueTotal,
  getGrossYearlyTotal,
  getUnformattedBankBalanceTotal,
  getUnformattedGrossYearlyTotal,
  getUnformattedLoanBalanceTotal,
  getUnformattedMarketValueTotal,
  getUnformattedOpeningBalanceTotal,
} from '../../utils/budget.calculation';
import useUserStore from '../../app/user';

export const ExpectedNetworth = ({
  incomeGridData,
  debtGridData,
  savingsGridData,
  retirementGridData,
  expenseGridData,
  transactionGridData,
  bankGridData,
  owner,
}) => {
  const { user } = useUserStore();
  const totalSavMarketValue = getUnformattedMarketValueTotal(savingsGridData);
  const totalRetMarketValue = getUnformattedMarketValueTotal(retirementGridData);
  const totalExpMarketValue = getUnformattedMarketValueTotal(expenseGridData);
  const totalOpeningBalance = getUnformattedOpeningBalanceTotal(bankGridData);
  const totalBankBalance = getUnformattedBankBalanceTotal(transactionGridData);
  const totalDebLoanBalance = getUnformattedLoanBalanceTotal(debtGridData);
  const totalExpLoanBalance = getUnformattedLoanBalanceTotal(expenseGridData);
  const age = getAge(user, owner);
  const expectedNet = (age / 10) * getUnformattedGrossYearlyTotal(incomeGridData);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full px-2 py-1 flex flex-col xl:flex-row gap-0 xl:gap-5">
        <div className="w-full xl:w-1/2 ">
          <table className="w-[99%]">
            <tbody>
              <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left p-2 font-bold">
                <td className="px-2 py-2 border-r w-2/3 border-gray-300 font-normal">Net Worth</td>
                <td className="px-2">
                  {getFormattedValueTotal(
                    user,
                    Number(totalSavMarketValue) +
                      Number(totalOpeningBalance) +
                      Number(totalBankBalance) +
                      Number(totalRetMarketValue) +
                      Number(totalExpMarketValue) -
                      Number(totalDebLoanBalance) -
                      Number(totalExpLoanBalance),
                  )}
                </td>
              </tr>
              <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left p-2 font-bold">
                <td className="px-2 py-2 border-r w-2/3 border-gray-300 font-normal">
                  Expected Net Worth for Age & Annual household Income
                </td>
                <td className="px-2">{getFormattedValueTotal(user, expectedNet)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full xl:w-1/2">
          <table className="w-[99%]">
            <tbody>
              <tr className="xl:border-t border-l border-r border-b border-gray-300 text-sm xl:text-[16px]  text-left p-2 font-bold">
                <td className="px-2 py-2 border-r w-2/3 border-gray-300 font-normal">
                  Difference between Expected Net Worth & Actual Net Worth
                </td>
                <td className="px-2">
                  {getFormattedValueTotal(
                    user,
                    Number(totalSavMarketValue) +
                      Number(totalOpeningBalance) +
                      Number(totalBankBalance) +
                      Number(totalRetMarketValue) +
                      Number(totalExpMarketValue) -
                      Number(totalDebLoanBalance) -
                      Number(totalExpLoanBalance) -
                      Number(expectedNet),
                  )}
                </td>
              </tr>
              <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left p-2 font-bold">
                <td className="px-2 py-2 border-r w-2/3 border-gray-300 font-normal">
                  Age (or oldest person's age for Household or Joint)
                </td>
                <td className="px-2">{age}</td>
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
                <td className="px-2 py-2 border-r w-2/3 border-gray-300 font-normal">
                  Gross Annual Household Income from all sources (Excl inheritance)
                </td>
                <td className="px-2">{getGrossYearlyTotal(user, incomeGridData)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpectedNetworth;
