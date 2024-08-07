import React, { useEffect, useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import clsx from "clsx";

import useUserStore from "../../app/user";
import { useQueryClient } from "react-query";
import ConfirmationDialog from "../../components/Dialogs";
import axios from "../../config/axios";
import { handleAxiosResponseError } from "../../utils/handleResponseError";
import AddIncome from "./AddIncome";
import {
  getGrossMonthlyTotal,
  getNetMonthlyTotal,
  getGrossYearlyTotal,
  getNetYearlyTotal,
  getFormattedValue,
} from "../../utils/budget.calculation";
import ToolTip from "../tooltip";
import Sort from "../sort";

export const IncomeListView = ({ gridData, showDelete }) => {
  const { user } = useUserStore();

  //----------------CRUD----------------//
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState([
    "default",
    "default",
    "default",
    "default",
    "default",
  ]);
  const [data, setData] = useState(gridData);

  useEffect(() => {
    setData(gridData);
  }, [gridData]);

  const deleteHandler = async (selected) => {
    setIsLoading(true);
    axios
      .delete(`/api/income/${selected}`)
      .then(({ data }) => {
        queryClient.setQueryData(["incomes"], (prev) =>
          prev.map((income) =>
            income.id === selected ? { ...income, ...data } : income
          )
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
              tab={"income"}
              order={order}
              setOrder={setOrder}
              column={1}
              name={"Owner"}
              data={data}
              setData={setData}
              defaultData={gridData}
            />
          </div>
        </th>

        <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            Income Source
            <Sort
              tab={"income"}
              order={order}
              setOrder={setOrder}
              column={2}
              name={"IncomeSource"}
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
              tab={"income"}
              order={order}
              setOrder={setOrder}
              column={2}
              name={"NickName"}
              data={data}
              setData={setData}
              defaultData={gridData}
            />
          </div>
        </th>
        <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            Frequency
            <Sort
              tab={"income"}
              order={order}
              setOrder={setOrder}
              column={3}
              name={"Frequency"}
              data={data}
              setData={setData}
              defaultData={gridData}
            />
          </div>
        </th>
        <th className="border-l border-gray-300 p-1">
          <div className="flex justify-between items-center gap-2">
            <div className="flex flex-col">
              <span className="whitespace-nowrap text-left">Gross Pay</span>
              <span className="whitespace-nowrap text-left">
                (Before Taxes)
              </span>
            </div>
            <Sort
              tab={"income"}
              order={order}
              setOrder={setOrder}
              column={4}
              name={"GrossAmount"}
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
              <span className="whitespace-nowrap text-left">Net Pay</span>
              <span className="whitespace-nowrap text-left">(Pay Rec'd)</span>
            </div>
            <Sort
              tab={"income"}
              order={order}
              setOrder={setOrder}
              column={5}
              name={"NetAmount"}
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
            {record?.Owner}
          </span>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{record?.IncomeSource}</p>
        </div>
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{record?.NickName}</p>
        </div>
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black"> {record?.Frequency}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">
            {getFormattedValue(user, record?.GrossAmount)}
          </p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">
            {getFormattedValue(user, record?.NetAmount)}
          </p>
        </div>
      </td>

      <td className="min-w-max p-2 border-l border-r border-gray-200">
        <div className="flex items-center text-left gap-3 justify-start">
          <div className="group flex relative">
            <FaEdit
              className={clsx(
                `text-editcolor`,
                "hover:text-orange-500 font-semibold cursor-pointer sm:px-0"
              )}
              onClick={() => editClick(record)}
            />
            <ToolTip text="Edit" />
          </div>
          {showDelete && (
            <div className="group flex relative">
              <RiDeleteBin2Fill
                className={clsx(
                  `text-deletecolor`,
                  "hover:text-red-500 font-semibold cursor-pointer sm:px-0"
                )}
                onClick={() => deleteClick(record.id)}
              />
              <ToolTip text="Delete" />
            </div>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="w-full h-fit bg-white py-2 mt-4 shadow-md rounded text-sm xl:text-[16px]">
      <div className="flex flex-col gap-5 w-full">
        <div className="w-full overflow-x-auto">
          <table className="w-[97%] overflow-x-auto m-5">
            <TableHeader />
            <tbody>
              {data?.map((record, index) => (
                <TableRow key={index} record={record} />
              ))}
            </tbody>
          </table>

          <table className="w-fit m-5 overflow-x-auto">
            <tbody className="border border-gray-300">
              <tr className="border border-gray-300 bg-[whitesmoke] text-black">
                <td className="p-3 font-bold">INCOME SUMMARY</td>
                <td></td>
              </tr>

              <tr className="border border-gray-300">
                <td className="min-w-fit whitespace-nowrap text-right p-2">
                  * Monthly Budgeted Gross Income:
                </td>
                <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
                  {getGrossMonthlyTotal(user, gridData)}
                </td>
              </tr>
              <tr className="border border-gray-300">
                <td className="text-right p-2 min-w-fit whitespace-nowrap">
                  * Monthly Budgeted Net Income:
                </td>
                <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
                  {getNetMonthlyTotal(user, gridData)}
                </td>
              </tr>
              <tr className="border border-gray-300">
                <td className="text-right p-2 min-w-fit whitespace-nowrap">
                  Total Annual Gross Income:
                </td>
                <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
                  {getGrossYearlyTotal(user, gridData)}
                </td>
              </tr>
              <tr className="border border-gray-300">
                <td className="min-w-fit whitespace-nowrap text-right p-2">
                  Total Annual Net Income:
                </td>
                <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
                  {getNetYearlyTotal(user, gridData)}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="w-full ml-5">
            <p className="text-xs">
              * Note 1: Budgeted net monthly income for someone paid weekly is
              based on 4 pay periods per month (48 pay periods per year). The 4
              Extra pays per year are directed towards savings.
            </p>
            <p className="text-xs">
              * Note 2: Budgeted net monthly income for someone paid bi-weekly
              is based on 2 pay periods per month (24 pay periods per year). The
              2 Extra pays per year are directed towards savings.
            </p>
          </div>
        </div>
      </div>

      <AddIncome
        open={open}
        setOpen={setOpen}
        recordData={selected}
        key={new Date().getTime().toString()}
      />
      <ConfirmationDialog
        isLoading={isLoading}
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={() => deleteHandler(selected)}
      />
    </div>
  );
};
