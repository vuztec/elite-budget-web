import clsx from "clsx";
import React, { useState } from "react";
import {
  BGS,
  dateFormatter,
  getStatusColor,
  getActualProjectPercentageComplete,
  getPlanProjectPercentageComplete,
  getProjectCost,
  getStageIcon,
} from "../../utils";
import { format } from "date-fns";
import { BiCommentDetail } from "react-icons/bi";
import UserInfo from "../team/UserInfo";
import { IoMdAttach } from "react-icons/io";
import ProjectDialog from "./ProjectDialog";
import { BsPeopleFill } from "react-icons/bs";
import { TbCalendarDollar, TbCalendarTime } from "react-icons/tb";
import { AttachmentsDialog, CommentsDialog } from "../DisplayDialogs";
import { FaPeopleGroup } from "react-icons/fa6";
import { getProjectChatUsers } from "../../utils/users";
import useUserStore from "../../app/user";
import { getEditProjectPermission, getFinancialPermission, getSuperProjectPermission } from "../../utils/permissions";

export const ProjectCard = ({ project, costData, taskData, customDateFormat, usedCurrency }) => {
  const { user, root } = useUserStore();
  const current_subcription = root.subscriptions?.[0];

  const hasFin = getFinancialPermission(user);
  const actual = getActualProjectPercentageComplete(taskData, parseInt(project?.id))
    ? getActualProjectPercentageComplete(taskData, project.id)
    : 0;
  const plan = getPlanProjectPercentageComplete(taskData, parseInt(project?.id))
    ? getPlanProjectPercentageComplete(taskData, parseInt(project?.id))
    : 0;

  const usedBudget = getProjectCost(costData, parseInt(project?.id)) ? getProjectCost(costData, parseInt(project?.id)) : 0;

  const [openAttachments, setOpenAttachments] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [selected, setSelected] = useState(null);
  const [hasAdd, setHasAdd] = useState(false);
  const [hasEdit, setHasEdit] = useState(false);
  const [hasDel, setHasDel] = useState(false);
  const [selectedChatUsers, setSelectedChatUsers] = useState(null);

  const viewAttachClick = (el) => {
    setSelected(el);
    const chatUsers = getProjectChatUsers(el, taskData, costData, el.id, user);
    setSelectedChatUsers(() => chatUsers);
    const add = getSuperProjectPermission(user);
    const edit = getEditProjectPermission(user, el);
    setHasAdd(() => add);
    setHasEdit(() => edit);
    setHasDel(() => add);
    setOpenAttachments(true);
  };

  const viewCommentClick = (el) => {
    setSelected(el);
    const chatUsers = getProjectChatUsers(el, taskData, costData, el.id, user);
    setSelectedChatUsers(chatUsers);
    const add = getSuperProjectPermission(user);
    const edit = getEditProjectPermission(user, el);
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
                getStatusColor(project?.ProjectStage)
              )}
            >
              <div>{getStageIcon(project?.ProjectStage)}</div>
              <span className="uppercase">{project?.ProjectStage}</span>
            </div>
          </div>

          <ProjectDialog project={project} />
        </div>

        <div className="flex items-center gap-2 mb-5">
          <div className="flex items-center justify-left gap-2 text-lg md:text-xl text-center line-clamp-1 font-semibold">
            <span className="text-lg md:text-xl">{project?.Description}</span>
          </div>
        </div>

        <div className="w-full border-t border-gray-200 my-2" />
        <div className="flex items-center justify-between mb-2 px-2">
          <div className="flex gap-1 items-center justify-center text-sm text-gray-600">
            <div className="flex items-center justify-center gap-1">
              <TbCalendarTime className="text-lg" />
              <span className="hidden md:block  lg:hidden 2xl:block">Start Date : </span>
            </div>
            <p className="text-black font-bold">{project?.StartDate ? format(dateFormatter(project?.StartDate), customDateFormat) : ""}</p>
          </div>

          <span className="text-gray-400 px-2">|</span>

          <div className="flex gap-1 items-center justify-center text-sm text-gray-600">
            <div className="flex items-center justify-center gap-1">
              <TbCalendarDollar className="text-lg" />
              <span className="hidden md:block  lg:hidden 2xl:block">Due Date : </span>
            </div>
            <p className="text-black font-bold">{project?.EndDate ? format(dateFormatter(project?.EndDate), customDateFormat) : ""}</p>
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
                  onClick={() => viewAttachClick(project)}
                >
                  <IoMdAttach />
                  <span className="font-bold">{project?._count?.attachmentdb}</span>
                </div>
                <span className="text-gray-400 px-2">|</span>
                <div
                  className={clsx(
                    "w-fit flex gap-1 items-center hover:bg-viewcolor hover:text-white px-2 py-0 rounded-full cursor-pointer",
                    "bg-gray-200 text-black"
                  )}
                  onClick={() => viewCommentClick(project)}
                >
                  <BiCommentDetail />
                  <span className="font-bold">{project?._count?.commentdb}</span>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="w-full border-t border-gray-200 my-2" />
        <div className="flex items-center justify-between mb-2 px-2">
          <div className="flex gap-1 items-center justify-center text-sm text-gray-600">
            <div className="flex items-center justify-center gap-1">
              <BsPeopleFill className="text-sm" />
              <span className="hidden md:block  lg:hidden 2xl:block">Manager(s) : </span>
            </div>
            <div className="flex flex-row-reverse">
              {project?.projectdb_manager?.map((m, index) => (
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
          <span className="text-gray-400 px-2">|</span>
          <div className="flex gap-1 items-center justify-center text-sm text-gray-600">
            <div className="flex items-center justify-center gap-1">
              <FaPeopleGroup className="text-sm" />
              <span className="hidden md:block  lg:hidden 2xl:block">Admin(s) : </span>
            </div>
            <div className="flex flex-row-reverse">
              {project?.projectdb_admin?.map((m, index) => (
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
            <span className="font-semibold hidden md:block lg:hidden 2xl:block">Actual % Complete :</span>
            <span className="font-semibold block md:hidden lg:block 2xl:hidden">Actual % :</span>
            <span className="text-black font-bold">{actual}%</span>
          </div>

          <span className="text-gray-400">|</span>

          <div className="flex gap-1 items-center justify-center  text-sm text-gray-600">
            <span className="font-semibold hidden md:block lg:hidden 2xl:block">Plan % Complete :</span>
            <span className="font-semibold block md:hidden lg:block 2xl:hidden">Plan % :</span>
            <span className="text-black font-bold">{plan}%</span>
          </div>
        </div>

        {hasFin && (
          <>
            <div className="w-full border-t border-gray-200 my-2" />
            <div className="flex items-center justify-between mb-2 px-2">
              <div className="flex gap-1 items-center justify-center  text-sm text-gray-600">
                <span className="font-semibold hidden md:block lg:hidden 2xl:block">Total Budget :</span>
                <span className="font-semibold block md:hidden lg:block 2xl:hidden">TB :</span>
                <span className="text-black font-bold">
                  {usedCurrency +
                    Number(project?.Budget).toLocaleString("EN-AU", {
                      maximumFractionDigits: 0,
                    })}
                </span>
              </div>

              <span className="text-gray-400">|</span>

              <div className="flex gap-1 items-center justify-center  text-sm text-gray-600">
                <span className="font-semibold hidden md:block lg:hidden 2xl:block">Used Budget :</span>
                <span className="font-semibold block md:hidden lg:block 2xl:hidden">UB :</span>
                <span className="text-black font-bold">
                  {usedCurrency +
                    Number(usedBudget).toLocaleString("EN-AU", {
                      maximumFractionDigits: 0,
                    })}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      <AttachmentsDialog
        open={openAttachments}
        setOpen={setOpenAttachments}
        recordData={selected}
        type={"project_id"}
        query={"projects"}
        hasAdd={hasAdd}
        hasEdit={hasEdit}
        hasDel={hasDel}
        chatUsers={selectedChatUsers}
      />
      <CommentsDialog
        open={openComments}
        setOpen={setOpenComments}
        recordData={selected}
        type={"project_id"}
        query={"projects"}
        hasAdd={hasAdd}
        hasEdit={hasEdit}
        hasDel={hasDel}
        chatUsers={selectedChatUsers}
      />
    </>
  );
};

export default ProjectCard;
