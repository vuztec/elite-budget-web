import React, { useEffect, useState } from "react";
import useUserStore from "../../app/user";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { IoMdAdd, IoMdAttach } from "react-icons/io";
import Loading from "../../components/Loader";
import { BGS, getInitials, themeColors } from "../../utils";
import { format } from "date-fns";
import { getTimesheets, getDateFormat, getResources, getRootUser, getProjects } from "../../config/api";
import { useQuery, useQueryClient } from "react-query";
import ConfirmationDialog from "../../components/Dialogs";
import { AddTimesheet, UserInfo } from "../../components/team";
import { FaEdit, FaEye, FaRegCalendarCheck, FaRegCalendarPlus } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import clsx from "clsx";
import socket from "../../utils/socket";
import { TbCalendarDollar } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { AttachmentsDialog, CommentsDialog } from "../../components/DisplayDialogs";
import { BiCommentDetail } from "react-icons/bi";
import axios from "../../config/axios";
import { getTimesheetChatUsers } from "../../utils/users";
import {
  getActiveAccount,
  getAddTimesheetPermission,
  getDeleteTimesheetPermission,
  getEditTimesheetPermission,
} from "../../utils/permissions";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import Package from "../../package/Package";
import { handleAxiosResponseError } from "../../utils/handleResponseError";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const Timesheet = () => {
  const { user: currentUser, root } = useUserStore();
  const current_subcription = root.subscriptions?.[0];

  const activeAccount = getActiveAccount(root);
  const [customDateFormat, setCustomDateFormat] = useState();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [gridData, setGridData] = useState([]);

  const { data: projectData, status: isProjectLoaded } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 1000 * 60 * 60,
  });
  const { data: resourceData, status: isResourceLoaded } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
    staleTime: 1000 * 60 * 60,
  });

  const { data: timesheetData, status: istimesheetLoaded } = useQuery({
    queryKey: ["timesheets"],
    queryFn: getTimesheets,
    staleTime: 1000 * 60 * 60,
  });

  const { data: dateFormatData, status: isDateFormatLoaded } = useQuery({
    queryKey: ["dateformat"],
    queryFn: getDateFormat,
    staleTime: 1000 * 60 * 60,
  });

  const { data: rootUserData, status: isRootUserLoaded } = useQuery({
    queryKey: ["rootuser"],
    queryFn: getRootUser,
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (
      istimesheetLoaded === "success" &&
      isRootUserLoaded === "success" &&
      isDateFormatLoaded === "success" &&
      isResourceLoaded === "success"
    ) {
      const filteredData = timesheetData;
      const sub = current_subcription;
      if (sub?.Payment && !sub?.Is_Expired) {
        setGridData(filteredData);
      } else {
        setGridData([]);
      }
      const targetFormatData = dateFormatData?.find((item) => item.UserID === currentUser.id);
      const userDateFormat = targetFormatData ? targetFormatData.Format : "MMM dd, yyyy";
      setCustomDateFormat(userDateFormat);
      setIsDataLoaded(true);
    }
  }, [
    resourceData,
    isResourceLoaded,
    timesheetData,
    istimesheetLoaded,
    rootUserData,
    isRootUserLoaded,
    dateFormatData,
    isDateFormatLoaded,
    currentUser,
  ]);

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
    await axios.delete(`${SERVER_URL}/api/attachment/delete-file?type=timesheet_id&id=${selected}`);
    axios
      .delete(`${SERVER_URL}/api/timesheet/${selected}`)
      .then(({ data }) => {
        console.log(data);
        queryClient.setQueryData(["timesheets"], (prev) => prev.filter((absentee) => absentee.id !== selected));
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

  const addNewClick = () => {
    setSelected(null);
    setOpen(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  const navigate = useNavigate();
  const viewDetailClick = (id) => {
    navigate(`/timesheet/${id}`);
  };

  const viewAttachClick = (el) => {
    setSelected(el);
    const chatUsers = getTimesheetChatUsers(projectData, el, el.ProjectID, currentUser);
    setSelectedChatUsers(chatUsers);
    const add = getAddTimesheetPermission(currentUser, projectData);
    const edit = getEditTimesheetPermission(currentUser, el, projectData);
    const del = getDeleteTimesheetPermission(currentUser);
    setHasAdd(() => add);
    setHasEdit(() => edit);
    setHasDel(() => del);
    setOpenAttachments(true);
  };

  const viewCommentClick = (el) => {
    setSelected(el);
    const chatUsers = getTimesheetChatUsers(projectData, el, el?.ProjectID, currentUser);
    setSelectedChatUsers(chatUsers);
    const add = getAddTimesheetPermission(currentUser, projectData);
    const edit = getEditTimesheetPermission(currentUser, el, projectData);
    const del = getDeleteTimesheetPermission(currentUser);
    setHasAdd(() => add);
    setHasEdit(() => edit);
    setHasDel(() => del);
    setOpenComments(true);
  };
  //----------------CRUD----------------//

  const TableHeader = () => (
    <thead>
      <tr className="text-gray-600 font-bold bg-[whitesmoke] border border-gray-400 text-left text-sm xl:text-[16px]">
        <th className="p-2">Project</th>
        <th className="border-l border-gray-300 p-2">Requester</th>
        <th className="border-l border-gray-300 p-2">Description</th>
        <th className="border-l border-gray-300 p-2">Hours</th>
        <th className="border-l border-gray-300 p-2">Record Date</th>
        <th className="border-l border-gray-300 p-2">Approver</th>
        <th className="border-l border-gray-300 p-2">Approved On</th>
        {(current_subcription?.Package === "Standard" || current_subcription?.Package === "Premium") && (
          <th className="border-l border-gray-300 p-2">Assets</th>
        )}
        <th className="border-l border-gray-300 p-2">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ record }) => (
    <tr className="border border-gray-300 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-0">
          <span>{record.projectdb.Description}</span>
        </div>
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex items-center gap-3">
          <div className={clsx("w-9 h-9 rounded-full text-white flex items-center justify-center text-sm", `bg-[${themeColors[0]}]`)}>
            <span className="text-xs md:text-sm text-center">{getInitials(record?.resourcesdb?.FullName)}</span>
          </div>
          <div className="flex flex-col items-start gap-0">
            <span>{record?.resourcesdb?.FullName}</span>
            <span className="text-xs italic">{record?.resourcesdb?.Designation}</span>
          </div>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">{record.Description}</td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">{record.Hours}</td>

      <td className="min-w-max px-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-2">
          <div className="flex gap-3 items-center text-left">
            <FaRegCalendarPlus className=" text-startcolor hidden lg:block" />
            <p className="whitespace-nowrap">{record?.RecDate ? format(new Date(record?.RecDate), customDateFormat) : ""}</p>
          </div>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">
        <div className="flex">
          {record?.timesheetdb_approver?.map((m, index) => (
            <div
              key={index}
              className={clsx("w-7 h-7 rounded-full flex items-center justify-center text-xs xl:text-sm mr-0", BGS[index % BGS?.length])}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">
        <div className="flex gap-3 items-center text-left">
          <FaRegCalendarCheck className="text-startcolor hidden lg:block" />
          <span className="whitespace-nowrap">{record?.ApprovedDate ? format(new Date(record?.ApprovedDate), customDateFormat) : ""}</span>
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
              onClick={() => viewAttachClick(record)}
            >
              <IoMdAttach />
              <span className="font-bold">{record?._count?.attachmentdb}</span>
            </div>
            <div
              className={clsx(
                "w-fit flex gap-1 items-center hover:bg-viewcolor hover:text-white px-2 py-0 rounded-full cursor-pointer",
                "bg-gray-200 text-black"
              )}
              onClick={() => viewCommentClick(record)}
            >
              <BiCommentDetail />
              <span className="font-bold">{record?._count?.commentdb}</span>
            </div>
          </div>
        </td>
      )}
      <td className="min-w-max px-2 border-l border-gray-200">
        <div className="flex items-center text-left gap-3 justify-start">
          {(current_subcription?.Package === "Standard" || current_subcription?.Package === "Premium") && (
            <AiTwotoneFolderOpen
              className={clsx("hover:text-green-500 font-semibold cursor-pointer sm:px-0", "text-viewcolor")}
              onClick={() => viewDetailClick(record.id)}
            />
          )}
          {getEditTimesheetPermission(currentUser, record, projectData) && (
            <FaEdit
              className={clsx("text-editcolor", "hover:text-orange-500 font-semibold cursor-pointer sm:px-0")}
              onClick={() => editClick(record)}
            />
          )}
          {getDeleteTimesheetPermission(currentUser) && (
            <RiDeleteBin2Fill
              className={clsx("text-deletecolor", "hover:text-red-500 font-semibold cursor-pointer sm:px-0")}
              onClick={() => deleteClick(record.id)}
            />
          )}
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
                  <TbCalendarDollar className={`text-2xl text-[${themeColors[1]}]`} />
                  <Title title="Team Timesheet" />
                </div>

                {getAddTimesheetPermission(currentUser, projectData) && (
                  <Button
                    label="Add New"
                    icon={<IoMdAdd className="text-lg" />}
                    className={clsx(
                      "flex flex-row-reverse gap-1 items-center text-white hover:bg-viewcolor rounded-full px-2 py-1",
                      `bg-[${themeColors[1]}] hover:text-[${themeColors[1]}]`
                    )}
                    onClick={() => addNewClick()}
                  />
                )}
              </div>

              <div className="w-full h-fit bg-white py-2 rounded">
                <div className="overflow-x-auto">
                  <table className="w-[97%] m-5">
                    <TableHeader />
                    <tbody>
                      {gridData.map((record, index) => (
                        <TableRow key={index} record={record} />
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

      <AddTimesheet socket={socket} open={open} setOpen={setOpen} recordData={selected} key={new Date().getTime().toString()} />
      <ConfirmationDialog open={openDialog} setOpen={setOpenDialog} isLoading={isLoading} onClick={() => deleteHandler(selected)} />
      <AttachmentsDialog
        open={openAttachments}
        setOpen={setOpenAttachments}
        recordData={selected}
        type={"timesheet_id"}
        query={"timesheets"}
        hasAdd={hasAdd}
        hasEdit={hasEdit}
        hasDel={hasDel}
        chatUsers={selectedChatUsers}
      />
      <CommentsDialog
        open={openComments}
        setOpen={setOpenComments}
        recordData={selected}
        type={"timesheet_id"}
        query={"timesheets"}
        hasAdd={hasAdd}
        hasEdit={hasEdit}
        hasDel={hasDel}
        chatUsers={selectedChatUsers}
      />
    </>
  );
};
