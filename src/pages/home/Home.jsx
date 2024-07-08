import React, { useEffect, useState } from "react";
import Loading from "../../components/Loader";
import useUserStore from "../../app/user";
import { LatestProjects, LatestResources, LatestTasks } from "../../components/home";
import { ProjectCostChart, StageChart } from "../../components/project";
import { CurrentAbsentees } from "../../components/setting";
import { getAbsentees, getCosts, getProjects, getResources, getTasks } from "../../config/api";
import { useQuery } from "react-query";
import { getActiveAccount } from "../../utils/permissions";
import Package from "../../package/Package";

export const Home = () => {
  const { user, root } = useUserStore();
  const usedCurrency = root?.Currency ? root?.Currency : "$";
  const customDateFormat = root?.DateFormat ? root?.DateFormat : "MMM dd, yyyy";
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [updatedProjectData, setUpdatedProjectData] = useState([]);
  const [updatedCostData, setUpdatedCostData] = useState([]);
  const [updatedTaskData, setUpdatedTaskData] = useState([]);
  const [updatedAbsenteeData, setUpdatedAbsenteeData] = useState([]);
  const activeAccount = getActiveAccount(root);

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

  const { data: resourceData, status: isResourceLoaded } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
    staleTime: 1000 * 60 * 60,
  });

  const { data: costData, status: isCostLoaded } = useQuery({
    queryKey: ["costs"],
    queryFn: getCosts,
    staleTime: 1000 * 60 * 60,
  });

  const { data: absenteeData, status: isAbsenteeLoaded } = useQuery({
    queryKey: ["absentees"],
    queryFn: getAbsentees,
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (
      isProjectLoaded === "success" &&
      isAbsenteeLoaded === "success" &&
      isResourceLoaded === "success" &&
      isCostLoaded === "success" &&
      isTaskLoaded === "success"
    ) {
      const sub = root?.subscriptions?.[0];
      if (sub?.Payment && !sub?.Is_Expired) {
        setUpdatedProjectData(projectData);
        setUpdatedCostData(costData);
        setUpdatedTaskData(taskData);
        setUpdatedAbsenteeData(absenteeData);
      } else {
        setUpdatedProjectData([]);
        setUpdatedCostData([]);
        setUpdatedTaskData([]);
        setUpdatedAbsenteeData([]);
      }

      setIsDataLoaded(true);
    }
  }, [
    absenteeData,
    isAbsenteeLoaded,
    projectData,
    taskData,
    costData,
    resourceData,
    isCostLoaded,
    isTaskLoaded,
    isProjectLoaded,
    isResourceLoaded,
    user,
  ]);

  const uniqueProjectIDs = [...new Set(updatedProjectData?.map((item) => (item.id ? item.id : "")))];

  return !isDataLoaded ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <>
      {isDataLoaded &&
        (activeAccount ? (
          <div className="flex flex-col h-full py-5 gap-10">
            <div className="w-full flex flex-col xl:flex-row gap-5">
              <StageChart updatedProjectData={updatedProjectData} />
              <ProjectCostChart
                updatedProjectData={updatedProjectData}
                updatedCostData={updatedCostData}
                uniqueProjectIDs={uniqueProjectIDs}
                usedCurrency={usedCurrency}
              />
            </div>

            <div className="w-full flex flex-col xl:flex-row gap-5">
              <LatestProjects
                updatedProjectData={updatedProjectData}
                usedCurrency={usedCurrency}
                updatedCostData={updatedCostData}
                updatedTaskData={updatedTaskData}
                customDateFormat={customDateFormat}
              />
            </div>
            <div className="w-full flex flex-col 2xl:flex-row gap-5">
              <CurrentAbsentees resourceData={resourceData} updatedAbsenteeData={updatedAbsenteeData} customDateFormat={customDateFormat} />
              <LatestResources resourceData={resourceData} />
            </div>
            <div className="w-full flex flex-col xl:flex-row gap-5">
              <LatestTasks updatedProjectData={updatedProjectData} updatedTaskData={updatedTaskData} resourceData={resourceData} />
            </div>
          </div>
        ) : (
          <Package />
        ))}
    </>
  );
};
