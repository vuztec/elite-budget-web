import React from "react";
import {
  getFormattedValueTotal,
  getUnformattedBankBalanceTotal,
  getUnformattedLoanBalanceTotal,
  getUnformattedMarketValueTotal,
  getUnformattedOpeningBalanceTotal,
} from "../../utils/budget.calculation";
import useUserStore from "../../app/user";

export const CurrentNetworth = ({
  debtGridData,
  savingsGridData,
  retirementGridData,
  expenseGridData,
  transactionGridData,
  bankGridData,
}) => {
  const { user } = useUserStore();
  const totalSavMarketValue = getUnformattedMarketValueTotal(savingsGridData);
  const totalRetMarketValue =
    getUnformattedMarketValueTotal(retirementGridData);
  const totalExpMarketValue = getUnformattedMarketValueTotal(expenseGridData);
  const totalOpeningBalance = getUnformattedOpeningBalanceTotal(bankGridData);
  const totalBankBalance = getUnformattedBankBalanceTotal(transactionGridData);
  const totalDebLoanBalance = getUnformattedLoanBalanceTotal(debtGridData);
  const totalExpLoanBalance = getUnformattedLoanBalanceTotal(expenseGridData);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full px-2 py-1 flex flex-col xl:flex-row gap-0 xl:gap-5">
        <div className="w-full xl:w-1/2 hidden xl:block">
          <p className="bg-white"></p>
        </div>
        <div className="w-full xl:w-1/2">
          <table className="w-[99%]">
            <tbody>
              <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left p-2 font-bold">
                <td className="px-2 py-2 border-r w-2/3 border-gray-300 font-normal">
                  Net Worth
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
                      Number(totalExpLoanBalance)
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

export default CurrentNetworth;
