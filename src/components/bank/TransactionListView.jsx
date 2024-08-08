import React, { useEffect, useState } from 'react';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { FaCheckSquare, FaEdit } from 'react-icons/fa';
import clsx from 'clsx';

import useUserStore from '../../app/user';
import { useQueryClient } from 'react-query';
import ConfirmationDialog from '../Dialogs';
import axios from '../../config/axios';
import { handleAxiosResponseError } from '../../utils/handleResponseError';
import AddTransaction from './AddTransaction';
import {
  getFormattedDate,
  getFormattedValueType,
  getBankAccountTypeTotal,
  getUnformattedBankBalanceTotal,
  getFormattedValueTotal,
} from '../../utils/budget.calculation';
import ToolTip from '../tooltip';
import Sort from '../sort';
import { defaultTransactionSort } from '../../utils/budget.sort';
import { FiCheckSquare } from 'react-icons/fi';
import { MdOutlineSquare } from 'react-icons/md';
import { calculateBalances } from '../../utils/budget.filter';

export const TransactionListView = ({ Data, bankName }) => {
  const { user } = useUserStore();
  const [gridData, setGridData] = useState([]);
  const [prompt, setPrompt] = useState('');
  const totalBankBalance = getUnformattedBankBalanceTotal(gridData);
  const openingBalance = bankName.OpeningBalance;

  const [order, setOrder] = useState(['default', 'default', 'default', 'default', 'default', 'default', 'default']);

  useEffect(() => {
    const sortedData = defaultTransactionSort(Data);
    const dataWithBalances = calculateBalances(sortedData);
    setGridData(dataWithBalances);
  }, [Data, bankName]);

  //----------------CRUD----------------//
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [openClearDialog, setOpenClearDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const deleteHandler = async () => {
    setIsLoading(true);

    axios
      .delete(`/api/bank-accounts/transaction/${selected}`)
      .then(({ data }) => {
        console.log(data);
        queryClient.setQueryData(['banktransactions'], (prev) =>
          prev.filter((transaction) => transaction.id !== selected),
        );
        setOpenDialog(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(handleAxiosResponseError(err));
      });
  };

  const transactionHandler = async () => {
    setIsLoading(true);

    axios
      .patch(`/api/bank-accounts/transaction/${selected}/status`)
      .then(({ data }) => {
        console.log(data);
        queryClient.setQueryData(['banktransactions'], (prev) =>
          prev.map((transaction) => (transaction.id === selected ? { ...transaction, ...data } : transaction)),
        );
        setOpenClearDialog(false);
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

  const handleClearTransaction = (data) => {
    setSelected(data.id);
    if (data.IsCleared) setPrompt(() => 'Do you want to Un-Clear the Bank Transaction?');
    else setPrompt(() => 'Do you want to Clear the Bank Transaction?');
    setOpenClearDialog(true);
  };

  //----------------CRUD----------------//

  const TableHeader = () => (
    <thead>
      <tr className="font-bold bg-[whitesmoke] text-black border border-gray-300 text-left text-sm xl:text-[16px]">
        {/* <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            Owner
            <Sort
              tab={"transaction"}
              order={order}
              setOrder={setOrder}
              column={1}
              name={"Owner"}
              data={gridData}
              setData={setGridData}
              defaultData={Data}
            />
          </div>
        </th> */}

        <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            Date
            <Sort
              tab={'transaction'}
              order={order}
              setOrder={setOrder}
              column={2}
              name={'Date'}
              data={gridData}
              setData={setGridData}
              defaultData={Data}
            />
          </div>
        </th>
        <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            Description
            <Sort
              tab={'transaction'}
              order={order}
              setOrder={setOrder}
              column={3}
              name={'Description'}
              data={gridData}
              setData={setGridData}
              defaultData={Data}
            />
          </div>
        </th>

        <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            <div className="flex flex-col">
              <span className="whitespace-nowrap text-left">Pmt, Fee,</span>
              <span className="whitespace-nowrap text-left">Withdrawal (-)</span>
            </div>

            <Sort
              tab={'transaction'}
              order={order}
              setOrder={setOrder}
              column={4}
              name={'Amount'}
              data={gridData}
              setData={setGridData}
              defaultData={Data}
              isNumber
            />
          </div>
        </th>

        <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            <div className="flex flex-col">
              <span className="whitespace-nowrap text-left">Deposit,</span>
              <span className="whitespace-nowrap text-left">Credit (+)</span>
            </div>

            <Sort
              tab={'transaction'}
              order={order}
              setOrder={setOrder}
              column={5}
              name={'Amount'}
              data={gridData}
              setData={setGridData}
              defaultData={Data}
              isNumber
            />
          </div>
        </th>

        <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            Cleared Bank?
            <Sort
              tab={'transaction'}
              order={order}
              setOrder={setOrder}
              column={6}
              name={'IsCleared'}
              data={gridData}
              setData={setGridData}
              defaultData={Data}
            />
          </div>
        </th>

        <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            Balance
            {/* <Sort
              tab={"transaction"}
              order={order}
              setOrder={setOrder}
              column={7}
              name={"Balance"}
              data={gridData}
              setData={setGridData}
              defaultData={Data}
              isNumber
            /> */}
          </div>
        </th>

        <th className="p-2 border-l border-gray-300">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ record }) => (
    <tr className="border border-gray-300 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
      {/* <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <span className="flex items-center justify-left gap-2 text-center mb-0 text-gray-900">
            {record?.Owner}
          </span>
        </div>
      </td> */}

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{getFormattedDate(user, record?.Date)}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
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
          <p className="text-sm xl:text-lg cursor-pointer group" onClick={() => handleClearTransaction(record)}>
            {record?.IsCleared ? (
              <FiCheckSquare className="text-green-500 group-hover:bg-green-200 p-1 h-6 w-6 rounded-full" />
            ) : (
              <MdOutlineSquare className="text-red-500 group-hover:bg-red-200 p-1 h-6 w-6 rounded-full" />
            )}
          </p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{getFormattedValueTotal(user, Number(record?.Balance) + Number(openingBalance))}</p>
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
    <tr className="border border-gray-300 text-sm xl:text-[18px] bg-[whitesmoke] text-gray-600 text-left font-bold">
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

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200"></td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p>{getFormattedValueTotal(user, Number(totalBankBalance) + Number(openingBalance))}</p>
        </div>
      </td>

      <td className="min-w-max p-3 border-l border-gray-200"></td>
    </tr>
  );

  return (
    <>
      {gridData?.length > 0 && (
        <div className="w-full h-fit bg-white py-6 mt-4 shadow-md rounded">
          <div className="flex flex-col gap-5 w-full items-end">
            <div className="w-full overflow-x-auto">
              <table className="w-[97%] ml-5">
                <thead>
                  <tr>
                    <th
                      className="p-2 w-full uppercase bg-[whitesmoke] text-black border border-gray-300 flex items-center justify-center"
                      colSpan="8"
                    >
                      {bankName?.Name} REGISTER
                    </th>
                  </tr>
                </thead>
              </table>
              <table className="w-[97%] md:w-fit ml-5 xl:ml-auto xl:mr-7 -mb-4 mt-1">
                <tbody>
                  <tr className="border border-gray-300 text-sm xl:text-[16px] text-left font-bold">
                    <td className="min-w-fit whitespace-nowrap p-2 border-gray-200 font-normal">
                      Bank Beginning Balance
                    </td>
                    <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
                      {getFormattedValueTotal(user, openingBalance)}
                    </td>
                  </tr>
                  <tr className="border border-gray-300 text-sm xl:text-[16px] text-left font-bold">
                    <td className="min-w-fit whitespace-nowrap p-2 border-gray-200 font-normal">
                      Bank Cash Current Balance
                    </td>
                    <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
                      {getFormattedValueTotal(user, Number(totalBankBalance) + Number(openingBalance))}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="w-[97%] m-5">
                <TableHeader />
                <tbody>
                  {gridData?.map((record, index) => (
                    <TableRow key={index} record={record} />
                  ))}
                  <TableTotal gridData={gridData} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <AddTransaction open={open} setOpen={setOpen} recordData={selected} key={new Date().getTime().toString()} />
      <ConfirmationDialog
        isLoading={isLoading}
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={() => deleteHandler()}
      />
      <ConfirmationDialog
        isLoading={isLoading}
        open={openClearDialog}
        setOpen={setOpenClearDialog}
        msg={prompt}
        buttonText={'Yes'}
        onClick={() => transactionHandler()}
      />
    </>
  );
};
