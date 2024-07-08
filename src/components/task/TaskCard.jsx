import clsx from "clsx";
import React, { useState } from "react";
import {
  BGS,
  PriorityIcon,
  dateFormatter,
  getPriorityRatingColor,
  getStatusColor,
  getTaskEndDate,
  getTaskPlanPercentage,
  getTaskStageIcon,
} from "../../utils";

import { BiCommentDetail } from "react-icons/bi";
import { FaRegCalendarCheck, FaRegCalendarTimes } from "react-icons/fa";
import UserInfo from "../team/UserInfo";
import { IoMdAttach } from "react-icons/io";
import TaskDialog from "./TaskDialog";
import useUserStore from "../../app/user";
import { BsPeopleFill } from "react-icons/bs";
import { TbSubtask } from "react-icons/tb";
import { format } from "date-fns";
import { GrProjects } from "react-icons/gr";
import { MdOutlineTask } from "react-icons/md";
import SubTasksDialog, { AttachmentsDialog, CommentsDialog } from "../DisplayDialogs";
import { getTaskChatUsers } from "../../utils/users";
import { getEditTaskPermission, getSuperTaskPermission } from "../../utils/permissions";

export const TaskCard = ({ task, customDateFormat, projectData }) => {
  const { user, root } = useUserStore();
  const current_subcription = root?.subscriptions?.[0];

  const actual = task?.ActualComplete ? task.ActualComplete : 0;
  const plan = getTaskPlanPercentage(task?.StartDate, task?.TaskDuration);
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
    const chatUsers = getTaskChatUsers(projectData, el, el.ProjectID, user);
    setSelectedChatUsers(chatUsers);
    const add = getSuperTaskPermission(user, el, projectData);
    const edit = getEditTaskPermission(user, el, projectData);
    setHasAdd(() => add);
    setHasEdit(() => edit);
    setHasDel(() => add);
    setOpenSubTasks(true);
  };

  const viewAttachClick = (el) => {
    setSelected(el);
    const chatUsers = getTaskChatUsers(projectData, el, el.ProjectID, user);
    setSelectedChatUsers(chatUsers);
    const add = getSuperTaskPermission(user, el, projectData);
    const edit = getEditTaskPermission(user, el, projectData);
    setHasAdd(() => add);
    setHasEdit(() => edit);
    setHasDel(() => add);
    setOpenAttachments(true);
  };

  const viewCommentClick = (el) => {
    setSelected(el);
    const chatUsers = getTaskChatUsers(projectData, el, el.ProjectID, user);
    setSelectedChatUsers(chatUsers);
    const add = getSuperTaskPermission(user, el, projectData);
    const edit = getEditTaskPermission(user, el, projectData);
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
                "flex gap-1 items-center text-xs md:text-sm font-semibold px-3 py-1 rounded-full",
                getPriorityRatingColor(task?.Priority)
              )}
            >
              <span>{PriorityIcon[task?.Priority]}</span>
              <span className="uppercase">{task?.Priority}</span>
            </div>

            <div
              className={clsx(
                "flex items-center text-left text-xs md:text-sm font-semibold gap-1 px-3 py-1 rounded-full",
                getStatusColor(task?.Stage)
              )}
            >
              <div>{getTaskStageIcon(task?.Stage)}</div>
              <span className="uppercase">{task?.Stage}</span>
            </div>
          </div>

          <TaskDialog task={task} projectData={projectData} />
        </div>

        <div className="flex items-center gap-2 mb-5">
          <div className="flex items-center justify-left gap-2 text-lg md:text-xl text-center line-clamp-1 font-semibold">
            <span>{<MdOutlineTask />}</span>
            <span>{task?.Description}</span>
          </div>
        </div>

        <div className="w-full border-t border-gray-200 my-2" />
        <div className="flex items-center justify-between mb-2 px-2">
          <div className="flex gap-1 items-center justify-center text-sm text-gray-600">
            <div className="flex items-center justify-center gap-1">
              <FaRegCalendarCheck className="text-sm" />
              <span className="hidden md:block  lg:hidden 2xl:block">Start Date : </span>
            </div>
            <p className="text-black font-bold">{task?.StartDate ? format(dateFormatter(task?.StartDate), customDateFormat) : ""}</p>
          </div>

          <span className="text-gray-400">|</span>

          <div className="flex gap-1 items-center justify-center  text-sm text-gray-600">
            <div className="flex items-center justify-center gap-1 ">
              <FaRegCalendarTimes className="text-sm" />
              <span className="hidden md:block  lg:hidden 2xl:block">Due Date :</span>
            </div>
            <p className="text-black font-bold">
              {task?.StartDate ? format(getTaskEndDate(task?.StartDate, task.TaskDuration), customDateFormat) : ""}
            </p>
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
                  onClick={() => viewSubTaskClick(task)}
                >
                  <TbSubtask />
                  <span className="font-bold">{task?._count?.subtaskdb}</span>
                </div>
                <span className="text-gray-400 px-2">|</span>
                <div
                  className={clsx(
                    "w-fit flex gap-1 items-center hover:bg-viewcolor hover:text-white px-2 py-0 rounded-full cursor-pointer",
                    "bg-gray-200 text-black"
                  )}
                  onClick={() => viewAttachClick(task)}
                >
                  <IoMdAttach />
                  <span className="font-bold">{task?._count?.attachmentdb}</span>
                </div>
                <span className="text-gray-400 px-2">|</span>
                <div
                  className={clsx(
                    "w-fit flex gap-1 items-center hover:bg-viewcolor hover:text-white px-2 py-0 rounded-full cursor-pointer",
                    "bg-gray-200 text-black"
                  )}
                  onClick={() => viewCommentClick(task)}
                >
                  <BiCommentDetail />
                  <span className="font-bold">{task?._count?.commentdb}</span>
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
              {task?.taskdb_assignee?.map((m, index) => (
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

        <div className="w-full border-t border-gray-200 my-0" />

        <div className="flex items-center gap-3 p-3">
          <div className="flex gap-1 items-center justify-center text-sm text-gray-600">
            <span className="flex items-center justify-center gap-2 text-lg md:text-xl text-center line-clamp-1 text-black font-semibold">
              <GrProjects className="text-sm" /> {task?.projectdb?.Description}
            </span>
          </div>
        </div>
      </div>
      <SubTasksDialog
        open={openSubTasks}
        setOpen={setOpenSubTasks}
        recordData={selected}
        type={"task_id"}
        query={"tasks"}
        hasAdd={hasAdd}
        hasEdit={hasEdit}
        hasDel={hasDel}
        chatUsers={selectedChatUsers}
      />
      <AttachmentsDialog
        open={openAttachments}
        setOpen={setOpenAttachments}
        recordData={selected}
        type={"task_id"}
        query={"tasks"}
        hasAdd={hasAdd}
        hasEdit={hasEdit}
        hasDel={hasDel}
        chatUsers={selectedChatUsers}
      />
      <CommentsDialog
        open={openComments}
        setOpen={setOpenComments}
        recordData={selected}
        type={"task_id"}
        query={"tasks"}
        hasAdd={hasAdd}
        hasEdit={hasEdit}
        hasDel={hasDel}
        chatUsers={selectedChatUsers}
      />
    </>
  );
};

export default TaskCard;
