import useUserStore from "../../app/user";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAttachments, getComments, getDateFormat, getProjects, getTimesheets } from "../../config/api";
import { useQuery } from "react-query";
import { Attachments } from "../../components/attachment/Attachments";
import { Comments } from "../../components/comment/Comment";
import Button from "../../components/Button";
import { FaEye } from "react-icons/fa";
import clsx from "clsx";
import { themeColors } from "../../utils";
import { TimesheetGeneralDetails } from "../../components/team/TimesheetGeneralDetails";
import { TbCalendarDollar } from "react-icons/tb";
import { Approvers } from "../../components/approver/Approvers";
import { getAddTimesheetPermission, getDeleteTimesheetPermission, getEditTimesheetPermission } from "../../utils/permissions";
import { getTimesheetChatUsers } from "../../utils/users";

export const TimesheetDetails = () => {
  const { id } = useParams();
  const { user, root } = useUserStore();
  const [selectedTimesheet, setSelectedTimesheet] = useState();
  const [customDateFormat, setCustomDateFormat] = useState();
  const [selectedChatUsers, setSelectedChatUsers] = useState(null);
  const type = "timesheet_id";

  const { data: projectData, status: isProjectLoaded } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 1000 * 60 * 60,
  });
  const { data: timesheetData, status: isTimesheetLoaded } = useQuery({
    queryKey: ["timesheets"],
    queryFn: getTimesheets,
    staleTime: 1000 * 60 * 60,
  });
  const { data: dateFormatData, status: isDateFormatLoaded } = useQuery({
    queryKey: ["dateformat"],
    queryFn: getDateFormat,
    staleTime: 1000 * 60 * 60,
  });
  const { data: attachments, status: isAttachmentLoaded } = useQuery({
    queryKey: ["attachments", type, parseInt(id)],
    queryFn: () => getAttachments(type, id),
    staleTime: 1000 * 60 * 10,
  });

  const { data: comments, status: isCommentsLoaded } = useQuery({
    queryKey: ["comments", type, parseInt(id)],
    queryFn: () => getComments(type, id),
    staleTime: 1000 * 60 * 10,
  });

  const hasAdd = getAddTimesheetPermission(user, projectData);
  const hasEdit = getEditTimesheetPermission(user, selectedTimesheet, projectData);
  const hasDel = getDeleteTimesheetPermission(user);

  useEffect(() => {
    if (
      isTimesheetLoaded === "success" &&
      isDateFormatLoaded === "success" &&
      isAttachmentLoaded === "success" &&
      isCommentsLoaded === "success"
    ) {
      const timesheet = timesheetData?.find((item) => item.id === parseInt(id));
      setSelectedTimesheet(timesheet);

      const targetFormatData = dateFormatData?.find((item) => item.UserID === user.id);
      const userDateFormat = targetFormatData ? targetFormatData.Format : "MMM dd, yyyy";
      setCustomDateFormat(userDateFormat);
      const chatUsers = getTimesheetChatUsers(projectData, selectedTimesheet, selectedTimesheet?.ProjectID, user);
      setSelectedChatUsers(chatUsers);
    }
  }, [timesheetData, isTimesheetLoaded, dateFormatData, isDateFormatLoaded, isAttachmentLoaded, isCommentsLoaded, id]);
  const navigate = useNavigate();
  const viewAllClick = () => {
    navigate("/timesheets?name=timesheets&tab=2");
  };

  console.log(selectedTimesheet, "selectedTimesheet");

  return (
    <div className="w-full flex flex-col gap-3 mb-4 overflow-y-hidden">
      <div className="flex items-center justify-between">
        <span className="flex items-center justify-left gap-2 text-sm md:text-2xl text-center">
          <TbCalendarDollar /> {selectedTimesheet?.Description}
        </span>
        <Button
          label="View All"
          icon={<FaEye className="text-sm md:text-lg" />}
          className={clsx(
            "flex flex-row-reverse gap-1 items-center text-white hover:bg-viewcolor rounded-full px-2 py-1",
            `bg-[${themeColors[1]}] hover:text-[${themeColors[1]}]`
          )}
          onClick={() => viewAllClick()}
        />
      </div>
      <div className="h-full w-full pt-3 flex flex-col gap-5">
        <div className="w-full flex flex-col xl:flex-row gap-5">
          <TimesheetGeneralDetails timesheet={selectedTimesheet} customDateFormat={customDateFormat} timesheetID={parseInt(id)} />
          <Approvers
            approvers={selectedTimesheet?.timesheetdb_approver}
            type={type}
            query="timesheets"
            itemID={parseInt(id)}
            itemData={selectedTimesheet}
            hasAdd={hasAdd}
            hasEdit={hasEdit}
            hasDel={hasDel}
            chatUsers={selectedChatUsers}
          />
        </div>

        <div className="w-full h-full flex flex-col xl:flex-row gap-5">
          <Comments
            comments={comments}
            type={type}
            itemID={parseInt(id)}
            query={"timesheets"}
            hasAdd={hasAdd}
            hasEdit={hasEdit}
            hasDel={hasDel}
            chatUsers={selectedChatUsers}
          />
          <Attachments
            attachments={attachments}
            type={type}
            query={"timesheets"}
            itemID={parseInt(id)}
            hasAdd={hasAdd}
            hasEdit={hasEdit}
            hasDel={hasDel}
            chatUsers={selectedChatUsers}
          />
        </div>
      </div>
    </div>
  );
};
