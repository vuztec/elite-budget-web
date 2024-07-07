import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaEdit, FaRegCalendarTimes } from "react-icons/fa";
import clsx from "clsx";
import { dateFormatter, getStatusColor, getTaskStageIcon, themeColors } from "../../utils";
import useUserStore from "../../app/user";
import "../Pagination.css";
import { TbSubtask } from "react-icons/tb";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { format } from "date-fns";
import { useQuery, useQueryClient } from "react-query";
import AddSubTask from "./AddSubTask";
import socket from "../../utils/socket";
import ConfirmationDialog from "../Dialogs";
import { IoMdAddCircle } from "react-icons/io";
import { getDateFormat } from "../../config/api";
import axios from "../../config/axios";
import { handleAxiosResponseError } from "../../utils/handleResponseError";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const SubTasks = ({ subtasks, type, itemID, query, hasAdd, hasEdit, hasDel, chatUsers }) => {
  const currentUser = useUserStore((state) => state.user);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;
  const pagesVisited = pageNumber * itemsPerPage;
  const [dateFormat, setDateFormat] = useState("MMM dd, yyyy");
  const [isLoading, setIsLoading] = useState(false);

  const { data: dateFormatData } = useQuery({
    queryKey: ["dateformat"],
    queryFn: getDateFormat,
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    const targetFormatData = dateFormatData?.find((item) => item.UserID === currentUser.id);
    const userDateFormat = targetFormatData ? targetFormatData.Format : "MMM dd, yyyy";
    setDateFormat(userDateFormat);
  }, [dateFormatData, currentUser]);

  // type will tell us what it is (task, risk, etc)
  //----------------CRUD----------------//
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const deleteHandler = async (selected) => {
    setIsLoading(true);
    axios
      .post(SERVER_URL + "/api/subtask/" + selected + "/remove", {
        type,
        query,
        itemID,
      })
      .then(({ data }) => {
        console.log(data);
        queryClient.setQueryData(["subtasks", type, parseInt(itemID)], (prev) => {
          queryClient.setQueryData([query], (prev) =>
            prev.map((item) =>
              item.id === parseInt(itemID)
                ? {
                    ...item,
                    _count: {
                      ...item._count,
                      subtaskdb: item._count.subtaskdb - 1,
                    },
                  }
                : item
            )
          );
          return prev.filter((subtask) => subtask.id !== selected);
        });
        setIsLoading(true);
        setOpenDialog(false);
      })
      .catch((err) => {
        setOpenDialog(false);
        setIsLoading(true);

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

  const addNewClick = () => {
    setOpen(true);
    setSelected("");
  };
  //----------------CRUD----------------//

  const TableHeader = () => (
    <thead>
      <tr className="text-gray-600 font-bold bg-[whitesmoke] border border-gray-400 text-left text-sm xl:text-[16px]">
        <th className="p-2">Description</th>
        <th className="border-l border-gray-300 p-1">Status</th>
        <th className="border-l border-gray-300 p-1">Due Date</th>
        {hasEdit && <th className="border-l border-gray-300 p-1">Actions</th>}
      </tr>
    </thead>
  );

  const TableRow = ({ subtask }) => (
    <tr className="border border-gray-300 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
      <td className="min-w-[150px] max-w-[250px] p-2 border-l border-gray-200">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-left gap-2 text-center">
            <TbSubtask /> {subtask?.Description}
          </span>
        </div>
      </td>

      <td className="min-w-max p-2 border-l border-gray-200">
        <div className={clsx("w-full flex items-center text-left gap-1 px-2 py-1 rounded-full", getStatusColor(subtask?.Status))}>
          <span className="hidden lg:block">{getTaskStageIcon(subtask?.Status)}</span>
          <span className="whitespace-nowrap">{subtask?.Status}</span>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-0">
          <div className="flex gap-3 items-center text-left">
            <FaRegCalendarTimes className="text-endcolor hidden lg:block" />
            <p className="whitespace-nowrap text-black">{subtask?.DueDate ? format(dateFormatter(subtask?.DueDate), dateFormat) : ""}</p>
          </div>
        </div>
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex items-center text-left gap-4 justify-start">
          {hasEdit && (
            <FaEdit
              className={clsx(`text-editcolor`, "hover:text-orange-500 font-semibold cursor-pointer sm:px-0")}
              onClick={() => editClick(subtask)}
            />
          )}
          {hasEdit && (
            <RiDeleteBin2Fill
              className={clsx(`text-deletecolor`, "hover:text-red-500 font-semibold cursor-pointer sm:px-0")}
              onClick={() => deleteClick(subtask.id)}
            />
          )}
        </div>
      </td>
    </tr>
  );

  const pageCount = Math.ceil(subtasks?.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="w-full bg-white">
      <div className={clsx("flex items-center gap-3 mx-1 my-4 md:mx-4", `text-[${themeColors[1]}]`)}>
        <div className="flex items-center gap-2">
          <TbSubtask className="text-2xl" />
          <p className="font-semibold">SUB-TASKS</p>
        </div>
        {hasEdit && (
          <IoMdAddCircle
            onClick={() => addNewClick()}
            className="flex text-3xl items-center justify-center text-gray-600 rounded-full hover:text-gray-400 cursor-pointer"
          />
        )}
      </div>
      <div className="h-fit bg-white mx-1 my-4 md:mx-4 px-1">
        <div className="overflow-x-auto">
          <table className="w-full mb-3">
            <TableHeader />
            <tbody>
              {subtasks?.slice(pagesVisited, pagesVisited + itemsPerPage)?.map((subtask, index) => (
                <TableRow key={index} subtask={subtask} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddSubTask
        socket={socket}
        open={open}
        setOpen={setOpen}
        recordData={selected}
        type={type}
        itemID={itemID}
        key={new Date().getTime().toString()}
        query={query}
        chatUsers={chatUsers}
      />
      <ConfirmationDialog open={openDialog} setOpen={setOpenDialog} onClick={() => deleteHandler(selected)} isLoading={isLoading} />
      {subtasks?.length > itemsPerPage && (
        <ReactPaginate
          previousLabel="<<"
          nextLabel=">>"
          pageCount={pageCount}
          breakLabel="..."
          onPageChange={handlePageChange}
          className="react-paginate"
          renderOnZeroPageCount={null}
        />
      )}
    </div>
  );
};
