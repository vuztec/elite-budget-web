import {
  getActualProjectPercentageComplete,
  getPlanProjectPercentageComplete,
  getProjectCost,
  getRiskRating,
  getTaskEndDate,
  getTaskStatus,
} from ".";

//-----------Common Function-----------
export const startDataSource = [
  "Start Today",
  "Start Tomorrow",
  "Start Yesterday",
  "Start This Week",
  "Start Next Week",
  "Start Last Week",
  "Start This Month",
  "Start Next Month",
  "Start Last Month",
  "Start This Quarter",
  "Start Next Quarter",
  "Start Last Quarter",
  "Start This Year",
  "Start This Year Q1",
  "Start This Year Q2",
  "Start This Year Q3",
  "Start This Year Q4",
  "Start Next Year",
  "Start Next Year Q1",
  "Start Next Year Q2",
  "Start Next Year Q3",
  "Start Next Year Q4",
  "Start Last Year",
  "Start Last Year Q1",
  "Start Last Year Q2",
  "Start Last Year Q3",
  "Start Last Year Q4",
  "Start After Next Year",
  "Start Before Last Year",
];

export const dueDataSource = [
  "Overdue",
  "Due Today",
  "Due Tomorrow",
  "Due Yesterday",
  "Due This Week",
  "Due Next Week",
  "Due Last Week",
  "Due This Month",
  "Due Next Month",
  "Due Last Month",
  "Due This Quarter",
  "Due Next Quarter",
  "Due Last Quarter",
  "Due This Year",
  "Due This Year Q1",
  "Due This Year Q2",
  "Due This Year Q3",
  "Due This Year Q4",
  "Due Next Year",
  "Due Next Year Q1",
  "Due Next Year Q2",
  "Due Next Year Q3",
  "Due Next Year Q4",
  "Due Last Year",
  "Due Last Year Q1",
  "Due Last Year Q2",
  "Due Last Year Q3",
  "Due Last Year Q4",
  "Due After Next Year",
  "Due Before Last Year",
];

export const identifiedDataSource = [
  "Identified Today",
  "Identified Yesterday",
  "Identified This Week",
  "Identified Last Week",
  "Identified This Month",
  "Identified Last Month",
  "Identified This Quarter",
  "Identified Last Quarter",
  "Identified This Year",
  "Identified This Year Q1",
  "Identified This Year Q2",
  "Identified This Year Q3",
  "Identified This Year Q4",
  "Identified Last Year",
  "Identified Last Year Q1",
  "Identified Last Year Q2",
  "Identified Last Year Q3",
  "Identified Last Year Q4",
  "Identified Before Last Year",
];

export const reportedDataSource = [
  "Reported Today",
  "Reported Yesterday",
  "Reported This Week",
  "Reported Last Week",
  "Reported This Month",
  "Reported Last Month",
  "Reported This Quarter",
  "Reported Last Quarter",
  "Reported This Year",
  "Reported This Year Q1",
  "Reported This Year Q2",
  "Reported This Year Q3",
  "Reported This Year Q4",
  "Reported Last Year",
  "Reported Last Year Q1",
  "Reported Last Year Q2",
  "Reported Last Year Q3",
  "Reported Last Year Q4",
  "Reported Before Last Year",
];

export const invoiceDataSource = [
  "Invoiced Today",
  "Invoiced Yesterday",
  "Invoiced This Week",
  "Invoiced Last Week",
  "Invoiced This Month",
  "Invoiced Last Month",
  "Invoiced This Quarter",
  "Invoiced Last Quarter",
  "Invoiced This Year",
  "Invoiced This Year Q1",
  "Invoiced This Year Q2",
  "Invoiced This Year Q3",
  "Invoiced This Year Q4",
  "Invoiced Last Year",
  "Invoiced Last Year Q1",
  "Invoiced Last Year Q2",
  "Invoiced Last Year Q3",
  "Invoiced Last Year Q4",
  "Invoiced Before Last Year",
];

export const payDataSource = [
  "Paid Today",
  "Paid Yesterday",
  "Paid This Week",
  "Paid Last Week",
  "Paid This Month",
  "Paid Last Month",
  "Paid This Quarter",
  "Paid Last Quarter",
  "Paid This Year",
  "Paid This Year Q1",
  "Paid This Year Q2",
  "Paid This Year Q3",
  "Paid This Year Q4",
  "Paid Last Year",
  "Paid Last Year Q1",
  "Paid Last Year Q2",
  "Paid Last Year Q3",
  "Paid Last Year Q4",
  "Paid Before Last Year",
];

export const RequestedDataSource = [
  "Requested Today",
  "Requested Yesterday",
  "Requested This Week",
  "Requested Last Week",
  "Requested This Month",
  "Requested Last Month",
  "Requested This Quarter",
  "Requested Last Quarter",
  "Requested This Year",
  "Requested This Year Q1",
  "Requested This Year Q2",
  "Requested This Year Q3",
  "Requested This Year Q4",
  "Requested Last Year",
  "Requested Last Year Q1",
  "Requested Last Year Q2",
  "Requested Last Year Q3",
  "Requested Last Year Q4",
  "Requested Before Last Year",
];

export const decidedDataSource = [
  "Decided Today",
  "Decided Yesterday",
  "Decided This Week",
  "Decided Last Week",
  "Decided This Month",
  "Decided Last Month",
  "Decided This Quarter",
  "Decided Last Quarter",
  "Decided This Year",
  "Decided This Year Q1",
  "Decided This Year Q2",
  "Decided This Year Q3",
  "Decided This Year Q4",
  "Decided Last Year",
  "Decided Last Year Q1",
  "Decided Last Year Q2",
  "Decided Last Year Q3",
  "Decided Last Year Q4",
  "Decided Before Last Year",
];

export const closedDataSource = [
  "Closed Today",
  "Closed Yesterday",
  "Closed This Week",
  "Closed Last Week",
  "Closed This Month",
  "Closed Last Month",
  "Closed This Quarter",
  "Closed Last Quarter",
  "Closed This Year",
  "Closed This Year Q1",
  "Closed This Year Q2",
  "Closed This Year Q3",
  "Closed This Year Q4",
  "Closed Last Year",
  "Closed Last Year Q1",
  "Closed Last Year Q2",
  "Closed Last Year Q3",
  "Closed Last Year Q4",
  "Closed Before Last Year",
];

//-----------Project-----------
export const getStartDateFilteredData = (data, filter, dates) => {
  return data?.filter((item) => {
    const startDate = new Date(item.StartDate);

    if (filter === "Start Today") {
      return startDate === dates.today;
    } else if (filter === "Start Tomorrow") {
      return startDate === dates.tomorrow;
    } else if (filter === "Start Yesterday") {
      return startDate === dates.yesterday;
    } else if (filter === "Start This Week") {
      return startDate >= dates.startOfWeek && startDate <= dates.endOfWeek;
    } else if (filter === "Start Next Week") {
      return (
        startDate >= dates.startOfNextWeek && startDate <= dates.endOfNextWeek
      );
    } else if (filter === "Start Last Week") {
      return (
        startDate >= dates.startOfLastWeek && startDate <= dates.endOfLastWeek
      );
    } else if (filter === "Start This Month") {
      return startDate >= dates.startOfMonth && startDate <= dates.endOfMonth;
    } else if (filter === "Start Next Month") {
      return (
        startDate >= dates.startOfNextMonth && startDate <= dates.endOfNextMonth
      );
    } else if (filter === "Start Last Month") {
      return (
        startDate >= dates.startOfLastMonth && startDate <= dates.endOfLastMonth
      );
    } else if (filter === "Start This Quarter") {
      return (
        startDate >= dates.startOfQuarter && startDate <= dates.endOfQuarter
      );
    } else if (filter === "Start Next Quarter") {
      return (
        startDate >= dates.startOfNextQuarter &&
        startDate <= dates.endOfNextQuarter
      );
    } else if (filter === "Start Last Quarter") {
      return (
        startDate >= dates.startOfLastQuarter &&
        startDate <= dates.endOfLastQuarter
      );
    } else if (filter === "Start This Year") {
      return startDate >= dates.startOfYear && startDate <= dates.endOfYear;
    } else if (filter === "Start Next Year") {
      return (
        startDate >= dates.startOfNextYear && startDate <= dates.endOfNextYear
      );
    } else if (filter === "Start Last Year") {
      return (
        startDate >= dates.startOfLastYear && startDate <= dates.endOfLastYear
      );
    } else if (filter === "Start This Year Q1") {
      return startDate >= dates.startOfQ1 && startDate <= dates.endOfQ1;
    } else if (filter === "Start Next Year Q1") {
      return startDate >= dates.startOfNextQ1 && startDate <= dates.endOfNextQ1;
    } else if (filter === "Start Last Year Q1") {
      return startDate >= dates.startOfLastQ1 && startDate <= dates.endOfLastQ1;
    } else if (filter === "Start This Year Q2") {
      return startDate >= dates.startOfQ2 && startDate <= dates.endOfQ2;
    } else if (filter === "Start Next Year Q2") {
      return startDate >= dates.startOfNextQ2 && startDate <= dates.endOfNextQ2;
    } else if (filter === "Start Last Year Q2") {
      return startDate >= dates.startOfLastQ2 && startDate <= dates.endOfLastQ2;
    } else if (filter === "Start This Year Q3") {
      return startDate >= dates.startOfQ3 && startDate <= dates.endOfQ3;
    } else if (filter === "Start Next Year Q3") {
      return startDate >= dates.startOfNextQ3 && startDate <= dates.endOfNextQ3;
    } else if (filter === "Start Last Year Q3") {
      return startDate >= dates.startOfLastQ3 && startDate <= dates.endOfLastQ3;
    } else if (filter === "Start This Year Q4") {
      return startDate >= dates.startOfQ4 && startDate <= dates.endOfQ4;
    } else if (filter === "Start Next Year Q4") {
      return startDate >= dates.startOfNextQ4 && startDate <= dates.endOfNextQ4;
    } else if (filter === "Start Last Year Q4") {
      return startDate >= dates.startOfLastQ4 && startDate <= dates.endOfLastQ4;
    } else if (filter === "Start After Next Year") {
      return startDate > dates.endOfNextYearQ4;
    } else if (filter === "Start Before Last Year") {
      return startDate < dates.startOfLastYearQ4;
    } else {
      // Return all Data if filter is not matched
      return true;
    }
  });
};

