import React, { useEffect, useState } from 'react';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import clsx from 'clsx';

import useUserStore from '../../app/user';
import { useQueryClient } from 'react-query';
import ConfirmationDialog from '../Dialogs';
import axios from '../../config/axios';
import { handleAxiosResponseError } from '../../utils/handleResponseError';
import {
  getExtraPayCheckTotal,
  getFormattedValue,
  getFormattedValueTotal,
  getMonthlyBudgetTotal,
  getYearlyBudgetTotal,
} from '../../utils/budget.calculation';
import AddExtraPay from './AddExtraPay';
import { formatDate } from '../../utils';
import ToolTip from '../tooltip';
import Sort from '../sort';

export const ExtraPayListView = ({ gridData, showDelete }) => {
  const { user } = useUserStore();

  //----------------CRUD----------------//
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [order, setOrder] = useState(['default', 'default', 'default']);
  const [data, setData] = useState(gridData);

  useEffect(() => {
    setData(gridData);
  }, [gridData]);

  const deleteHandler = async (selected) => {
    setIsLoading(true);

    axios
      .delete(`/api/extra-pay-checks/${selected}`)
      .then(({ data }) => {
        queryClient.setQueryData(['extrapaychecks'], (prev) =>
          prev.map((check) => (check.id === selected ? { ...check, ...data } : check)),
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
            * Extra Pay Dates
            <Sort
              order={order}
              setOrder={setOrder}
              column={1}
              name={'Date'}
              data={data}
              setData={setData}
              defaultData={gridData}
            />
          </div>
        </th>
        <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            Self
            <Sort
              order={order}
              setOrder={setOrder}
              column={2}
              name={'SelfAmount'}
              data={data}
              setData={setData}
              defaultData={gridData}
              isNumber
            />
          </div>
        </th>
        <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            Partner
            <Sort
              order={order}
              setOrder={setOrder}
              column={3}
              name={'PartnerAmount'}
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
          <span className="flex items-center justify-left gap-2 text-center mb-0 text-gray-900">
            {record?.Date ? formatDate(new Date(record?.Date)) : 'XX/XX/XXXX'}
          </span>
        </div>
      </td>

      <td className="max-w-[300px] whitespace-normal p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{getFormattedValueTotal(user, record?.SelfAmount)}</p>
        </div>
      </td>

      <td className="max-w-[300px] whitespace-normal p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{getFormattedValueTotal(user, record?.PartnerAmount)}</p>
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
          {showDelete && (
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
      <td className="min-w-fit whitespace-nowrap p-3 border-gray-200">Total</td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p>{getExtraPayCheckTotal(user, gridData, 'Self')}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p>{getExtraPayCheckTotal(user, gridData, 'Partner')}</p>
        </div>
      </td>

      <td className="min-w-max p-3 border-l border-gray-200"></td>
    </tr>
  );

  return (
    <>
      <div className="w-full h-fit bg-white py-6 mt-4 shadow-md rounded  text-sm xl:text-[16px]">
        <div className="flex flex-col gap-0 w-full">
          <div className="w-full overflow-x-auto">
            <table className="w-[97%] ml-5 -mb-5 overflow-x-auto">
              <thead>
                <tr>
                  <th className="p-2 w-full uppercase bg-[whitesmoke] text-black  border-l border-t border-r border-gray-300 flex items-center justify-center">
                    EXTRA PAYCHECKS
                  </th>
                </tr>
              </thead>
            </table>
            <table className="w-[97%] m-5 overflow-x-auto">
              <TableHeader />
              <tbody>
                {gridData?.map((record, index) => (
                  <TableRow key={index} record={record} />
                ))}
                <TableTotal gridData={gridData} />
              </tbody>
            </table>
            <div className="w-[97%] ml-5 mb-5">
              <p className="text-xs">
                * Note: Refer to the Extra Pay Dates tab for your Extra Pay Dates. Only applies if you are paid Weekly
                or Biweekly.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AddExtraPay open={open} setOpen={setOpen} recordData={selected} key={new Date().getTime().toString()} />
      <ConfirmationDialog
        isLoading={isLoading}
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={() => deleteHandler(selected)}
      />
    </>
  );
};
