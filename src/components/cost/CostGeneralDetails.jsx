import React from "react";
import clsx from "clsx";
import { getStatusColor, getCostStageIcon } from "../../utils";
import "../Pagination.css";
import { format } from "date-fns";
import moment from "moment";
import { BiCommentDetail } from "react-icons/bi";
import { IoMdAttach } from "react-icons/io";
import { TbCalendarDollar, TbCalendarTime, TbSubtask } from "react-icons/tb";
import { BsPeopleFill } from "react-icons/bs";
import { GrProjects } from "react-icons/gr";
import { FaCalendarCheck, FaCalendarTimes, FaEdit } from "react-icons/fa";
import { RiFolderAddLine } from "react-icons/ri";

export const CostGeneralDetails = ({
  cost,
  customDateFormat,
  usedCurrency,
}) => {
  return (
    <div className="w-full md:p-5 p-1 bg-white">
      <div className="flex items-center gap-5 mb-7">
        <div
          className={clsx(
            "flex items-center text-left text-xs md:text-sm font-semibold gap-1 px-2 py-1 rounded-full",
            getStatusColor(cost?.Stage)
          )}
        >
          <div>{getCostStageIcon(cost?.Stage)}</div>
          <span className="uppercase">{cost?.Stage}</span>
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
            {moment(cost?.CreatedOn).fromNow()}
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
            {moment(cost?.UpdatedOn).fromNow()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 border-b border-gray-200 text-gray-600 text-xs md:text-sm">
        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <TbCalendarTime className="text-lg" />
            <span className="hidden md:block font-semibold">Invoice On :</span>
          </div>
          <p className="text-black font-bold">
            {cost?.CostDate
              ? format(new Date(cost.CostDate), customDateFormat)
              : ""}
          </p>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <TbCalendarDollar className="text-lg" />
            <span className="hidden md:block font-semibold">Paid On :</span>
          </div>
          <p className="text-black font-bold">
            {cost?.PayDate
              ? format(new Date(cost.PayDate), customDateFormat)
              : ""}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 border-b border-gray-200 text-gray-600 text-xs md:text-sm">
        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <BsPeopleFill className="text-sm" />
            <span className="hidden md:block font-semibold">Assignees :</span>
          </div>
          <span className="text-black font-bold">
            {cost?.costdb_assignee?.length}
          </span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <TbSubtask className="text-sm" />
            <span className="hidden md:block font-semibold">Sub-Tasks :</span>
          </div>
          <span className="text-black font-bold">
            {cost?._count?.subtaskdb}
          </span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <IoMdAttach className="text-sm" />
            <span className="hidden md:block font-semibold">Attachments :</span>
          </div>
          <span className="text-black font-bold">
            {cost?._count?.attachmentdb}
          </span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <BiCommentDetail className="text-lg" />
            <span className="hidden md:block font-semibold">Comments :</span>
          </div>
          <span className="text-black font-bold">
            {cost?._count?.commentdb}
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 px-4 md:py-1 py-4 border-b border-gray-200 text-gray-600 text-xs md:text-sm">
        <div className="flex flex-row gap-2 md:flex-col md:gap-0 2xl:flex-row 2xl:gap-2 2xl:py-4">
          <span className="font-semibold">Category :</span>
          <span
            className={clsx(
              "text-black font-bold w-fit px-2 py-0 rounded-full"
            )}
          >
            {cost?.Category}
          </span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex flex-row gap-2 md:flex-col md:gap-0 2xl:flex-row 2xl:gap-2 2xl:py-4">
            <span className="font-semibold">Service Provider :</span>
            <span
              className={clsx(
                "text-black font-bold w-fit px-2 py-0 rounded-full"
              )}
            >
              {cost?.ServiceProvider}
            </span>
          </div>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex flex-row gap-2 md:flex-col md:gap-0 2xl:flex-row 2xl:gap-2 2xl:py-4">
            <span className="font-semibold">Amount :</span>
            <span
              className={clsx(
                "text-black font-bold w-fit px-2 py-0 rounded-full"
              )}
            >
              {usedCurrency +
                Number(cost?.CostAmount).toLocaleString("EN-AU", {
                  maximumFractionDigits: 0,
                })}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 p-4 border-b border-gray-200 text-gray-600 text-xs md:text-sm">
        <div className="flex items-center justify-left gap-2 text-center font-bold">
          <GrProjects className="text-sm" />
          <span className="hidden md:block font-semibold">Project :</span>
        </div>
        <span className="text-black font-bold">
          {cost?.projectdb?.Description}
        </span>
      </div>
    </div>
  );
};
