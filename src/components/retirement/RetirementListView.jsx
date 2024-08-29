import React, { useEffect, useState } from 'react';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import clsx from 'clsx';

import useUserStore from '../../app/user';
import { useQueryClient } from 'react-query';
import ConfirmationDialog from '../Dialogs';
import axios from '../../config/axios';
import { handleAxiosResponseError } from '../../utils/handleResponseError';
import { AddRetirement } from './AddRetirement';
import {
  canDelete,
  getFormattedValue,
  getMarketValueTotal,
  getMonthlyBudgetTotal,
  getYearlyBudgetTotal,
} from '../../utils/budget.calculation';
import ToolTip from '../tooltip';
import Sort from '../sort';

export const RetirementListView = ({ gridData }) => {
  const { user } = useUserStore();

  //----------------CRUD----------------//
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState(['default', 'default', 'default', 'default', 'default', 'default', 'default']);
  const [data, setData] = useState(gridData);

  useEffect(() => {
    setData(gridData);
  }, [gridData]);

  const deleteHandler = async (selected) => {
    setIsLoading(true);

    axios
      .delete(`/api/savings-retirements/${selected}`)
      .then(({ data }) => {
        queryClient.setQueryData(['retirements'], (prev) =>
          prev.map((retirement) => (retirement.id === selected ? { ...retirement, ...data } : retirement)),
        );
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

  //----------------CRUD----------------//

  const TableHeader = () => (
    <thead>
      <tr className="font-bold bg-[whitesmoke] text-black border border-gray-300 text-left">
        <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            Owner
            <Sort
              tab={'retirement'}
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
            Description
            <Sort
              tab={'retirement'}
              order={order}
              setOrder={setOrder}
              column={2}
              name={'Description'}
              data={data}
              setData={setData}
              defaultData={gridData}
            />
          </div>
        </th>
        <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            Nickname
            <Sort
              tab={'retirement'}
              order={order}
              setOrder={setOrder}
              column={2}
              name={'NickName'}
              data={data}
              setData={setData}
              defaultData={gridData}
            />
          </div>
        </th>
        <th className="border-l border-gray-300 p-1">
          <div className="flex justify-between items-center gap-2">
            <div className="flex flex-col">
              <span className="text-left">Market Value</span>
              <span className="text-left text-xs">(For Net Worth Calc)</span>
            </div>
            <Sort
              tab={'retirement'}
              order={order}
              setOrder={setOrder}
              column={3}
              name={'MarketValue'}
              data={data}
              setData={setData}
              defaultData={gridData}
              isNumber
            />
          </div>
        </th>

        <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            Day Due
            <Sort
              tab={'retirement'}
              order={order}
              setOrder={setOrder}
              column={4}
              name={'DueDate'}
              data={data}
              setData={setData}
              defaultData={gridData}
            />
          </div>
        </th>
        <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            <div className="flex flex-col">
              <span className="text-left">Payment</span>
              <span className="text-left">Method</span>
            </div>

            <Sort
              tab={'retirement'}
              order={order}
              setOrder={setOrder}
              column={5}
              name={'PaymentMethod'}
              data={data}
              setData={setData}
              defaultData={gridData}
            />
          </div>
        </th>
        <th className="border-l border-gray-300 p-1">
          <div className="flex justify-between items-center gap-2">
            <div className="flex flex-col">
              <span className="text-left">Monthly</span>
              <span className="text-left">Savings</span>
            </div>

            <Sort
              tab={'retirement'}
              order={order}
              setOrder={setOrder}
              column={6}
              name={'MonthlyBudget'}
              data={data}
              setData={setData}
              defaultData={gridData}
              isNumber
            />
          </div>
        </th>
        <th className="border-l border-gray-300 p-1">
          <div className="flex justify-between items-center gap-2">
            <div className="flex flex-col">
              <span className="text-left">Annual</span>
              <span className="text-left">Savings</span>
            </div>

            <Sort
              tab={'retirement'}
              order={order}
              setOrder={setOrder}
              column={7}
              name={'MonthlyBudget'}
              data={data}
              setData={setData}
              defaultData={gridData}
              isNumber
            />
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
          <p className="text-black">{record?.Description}</p>
        </div>
      </td>

      <td className="max-w-[300px] whitespace-normal p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{record?.NickName}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{getFormattedValue(user, record?.MarketValue)}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{record?.DueDate}</p>
        </div>
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black"> {record?.PaymentMethod}</p>
        </div>
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{getFormattedValue(user, record?.MonthlyBudget)}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{getFormattedValue(user, 12 * record?.MonthlyBudget)}</p>
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
          {canDelete(record) && (
            <div className="group flex relative">
              <RiDeleteBin2Fill
                className={clsx(`text-deletecolor`, 'hover:text-red-500 font-semibold cursor-pointer sm:px-0')}
                onClick={() => deleteClick(record.id)}
              />
              <ToolTip text={'Delete'} />
            </div>
          )}
        </div>
      </td>
    </tr>
  );

  const TableTotal = ({ gridData }) => (
    <tr className="border border-gray-300 bg-[whitesmoke] text-gray-600 text-left font-bold">
      <td className="min-w-fit whitespace-nowrap p-3 border-gray-200"></td>
      <td className="min-w-fit whitespace-nowrap p-3 border-gray-200"></td>

      <td className="min-w-fit whitespace-nowrap p-3 border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p>Total</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p>{getMarketValueTotal(user, gridData)}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200"></td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200"></td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p>{getMonthlyBudgetTotal(user, gridData)}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p>{getYearlyBudgetTotal(user, gridData)}</p>
        </div>
      </td>

      <td className="min-w-max p-3 border-l border-gray-200"></td>
    </tr>
  );

  return (
    <>
      {data?.length > 0 && (
        <div className="w-full h-fit bg-white py-6 mt-4 shadow-md rounded  text-sm xl:text-[16px]">
          <div className="flex flex-col gap-5 w-full">
            <div className="w-full overflow-x-auto">
              <table className="w-[97%] ml-5 -mb-5">
                <thead>
                  <tr>
                    <th className="p-2 w-full uppercase bg-[whitesmoke] text-black  border-l border-t border-r border-gray-300 flex items-center justify-center">
                      RETIREMENT SAVINGS
                    </th>
                  </tr>
                </thead>
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
            </div>
          </div>
        </div>
      )}
      <AddRetirement open={open} setOpen={setOpen} recordData={selected} key={new Date().getTime().toString()} />
      <ConfirmationDialog
        isLoading={isLoading}
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={() => deleteHandler(selected)}
      />
    </>
  );
};
