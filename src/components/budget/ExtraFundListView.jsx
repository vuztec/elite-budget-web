import React, { useEffect, useState } from 'react';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import clsx from 'clsx';

import useUserStore from '../../app/user';
import { useQueryClient } from 'react-query';
import ConfirmationDialog from '../Dialogs';
import axios from '../../config/axios';
import { handleAxiosResponseError } from '../../utils/handleResponseError';
import {
  getBankAccountTypeTotal,
  getFormattedValueTotal,
  getFormattedValueType,
  getUnformattedBankBalanceTotal,
  getUnformattedNetYearlyTotal,
  getUnformattedYearlyBudgetTotal,
} from '../../utils/budget.calculation';
import AddExtraFund from './AddExtraFund';
import { formatDate } from '../../utils';
import ToolTip from '../tooltip';
import Sort from '../sort';
import AddBalance from './AddBalance';

export const ExtraFundListView = ({
  gridData,
  incomeGridData,
  savingsGridData,
  retirementGridData,
  debtGridData,
  expenseGridData,
  owner,
  selfContribution,
  partnerContribution,
  excessBal,
}) => {
  const { user } = useUserStore();
  const totalExcessBalance = getUnformattedBankBalanceTotal(gridData);
  //----------------CRUD----------------//
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [balOpen, setBalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openingBalance, setOpeningBalance] = useState(0);
  const prevBalance = excessBal?.Balance ? excessBal?.Balance : 0;

  const [order, setOrder] = useState(['default', 'default', 'default', 'default', 'default', 'default']);
  const [data, setData] = useState(gridData);

  useEffect(() => {
    setData(gridData);
    const Expenses =
      getUnformattedYearlyBudgetTotal(debtGridData) +
      getUnformattedYearlyBudgetTotal(savingsGridData) +
      getUnformattedYearlyBudgetTotal(expenseGridData) +
      getUnformattedYearlyBudgetTotal(retirementGridData);
    const income =
      owner === 'Joint'
        ? 12 * Number(selfContribution) + 12 * Number(partnerContribution)
        : getUnformattedNetYearlyTotal(incomeGridData);
    const difference = (Number(income) - Number(Expenses)) / 12;
    setOpeningBalance(difference);
  }, [
    gridData,
    debtGridData,
    savingsGridData,
    expenseGridData,
    retirementGridData,
    incomeGridData,
    owner,
    selfContribution,
    partnerContribution,
  ]);

  const deleteHandler = async (selected) => {
    setIsLoading(true);

    axios
      .delete(`/api/extra-funds-tracker/${selected}`)
      .then(({ data }) => {
        queryClient.setQueryData(['extrafunds'], (prev) => prev.filter((fund) => fund.id !== selected));
        setOpenDialog(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(handleAxiosResponseError(err));
      });
  };

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  const editBalClick = () => {
    setBalOpen(true);
  };

  //----------------CRUD----------------//

  const TableHeader = () => (
    <thead>
      <tr className="font-bold bg-[whitesmoke] text-black border border-gray-300 text-left">
        <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            Owner
            <Sort
              tab={'fund'}
              order={order}
              setOrder={setOrder}
              column={1}
              name={'Owner'}
              data={data}
              setData={setData}
              defaultData={gridData}
            />
          </div>
        </th>
        <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            Date
            <Sort
              tab={'fund'}
              order={order}
              setOrder={setOrder}
              column={2}
              name={'Date'}
              data={data}
              setData={setData}
              defaultData={gridData}
            />
          </div>
        </th>
        <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            Description
            <Sort
              tab={'fund'}
              order={order}
              setOrder={setOrder}
              column={3}
              name={'Description'}
              data={data}
              setData={setData}
              defaultData={gridData}
            />
          </div>
        </th>

        <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            Withdrawal (-)
            <Sort
              tab={'fund'}
              order={order}
              setOrder={setOrder}
              column={4}
              name={'Amount'}
              data={data}
              setData={setData}
              defaultData={gridData}
              isNumber
            />
          </div>
        </th>

        <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            Credit (+)
            <Sort
              tab={'fund'}
              order={order}
              setOrder={setOrder}
              column={5}
              name={'Amount'}
              data={data}
              setData={setData}
              defaultData={gridData}
              isNumber
            />
          </div>
        </th>

        <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            Balance
            {/* <Sort
              tab={"fund"}
              order={order}
              setOrder={setOrder}
              column={6}
              name={"Balance"}
              data={data}
              setData={setData}
              defaultData={gridData}
              isNumber
            /> */}
          </div>
        </th>

        <th className="p-2 border-l border-gray-300">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ record }) => (
    <tr className="border border-gray-300 hover:bg-gray-400/10 text-left">
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <span className="flex items-center justify-left gap-2 text-center mb-0 text-gray-900">{record?.Owner}</span>
        </div>
      </td>

      <td className="max-w-[300px] whitespace-normal p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{formatDate(new Date(record?.Date))}</p>
        </div>
      </td>

      <td className="max-w-[300px] whitespace-normal p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{record?.Description}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{getFormattedValueType(user, record?.Amount, record?.Type, 'Withdrawal')}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{getFormattedValueType(user, record?.Amount, record?.Type, 'Credit')}</p>
        </div>
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{getFormattedValueTotal(user, Number(record?.Balance))}</p>
        </div>
      </td>

      <td className="min-w-max p-2 border-l border-r border-gray-200">
        <div className="flex items-center text-left gap-3 justify-start">
          <div className="group flex relative">
            <FaEdit
              className={clsx(`text-editcolor`, 'hover:text-orange-500 font-semibold cursor-pointer sm:px-0')}
              onClick={() => editClick(record)}
            />
            <ToolTip text={'Edit'} />
          </div>

          <div className="group flex relative">
            <RiDeleteBin2Fill
              className={clsx(`text-deletecolor`, 'hover:text-red-500 font-semibold cursor-pointer sm:px-0')}
              onClick={() => deleteClick(record.id)}
            />
            <ToolTip text={'Delete'} />
          </div>
        </div>
      </td>
    </tr>
  );

  const TableTotal = ({ gridData }) => (
    <tr className="border border-gray-300 bg-[whitesmoke] text-gray-600 text-left font-bold">
      <td className="min-w-fit whitespace-nowrap p-3 border-gray-200"></td>

      <td className="min-w-fit whitespace-nowrap p-3 border-gray-200"></td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">TOTAL</td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p>{getBankAccountTypeTotal(user, gridData, 'Withdrawal')}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p>{getBankAccountTypeTotal(user, gridData, 'Credit')}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p>{getFormattedValueTotal(user, Number(totalExcessBalance))}</p>
        </div>
      </td>

      <td className="min-w-max p-3 border-l border-gray-200"></td>
    </tr>
  );

  return (
    <>
      <div className="w-full h-fit bg-white py-6 mt-4 shadow-md rounded text-sm xl:text-[16px]">
        <div className="flex flex-col gap-5 w-full">
          <div className="overflow-x-auto">
            <table className="w-[97%] md:w-fit ml-5 xl:ml-auto xl:mr-7 -mb-4">
              <tbody>
                <tr className="border border-gray-300 text-sm xl:text-[16px] text-left font-bold">
                  <td className="min-w-fit whitespace-nowrap p-2 border-gray-200 font-normal">
                    Current Month’s Extra Funds
                  </td>
                  <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
                    {getFormattedValueTotal(user, openingBalance)}
                  </td>
                </tr>
                <tr className="border border-gray-300 text-sm xl:text-[16px] text-left font-bold">
                  <td className="min-w-fit whitespace-nowrap p-2 border-gray-200 font-normal">
                    Extra Funds by the week
                  </td>
                  <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
                    {getFormattedValueTotal(user, Number(openingBalance) / 4)}
                  </td>
                </tr>
                <tr className="border border-gray-300 text-sm xl:text-[16px] text-left font-bold">
                  <td className="min-w-fit whitespace-nowrap p-2 border-gray-200 font-normal">
                    Extra Funds Current Balance
                  </td>
                  <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
                    {getFormattedValueTotal(user, Number(totalExcessBalance))}
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="w-[97%] m-5">
              <TableHeader />
              <tbody>
                {data?.map((record, index) => (
                  <TableRow key={index} record={record} />
                ))}
                <TableTotal gridData={gridData} />
              </tbody>
            </table>
            <div className="flex flex-col gap-3 mt-10 w-[97%]">
              <p className="text-sm font-bold italic text-gray-500 ml-5 text-justify">
                Note: One number focus! This is NOT your bank account register. This is a tool to track the balance of
                your available extra funds (the amount remaining when all your budget items are paid).
              </p>
              <div className="flex gap-1">
                <p className="text-sm font-bold italic text-gray-500 ml-5 whitespace-nowrap">Step 1:</p>
                <p className="text-sm font-semibold italic text-gray-500 ml-2 md:ml-5">Add</p>
                <p className="text-sm italic text-gray-500 ml-2 md:ml-5 text-justify">
                  At the beginning of each month, enter the current month's extra funds total (the amount that you are
                  under budget by).
                </p>
              </div>
              <div className="flex gap-1">
                <p className="text-sm font-bold italic text-gray-500 ml-5 whitespace-nowrap">Step 2:</p>
                <p className="text-sm font-semibold italic text-gray-500 ml-2 md:ml-5">Subtract</p>
                <p className="text-sm italic text-gray-500 ml-2 md:ml-5 text-justify">
                  Enter any purchases not included in the budget.
                </p>
              </div>
              <div className="flex gap-1">
                <p className="text-sm font-bold italic text-gray-500 ml-5 whitespace-nowrap">Step 3:</p>
                <p className="text-sm font-semibold italic text-gray-500 ml-2 md:ml-5">Subtract</p>
                <p className="text-sm italic text-gray-500 ml-2 md:ml-5 text-justify">
                  Enter the amount that exceeds a budget item (e.g. Your cell phone budget is $75. The monthly bill is
                  $100. Subtract $25).
                </p>
              </div>
              <div className="flex gap-1">
                <p className="text-sm font-bold italic text-gray-500 ml-5 whitespace-nowrap">Step 4:</p>
                <p className="text-sm font-semibold italic text-gray-500 ml-2 md:ml-5">Add</p>
                <p className="text-sm italic text-gray-500 ml-2 md:ml-5 text-justify">
                  Enter the amount of a monthly budget item you didn't have to pay (e.g. vehicle ins 6 mo. policy is
                  paid in 5 monthly pmts. In the 6th mo., no premiums will be paid so add it to your tracker).
                </p>
              </div>
              <div className="flex gap-1">
                <p className="text-sm font-bold italic text-gray-500 ml-5 whitespace-nowrap">Step 5:</p>
                <p className="text-sm font-semibold italic text-gray-500 ml-2 md:ml-5">Add</p>
                <p className="text-sm italic text-gray-500 ml-2 md:ml-5 text-justify">
                  Enter the difference of a budget item that is less than the budget (e.g. Your food budget is $1000.
                  The actual amt spent was $800. Add $200 to the tracker).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddExtraFund open={open} setOpen={setOpen} recordData={selected} />
      <AddBalance open={balOpen} setOpen={setBalOpen} recordData={excessBal} />
      <ConfirmationDialog
        isLoading={isLoading}
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={() => deleteHandler(selected)}
      />
    </>
  );
};
