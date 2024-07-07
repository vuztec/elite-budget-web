import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import clsx from "clsx";
import "../Pagination.css";
import { IoMdAddCircle, IoMdAttach } from "react-icons/io";
import { RiDeleteBin2Fill, RiFileGifFill } from "react-icons/ri";
import { useQueryClient } from "react-query";
import socket from "../../utils/socket";
import AddAttachment from "./AddAttachment";
import ConfirmationDialog from "../Dialogs";
import axios from "../../config/axios";
import Button from "../Button";
import { FaFolderOpen, FaRegFileExcel, FaRegFilePdf, FaRegFilePowerpoint, FaRegFileWord } from "react-icons/fa";
import { SiJpeg } from "react-icons/si";
import { themeColors } from "../../utils";
import { BiSolidFileJpg, BiSolidFilePng, BiSolidFileTxt } from "react-icons/bi";
import { BsFiletypeMp3, BsFiletypeMp4, BsFiletypeTiff } from "react-icons/bs";
import { handleAxiosResponseError } from "../../utils/handleResponseError";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export function getFileSize(size) {
  let fileSize = size + "bytes";
  if (size >= 1000) {
    fileSize = (size / 1000).toFixed(2) + " kB";
  }
  if (size >= 1000000) {
    fileSize = (size / 1000000).toFixed(2) + " MB";
  }
  if (size >= 1000000000) {
    fileSize = (size / 1000000000).toFixed(2) + " GB";
  }
  if (size >= 1000000000000) {
    fileSize = (size / 1000000000000).toFixed(2) + " TB";
  }
  return fileSize;
}

export function getFileIcon(url) {
  const parts = url.split(".");
  const ext = "." + parts[parts.length - 1];
  let icon = <IoMdAttach className="text-lg md:text-2xl" />;
  if (ext === ".doc" || ext === ".docx") {
    icon = <FaRegFileWord className="text-lg md:text-2xl text-blue-500" />;
  }
  if (ext === ".xls" || ext === ".xlsx") {
    icon = <FaRegFileExcel className="text-lg md:text-2xl text-green-500" />;
  }
  if (ext === ".ppt" || ext === ".pptx") {
    icon = <FaRegFilePowerpoint className="text-lg md:text-2xl text-orange-800" />;
  }
  if (ext === ".pdf") {
    icon = <FaRegFilePdf className="text-lg md:text-2xl text-red-600" />;
  }
  if (ext === ".png") {
    icon = <BiSolidFilePng className="text-lg md:text-2xl text-red-950" />;
  }
  if (ext === ".jpeg") {
    icon = <SiJpeg className="text-lg md:text-2xl text-red-950" />;
  }
  if (ext === ".jpg") {
    icon = <BiSolidFileJpg className="text-lg md:text-2xl text-red-950" />;
  }
  if (ext === ".txt") {
    icon = <BiSolidFileTxt className="text-lg md:text-2xl text-blue-500" />;
  }
  if (ext === ".gif") {
    icon = <RiFileGifFill className="text-lg md:text-2xl text-red-950" />;
  }
  if (ext === ".mp3") {
    icon = <BsFiletypeMp3 className="text-lg md:text-2xl text-slate-500" />;
  }
  if (ext === ".mp4") {
    icon = <BsFiletypeMp4 className="text-lg md:text-2xl text-slate-500" />;
  }
  if (ext === ".tiff") {
    icon = <BsFiletypeTiff className="text-lg md:text-2xl text-red-950" />;
  }
  return icon;
}

