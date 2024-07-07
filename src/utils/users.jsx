//--------------------Projects--------------------//
export function getProjectManagers(data, projectID) {
  const project = data?.find((item) => item?.id === parseInt(projectID));
  const managers = project?.projectdb_manager;
  return managers ? managers : [];
}

export function getProjectAdministrators(data, projectID) {
  const project = data?.find((item) => item?.id === parseInt(projectID));
  const administrators = project?.projectdb_admin;
  return administrators ? administrators : [];
}

export function getProjectTaskAssignees(data, projectID) {
  const tasks = data?.filter((item) => item?.ProjectID === parseInt(projectID));
  const assignees = [];
  tasks.forEach((task) => {
    if (task.taskdb_assignee) {
      assignees.push(...task.taskdb_assignee);
    }
  });
  return assignees;
}

export function getProjectRiskAssignees(data, projectID) {
  const risks = data?.filter((item) => item?.ProjectID === parseInt(projectID));
  const assignees = [];
  risks.forEach((risk) => {
    if (risk.riskdb_assignee) {
      assignees.push(...risk.riskdb_assignee);
    }
  });
  return assignees;
}

export function getProjectIssueAssignees(data, projectID) {
  const issues = data?.filter((item) => item?.ProjectID === parseInt(projectID));
  const assignees = [];
  issues.forEach((issue) => {
    if (issue.issuedb_assignee) {
      assignees.push(...issue.issuedb_assignee);
    }
  });
  return assignees;
}

export function getProjectActionAssignees(data, projectID) {
  const actions = data?.filter((item) => item?.ProjectID === parseInt(projectID));
  const assignees = [];
  actions.forEach((action) => {
    if (action.actiondb_assignee) {
      assignees.push(...action.actiondb_assignee);
    }
  });
  return assignees;
}

export function getProjectCostAssignees(data, projectID) {
  const costs = data?.filter((item) => item?.ProjectID === parseInt(projectID));
  const assignees = [];
  costs.forEach((cost) => {
    if (cost.costdb_assignee) {
      assignees.push(...cost.costdb_assignee);
    }
  });
  return assignees;
}

export function getProjectChangeRequesters(data, projectID) {
  const changes = data?.filter((item) => item?.ProjectID === parseInt(projectID));
  const requesters = [];
  changes.forEach((change) => {
    if (change.changesdb_requested) {
      requesters.push(...change.changesdb_requested);
    }
  });
  return requesters;
}

export function getProjectChangeApprovers(data, projectID) {
  const changes = data?.filter((item) => item?.ProjectID === parseInt(projectID));
  const approvers = [];
  changes.forEach((change) => {
    if (change.changesdb_approver) {
      approvers.push(...change.changesdb_approver);
    }
  });
  return approvers;
}

export function getProjectDecisionRequesters(data, projectID) {
  const decisions = data?.filter((item) => item?.ProjectID === parseInt(projectID));
  const requesters = [];
  decisions.forEach((decision) => {
    if (decision.decisiondb_requested) {
      requesters.push(...decision.decisiondb_requested);
    }
  });
  return requesters;
}

export function getProjectDecisionMakers(data, projectID) {
  const decisions = data?.filter((item) => item?.ProjectID === parseInt(projectID));
  const makers = [];
  decisions.forEach((decision) => {
    if (decision.decisiondb_decisions) {
      makers.push(...decision.decisiondb_decisions);
    }
  });
  return makers;
}

// Remove the current user
export function removeCurrentUser(uniqueUsers, currentUser) {
  let chatUsers = [];
  if (currentUser.Type === "Root") {
    chatUsers = uniqueUsers;
  } else {
    chatUsers = uniqueUsers.filter((user) => user !== currentUser.id);
  }
  return chatUsers;
}