export const getDueDateFilteredData = (data, filter, dates) => {
  return data?.filter((item) => {
    const dueDate = new Date(item.EndDate);

    if (filter === "Overdue") {
      return (
        dueDate < dates.today &&
        item.ProjectStage !== "Closing" &&
        item.ProjectStage !== "Cancelled" &&
        item.ProjectStage !== "On-Hold"
      );
    } else if (filter === "Due Today") {
      return dueDate === dates.today;
    } else if (filter === "Due Tomorrow") {
      return dueDate === dates.tomorrow;
    } else if (filter === "Due Yesterday") {
      return dueDate === dates.yesterday;
    } else if (filter === "Due This Week") {
      return dueDate >= dates.startOfWeek && dueDate <= dates.endOfWeek;
    } else if (filter === "Due Next Week") {
      return dueDate >= dates.startOfNextWeek && dueDate <= dates.endOfNextWeek;
    } else if (filter === "Due Last Week") {
      return dueDate >= dates.startOfLastWeek && dueDate <= dates.endOfLastWeek;
    } else if (filter === "Due This Month") {
      return dueDate >= dates.startOfMonth && dueDate <= dates.endOfMonth;
    } else if (filter === "Due Next Month") {
      return (
        dueDate >= dates.startOfNextMonth && dueDate <= dates.endOfNextMonth
      );
    } else if (filter === "Due Last Month") {
      return (
        dueDate >= dates.startOfLastMonth && dueDate <= dates.endOfLastMonth
      );
    } else if (filter === "Due This Quarter") {
      return dueDate >= dates.startOfQuarter && dueDate <= dates.endOfQuarter;
    } else if (filter === "Due Next Quarter") {
      return (
        dueDate >= dates.startOfNextQuarter && dueDate <= dates.endOfNextQuarter
      );
    } else if (filter === "Due Last Quarter") {
      return (
        dueDate >= dates.startOfLastQuarter && dueDate <= dates.endOfLastQuarter
      );
    } else if (filter === "Due This Year") {
      return dueDate >= dates.startOfYear && dueDate <= dates.endOfYear;
    } else if (filter === "Due Next Year") {
      return dueDate >= dates.startOfNextYear && dueDate <= dates.endOfNextYear;
    } else if (filter === "Due Last Year") {
      return dueDate >= dates.startOfLastYear && dueDate <= dates.endOfLastYear;
    } else if (filter === "Due This Year Q1") {
      return dueDate >= dates.startOfQ1 && dueDate <= dates.endOfQ1;
    } else if (filter === "Due Next Year Q1") {
      return dueDate >= dates.startOfNextQ1 && dueDate <= dates.endOfNextQ1;
    } else if (filter === "Due Last Year Q1") {
      return dueDate >= dates.startOfLastQ1 && dueDate <= dates.endOfLastQ1;
    } else if (filter === "Due This Year Q2") {
      return dueDate >= dates.startOfQ2 && dueDate <= dates.endOfQ2;
    } else if (filter === "Due Next Year Q2") {
      return dueDate >= dates.startOfNextQ2 && dueDate <= dates.endOfNextQ2;
    } else if (filter === "Due Last Year Q2") {
      return dueDate >= dates.startOfLastQ2 && dueDate <= dates.endOfLastQ2;
    } else if (filter === "Due This Year Q3") {
      return dueDate >= dates.startOfQ3 && dueDate <= dates.endOfQ3;
    } else if (filter === "Due Next Year Q3") {
      return dueDate >= dates.startOfNextQ3 && dueDate <= dates.endOfNextQ3;
    } else if (filter === "Due Last Year Q3") {
      return dueDate >= dates.startOfLastQ3 && dueDate <= dates.endOfLastQ3;
    } else if (filter === "Due This Year Q4") {
      return dueDate >= dates.startOfQ4 && dueDate <= dates.endOfQ4;
    } else if (filter === "Due Next Year Q4") {
      return dueDate >= dates.startOfNextQ4 && dueDate <= dates.endOfNextQ4;
    } else if (filter === "Due Last Year Q4") {
      return dueDate >= dates.startOfLastQ4 && dueDate <= dates.endOfLastQ4;
    } else if (filter === "Due After Next Year") {
      return dueDate > dates.endOfNextYearQ4;
    } else if (filter === "Due Before Last Year") {
      return dueDate < dates.startOfLastYearQ4;
    } else {
      // Return all Data if filter is not matched
      return true;
    }
  });
};

export const getScheduleStatus = (data, id) => {
  const actual = getActualProjectPercentageComplete(data, parseInt(id))
    ? getActualProjectPercentageComplete(data, parseInt(id))
    : 0;
  const plan = getPlanProjectPercentageComplete(data, parseInt(id))
    ? getPlanProjectPercentageComplete(data, parseInt(id))
    : 0;
  if (Number(actual) < Number(plan)) {
    return "Delayed";
  } else {
    return "On-Track";
  }
};

export const getBudgetStatus = (data, budget, id) => {
  const usedBudget = getProjectCost(data, parseInt(id))
    ? getProjectCost(data, parseInt(id))
    : 0;
  if (Number(usedBudget) > Number(budget)) {
    return "Over Budget";
  } else {
    return "Within Budget";
  }
};

export const getUpdateProjectGridData = (
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
) => {
  let portfolioFilteredData;
  if (portfolioFilter !== "All" && parseInt(portfolioFilter) !== 0) {
    portfolioFilteredData = updatedProjectData?.filter(
      (item) => item.Portfolio === portfolioFilter
    );
  } else {
    portfolioFilteredData = updatedProjectData;
  }

  let programmeFilteredData;
  if (programmeFilter !== "All" && parseInt(programmeFilter) !== 0) {
    programmeFilteredData = portfolioFilteredData?.filter(
      (item) => item.Programme === programmeFilter
    );
  } else {
    programmeFilteredData = portfolioFilteredData;
  }

  let typeFilteredData;
  if (typeFilter !== "All" && parseInt(typeFilter) !== 0) {
    typeFilteredData = programmeFilteredData?.filter(
      (item) => item.Type === typeFilter
    );
  } else {
    typeFilteredData = programmeFilteredData;
  }

  let stageFilteredData;
  if (stageFilter !== "All" && parseInt(stageFilter) !== 0) {
    stageFilteredData = typeFilteredData?.filter(
      (item) => item.ProjectStage === stageFilter
    );
  } else {
    stageFilteredData = typeFilteredData;
  }

  let managerFilteredData;
  if (managerFilter !== 0) {
    managerFilteredData = stageFilteredData?.filter((item) =>
      item?.projectdb_manager?.find(
        (manager) => manager?.resource_id === managerFilter
      )
    );
  } else {
    managerFilteredData = stageFilteredData;
  }

  let adminFilteredData;
  if (adminFilter !== 0) {
    adminFilteredData = managerFilteredData?.filter((item) =>
      item?.projectdb_admin?.find((admin) => admin?.resource_id === adminFilter)
    );
  } else {
    adminFilteredData = managerFilteredData;
  }

  let budgetFilteredData;
  if (budgetFilter !== "All" && parseInt(budgetFilter) !== 0) {
    budgetFilteredData = adminFilteredData?.filter(
      (item) => getBudgetStatus(costData, item.Budget, item.id) === budgetFilter
    );
  } else {
    budgetFilteredData = adminFilteredData;
  }

  let scheduleFilteredData;
  if (scheduleFilter !== "All" && parseInt(scheduleFilter) !== 0) {
    scheduleFilteredData = budgetFilteredData?.filter(
      (item) => getScheduleStatus(taskData, item.id) === scheduleFilter
    );
  } else {
    scheduleFilteredData = budgetFilteredData;
  }

  const startDateFilteredData = getStartDateFilteredData(
    scheduleFilteredData,
    startDateFilter,
    dates
  );
  const dueDateFilteredData = getDueDateFilteredData(
    startDateFilteredData,
    dueDateFilter,
    dates
  );

  return dueDateFilteredData;
};

