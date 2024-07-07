import React from "react";
import clsx from "clsx";
import {
  PriorityIcon,
  getStatusColor,
  getPriorityRatingColor,
  themeColors,
  getInitials,
} from "../../utils";
import "../Pagination.css";
import { format } from "date-fns";
import moment from "moment";
import { BiCommentDetail } from "react-icons/bi";
import { IoMdAttach } from "react-icons/io";
import { TbSubtask } from "react-icons/tb";
import { BsPeopleFill } from "react-icons/bs";
import { GrProjects } from "react-icons/gr";
import { FaEdit, FaPhoneSquare, FaRegCalendarTimes } from "react-icons/fa";
import { RiFolderAddLine } from "react-icons/ri";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { MdEmail } from "react-icons/md";

export const ResourceGeneralDetails = ({ resource, customDateFormat }) => {
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
              {getInitials(resource?.FullName)}
            </span>
          </div>
          <div className="flex flex-col items-start gap-0">
            <span>{resource?.FullName}</span>
            <span className="text-xs italic">{resource?.Designation}</span>
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
            {moment(resource?.CreatedOn).fromNow()}
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
            {moment(resource?.UpdatedOn).fromNow()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 border-b border-gray-200 text-gray-600 text-xs md:text-sm">
        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <LiaBirthdayCakeSolid className="text-sm" />
            <span className="hidden md:block font-semibold">
              Date of Birth :
            </span>
          </div>
          <p className="text-black font-bold">
            {resource?.DateOfBirth
              ? format(new Date(resource.DateOfBirth), customDateFormat)
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
            {resource?._count?.attachmentdb}
          </span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <BiCommentDetail className="text-lg" />
            <span className="hidden md:block font-semibold">Comments :</span>
          </div>
          <span className="text-black font-bold">
            {resource?._count?.commentdb}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 border-b border-gray-200 text-gray-600 text-xs md:text-sm">
        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <MdEmail className="text-sm" />
            <span className="hidden md:block font-semibold">Email :</span>
          </div>
          <span className="text-black font-bold">{resource?.Email}</span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <FaPhoneSquare className="text-sm" />
            <span className="hidden md:block font-semibold">Tel :</span>
          </div>
          <span className="text-black font-bold">{resource?.Telephone}</span>
        </div>
      </div>

      <div className="flex items-center gap-1 p-4 border-b border-gray-200 text-gray-600 text-xs md:text-sm">
        <div className="flex items-center justify-left gap-2 text-center font-bold">
          <GrProjects className="text-sm" />
          <span className="hidden md:block font-semibold">Company :</span>
        </div>
        <span className="text-black font-bold">{resource?.Company}</span>
      </div>
      <div className="flex items-center gap-4 lg:gap-10 p-4 border-b border-gray-200 text-gray-600 text-xs md:text-sm">
        <div className="flex items-center gap-3">
          <div
            className={clsx(
              "w-9 h-9 rounded-full text-white flex items-center justify-center text-sm",
              `bg-[${themeColors[0]}]`
            )}
          >
            <span className="text-xs md:text-sm text-center">
              {getInitials(resource?.Manager)}
            </span>
          </div>
          <div className="flex flex-col items-start gap-0">
            <span>{resource?.Manager}</span>
            <span className="text-xs italic">{resource?.Department}</span>
          </div>
        </div>
        <span className="text-gray-400">|</span>
        <div className="flex flex-col items-start gap-0">
          <div className="flex gap-3 items-center text-left">
            <FaPhoneSquare className={`text-[${themeColors[1]}]`} />
            <p className="text-black"> {resource?.ManagerTel}</p>
          </div>
          <div className="flex gap-3 items-center text-left">
            <MdEmail />
            <span className="text-black">{resource?.ManagerEmail}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
