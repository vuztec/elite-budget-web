import React from "react";
import { ProgressBarComponent } from "@syncfusion/ej2-react-progressbar";
import clsx from "clsx";
import {
  getActualProjectPercentageComplete,
  getPlanProjectPercentageComplete,
  getStageIcon,
  getStatusColor,
  progressBarColor,
  progressBarColorPlan,
  trackBarColor,
  trackBarColorPlan,
} from "../../utils";
import "../Pagination.css";
import { format } from "date-fns";
import moment from "moment";
import { BiCommentDetail } from "react-icons/bi";
import { IoMdAttach } from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";
import { FaCalendarCheck, FaCalendarTimes, FaEdit } from "react-icons/fa";
import { RiFolderAddLine, RiFolderWarningLine } from "react-icons/ri";
import { GoThumbsup } from "react-icons/go";
import {
  MdOutlinePublishedWithChanges,
  MdOutlineTask,
  MdPendingActions,
} from "react-icons/md";
import { AiOutlineIssuesClose } from "react-icons/ai";

export const ProjectGeneralDetails = ({
  project,
  customDateFormat,
  usedCurrency,
  taskData,
  projectID,
  hasFin,
}) => {
  const actual = getActualProjectPercentageComplete(taskData, projectID)
    ? getActualProjectPercentageComplete(taskData, projectID)
    : 0;
  const plan = getPlanProjectPercentageComplete(taskData, projectID)
    ? getPlanProjectPercentageComplete(taskData, projectID)
    : 0;

  return (
    <div className="w-full md:p-5 p-1 bg-white">
      <div className="flex items-center gap-5 mb-7">
        <div
          className={clsx(
            "flex items-center text-left text-xs md:text-sm font-semibold gap-1 px-2 py-1 rounded-full",
            getStatusColor(project?.ProjectStage)
          )}
        >
          <div>{getStageIcon(project?.ProjectStage)}</div>
          <span className="uppercase">{project?.ProjectStage} Project</span>
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
            {moment(project?.CreatedOn).fromNow()}
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
            {moment(project?.UpdatedOn).fromNow()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 border-b border-gray-200 text-gray-600 text-xs md:text-sm">
        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <FaCalendarCheck className="text-sm" />
            <span className="hidden md:block font-semibold">Start Date :</span>
          </div>
          <p className="text-black font-bold">
            {project?.StartDate
              ? format(new Date(project.StartDate), customDateFormat)
              : ""}
          </p>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <FaCalendarTimes className="text-sm" />
            <span className="hidden md:block font-semibold">Due Date :</span>
          </div>
          <p className="text-black font-bold">
            {project?.EndDate
              ? format(new Date(project.EndDate), customDateFormat)
              : ""}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 border-b border-gray-200 text-gray-600 text-xs md:text-sm">
        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <BsPeopleFill className="text-sm" />
            <span className="hidden lg:block font-semibold">
              Administrators :
            </span>
          </div>
          <span className="text-black font-bold">
            {project?.projectdb_admin?.length}
          </span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <BsPeopleFill className="text-sm" />
            <span className="hidden lg:block font-semibold">Managers :</span>
          </div>
          <span className="text-black font-bold">
            {project?.projectdb_manager?.length}
          </span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <IoMdAttach className="text-sm" />
            <span className="hidden lg:block font-semibold">Attachments :</span>
          </div>
          <span className="text-black font-bold">
            {project?._count?.attachmentdb}
          </span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <BiCommentDetail className="text-lg" />
            <span className="hidden lg:block font-semibold">Comments :</span>
          </div>
          <span className="text-black font-bold">
            {project?._count?.commentdb}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 border-b border-gray-200 text-gray-600 text-xs md:text-sm">
        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <MdOutlineTask className="text-sm" />
            <span className="hidden lg:block font-semibold">Tasks :</span>
          </div>
          <span className="text-black font-bold">
            {project?._count?.taskdb}
          </span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <RiFolderWarningLine className="text-sm" />
            <span className="hidden lg:block font-semibold">Risks :</span>
          </div>
          <span className="text-black font-bold">
            {project?._count?.riskdb}
          </span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <AiOutlineIssuesClose className="text-sm" />
            <span className="hidden lg:block font-semibold">Issues :</span>
          </div>
          <span className="text-black font-bold">
            {project?._count?.issuedb}
          </span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <MdPendingActions className="text-lg" />
            <span className="hidden lg:block font-semibold">Actions :</span>
          </div>
          <span className="text-black font-bold">
            {project?._count?.actiondb}
          </span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <MdOutlinePublishedWithChanges className="text-lg" />
            <span className="hidden lg:block font-semibold">Changes :</span>
          </div>
          <span className="text-black font-bold">
            {project?._count?.changesdb}
          </span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <GoThumbsup className="text-lg" />
            <span className="hidden lg:block font-semibold">Decisions :</span>
          </div>
          <span className="text-black font-bold">
            {project?._count?.decisiondb}
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 px-4 md:py-1 py-4 border-b border-gray-200 text-gray-600 text-xs md:text-sm">
        <div className="flex flex-row gap-2 md:flex-col md:gap-0 2xl:flex-row 2xl:gap-2 2xl:py-4">
          <span className="font-semibold">Portfolio :</span>
          <span
            className={clsx(
              "text-black font-bold w-fit px-0 py-0 rounded-full"
            )}
          >
            {project?.Portfolio}
          </span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex flex-row gap-2 md:flex-col md:gap-0 2xl:flex-row 2xl:gap-2 2xl:py-4">
            <span className="font-semibold">Programme :</span>
            <span
              className={clsx(
                "text-black font-bold w-fit px-0 py-0 rounded-full"
              )}
            >
              {project?.Programme}
            </span>
          </div>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex flex-row gap-2 md:flex-col md:gap-0 2xl:flex-row 2xl:gap-2 2xl:py-4">
            <span className="font-semibold">Type :</span>
            <span
              className={clsx(
                "text-black font-bold w-fit px-0 py-0 rounded-full"
              )}
            >
              {project?.Type}
            </span>
          </div>
        </div>

        {hasFin && (
          <>
            <span className="text-gray-400">|</span>
            <div className="flex items-center justify-center space-x-1">
              <div className="flex flex-row gap-2 md:flex-col md:gap-0 2xl:flex-row 2xl:gap-2 2xl:py-4">
                <span className="font-semibold">Budget :</span>
                <span
                  className={clsx(
                    "text-black font-bold w-fit px-0 py-0 rounded-full"
                  )}
                >
                  {usedCurrency +
                    Number(project?.Budget).toLocaleString("EN-AU", {
                      maximumFractionDigits: 0,
                    })}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="w-full flex flex-col md:flex-row gap-2 p-2 border-b border-gray-200 text-gray-600 text-xs md:text-sm">
        <div className="w-full flex flex-col items-start justify-left gap-0">
          <div className="flex items-center justify-left px-3 gap-2 text-center font-bold">
            <span className="font-semibold">Actual % :</span>
            <span className="text-black font-bold">{actual}%</span>
          </div>
          <div className="text-black font-bold">
            <ProgressBarComponent
              id="actual"
              width="100%"
              height="100%"
              type="Linear"
              textAlignment="End"
              segmentCount={10}
              minimum={0}
              maximum={100}
              value={actual}
              trackColor={trackBarColor}
              progressColor={progressBarColor}
              trackThickness={30}
              progressThickness={30}
              animation={{ enable: true, duration: 2000, delay: 0 }}
            ></ProgressBarComponent>
          </div>
        </div>
        <div className="w-full flex flex-col items-start justify-left gap-0">
          <div className="flex items-center justify-left px-3 gap-2 text-center font-bold">
            <span className="font-semibold">Plan % :</span>
            <span className="text-black font-bold">{plan}%</span>
          </div>
          <div className="text-black font-bold">
            <ProgressBarComponent
              id="plan"
              width="100%"
              height="100%"
              type="Linear"
              textAlignment="Center"
              segmentCount={10}
              minimum={0}
              maximum={100}
              value={plan}
              trackColor={trackBarColorPlan}
              progressColor={progressBarColorPlan}
              trackThickness={30}
              progressThickness={30}
              animation={{ enable: true, duration: 2000, delay: 0 }}
            ></ProgressBarComponent>
          </div>
        </div>
      </div>
    </div>
  );
};
