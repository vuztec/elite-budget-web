import React, { useState } from "react";
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

export const IncomeListView = ({ gridData }) => {
  const { user } = useUserStore();

  //----------------CRUD----------------//
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const deleteHandler = async (selected) => {
    setIsLoading(true);
    axios
      .delete(`/api/income/${selected}`)
      .then(({ data }) => {
        console.log(data);
        queryClient.setQueryData(["incomes"], (prev) => prev.map((income) => (income.id === selected ? { ...income, ...data } : income)));
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

  console.log(gridData);

  //----------------CRUD----------------//

  const TableHeader = () => (
    <thead>
      <tr className="font-bold bg-black text-white border border-gray-400 text-left text-xs xl:text-sm">
        <th className="border-l border-gray-300 p-2 text-xs xl:text-sm">Name</th>
        <th className="border-l border-gray-300 p-2 text-xs xl:text-sm">Income Source</th>
        <th className="border-l border-gray-300 p-2 text-xs xl:text-sm">Frequency</th>
        <th className="border-l border-gray-300 p-1">
          <div className="flex flex-col">
            <span className="whitespace-nowrap text-left">Gross Pay</span>
            <span className="whitespace-nowrap text-left">(Before Taxes)</span>
            {/* <span className="whitespace-nowrap text-left">Paid Weekly</span> */}
          </div>
        </th>
        <th className="border-l border-gray-300 p-1">
          <div className="flex flex-col">
            <span className="whitespace-nowrap text-left">Net Pay</span>
            <span className="whitespace-nowrap text-left">(Pay Rec'd)</span>
            {/* <span className="whitespace-nowrap text-left">Paid Weekly</span> */}
          </div>
        </th>
        {/* <th className="border-l border-gray-300 p-1">
          <div className="flex flex-col">
            <span className="whitespace-nowrap text-left">
              Monthly-Gross Pay
            </span>
            <span className="whitespace-nowrap text-left">(Before Taxes)</span>
            <span className="whitespace-nowrap text-left">
              Paid 1x per Month
            </span>
          </div>
        </th>
        <th className="border-l border-gray-300 p-1">
          <div className="flex flex-col">
            <span className="whitespace-nowrap text-left">Monthly-Net Pay</span>
            <span className="whitespace-nowrap text-left">(Pay Rec'd)</span>
            <span className="whitespace-nowrap text-left">
              Paid 1x per Month
            </span>
          </div>
        </th>
        <th className="border-l border-gray-300 p-1">
          <div className="flex flex-col">
            <span className="whitespace-nowrap text-left">
              Yearly-Gross Pay
            </span>
            <span className="whitespace-nowrap text-left">(Before Taxes)</span>
            <span className="whitespace-nowrap text-left">
              Paid 1x per Year
            </span>
          </div>
        </th>
        <th className="border-l border-gray-300 p-1">
          <div className="flex flex-col">
            <span className="whitespace-nowrap text-left">Yearly-Net Pay</span>
            <span className="whitespace-nowrap text-left">(Pay Rec'd)</span>
            <span className="whitespace-nowrap text-left">
              Paid 1x per Year
            </span>
          </div>
        </th> */}

        <th className="p-2 border-l border-gray-300 text-xs xl:text-sm">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ record }) => (
    <tr className="border border-gray-300 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <span className="flex items-center justify-left gap-2 text-center mb-0 text-gray-900">{record?.Owner}</span>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{record?.NickName ? record?.NickName : record?.IncomeSource}</p>
        </div>
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black"> {record?.Frequency}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{getFormattedValue(user, record?.GrossAmount)}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{getFormattedValue(user, record?.NetAmount)}</p>
        </div>
      </td>

      {/* <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">
            {getIncomeAmount(
              user,
              record?.GrossAmount,
              record?.Frequency,
              "Monthly"
            )}
          </p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">
            {getIncomeAmount(
              user,
              record?.NetAmount,
              record?.Frequency,
              "Monthly"
            )}
          </p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">
            {getIncomeAmount(
              user,
              record?.GrossAmount,
              record?.Frequency,
              "Yearly"
            )}
          </p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">
            {getIncomeAmount(
              user,
              record?.NetAmount,
              record?.Frequency,
              "Yearly"
            )}
          </p>
        </div>
      </td> */}

      <td className="min-w-max p-2 border-l border-r border-gray-200">
        <div className="flex items-center text-left gap-3 justify-start">
          <div className="group flex relative">
            <FaEdit
              className={clsx(`text-editcolor`, "hover:text-orange-500 font-semibold cursor-pointer sm:px-0")}
              onClick={() => editClick(record)}
            />
            <ToolTip text="Edit" />
          </div>

          <div className="group flex relative">
            <RiDeleteBin2Fill
              className={clsx(`text-deletecolor`, "hover:text-red-500 font-semibold cursor-pointer sm:px-0")}
              onClick={() => deleteClick(record.id)}
            />
            <ToolTip text="Delete" />
          </div>
        </div>
      </td>
    </tr>
  );

  const TableTotal = ({ gridData }) => (
    <tr className="border border-gray-300 text-sm xl:text-[18px] bg-black text-white text-left font-bold">
      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200"></td>

      <td className="min-w-fit whitespace-nowrap p-3 border-gray-200"></td>

      <td className="min-w-fit whitespace-nowrap p-3 border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p> Total</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200"></td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200"></td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p>{getGrossMonthlyTotal(user, gridData)}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p>{getNetMonthlyTotal(user, gridData)}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p>{getGrossYearlyTotal(user, gridData)}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p>{getNetYearlyTotal(user, gridData)}</p>
        </div>
      </td>

      <td className="min-w-max p-3 border-l border-gray-200"></td>
    </tr>
  );

  return (
    <div className="w-full h-fit bg-white py-2 shadow-md rounded">
      <div className="flex flex-col gap-5 w-full">
        <div className="w-fit xl:w-2/3 overflow-x-auto">
          <table className="w-[97%] m-5">
            <TableHeader />
            <tbody>
              {gridData?.map((record, index) => (
                <TableRow key={index} record={record} />
              ))}
              {/* <TableTotal gridData={gridData} /> */}
            </tbody>
          </table>
        </div>
        <div className="w-fit m-5">
          <table>
            <tbody className="border border-gray-300">
              <tr className="border border-gray-300 bg-black text-white">
                <td className="p-3 font-bold">INCOME SUMMARY</td>
                <td></td>
              </tr>

              <tr className="border border-gray-300">
                <td className="min-w-fit whitespace-nowrap text-right p-2">Monthly Budgeted Gross Income:</td>
                <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
                  {getGrossMonthlyTotal(user, gridData)}
                </td>
              </tr>
              <tr className="border border-gray-300">
                <td className="text-right p-2 min-w-fit whitespace-nowrap">Monthly Budgeted Net Income:</td>
                <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">{getNetMonthlyTotal(user, gridData)}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="text-right p-2 min-w-fit whitespace-nowrap">Total Annual Gross Income:</td>
                <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">
                  {getGrossYearlyTotal(user, gridData)}
                </td>
              </tr>
              <tr className="border border-gray-300">
                <td className="min-w-fit whitespace-nowrap text-right p-2">Total Annual Net Income:</td>
                <td className="min-w-fit whitespace-nowrap p-2 font-bold border-l border-gray-300">{getNetYearlyTotal(user, gridData)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <AddIncome open={open} setOpen={setOpen} recordData={selected} key={new Date().getTime().toString()} />
      <ConfirmationDialog isLoading={isLoading} open={openDialog} setOpen={setOpenDialog} onClick={() => deleteHandler(selected)} />
    </div>
  );
};