//--------------Task-----------------
export const getTaskDueDateFilteredData = (data, filter, dates) => {
  return data?.filter((item) => {
    const dueDate = getTaskEndDate(item.StartDate, item.TaskDuration);

    if (filter === "Overdue") {
      return (
        dueDate < dates.today &&
        item.Stage !== "Completed" &&
        item.Stage !== "Cancelled" &&
        item.ActualComplete !== 100 &&
        item.Stage !== "On-Hold"
      );
    } else if (filter === "Due Today") {
      return dueDate === dates.today;
    } else if (filter === "Due Tomorrow") {
      return dueDate === dates.tomorrow;
    } else if (filter === "Due Yesterday") {
      return dueDate === dates.yesterday;
    } else if (filter === "Due This Week") {
      return dueDate >= dates.startOfWeek && dueDate <= dates.endOfWeek;
    } else if (filter === "Due Next Week") {
      return dueDate >= dates.startOfNextWeek && dueDate <= dates.endOfNextWeek;
    } else if (filter === "Due Last Week") {
      return dueDate >= dates.startOfLastWeek && dueDate <= dates.endOfLastWeek;
    } else if (filter === "Due This Month") {
      return dueDate >= dates.startOfMonth && dueDate <= dates.endOfMonth;
    } else if (filter === "Due Next Month") {
      return (
        dueDate >= dates.startOfNextMonth && dueDate <= dates.endOfNextMonth
      );
    } else if (filter === "Due Last Month") {
      return (
        dueDate >= dates.startOfLastMonth && dueDate <= dates.endOfLastMonth
      );
    } else if (filter === "Due This Quarter") {
      return dueDate >= dates.startOfQuarter && dueDate <= dates.endOfQuarter;
    } else if (filter === "Due Next Quarter") {
      return (
        dueDate >= dates.startOfNextQuarter && dueDate <= dates.endOfNextQuarter
      );
    } else if (filter === "Due Last Quarter") {
      return (
        dueDate >= dates.startOfLastQuarter && dueDate <= dates.endOfLastQuarter
      );
    } else if (filter === "Due This Year") {
      return dueDate >= dates.startOfYear && dueDate <= dates.endOfYear;
    } else if (filter === "Due Next Year") {
      return dueDate >= dates.startOfNextYear && dueDate <= dates.endOfNextYear;
    } else if (filter === "Due Last Year") {
      return dueDate >= dates.startOfLastYear && dueDate <= dates.endOfLastYear;
    } else if (filter === "Due This Year Q1") {
      return dueDate >= dates.startOfQ1 && dueDate <= dates.endOfQ1;
    } else if (filter === "Due Next Year Q1") {
      return dueDate >= dates.startOfNextQ1 && dueDate <= dates.endOfNextQ1;
    } else if (filter === "Due Last Year Q1") {
      return dueDate >= dates.startOfLastQ1 && dueDate <= dates.endOfLastQ1;
    } else if (filter === "Due This Year Q2") {
      return dueDate >= dates.startOfQ2 && dueDate <= dates.endOfQ2;
    } else if (filter === "Due Next Year Q2") {
      return dueDate >= dates.startOfNextQ2 && dueDate <= dates.endOfNextQ2;
    } else if (filter === "Due Last Year Q2") {
      return dueDate >= dates.startOfLastQ2 && dueDate <= dates.endOfLastQ2;
    } else if (filter === "Due This Year Q3") {
      return dueDate >= dates.startOfQ3 && dueDate <= dates.endOfQ3;
    } else if (filter === "Due Next Year Q3") {
      return dueDate >= dates.startOfNextQ3 && dueDate <= dates.endOfNextQ3;
    } else if (filter === "Due Last Year Q3") {
      return dueDate >= dates.startOfLastQ3 && dueDate <= dates.endOfLastQ3;
    } else if (filter === "Due This Year Q4") {
      return dueDate >= dates.startOfQ4 && dueDate <= dates.endOfQ4;
    } else if (filter === "Due Next Year Q4") {
      return dueDate >= dates.startOfNextQ4 && dueDate <= dates.endOfNextQ4;
    } else if (filter === "Due Last Year Q4") {
      return dueDate >= dates.startOfLastQ4 && dueDate <= dates.endOfLastQ4;
    } else if (filter === "Due After Next Year") {
      return dueDate > dates.endOfNextYearQ4;
    } else if (filter === "Due Before Last Year") {
      return dueDate < dates.startOfLastYearQ4;
    } else {
      // Return all Data if filter is not matched
      return true;
    }
  });
};

export const getUpdateTaskGridData = (
  updatedTaskData,
  dates,
  projectFilter,
  assignedToFilter,
  startDateFilter,
  dueDateFilter,
  stageFilter,
  priorityFilter,
  statusFilter
) => {
  let projectFilteredData;
  if (parseInt(projectFilter) !== 0) {
    projectFilteredData = updatedTaskData?.filter(
      (item) => item?.ProjectID === parseInt(projectFilter)
    );
  } else {
    projectFilteredData = updatedTaskData;
  }

  let assignedToFilteredData;
  if (parseInt(assignedToFilter) !== 0) {
    assignedToFilteredData = projectFilteredData?.filter((item) =>
      item?.taskdb_assignee?.find(
        (assignee) =>
          parseInt(assignee?.resource_id) === parseInt(assignedToFilter)
      )
    );
  } else {
    assignedToFilteredData = projectFilteredData;
  }

  let stageFilteredData;
  if (stageFilter !== "All" && parseInt(stageFilter) !== 0) {
    stageFilteredData = assignedToFilteredData?.filter(
      (item) => item.Stage === stageFilter
    );
  } else {
    stageFilteredData = assignedToFilteredData;
  }

  let priorityFilteredData;
  if (priorityFilter !== "All" && parseInt(priorityFilter) !== 0) {
    priorityFilteredData = stageFilteredData?.filter(
      (item) => item.Priority === priorityFilter
    );
  } else {
    priorityFilteredData = stageFilteredData;
  }

  let statusFilteredData;
  if (statusFilter !== "All" && parseInt(statusFilter) !== 0) {
    statusFilteredData = priorityFilteredData?.filter(
      (item) =>
        getTaskStatus(
          item.ActualComplete,
          item.StartDate,
          item.TaskDuration
        ) === statusFilter
    );
  } else {
    statusFilteredData = priorityFilteredData;
  }

  const startDateFilteredData = getStartDateFilteredData(
    statusFilteredData,
    startDateFilter,
    dates
  );
  const dueDateFilteredData = getTaskDueDateFilteredData(
    startDateFilteredData,
    dueDateFilter,
    dates
  );

  return dueDateFilteredData;
};

//--------------RISKS-----------------
export const getIdentifiedDateFilteredData = (data, filter, dates) => {
  return data?.filter((item) => {
    const identifiedDate = new Date(item.DateIdentified);

    if (filter === "Identified Today") {
      return identifiedDate === dates.today;
    } else if (filter === "Identified Tomorrow") {
      return identifiedDate === dates.tomorrow;
    } else if (filter === "Identified Yesterday") {
      return identifiedDate === dates.yesterday;
    } else if (filter === "Identified This Week") {
      return (
        identifiedDate >= dates.startOfWeek && identifiedDate <= dates.endOfWeek
      );
    } else if (filter === "Identified Next Week") {
      return (
        identifiedDate >= dates.startOfNextWeek &&
        identifiedDate <= dates.endOfNextWeek
      );
    } else if (filter === "Identified Last Week") {
      return (
        identifiedDate >= dates.startOfLastWeek &&
        identifiedDate <= dates.endOfLastWeek
      );
    } else if (filter === "Identified This Month") {
      return (
        identifiedDate >= dates.startOfMonth &&
        identifiedDate <= dates.endOfMonth
      );
    } else if (filter === "Identified Next Month") {
      return (
        identifiedDate >= dates.startOfNextMonth &&
        identifiedDate <= dates.endOfNextMonth
      );
    } else if (filter === "Identified Last Month") {
      return (
        identifiedDate >= dates.startOfLastMonth &&
        identifiedDate <= dates.endOfLastMonth
      );
    } else if (filter === "Identified This Quarter") {
      return (
        identifiedDate >= dates.startOfQuarter &&
        identifiedDate <= dates.endOfQuarter
      );
    } else if (filter === "Identified Next Quarter") {
      return (
        identifiedDate >= dates.startOfNextQuarter &&
        identifiedDate <= dates.endOfNextQuarter
      );
    } else if (filter === "Identified Last Quarter") {
      return (
        identifiedDate >= dates.startOfLastQuarter &&
        identifiedDate <= dates.endOfLastQuarter
      );
    } else if (filter === "Identified This Year") {
      return (
        identifiedDate >= dates.startOfYear && identifiedDate <= dates.endOfYear
      );
    } else if (filter === "Identified Next Year") {
      return (
        identifiedDate >= dates.startOfNextYear &&
        identifiedDate <= dates.endOfNextYear
      );
    } else if (filter === "Identified Last Year") {
      return (
        identifiedDate >= dates.startOfLastYear &&
        identifiedDate <= dates.endOfLastYear
      );
    } else if (filter === "Identified This Year Q1") {
      return (
        identifiedDate >= dates.startOfQ1 && identifiedDate <= dates.endOfQ1
      );
    } else if (filter === "Identified Next Year Q1") {
      return (
        identifiedDate >= dates.startOfNextQ1 &&
        identifiedDate <= dates.endOfNextQ1
      );
    } else if (filter === "Identified Last Year Q1") {
      return (
        identifiedDate >= dates.startOfLastQ1 &&
        identifiedDate <= dates.endOfLastQ1
      );
    } else if (filter === "Identified This Year Q2") {
      return (
        identifiedDate >= dates.startOfQ2 && identifiedDate <= dates.endOfQ2
      );
    } else if (filter === "Identified Next Year Q2") {
      return (
        identifiedDate >= dates.startOfNextQ2 &&
        identifiedDate <= dates.endOfNextQ2
      );
    } else if (filter === "Identified Last Year Q2") {
      return (
        identifiedDate >= dates.startOfLastQ2 &&
        identifiedDate <= dates.endOfLastQ2
      );
    } else if (filter === "Identified This Year Q3") {
      return (
        identifiedDate >= dates.startOfQ3 && identifiedDate <= dates.endOfQ3
      );
    } else if (filter === "Identified Next Year Q3") {
      return (
        identifiedDate >= dates.startOfNextQ3 &&
        identifiedDate <= dates.endOfNextQ3
      );
    } else if (filter === "Identified Last Year Q3") {
      return (
        identifiedDate >= dates.startOfLastQ3 &&
        identifiedDate <= dates.endOfLastQ3
      );
    } else if (filter === "Identified This Year Q4") {
      return (
        identifiedDate >= dates.startOfQ4 && identifiedDate <= dates.endOfQ4
      );
    } else if (filter === "Identified Next Year Q4") {
      return (
        identifiedDate >= dates.startOfNextQ4 &&
        identifiedDate <= dates.endOfNextQ4
      );
    } else if (filter === "Identified Last Year Q4") {
      return (
        identifiedDate >= dates.startOfLastQ4 &&
        identifiedDate <= dates.endOfLastQ4
      );
    } else if (filter === "Identified After Next Year") {
      return identifiedDate > dates.endOfNextYearQ4;
    } else if (filter === "Identified Before Last Year") {
      return identifiedDate < dates.startOfLastYearQ4;
    } else {
      // Return all Data if filter is not matched
      return true;
    }
  });
};

