import React, { useEffect, useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import clsx from "clsx";

import useUserStore from "../../app/user";
import { useQueryClient } from "react-query";
import ConfirmationDialog from "../Dialogs";
import axios from "../../config/axios";
import { handleAxiosResponseError } from "../../utils/handleResponseError";
import { getMonthlyBudgetTotal, getYearlyBudgetTotal } from "../../utils/budget.calculation";
import AddExtraPay from "./AddExtraPay";
import { formatDate } from "../../utils";

export const ExtraPayListView = ({ gridData }) => {
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
      .delete(`/api/extra-pay-checks/${selected}`)
      .then(({ data }) => {
        console.log(data);
        queryClient.setQueryData(["extrapaychecks"], (prev) => prev.filter((check) => check.id !== selected));
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
        <th className="border-l border-gray-300 p-2 text-xs xl:text-sm">Extra Pay Date</th>
        <th className="border-l border-gray-300 p-2 text-xs xl:text-sm">Self</th>
        <th className="border-l border-gray-300 p-2 text-xs xl:text-sm">Partner</th>

        <th className="p-2 border-l border-gray-300 text-xs xl:text-sm">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ record }) => (
    <tr className="border border-gray-300 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <span className="flex items-center justify-left gap-2 text-center mb-0 text-gray-900">
            {record?.Date ? formatDate(new Date(record?.Date)) : "XX/XX/XXXX"}
          </span>
        </div>
      </td>

      <td className="max-w-[300px] whitespace-normal p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{record?.SelfAmount}</p>
        </div>
      </td>

      <td className="max-w-[300px] whitespace-normal p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className="text-black">{record?.PartnerAmount}</p>
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
      <td className="min-w-fit whitespace-nowrap p-3 border-gray-200">Total</td>

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
      <div className="w-full h-fit bg-white py-6 mt-4 shadow-md rounded">
        <div className="flex flex-col gap-5 w-full">
          <div className="overflow-x-auto">
            <table className="w-[97%] ml-5 -mb-5">
              <thead>
                <tr>
                  <th className="p-2 w-full uppercase bg-black text-white flex items-center justify-center">EXTRA PAY CHECKS</th>
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

      <AddExtraPay open={open} setOpen={setOpen} recordData={selected} key={new Date().getTime().toString()} />
      <ConfirmationDialog isLoading={isLoading} open={openDialog} setOpen={setOpenDialog} onClick={() => deleteHandler(selected)} />
    </>
  );
};