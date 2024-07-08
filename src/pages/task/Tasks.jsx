import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDateCalculator from "../../config/useDateCalculator";
import { FaList } from "react-icons/fa";
import { MdFilterAlt, MdFilterAltOff, MdGridView } from "react-icons/md";
import Button from "../../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../../components/Tabs";
import Loading from "../../components/Loader";
import { AddTask, TaskBoardView, TaskDashView, TaskGanttView, TaskListView } from "../../components/task";
import { useQuery } from "react-query";
import useUserStore from "../../app/user";
import { dueDataSource, getUpdateTaskGridData, startDataSource } from "../../utils/filters";
import clsx from "clsx";

import { getDateFormat, getProjects, getResources, getTasks } from "../../config/api";
import { BsBarChart } from "react-icons/bs";
import { themeColors } from "../../utils";
import Select from "../../components/Select";
import { getActiveAccount, getAddTaskPermission } from "../../utils/permissions";
import Package from "../../package/Package";

const TABS = [
  { title: "Dashboard", icon: <BsBarChart /> },
  { title: "Grid View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
  // { title: "Gantt View", icon: <FaList /> },
];

const TaskStages = ["To-Do", "In-Progress", "On-Hold", "Backlog", "Review", "Completed", "Cancelled"];

export const Tasks = () => {
  const { user, root } = useUserStore();
  const dates = useDateCalculator();
  const [customDateFormat, setCustomDateFormat] = useState();
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [updatedTaskData, setUpdatedTaskData] = useState([]);
  const [gridData, setGridData] = useState([]);
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const tab = searchParams.get("tab");
  const activeAccount = getActiveAccount(root);

  // Filters
  const [projectFilter, setProjectFilter] = useState(0);
  const [assignedToFilter, setAssignedToFilter] = useState(0);
  const [dueDateFilter, setDueDateFilter] = useState("All");
  const [startDateFilter, setStartDateFilter] = useState("All");
  const [stageFilter, setStageFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const { data: taskData, status: isTaskLoaded } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    staleTime: 1000 * 60 * 60,
  });

  const { data: dateFormatData, status: isDateFormatLoaded } = useQuery({
    queryKey: ["dateformat"],
    queryFn: getDateFormat,
    staleTime: 1000 * 60 * 60,
  });

  const { data: projectData, status: isProjectLoaded } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 1000 * 60 * 60,
  });
  const { data: resourceData, status: isResourceLoaded } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
    staleTime: 1000 * 60 * 60,
  });

  ///-------------Filters Data Source --------------------------------///
  const stages = TaskStages.map((stage) => ({ value: stage, label: stage }));
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

  const projects = useMemo(() => {
    return projectData?.map((project) => ({
      value: project.id,
      label: project.Description,
    }));
  }, [projectData]);
  ///-------------END Filters Data Source --------------------------------///

  useEffect(() => {
    if (name === "tasks") setSelected(parseInt(tab));
  }, [name, tab]);

  useEffect(() => {
    if (isProjectLoaded === "success" && isResourceLoaded === "success" && isDateFormatLoaded === "success" && isTaskLoaded === "success") {
      const sub = root?.subscriptions?.[0];
      if (sub?.Payment && !sub?.Is_Expired) {
        // setGridData(taskData);
        setUpdatedTaskData(taskData);
      } else {
        // setGridData([]);
        setUpdatedTaskData([]);
      }

      const targetFormatData = dateFormatData?.find((item) => item.UserID === user.id);
      const userDateFormat = targetFormatData ? targetFormatData.Format : "MMM dd, yyyy";
      setCustomDateFormat(userDateFormat);

      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
    }
  }, [taskData, isTaskLoaded, isProjectLoaded, isResourceLoaded, dateFormatData, isDateFormatLoaded, user]);

  useEffect(() => {
    const updatedData = getUpdateTaskGridData(
      updatedTaskData,
      dates,
      projectFilter,
      assignedToFilter,
      startDateFilter,
      dueDateFilter,
      stageFilter,
      priorityFilter,
      statusFilter
    );

    setGridData(updatedData);
  }, [updatedTaskData, dates, projectFilter, assignedToFilter, startDateFilter, dueDateFilter, stageFilter, priorityFilter, statusFilter]);

  const handleProjectChange = (e) => {
    if (e && e.target?.value) {
      setProjectFilter(e.target?.value);
    }
  };
  const handleAssignedToChange = (e) => {
    if (e && e.target?.value) {
      setAssignedToFilter(e.target?.value);
    }
  };

  const handleStageChange = (e) => {
    if (e && e.target?.value) {
      setStageFilter(e.target?.value);
    }
  };

  const handlePriorityChange = (e) => {
    if (e && e.target?.value) {
      setPriorityFilter(e.target?.value);
    }
  };

  const handleStatusChange = (e) => {
    if (e && e.target?.value) {
      setStatusFilter(e.target?.value);
    }
  };

  const handleStartDateChange = (e) => {
    if (e && e.target?.value) {
      setStartDateFilter(e.target?.value);
    }
  };

  const handleDueDateChange = (e) => {
    if (e && e.target?.value) {
      setDueDateFilter(e.target?.value);
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
          {getAddTaskPermission(user, projectData) && (
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
            onChange={handleProjectChange}
            value={projectFilter}
            options={projects}
            placeholder="All"
            label="Project"
            className="bg-white w-full py-1"
          />
        </div>
        <div className="w-full">
          <Select
            onChange={handleAssignedToChange}
            value={assignedToFilter}
            options={resources}
            placeholder="All"
            label="Assignee"
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
            onChange={handlePriorityChange}
            value={priorityFilter}
            options={[
              { value: "Urgent", label: "Urgent" },
              { value: "High", label: "High" },
              { value: "Medium", label: "Medium" },
              { value: "Low", label: "Low" },
            ]}
            placeholder="All"
            label="Priority"
            className="bg-white w-full py-1"
          />
        </div>
        <div className="w-full">
          <Select
            onChange={handleStatusChange}
            value={statusFilter}
            options={[
              { value: "Ahead", label: "Ahead" },
              { value: "On-Track", label: "On-Track" },
              { value: "Delayed", label: "Delayed" },
            ]}
            placeholder="All"
            label="Status"
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
          <Tabs tab={"tasks"} tabs={TABS} selected={selected}>
            {selected === 0 && (
              <div className="py-4 w-full">
                <TaskDashView gridData={gridData} customDateFormat={customDateFormat} projectData={projectData} />
              </div>
            )}

            {selected === 1 && (
              <div className="py-4 w-full">
                <TaskBoardView tasks={gridData} customDateFormat={customDateFormat} projectData={projectData} />
              </div>
            )}

            {selected === 2 && (
              <div className="py-4 w-full">
                <TaskListView gridData={gridData} customDateFormat={customDateFormat} projectData={projectData} />
              </div>
            )}

            {selected === 3 && (
              <div className="py-4 w-full">
                <TaskGanttView tasks={gridData} customDateFormat={customDateFormat} />
              </div>
            )}
          </Tabs>

          <AddTask open={open} setOpen={setOpen} recordData={""} key={new Date().getTime().toString()} />
        </div>
      )}
    </>
  ) : (
    <Package />
  );
};