export const getClosedDateFilteredData = (data, filter, dates) => {
  return data?.filter((item) => {
    const closedDate = new Date(item.DateClosed);
    if (filter === "Closed Today") {
      return closedDate === dates.today;
    } else if (filter === "Closed Tomorrow") {
      return closedDate === dates.tomorrow;
    } else if (filter === "Closed Yesterday") {
      return closedDate === dates.yesterday;
    } else if (filter === "Closed This Week") {
      return closedDate >= dates.startOfWeek && closedDate <= dates.endOfWeek;
    } else if (filter === "Closed Next Week") {
      return (
        closedDate >= dates.startOfNextWeek && closedDate <= dates.endOfNextWeek
      );
    } else if (filter === "Closed Last Week") {
      return (
        closedDate >= dates.startOfLastWeek && closedDate <= dates.endOfLastWeek
      );
    } else if (filter === "Closed This Month") {
      return closedDate >= dates.startOfMonth && closedDate <= dates.endOfMonth;
    } else if (filter === "Closed Next Month") {
      return (
        closedDate >= dates.startOfNextMonth &&
        closedDate <= dates.endOfNextMonth
      );
    } else if (filter === "Closed Last Month") {
      return (
        closedDate >= dates.startOfLastMonth &&
        closedDate <= dates.endOfLastMonth
      );
    } else if (filter === "Closed This Quarter") {
      return (
        closedDate >= dates.startOfQuarter && closedDate <= dates.endOfQuarter
      );
    } else if (filter === "Closed Next Quarter") {
      return (
        closedDate >= dates.startOfNextQuarter &&
        closedDate <= dates.endOfNextQuarter
      );
    } else if (filter === "Closed Last Quarter") {
      return (
        closedDate >= dates.startOfLastQuarter &&
        closedDate <= dates.endOfLastQuarter
      );
    } else if (filter === "Closed This Year") {
      return closedDate >= dates.startOfYear && closedDate <= dates.endOfYear;
    } else if (filter === "Closed Next Year") {
      return (
        closedDate >= dates.startOfNextYear && closedDate <= dates.endOfNextYear
      );
    } else if (filter === "Closed Last Year") {
      return (
        closedDate >= dates.startOfLastYear && closedDate <= dates.endOfLastYear
      );
    } else if (filter === "Closed This Year Q1") {
      return closedDate >= dates.startOfQ1 && closedDate <= dates.endOfQ1;
    } else if (filter === "Closed Next Year Q1") {
      return (
        closedDate >= dates.startOfNextQ1 && closedDate <= dates.endOfNextQ1
      );
    } else if (filter === "Closed Last Year Q1") {
      return (
        closedDate >= dates.startOfLastQ1 && closedDate <= dates.endOfLastQ1
      );
    } else if (filter === "Closed This Year Q2") {
      return closedDate >= dates.startOfQ2 && closedDate <= dates.endOfQ2;
    } else if (filter === "Closed Next Year Q2") {
      return (
        closedDate >= dates.startOfNextQ2 && closedDate <= dates.endOfNextQ2
      );
    } else if (filter === "Closed Last Year Q2") {
      return (
        closedDate >= dates.startOfLastQ2 && closedDate <= dates.endOfLastQ2
      );
    } else if (filter === "Closed This Year Q3") {
      return closedDate >= dates.startOfQ3 && closedDate <= dates.endOfQ3;
    } else if (filter === "Closed Next Year Q3") {
      return (
        closedDate >= dates.startOfNextQ3 && closedDate <= dates.endOfNextQ3
      );
    } else if (filter === "Closed Last Year Q3") {
      return (
        closedDate >= dates.startOfLastQ3 && closedDate <= dates.endOfLastQ3
      );
    } else if (filter === "Closed This Year Q4") {
      return closedDate >= dates.startOfQ4 && closedDate <= dates.endOfQ4;
    } else if (filter === "Closed Next Year Q4") {
      return (
        closedDate >= dates.startOfNextQ4 && closedDate <= dates.endOfNextQ4
      );
    } else if (filter === "Closed Last Year Q4") {
      return (
        closedDate >= dates.startOfLastQ4 && closedDate <= dates.endOfLastQ4
      );
    } else if (filter === "Closed After Next Year") {
      return closedDate > dates.endOfNextYearQ4;
    } else if (filter === "Closed Before Last Year") {
      return closedDate < dates.startOfLastYearQ4;
    } else {
      // Return all Data if filter is not matched
      return true;
    }
  });
};

export const getUpdateRiskGridData = (
  updatedRiskData,
  dates,
  projectFilter,
  assignedToFilter,
  identifiedDateFilter,
  closedDateFilter,
  statusFilter,
  ratingFilter,
  impactFilter,
  LikelyhoodFilter,
  responseFilter
) => {
  let projectFilteredData;
  if (parseInt(projectFilter) !== 0) {
    projectFilteredData = updatedRiskData?.filter(
      (item) => item?.ProjectID === parseInt(projectFilter)
    );
  } else {
    projectFilteredData = updatedRiskData;
  }

  let assignedToFilteredData;
  if (parseInt(assignedToFilter) !== 0) {
    assignedToFilteredData = projectFilteredData?.filter((item) =>
      item?.riskdb_assignee?.find(
        (assignee) =>
          parseInt(assignee?.resource_id) === parseInt(assignedToFilter)
      )
    );
  } else {
    assignedToFilteredData = projectFilteredData;
  }

  let statusFilteredData;
  if (statusFilter !== "All" && parseInt(statusFilter) !== 0) {
    statusFilteredData = assignedToFilteredData?.filter(
      (item) => item.Status === statusFilter
    );
  } else {
    statusFilteredData = assignedToFilteredData;
  }

  let impactFilteredData;
  if (impactFilter !== "All" && parseInt(impactFilter) !== 0) {
    impactFilteredData = statusFilteredData?.filter(
      (item) => item.Impact === impactFilter
    );
  } else {
    impactFilteredData = statusFilteredData;
  }

  let likelyhoodFilteredData;
  if (LikelyhoodFilter !== "All" && parseInt(LikelyhoodFilter) !== 0) {
    likelyhoodFilteredData = impactFilteredData?.filter(
      (item) => item.Likelyhood === LikelyhoodFilter
    );
  } else {
    likelyhoodFilteredData = impactFilteredData;
  }

  let responseFilteredData;
  if (responseFilter !== "All" && parseInt(responseFilter) !== 0) {
    responseFilteredData = likelyhoodFilteredData?.filter(
      (item) => item.Response === responseFilter
    );
  } else {
    responseFilteredData = likelyhoodFilteredData;
  }

  let ratingFilteredData;
  if (ratingFilter !== "All" && parseInt(ratingFilter) !== 0) {
    ratingFilteredData = responseFilteredData?.filter(
      (item) => getRiskRating(item.Impact, item.Likelyhood) === ratingFilter
    );
  } else {
    ratingFilteredData = responseFilteredData;
  }

  const identifiedDateFilteredData = getIdentifiedDateFilteredData(
    ratingFilteredData,
    identifiedDateFilter,
    dates
  );
  const closedDateFilteredData = getClosedDateFilteredData(
    identifiedDateFilteredData,
    closedDateFilter,
    dates
  );

  return closedDateFilteredData;
};

