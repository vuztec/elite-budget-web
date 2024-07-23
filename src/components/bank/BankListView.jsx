import React, { useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import clsx from "clsx";

import useUserStore from "../../app/user";
import { useQueryClient } from "react-query";
import ConfirmationDialog from "../Dialogs";
import axios from "../../config/axios";
import { handleAxiosResponseError } from "../../utils/handleResponseError";
import { getFormattedValue } from "../../utils/budget.calculation";
import AddBank from "./AddBank";
import ToolTip from "../tooltip";

export const BankListView = ({ gridData }) => {
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
      .delete(`/api/bank-accounts/name/${selected}`)
      .then(({ data }) => {
        console.log(data);
        queryClient.setQueryData(["accountnames"], (prev) => prev.filter((bank) => bank.id !== selected));
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
        <th className="border-l border-gray-300 p-2 text-xs xl:text-sm">Bank Account Name</th>
        <th className="border-l border-gray-300 p-2 text-xs xl:text-sm">Opening Balance</th>

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

      <td className="max-w-[300px] whitespace-normal p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{record?.Name}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{getFormattedValue(user, record?.OpeningBalance)}</p>
        </div>
      </td>

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

  return (
    <>
      {gridData?.length > -1 && (
        <div className="w-full h-fit bg-white py-6 mt-4 shadow-md rounded">
          <div className="flex flex-col gap-5 w-full">
            <div className="w-full overflow-x-auto">
              <table className="w-[97%] ml-5 -mb-5">
                <thead>
                  <tr>
                    <th className="p-2 w-full uppercase bg-black text-white flex items-center justify-center">LIST OF BANK ACCOUNTS</th>
                  </tr>
                </thead>
              </table>
              <table className="w-[97%] m-5">
                <TableHeader />
                <tbody>
                  {gridData?.map((record, index) => (
                    <TableRow key={index} record={record} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <AddBank open={open} setOpen={setOpen} recordData={selected} key={new Date().getTime().toString()} />
      <ConfirmationDialog isLoading={isLoading} open={openDialog} setOpen={setOpenDialog} onClick={() => deleteHandler(selected)} />
    </>
  );
};
