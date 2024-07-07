import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Title from "../Title";
import Button from "../Button";
import { FaEye, FaRegCalendarCheck, FaRegCalendarTimes } from "react-icons/fa";
import { format } from "date-fns";
import {
  getDesignation,
  getFullName,
  getInitials,
  themeColors,
} from "../../utils";
import { useNavigate } from "react-router-dom";
import "../Pagination.css";
import clsx from "clsx";

export const CurrentAbsentees = ({
  resourceData,
  customDateFormat,
  updatedAbsenteeData,
}) => {
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;
  const pagesVisited = pageNumber * itemsPerPage;

  const navigate = useNavigate();

  const viewAllClick = () => {
    navigate("/team/absentee");
  };

  const TableHeader = () => (
    <thead>
      <tr className="text-gray-600 font-bold bg-[whitesmoke] border border-gray-400 text-left text-sm xl:text-[16px]">
        <th className="p-2">Full Name</th>
        <th className="border-l border-gray-300 p-2">Description</th>
        <th className="border-l border-gray-300 p-2">Start Day</th>
        <th className="border-l border-gray-300 p-2">Last Day</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className="border border-gray-300 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
      <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">
        <div className="flex items-center gap-3">
          <div
            className={clsx(
              "w-9 h-9 rounded-full text-white flex items-center justify-center",
              `bg-[${themeColors[0]}]`
            )}
          >
            <span className="text-center">
              {getInitials(getFullName(resourceData, user.UserID))}
            </span>
          </div>

          <div className="flex flex-col items-start gap-1">
            <p className="font-semibold">
              {" "}
              {getFullName(resourceData, user.UserID)}
            </p>
            <span className="text-xs text-black italic">
              {getDesignation(resourceData, user.UserID)}
            </span>
          </div>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">
        <p>{user?.Description}</p>
      </td>

      <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">
        <div className="flex gap-3 items-center text-left">
          <FaRegCalendarTimes className="text-endcolor hidden lg:block" />
          <p className="whitespace-nowrap">
            {" "}
            {format(new Date(user?.StartDate), customDateFormat)}
          </p>
        </div>
      </td>

      <td className="min-w-fit whitespace-nowrap px-2 border-l border-gray-200">
        <div className="flex gap-3 items-center text-left">
          <FaRegCalendarCheck className="text-startcolor hidden lg:block" />
          <span className="whitespace-nowrap">
            {format(new Date(user?.EndDate), customDateFormat)}
          </span>
        </div>
      </td>
    </tr>
  );

  const pageCount = Math.ceil(updatedAbsenteeData.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      {updatedAbsenteeData?.length > 0 && (
        <div className="flex flex-col w-full gap-2 shadow-md rounded bg-white">
          <div className="flex items-center justify-between px-2 pt-3 md:px-5 ">
            <div className="flex items-center gap-2">
              <FaRegCalendarTimes
                className={`text-xl text-[${themeColors[1]}]`}
              />
              <Title title="Absentees" />
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
                  {updatedAbsenteeData
                    ?.slice(pagesVisited, pagesVisited + itemsPerPage)
                    .map((user, index) => (
                      <TableRow key={index} user={user} />
                    ))}
                </tbody>
              </table>
            </div>
            {updatedAbsenteeData?.length > itemsPerPage && (
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
      )}
    </>
  );
};