//--------------ISSUE-----------------
export const getReportedDateFilteredData = (data, filter, dates) => {
  return data?.filter((item) => {
    const reportedDate = new Date(item.DateReported);

    if (filter === "Reported Today") {
      return reportedDate === dates.today;
    } else if (filter === "Reported Tomorrow") {
      return reportedDate === dates.tomorrow;
    } else if (filter === "Reported Yesterday") {
      return reportedDate === dates.yesterday;
    } else if (filter === "Reported This Week") {
      return (
        reportedDate >= dates.startOfWeek && reportedDate <= dates.endOfWeek
      );
    } else if (filter === "Reported Next Week") {
      return (
        reportedDate >= dates.startOfNextWeek &&
        reportedDate <= dates.endOfNextWeek
      );
    } else if (filter === "Reported Last Week") {
      return (
        reportedDate >= dates.startOfLastWeek &&
        reportedDate <= dates.endOfLastWeek
      );
    } else if (filter === "Reported This Month") {
      return (
        reportedDate >= dates.startOfMonth && reportedDate <= dates.endOfMonth
      );
    } else if (filter === "Reported Next Month") {
      return (
        reportedDate >= dates.startOfNextMonth &&
        reportedDate <= dates.endOfNextMonth
      );
    } else if (filter === "Reported Last Month") {
      return (
        reportedDate >= dates.startOfLastMonth &&
        reportedDate <= dates.endOfLastMonth
      );
    } else if (filter === "Reported This Quarter") {
      return (
        reportedDate >= dates.startOfQuarter &&
        reportedDate <= dates.endOfQuarter
      );
    } else if (filter === "Reported Next Quarter") {
      return (
        reportedDate >= dates.startOfNextQuarter &&
        reportedDate <= dates.endOfNextQuarter
      );
    } else if (filter === "Reported Last Quarter") {
      return (
        reportedDate >= dates.startOfLastQuarter &&
        reportedDate <= dates.endOfLastQuarter
      );
    } else if (filter === "Reported This Year") {
      return (
        reportedDate >= dates.startOfYear && reportedDate <= dates.endOfYear
      );
    } else if (filter === "Reported Next Year") {
      return (
        reportedDate >= dates.startOfNextYear &&
        reportedDate <= dates.endOfNextYear
      );
    } else if (filter === "Reported Last Year") {
      return (
        reportedDate >= dates.startOfLastYear &&
        reportedDate <= dates.endOfLastYear
      );
    } else if (filter === "Reported This Year Q1") {
      return reportedDate >= dates.startOfQ1 && reportedDate <= dates.endOfQ1;
    } else if (filter === "Reported Next Year Q1") {
      return (
        reportedDate >= dates.startOfNextQ1 && reportedDate <= dates.endOfNextQ1
      );
    } else if (filter === "Reported Last Year Q1") {
      return (
        reportedDate >= dates.startOfLastQ1 && reportedDate <= dates.endOfLastQ1
      );
    } else if (filter === "Reported This Year Q2") {
      return reportedDate >= dates.startOfQ2 && reportedDate <= dates.endOfQ2;
    } else if (filter === "Reported Next Year Q2") {
      return (
        reportedDate >= dates.startOfNextQ2 && reportedDate <= dates.endOfNextQ2
      );
    } else if (filter === "Reported Last Year Q2") {
      return (
        reportedDate >= dates.startOfLastQ2 && reportedDate <= dates.endOfLastQ2
      );
    } else if (filter === "Reported This Year Q3") {
      return reportedDate >= dates.startOfQ3 && reportedDate <= dates.endOfQ3;
    } else if (filter === "Reported Next Year Q3") {
      return (
        reportedDate >= dates.startOfNextQ3 && reportedDate <= dates.endOfNextQ3
      );
    } else if (filter === "Reported Last Year Q3") {
      return (
        reportedDate >= dates.startOfLastQ3 && reportedDate <= dates.endOfLastQ3
      );
    } else if (filter === "Reported This Year Q4") {
      return reportedDate >= dates.startOfQ4 && reportedDate <= dates.endOfQ4;
    } else if (filter === "Reported Next Year Q4") {
      return (
        reportedDate >= dates.startOfNextQ4 && reportedDate <= dates.endOfNextQ4
      );
    } else if (filter === "Reported Last Year Q4") {
      return (
        reportedDate >= dates.startOfLastQ4 && reportedDate <= dates.endOfLastQ4
      );
    } else if (filter === "Reported After Next Year") {
      return reportedDate > dates.endOfNextYearQ4;
    } else if (filter === "Reported Before Last Year") {
      return reportedDate < dates.startOfLastYearQ4;
    } else {
      // Return all Data if filter is not matched
      return true;
    }
  });
};

export const getUpdateIssueGridData = (
  updatedIssueData,
  dates,
  projectFilter,
  assignedToFilter,
  reportedDateFilter,
  closedDateFilter,
  statusFilter,
  severityFilter
) => {
  let projectFilteredData;
  if (parseInt(projectFilter) !== 0) {
    projectFilteredData = updatedIssueData?.filter(
      (item) => item?.ProjectID === parseInt(projectFilter)
    );
  } else {
    projectFilteredData = updatedIssueData;
  }

  let assignedToFilteredData;
  if (parseInt(assignedToFilter) !== 0) {
    assignedToFilteredData = projectFilteredData?.filter((item) =>
      item?.issuedb_assignee?.find(
        (assignee) =>
          parseInt(assignee?.resource_id) === parseInt(assignedToFilter)
      )
    );
  } else {
    assignedToFilteredData = projectFilteredData;
  }

  let statusFilteredData;
  if (statusFilter !== "All" && parseInt(statusFilter) !== 0) {
    statusFilteredData = assignedToFilteredData?.filter(
      (item) => item.Status === statusFilter
    );
  } else {
    statusFilteredData = assignedToFilteredData;
  }

  let severityFilteredData;
  if (severityFilter !== "All" && parseInt(severityFilter) !== 0) {
    severityFilteredData = statusFilteredData?.filter(
      (item) => item.Severity === severityFilter
    );
  } else {
    severityFilteredData = statusFilteredData;
  }

  const reportedDateFilteredData = getReportedDateFilteredData(
    severityFilteredData,
    reportedDateFilter,
    dates
  );
  const closedDateFilteredData = getClosedDateFilteredData(
    reportedDateFilteredData,
    closedDateFilter,
    dates
  );

  return closedDateFilteredData;
};

//--------------ACTION-----------------
export const getActionDueDateFilteredData = (data, filter, dates) => {
  return data?.filter((item) => {
    const dueDate = new Date(item.DueDate);

    if (filter === "Overdue") {
      return dueDate < dates.today && item.Status !== "Completed";
    } else if (filter === "Due Today") {
      return dueDate === dates.today;
    } else if (filter === "Due Tomorrow") {
      return dueDate === dates.tomorrow;
    } else if (filter === "Due Yesterday") {
      return dueDate === dates.yesterday;
    } else if (filter === "Due This Week") {
      return dueDate >= dates.startOfWeek && dueDate <= dates.endOfWeek;
    } else if (filter === "Due Next Week") {
      return dueDate >= dates.startOfNextWeek && dueDate <= dates.endOfNextWeek;
    } else if (filter === "Due Last Week") {
      return dueDate >= dates.startOfLastWeek && dueDate <= dates.endOfLastWeek;
    } else if (filter === "Due This Month") {
      return dueDate >= dates.startOfMonth && dueDate <= dates.endOfMonth;
    } else if (filter === "Due Next Month") {
      return (
        dueDate >= dates.startOfNextMonth && dueDate <= dates.endOfNextMonth
      );
    } else if (filter === "Due Last Month") {
      return (
        dueDate >= dates.startOfLastMonth && dueDate <= dates.endOfLastMonth
      );
    } else if (filter === "Due This Quarter") {
      return dueDate >= dates.startOfQuarter && dueDate <= dates.endOfQuarter;
    } else if (filter === "Due Next Quarter") {
      return (
        dueDate >= dates.startOfNextQuarter && dueDate <= dates.endOfNextQuarter
      );
    } else if (filter === "Due Last Quarter") {
      return (
        dueDate >= dates.startOfLastQuarter && dueDate <= dates.endOfLastQuarter
      );
    } else if (filter === "Due This Year") {
      return dueDate >= dates.startOfYear && dueDate <= dates.endOfYear;
    } else if (filter === "Due Next Year") {
      return dueDate >= dates.startOfNextYear && dueDate <= dates.endOfNextYear;
    } else if (filter === "Due Last Year") {
      return dueDate >= dates.startOfLastYear && dueDate <= dates.endOfLastYear;
    } else if (filter === "Due This Year Q1") {
      return dueDate >= dates.startOfQ1 && dueDate <= dates.endOfQ1;
    } else if (filter === "Due Next Year Q1") {
      return dueDate >= dates.startOfNextQ1 && dueDate <= dates.endOfNextQ1;
    } else if (filter === "Due Last Year Q1") {
      return dueDate >= dates.startOfLastQ1 && dueDate <= dates.endOfLastQ1;
    } else if (filter === "Due This Year Q2") {
      return dueDate >= dates.startOfQ2 && dueDate <= dates.endOfQ2;
    } else if (filter === "Due Next Year Q2") {
      return dueDate >= dates.startOfNextQ2 && dueDate <= dates.endOfNextQ2;
    } else if (filter === "Due Last Year Q2") {
      return dueDate >= dates.startOfLastQ2 && dueDate <= dates.endOfLastQ2;
    } else if (filter === "Due This Year Q3") {
      return dueDate >= dates.startOfQ3 && dueDate <= dates.endOfQ3;
    } else if (filter === "Due Next Year Q3") {
      return dueDate >= dates.startOfNextQ3 && dueDate <= dates.endOfNextQ3;
    } else if (filter === "Due Last Year Q3") {
      return dueDate >= dates.startOfLastQ3 && dueDate <= dates.endOfLastQ3;
    } else if (filter === "Due This Year Q4") {
      return dueDate >= dates.startOfQ4 && dueDate <= dates.endOfQ4;
    } else if (filter === "Due Next Year Q4") {
      return dueDate >= dates.startOfNextQ4 && dueDate <= dates.endOfNextQ4;
    } else if (filter === "Due Last Year Q4") {
      return dueDate >= dates.startOfLastQ4 && dueDate <= dates.endOfLastQ4;
    } else if (filter === "Due After Next Year") {
      return dueDate > dates.endOfNextYearQ4;
    } else if (filter === "Due Before Last Year") {
      return dueDate < dates.startOfLastYearQ4;
    } else {
      // Return all Data if filter is not matched
      return true;
    }
  });
};
export const getUpdateActionGridData = (
  updatedActionData,
  dates,
  projectFilter,
  assignedToFilter,
  dueDateFilter,
  statusFilter,
  priorityFilter
) => {
  let projectFilteredData;
  if (parseInt(projectFilter) !== 0) {
    projectFilteredData = updatedActionData?.filter(
      (item) => item?.ProjectID === parseInt(projectFilter)
    );
  } else {
    projectFilteredData = updatedActionData;
  }

  let assignedToFilteredData;
  if (parseInt(assignedToFilter) !== 0) {
    assignedToFilteredData = projectFilteredData?.filter((item) =>
      item?.actiondb_assignee?.find(
        (assignee) =>
          parseInt(assignee?.resource_id) === parseInt(assignedToFilter)
      )
    );
  } else {
    assignedToFilteredData = projectFilteredData;
  }

  let statusFilteredData;
  if (statusFilter !== "All" && parseInt(statusFilter) !== 0) {
    statusFilteredData = assignedToFilteredData?.filter(
      (item) => item.Status === statusFilter
    );
  } else {
    statusFilteredData = assignedToFilteredData;
  }

  let priorityFilteredData;
  if (priorityFilter !== "All" && parseInt(priorityFilter) !== 0) {
    priorityFilteredData = statusFilteredData?.filter(
      (item) => item.Priority === priorityFilter
    );
  } else {
    priorityFilteredData = statusFilteredData;
  }

  const dueDateFilteredData = getActionDueDateFilteredData(
    priorityFilteredData,
    dueDateFilter,
    dates
  );

  return dueDateFilteredData;
};

