import { getProjectAdministrators, getProjectManagers } from "./users";

//--------------------Common--------------------//
export function isProjectManager(currentUser, projectData) {
  let isProjectManager = false;
  const projects = projectData?.filter((project) =>
    project?.projectdb_manager
      ?.map((user) => user.resource_id)
      ?.includes(currentUser.id)
  );
  if (projects?.length > 0) {
    isProjectManager = true;
  }
  return isProjectManager;
}
export function isProjectAdministrator(currentUser, projectData) {
  let isProjectAdministrator = false;
  const projects = projectData?.filter((project) =>
    project?.projectdb_admin
      ?.map((user) => user.resource_id)
      ?.includes(currentUser.id)
  );
  if (projects?.length > 0) {
    isProjectAdministrator = true;
  }
  return isProjectAdministrator;
}

export function isManager(currentUser, project) {
  const users = project?.projectdb_manager?.map((user) => user.resource_id);
  let isManager = false;
  const included = users?.includes(currentUser.id);
  if (included) {
    isManager = true;
  }
  return isManager;
}

export function isPM(currentUser, projectID, projectData) {
  const managers = getProjectManagers(projectData, projectID);
  const users = managers?.map((user) => user.resource_id);
  let isPM = false;
  const included = users?.includes(currentUser.id);
  if (included) {
    isPM = true;
  }
  return isPM;
}

export function isPA(currentUser, projectID, projectData) {
  const admins = getProjectAdministrators(projectData, projectID);
  const users = admins?.map((user) => user.resource_id);
  let isPA = false;
  const included = users?.includes(currentUser.id);
  if (included) {
    isPA = true;
  }
  return isPA;
}

