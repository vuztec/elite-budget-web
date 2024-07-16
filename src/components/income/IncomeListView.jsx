import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit, FaRegCalendarCheck, FaRegCalendarTimes } from "react-icons/fa";
import clsx from "clsx";

import useUserStore from "../../app/user";
import { useQueryClient } from "react-query";
import ConfirmationDialog from "../../components/Dialogs";
import axios from "../../config/axios";
import { getProjectChatUsers } from "../../utils/users";
import { handleAxiosResponseError } from "../../utils/handleResponseError";
import AddIncome from "./AddIncome";
import {
  getGrossSemiMonthlyTotal,
  getGrossBiWeeklyTotal,
  getGrossWeeklyTotal,
  getIncomeAmount,
  getNetBiWeeklyTotal,
  getNetSemiMonthlyTotal,
  getNetWeeklyTotal,
  getGrossMonthlyTotal,
  getNetMonthlyTotal,
  getGrossYearlyTotal,
  getNetYearlyTotal,
} from "../../utils/budget.calculation";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const IncomeListView = ({ gridData, usedCurrency }) => {
  const { user } = useUserStore();

  //----------------CRUD----------------//
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedChatUsers, setSelectedChatUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const deleteHandler = async (selected) => {
    setIsLoading(true);
    await axios.delete(
      `${SERVER_URL}/api/attachment/delete-file?type=project_id&id=${selected}`
    );
    axios
      .delete(`${SERVER_URL}/api/project/${selected}`)
      .then(({ data }) => {
        console.log(data);
        queryClient.setQueryData(["projects"], (prev) =>
          prev.filter((project) => project.id !== selected)
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
    const chatUsers = getProjectChatUsers(el, taskData, costData, el.id, user);
    setSelectedChatUsers(() => chatUsers);
  };

  //----------------CRUD----------------//

  const TableHeader = () => (
    <thead>
      <tr className="font-bold bg-black text-white border border-gray-400 text-left text-xs xl:text-xs">
        <th className="border-l border-gray-300 p-2 text-xs xl:text-sm">
          Name
        </th>
        <th className="border-l border-gray-300 p-2 text-xs xl:text-sm">
          Income Source
        </th>
        <th className="border-l border-gray-300 p-1">
          <div className="flex flex-col">
            <span className="whitespace-nowrap text-left">
              Weekly-Gross Pay
            </span>
            <span className="whitespace-nowrap text-left">(Before Taxes)</span>
            <span className="whitespace-nowrap text-left">Paid Weekly</span>
          </div>
        </th>
        <th className="border-l border-gray-300 p-1">
          <div className="flex flex-col">
            <span className="whitespace-nowrap text-left">Weekly-Net Pay</span>
            <span className="whitespace-nowrap text-left">(Pay Rec'd)</span>
            <span className="whitespace-nowrap text-left">Paid Weekly</span>
          </div>
        </th>
        <th className="border-l border-gray-300 p-1">
          <div className="flex flex-col">
            <span className="whitespace-nowrap text-left">
              Bi-Weekly-Gross Pay
            </span>
            <span className="whitespace-nowrap text-left">(Before Taxes)</span>
            <span className="whitespace-nowrap text-left">
              Paid Every 2 Weeks
            </span>
          </div>
        </th>
        <th className="border-l border-gray-300 p-1">
          <div className="flex flex-col">
            <span className="whitespace-nowrap text-left">
              Bi-Weekly-Net Pay
            </span>
            <span className="whitespace-nowrap text-left">(Pay Rec'd)</span>
            <span className="whitespace-nowrap text-left">
              Paid Every 2 Weeks
            </span>
          </div>
        </th>
        <th className="border-l border-gray-300 p-1">
          <div className="flex flex-col">
            <span className="whitespace-nowrap text-left">
              Semi-Monthly-Gross Pay
            </span>
            <span className="whitespace-nowrap text-left">(Before Taxes)</span>
            <span className="whitespace-nowrap text-left">
              Paid on 15th & Last Day
            </span>
          </div>
        </th>
        <th className="border-l border-gray-300 p-1">
          <div className="flex flex-col">
            <span className="whitespace-nowrap text-left">
              Semi-Monthly-Net Pay
            </span>
            <span className="whitespace-nowrap text-left">(Pay Rec'd)</span>
            <span className="whitespace-nowrap text-left">
              Paid on 15th & Last Day
            </span>
          </div>
        </th>
        <th className="border-l border-gray-300 p-1">
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
        </th>

        <th className="p-2 border-l border-gray-300 text-xs xl:text-sm">
          Actions
        </th>
      </tr>
    </thead>
  );

  const TableRow = ({ record }) => (
    <tr className="border border-gray-300 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <span className="flex items-center justify-left gap-2 border-b border-gray-200 text-center mb-0 text-gray-900">
            {record?.Owner}
          </span>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black"> {record?.IncomeSource}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">
            {getIncomeAmount(
              user,
              record?.GrossAmount,
              record?.Frequency,
              "Weekly"
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
              "Weekly"
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
              "Bi-Weekly"
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
              "Bi-Weekly"
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
              "Semi-Monthly"
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
              "Semi-Monthly"
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
      </td>

      <td className="min-w-max p-2 border-l border-gray-200">
        <div className="flex items-center text-left gap-3 justify-start">
          <FaEdit
            className={clsx(
              `text-editcolor`,
              "hover:text-orange-500 font-semibold cursor-pointer sm:px-0"
            )}
            onClick={() => editClick(record)}
          />

          <RiDeleteBin2Fill
            className={clsx(
              `text-deletecolor`,
              "hover:text-red-500 font-semibold cursor-pointer sm:px-0"
            )}
            onClick={() => deleteClick(record.id)}
          />
        </div>
      </td>
    </tr>
  );

  const TableTotal = ({ gridData }) => (
    <tr className="border border-gray-300 text-sm xl:text-[18px] bg-black text-white text-left font-bold">
      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200"></td>

      <td className="min-w-fit whitespace-nowrap p-3 border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p> Total</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p>{getGrossWeeklyTotal(user, gridData)}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p>{getNetWeeklyTotal(user, gridData)}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p>{getGrossBiWeeklyTotal(user, gridData)}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p>{getNetBiWeeklyTotal(user, gridData)}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p>{getGrossSemiMonthlyTotal(user, gridData)}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p>{getNetSemiMonthlyTotal(user, gridData)}</p>
        </div>
      </td>

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
      <div className="overflow-x-auto">
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
      <AddIncome
        open={open}
        setOpen={setOpen}
        recordData={selected}
        key={new Date().getTime().toString()}
        chatUsers={selectedChatUsers}
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