//--------------CHANGE-----------------
export const getRequestedDateFilteredData = (data, filter, dates) => {
  return data?.filter((item) => {
    const RequestedDate = new Date(item.DateRequested);

    if (filter === "Requested Today") {
      return RequestedDate === dates.today;
    } else if (filter === "Requested Tomorrow") {
      return RequestedDate === dates.tomorrow;
    } else if (filter === "Requested Yesterday") {
      return RequestedDate === dates.yesterday;
    } else if (filter === "Requested This Week") {
      return (
        RequestedDate >= dates.startOfWeek && RequestedDate <= dates.endOfWeek
      );
    } else if (filter === "Requested Next Week") {
      return (
        RequestedDate >= dates.startOfNextWeek &&
        RequestedDate <= dates.endOfNextWeek
      );
    } else if (filter === "Requested Last Week") {
      return (
        RequestedDate >= dates.startOfLastWeek &&
        RequestedDate <= dates.endOfLastWeek
      );
    } else if (filter === "Requested This Month") {
      return (
        RequestedDate >= dates.startOfMonth && RequestedDate <= dates.endOfMonth
      );
    } else if (filter === "Requested Next Month") {
      return (
        RequestedDate >= dates.startOfNextMonth &&
        RequestedDate <= dates.endOfNextMonth
      );
    } else if (filter === "Requested Last Month") {
      return (
        RequestedDate >= dates.startOfLastMonth &&
        RequestedDate <= dates.endOfLastMonth
      );
    } else if (filter === "Requested This Quarter") {
      return (
        RequestedDate >= dates.startOfQuarter &&
        RequestedDate <= dates.endOfQuarter
      );
    } else if (filter === "Requested Next Quarter") {
      return (
        RequestedDate >= dates.startOfNextQuarter &&
        RequestedDate <= dates.endOfNextQuarter
      );
    } else if (filter === "Requested Last Quarter") {
      return (
        RequestedDate >= dates.startOfLastQuarter &&
        RequestedDate <= dates.endOfLastQuarter
      );
    } else if (filter === "Requested This Year") {
      return (
        RequestedDate >= dates.startOfYear && RequestedDate <= dates.endOfYear
      );
    } else if (filter === "Requested Next Year") {
      return (
        RequestedDate >= dates.startOfNextYear &&
        RequestedDate <= dates.endOfNextYear
      );
    } else if (filter === "Requested Last Year") {
      return (
        RequestedDate >= dates.startOfLastYear &&
        RequestedDate <= dates.endOfLastYear
      );
    } else if (filter === "Requested This Year Q1") {
      return RequestedDate >= dates.startOfQ1 && RequestedDate <= dates.endOfQ1;
    } else if (filter === "Requested Next Year Q1") {
      return (
        RequestedDate >= dates.startOfNextQ1 &&
        RequestedDate <= dates.endOfNextQ1
      );
    } else if (filter === "Requested Last Year Q1") {
      return (
        RequestedDate >= dates.startOfLastQ1 &&
        RequestedDate <= dates.endOfLastQ1
      );
    } else if (filter === "Requested This Year Q2") {
      return RequestedDate >= dates.startOfQ2 && RequestedDate <= dates.endOfQ2;
    } else if (filter === "Requested Next Year Q2") {
      return (
        RequestedDate >= dates.startOfNextQ2 &&
        RequestedDate <= dates.endOfNextQ2
      );
    } else if (filter === "Requested Last Year Q2") {
      return (
        RequestedDate >= dates.startOfLastQ2 &&
        RequestedDate <= dates.endOfLastQ2
      );
    } else if (filter === "Requested This Year Q3") {
      return RequestedDate >= dates.startOfQ3 && RequestedDate <= dates.endOfQ3;
    } else if (filter === "Requested Next Year Q3") {
      return (
        RequestedDate >= dates.startOfNextQ3 &&
        RequestedDate <= dates.endOfNextQ3
      );
    } else if (filter === "Requested Last Year Q3") {
      return (
        RequestedDate >= dates.startOfLastQ3 &&
        RequestedDate <= dates.endOfLastQ3
      );
    } else if (filter === "Requested This Year Q4") {
      return RequestedDate >= dates.startOfQ4 && RequestedDate <= dates.endOfQ4;
    } else if (filter === "Requested Next Year Q4") {
      return (
        RequestedDate >= dates.startOfNextQ4 &&
        RequestedDate <= dates.endOfNextQ4
      );
    } else if (filter === "Requested Last Year Q4") {
      return (
        RequestedDate >= dates.startOfLastQ4 &&
        RequestedDate <= dates.endOfLastQ4
      );
    } else if (filter === "Requested After Next Year") {
      return RequestedDate > dates.endOfNextYearQ4;
    } else if (filter === "Requested Before Last Year") {
      return RequestedDate < dates.startOfLastYearQ4;
    } else {
      // Return all Data if filter is not matched
      return true;
    }
  });
};

export const getDecidedDateFilteredData = (data, filter, dates) => {
  return data?.filter((item) => {
    const decidedDate = new Date(item.DateDecided);

    if (filter === "Decided Today") {
      return decidedDate === dates.today;
    } else if (filter === "Decided Tomorrow") {
      return decidedDate === dates.tomorrow;
    } else if (filter === "Decided Yesterday") {
      return decidedDate === dates.yesterday;
    } else if (filter === "Decided This Week") {
      return decidedDate >= dates.startOfWeek && decidedDate <= dates.endOfWeek;
    } else if (filter === "Decided Next Week") {
      return (
        decidedDate >= dates.startOfNextWeek &&
        decidedDate <= dates.endOfNextWeek
      );
    } else if (filter === "Decided Last Week") {
      return (
        decidedDate >= dates.startOfLastWeek &&
        decidedDate <= dates.endOfLastWeek
      );
    } else if (filter === "Decided This Month") {
      return (
        decidedDate >= dates.startOfMonth && decidedDate <= dates.endOfMonth
      );
    } else if (filter === "Decided Next Month") {
      return (
        decidedDate >= dates.startOfNextMonth &&
        decidedDate <= dates.endOfNextMonth
      );
    } else if (filter === "Decided Last Month") {
      return (
        decidedDate >= dates.startOfLastMonth &&
        decidedDate <= dates.endOfLastMonth
      );
    } else if (filter === "Decided This Quarter") {
      return (
        decidedDate >= dates.startOfQuarter && decidedDate <= dates.endOfQuarter
      );
    } else if (filter === "Decided Next Quarter") {
      return (
        decidedDate >= dates.startOfNextQuarter &&
        decidedDate <= dates.endOfNextQuarter
      );
    } else if (filter === "Decided Last Quarter") {
      return (
        decidedDate >= dates.startOfLastQuarter &&
        decidedDate <= dates.endOfLastQuarter
      );
    } else if (filter === "Decided This Year") {
      return decidedDate >= dates.startOfYear && decidedDate <= dates.endOfYear;
    } else if (filter === "Decided Next Year") {
      return (
        decidedDate >= dates.startOfNextYear &&
        decidedDate <= dates.endOfNextYear
      );
    } else if (filter === "Decided Last Year") {
      return (
        decidedDate >= dates.startOfLastYear &&
        decidedDate <= dates.endOfLastYear
      );
    } else if (filter === "Decided This Year Q1") {
      return decidedDate >= dates.startOfQ1 && decidedDate <= dates.endOfQ1;
    } else if (filter === "Decided Next Year Q1") {
      return (
        decidedDate >= dates.startOfNextQ1 && decidedDate <= dates.endOfNextQ1
      );
    } else if (filter === "Decided Last Year Q1") {
      return (
        decidedDate >= dates.startOfLastQ1 && decidedDate <= dates.endOfLastQ1
      );
    } else if (filter === "Decided This Year Q2") {
      return decidedDate >= dates.startOfQ2 && decidedDate <= dates.endOfQ2;
    } else if (filter === "Decided Next Year Q2") {
      return (
        decidedDate >= dates.startOfNextQ2 && decidedDate <= dates.endOfNextQ2
      );
    } else if (filter === "Decided Last Year Q2") {
      return (
        decidedDate >= dates.startOfLastQ2 && decidedDate <= dates.endOfLastQ2
      );
    } else if (filter === "Decided This Year Q3") {
      return decidedDate >= dates.startOfQ3 && decidedDate <= dates.endOfQ3;
    } else if (filter === "Decided Next Year Q3") {
      return (
        decidedDate >= dates.startOfNextQ3 && decidedDate <= dates.endOfNextQ3
      );
    } else if (filter === "Decided Last Year Q3") {
      return (
        decidedDate >= dates.startOfLastQ3 && decidedDate <= dates.endOfLastQ3
      );
    } else if (filter === "Decided This Year Q4") {
      return decidedDate >= dates.startOfQ4 && decidedDate <= dates.endOfQ4;
    } else if (filter === "Decided Next Year Q4") {
      return (
        decidedDate >= dates.startOfNextQ4 && decidedDate <= dates.endOfNextQ4
      );
    } else if (filter === "Decided Last Year Q4") {
      return (
        decidedDate >= dates.startOfLastQ4 && decidedDate <= dates.endOfLastQ4
      );
    } else if (filter === "Decided After Next Year") {
      return decidedDate > dates.endOfNextYearQ4;
    } else if (filter === "Decided Before Last Year") {
      return decidedDate < dates.startOfLastYearQ4;
    } else {
      // Return all Data if filter is not matched
      return true;
    }
  });
};

