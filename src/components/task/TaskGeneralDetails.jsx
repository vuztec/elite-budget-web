import React from "react";
import { ProgressBarComponent } from "@syncfusion/ej2-react-progressbar";
import clsx from "clsx";
import {
  PriorityIcon,
  getPriorityRatingColor,
  getStatusColor,
  getTaskEndDate,
  getTaskPlanPercentage,
  getTaskStageIcon,
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
import { TbSubtask } from "react-icons/tb";
import { BsPeopleFill } from "react-icons/bs";
import { GrProjects } from "react-icons/gr";
import {
  FaCalendarCheck,
  FaCalendarTimes,
  FaEdit,
  FaRegCalendarCheck,
  FaRegCalendarTimes,
} from "react-icons/fa";
import { RiFolderAddLine } from "react-icons/ri";

export const TaskGeneralDetails = ({ task, customDateFormat }) => {
  const actual = task?.ActualComplete ? task.ActualComplete : 0;
  const plan = getTaskPlanPercentage(task?.StartDate, task?.TaskDuration);

  return (
    <div className="w-full md:p-5 p-1 bg-white">
      <div className="flex items-center gap-5 mb-7">
        <div
          className={clsx(
            "flex gap-1 items-center text-xs md:text-sm font-semibold px-3 py-1 rounded-full",
            getPriorityRatingColor(task?.Priority)
          )}
        >
          <span>{PriorityIcon[task?.Priority]}</span>
          <span className="uppercase">{task?.Priority} Priority</span>
        </div>

        <div
          className={clsx(
            "flex items-center text-left text-xs md:text-sm font-semibold gap-1 px-2 py-1 rounded-full",
            getStatusColor(task?.Stage)
          )}
        >
          <div>{getTaskStageIcon(task?.Stage)}</div>
          <span className="uppercase">{task?.Stage} Task</span>
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
            {moment(task?.CreatedOn).fromNow()}
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
            {moment(task?.UpdatedOn).fromNow()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 border-b border-gray-200 text-gray-600 text-xs md:text-sm">
        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <FaRegCalendarCheck className="text-sm" />
            <span className="hidden md:block font-semibold">Start Date :</span>
          </div>
          <p className="text-black font-bold">
            {task?.StartDate
              ? format(new Date(task.StartDate), customDateFormat)
              : ""}
          </p>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <FaRegCalendarTimes className="text-sm" />
            <span className="hidden md:block font-semibold">Due Date :</span>
          </div>
          <p className="text-black font-bold">
            {task?.StartDate
              ? format(
                  getTaskEndDate(task.StartDate, task.TaskDuration),
                  customDateFormat
                )
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
            {task?.taskdb_assignee?.length}
          </span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <TbSubtask className="text-sm" />
            <span className="hidden md:block font-semibold">Sub-tasks :</span>
          </div>
          <span className="text-black font-bold">
            {task?._count?.subtaskdb}
          </span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <IoMdAttach className="text-sm" />
            <span className="hidden md:block font-semibold">Attachments :</span>
          </div>
          <span className="text-black font-bold">
            {task?._count?.attachmentdb}
          </span>
        </div>

        <span className="text-gray-400">|</span>

        <div className="flex items-center justify-center space-x-1">
          <div className="flex items-center justify-center gap-1 ">
            <BiCommentDetail className="text-lg" />
            <span className="hidden md:block font-semibold">Comments :</span>
          </div>
          <span className="text-black font-bold">
            {task?._count?.commentdb}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1 p-4 border-b border-gray-200 text-gray-600 text-xs md:text-sm">
        <div className="flex items-center justify-left gap-2 text-center font-bold">
          <GrProjects className="text-sm" />
          <span className="hidden md:block font-semibold">Project :</span>
        </div>
        <span className="text-black font-bold">
          {task?.projectdb?.Description}
        </span>
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
