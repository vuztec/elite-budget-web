import React from 'react';
import { getFormattedValueTotal, getGrossMonthlyTotal, getNetMonthlyTotal } from '../../utils/budget.calculation';
import useUserStore from '../../app/user';

const MonthlyIncome = ({ incomeGridData, owner, selfContribution, partnerContribution }) => {
  const { user } = useUserStore();

  return (
    <div className="w-full flex flex-col gap-5 text-sm xl:text-[16px]">
      <div className="w-full xl:w-full flex flex-col gap-2">
        <div className="w-full bg-[whitesmoke] text-black border border-gray-300 flex text-left px-2 py-4 rounded-md font-bold">
          <p>MONTHLY INCOME</p>
        </div>
        <table className="w-[99%]">
          <tbody>
            <tr className="border border-gray-300 text-left p-2 font-bold">
              <td className="px-2 py-2 border-r w-2/3 border-gray-300 font-normal">Budgeted Gross Monthly Income</td>
              <td className="px-2">{getGrossMonthlyTotal(user, incomeGridData)}</td>
            </tr>
            <tr className="border border-gray-300 text-left p-2 font-bold">
              <td className="px-2 py-2 border-r w-2/3 border-gray-300 font-normal">Budgeted Net Monthly Income</td>
              <td className="px-2">{getNetMonthlyTotal(user, incomeGridData)}</td>
            </tr>
            {owner === 'Joint' && (
              <>
                <tr className="border border-gray-300 text-left p-2 font-bold">
                  <td className="px-2 py-2 border-r w-2/3 border-gray-300 font-normal">Self Monthly Contribution</td>
                  <td className="px-2">{getFormattedValueTotal(user, Number(selfContribution))}</td>
                </tr>
                <tr className="border border-gray-300 text-left p-2 font-bold">
                  <td className="px-2 py-2 border-r w-2/3 border-gray-300 font-normal">Partner Monthly Contribution</td>
                  <td className="px-2">{getFormattedValueTotal(user, Number(partnerContribution))}</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyIncome;
