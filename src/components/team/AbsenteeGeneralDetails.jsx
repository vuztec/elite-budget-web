import React from "react";
import clsx from "clsx";
import { themeColors, getInitials } from "../../utils";
import "../Pagination.css";
import { format, formatDate } from "date-fns";
import moment from "moment";
import { BiCommentDetail } from "react-icons/bi";
import { IoMdAttach } from "react-icons/io";
import { FaEdit, FaRegCalendarCheck, FaRegCalendarTimes } from "react-icons/fa";
import { RiFolderAddLine } from "react-icons/ri";

export const AbsenteeGeneralDetails = ({ absentee, customDateFormat }) => {
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
              {getInitials(absentee?.resourcesdb?.FullName)}
            </span>
          </div>
          <div className="flex flex-col items-start gap-0">
            <span>{absentee?.resourcesdb?.FullName}</span>
            <span className="text-xs italic">
              {absentee?.resourcesdb?.Designation}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3"></div>
      </div>

      <div className="flex items-center gap-4 p-4 border-y border-gray-200 text-gray-600 text-xs md:text-sm">
        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <RiFolderAddLine className="text-sm" />
            <span className="hidden md:block font-semibold">Added :</span>
          </div>
          <p className="text-black font-bold">
            {moment(absentee?.CreatedOn).fromNow()}
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
            {moment(absentee?.UpdatedOn).fromNow()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 border-b border-gray-200 text-gray-600 text-xs md:text-sm">
        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <FaRegCalendarTimes className="text-sm" />
            <span className="hidden md:block font-semibold">Start Date :</span>
          </div>
          <p className="text-black font-bold">
            {absentee?.StartDate
              ? formatDate(new Date(absentee.StartDate), customDateFormat)
              : ""}
          </p>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <FaRegCalendarCheck className="text-sm" />
            <span className="hidden md:block font-semibold">Last Date :</span>
          </div>
          <p className="text-black font-bold">
            {absentee?.EndDate
              ? formatDate(new Date(absentee.EndDate), customDateFormat)
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
            {absentee?._count?.attachmentdb}
          </span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <BiCommentDetail className="text-lg" />
            <span className="hidden md:block font-semibold">Comments :</span>
          </div>
          <span className="text-black font-bold">
            {absentee?._count?.commentdb}
          </span>
        </div>
      </div>
    </div>
  );
};
