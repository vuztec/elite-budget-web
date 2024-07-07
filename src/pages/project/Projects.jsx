import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDateCalculator from "../../config/useDateCalculator";
import { FaList } from "react-icons/fa";
import { MdFilterAlt, MdFilterAltOff, MdGridView } from "react-icons/md";
import Button from "../../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../../components/Tabs";
import Loading from "../../components/Loader";
import { AddProject, ProjectBoardView, ProjectDashView, ProjectGanttView, ProjectListView } from "../../components/project";
import { useQuery } from "react-query";
import useUserStore from "../../app/user";
import { themeColors } from "../../utils";
import clsx from "clsx";
import socket from "../../utils/socket";
import { getCosts, getDateFormat, getProjects, getResources, getTasks } from "../../config/api";
import { BsBarChart } from "react-icons/bs";
import { dueDataSource, getUpdateProjectGridData, startDataSource } from "../../utils/filters";
import Select from "../../components/Select";
import { getActiveAccount, getAddProjectPermission } from "../../utils/permissions";
import Package from "../../package/Package";

const TABS = [
  { title: "Dashboard", icon: <BsBarChart /> },
  { title: "Grid View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
  // { title: "Gantt View", icon: <FaList /> },
];

const ProjectStages = ["Initiation", "Planning", "Execution", "Monitoring", "Closing", "On-Hold", "Cancelled"];

export const Projects = () => {
  const { user, root } = useUserStore();
  const dates = useDateCalculator();
  const usedCurrency = root.Currency ? root.Currency : "$";
  const [customDateFormat, setCustomDateFormat] = useState();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [updatedTaskData, setUpdatedTaskData] = useState([]);
  const [gridData, setGridData] = useState([]);
  const [updatedCostData, setUpdatedCostData] = useState([]);
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [updatedProjectData, setUpdatedProjectData] = useState([]);
  const activeAccount = getActiveAccount(root);

  // Filters
  const [portfolioFilter, setPortfolioFilter] = useState("All");
  const [programmeFilter, setProgrammeFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [stageFilter, setStageFilter] = useState("All");
  const [managerFilter, setManagerFilter] = useState(0);
  const [adminFilter, setAdminFilter] = useState(0);
  const [budgetFilter, setBudgetFilter] = useState("All");
  const [scheduleFilter, setScheduleFilter] = useState("All");
  const [dueDateFilter, setDueDateFilter] = useState("All");
  const [startDateFilter, setStartDateFilter] = useState("All");

  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const tab = searchParams.get("tab");

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

  const { data: dateFormatData, status: isDateFormatLoaded } = useQuery({
    queryKey: ["dateformat"],
    queryFn: getDateFormat,
    staleTime: 1000 * 60 * 60,
  });

  // console.log("data: ", projectData);

  ///-------------Filters Data Source --------------------------------///
  const stages = ProjectStages.map((stage) => ({ value: stage, label: stage }));
  const startDates = startDataSource.map((start) => ({
    value: start,
    label: start,
  }));
  const dueDates = dueDataSource.map((due) => ({ value: due, label: due }));
  const resources = useMemo(() => {
    return resourceData?.map((resource) => ({
      value: resource.id,
      label: resource.FullName,
    }));
  }, [resourceData]);

  const uniquePortfolios = [...new Set(projectData?.map((item) => (item.Portfolio ? item.Portfolio : "")))];
  const portfolios = uniquePortfolios.map((portfolio) => ({
    value: portfolio,
    label: portfolio,
  }));

  const uniqueProgrammes = [...new Set(projectData?.map((item) => (item.Programme ? item.Programme : "")))];
  const programmes = uniqueProgrammes.map((programme) => ({
    value: programme,
    label: programme,
  }));

  const uniqueTypes = [...new Set(projectData?.map((item) => (item.Type ? item.Type : "")))];
  const types = uniqueTypes.map((type) => ({
    value: type,
    label: type,
  }));
  ///-------------END Filters Data Source --------------------------------///

  useEffect(() => {
    if (name === "projects") setSelected(parseInt(tab));
  }, [name, tab]);

  useEffect(() => {
    if (
      isProjectLoaded === "success" &&
      isResourceLoaded === "success" &&
      isDateFormatLoaded === "success" &&
      isCostLoaded === "success" &&
      isTaskLoaded === "success"
    ) {
      const sub = root.subscriptions?.[0];
      if (sub?.Payment && !sub?.Is_Expired) {
        setUpdatedProjectData(projectData);
      } else {
        setUpdatedProjectData([]);
      }

      const targetFormatData = dateFormatData?.find((item) => item.UserID === user.id);
      const userDateFormat = targetFormatData ? targetFormatData.Format : "MMM dd, yyyy";
      setCustomDateFormat(userDateFormat);

      setIsDataLoaded(true);
    }
  }, [projectData, resourceData, dateFormatData, isCostLoaded, isTaskLoaded, isProjectLoaded, isResourceLoaded, isDateFormatLoaded, user]);

  useEffect(() => {
    const updatedData = getUpdateProjectGridData(
      updatedProjectData,
      taskData,
      costData,
      portfolioFilter,
      programmeFilter,
      typeFilter,
      stageFilter,
      managerFilter,
      adminFilter,
      budgetFilter,
      scheduleFilter,
      dueDateFilter,
      startDateFilter,
      dates
    );

    setGridData(updatedData);
  }, [
    updatedProjectData,
    portfolioFilter,
    programmeFilter,
    typeFilter,
    stageFilter,
    managerFilter,
    adminFilter,
    budgetFilter,
    scheduleFilter,
    dueDateFilter,
    startDateFilter,
    dates,
  ]);

  useEffect(() => {
    const uniqueProjectIDs = [...new Set(gridData?.map((item) => (item.id ? item.id : "")))];
    // Filter data based on unique project IDs
    const filteredCostData = costData?.filter((item) => uniqueProjectIDs.includes(item.ProjectID));
    const filteredTaskData = taskData?.filter((item) => uniqueProjectIDs.includes(item.ProjectID));

    // Set filtered data
    setUpdatedCostData(filteredCostData);
    setUpdatedTaskData(filteredTaskData);
  }, [gridData]);

  const handlePortfolioChange = (e) => {
    if (e && e.target?.value) {
      setPortfolioFilter(e.target?.value);
    }
  };
  const handleProgrammeChange = (e) => {
    if (e && e.target?.value) {
      setProgrammeFilter(e.target?.value);
    }
  };
  const handleTypeChange = (e) => {
    if (e && e.target?.value) {
      setTypeFilter(e.target?.value);
    }
  };
  const handleStageChange = (e) => {
    if (e && e.target?.value) {
      setStageFilter(e.target?.value);
    }
  };
  const handleManagerChange = (e) => {
    if (e && e.target?.value) {
      setManagerFilter(parseInt(e.target.value));
    }
  };
  const handleAdminChange = (e) => {
    if (e && e.target?.value) {
      setAdminFilter(parseInt(e.target.value));
    }
  };
  const handleBudgetChange = (e) => {
    if (e && e.target?.value) {
      setBudgetFilter(e.target?.value);
    }
  };
  const handleScheduleChange = (e) => {
    if (e && e.target?.value) {
      setScheduleFilter(e.target?.value);
    }
  };

  const handleStartDateChange = (e) => {
    if (e && e.target.value) {
      setStartDateFilter(e.target.value);
    }
  };

  const handleDueDateChange = (e) => {
    if (e && e.target.value) {
      setDueDateFilter(e.target.value);
    }
  };

  const addNewClick = () => {
    setOpen(true);
  };

  const [isShowing, setIsShowing] = useState(false);

  return activeAccount ? (
    <>
      <div className="w-full flex item-center justify-end">
        <div className="w-fit gap-4 h-10 md:h-12 px-2 rounded-full bg-white flex items-center">
          <div>
            <div className="text-sm">
              <Button
                label={!isShowing ? "Show Filters" : "Hide Filters"}
                icon={!isShowing ? <MdFilterAlt className="text-lg" /> : <MdFilterAltOff className="text-lg" />}
                className={clsx(
                  "flex flex-row-reverse gap-2 p-1 text-sm rounded-full items-center text-white ",
                  !isShowing ? "bg-green-800" : "bg-red-800"
                )}
                onClick={() => setIsShowing((old) => !old)}
              />
            </div>
          </div>
          {getAddProjectPermission(user) && projectData?.length < root.Projects && (
            <div className="text-sm">
              <Button
                label="Add New"
                icon={<IoMdAdd className="text-lg" />}
                className={clsx(
                  "flex flex-row-reverse gap-2 p-1 text-sm rounded-full items-center text-white hover:bg-viewcolor",
                  `bg-[${themeColors[1]}] hover:text-[${themeColors[1]}]`
                )}
                onClick={() => addNewClick()}
              />
            </div>
          )}
        </div>
      </div>
      <div
        className={clsx(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 pb-5",
          isShowing ? "block" : "hidden"
        )}
      >
        <div className="w-full">
          <Select
            onChange={handlePortfolioChange}
            value={portfolioFilter}
            options={portfolios}
            placeholder="All"
            label="Company/Portfolio"
            className="bg-white w-full py-1"
          />
        </div>
        <div className="w-full">
          <Select
            onChange={handleProgrammeChange}
            value={programmeFilter}
            options={programmes}
            placeholder="All"
            label="Department/Programme"
            className="bg-white w-full py-1"
          />
        </div>
        <div className="w-full">
          <Select
            onChange={handleStageChange}
            value={stageFilter}
            options={stages}
            placeholder="All"
            label="Project Stage"
            className="bg-white w-full py-1"
          />
        </div>
        <div className="w-full">
          <Select
            onChange={handleTypeChange}
            value={typeFilter}
            options={types}
            placeholder="All"
            label="Project Type"
            className="bg-white w-full py-1"
          />
        </div>
        <div className="w-full">
          <Select
            onChange={handleManagerChange}
            value={managerFilter}
            options={resources}
            placeholder="All"
            label="Project Manager"
            className="bg-white w-full py-1"
          />
        </div>
        <div className="w-full">
          <Select
            onChange={handleAdminChange}
            value={adminFilter}
            options={resources}
            placeholder="All"
            label="Project Administrator"
            className="bg-white w-full py-1"
          />
        </div>
        <div className="w-full">
          <Select
            onChange={handleBudgetChange}
            value={budgetFilter}
            options={[
              { value: "Within Budget", label: "Within Budget" },
              { value: "Over Budget", label: "Over Budget" },
            ]}
            placeholder="All"
            label="Budget Status"
            className="bg-white w-full py-1"
          />
        </div>
        <div className="w-full">
          <Select
            onChange={handleScheduleChange}
            value={scheduleFilter}
            options={[
              { value: "On-Track", label: "On-Track" },
              { value: "Delayed", label: "Delayed" },
            ]}
            placeholder="All"
            label="Schedule Status"
            className="bg-white w-full py-1"
          />
        </div>
        <div className="w-full">
          <Select
            onChange={handleStartDateChange}
            value={startDateFilter}
            options={startDates}
            placeholder="All"
            label="Start Date"
            className="bg-white w-full py-1"
          />
        </div>
        <div className="w-full">
          <Select
            onChange={handleDueDateChange}
            value={dueDateFilter}
            options={dueDates}
            placeholder="All"
            label="Due Date"
            className="bg-white w-full py-1"
          />
        </div>
      </div>

      {!isDataLoaded && (
        <div className="py-10">
          <Loading />
        </div>
      )}

      {isDataLoaded && (
        <div className="w-full">
          <Tabs tab="projects" tabs={TABS} selected={selected}>
            {selected === 0 && (
              <div className="py-4 w-full">
                <ProjectDashView
                  gridData={gridData}
                  customDateFormat={customDateFormat}
                  usedCurrency={usedCurrency}
                  updatedCostData={updatedCostData}
                  updatedTaskData={updatedTaskData}
                />
              </div>
            )}
            {selected === 1 && (
              <div className="py-4 w-full">
                <ProjectBoardView
                  projects={gridData}
                  customDateFormat={customDateFormat}
                  usedCurrency={usedCurrency}
                  costData={updatedCostData}
                  taskData={updatedTaskData}
                />
              </div>
            )}
            {selected === 2 && (
              <div className="py-4 w-full">
                <ProjectListView
                  gridData={gridData}
                  costData={updatedCostData}
                  customDateFormat={customDateFormat}
                  taskData={updatedTaskData}
                  usedCurrency={usedCurrency}
                />
              </div>
            )}
            {selected === 3 && (
              <ProjectGanttView
                projects={gridData}
                costData={updatedCostData}
                customDateFormat={customDateFormat}
                taskData={updatedTaskData}
                usedCurrency={usedCurrency}
              />
            )}
          </Tabs>

          <AddProject socket={socket} open={open} setOpen={setOpen} recordData={""} key={new Date().getTime().toString()} />
        </div>
      )}
    </>
  ) : (
    <Package />
  );
};
