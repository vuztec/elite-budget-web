import React, { useEffect, useState } from "react";
import useUserStore from "../../app/user";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { IoMdAdd } from "react-icons/io";
import Loading from "../../components/Loader";
import { getCurrency, getRootUser } from "../../config/api";
import clsx from "clsx";
import { useQuery, useQueryClient } from "react-query";
import ConfirmationDialog from "../../components/Dialogs";
import { AddCurrency } from "../../components/setting";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";

import { themeColors } from "../../utils";
import { GrCurrency } from "react-icons/gr";
import { getActiveAccount, getAddProjectPermission } from "../../utils/permissions";
import Package from "../../package/Package";

export const UserCurrency = () => {
  const { root, user, updateRoot } = useUserStore();
  const activeAccount = getActiveAccount(root);
  // const setUser = useUserStore((state) => state.setUser);
  const [isDataLoaded, setIsDataLoaded] = useState(true);

  //----------------CRUD----------------//
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const deleteHandler = () => {
    try {
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  const addNewClick = () => {
    setOpen(true);
  };

  //----------------CRUD----------------//

  const TableHeader = () => (
    <thead>
      <tr className="text-gray-600 font-bold bg-[whitesmoke] border border-gray-400 text-left text-sm xl:text-[16px]">
        <th className="border-l border-gray-300 p-2">Currency</th>
        {getAddProjectPermission(user) && <th className="border-l border-gray-300 p-2">Actions</th>}
      </tr>
    </thead>
  );

  const TableRow = ({ currency }) => (
    <tr className="border border-gray-300 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
      <td className="min-w-max p-2 whitespace-nowrap border-l border-gray-200">{currency.Currency}</td>
      {getAddProjectPermission(user) && (
        <td className="min-w-max p-2 border-l border-gray-200">
          <div className="flex items-center text-left gap-4 justify-start">
            <FaEdit
              className={clsx("text-editcolor", "hover:text-orange-500 font-semibold cursor-pointer")}
              onClick={() => editClick(currency)}
            />
            <RiDeleteBin2Fill
              className={clsx("text-deletecolor", "hover:text-red-500 font-semibold cursor-pointer sm:px-0")}
              onClick={() => deleteClick(currency.id)}
            />
          </div>
        </td>
      )}
    </tr>
  );

  return !isDataLoaded ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <>
      {isDataLoaded &&
        (activeAccount ? (
          <>
            <div className="w-full mt-5 mb-5 shadow-md rounded bg-white">
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-2">
                  <GrCurrency className={`text-2xl text-[${themeColors[1]}]`} />
                  <Title title="Currency" />
                </div>

                {getAddProjectPermission(user) && (
                  <Button
                    label="Add New"
                    icon={<IoMdAdd className="text-lg" />}
                    className={clsx(
                      "flex flex-row-reverse gap-1 items-center text-white hover:bg-viewcolor rounded-full px-2 py-1",
                      `bg-[${themeColors[1]}] hover:text-[${themeColors[1]}]`
                    )}
                    onClick={() => addClick()}
                  />
                )}
              </div>

              <div className="w-full h-fit bg-white py-2 rounded">
                <div className="overflow-x-auto">
                  <table className="w-[97%] m-5">
                    <TableHeader />
                    <tbody>
                      {/* {gridData.map((currency, index) => ( */}
                      <TableRow currency={root} />
                      {/* ))} */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Package />
        ))}

      <AddCurrency open={open} setOpen={setOpen} recordData={selected} key={new Date().getTime().toString()} />

      <ConfirmationDialog open={openDialog} setOpen={setOpenDialog} onClick={() => deleteHandler(selected)} />
    </>
  );
};