//--------------------Projects--------------------//
export function getProjectUsers(projectData, taskData, costData, projectID) {
  const managers = projectData?.projectdb_manager;
  const administrators = projectData?.projectdb_admin;

  const taskAssignees = getProjectTaskAssignees(taskData, projectID);
  const costAssignees = getProjectCostAssignees(costData, projectID);

  const allUsers = [...managers, ...administrators, ...taskAssignees, ...costAssignees];

  // Remove duplicates by converting to Set and back to array
  const uniqueUsers = Array.from(new Set(allUsers.map((user) => user.resource_id)));
  return uniqueUsers;
}
export function getProjectChatUsers(projectData, taskData, costData, projectID, currentUser) {
  const uniqueUsers = getProjectUsers(projectData, taskData, costData, projectID);

  // Remove the current user
  if (currentUser.Type === "Root") return uniqueUsers;
  else return uniqueUsers.filter((user) => user !== currentUser.id);
}

//--------------------Tasks--------------------//
export function getTaskUsers(projectData, taskData, projectID) {
  const managers = getProjectManagers(projectData, projectID);
  const administrators = getProjectAdministrators(projectData, projectID);
  const taskAssignees = taskData.taskdb_assignee;

  // Combine all users into one array
  const allUsers = [...managers, ...administrators, ...taskAssignees];

  // Remove duplicates by converting to Set and back to array
  const uniqueUsers = Array.from(new Set(allUsers.map((user) => user.resource_id)));

  return uniqueUsers;
}
export function getTaskChatUsers(projectData, taskData, projectID, currentUser) {
  const uniqueUsers = getTaskUsers(projectData, taskData, projectID);

  // Remove the current user
  if (currentUser.Type === "Root") return uniqueUsers;
  else return uniqueUsers.filter((user) => user !== currentUser.id);
}

//--------------------Risks--------------------//
export function getRiskUsers(projectData, riskData, projectID) {
  const managers = getProjectManagers(projectData, projectID);
  const administrators = getProjectAdministrators(projectData, projectID);
  const riskAssignees = riskData.riskdb_assignee;

  // Combine all users into one array
  const allUsers = [...managers, ...administrators, ...riskAssignees];

  // Remove duplicates by converting to Set and back to array
  const uniqueUsers = Array.from(new Set(allUsers.map((user) => user.resource_id)));

  return uniqueUsers;
}
export function getRiskChatUsers(projectData, riskData, projectID, currentUser) {
  const uniqueUsers = getRiskUsers(projectData, riskData, projectID);

  // Remove the current user
  if (currentUser.Type === "Root") return uniqueUsers;
  return uniqueUsers.filter((user) => user !== currentUser.id);
}

//--------------------Issues--------------------//
export function getIssueUsers(projectData, issueData, projectID) {
  const managers = getProjectManagers(projectData, projectID);
  const administrators = getProjectAdministrators(projectData, projectID);
  const issueAssignees = issueData.issuedb_assignee;

  // Combine all users into one array
  const allUsers = [...managers, ...administrators, ...issueAssignees];

  // Remove duplicates by converting to Set and back to array
  const uniqueUsers = Array.from(new Set(allUsers.map((user) => user.resource_id)));

  return uniqueUsers;
}
export function getIssueChatUsers(projectData, issueData, projectID, currentUser) {
  const uniqueUsers = getIssueUsers(projectData, issueData, projectID);
  // Remove the current user

  if (currentUser.Type === "Root") return uniqueUsers;
  return uniqueUsers.filter((user) => user !== currentUser.id);
}

//--------------------Actions--------------------//
export function getActionUsers(projectData, actionData, projectID) {
  const managers = getProjectManagers(projectData, projectID);
  const administrators = getProjectAdministrators(projectData, projectID);
  const actionAssignees = actionData.actiondb_assignee;

  // Combine all users into one array
  const allUsers = [...managers, ...administrators, ...actionAssignees];

  // Remove duplicates by converting to Set and back to array
  const uniqueUsers = Array.from(new Set(allUsers.map((user) => user.resource_id)));

  return uniqueUsers;
}
export function getActionChatUsers(projectData, actionData, projectID, currentUser) {
  const uniqueUsers = getActionUsers(projectData, actionData, projectID);
  // Remove the current user
  if (currentUser.Type === "Root") return uniqueUsers;
  return uniqueUsers.filter((user) => user !== currentUser.id);
}