export const Attachments = ({ attachments, type, itemID, query, hasAdd, hasEdit, hasDel, chatUsers }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;
  const pagesVisited = pageNumber * itemsPerPage;

  // type will tell us what it is (task, risk, etc)
  //----------------CRUD----------------//
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const deleteHandler = async (selected) => {
    setIsLoading(true);
    axios
      .post(SERVER_URL + "/api/attachment/delete-file/" + selected)
      .then(({ data }) => {
        console.log("Data  ---- ", data);
        // socket?.emit("deleteAttachment", selected, type, itemID, query);
        queryClient.setQueryData(["attachments", type, parseInt(itemID)], (prev) => {
          queryClient.setQueryData([query], (prev) =>
            prev.map((item) =>
              item.id === parseInt(itemID)
                ? {
                    ...item,
                    _count: {
                      ...item._count,
                      attachmentdb: item._count.attachmentdb - 1,
                    },
                  }
                : item
            )
          );
          return prev.filter((attachment) => attachment.id !== selected);
        });
        setIsLoading(false);
        setOpenDialog(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setOpenDialog(false);
        console.log(handleAxiosResponseError(err));
      });
  };

  const removeClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const addNewClick = () => {
    setOpen(true);
  };

  const handleAttachment = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
  //----------------CRUD----------------//

  const TableHeader = () => (
    <thead>
      <tr className="text-gray-600 font-bold bg-[whitesmoke] border border-gray-400 text-left text-sm xl:text-[16px]">
        <th className="p-2">File Name</th>
        <th className="border-l border-gray-300 p-2">Doc/Ref Number</th>
        <th className="border-l border-gray-300 p-2">Revision</th>
        <th className="border-l border-gray-300 p-2">Attachment</th>
        <th className="border-l border-gray-300 p-2">File Size</th>
        {hasEdit && <th className="border-l border-gray-300 p-2">Actions</th>}
      </tr>
    </thead>
  );

  const TableRow = ({ attachment }) => (
    <tr className="border border-gray-300 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
      <td className="min-w-[150px] max-w-[250px] p-2 border-l border-gray-200">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-left gap-2 text-center">
            {getFileIcon(attachment.AttachPath)}
            {attachment?.Description}
          </span>
        </div>
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-left gap-2 text-center">{attachment?.RefNum}</span>
        </div>
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-left gap-2 text-center">{attachment?.Revision}</span>
        </div>
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="rounded-md text-black">
          <Button
            label={"Open File"}
            icon={<FaFolderOpen />}
            className={clsx(
              "w-fit flex flex-row-reverse items-center gap-2 px-2 py-1 text-white hover:bg-viewcolor rounded-full",
              `bg-[${themeColors[1]}] hover:text-[${themeColors[1]}]`
            )}
            onClick={() => handleAttachment(attachment?.AttachPath)}
          />
        </div>
      </td>
      <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-left gap-2 text-center">{getFileSize(attachment?.FileSize)}</span>
        </div>
      </td>

      {hasEdit && (
        <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
          <div className="flex items-center text-left gap-4 justify-start">
            <RiDeleteBin2Fill
              className={clsx(`text-deletecolor`, "hover:text-red-500 font-semibold cursor-pointer sm:px-0")}
              onClick={() => removeClick(attachment.id)}
            />
          </div>
        </td>
      )}
    </tr>
  );

  const pageCount = Math.ceil(attachments?.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  attachments?.sort((a, b) => {
    // Compare by Description
    if (a.Description !== b.Description) {
      return a.Description.localeCompare(b.Description);
    }
    // If Description is the same, compare by RefNum
    if (a.RefNum !== b.RefNum) {
      return a.RefNum.localeCompare(b.RefNum);
    }
    // If RefNum is also the same, compare by Revision
    return a.Revision.localeCompare(b.Revision);
  });

  return (
    <div className="w-full bg-white">
      <div className={clsx("flex items-center gap-3 mx-1 my-4 md:mx-4", `text-[${themeColors[1]}]`)}>
        <div className="flex items-center gap-2">
          <IoMdAttach className="text-2xl" />
          <p className="font-semibold">DOCUMENTS</p>
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
              {attachments?.slice(pagesVisited, pagesVisited + itemsPerPage)?.map((attachment, index) => (
                <TableRow key={index} attachment={attachment} />
              ))}
            </tbody>
          </table>
        </div>
        <AddAttachment
          socket={socket}
          open={open}
          setOpen={setOpen}
          recordData={selected}
          chatUsers={chatUsers}
          type={type}
          query={query}
          itemID={itemID}
          key={new Date().getTime().toString()}
        />
        <ConfirmationDialog open={openDialog} setOpen={setOpenDialog} onClick={() => deleteHandler(selected)} isLoading={isLoading} />
        {attachments?.length > itemsPerPage && (
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
    </div>
  );
};
