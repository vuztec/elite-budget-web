import clsx from "clsx";
import React, { useState } from "react";
import { BGS, dateFormatter, getStatusColor, getCostStageIcon } from "../../utils";
import { format } from "date-fns";
import { BiCommentDetail } from "react-icons/bi";
import UserInfo from "../team/UserInfo";
import { IoMdAttach } from "react-icons/io";
import CostDialog from "./CostDialog";
import useUserStore from "../../app/user";
import { BsPeopleFill } from "react-icons/bs";
import { TbCalendarDollar, TbCalendarTime, TbSubtask } from "react-icons/tb";
import { GrProjects } from "react-icons/gr";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import SubTasksDialog, { AttachmentsDialog, CommentsDialog } from "../DisplayDialogs";
import { getCostChatUsers } from "../../utils/users";
import { getEditCostPermission, getSuperCostPermission } from "../../utils/permissions";

export const CostCard = ({ cost, customDateFormat, usedCurrency, projectData }) => {
  const { user, root } = useUserStore();
  const current_subcription = root?.subscriptions?.[0];

  const [openSubTasks, setOpenSubTasks] = useState(false);
  const [openAttachments, setOpenAttachments] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [selected, setSelected] = useState(null);
  const [hasAdd, setHasAdd] = useState(false);
  const [hasEdit, setHasEdit] = useState(false);
  const [hasDel, setHasDel] = useState(false);
  const [selectedChatUsers, setSelectedChatUsers] = useState(null);

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

  return (
    <>
      <div className="w-full h-fit bg-white shadow-md p-4 rounded">
        <div className="w-full flex justify-between">
          <div className="flex items-center gap-5 mb-5">
            <div
              className={clsx(
                "flex items-center text-left text-xs md:text-sm font-semibold gap-1 px-3 py-1 rounded-full",
                getStatusColor(cost?.Stage)
              )}
            >
              <div>{getCostStageIcon(cost?.Stage)}</div>
              <span className="uppercase">{cost?.Stage}</span>
            </div>
          </div>

          <CostDialog cost={cost} projectData={projectData} />
        </div>

        <div className="flex items-center gap-2 mb-5">
          <div className="flex items-center justify-left gap-2 text-lg md:text-xl text-center line-clamp-1 font-semibold">
            <span>{<LiaMoneyCheckAltSolid />}</span>
            <span>{cost?.Description}</span>
          </div>
        </div>

        <div className="w-full border-t border-gray-200 my-2" />
        <div className="flex items-center justify-between mb-2 px-2">
          <div className="flex gap-1 items-center justify-center text-sm text-gray-600">
            <div className="flex items-center justify-center gap-1">
              <TbCalendarTime className="text-lg" />
              <span className="hidden md:block  lg:hidden 2xl:block">Invoiced On : </span>
            </div>
            <p className="text-black font-bold">{cost?.CostDate ? format(dateFormatter(cost?.CostDate), customDateFormat) : ""}</p>
          </div>

          <span className="text-gray-400 px-2">|</span>

          <div className="flex gap-1 items-center justify-center text-sm text-gray-600">
            <div className="flex items-center justify-center gap-1">
              <TbCalendarDollar className="text-lg" />
              <span className="hidden md:block  lg:hidden 2xl:block">Paid On : </span>
            </div>
            <p className="text-black font-bold">{cost?.PayDate ? format(dateFormatter(cost?.PayDate), customDateFormat) : ""}</p>
          </div>
        </div>
        {(current_subcription?.Package === "Standard" || current_subcription?.Package === "Premium") && (
          <>
            <div className="w-full border-t border-gray-200 my-2" />
            <div className="flex items-center justify-start mb-2 px-2">
              <div className="flex items-center gap-3">
                <div
                  className={clsx(
                    "w-fit flex gap-1 items-center hover:bg-viewcolor hover:text-white px-2 py-0 rounded-full cursor-pointer",
                    "bg-gray-200 text-black"
                  )}
                  onClick={() => viewSubTaskClick(cost)}
                >
                  <TbSubtask />
                  <span className="font-bold">{cost?._count?.subtaskdb}</span>
                </div>
                <span className="text-gray-400 px-2">|</span>
                <div
                  className={clsx(
                    "w-fit flex gap-1 items-center hover:bg-viewcolor hover:text-white px-2 py-0 rounded-full cursor-pointer",
                    "bg-gray-200 text-black"
                  )}
                  onClick={() => viewAttachClick(cost)}
                >
                  <IoMdAttach />
                  <span className="font-bold">{cost?._count?.attachmentdb}</span>
                </div>
                <span className="text-gray-400 px-2">|</span>
                <div
                  className={clsx(
                    "w-fit flex gap-1 items-center hover:bg-viewcolor hover:text-white px-2 py-0 rounded-full cursor-pointer",
                    "bg-gray-200 text-black"
                  )}
                  onClick={() => viewCommentClick(cost)}
                >
                  <BiCommentDetail />
                  <span className="font-bold">{cost?._count?.commentdb}</span>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="w-full border-t border-gray-200 my-2" />
        <div className="flex items-center justify-start mb-2 px-2">
          <div className="flex gap-1 items-center justify-center text-sm text-gray-600">
            <div className="flex items-center justify-center gap-1">
              <BsPeopleFill className="text-sm" />
              <span className="hidden md:block  lg:hidden 2xl:block">Assignee(s) : </span>
            </div>
            <div className="flex flex-row-reverse">
              {cost?.costdb_assignee?.map((m, index) => (
                <div
                  key={index}
                  className={clsx(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs xl:text-sm mr-0",
                    BGS[index % BGS?.length]
                  )}
                >
                  <UserInfo user={m} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full border-t border-gray-200 my-2" />
        <div className="flex items-center justify-between mb-2 px-2">
          <div className="flex gap-1 items-center justify-center text-sm text-gray-600">
            <span className="font-semibold hidden md:block lg:hidden 2xl:block">Service Provider :</span>
            <span className="font-semibold block md:hidden lg:block 2xl:hidden">SP :</span>
            <span className="text-black font-bold">{cost?.ServiceProvider}</span>
          </div>

          <span className="text-gray-400">|</span>

          <div className="flex gap-1 items-center justify-center  text-sm text-gray-600">
            <span className="font-semibold hidden md:block lg:hidden 2xl:block">Cost Amount :</span>
            <span className="font-semibold block md:hidden lg:block 2xl:hidden">Amount :</span>
            <span className="text-black font-bold">
              {usedCurrency +
                Number(cost?.CostAmount).toLocaleString("EN-AU", {
                  maximumFractionDigits: 0,
                })}
            </span>
          </div>
        </div>

        <div className="w-full border-t border-gray-200 my-0" />
        <div className="flex items-center gap-3 p-3">
          <div className="flex gap-1 items-center justify-center text-sm text-gray-600">
            <span className="flex items-center justify-center gap-2 text-lg md:text-xl text-center line-clamp-1 text-black font-semibold">
              <GrProjects className="text-sm" /> {cost?.projectdb?.Description}
            </span>
          </div>
        </div>
      </div>
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
    </>
  );
};

export default CostCard;