export const getUpdateChangeGridData = (
  updatedChangeData,
  dates,
  projectFilter,
  requesterFilter,
  approverFilter,
  dueDateFilter,
  decidedDateFilter,
  statusFilter,
  priorityFilter
) => {
  let projectFilteredData;
  if (parseInt(projectFilter) !== 0) {
    projectFilteredData = updatedChangeData?.filter(
      (item) => item?.ProjectID === parseInt(projectFilter)
    );
  } else {
    projectFilteredData = updatedChangeData;
  }

  let requestedFilteredData;
  if (parseInt(requesterFilter) !== 0) {
    requestedFilteredData = projectFilteredData?.filter((item) =>
      item?.changesdb_requested?.find(
        (assignee) =>
          parseInt(assignee?.resource_id) === parseInt(requesterFilter)
      )
    );
  } else {
    requestedFilteredData = projectFilteredData;
  }

  let approverFilteredData;
  if (parseInt(approverFilter) !== 0) {
    approverFilteredData = requestedFilteredData?.filter((item) =>
      item?.changesdb_approver?.find(
        (assignee) =>
          parseInt(assignee?.resource_id) === parseInt(approverFilter)
      )
    );
  } else {
    approverFilteredData = requestedFilteredData;
  }

  let statusFilteredData;
  if (statusFilter !== "All" && parseInt(statusFilter) !== 0) {
    statusFilteredData = approverFilteredData?.filter(
      (item) => item.Status === statusFilter
    );
  } else {
    statusFilteredData = approverFilteredData;
  }

  let priorityFilteredData;
  if (priorityFilter !== "All" && parseInt(priorityFilter) !== 0) {
    priorityFilteredData = statusFilteredData?.filter(
      (item) => item.Priority === priorityFilter
    );
  } else {
    priorityFilteredData = statusFilteredData;
  }

  const dueDateFilteredData = getActionDueDateFilteredData(
    priorityFilteredData,
    dueDateFilter,
    dates
  );
  const decidedDateFilteredData = getDecidedDateFilteredData(
    dueDateFilteredData,
    decidedDateFilter,
    dates
  );

  return decidedDateFilteredData;
};

//--------------DECISION-----------------
export const getDecisionDueDateFilteredData = (data, filter, dates) => {
  return data?.filter((item) => {
    const dueDate = new Date(item.DueDate);

    if (filter === "Overdue") {
      return dueDate < dates.today && item.Status !== "Decided";
    } else if (filter === "Due Today") {
      return dueDate === dates.today;
    } else if (filter === "Due Tomorrow") {
      return dueDate === dates.tomorrow;
    } else if (filter === "Due Yesterday") {
      return dueDate === dates.yesterday;
    } else if (filter === "Due This Week") {
      return dueDate >= dates.startOfWeek && dueDate <= dates.endOfWeek;
    } else if (filter === "Due Next Week") {
      return dueDate >= dates.startOfNextWeek && dueDate <= dates.endOfNextWeek;
    } else if (filter === "Due Last Week") {
      return dueDate >= dates.startOfLastWeek && dueDate <= dates.endOfLastWeek;
    } else if (filter === "Due This Month") {
      return dueDate >= dates.startOfMonth && dueDate <= dates.endOfMonth;
    } else if (filter === "Due Next Month") {
      return (
        dueDate >= dates.startOfNextMonth && dueDate <= dates.endOfNextMonth
      );
    } else if (filter === "Due Last Month") {
      return (
        dueDate >= dates.startOfLastMonth && dueDate <= dates.endOfLastMonth
      );
    } else if (filter === "Due This Quarter") {
      return dueDate >= dates.startOfQuarter && dueDate <= dates.endOfQuarter;
    } else if (filter === "Due Next Quarter") {
      return (
        dueDate >= dates.startOfNextQuarter && dueDate <= dates.endOfNextQuarter
      );
    } else if (filter === "Due Last Quarter") {
      return (
        dueDate >= dates.startOfLastQuarter && dueDate <= dates.endOfLastQuarter
      );
    } else if (filter === "Due This Year") {
      return dueDate >= dates.startOfYear && dueDate <= dates.endOfYear;
    } else if (filter === "Due Next Year") {
      return dueDate >= dates.startOfNextYear && dueDate <= dates.endOfNextYear;
    } else if (filter === "Due Last Year") {
      return dueDate >= dates.startOfLastYear && dueDate <= dates.endOfLastYear;
    } else if (filter === "Due This Year Q1") {
      return dueDate >= dates.startOfQ1 && dueDate <= dates.endOfQ1;
    } else if (filter === "Due Next Year Q1") {
      return dueDate >= dates.startOfNextQ1 && dueDate <= dates.endOfNextQ1;
    } else if (filter === "Due Last Year Q1") {
      return dueDate >= dates.startOfLastQ1 && dueDate <= dates.endOfLastQ1;
    } else if (filter === "Due This Year Q2") {
      return dueDate >= dates.startOfQ2 && dueDate <= dates.endOfQ2;
    } else if (filter === "Due Next Year Q2") {
      return dueDate >= dates.startOfNextQ2 && dueDate <= dates.endOfNextQ2;
    } else if (filter === "Due Last Year Q2") {
      return dueDate >= dates.startOfLastQ2 && dueDate <= dates.endOfLastQ2;
    } else if (filter === "Due This Year Q3") {
      return dueDate >= dates.startOfQ3 && dueDate <= dates.endOfQ3;
    } else if (filter === "Due Next Year Q3") {
      return dueDate >= dates.startOfNextQ3 && dueDate <= dates.endOfNextQ3;
    } else if (filter === "Due Last Year Q3") {
      return dueDate >= dates.startOfLastQ3 && dueDate <= dates.endOfLastQ3;
    } else if (filter === "Due This Year Q4") {
      return dueDate >= dates.startOfQ4 && dueDate <= dates.endOfQ4;
    } else if (filter === "Due Next Year Q4") {
      return dueDate >= dates.startOfNextQ4 && dueDate <= dates.endOfNextQ4;
    } else if (filter === "Due Last Year Q4") {
      return dueDate >= dates.startOfLastQ4 && dueDate <= dates.endOfLastQ4;
    } else if (filter === "Due After Next Year") {
      return dueDate > dates.endOfNextYearQ4;
    } else if (filter === "Due Before Last Year") {
      return dueDate < dates.startOfLastYearQ4;
    } else {
      // Return all Data if filter is not matched
      return true;
    }
  });
};
export const getUpdateDecisionGridData = (
  updatedDecisionData,
  dates,
  projectFilter,
  requesterFilter,
  deciderFilter,
  dueDateFilter,
  decidedDateFilter,
  statusFilter,
  priorityFilter
) => {
  let projectFilteredData;
  if (parseInt(projectFilter) !== 0) {
    projectFilteredData = updatedDecisionData?.filter(
      (item) => item?.ProjectID === parseInt(projectFilter)
    );
  } else {
    projectFilteredData = updatedDecisionData;
  }

  let requestedFilteredData;
  if (parseInt(requesterFilter) !== 0) {
    requestedFilteredData = projectFilteredData?.filter((item) =>
      item?.decisiondb_requested?.find(
        (requester) =>
          parseInt(requester?.resource_id) === parseInt(requesterFilter)
      )
    );
  } else {
    requestedFilteredData = projectFilteredData;
  }

  let deciderFilteredData;
  if (parseInt(deciderFilter) !== 0) {
    deciderFilteredData = requestedFilteredData?.filter((item) =>
      item?.decisiondb_decisions?.find(
        (decider) => parseInt(decider?.resource_id) === parseInt(deciderFilter)
      )
    );
  } else {
    deciderFilteredData = requestedFilteredData;
  }

  let statusFilteredData;
  if (statusFilter !== "All" && parseInt(statusFilter) !== 0) {
    statusFilteredData = deciderFilteredData?.filter(
      (item) => item.Status === statusFilter
    );
  } else {
    statusFilteredData = deciderFilteredData;
  }

  let priorityFilteredData;
  if (priorityFilter !== "All" && parseInt(priorityFilter) !== 0) {
    priorityFilteredData = statusFilteredData?.filter(
      (item) => item.Priority === priorityFilter
    );
  } else {
    priorityFilteredData = statusFilteredData;
  }

  const dueDateFilteredData = getDecisionDueDateFilteredData(
    priorityFilteredData,
    dueDateFilter,
    dates
  );
  const decidedDateFilteredData = getDecidedDateFilteredData(
    dueDateFilteredData,
    decidedDateFilter,
    dates
  );

  return decidedDateFilteredData;
};

