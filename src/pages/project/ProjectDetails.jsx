import useUserStore from "../../app/user";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { ProjectGeneralDetails } from "../../components/project/ProjectGeneralDetails";

import Button from "../../components/Button";
import { FaEye } from "react-icons/fa";
import clsx from "clsx";
import { themeColors } from "../../utils";
import { GrProjects } from "react-icons/gr";

export const ProjectDetails = () => {
  const { id } = useParams();
  const { user, root } = useUserStore();
  const [selectedProject, setSelectedProject] = useState();
  const [usedCurrency, setUsedCurrency] = useState();
  const [customDateFormat, setCustomDateFormat] = useState();
  const [selectedChatUsers, setSelectedChatUsers] = useState(null);
  const hasFin = true;
  const type = "project_id";

  const hasAdd = true;
  const hasEdit = true;
  const hasDel = true;

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
        </div>
      </div>
    </div>
  );
};