//--------------------Users--------------------//
export function getAddUserPermission(currentUser, projectData) {
  let permissions = false;
  if (
    currentUser?.Type === "Root" ||
    currentUser?.isAdmin === true ||
    isProjectManager(currentUser, projectData) === true ||
    isProjectAdministrator(currentUser, projectData) === true
  ) {
    permissions = true;
  }
  return permissions;
}
export function getEditUserPermission(currentUser, user, projectData) {
  let permissions = false;
  if (
    currentUser?.Type === "Root" ||
    currentUser?.isAdmin === true ||
    isProjectManager(currentUser, projectData) === true ||
    isProjectAdministrator(currentUser, projectData) === true ||
    (currentUser.Type !== "Root" && currentUser?.id === user?.id)
  ) {
    permissions = true;
  }
  return permissions;
}
export function getPmUserPermission(currentUser, user, projectData) {
  let permissions = false;
  if (
    currentUser?.Type === "Root" ||
    currentUser?.isAdmin === true ||
    isProjectManager(currentUser, projectData) === true
  ) {
    permissions = true;
  }
  return permissions;
}
export function getDeleteUserPermission(currentUser, user) {
  let permissions = false;
  if (
    currentUser?.Type === "Root" ||
    (currentUser?.isAdmin === true && currentUser?.id !== user?.id)
  ) {
    permissions = true;
  }
  return permissions;
}
export function getAdminUserPermission(currentUser, user) {
  let permissions = false;
  if (
    currentUser?.Type === "Root" ||
    (currentUser?.isAdmin === true && currentUser?.id !== user?.id)
  ) {
    permissions = true;
  }
  return permissions;
}
//--------------------Projects--------------------//
export function getAddProjectPermission(currentUser) {
  let permissions = false;
  if (currentUser.Type === "Root" || currentUser.isAdmin === true) {
    permissions = true;
  }
  return permissions;
}
export function getEditProjectPermission(currentUser, project) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isManager(currentUser, project) === true
  ) {
    permissions = true;
  }
  return permissions;
}
export function getSuperProjectPermission(currentUser) {
  let permissions = false;
  if (currentUser.Type === "Root" || currentUser.isAdmin === true) {
    permissions = true;
  }
  return permissions;
}
//--------------------Tasks--------------------//
export function isTaskAssignee(currentUser, task) {
  const users = task?.taskdb_assignee.map((user) => user.resource_id);
  let isTaskAssignee = false;
  const included = users?.includes(currentUser.id);
  if (included) {
    isTaskAssignee = true;
  }
  return isTaskAssignee;
}
export function getAddTaskPermission(currentUser, projectData) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isProjectManager(currentUser, projectData) === true ||
    isProjectAdministrator(currentUser, projectData) === true
  ) {
    permissions = true;
  }
  return permissions;
}
export function getEditTaskPermission(currentUser, task, projectData) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isPM(currentUser, task?.ProjectID, projectData) === true ||
    isPA(currentUser, task?.ProjectID, projectData) === true ||
    isTaskAssignee(currentUser, task) === true
  ) {
    permissions = true;
  }
  return permissions;
}
export function getSuperTaskPermission(currentUser, task, projectData) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isPM(currentUser, task?.ProjectID, projectData) === true
  ) {
    permissions = true;
  }
  return permissions;
}
//--------------------Risks--------------------//
export function isRiskAssignee(currentUser, risk) {
  const users = risk?.riskdb_assignee.map((user) => user.resource_id);
  let isRiskAssignee = false;
  const included = users?.includes(currentUser.id);
  if (included) {
    isRiskAssignee = true;
  }
  return isRiskAssignee;
}
export function getAddRiskPermission(currentUser, projectData) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isProjectManager(currentUser, projectData) === true ||
    isProjectAdministrator(currentUser, projectData) === true
  ) {
    permissions = true;
  }
  return permissions;
}
export function getEditRiskPermission(currentUser, risk, projectData) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isPM(currentUser, risk?.ProjectID, projectData) === true ||
    isPA(currentUser, risk?.ProjectID, projectData) === true ||
    isRiskAssignee(currentUser, risk) === true
  ) {
    permissions = true;
  }
  return permissions;
}
export function getSuperRiskPermission(currentUser, risk, projectData) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isPM(currentUser, risk?.ProjectID, projectData) === true
  ) {
    permissions = true;
  }
  return permissions;
}
//--------------------Issues--------------------//
export function isIssueAssignee(currentUser, issue) {
  const users = issue?.issuedb_assignee.map((user) => user.resource_id);
  let isIssueAssignee = false;
  const included = users?.includes(currentUser.id);
  if (included) {
    isIssueAssignee = true;
  }
  return isIssueAssignee;
}
export function getAddIssuePermission(currentUser, projectData) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isProjectManager(currentUser, projectData) === true ||
    isProjectAdministrator(currentUser, projectData) === true
  ) {
    permissions = true;
  }
  return permissions;
}
export function getEditIssuePermission(currentUser, issue, projectData) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isPM(currentUser, issue?.ProjectID, projectData) === true ||
    isPA(currentUser, issue?.ProjectID, projectData) === true ||
    isIssueAssignee(currentUser, issue) === true
  ) {
    permissions = true;
  }
  return permissions;
}
export function getSuperIssuePermission(currentUser, issue, projectData) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isPM(currentUser, issue?.ProjectID, projectData) === true
  ) {
    permissions = true;
  }
  return permissions;
}
//--------------------Actions--------------------//
export function isActionAssignee(currentUser, action) {
  const users = action?.actiondb_assignee.map((user) => user.resource_id);
  let isActionAssignee = false;
  const included = users?.includes(currentUser.id);
  if (included) {
    isActionAssignee = true;
  }
  console.log(isActionAssignee, "isActionAssignee");
  return isActionAssignee;
}
export function getAddActionPermission(currentUser, projectData) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isProjectManager(currentUser, projectData) === true ||
    isProjectAdministrator(currentUser, projectData) === true
  ) {
    permissions = true;
  }
  return permissions;
}
export function getEditActionPermission(currentUser, action, projectData) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isPM(currentUser, action?.ProjectID, projectData) === true ||
    isPA(currentUser, action?.ProjectID, projectData) === true ||
    isActionAssignee(currentUser, action) === true
  ) {
    permissions = true;
  }
  return permissions;
}
export function getSuperActionPermission(currentUser, action, projectData) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isPM(currentUser, action?.ProjectID, projectData) === true
  ) {
    permissions = true;
  }
  return permissions;
}
//--------------------Costs--------------------//
export function isCostAssignee(currentUser, cost) {
  const users = cost?.costdb_assignee.map((user) => user.resource_id);
  let isCostAssignee = false;
  const included = users?.includes(currentUser.id);
  if (included) {
    isCostAssignee = true;
  }
  return isCostAssignee;
}
export function getAddCostPermission(currentUser, projectData) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isProjectManager(currentUser, projectData) === true ||
    isProjectAdministrator(currentUser, projectData) === true
  ) {
    permissions = true;
  }
  return permissions;
}
export function getEditCostPermission(currentUser, cost, projectData) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isPM(currentUser, cost?.ProjectID, projectData) === true ||
    isPA(currentUser, cost?.ProjectID, projectData) === true ||
    isCostAssignee(currentUser, cost) === true
  ) {
    permissions = true;
  }
  return permissions;
}
export function getSuperCostPermission(currentUser, cost, projectData) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isPM(currentUser, cost?.ProjectID, projectData) === true
  ) {
    permissions = true;
  }
  return permissions;
}
//--------------------Changes--------------------//
export function isChangeRequester(currentUser, change) {
  const users = change?.changesdb_requested.map((user) => user.resource_id);
  let isChangeRequester = false;
  const included = users?.includes(currentUser.id);
  if (included) {
    isChangeRequester = true;
  }
  return isChangeRequester;
}
export function isChangeApprover(currentUser, change) {
  const users = change?.changesdb_approver.map((user) => user.resource_id);
  let isChangeApprover = false;
  const included = users?.includes(currentUser.id);
  if (included) {
    isChangeApprover = true;
  }
  return isChangeApprover;
}
export function getAddChangePermission(currentUser, projectData) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isProjectManager(currentUser, projectData) === true ||
    isProjectAdministrator(currentUser, projectData) === true
  ) {
    permissions = true;
  }
  return permissions;
}
export function getEditChangePermission(currentUser, change, projectData) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isPM(currentUser, change?.ProjectID, projectData) === true ||
    isPA(currentUser, change?.ProjectID, projectData) === true ||
    isChangeRequester(currentUser, change) === true ||
    isChangeApprover(currentUser, change) === true
  ) {
    permissions = true;
  }
  return permissions;
}
export function getSuperChangePermission(currentUser, change, projectData) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isPM(currentUser, change?.ProjectID, projectData) === true
  ) {
    permissions = true;
  }
  return permissions;
}
//--------------------Decisions--------------------//
export function isDecisionRequester(currentUser, decision) {
  const users = decision?.decisiondb_requested.map((user) => user.resource_id);
  let isDecisionRequester = false;
  const included = users?.includes(currentUser.id);
  if (included) {
    isDecisionRequester = true;
  }
  return isDecisionRequester;
}
export function isDecisionMaker(currentUser, decision) {
  const users = decision?.decisiondb_decisions.map((user) => user.resource_id);
  let isDecisionMaker = false;
  const included = users?.includes(currentUser.id);
  if (included) {
    isDecisionMaker = true;
  }
  return isDecisionMaker;
}
export function getAddDecisionPermission(currentUser, projectData) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isProjectManager(currentUser, projectData) === true ||
    isProjectAdministrator(currentUser, projectData) === true
  ) {
    permissions = true;
  }
  return permissions;
}
export function getEditDecisionPermission(currentUser, decision, projectData) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isPM(currentUser, decision?.ProjectID, projectData) === true ||
    isPA(currentUser, decision?.ProjectID, projectData) === true ||
    isDecisionRequester(currentUser, decision) === true ||
    isDecisionMaker(currentUser, decision) === true
  ) {
    permissions = true;
  }
  return permissions;
}
export function getSuperDecisionPermission(currentUser, decision, projectData) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isPM(currentUser, decision?.ProjectID, projectData) === true
  ) {
    permissions = true;
  }
  return permissions;
}
//--------------------Absentee--------------------//
export function getAddAbsenteePermission(currentUser, projectData) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isProjectManager(currentUser, projectData) === true ||
    isProjectAdministrator(currentUser, projectData) === true
  ) {
    permissions = true;
  }
  return permissions;
}
export function getEditAbsenteePermission(currentUser, projectData) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isProjectManager(currentUser, projectData) === true ||
    isProjectAdministrator(currentUser, projectData) === true
  ) {
    permissions = true;
  }
  return permissions;
}
export function getDeleteAbsenteePermission(currentUser) {
  let permissions = false;
  if (currentUser.Type === "Root" || currentUser.isAdmin === true) {
    permissions = true;
  }
  return permissions;
}
//--------------------Timesheet--------------------//
export function getAddTimesheetPermission(currentUser, projectData) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isProjectManager(currentUser, projectData) === true ||
    isProjectAdministrator(currentUser, projectData) === true
  ) {
    permissions = true;
  }
  return permissions;
}
export function getEditTimesheetPermission(
  currentUser,
  timesheet,
  projectData
) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    isPM(currentUser, timesheet?.ProjectID, projectData) === true ||
    isPA(currentUser, timesheet?.ProjectID, projectData) === true
  ) {
    permissions = true;
  }
  return permissions;
}
export function getDeleteTimesheetPermission(currentUser) {
  let permissions = false;
  if (currentUser.Type === "Root" || currentUser.isAdmin === true) {
    permissions = true;
  }
  return permissions;
}

//--------------------Financials--------------------//
export function getFinancialPermission(currentUser) {
  let permissions = false;
  if (
    currentUser.Type === "Root" ||
    currentUser.isAdmin === true ||
    currentUser.hasFin === true
  ) {
    permissions = true;
  }
  return permissions;
}

//--------------------ActiveAccount--------------------//
export function getActiveAccount(root) {
  let isActive = true;
  const sub = root?.subscriptions?.[0];

  if (
    sub &&
    (sub.Package === "Basic" ||
      sub.Package === "Standard" ||
      sub.Package === "Premium") &&
    sub.Payment &&
    !sub.Is_Expired
  ) {
    isActive = true;
  }
  return isActive;
}
