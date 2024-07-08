import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit, FaRegCalendarCheck, FaRegCalendarTimes } from "react-icons/fa";
import clsx from "clsx";
import {
  themeColors,
  getStageIcon,
  getProjectCost,
  getRemainingBudget,
  getRemainingBudgetColor,
  BGS,
  getStatusColor,
  getActualProjectPercentageComplete,
  getPlanProjectPercentageComplete,
} from "../../utils";
import useUserStore from "../../app/user";
import { format } from "date-fns";
import { UserInfo } from "../../components/team";

import { useQueryClient } from "react-query";
import { AddProject } from "../../components/project";
import ConfirmationDialog from "../../components/Dialogs";
import { useNavigate } from "react-router-dom";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { IoMdAttach } from "react-icons/io";
import { BiCommentDetail } from "react-icons/bi";
import { GrProjects } from "react-icons/gr";
import { AttachmentsDialog, CommentsDialog } from "../DisplayDialogs";
import axios from "../../config/axios";
import { getProjectChatUsers } from "../../utils/users";
import { getSuperProjectPermission, getEditProjectPermission, getFinancialPermission } from "../../utils/permissions";
import { handleAxiosResponseError } from "../../utils/handleResponseError";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const ProjectListView = ({ gridData, customDateFormat, usedCurrency, costData, taskData }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 10;
  const pagesVisited = pageNumber * itemsPerPage;
  const { user, root } = useUserStore();
  const current_subcription = root?.subscriptions?.[0];

  const hasFin = getFinancialPermission(user);

  //----------------CRUD----------------//
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
  const [isLoading, setIsLoading] = useState(false);

  const deleteHandler = async (selected) => {
    setIsLoading(true);
    await axios.delete(`${SERVER_URL}/api/attachment/delete-file?type=project_id&id=${selected}`);
    axios
      .delete(`${SERVER_URL}/api/project/${selected}`)
      .then(({ data }) => {
        console.log(data);
        queryClient.setQueryData(["projects"], (prev) => prev.filter((project) => project.id !== selected));
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
    const chatUsers = getProjectChatUsers(el, taskData, costData, el.id, user);
    setSelectedChatUsers(() => chatUsers);
  };

  const navigate = useNavigate();
  const viewDetailClick = (id) => {
    navigate(`/project/${id}`);
  };

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
    setSelectedChatUsers(() => chatUsers);
  };

  const viewCommentClick = (el) => {
    setSelected(el);
    const chatUsers = getProjectChatUsers(el, taskData, costData, el.id, user);
    setSelectedChatUsers(() => chatUsers);
    const add = getSuperProjectPermission(user);
    const edit = getEditProjectPermission(user, el);
    setHasAdd(() => add);
    setHasEdit(() => edit);
    setHasDel(() => add);
    setOpenComments(true);
  };

  //----------------CRUD----------------//

  const TableHeader = () => (
    <thead>
      <tr className="text-gray-600 font-bold bg-[whitesmoke] border border-gray-400 text-left text-sm xl:text-[16px]">
        <th className="p-2">Project Name</th>
        <th className="border-l border-gray-300 p-2">Location</th>
        <th className="border-l border-gray-300 p-2">Manager</th>
        <th className="border-l border-gray-300 p-2">Admin</th>
        <th className="border-l border-gray-300 p-2">Stakeholders</th>
        {hasFin && (
          <>
            <th className="border-l border-gray-300 p-2">Total Budget</th>
            <th className="border-l border-gray-300 p-2">Used Budget</th>
            <th className="border-l border-gray-300 p-2">Remaining Budget</th>
          </>
        )}
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

  const TableRow = ({ project }) => (
    <tr className="border border-gray-300 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
      <td className="min-w-[200px] max-w-[350px] px-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <span className="flex items-center justify-left gap-2 border-b border-gray-200 text-center mb-0 font-bold text-gray-900">
            <GrProjects className="text-sm" /> {project?.Description}
          </span>
          <span className={`text-xs italic text-[${themeColors[1]}]`}>{project?.Type}</span>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-1">
          <p className=" font-bold text-black"> {project?.Portfolio}</p>
          <span className={` text-[${themeColors[0]}]`}>{project?.Programme}</span>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">
        <div className="flex">
          {project?.projectdb_manager?.map((m, index) => (
            <div key={index} className={clsx("w-7 h-7 rounded-full flex items-center justify-center  mr-0", BGS[index % BGS?.length])}>
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">
        <div className="flex">
          {project?.projectdb_admin?.map((m, index) => (
            <div key={index} className={clsx("w-7 h-7 rounded-full flex items-center justify-center  mr-0", BGS[index % BGS?.length])}>
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">
        <div className="flex">
          {project?.projectdb_stakeholder?.map((m, index) => (
            <div key={index} className={clsx("w-7 h-7 rounded-full flex items-center justify-center  mr-0", BGS[index % BGS?.length])}>
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>
      {hasFin && (
        <>
          <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">
            <div className="w-full">
              <p>
                {usedCurrency +
                  Number(project?.Budget).toLocaleString("EN-AU", {
                    maximumFractionDigits: 0,
                  })}
              </p>
            </div>
          </td>
          <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">
            <p>{usedCurrency + Number(getProjectCost(costData, project?.id)).toLocaleString("EN-AU", { maximumFractionDigits: 0 })}</p>
          </td>

          <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">
            <div className={clsx("w-full px-2 py-1 rounded-full", getRemainingBudgetColor(project?.Budget, costData, project?.id))}>
              <span>
                {usedCurrency +
                  getRemainingBudget(project?.Budget, costData, project?.id).toLocaleString("EN-AU", { maximumFractionDigits: 0 })}
              </span>
            </div>
          </td>
        </>
      )}
      <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">
        <div className={`${getStatusColor(project.ProjectStage)} w-full px-3 py-1 rounded-full`}>
          <span className="flex flex-row items-center text-left gap-1">
            {getStageIcon(project.ProjectStage)} {project.ProjectStage}
          </span>
        </div>
      </td>
      <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-0">
          <div className="flex gap-2 items-center text-left">
            <p>Actual:</p>
            <span>
              {getActualProjectPercentageComplete(taskData, parseInt(project.id))
                ? getActualProjectPercentageComplete(taskData, parseInt(project.id))
                : 0}
              %
            </span>
          </div>
          <div className="flex gap-1 items-center text-left">
            <p>Plan:</p>
            <span>
              {getPlanProjectPercentageComplete(taskData, parseInt(project.id))
                ? getPlanProjectPercentageComplete(taskData, parseInt(project.id))
                : 0}
              %
            </span>
          </div>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">
        <div className="flex gap-1 items-center text-left">
          <FaRegCalendarCheck className="text-endcolor hidden lg:block" />
          <p className="text-black whitespace-nowrap"> {project.StartDate ? format(new Date(project.StartDate), customDateFormat) : ""}</p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">
        <div className="flex gap-1 items-center text-left">
          <FaRegCalendarTimes className="text-endcolor hidden lg:block" />
          <p className="whitespace-nowrap"> {project.EndDate ? format(new Date(project.EndDate), customDateFormat) : ""}</p>
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
              onClick={() => viewAttachClick(project)}
            >
              <IoMdAttach />
              <span className="font-bold">{project?._count?.attachmentdb}</span>
            </div>
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
        </td>
      )}
      <td className="min-w-max px-2 border-l border-gray-200">
        <div className="flex items-center text-left gap-3 justify-start">
          {(current_subcription?.Package === "Standard" || current_subcription?.Package === "Premium") && (
            <AiTwotoneFolderOpen
              className={clsx("hover:text-green-500 font-semibold cursor-pointer sm:px-0", `text-viewcolor`)}
              onClick={() => viewDetailClick(project.id)}
            />
          )}
          {getEditProjectPermission(user, project) && (
            <FaEdit
              className={clsx(`text-editcolor`, "hover:text-orange-500 font-semibold cursor-pointer sm:px-0")}
              onClick={() => editClick(project)}
            />
          )}
          {getSuperProjectPermission(user) && (
            <RiDeleteBin2Fill
              className={clsx(`text-deletecolor`, "hover:text-red-500 font-semibold cursor-pointer sm:px-0")}
              onClick={() => deleteClick(project.id)}
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
            {gridData?.slice(pagesVisited, pagesVisited + itemsPerPage)?.map((project, index) => (
              <TableRow key={index} project={project} />
            ))}
          </tbody>
        </table>
      </div>

      {gridData?.length > itemsPerPage && (
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
      <AddProject open={open} setOpen={setOpen} recordData={selected} key={new Date().getTime().toString()} chatUsers={selectedChatUsers} />
      <ConfirmationDialog isLoading={isLoading} open={openDialog} setOpen={setOpenDialog} onClick={() => deleteHandler(selected)} />
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
    </div>
  );
};
