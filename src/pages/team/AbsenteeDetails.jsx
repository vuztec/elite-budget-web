import useUserStore from "../../app/user";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAttachments,
  getComments,
  getDateFormat,
  getAbsentees,
  getProjects,
  getResources,
} from "../../config/api";
import { useQuery } from "react-query";
import { Attachments } from "../../components/attachment/Attachments";
import { Comments } from "../../components/comment/Comment";
import Button from "../../components/Button";
import { FaEye, FaRegCalendarTimes } from "react-icons/fa";
import clsx from "clsx";
import { themeColors } from "../../utils";
import { IoPerson } from "react-icons/io5";
import { AbsenteeGeneralDetails } from "../../components/team/AbsenteeGeneralDetails";
import { getAbsenteeChatUsers } from "../../utils/users";
import {
  getAddAbsenteePermission,
  getEditAbsenteePermission,
} from "../../utils/permissions";

export const AbsenteeDetails = () => {
  const { id } = useParams();
  const { user, root } = useUserStore();
  const [selectedAbsentee, setSelectedAbsentee] = useState();
  const [customDateFormat, setCustomDateFormat] = useState();
  const [selectedChatUsers, setSelectedChatUsers] = useState(null);
  const type = "absentee_id";

  const { data: projectData } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 1000 * 60 * 60,
  });
  const { data: resourceData } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
    staleTime: 1000 * 60 * 60,
  });

  const { data: absenteeData, status: isAbsenteeLoaded } = useQuery({
    queryKey: ["absentees"],
    queryFn: getAbsentees,
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

  const hasAdd = getAddAbsenteePermission(user, projectData);
  const hasEdit = getEditAbsenteePermission(user, projectData);
  const hasDel = getAddAbsenteePermission(user, projectData);

  useEffect(() => {
    if (
      isAbsenteeLoaded === "success" &&
      isDateFormatLoaded === "success" &&
      isAttachmentLoaded === "success" &&
      isCommentsLoaded === "success"
    ) {
      const absentee = absenteeData?.find((item) => item.id === parseInt(id));
      setSelectedAbsentee(absentee);

      const targetFormatData = dateFormatData?.find(
        (item) => item.UserID === user.id
      );
      const userDateFormat = targetFormatData
        ? targetFormatData.Format
        : "MMM dd, yyyy";
      setCustomDateFormat(userDateFormat);
      const chatUsers = getAbsenteeChatUsers(resourceData, user);
      setSelectedChatUsers(chatUsers);
    }
  }, [
    absenteeData,
    isAbsenteeLoaded,
    dateFormatData,
    isDateFormatLoaded,
    isAttachmentLoaded,
    isCommentsLoaded,
    id,
  ]);
  const navigate = useNavigate();
  const viewAllClick = () => {
    navigate("/absentees?name=absentees&tab=2");
  };

  return (
    <div className="w-full flex flex-col gap-3 mb-4 overflow-y-hidden">
      <div className="flex items-center justify-between">
        <span className="flex items-center justify-left gap-2 text-sm md:text-2xl text-center">
          <FaRegCalendarTimes /> {selectedAbsentee?.Description}
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
          <AbsenteeGeneralDetails
            absentee={selectedAbsentee}
            customDateFormat={customDateFormat}
            absenteeID={parseInt(id)}
          />
          <Comments
            comments={comments}
            type={type}
            itemID={parseInt(id)}
            query={"absentees"}
            hasAdd={hasAdd}
            hasEdit={hasEdit}
            hasDel={hasDel}
            chatUsers={selectedChatUsers}
          />
        </div>

        <div className="w-full h-full flex flex-col xl:flex-row gap-5">
          <Attachments
            attachments={attachments}
            type={type}
            query={"absentees"}
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
