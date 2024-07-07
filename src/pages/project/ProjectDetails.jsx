import useUserStore from "../../app/user";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAttachments, getComments, getCosts, getCurrency, getDateFormat, getProjects, getTasks } from "../../config/api";
import { useQuery } from "react-query";
import { ProjectGeneralDetails } from "../../components/project/ProjectGeneralDetails";
import { Administrators } from "../../components/administrator/Administrators";
import { Managers } from "../../components/manager/Managers";
import { Attachments } from "../../components/attachment/Attachments";
import { Comments } from "../../components/comment/Comment";
import Button from "../../components/Button";
import { FaEye } from "react-icons/fa";
import clsx from "clsx";
import { themeColors } from "../../utils";
import { GrProjects } from "react-icons/gr";
import { getProjectChatUsers } from "../../utils/users";
import { getSuperProjectPermission, getEditProjectPermission, getFinancialPermission } from "../../utils/permissions";
import { Stakeholders } from "../../components/stakeholder/Stakeholders";

export const ProjectDetails = () => {
  const { id } = useParams();
  const { user, root } = useUserStore();
  const [selectedProject, setSelectedProject] = useState();
  const [usedCurrency, setUsedCurrency] = useState();
  const [customDateFormat, setCustomDateFormat] = useState();
  const [selectedChatUsers, setSelectedChatUsers] = useState(null);
  const hasFin = getFinancialPermission(user);
  const type = "project_id";

  const { data: projectData, status: isProjectLoaded } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 1000 * 60 * 60,
  });
  const { data: taskData, status: isTaskLoaded } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    staleTime: 1000 * 60 * 60,
  });

  const { data: costData, status: isCostLoaded } = useQuery({
    queryKey: ["costs"],
    queryFn: getCosts,
    staleTime: 1000 * 60 * 60,
  });

  const { data: dateFormatData, status: isDateFormatLoaded } = useQuery({
    queryKey: ["dateformat"],
    queryFn: getDateFormat,
    staleTime: 1000 * 60 * 60,
  });
  const { data: currencyData, status: isCurrencyLoaded } = useQuery({
    queryKey: ["currency"],
    queryFn: getCurrency,
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

  const hasAdd = getSuperProjectPermission(user);
  const hasEdit = getEditProjectPermission(user, selectedProject);
  const hasDel = getSuperProjectPermission(user);

  useEffect(() => {
    if (
      isProjectLoaded === "success" &&
      isDateFormatLoaded === "success" &&
      isCostLoaded === "success" &&
      isCurrencyLoaded === "success" &&
      isTaskLoaded === "success" &&
      isAttachmentLoaded === "success" &&
      isCommentsLoaded === "success"
    ) {
      const project = projectData?.find((item) => item.id === parseInt(id));
      setSelectedProject(project);
      const targetFormatData = dateFormatData?.find((item) => item.UserID === user.id);
      const userDateFormat = targetFormatData ? targetFormatData.Format : "MMM dd, yyyy";
      setCustomDateFormat(userDateFormat);

      const targetCurrencyData = currencyData.find((item) => item.RootID === user.RootID);
      const userCurrencyFormat = targetCurrencyData ? targetCurrencyData.Currency : "$";
      setUsedCurrency(userCurrencyFormat);

      const chatUsers = getProjectChatUsers(project, taskData, costData, project.id, user);
      setSelectedChatUsers(() => chatUsers);
    }
  }, [
    taskData,
    isTaskLoaded,
    projectData,
    isProjectLoaded,
    dateFormatData,
    isDateFormatLoaded,
    isAttachmentLoaded,
    isCommentsLoaded,
    isCostLoaded,
    id,
  ]);

  const navigate = useNavigate();
  const viewAllClick = () => {
    navigate("/projects?name=projects&tab=2");
  };

  return (
    <div className="w-full flex flex-col gap-3 mb-4 overflow-y-hidden">
      <div className="flex items-center justify-between">
        <span className="flex items-center justify-left gap-2 text-sm md:text-2xl text-center">
          <GrProjects /> {selectedProject?.Description}
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
          <ProjectGeneralDetails
            project={selectedProject}
            customDateFormat={customDateFormat}
            usedCurrency={usedCurrency}
            taskData={taskData}
            projectID={parseInt(id)}
            hasAdd={hasAdd}
            hasEdit={hasEdit}
            hasDel={hasDel}
            hasFin={hasFin}
          />
          <Managers
            managers={selectedProject?.projectdb_manager}
            type={type}
            itemID={parseInt(id)}
            itemData={selectedProject}
            hasAdd={hasAdd}
            hasEdit={hasEdit}
            hasDel={hasDel}
          />
        </div>

        <div className="w-full h-full flex flex-col xl:flex-row gap-5">
          <Administrators
            administrators={selectedProject?.projectdb_admin}
            type={type}
            query={"projects"}
            itemID={parseInt(id)}
            itemData={selectedProject}
            hasAdd={hasAdd}
            hasEdit={hasEdit}
            hasDel={hasDel}
          />

          <Stakeholders
            stakeholders={selectedProject?.projectdb_stakeholder}
            type={type}
            query={"projects"}
            itemID={parseInt(id)}
            itemData={selectedProject}
            hasAdd={hasAdd}
            hasEdit={hasEdit}
            hasDel={hasDel}
          />
        </div>

        <div className="w-full h-full flex flex-col xl:flex-row gap-5">
          <Comments
            comments={comments}
            type={type}
            itemID={parseInt(id)}
            query={"projects"}
            hasAdd={hasAdd}
            hasEdit={hasEdit}
            hasDel={hasDel}
            chatUsers={selectedChatUsers}
          />
          <Attachments
            attachments={attachments}
            type={type}
            query={"projects"}
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
