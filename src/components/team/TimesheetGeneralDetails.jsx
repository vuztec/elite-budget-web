import React from "react";
import clsx from "clsx";
import { themeColors, getInitials } from "../../utils";
import "../Pagination.css";
import { format, formatDate } from "date-fns";
import moment from "moment";
import { BiCommentDetail } from "react-icons/bi";
import { IoMdAttach } from "react-icons/io";
import { GrProjects } from "react-icons/gr";
import {
  FaEdit,
  FaRegCalendarCheck,
  FaRegCalendarPlus,
  FaRegClock,
} from "react-icons/fa";
import { RiFolderAddLine } from "react-icons/ri";

export const TimesheetGeneralDetails = ({ timesheet, customDateFormat }) => {
  return (
    <div className="w-full md:p-5 p-1 bg-white">
      <div className="flex items-center gap-5 mb-7">
        <div className="flex items-center gap-3">
          <div
            className={clsx(
              "w-9 h-9 rounded-full text-white flex items-center justify-center text-sm",
              `bg-[${themeColors[0]}]`
            )}
          >
            <span className="text-xs md:text-sm text-center">
              {getInitials(timesheet?.resourcesdb?.FullName)}
            </span>
          </div>
          <div className="flex flex-col items-start gap-0">
            <span>{timesheet?.resourcesdb?.FullName}</span>
            <span className="text-xs italic">
              {timesheet?.resourcesdb?.Designation}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 border-y border-gray-200 text-gray-600 text-xs md:text-sm">
        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <RiFolderAddLine className="text-sm" />
            <span className="hidden md:block font-semibold">Added :</span>
          </div>
          <p className="text-black font-bold">
            {moment(timesheet?.CreatedOn).fromNow()}
          </p>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <FaEdit className="text-sm" />
            <span className="hidden md:block font-semibold">
              Last Updated :
            </span>
          </div>
          <p className="text-black font-bold">
            {moment(timesheet?.UpdatedOn).fromNow()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 border-b border-gray-200 text-gray-600 text-xs md:text-sm">
        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <FaRegCalendarPlus className="text-sm" />
            <span className="hidden md:block font-semibold">Rec Date :</span>
          </div>
          <p className="text-black font-bold">
            {timesheet?.RecDate
              ? formatDate(new Date(timesheet.RecDate), customDateFormat)
              : ""}
          </p>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <FaRegCalendarCheck className="text-sm" />
            <span className="hidden md:block font-semibold">Approved On:</span>
          </div>
          <p className="text-black font-bold">
            {timesheet?.ApprovedDate
              ? formatDate(new Date(timesheet.ApprovedDate), customDateFormat)
              : ""}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 border-b border-gray-200 text-gray-600 text-xs md:text-sm">
        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <IoMdAttach className="text-sm" />
            <span className="hidden md:block font-semibold">Documents :</span>
          </div>
          <span className="text-black font-bold">
            {timesheet?._count?.attachmentdb}
          </span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <BiCommentDetail className="text-lg" />
            <span className="hidden md:block font-semibold">Comments :</span>
          </div>
          <span className="text-black font-bold">
            {timesheet?._count?.commentdb}
          </span>
        </div>
        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <FaRegClock className="text-lg" />
            <span className="hidden md:block font-semibold">Hours :</span>
          </div>
          <span className="text-black font-bold">{timesheet?.Hours}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 p-4 border-b border-gray-200 text-gray-600 text-xs md:text-sm">
        <div className="flex items-center justify-left gap-2 text-center font-bold">
          <GrProjects className="text-sm" />
          <span className="hidden md:block font-semibold">Project :</span>
        </div>
        <span className="text-black font-bold">
          {timesheet?.projectdb?.Description}
        </span>
      </div>
    </div>
  );
};
