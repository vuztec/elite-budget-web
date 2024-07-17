import React, { useEffect, useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import clsx from "clsx";

import useUserStore from "../../app/user";
import { useQueryClient } from "react-query";
import ConfirmationDialog from "../Dialogs";
import axios from "../../config/axios";
import { getProjectChatUsers } from "../../utils/users";
import { handleAxiosResponseError } from "../../utils/handleResponseError";
import { AddExpense } from "./AddExpense";
import {
  getFormattedValue,
  getMarketValueTotal,
  getLoanBalanceTotal,
  getMonthlyBudgetTotal,
  getYearlyBudgetTotal,
} from "../../utils/budget.calculation";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const ExpenseListView = ({ Data, category }) => {
  const { user } = useUserStore();
  const [gridData, setGridData] = useState([]);
  useEffect(() => {
    const updatedData = Data.filter((item) => item.Category === category);

    const sortedData = updatedData.sort((a, b) => {
      if (a.Owner === b.Owner) {
        return a.Description.localeCompare(b.Description); // Ascending order for Description
      }
      return a.Owner < b.Owner ? 1 : -1; // Descending order for Owner
    });
    setGridData(sortedData);
  }, [Data]);

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

  console.log(gridData);

  //----------------CRUD----------------//

  const TableHeader = () => (
    <thead>
      <tr className="font-bold bg-black text-white border border-gray-400 text-left text-xs xl:text-sm">
        {/* <th className="border-l border-gray-300 p-2 text-xs xl:text-sm">
          Category
        </th> */}
        <th className="border-l border-gray-300 p-2 text-xs xl:text-sm">
          Name
        </th>
        <th className="border-l border-gray-300 p-2 text-xs xl:text-sm">
          Description
        </th>
        <th className="border-l border-gray-300 p-1">
          <div className="flex flex-col">
            <span className="whitespace-nowrap text-left">Market Value</span>
            <span className="whitespace-nowrap text-left">
              (For Net Worth Calc)
            </span>
          </div>
        </th>
        <th className="border-l border-gray-300 p-1">
          <div className="flex flex-col">
            <span className="whitespace-nowrap text-left">Loan Balance</span>
            <span className="whitespace-nowrap text-left">
              {" "}
              (For Net Worth Calc)
            </span>
          </div>
        </th>
        <th className="border-l border-gray-300 p-2 text-xs xl:text-sm">
          Day Due
        </th>
        <th className="border-l border-gray-300 p-2 text-xs xl:text-sm">
          <div className="flex flex-col">
            <span className="whitespace-nowrap text-left">Payment</span>
            <span className="whitespace-nowrap text-left">Method</span>
          </div>
        </th>
        <th className="border-l border-gray-300 p-1">
          <div className="flex flex-col">
            <span className="whitespace-nowrap text-left">Monthly Expense</span>
          </div>
        </th>
        <th className="border-l border-gray-300 p-1">
          <div className="flex flex-col">
            <span className="whitespace-nowrap text-left">Annual Cost</span>
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
      {/* <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <span className="flex items-center justify-left gap-2 border-b border-gray-200 text-center mb-0 text-gray-900">
            {record?.Category}
          </span>
        </div>
      </td> */}

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <span className="flex items-center justify-left gap-2 border-b border-gray-200 text-center mb-0 text-gray-900">
            {record?.Owner}
          </span>
        </div>
      </td>

      <td className="max-w-[300px] whitespace-normal p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">
            {record?.NickName ? record?.NickName : record?.Description}
          </p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">
            {getFormattedValue(user, record?.MarketValue)}
          </p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">
            {getFormattedValue(user, record?.LoanBalance)}
          </p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black"> N/A</p>
        </div>
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black"> {record?.PaymentMethod}</p>
        </div>
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">
            {getFormattedValue(user, record?.MonthlyBudget)}
          </p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">
            {getFormattedValue(user, 12 * record?.MonthlyBudget)}
          </p>
        </div>
      </td>

      <td className="min-w-max p-2 border-l border-r border-gray-200">
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
    <tr className="border border-gray-300 text-sm xl:text-[18px] bg-[whitesmoke] text-gray-600 text-left font-bold">
      <td className="min-w-fit whitespace-nowrap p-3 border-gray-200"></td>

      <td className="min-w-fit whitespace-nowrap p-3 border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p>{category} Category Total</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p>{getMarketValueTotal(user, gridData)}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p>{getLoanBalanceTotal(user, gridData)}</p>
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
      {gridData.length > 0 && (
        <div className="w-full h-fit bg-white py-6 mt-4 shadow-md rounded">
          <div className="flex flex-col gap-5 w-full">
            <div className="w-full overflow-x-auto">
              <table className="w-[97%] ml-5 -mb-5">
                <thead>
                  <tr>
                    <th className="p-2 w-full uppercase bg-black text-white flex items-center justify-center">
                      {category}
                    </th>
                  </tr>
                </thead>
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
      <AddExpense
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
    </>
  );
};
