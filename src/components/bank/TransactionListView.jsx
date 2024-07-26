import React, { useEffect, useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaCheckSquare, FaEdit } from "react-icons/fa";
import clsx from "clsx";

import useUserStore from "../../app/user";
import { useQueryClient } from "react-query";
import ConfirmationDialog from "../Dialogs";
import axios from "../../config/axios";
import { handleAxiosResponseError } from "../../utils/handleResponseError";
import AddTransaction from "./AddTransaction";
import {
  getFormattedDate,
  getFormattedValueType,
  getBankAccountTypeTotal,
  getUnformattedBankBalanceTotal,
  getFormattedValueTotal,
} from "../../utils/budget.calculation";
import ToolTip from "../tooltip";
import Sort from "../sort";
import { defaultTransactionSort } from "../../utils/budget.sort";
import { FiCheckSquare } from "react-icons/fi";
import { MdOutlineSquare } from "react-icons/md";
import { calculateBalances } from "../../utils/budget.filter";

export const TransactionListView = ({ Data, bankName }) => {
  const { user } = useUserStore();
  const [gridData, setGridData] = useState([]);
  const totalBankBalance = getUnformattedBankBalanceTotal(gridData);
  const openingBalance = 0;

  const [order, setOrder] = useState([
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
  ]);

  useEffect(() => {
    const sortedData = defaultTransactionSort(Data);
    const dataWithBalances = calculateBalances(sortedData, openingBalance);
    setGridData(dataWithBalances);
  }, [Data, bankName, openingBalance]);

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
        queryClient.setQueryData(["banktransactions"], (prev) =>
          prev.filter((transaction) => transaction.id !== selected)
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
      <tr className="font-bold bg-[whitesmoke] text-black border border-gray-300 text-left text-sm xl:text-[16px]">
        <th className="border-l border-gray-300 p-2">
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
        </th>
        {/* <th className="border-l border-gray-300 p-2 text-xs xl:text-sm">
          Bank Name
        </th> */}
        <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            Date
            <Sort
              tab={"transaction"}
              order={order}
              setOrder={setOrder}
              column={2}
              name={"Date"}
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
              tab={"transaction"}
              order={order}
              setOrder={setOrder}
              column={3}
              name={"Description"}
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
              <span className="whitespace-nowrap text-left">
                Withdrawal (-)
              </span>
            </div>

            <Sort
              tab={"transaction"}
              order={order}
              setOrder={setOrder}
              column={4}
              name={"Amount"}
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
              tab={"transaction"}
              order={order}
              setOrder={setOrder}
              column={5}
              name={"Amount"}
              data={gridData}
              setData={setGridData}
              defaultData={Data}
              isNumber
            />
          </div>
        </th>

        <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            Is Cleared?
            <Sort
              tab={"transaction"}
              order={order}
              setOrder={setOrder}
              column={6}
              name={"IsCleared"}
              data={gridData}
              setData={setGridData}
              defaultData={Data}
            />
          </div>
        </th>

        <th className="border-l border-gray-300 p-2">
          <div className="flex justify-between items-center gap-2">
            Balance
            <Sort
              tab={"transaction"}
              order={order}
              setOrder={setOrder}
              column={7}
              name={"MonthlyBudget"}
              data={gridData}
              setData={setGridData}
              defaultData={Data}
              isNumber
            />
          </div>
        </th>

        <th className="p-2 border-l border-gray-300">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ record }) => (
    <tr className="border border-gray-300 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <span className="flex items-center justify-left gap-2 text-center mb-0 text-gray-900">
            {record?.Owner}
          </span>
        </div>
      </td>

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
          <p className="text-black">
            {getFormattedValueType(
              user,
              record?.Amount,
              record?.Type,
              "Withdrawal"
            )}
          </p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">
            {getFormattedValueType(
              user,
              record?.Amount,
              record?.Type,
              "Credit"
            )}
          </p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-sm xl:text-lg">
            {record?.IsCleared ? (
              <FiCheckSquare className="text-green-500" />
            ) : (
              <MdOutlineSquare className="text-red-500" />
            )}
          </p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">
            {getFormattedValueTotal(user, record?.Balance)}
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
            <ToolTip text={"Edit"} />
          </div>

          <div className="group flex relative">
            <RiDeleteBin2Fill
              className={clsx(
                `text-deletecolor`,
                "hover:text-red-500 font-semibold cursor-pointer sm:px-0"
              )}
              onClick={() => deleteClick(record.id)}
            />
            <ToolTip text={"Delete"} />
          </div>
        </div>
      </td>
    </tr>
  );

  const TableTotal = ({ gridData }) => (
    <tr className="border border-gray-300 text-sm xl:text-[18px] bg-[whitesmoke] text-gray-600 text-left font-bold">
      <td className="min-w-fit whitespace-nowrap p-3 border-gray-200"></td>

      <td className="min-w-fit whitespace-nowrap p-3 border-gray-200"></td>

      <td className="min-w-fit whitespace-nowrap p-3 border-l border-gray-200">
        TOTAL
      </td>

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
          <p>{getFormattedValueTotal(user, totalBankBalance)}</p>
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
                    <th className="p-2 w-full uppercase bg-[whitesmoke] text-black  border-l border-t border-r border-gray-300 flex items-center justify-center">
                      {bankName?.Name} REGISTER
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
      <AddTransaction
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
    </>
  );
};