//--------------------Costs--------------------//
export function getCostUsers(projectData, costData, projectID) {
  const managers = getProjectManagers(projectData, projectID);
  const administrators = getProjectAdministrators(projectData, projectID);
  const costAssignees = costData.costdb_assignee;

  // Combine all users into one array
  const allUsers = [...managers, ...administrators, ...costAssignees];

  // Remove duplicates by converting to Set and back to array
  const uniqueUsers = Array.from(new Set(allUsers.map((user) => user.resource_id)));

  return uniqueUsers;
}
export function getCostChatUsers(projectData, costData, projectID, currentUser) {
  const uniqueUsers = getCostUsers(projectData, costData, projectID);

  // Remove the current user
  if (currentUser.Type === "Root") return uniqueUsers;
  return uniqueUsers.filter((user) => user !== currentUser.id);
}

//--------------------Changes--------------------//
export function getChangeUsers(projectData, changeData, projectID) {
  const managers = getProjectManagers(projectData, projectID);
  const administrators = getProjectAdministrators(projectData, projectID);
  const changeRequesters = changeData.changesdb_requested;
  const changeApprovers = changeData.changesdb_approver;

  // Combine all users into one array
  const allUsers = [...managers, ...administrators, ...changeRequesters, ...changeApprovers];

  // Remove duplicates by converting to Set and back to array
  const uniqueUsers = Array.from(new Set(allUsers.map((user) => user.resource_id)));

  return uniqueUsers;
}

export function getChangeChatUsers(projectData, changeData, projectID, currentUser) {
  const uniqueUsers = getChangeUsers(projectData, changeData, projectID);

  if (currentUser.Type === "Root") return uniqueUsers;
  return uniqueUsers.filter((user) => user !== currentUser.id);
}

//--------------------Decisions--------------------//
export function getDecisionUsers(projectData, decisionData, projectID) {
  const managers = getProjectManagers(projectData, projectID);
  const administrators = getProjectAdministrators(projectData, projectID);
  const decisionRequesters = decisionData.decisiondb_requested;
  const decisionMakers = decisionData.decisiondb_decisions;

  // Combine all users into one array
  const allUsers = [...managers, ...administrators, ...decisionRequesters, ...decisionMakers];

  // Remove duplicates by converting to Set and back to array
  const uniqueUsers = Array.from(new Set(allUsers.map((user) => user.resource_id)));

  return uniqueUsers;
}

export function getDecisionChatUsers(projectData, decisionData, projectID, currentUser) {
  const uniqueUsers = getDecisionUsers(projectData, decisionData, projectID);

  if (currentUser.Type === "Root") return uniqueUsers;
  return uniqueUsers.filter((user) => user !== currentUser.id);
}

//--------------------Timesheet--------------------//
export function getTimesheetUsers(projectData, timesheetData, projectID) {
  const managers = getProjectManagers(projectData, projectID);
  const administrators = getProjectAdministrators(projectData, projectID);
  const timesheetRequester = [timesheetData?.resourcesdb];
  const timesheetApprovers = [timesheetData?.timesheetdb_approver];
  // Combine all users into one array
  const allUsers = [...managers, ...administrators, ...timesheetRequester, ...timesheetApprovers];

  // Remove duplicates by converting to Set and back to array
  const uniqueUsers = Array.from(new Set(allUsers.map((user) => user?.resource_id || user?.id)));

  return uniqueUsers;
}

export function getTimesheetChatUsers(projectData, timesheetData, projectID, currentUser) {
  const uniqueUsers = getTimesheetUsers(projectData, timesheetData, projectID);

  if (currentUser.Type === "Root") return uniqueUsers;
  return uniqueUsers.filter((user) => user !== currentUser.id);
}

//--------------------Absentee--------------------//
export function getAbsenteeChatUsers(resourceData, currentUser) {
  const uniqueUsers = Array.from(new Set(resourceData.map((user) => user.id)));

  if (currentUser.Type === "Root") return uniqueUsers;
  return uniqueUsers.filter((user) => user !== currentUser.id);
}

//--------------------Resources--------------------//
export function getAllChatUsers(resourceData, currentUser) {
  const uniqueUsers = Array.from(new Set(resourceData.map((user) => user.id)));

  if (currentUser.Type === "Root") return uniqueUsers;
  return uniqueUsers.filter((user) => user !== currentUser.id);
}
