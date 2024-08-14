import React, { useEffect, useState } from 'react';
import {
  getFormattedValueTotal,
  getNetMonthlyTotal,
  getTotalLabel,
  getUnformattedMonthlyBudget,
  getUnformattedMonthlyBudgetTotal,
  getUnformattedNetMonthlyTotal,
} from '../../utils/budget.calculation';
import useUserStore from '../../app/user';

const MonthlySummary = ({
  incomeGridData,
  savingsGridData,
  retirementGridData,
  debtGridData,
  expenseGridData,
  owner,
  selfContribution,
  partnerContribution,
}) => {
  const { user } = useUserStore();
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalDifference, setTotalDifference] = useState(0);
  const [label, setLabel] = useState('');

  useEffect(() => {
    const Expenses =
      getUnformattedMonthlyBudget(debtGridData) +
      getUnformattedMonthlyBudget(savingsGridData) +
      getUnformattedMonthlyBudget(expenseGridData) +
      getUnformattedMonthlyBudget(retirementGridData);
    const formattedAmount = getFormattedValueTotal(user, Number(Expenses));
    setTotalExpenses(formattedAmount);

    const income =
      owner === 'Joint'
        ? Number(selfContribution) +
          Number(partnerContribution) +
          Number(getUnformattedNetMonthlyTotal(incomeGridData)) / 12
        : Number(getUnformattedNetMonthlyTotal(incomeGridData)) / 12;

    const difference = Number(income) - Number(Expenses);
    const formattedDiif = getFormattedValueTotal(user, Number(difference));
    setTotalDifference(formattedDiif);
    const diffLabel = getTotalLabel(difference);
    setLabel(diffLabel);
  }, [
    debtGridData,
    savingsGridData,
    expenseGridData,
    retirementGridData,
    incomeGridData,
    owner,
    selfContribution,
    partnerContribution,
  ]);

  return (
    <div className="w-full flex flex-col gap-5 uppercase">
      <div className="w-full xl:w-full">
        <table className="w-[99%]">
          <tbody>
            <tr className="border-t border-l border-r border-b border-gray-300 bg-[whitesmoke] text-sm xl:text-[16px] text-left p-2 font-bold">
              <td className="px-2 py-2 border-r w-2/3 border-gray-300">
                {owner === 'Joint' ? 'TOTAL MONTHLY JOINT EXPENSES' : 'TOTAL MONTHLY EXPENSES'}
              </td>
              <td className="px-2 bg-white">{totalExpenses}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full xl:w-full mt-10">
        <table className="w-[99%]">
          <tbody>
            <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left p-2 font-bold">
              <td className="px-2 py-2 border-r w-2/3 border-gray-300 bg-[whitesmoke]">MONTHLY NET INCOME</td>
              <td className="px-2">{getNetMonthlyTotal(user, incomeGridData)}</td>
            </tr>
            {owner === 'Joint' && (
              <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left p-2 font-bold">
                <td className="px-2 py-2 border-r w-2/3 border-gray-300 bg-[whitesmoke]">TOTAL JOINT CONTRIBUTION</td>
                <td className="px-2">
                  {getFormattedValueTotal(user, Number(partnerContribution) + Number(selfContribution))}
                </td>
              </tr>
            )}
            <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left p-2 font-bold">
              <td className="px-2 py-2 border-r w-2/3 border-gray-300 bg-[whitesmoke]">
                {owner === 'Joint' ? 'LESS TOTAL MONTHLY JOINT EXPENSES' : 'LESS MONTHLY EXPENSES'}
              </td>
              <td className="px-2">{totalExpenses}</td>
            </tr>
            <tr className="border border-gray-300 text-sm xl:text-[16px]  text-left  p-2 font-bold">
              <td className="px-2 py-2 border-r w-2/3 border-gray-300 uppercase bg-[whitesmoke]">{label}</td>
              <td className="px-2">{totalDifference}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlySummary;
