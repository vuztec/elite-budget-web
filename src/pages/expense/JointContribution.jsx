import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loader';
import { useQuery, useQueryClient } from 'react-query';
import { getActiveAccount } from '../../utils/permissions';
import Package from '../../package/Package';
import { getDebts, getExpenses, getIncomes, getJointSplits, getRetirements, getSavings } from '../../config/api';
import AddSplit from '../../components/expense/AddSplit';
import ConfirmationDialog from '../../components/Dialogs';
import useUserStore from '../../app/user';
import clsx from 'clsx';
import { IoMdAdd } from 'react-icons/io';
import Button from '../../components/Button';
import {
  getExtraJointExpense,
  getFormattedValueTotal,
  getGrossMonthlyTotal,
  getGrossMonthlyTotalJoint,
  getGrossMonthlyTotalOwner,
  getOwnerGrossMonthlyPercentage,
  getOwnerGrossMonthlyTotal,
  getPartnerContributionPercentage,
  getPartnerContributionTotal,
  getSelfContributionPercentage,
  getSelfContributionTotal,
  getUnformattedMonthlyBudgetTotal,
} from '../../utils/budget.calculation';
import { FaEdit, FaRegThumbsUp } from 'react-icons/fa';
import axios from '../../config/axios';
import { handleAxiosResponseError } from '../../utils/handleResponseError';

