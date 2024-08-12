import React from 'react';
import {
  getCreditCardLoanBalanceTotal,
  getLoanBalanceTotal,
  getLoanOtherLoanBalanceTotal,
  getMedicalDebtBalanceTotal,
  getRealEstateLoanBalanceTotal,
  getRealOtherDebtLoanBalanceTotal,
  getVehicleLoanBalanceTotal,
} from '../../utils/budget.calculation';
import useUserStore from '../../app/user';
import { getCombineExpenseDebtData } from '../../utils/budget.filter';

export const Liabilities = ({ expenseGridData, debtGridData }) => {
  const { user } = useUserStore();
  const combinedLiabilityData = getCombineExpenseDebtData(expenseGridData, debtGridData);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full px-2 py-1 flex flex-col xl:flex-row gap-0 xl:gap-5">
        <div className="w-full xl:w-1/2 ">
          <table className="w-[99%]">
            <tbody>
              <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left p-2 font-bold">
                <td className="px-2 py-2 border-r w-2/3 border-gray-300 font-normal">Credit Cards</td>
                <td className="px-2">
                  {getCreditCardLoanBalanceTotal(user, debtGridData, 'Credit Card', 'Department Store')}
                </td>
              </tr>
              <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left p-2 font-bold">
                <td className="px-2 py-2 border-r w-2/3 border-gray-300 font-normal">Medical Debt</td>
                <td className="px-2">{getMedicalDebtBalanceTotal(user, debtGridData, 'Medical Debt')}</td>
              </tr>
              <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left  p-2 font-bold">
                <td className="px-2 py-2 border-r w-2/3 border-gray-300 font-normal">
                  Other Debt: Recreation: RV, Boat, Jetski, etc.
                </td>
                <td className="px-2">
                  {getRealOtherDebtLoanBalanceTotal(
                    user,
                    expenseGridData,
                    'Household, Personal Care & Gifts',
                    'Recreation',
                    'Children',
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full xl:w-1/2">
          <table className="w-[99%]">
            <tbody>
              <tr className="xl:border-t border-l border-r border-b border-gray-300 text-sm xl:text-[16px]  text-left p-2 font-bold">
                <td className="px-2 py-2 border-r w-2/3 border-gray-300 font-normal">Loans (Other)</td>
                <td className="px-2">
                  {getLoanOtherLoanBalanceTotal(user, debtGridData, 'Medical Debt', 'Credit Card', 'Department Store')}
                </td>
              </tr>
              <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left p-2 font-bold">
                <td className="px-2 py-2 border-r w-2/3 border-gray-300 font-normal">Real Estate Loans</td>
                <td className="px-2">
                  {getRealEstateLoanBalanceTotal(user, expenseGridData, 'Housing', 'Rental Property')}
                </td>
              </tr>
              <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left  p-2 font-bold">
                <td className="px-2 py-2 border-r w-2/3 border-gray-300 font-normal">Vehicle Loans</td>
                <td className="px-2">{getVehicleLoanBalanceTotal(user, expenseGridData, 'Transportation')}</td>
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
                <td className="px-2 py-2 border-r w-2/3 border-gray-300 font-normal">Total Liabilities</td>
                <td className="px-2">{getLoanBalanceTotal(user, combinedLiabilityData)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Liabilities;
