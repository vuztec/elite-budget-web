import React, { useEffect, useState } from "react";
import { FaCalendarCheck, FaCalendarTimes, FaEdit } from "react-icons/fa";
import clsx from "clsx";
import { BGS, getCostStageIcon, getStatusColor } from "../../utils";
import useUserStore from "../../app/user";
import { format } from "date-fns";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { GrProjects } from "react-icons/gr";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { UserInfo } from "../../components/team";
import { useQueryClient } from "react-query";
import { AddCost } from "../../components/cost";
import ConfirmationDialog from "../../components/Dialogs";
import socket from "../../utils/socket";
import { useNavigate } from "react-router-dom";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { TbCalendarDollar, TbCalendarTime, TbSubtask } from "react-icons/tb";
import { IoMdAttach } from "react-icons/io";
import { BiCommentDetail } from "react-icons/bi";
import SubTasksDialog, { AttachmentsDialog, CommentsDialog } from "../DisplayDialogs";
import axios from "../../config/axios";
import { getCostChatUsers } from "../../utils/users";
import { getSuperCostPermission, getEditCostPermission } from "../../utils/permissions";
import { handleAxiosResponseError } from "../../utils/handleResponseError";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const CostListView = ({ gridData, customDateFormat, usedCurrency, projectData }) => {
  const { user, root } = useUserStore();
  const current_subcription = root.subscriptions?.[0];

  //----------------CRUD----------------//
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [openSubTasks, setOpenSubTasks] = useState(false);
  const [openAttachments, setOpenAttachments] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [hasAdd, setHasAdd] = useState(false);
  const [hasEdit, setHasEdit] = useState(false);
  const [hasDel, setHasDel] = useState(false);
  const [selectedChatUsers, setSelectedChatUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const deleteHandler = async (selected) => {
    setIsLoading(true);
    await axios.delete(`${SERVER_URL}/api/attachment/delete-file?type=cost_id&id=${selected}`);
    axios
      .delete(`${SERVER_URL}/api/cost/${selected}`)
      .then(({ data }) => {
        console.log(data);
        queryClient.setQueryData(["costs"], (prev) => prev.filter((change) => change.id !== selected));
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
    const chatUsers = getCostChatUsers(projectData, el, el.ProjectID, user);
    setSelectedChatUsers(chatUsers);
  };

  const navigate = useNavigate();
  const viewDetailClick = (id) => {
    navigate(`/cost/${id}`);
  };

  const viewSubTaskClick = (el) => {
    setSelected(el);
    const chatUsers = getCostChatUsers(projectData, el, el.ProjectID, user);
    setSelectedChatUsers(chatUsers);
    const add = getSuperCostPermission(user, el, projectData);
    const edit = getEditCostPermission(user, el, projectData);
    setHasAdd(() => add);
    setHasEdit(() => edit);
    setHasDel(() => add);
    setOpenSubTasks(true);
  };

  const viewAttachClick = (el) => {
    setSelected(el);
    const chatUsers = getCostChatUsers(projectData, el, el.ProjectID, user);
    setSelectedChatUsers(chatUsers);
    const add = getSuperCostPermission(user, el, projectData);
    const edit = getEditCostPermission(user, el, projectData);
    setHasAdd(() => add);
    setHasEdit(() => edit);
    setHasDel(() => add);
    setOpenAttachments(true);
  };

  const viewCommentClick = (el) => {
    setSelected(el);
    const chatUsers = getCostChatUsers(projectData, el, el.ProjectID, user);
    setSelectedChatUsers(chatUsers);
    const add = getSuperCostPermission(user, el, projectData);
    const edit = getEditCostPermission(user, el, projectData);
    setHasAdd(() => add);
    setHasEdit(() => edit);
    setHasDel(() => add);
    setOpenComments(true);
  };
  //----------------CRUD----------------//

  const TableHeader = () => (
    <thead className="border-b border-gray-400 ">
      <tr className="text-gray-600 font-bold bg-[whitesmoke] border border-gray-400 text-left text-sm xl:text-[16px]">
        <th className="p-2">Cost Description</th>
        <th className="border-l border-gray-300 p-2">Assigned To</th>
        <th className="border-l border-gray-300 p-2">Service Provider</th>
        <th className="border-l border-gray-300 p-2">Category</th>
        <th className="border-l border-gray-300 p-2">Amount</th>
        <th className="border-l border-gray-300 p-2">Invoice Date</th>
        <th className="border-l border-gray-300 p-2">Status</th>
        <th className="border-l border-gray-300 p-2">Paid On</th>
        {(current_subcription?.Package === "Standard" || current_subcription?.Package === "Premium") && (
          <th className="border-l border-gray-300p p-2">Assets</th>
        )}
        <th className="border-l border-gray-300 p-2">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ Cost }) => (
    <tr className="border border-gray-300 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
      <td className="min-w-[200px] max-w-[350px] px-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <span className="flex items-center justify-left gap-2 border-b border-gray-200  text-center mb-0 font-bold text-gray-900">
            <GrProjects className="text-sm" /> {Cost.projectdb.Description}
          </span>
          <span className="flex items-center justify-left gap-2  text-center">
            <LiaMoneyCheckAltSolid /> {Cost.Description}
          </span>
        </div>
      </td>

      <td className="min-w-max px-2 border-l border-gray-200">
        <div className="flex">
          {Cost?.costdb_assignee?.map((m, index) => (
            <div
              key={index}
              className={clsx("w-7 h-7 rounded-full flex items-center justify-center text-xs xl:text-sm mr-0", BGS[index % BGS?.length])}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>

      <td className="min-w-[200px] max-w-[250px] px-2 border-l border-gray-200">
        <div className="w-fit px-3 py-1 rounded-md text-black">
          <span className="text-left  gap-1">{Cost.ServiceProvider}</span>
        </div>
      </td>

      <td className="min-w-max px-2 border-l border-gray-200">
        <span className="text-left  whitespace-nowrap">{Cost.Category}</span>
      </td>

      <td className="min-w-max px-2 border-l border-gray-200">
        <span className="text-left whitespace-nowrap">
          {usedCurrency +
            Number(Cost?.CostAmount).toLocaleString("EN-AU", {
              maximumFractionDigits: 0,
            })}
        </span>
      </td>

      <td className="min-w-max px-2 border-l border-gray-200">
        <div className="flex gap-3 items-center text-left">
          <TbCalendarTime className=" text-startcolor hidden lg:block" />
          <p className="whitespace-nowrap">{Cost?.CostDate ? format(new Date(Cost.CostDate), customDateFormat) : ""}</p>
        </div>
      </td>

      <td className="min-w-max px-2 border-l border-gray-200">
        <div className={clsx("w-full flex items-center text-left gap-1 px-2 py-1 rounded-full", getStatusColor(Cost?.Stage))}>
          <span className="hidden lg:block">{getCostStageIcon(Cost?.Stage)}</span>
          <span className="whitespace-nowrap">{Cost?.Stage}</span>
        </div>
      </td>

      <td className="min-w-max px-2 border-l border-gray-200">
        <div className="flex gap-3 items-center text-left">
          <TbCalendarDollar className="text-endcolor hidden lg:block" />
          <span className="whitespace-nowrap">{Cost?.PayDate ? format(new Date(Cost.PayDate), customDateFormat) : ""}</span>
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
              onClick={() => viewSubTaskClick(Cost)}
            >
              <TbSubtask />
              <span className="font-bold">{Cost?._count?.subtaskdb}</span>
            </div>
            <div
              className={clsx(
                "w-fit flex gap-1 items-center hover:bg-viewcolor hover:text-white px-2 py-0 rounded-full cursor-pointer",
                "bg-gray-200 text-black"
              )}
              onClick={() => viewAttachClick(Cost)}
            >
              <IoMdAttach />
              <span className="font-bold">{Cost?._count?.attachmentdb}</span>
            </div>
            <div
              className={clsx(
                "w-fit flex gap-1 items-center hover:bg-viewcolor hover:text-white px-2 py-0 rounded-full cursor-pointer",
                "bg-gray-200 text-black"
              )}
              onClick={() => viewCommentClick(Cost)}
            >
              <BiCommentDetail />
              <span className="font-bold">{Cost?._count?.commentdb}</span>
            </div>
          </div>
        </td>
      )}
      <td className="min-w-max px-2 border-l border-gray-200">
        <div className="flex items-center text-left gap-3 justify-start">
          {(current_subcription?.Package === "Standard" || current_subcription?.Package === "Premium") && (
            <AiTwotoneFolderOpen
              className={clsx("hover:text-green-500 font-semibold cursor-pointer sm:px-0", `text-viewcolor`)}
              onClick={() => viewDetailClick(Cost.id)}
            />
          )}
          {getEditCostPermission(user, Cost, projectData) && (
            <FaEdit
              className={clsx(`text-editcolor`, "hover:text-orange-500 font-semibold cursor-pointer sm:px-0")}
              onClick={() => editClick(Cost)}
            />
          )}
          {getSuperCostPermission(user, Cost, projectData) && (
            <RiDeleteBin2Fill
              className={clsx(`text-deletecolor`, "hover:text-red-500 font-semibold cursor-pointer sm:px-0")}
              onClick={() => deleteClick(Cost.id)}
            />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="w-full h-fit bg-white py-2 shadow-md rounded">
      <div className="overflow-x-auto">
        <table className="w-[97%] m-5">
          <TableHeader />
          <tbody>
            {gridData?.map((Cost, index) => (
              <TableRow key={index} Cost={Cost} />
            ))}
          </tbody>
        </table>
      </div>
      <AddCost
        socket={socket}
        open={open}
        setOpen={setOpen}
        recordData={selected}
        key={new Date().getTime().toString()}
        chatUsers={selectedChatUsers}
      />
      <ConfirmationDialog open={openDialog} setOpen={setOpenDialog} isLoading={isLoading} onClick={() => deleteHandler(selected)} />
      <SubTasksDialog
        open={openSubTasks}
        setOpen={setOpenSubTasks}
        recordData={selected}
        type={"cost_id"}
        query={"costs"}
        hasAdd={hasAdd}
        hasEdit={hasEdit}
        hasDel={hasDel}
        chatUsers={selectedChatUsers}
      />
      <AttachmentsDialog
        open={openAttachments}
        setOpen={setOpenAttachments}
        recordData={selected}
        type={"cost_id"}
        query={"costs"}
        hasAdd={hasAdd}
        hasEdit={hasEdit}
        hasDel={hasDel}
        chatUsers={selectedChatUsers}
      />
      <CommentsDialog
        open={openComments}
        setOpen={setOpenComments}
        recordData={selected}
        type={"cost_id"}
        query={"costs"}
        hasAdd={hasAdd}
        hasEdit={hasEdit}
        hasDel={hasDel}
        chatUsers={selectedChatUsers}
      />
    </div>
  );
};