export const JointContribution = () => {
  const { user } = useUserStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSelfAmount, setSelectedSelfAmount] = useState(0);
  const [totalJointExpense, setTotalJointExpense] = useState(0);
  const selfPercentage = selectedSelfAmount.SelfAmount ? Number(selectedSelfAmount.SelfAmount) : '';
  const queryClient = useQueryClient();

  const activeAccount = getActiveAccount(user);

  const { data: debts, status: isDebtLoaded } = useQuery({
    queryKey: ['debts'],
    queryFn: getDebts,
    staleTime: 1000 * 60 * 60,
  });

  const { data: expenses, status: isExpenseLoaded } = useQuery({
    queryKey: ['expenses'],
    queryFn: getExpenses,
    staleTime: 1000 * 60 * 60,
  });

  const { data: incomes, status: isIncomeLoaded } = useQuery({
    queryKey: ['incomes'],
    queryFn: getIncomes,
    staleTime: 1000 * 60 * 60,
  });

  const jointIncome = getGrossMonthlyTotalJoint(incomes);

  const { data: jointsplits, status: isJointLoaded } = useQuery({
    queryKey: ['jointsplits'],
    queryFn: getJointSplits,
    staleTime: 1000 * 60 * 60,
  });

  const { data: savings, status: isSavingLoaded } = useQuery({
    queryKey: ['savings'],
    queryFn: getSavings,
    staleTime: 1000 * 60 * 60,
  });

  ///-------------END Filters Data Source --------------------------------///

  useEffect(() => {
    if (
      isDebtLoaded === 'success' &&
      isExpenseLoaded === 'success' &&
      isIncomeLoaded === 'success' &&
      isJointLoaded === 'success' &&
      isSavingLoaded === 'success'
    ) {
      const firstRecord = jointsplits[0];
      if (firstRecord) {
        setSelectedSelfAmount(firstRecord);
      } else {
        setSelectedSelfAmount('');
      }

      const jointExpense =
        Number(getUnformattedMonthlyBudgetTotal(expenses)) +
        Number(getUnformattedMonthlyBudgetTotal(debts)) +
        Number(getUnformattedMonthlyBudgetTotal(savings));
      setTotalJointExpense(jointExpense);
      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
      setTotalJointExpense(0);
    }
  }, [jointsplits, isDebtLoaded, isExpenseLoaded, isIncomeLoaded, isJointLoaded, isSavingLoaded]);

  const deleteHandler = async (selected) => {
    setIsLoading(true);
    axios
      .delete(`/api/joint-split/${selected}`)
      .then(({ data }) => {
        console.log(data);
        queryClient.setQueryData(['jointsplits'], (prev) => prev.filter((joint) => joint.id !== selected));
        setOpenDialog(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(handleAxiosResponseError(err));
      });
  };

  const deleteClick = (el) => {
    if (el) {
      setSelected(el.id);
      setOpenDialog(true);
    }
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  return activeAccount ? (
    <>
      {!isDataLoaded && (
        <div className="py-10">
          <Loading />
        </div>
      )}

      {isDataLoaded && (
        <>
          <p className="text-xs px-5">
            NOTE: Couples can choose to contribute to the joint expenses based on their percentage of total gross income
            or override the calculated split.
          </p>
          <div className="w-full h-fit bg-white p-5 mt-4 shadow-md rounded text-xs md:text-sm">
            <div className="flex flex-col gap-5 xl:gap-10 w-full p-5">
              <div className="w-full xl:w-fit flex flex-col overflow-x-auto">
                <table className="w-[97%]">
                  <tbody className="border border-gray-300">
                    <tr className="border border-gray-300 bg-[whitesmoke] text-black">
                      <td className="min-w-fit whitespace-nowrap p-3 font-bold">HOUSEHOLD GROSS MONTHLY INCOME</td>
                      <td></td>
                      <td></td>
                    </tr>

                    <tr className="border border-gray-300">
                      <td className="min-w-fit whitespace-nowrap p-2">Self - Gross Monthly Income</td>
                      <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
                        <span>{getOwnerGrossMonthlyTotal(user, incomes, 'Self')}</span>
                      </td>
                      <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
                        <span>{getOwnerGrossMonthlyPercentage(incomes, 'Self')}%</span>
                      </td>
                    </tr>
                    <tr className="border border-gray-300">
                      <td className="min-w-fit whitespace-nowrap p-2">Partner - Gross Monthly Income</td>
                      <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
                        <span>{getOwnerGrossMonthlyTotal(user, incomes, 'Partner')}</span>
                      </td>
                      <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
                        <span>{getOwnerGrossMonthlyPercentage(incomes, 'Partner')}%</span>
                      </td>
                    </tr>

                    <tr className="border border-gray-300 bg-[whitesmoke] text-black">
                      <td className="min-w-fit whitespace-nowrap p-2">Total Gross Monthly Income</td>
                      <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
                        <span>{getGrossMonthlyTotalOwner(user, incomes)}</span>
                      </td>
                      <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
                        <span>100%</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="w-full xl:w-fit flex flex-col md:flex-row items-center justify-center gap-5">
                <div className="min-w-fit whitespace-nowrap text-sm">
                  <Button
                    label="Use Income Split"
                    icon={<FaRegThumbsUp className="text-lg" />}
                    className={clsx(
                      'flex flex-row-reverse gap-2 p-1 text-sm rounded-full items-center text-white hover:bg-viewcolor',
                      `bg-green-800 hover:text-black`,
                    )}
                    onClick={() => deleteClick(selectedSelfAmount)}
                  />
                </div>
                <div className="min-w-fit whitespace-nowrap text-sm">
                  <Button
                    label="Override Income Split"
                    icon={<FaEdit className="text-lg" />}
                    className={clsx(
                      'flex flex-row-reverse gap-2 p-1 text-sm rounded-full items-center text-white hover:bg-viewcolor',
                      `bg-orange-800 hover:text-black`,
                    )}
                    onClick={() => editClick(selectedSelfAmount)}
                  />
                </div>
              </div>

              <div className="w-full xl:w-fit flex flex-col overflow-x-auto">
                <table className="w-[97%]">
                  <tbody className="border border-gray-300">
                    <tr className="border border-gray-300 bg-[whitesmoke] text-black">
                      <td className="min-w-fit whitespace-nowrap p-3 font-bold">TOTAL JOINT EXPENSES</td>
                      <td></td>
                      <td></td>
                    </tr>

                    <tr className="border border-gray-300 text-black">
                      <td className="min-w-fit whitespace-nowrap p-2">Total Joint Expenses</td>
                      <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
                        <span>{getFormattedValueTotal(user, totalJointExpense)}</span>
                      </td>
                      <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
                        <span></span>
                      </td>
                    </tr>

                    <tr className="border border-gray-300">
                      <td className="min-w-fit whitespace-nowrap p-2">Joint Income</td>
                      <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
                        <span>{getFormattedValueTotal(user, jointIncome)}</span>
                      </td>
                      <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
                        <span></span>
                      </td>
                    </tr>

                    <tr className="border border-gray-300 bg-[whitesmoke]">
                      <td className="min-w-fit whitespace-nowrap p-2">Joint Expenses not Covered by Joint Income</td>
                      <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
                        <span>
                          {getFormattedValueTotal(user, getExtraJointExpense(totalJointExpense, jointIncome))}
                        </span>
                      </td>
                      <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
                        <span>{getExtraJointExpense(totalJointExpense, jointIncome) > 0 ? '100%' : '0%'}</span>
                      </td>
                    </tr>

                    <tr className="border border-gray-300">
                      <td className="min-w-fit whitespace-nowrap p-2">Self - Contribution</td>
                      <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
                        <span>
                          {getSelfContributionTotal(
                            user,
                            selfPercentage,
                            incomes,
                            getExtraJointExpense(totalJointExpense, jointIncome),
                          )}
                        </span>
                      </td>
                      <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
                        <span>
                          {getExtraJointExpense(totalJointExpense, jointIncome) > 0
                            ? getSelfContributionPercentage(selfPercentage, incomes)
                            : 0}
                          %
                        </span>
                      </td>
                    </tr>
                    <tr className="border border-gray-300">
                      <td className="min-w-fit whitespace-nowrap p-2">Partner - Contribution</td>
                      <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
                        <span>
                          {getPartnerContributionTotal(
                            user,
                            selfPercentage,
                            incomes,
                            getExtraJointExpense(totalJointExpense, jointIncome),
                          )}
                        </span>
                      </td>
                      <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
                        <span>
                          {getExtraJointExpense(totalJointExpense, jointIncome) > 0
                            ? getPartnerContributionPercentage(selfPercentage, incomes)
                            : 0}
                          %
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
      <AddSplit open={open} setOpen={setOpen} recordData={selected} />
      <ConfirmationDialog
        isLoading={isLoading}
        open={openDialog}
        msg={'Do you want to use the above income split?'}
        buttonText={'Yes'}
        setOpen={setOpenDialog}
        onClick={() => deleteHandler(selected)}
      />
    </>
  ) : (
    <Package />
  );
};
