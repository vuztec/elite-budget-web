import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Button from "../Button";
import { FaPhoneSquare } from "react-icons/fa";
import { MdPeople } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import clsx from "clsx";
import { getInitials, themeColors } from "../../utils";
import useUserStore from "../../app/user";
import "../Pagination.css";
import { RiDeleteBin2Fill } from "react-icons/ri";
import ConfirmationDialog from "../Dialogs";
import AddAdministrator from "./AddAdministrator";
import { useQueryClient } from "react-query";
import socket from "../../utils/socket";
import { IoMdAddCircle } from "react-icons/io";
import axios from "../../config/axios";
import { handleAxiosResponseError } from "../../utils/handleResponseError";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const Administrators = ({ administrators, type, itemID, hasAdd, hasEdit, hasDel, query }) => {
  const currentUser = useUserStore((state) => state.user);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;
  const pagesVisited = pageNumber * itemsPerPage;

  //----------------CRUD----------------//
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const deleteHandler = async (selected) => {
    // socket?.emit("deleteAdmin", itemID, selected);

    setIsLoading(true);
    axios
      .post(SERVER_URL + "/api/general/admin/remove", { item_id: itemID, resource_id: selected, query, db })
      .then(({ data }) => {
        console.log(data);
        queryClient.setQueryData(["projects"], (prev) =>
          prev?.map((project) =>
            project.id === Number(itemID)
              ? {
                  ...project,
                  projectdb_admin: project.projectdb_admin.filter((admin) => admin.resource_id !== Number(selected)),
                }
              : project
          )
        );
        setIsLoading(false);

        setOpenDialog(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(handleAxiosResponseError(err));
        setOpenDialog(false);
      });
  };

  const removeClick = (id) => {
    //this one deletes the administrator directly in the database
    setSelected(id);
    setOpenDialog(true);
  };

  const addNewClick = () => {
    // I thing it wiil be much better to bring the existing administrators if they already exist to prevent duplicates and the users call also remove here.
    setSelected("");
    setOpen(true);
  };
  //----------------CRUD----------------//

  const TableHeader = () => (
    <thead>
      <tr className="text-gray-600 font-bold bg-[whitesmoke] border border-gray-400 text-left text-sm xl:text-[16px]">
        <th className="p-2">Full Name</th>
        <th className="border-l border-gray-300 p-2">Contacts</th>
        {hasEdit && <th className="border-l border-gray-300 p-2">Actions</th>}
      </tr>
    </thead>
  );

  const TableRow = ({ administrator }) => (
    <tr className="border border-gray-300 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
      <td className="min-w-fit whitespace-nowrap px-2 py-1 border-l border-gray-200">
        <div className="flex items-center gap-3">
          <div className={clsx("w-9 h-9 rounded-full text-white flex items-center justify-center text-sm", `bg-[${themeColors[0]}]`)}>
            <span className="text-center">{getInitials(administrator.resourcesdb.FullName)}</span>
          </div>

          <div className="flex flex-col items-start gap-0">
            <p className="text-sm font-semibold"> {administrator.resourcesdb.FullName}</p>
            <span className="text-xs text-black italic">{administrator.resourcesdb?.Designation}</span>
          </div>
        </div>
      </td>
      <td className="min-w-fit whitespace-nowrap px-2 py-1 border-l border-gray-200">
        <div className="flex flex-col items-start gap-0">
          <div className="flex gap-3 items-center text-left">
            <FaPhoneSquare className={`text-sm text-[${themeColors[1]}]`} />
            <p className="text-sm text-black"> {administrator.resourcesdb.Telephone}</p>
          </div>
          <div className="flex gap-3 items-center text-left">
            <MdEmail className={`text-sm text-[${themeColors[0]}]`} />
            <span className="text-sm text-black">{administrator.resourcesdb?.Email}</span>
          </div>
        </div>
      </td>

      {hasEdit && (
        <td className="min-w-fit whitespace-nowrap px-2 py-1 border-l border-gray-200">
          <div className="flex items-center text-left gap-4 justify-start">
            <RiDeleteBin2Fill
              className={clsx(`text-deletecolor`, "hover:text-red-500 font-semibold cursor-pointer sm:px-0")}
              onClick={() => removeClick(administrator.resourcesdb.id)}
            />
          </div>
        </td>
      )}
    </tr>
  );

  const pageCount = Math.ceil(administrators?.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="w-full bg-white">
      <div className={clsx("flex items-center gap-3 m-4", `text-[${themeColors[1]}]`)}>
        <div className="flex items-center gap-2">
          <MdPeople className="text-2xl" />
          <p className="font-semibold">ADMINISTRATORS</p>
        </div>
        {hasEdit && (
          <IoMdAddCircle
            onClick={() => addNewClick()}
            className="flex text-3xl items-center justify-center text-gray-600 rounded-full hover:text-gray-400 cursor-pointer"
          />
        )}
      </div>
      <div className="h-fit bg-white m-4 px-2">
        <div className="overflow-x-auto">
          <table className="w-full mb-3">
            <TableHeader />
            <tbody>
              {administrators?.slice(pagesVisited, pagesVisited + itemsPerPage)?.map((administrator, index) => (
                <TableRow key={index} administrator={administrator} />
              ))}
            </tbody>
          </table>
        </div>
        <AddAdministrator
          socket={socket}
          admins={administrators?.map((admin) => admin.resource_id)}
          open={open}
          type={type}
          query={query}
          itemID={itemID}
          setOpen={setOpen}
          recordData={selected}
          key={new Date().getTime().toString()}
        />
        <ConfirmationDialog open={openDialog} setOpen={setOpenDialog} onClick={() => deleteHandler(selected)} />
        {administrators?.length > itemsPerPage && (
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
