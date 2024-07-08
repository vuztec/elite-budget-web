import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Title from "../Title";
import Button from "../Button";
import { FaEye } from "react-icons/fa";
import { FaPhoneSquare } from "react-icons/fa";
import { MdPeople } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import clsx from "clsx";
import { getInitials, themeColors } from "../../utils";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "../Pagination.css";

export const LatestResources = ({ resourceData }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;
  const pagesVisited = pageNumber * itemsPerPage;

  const navigate = useNavigate();

  const viewAllClick = () => {
    navigate("/team/list");
  };

  const TableHeader = () => (
    <thead>
      <tr className="text-gray-600 font-bold bg-[whitesmoke] border border-gray-400 text-left text-sm xl:text-[16px]">
        <th className="p-2">Full Name</th>
        <th className="border-l border-gray-300 p-2">Status</th>
        <th className="border-l border-gray-300 p-2">Contacts</th>
        <th className="border-l border-gray-300 p-2">Added On</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className="border border-gray-300 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
      <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">
        <div className="flex items-center gap-3">
          <div className={clsx("w-9 h-9 rounded-full text-white flex items-center justify-center text-sm", `bg-[${themeColors[0]}]`)}>
            <span className="text-center">{getInitials(user?.FullName)}</span>
          </div>

          <div className="flex flex-col items-start gap-1">
            <p className="font-semibold"> {user?.FullName}</p>
            <span className="text-xs text-black italic">{user?.Designation}</span>
          </div>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">
        <p className={clsx("w-full px-3 py-1 rounded-full", user?.Status === "Active" ? "bg-green-200" : "bg-yellow-100")}>
          {user?.Status}
        </p>
      </td>
      <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">
        <div className="flex flex-col items-start gap-0">
          <div className="flex gap-3 items-center text-left">
            <FaPhoneSquare className={`text-[${themeColors[1]}]`} />
            <p className="text-black"> {user.Telephone}</p>
          </div>
          <div className="flex gap-3 items-center text-left">
            <MdEmail className={`text-[${themeColors[0]}]`} />
            <span className="text-black">{user?.Email}</span>
          </div>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">{moment(user?.CreatedOn).fromNow()}</td>
    </tr>
  );

  const pageCount = Math.ceil(resourceData?.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      {resourceData?.length > 0 && (
        <>
          <div className="flex flex-col w-full gap-2 shadow-md rounded bg-white">
            <div className="flex items-center justify-between px-2 pt-3 md:px-5 ">
              <div className="flex items-center gap-2">
                <MdPeople className={`text-2xl text-[${themeColors[1]}]`} />
                <Title title="  New Resources" />
              </div>
              <Button
                label="View All"
                icon={<FaEye className="text-lg" />}
                className={clsx(
                  "flex flex-row-reverse gap-1 items-center text-white hover:bg-viewcolor rounded-full px-2 py-1",
                  `bg-[${themeColors[1]}] hover:text-[${themeColors[1]}]`
                )}
                onClick={() => viewAllClick()}
              />
            </div>

            <div className="w-full h-fit bg-white py-2 px-5 rounded">
              <div className="overflow-x-auto">
                <table className="w-[96%] m-5">
                  <TableHeader />
                  <tbody>
                    {resourceData?.slice(pagesVisited, pagesVisited + itemsPerPage)?.map((user, index) => (
                      <TableRow key={index} user={user} />
                    ))}
                  </tbody>
                </table>
              </div>
              {resourceData?.length > itemsPerPage && (
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
            </div>
          </div>
        </>
      )}
    </>
  );
};
