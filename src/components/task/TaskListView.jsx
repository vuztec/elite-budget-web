import React, { useEffect, useState } from "react";
import { MdOutlineTask } from "react-icons/md";
import { FaEdit, FaRegCalendarCheck, FaRegCalendarTimes } from "react-icons/fa";
import clsx from "clsx";
import {
  getTaskPercentageColor,
  getTaskEndDate,
  getTaskPlanPercentage,
  BGS,
  getStatusColor,
  getPriorityRatingColor,
  getTaskStageIcon,
  PriorityIcon,
} from "../../utils";
import { format } from "date-fns";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { GrProjects } from "react-icons/gr";
import { UserInfo } from "../../components/team";
import { useQueryClient } from "react-query";

import { AddTask } from "../../components/task";
import ConfirmationDialog from "../../components/Dialogs";
import socket from "../../utils/socket";
import { useNavigate } from "react-router-dom";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import useUserStore from "../../app/user";
import ReactPaginate from "react-paginate";
import { TbSubtask } from "react-icons/tb";
import { IoMdAttach } from "react-icons/io";
import { BiCommentDetail } from "react-icons/bi";
import SubTasksDialog, { AttachmentsDialog, CommentsDialog } from "../DisplayDialogs";
import { getTaskChatUsers } from "../../utils/users";
import axios from "../../config/axios";
import { getSuperTaskPermission, getEditTaskPermission } from "../../utils/permissions";
import { handleAxiosResponseError } from "../../utils/handleResponseError";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const TaskListView = ({ gridData, customDateFormat, projectData }) => {
  const { user, root } = useUserStore();
  const current_subcription = root.subscriptions?.[0];

  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 10;
  const pagesVisited = pageNumber * itemsPerPage;

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
    await axios.delete(`${SERVER_URL}/api/attachment/delete-file?type=task_id&id=${selected}`);
    axios
      .delete(`${SERVER_URL}/api/task/${selected}`)
      .then(({ data }) => {
        console.log(data);
        queryClient.setQueryData(["tasks"], (prev) => prev.filter((change) => change.id !== selected));
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
    const chatUsers = getTaskChatUsers(projectData, el, el.ProjectID, user);
    setSelectedChatUsers(chatUsers);
  };

  const navigate = useNavigate();
  const viewDetailClick = (id) => {
    navigate(`/task/${id}`);
  };

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

  //----------------CRUD----------------//

  const TableHeader = () => (
    <thead>
      <tr className="text-gray-600 font-bold bg-[whitesmoke] border border-gray-400 text-left text-sm xl:text-[16px]">
        <th className="p-2">Task Description</th>
        <th className="p-2 border-l border-gray-300">Assigned To</th>
        <th className="p-2 border-l border-gray-300">Priority</th>
        <th className="p-2 border-l border-gray-300">Stage</th>
        <th className="p-2 border-l border-gray-300">% Complete</th>
        <th className="p-2 border-l border-gray-300">Start Date</th>
        <th className="p-2 border-l border-gray-300">Due Date</th>
        {(current_subcription?.Package === "Standard" || current_subcription?.Package === "Premium") && (
          <th className="border-l border-gray-300 p-2">Assets</th>
        )}
        <th className="p-2 border-l border-gray-300">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border border-gray-300 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
      <td className="min-w-[200px] max-w-[350px] px-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <span className="flex items-center justify-left gap-2 border-b border-gray-200 text-center mb-0 font-bold text-gray-900">
            <GrProjects className="text-sm" /> {task.projectdb?.Description}
          </span>
          <span className="flex items-center justify-left gap-2 text-center">
            <MdOutlineTask />
            {task.Description}
          </span>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">
        <div className="flex">
          {task?.taskdb_assignee?.map((m, index) => (
            <div
              key={index}
              className={clsx("w-7 h-7 rounded-full flex items-center justify-center text-xs xl:text-sm mr-0", BGS[index % BGS?.length])}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>

      <td className="min-w-max px-2 border-l border-gray-200">
        <div className={clsx("w-full flex items-center text-left gap-1 px-2  py-1 rounded-full", getPriorityRatingColor(task?.Priority))}>
          <span className="hidden lg:block">{PriorityIcon[task?.Priority]}</span>
          <span className="whitespace-nowrap">{task?.Priority}</span>
        </div>
      </td>

      <td className="min-w-max px-2 border-l border-gray-200">
        <div className={clsx("w-full flex items-center text-left gap-1 px-2 py-1 rounded-full", getStatusColor(task?.Stage))}>
          <span className="hidden lg:block">{getTaskStageIcon(task?.Stage)}</span>
          <span className="whitespace-nowrap">{task?.Stage}</span>
        </div>
      </td>

      <td className="min-w-max max-w-max px-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <div className="flex gap-3 items-center text-left whitespace-nowrap">
            <p className={getTaskPercentageColor(Number(task?.ActualComplete), task.StartDate, task.TaskDuration)}>Actual:</p>
            <p className={getTaskPercentageColor(Number(task?.ActualComplete), task.StartDate, task.TaskDuration)}>
              {task?.ActualComplete}%
            </p>
          </div>
          <div className="flex gap-3 items-center text-left">
            <p>Plan:</p>
            <span>{getTaskPlanPercentage(task.StartDate, task.TaskDuration)}%</span>
          </div>
        </div>
      </td>
      <td className="w-max px-2 border-l border-gray-200">
        <div className="flex gap-1 items-center text-left">
          <FaRegCalendarCheck className="text-startcolor hidden lg:block" />
          <p className="whitespace-nowrap">{task?.StartDate ? format(new Date(task?.StartDate), customDateFormat) : ""}</p>
        </div>
      </td>

      <td className="min-w-max px-2 border-l border-gray-200">
        <div className="flex gap-1 items-center text-left">
          <FaRegCalendarTimes className="text-endcolor hidden lg:block" />
          <span className="text-black whitespace-nowrap">
            {task?.StartDate ? format(getTaskEndDate(task.StartDate, task.TaskDuration), customDateFormat) : ""}
          </span>
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
              onClick={() => viewSubTaskClick(task)}
            >
              <TbSubtask />
              <span className="font-bold">{task?._count?.subtaskdb}</span>
            </div>
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
        </td>
      )}
      <td className="min-w-max px-2 border-l border-gray-200">
        <div className="flex items-center text-left gap-3 justify-start">
          {(current_subcription?.Package === "Standard" || current_subcription?.Package === "Premium") && (
            <AiTwotoneFolderOpen
              className={clsx("hover:text-green-500 font-semibold cursor-pointer sm:px-0", `text-viewcolor`)}
              onClick={() => viewDetailClick(task.id)}
            />
          )}
          {getEditTaskPermission(user, task, projectData) && (
            <FaEdit
              className={clsx(`text-editcolor`, "hover:text-orange-500 font-semibold cursor-pointer sm:px-0")}
              onClick={() => editClick(task)}
            />
          )}
          {getSuperTaskPermission(user, task, projectData) && (
            <RiDeleteBin2Fill
              className={clsx(`text-deletecolor`, "hover:text-red-500 font-semibold cursor-pointer sm:px-0")}
              onClick={() => deleteClick(task.id)}
            />
          )}
        </div>
      </td>
    </tr>
  );

  const pageCount = Math.ceil(gridData?.length / itemsPerPage);
  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="w-full h-fit bg-white py-2 shadow-md rounded">
      <div className="overflow-x-auto">
        <table className="w-[97%] m-5">
          <TableHeader />
          <tbody>
            {gridData?.slice(pagesVisited, pagesVisited + itemsPerPage)?.map((task, index) => (
              <TableRow key={index} task={task} />
            ))}
          </tbody>
        </table>
      </div>
      {gridData.length > itemsPerPage && (
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          pageCount={pageCount}
          breakLabel="..."
          onPageChange={handlePageChange}
          className="react-paginate"
          renderOnZeroPageCount={null}
        />
      )}
      <AddTask
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
    </div>
  );
};
export default TaskListView;