//--------------COST-----------------
export const getInvoicedDateFilteredData = (data, filter, dates) => {
  return data?.filter((item) => {
    const invoicedDate = new Date(item.CostDate);

    if (filter === "Invoiced Today") {
      return invoicedDate === dates.today;
    } else if (filter === "Invoiced Tomorrow") {
      return invoicedDate === dates.tomorrow;
    } else if (filter === "Invoiced Yesterday") {
      return invoicedDate === dates.yesterday;
    } else if (filter === "Invoiced This Week") {
      return (
        invoicedDate >= dates.startOfWeek && invoicedDate <= dates.endOfWeek
      );
    } else if (filter === "Invoiced Next Week") {
      return (
        invoicedDate >= dates.startOfNextWeek &&
        invoicedDate <= dates.endOfNextWeek
      );
    } else if (filter === "Invoiced Last Week") {
      return (
        invoicedDate >= dates.startOfLastWeek &&
        invoicedDate <= dates.endOfLastWeek
      );
    } else if (filter === "Invoiced This Month") {
      return (
        invoicedDate >= dates.startOfMonth && invoicedDate <= dates.endOfMonth
      );
    } else if (filter === "Invoiced Next Month") {
      return (
        invoicedDate >= dates.startOfNextMonth &&
        invoicedDate <= dates.endOfNextMonth
      );
    } else if (filter === "Invoiced Last Month") {
      return (
        invoicedDate >= dates.startOfLastMonth &&
        invoicedDate <= dates.endOfLastMonth
      );
    } else if (filter === "Invoiced This Quarter") {
      return (
        invoicedDate >= dates.startOfQuarter &&
        invoicedDate <= dates.endOfQuarter
      );
    } else if (filter === "Invoiced Next Quarter") {
      return (
        invoicedDate >= dates.startOfNextQuarter &&
        invoicedDate <= dates.endOfNextQuarter
      );
    } else if (filter === "Invoiced Last Quarter") {
      return (
        invoicedDate >= dates.startOfLastQuarter &&
        invoicedDate <= dates.endOfLastQuarter
      );
    } else if (filter === "Invoiced This Year") {
      return (
        invoicedDate >= dates.startOfYear && invoicedDate <= dates.endOfYear
      );
    } else if (filter === "Invoiced Next Year") {
      return (
        invoicedDate >= dates.startOfNextYear &&
        invoicedDate <= dates.endOfNextYear
      );
    } else if (filter === "Invoiced Last Year") {
      return (
        invoicedDate >= dates.startOfLastYear &&
        invoicedDate <= dates.endOfLastYear
      );
    } else if (filter === "Invoiced This Year Q1") {
      return invoicedDate >= dates.startOfQ1 && invoicedDate <= dates.endOfQ1;
    } else if (filter === "Invoiced Next Year Q1") {
      return (
        invoicedDate >= dates.startOfNextQ1 && invoicedDate <= dates.endOfNextQ1
      );
    } else if (filter === "Invoiced Last Year Q1") {
      return (
        invoicedDate >= dates.startOfLastQ1 && invoicedDate <= dates.endOfLastQ1
      );
    } else if (filter === "Invoiced This Year Q2") {
      return invoicedDate >= dates.startOfQ2 && invoicedDate <= dates.endOfQ2;
    } else if (filter === "Invoiced Next Year Q2") {
      return (
        invoicedDate >= dates.startOfNextQ2 && invoicedDate <= dates.endOfNextQ2
      );
    } else if (filter === "Invoiced Last Year Q2") {
      return (
        invoicedDate >= dates.startOfLastQ2 && invoicedDate <= dates.endOfLastQ2
      );
    } else if (filter === "Invoiced This Year Q3") {
      return invoicedDate >= dates.startOfQ3 && invoicedDate <= dates.endOfQ3;
    } else if (filter === "Invoiced Next Year Q3") {
      return (
        invoicedDate >= dates.startOfNextQ3 && invoicedDate <= dates.endOfNextQ3
      );
    } else if (filter === "Invoiced Last Year Q3") {
      return (
        invoicedDate >= dates.startOfLastQ3 && invoicedDate <= dates.endOfLastQ3
      );
    } else if (filter === "Invoiced This Year Q4") {
      return invoicedDate >= dates.startOfQ4 && invoicedDate <= dates.endOfQ4;
    } else if (filter === "Invoiced Next Year Q4") {
      return (
        invoicedDate >= dates.startOfNextQ4 && invoicedDate <= dates.endOfNextQ4
      );
    } else if (filter === "Invoiced Last Year Q4") {
      return (
        invoicedDate >= dates.startOfLastQ4 && invoicedDate <= dates.endOfLastQ4
      );
    } else if (filter === "Invoiced After Next Year") {
      return invoicedDate > dates.endOfNextYearQ4;
    } else if (filter === "Invoiced Before Last Year") {
      return invoicedDate < dates.startOfLastYearQ4;
    } else {
      // Return all Data if filter is not matched
      return true;
    }
  });
};

export const getPaidDateFilteredData = (data, filter, dates) => {
  return data?.filter((item) => {
    const paidDate = new Date(item.PayDate);

    if (filter === "Paid Today") {
      return paidDate === dates.today;
    } else if (filter === "Paid Tomorrow") {
      return paidDate === dates.tomorrow;
    } else if (filter === "Paid Yesterday") {
      return paidDate === dates.yesterday;
    } else if (filter === "Paid This Week") {
      return paidDate >= dates.startOfWeek && paidDate <= dates.endOfWeek;
    } else if (filter === "Paid Next Week") {
      return (
        paidDate >= dates.startOfNextWeek && paidDate <= dates.endOfNextWeek
      );
    } else if (filter === "Paid Last Week") {
      return (
        paidDate >= dates.startOfLastWeek && paidDate <= dates.endOfLastWeek
      );
    } else if (filter === "Paid This Month") {
      return paidDate >= dates.startOfMonth && paidDate <= dates.endOfMonth;
    } else if (filter === "Paid Next Month") {
      return (
        paidDate >= dates.startOfNextMonth && paidDate <= dates.endOfNextMonth
      );
    } else if (filter === "Paid Last Month") {
      return (
        paidDate >= dates.startOfLastMonth && paidDate <= dates.endOfLastMonth
      );
    } else if (filter === "Paid This Quarter") {
      return paidDate >= dates.startOfQuarter && paidDate <= dates.endOfQuarter;
    } else if (filter === "Paid Next Quarter") {
      return (
        paidDate >= dates.startOfNextQuarter &&
        paidDate <= dates.endOfNextQuarter
      );
    } else if (filter === "Paid Last Quarter") {
      return (
        paidDate >= dates.startOfLastQuarter &&
        paidDate <= dates.endOfLastQuarter
      );
    } else if (filter === "Paid This Year") {
      return paidDate >= dates.startOfYear && paidDate <= dates.endOfYear;
    } else if (filter === "Paid Next Year") {
      return (
        paidDate >= dates.startOfNextYear && paidDate <= dates.endOfNextYear
      );
    } else if (filter === "Paid Last Year") {
      return (
        paidDate >= dates.startOfLastYear && paidDate <= dates.endOfLastYear
      );
    } else if (filter === "Paid This Year Q1") {
      return paidDate >= dates.startOfQ1 && paidDate <= dates.endOfQ1;
    } else if (filter === "Paid Next Year Q1") {
      return paidDate >= dates.startOfNextQ1 && paidDate <= dates.endOfNextQ1;
    } else if (filter === "Paid Last Year Q1") {
      return paidDate >= dates.startOfLastQ1 && paidDate <= dates.endOfLastQ1;
    } else if (filter === "Paid This Year Q2") {
      return paidDate >= dates.startOfQ2 && paidDate <= dates.endOfQ2;
    } else if (filter === "Paid Next Year Q2") {
      return paidDate >= dates.startOfNextQ2 && paidDate <= dates.endOfNextQ2;
    } else if (filter === "Paid Last Year Q2") {
      return paidDate >= dates.startOfLastQ2 && paidDate <= dates.endOfLastQ2;
    } else if (filter === "Paid This Year Q3") {
      return paidDate >= dates.startOfQ3 && paidDate <= dates.endOfQ3;
    } else if (filter === "Paid Next Year Q3") {
      return paidDate >= dates.startOfNextQ3 && paidDate <= dates.endOfNextQ3;
    } else if (filter === "Paid Last Year Q3") {
      return paidDate >= dates.startOfLastQ3 && paidDate <= dates.endOfLastQ3;
    } else if (filter === "Paid This Year Q4") {
      return paidDate >= dates.startOfQ4 && paidDate <= dates.endOfQ4;
    } else if (filter === "Paid Next Year Q4") {
      return paidDate >= dates.startOfNextQ4 && paidDate <= dates.endOfNextQ4;
    } else if (filter === "Paid Last Year Q4") {
      return paidDate >= dates.startOfLastQ4 && paidDate <= dates.endOfLastQ4;
    } else if (filter === "Paid After Next Year") {
      return paidDate > dates.endOfNextYearQ4;
    } else if (filter === "Paid Before Last Year") {
      return paidDate < dates.startOfLastYearQ4;
    } else {
      // Return all Data if filter is not matched
      return true;
    }
  });
};

export const getUpdateCostGridData = (
  updatedCostData,
  dates,
  projectFilter,
  assignedToFilter,
  invoicedDateFilter,
  paidDateFilter,
  statusFilter,
  categoryFilter,
  serviceProviderFilter
) => {
  let projectFilteredData;
  if (parseInt(projectFilter) !== 0) {
    projectFilteredData = updatedCostData?.filter(
      (item) => item?.ProjectID === parseInt(projectFilter)
    );
  } else {
    projectFilteredData = updatedCostData;
  }

  let assignedToFilteredData;
  if (parseInt(assignedToFilter) !== 0) {
    assignedToFilteredData = projectFilteredData?.filter((item) =>
      item?.costdb_assignee?.find(
        (assignee) =>
          parseInt(assignee?.resource_id) === parseInt(assignedToFilter)
      )
    );
  } else {
    assignedToFilteredData = projectFilteredData;
  }

  let statusFilteredData;
  if (statusFilter !== "All" && parseInt(statusFilter) !== 0) {
    statusFilteredData = assignedToFilteredData?.filter(
      (item) => item.Stage === statusFilter
    );
  } else {
    statusFilteredData = assignedToFilteredData;
  }

  let categoryFilteredData;
  if (categoryFilter !== "All" && parseInt(categoryFilter) !== 0) {
    categoryFilteredData = statusFilteredData?.filter(
      (item) => item.Category === categoryFilter
    );
  } else {
    categoryFilteredData = statusFilteredData;
  }

  let serviceProviderFilteredData;
  if (
    serviceProviderFilter !== "All" &&
    parseInt(serviceProviderFilter) !== 0
  ) {
    serviceProviderFilteredData = categoryFilteredData?.filter(
      (item) => item.ServiceProvider === serviceProviderFilter
    );
  } else {
    serviceProviderFilteredData = categoryFilteredData;
  }

  const invoiceDateFilteredData = getInvoicedDateFilteredData(
    serviceProviderFilteredData,
    invoicedDateFilter,
    dates
  );
  const payDateFilteredData = getPaidDateFilteredData(
    invoiceDateFilteredData,
    paidDateFilter,
    dates
  );

  return payDateFilteredData;
};
