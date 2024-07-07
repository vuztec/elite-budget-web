import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Title from "../Title";
import Button from "../Button";
import { MdOutlineTask } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import moment from "moment";
import {
  BGS,
  getPriorityRatingColor,
  getProjectName,
  themeColors,
} from "../../utils";
import { useNavigate } from "react-router-dom";
import "../Pagination.css";
import clsx from "clsx";
import { GrProjects } from "react-icons/gr";
import { UserInfo } from "../team";

export const LatestTasks = ({
  updatedProjectData,
  resourceData,
  updatedTaskData,
}) => {
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;
  const pagesVisited = pageNumber * itemsPerPage;
  const navigate = useNavigate();

  const viewAllClick = () => {
    navigate("/tasks?name=tasks&tab=2");
  };

  const TableRow = ({ record }) => (
    <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-400/10">
      <td className="py-2">
        <div className="flex flex-col md:flex-row items-center gap-5 text-green-900">
          <div
            className={`${getPriorityRatingColor(
              record.Priority
            )} w-32 h-16 md:w-32 md:h-32 rounded-md md:rounded-full flex items-center justify-center`}
          >
            <span className="flex flex-col items-center justify-center text-xl md:text-xl text-center">
              <MdOutlineTask className="text-2xl md:text-5xl" />{" "}
              {record.Priority}
            </span>
          </div>
          <div className="flex flex-col items-start justify-center text-sm">
            <span className="flex items-center justify-left gap-3  border-b border-gray-200 text-xl md:text-xl text-center mb-2 font-bold text-gray-600 uppercase">
              <GrProjects className="text-lg" /> {record.projectdb.Description}
            </span>
            <span className="text-lg md:text-lg text-center">
              {record.Description}
            </span>
            <div className="border-t border-gray-200 flex flex-col mt-3">
              <span className="flex items-center justify-left gap-3 text-sm xl:text-[16px] text-left text-blue-950 font-bold py-1">
                <MdPerson className="text-2xl" />
                <div className="flex">
                  {record?.taskdb_assignee?.map((m, index) => (
                    <div
                      key={index}
                      className={clsx(
                        "w-7 h-7 rounded-full flex items-center justify-center mr-0",
                        BGS[index % BGS?.length]
                      )}
                    >
                      <UserInfo user={m} />
                    </div>
                  ))}
                </div>
              </span>
              <span className="text-sm md:text-lg text-left text-gray-500 font-semibold italic">
                Added: {moment(record?.CreatedOn).fromNow()}
              </span>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );

  const pageCount = Math.ceil(updatedTaskData?.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      {updatedTaskData?.length > 0 && (
        <>
          <div className="flex flex-col w-full gap-2 shadow-md rounded bg-white">
            <div className="flex items-center justify-between px-2 pt-3 md:px-5 ">
              <div className="flex items-center gap-2">
                <MdOutlineTask
                  className={`text-2xl text-[${themeColors[1]}]`}
                />
                <Title title="  Latest Tasks" />
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

            <div className="h-fit bg-[whitesmoke] m-5 px-1 md:px-5 py-2 shadow-md rounded">
              <div className="overflow-x-auto">
                <table className="w-full mb-5">
                  {/* <TableHeader /> */}
                  <tbody>
                    {updatedTaskData
                      ?.slice(pagesVisited, pagesVisited + itemsPerPage)
                      .map((record, index) => (
                        <TableRow key={index} record={record} />
                      ))}
                  </tbody>
                </table>
              </div>
              {updatedTaskData?.length > itemsPerPage && (
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
