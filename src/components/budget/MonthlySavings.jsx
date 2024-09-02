import React from 'react';
import {
  getActualGoal,
  getActualGoalYearly,
  getBudgetGoal,
  getDifference,
  getIcon,
  getLabel,
  getMonthlyBudgetTotal,
  getYearlyBudgetTotal,
} from '../../utils/budget.calculation';
import useUserStore from '../../app/user';
import clsx from 'clsx';

const MonthlySavings = ({ savingsGridData, incomeGridData, maingoals, owner }) => {
  const { user } = useUserStore();

  return (
    <div className="w-full flex flex-col gap-5 text-sm xl:text-[16px]">
      <div className="w-full xl:w-full flex flex-col gap-2">
        <div className="w-full bg-[whitesmoke] text-black border border-gray-300 flex text-left px-2 py-2 rounded-md font-bold">
          <table className="w-full">
            <tbody>
              <tr className="text-left font-bold">
                <td className="px-2 w-2/3 lg:w-1/3">MONTHLY SAVINGS</td>
                <td className="px:0 lg:px-2 text-black">
                  <div className="flex w-full gap-1">
                    <p className="p-2 bg-white border border-gray-300 w-full lg:w-2/3">
                      {getMonthlyBudgetTotal(user, savingsGridData)}
                    </p>
                    <p
                      className={clsx(
                        'p-2 border border-gray-300 w-1/5 hidden lg:block',
                        owner === 'Joint' ? 'bg-[whitesmoke]' : 'bg-white',
                      )}
                    >
                      {owner === 'Joint' ? '' : getActualGoal(incomeGridData, savingsGridData, 'Savings')}%
                    </p>
                    <p className="p-2 hidden lg:block">
                      {owner === 'Joint' ? '' : getIcon(incomeGridData, savingsGridData, 'Savings', maingoals)}
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <table className="w-[99%]">
          <tbody>
            <tr className="border border-gray-300 text-left p-2">
              <td className="px-2 py-2 border-r w-2/3 border-gray-300">Total Annual Savings</td>
              <td className="px-2 font-bold">{getYearlyBudgetTotal(user, savingsGridData)}</td>
            </tr>
            <tr className="border border-gray-300 text-left p-2">
              <td className="px-2 py-2 border-r w-2/3 border-gray-300">Percentage of Annual Net Income</td>
              <td className={clsx('px-2  font-bold', owner === 'Joint' ? 'bg-[whitesmoke]' : 'bg-white')}>
                {owner === 'Joint' ? '' : getActualGoalYearly(incomeGridData, savingsGridData, 'Savings')}%
              </td>
            </tr>
            <tr className="border border-gray-300 text-left p-2">
              <td className="px-2 py-2 border-r w-2/3 border-gray-300">Goal</td>
              <td className={clsx('px-2 font-bold', owner === 'Joint' ? 'bg-[whitesmoke]' : 'bg-white')}>
                {owner === 'Joint' ? '' : getBudgetGoal(maingoals, 'Savings')}%
              </td>
            </tr>
            <tr className="border border-gray-300 text-left p-2">
              <td className="px-2 py-2 border-r w-2/3 border-gray-300">
                {owner === 'Joint' ? 'Over/Under' : getLabel(incomeGridData, savingsGridData, 'Savings', maingoals)}
              </td>
              <td className="px-2 font-bold">
                {owner === 'Joint' ? '' : getDifference(incomeGridData, savingsGridData, 'Savings', maingoals, user)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlySavings;
