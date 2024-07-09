import React, { useEffect, useState } from "react";
import useUserStore from "../../app/user";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { IoMdAdd, IoMdAttach } from "react-icons/io";
import Loading from "../../components/Loader";
import { getInitials, getResourceBirthdayStatus, themeColors } from "../../utils";
import clsx from "clsx";
import ConfirmationDialog from "../../components/Dialogs";
import { AddRegularUser } from "../../components/team";
import { useQuery, useQueryClient } from "react-query";

import { MdEmail, MdPeople } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit, FaEye, FaPhoneSquare } from "react-icons/fa";
import useDateCalculator from "../../config/useDateCalculator";
import { useNavigate } from "react-router-dom";
import { BiCommentDetail } from "react-icons/bi";
import axios from "../../config/axios";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import Package from "../../package/Package";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const Users = () => {
  const dates = useDateCalculator();
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [openAttachments, setOpenAttachments] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [hasAdd, setHasAdd] = useState(false);
  const [hasEdit, setHasEdit] = useState(false);
  const [hasDel, setHasDel] = useState(false);
  const [selectedChatUsers, setSelectedChatUsers] = useState(null);
  const { user: currentUser } = useUserStore();
  const current_subcription = {};

  const activeAccount = true;

  const setUser = useUserStore((state) => state.setUser);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [gridData, setGridData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const deleteHandler = async (selected) => {
    try {
      setIsLoading(true);
      await axios.delete(`${SERVER_URL}/api/attachment/delete-file?type=resource_id&id=${selected}`);
    } catch (error) {
      setIsLoading(false);
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

  const addClick = () => {
    setSelected("");
    setOpen(true);
  };

  const navigate = useNavigate();
  const viewDetailClick = (id) => {
    navigate(`/user/${id}`);
  };

  const viewAttachClick = (el) => {
    setSelected(el);
    const chatUsers = [];
    setSelectedChatUsers(chatUsers);
    setOpenAttachments(true);
  };

  const viewCommentClick = (el) => {
    setSelected(el);
    const chatUsers = [];
    setSelectedChatUsers(chatUsers);
    setOpenComments(true);
  };

  const TableHeader = () => (
    <thead>
      <tr className="text-gray-600 font-bold bg-[whitesmoke] border border-gray-400 text-left text-sm xl:text-[16px]">
        <th className="p-2">Full Name</th>
        {/* <th className='py-2'>Qualifications</th>
        <th className='py-2'>Skills</th> */}
        <th className="border-l border-gray-300 p-2">Contacts</th>
        <th className="border-l border-gray-300 p-2">Status</th>
        <th className="border-l border-gray-300 p-2">Birthday</th>
        <th className="border-l border-gray-300 p-2">Company</th>
        <th className="border-l border-gray-300 p-2">Manager</th>
        <th className="border-l border-gray-300 p-2">Manager Contacts</th>
        {(current_subcription?.Package === "Standard" || current_subcription?.Package === "Premium") && (
          <th className="border-l border-gray-300 p-2">Assets</th>
        )}
        <th className="border-l border-gray-300 p-2">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className="border border-gray-300 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex items-center gap-3">
          <div className={clsx("w-9 h-9 rounded-full text-white flex items-center justify-center text-sm", `bg-[${themeColors[0]}]`)}>
            <span className="text-xs md:text-sm text-center">{getInitials(user?.FullName)}</span>
          </div>
          <div className="flex flex-col items-start gap-0">
            <span>{user?.FullName}</span>
            <span className="text-xs italic">{user?.Designation}</span>
          </div>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-0">
          <div className="flex gap-3 items-center text-left">
            <FaPhoneSquare className={`text-[${themeColors[1]}]`} />
            <p className="text-black"> {user.Telephone}</p>
          </div>
          <div className="flex gap-3 items-center text-left">
            <MdEmail />
            <span className="text-black">{user?.Email}</span>
          </div>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <p className={clsx("w-fit px-4 py-1 rounded-full", user?.Status === "Active" ? "bg-green-200" : "bg-yellow-100")}>{user?.Status}</p>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">{getResourceBirthdayStatus(user.DateOfBirth, dates)}</td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">{user.Company}</td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex items-center gap-3">
          <div className={clsx("w-9 h-9 rounded-full text-white flex items-center justify-center text-sm", `bg-[${themeColors[0]}]`)}>
            <span className="text-xs md:text-sm text-center">{getInitials(user?.Manager)}</span>
          </div>
          <div className="flex flex-col items-start gap-0">
            <span>{user?.Manager}</span>
            <span className="text-xs italic">{user?.Department}</span>
          </div>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-0">
          <div className="flex gap-3 items-center text-left">
            <FaPhoneSquare className={`text-[${themeColors[1]}]`} />
            <p className="text-black"> {user.ManagerTel}</p>
          </div>
          <div className="flex gap-3 items-center text-left">
            <MdEmail />
            <span className="text-black">{user?.ManagerEmail}</span>
          </div>
        </div>
      </td>
      {(current_subcription?.Package === "Standard" || current_subcription?.Package === "Premium") && (
        <td className="min-w-max px-2 whitespace-nowrap border-l border-gray-200">
          <div className="flex gap-1 items-center text-left">
            <div
              className={clsx(
                "w-fit flex gap-1 items-center hover:bg-viewcolor hover:text-white px-2 py-0 rounded-full cursor-pointer",
                "bg-gray-200 text-black"
              )}
              onClick={() => viewAttachClick(user)}
            >
              <IoMdAttach />
              <span className="font-bold">{user?._count?.attachmentdb}</span>
            </div>
            <div
              className={clsx(
                "w-fit flex gap-1 items-center hover:bg-viewcolor hover:text-white px-2 py-0 rounded-full cursor-pointer",
                "bg-gray-200 text-black"
              )}
              onClick={() => viewCommentClick(user)}
            >
              <BiCommentDetail />
              <span className="font-bold">{user?._count?.commentdb}</span>
            </div>
          </div>
        </td>
      )}
      <td className="min-w-max px-2 border-l border-gray-200">
        <div className="flex items-center text-left gap-3 justify-start">
          {(current_subcription?.Package === "Standard" || current_subcription?.Package === "Premium") && (
            <AiTwotoneFolderOpen
              className={clsx("hover:text-green-500 font-semibold cursor-pointer sm:px-0", "text-viewcolor")}
              onClick={() => viewDetailClick(user.id)}
            />
          )}
          <FaEdit
            className={clsx("text-editcolor", "hover:text-orange-500 font-semibold cursor-pointer sm:px-0")}
            onClick={() => editClick(user)}
          />

          <RiDeleteBin2Fill
            className={clsx("text-deletecolor", "hover:text-red-500 font-semibold cursor-pointer sm:px-0")}
            onClick={() => deleteClick(user.id)}
          />
        </div>
      </td>
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
                  <MdPeople className={`text-2xl text-[${themeColors[1]}]`} />
                  <Title title="Team Members" />
                </div>

                <Button
                  label="Add New"
                  icon={<IoMdAdd className="text-lg" />}
                  className={clsx(
                    "flex flex-row-reverse gap-1 items-center text-white hover:bg-viewcolor rounded-full px-2 py-1",
                    `bg-[${themeColors[1]}] hover:text-[${themeColors[1]}]`
                  )}
                  onClick={() => addClick()}
                />
              </div>

              <div className="w-full h-fit bg-white py-2 rounded">
                <div className="overflow-x-auto">
                  <table className="w-[97%] m-5">
                    <TableHeader />
                    <tbody>
                      {gridData.map((user, index) => (
                        <TableRow key={index} user={user} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Package />
        ))}

      <AddRegularUser
        // setResourceData={setResourceData}
        setUser={setUser}
        open={open}
        setOpen={setOpen}
        recordData={selected}
        key={new Date().getTime().toString()}
      />

      <ConfirmationDialog open={openDialog} setOpen={setOpenDialog} isLoading={isLoading} onClick={() => deleteHandler(selected)} />
    </>
  );
};
