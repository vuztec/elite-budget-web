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
import AddApprover from "./AddApprover";
import { useQueryClient } from "react-query";
import { IoMdAddCircle } from "react-icons/io";

export const Approvers = ({ approvers, type, itemID, hasAdd, hasEdit, hasDel, query }) => {
  const currentUser = useUserStore((state) => state.user);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;
  const pagesVisited = pageNumber * itemsPerPage;

  //----------------CRUD----------------//
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [db, setDb] = useState("timesheetdb_approver");
  const [idType, setIdType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query === "changes") {
      setIdType(() => "change_id");
      setDb(() => "changesdb_approver");
    } else if (query === "timesheets") {
      setIdType(() => "timesheet_id");
      setDb(() => "timesheetdb_approver");
    }
  }, [query]);

  const deleteHandler = async (selected) => {
    setIsLoading(true);
    axios
      .post(SERVER_URL + "/api/general/approver/remove", { item_id: itemID, resource_id: selected, query, db })
      .then(({ data }) => {
        console.log(data);
        queryClient.setQueryData([query], (prev) =>
          prev?.map((item) =>
            item.id === Number(itemID)
              ? {
                  ...item,
                  [db]: item[db]?.filter((user) => user.resource_id !== selected),
                }
              : item
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
    //this one deletes the approver directly in the database
    setSelected(id);
    setOpenDialog(true);
  };

  const addNewClick = () => {
    // I thing it wiil be much better to bring the existing approvers if they already exist to prevent duplicates and the users call also remove here.
    setSelected("");
    setOpen(true);
  };
  //----------------CRUD----------------//

  const TableHeader = () => (
    <thead>
      <tr className="text-gray-600 font-bold bg-[whitesmoke] border border-gray-400 text-left text-sm xl:text-[16px]">
        <th className="p-2">Full Name</th>
        <th className="border-l border-gray-300 p-2">Contacts</th>
        {hasDel && <th className="border-l border-gray-300 p-2">Actions</th>}
      </tr>
    </thead>
  );

  const TableRow = ({ approver }) => (
    <tr className="border border-gray-300 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
      <td className="min-w-fit whitespace-nowrap px-2 py-1 border-l border-gray-200">
        <div className="flex items-center gap-3">
          <div className={clsx("w-9 h-9 rounded-full text-white flex items-center justify-center text-sm", `bg-[${themeColors[0]}]`)}>
            <span className="text-center">{getInitials(approver.resourcesdb.FullName)}</span>
          </div>

          <div className="flex flex-col items-start gap-0">
            <p className="font-semibold"> {approver.resourcesdb.FullName}</p>
            <span className="text-xs text-black italic">{approver.resourcesdb?.Designation}</span>
          </div>
        </div>
      </td>
      <td className="min-w-fit whitespace-nowrap px-2 py-1 border-l border-gray-200">
        <div className="flex flex-col items-start gap-0">
          <div className="flex gap-3 items-center text-left">
            <FaPhoneSquare className={`text-sm text-[${themeColors[1]}]`} />
            <p className="text-sm text-black"> {approver.resourcesdb.Telephone}</p>
          </div>
          <div className="flex gap-3 items-center text-left">
            <MdEmail className={`text-sm text-[${themeColors[0]}]`} />
            <span className="text-sm text-black">{approver.resourcesdb?.Email}</span>
          </div>
        </div>
      </td>

      {hasDel && (
        <td className="min-w-fit whitespace-nowrap px-2 py-1 border-l border-gray-200">
          <div className="flex items-center text-left gap-4 justify-start">
            <RiDeleteBin2Fill
              className={clsx(`text-deletecolor`, "hover:text-red-500 font-semibold cursor-pointer sm:px-0")}
              onClick={() => removeClick(approver.resourcesdb.id)}
            />
          </div>
        </td>
      )}
    </tr>
  );

  const pageCount = Math.ceil(approvers?.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="w-full bg-white">
      <div className={clsx("flex items-center gap-3 m-4", `text-[${themeColors[1]}]`)}>
        <div className="flex items-center gap-2">
          <MdPeople className="text-xl" />
          <p className="font-semibold">APPROVERS</p>
        </div>
        {hasAdd && (
          <IoMdAddCircle
            onClick={() => addNewClick()}
            className="flex text-2xl md:text-3xl items-center justify-center text-gray-600 rounded-full hover:text-gray-400 cursor-pointer"
          />
        )}
      </div>
      <div className="h-fit bg-white m-4 px-2">
        <div className="overflow-x-auto">
          <table className="w-full mb-3">
            <TableHeader />
            <tbody>
              {approvers?.slice(pagesVisited, pagesVisited + itemsPerPage)?.map((approver, index) => (
                <TableRow key={index} approver={approver} />
              ))}
            </tbody>
          </table>
        </div>
        <AddApprover
          open={open}
          type={type}
          query={query}
          itemID={itemID}
          db={db}
          idType={idType}
          setOpen={setOpen}
          recordData={selected}
          key={new Date().getTime().toString()}
          approvers={approvers?.map((user) => user.resource_id)}
        />
        <ConfirmationDialog open={openDialog} setOpen={setOpenDialog} onClick={() => deleteHandler(selected)} isLoading={isLoading} />
        {approvers?.length > itemsPerPage && (
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
