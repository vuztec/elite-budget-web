import React, { useEffect, useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import clsx from "clsx";

import useUserStore from "../../app/user";
import { useQueryClient } from "react-query";
import ConfirmationDialog from "../Dialogs";
import axios from "../../config/axios";
import { handleAxiosResponseError } from "../../utils/handleResponseError";
import AddTransaction from "./AddTransaction";
import {
  getFormattedValue,
  getYearlyBudgetTotal,
  getFormattedDate,
  getFormattedValueType,
  getBankAccountTypeTotal,
} from "../../utils/budget.calculation";

export const TransactionListView = ({ Data, bankName }) => {
  const { user } = useUserStore();
  const [gridData, setGridData] = useState([]);
  useEffect(() => {
    const updatedData = Data.filter((item) => item.BankAccountName.id === bankName.id);

    const sortedData = updatedData.sort((a, b) => {
      if (a.Owner === b.Owner) {
        return a.Description.localeCompare(b.Description); // Ascending order for Description
      }
      return a.Owner < b.Owner ? 1 : -1; // Descending order for Owner
    });
    setGridData(sortedData);
  }, [Data, bankName]);

  //----------------CRUD----------------//
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const deleteHandler = async (selected) => {
    setIsLoading(true);

    axios
      .delete(`/api/bank-accounts/transaction/${selected}`)
      .then(({ data }) => {
        console.log(data);
        queryClient.setQueryData(["banktransactions"], (prev) => prev.filter((transaction) => transaction.id !== selected));
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
        {/* <th className="border-l border-gray-300 p-2 text-xs xl:text-sm">
          Bank Name
        </th> */}
        <th className="border-l border-gray-300 p-2 text-xs xl:text-sm">Date</th>
        <th className="border-l border-gray-300 p-2 text-xs xl:text-sm">Description</th>

        <th className="border-l border-gray-300 p-2 text-xs xl:text-sm">
          <div className="flex flex-col">
            <span className="whitespace-nowrap text-left">Pmt, Fee,</span>
            <span className="whitespace-nowrap text-left">Withdrawal (-)</span>
          </div>
        </th>

        <th className="border-l border-gray-300 p-2 text-xs xl:text-sm">
          <div className="flex flex-col">
            <span className="whitespace-nowrap text-left">Deposit,</span>
            <span className="whitespace-nowrap text-left">Credit (+)</span>
          </div>
        </th>

        <th className="border-l border-gray-300 p-2 text-xs xl:text-sm">Is Cleared?</th>

        <th className="border-l border-gray-300 p-2 text-xs xl:text-sm">Balance</th>

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

      {/* <td className="max-w-[300px] whitespace-normal p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{record?.BankAccountName?.Name}</p>
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
          <p className="text-black">{getFormattedValueType(user, record?.Amount, record?.Type, "Withdrawal")}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{getFormattedValueType(user, record?.Amount, record?.Type, "Credit")}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{record?.IsCleared}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{getFormattedValue(user, record?.MonthlyBudget)}</p>
        </div>
      </td>

      <td className="min-w-max p-2 border-l border-r border-gray-200">
        <div className="flex items-center text-left gap-3 justify-start">
          <FaEdit
            className={clsx(`text-editcolor`, "hover:text-orange-500 font-semibold cursor-pointer sm:px-0")}
            onClick={() => editClick(record)}
          />

          <RiDeleteBin2Fill
            className={clsx(`text-deletecolor`, "hover:text-red-500 font-semibold cursor-pointer sm:px-0")}
            onClick={() => deleteClick(record.id)}
          />
        </div>
      </td>
    </tr>
  );

  const TableTotal = ({ gridData }) => (
    <tr className="border border-gray-300 text-sm xl:text-[18px] bg-[whitesmoke] text-gray-600 text-left font-bold">
      <td className="min-w-fit whitespace-nowrap p-3 border-gray-200"></td>

      {/* <td className="min-w-fit whitespace-nowrap p-3 border-gray-200"></td> */}

      <td className="min-w-fit whitespace-nowrap p-3 border-gray-200"></td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">TOTAL</td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p>{getBankAccountTypeTotal(user, gridData, "Withdrawal")}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p>{getBankAccountTypeTotal(user, gridData, "Credit")}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200"></td>

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
      {gridData?.length > -1 && (
        <div className="w-full h-fit bg-white py-6 mt-4 shadow-md rounded">
          <div className="flex flex-col gap-5 w-full">
            <div className="w-full overflow-x-auto">
              <table className="w-[97%] ml-5 -mb-5">
                <thead>
                  <tr>
                    <th className="p-2 w-full uppercase bg-black text-white flex items-center justify-center">{bankName?.Name} REGISTER</th>
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
      <AddTransaction open={open} setOpen={setOpen} recordData={selected} key={new Date().getTime().toString()} />
      <ConfirmationDialog isLoading={isLoading} open={openDialog} setOpen={setOpenDialog} onClick={() => deleteHandler(selected)} />
    </>
  );
};