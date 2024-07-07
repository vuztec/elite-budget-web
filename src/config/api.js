import axios from "./axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

/* ----------- =============== Tasks API ============= ---------------- */

export const getRootUser = async () => {
  const response = await axios.get(SERVER_URL + `/api/rootuser/id`);

  if (response.data.status === "success") return response.data.items;
  else return data;
};

/* ----------- =============== Tasks API ============= ---------------- */

export const getTasks = async () => {
  const response = await axios.get(SERVER_URL + `/api/task/rootid`);

  if (response.data.status === "success") return response.data?.items;
  else return data;
};

/* ----------- ================ Projects API ================ ---------------- */

export const getProjects = async () => {
  const response = await axios.get(SERVER_URL + `/api/project/rootid`);

  if (response.data.status === "success") return response.data.items;
  else return data;
};

/* ---------- ================== Resources API ================= ---------------- */

export const getResources = async () => {
  const response = await axios.get(SERVER_URL + `/api/resource/rootid`);

  if (response.data.status === "success") return response.data.items;
  else return data;
};

/* ---------- ================== Risks API ================= ---------------- */

export const getRisks = async () => {
  const response = await axios.get(SERVER_URL + `/api/risk/rootid`);

  if (response.data.status === "success") return response.data.items;
  else return data;
};

/* ---------- ================== Risks API ================= ---------------- */

export const getCosts = async () => {
  const response = await axios.get(SERVER_URL + `/api/cost/rootid`);

  if (response.data.status === "success") return response.data.items;
  else return data;
};

/* ---------- ================== Actions API ================= ---------------- */

export const getActions = async () => {
  const response = await axios.get(SERVER_URL + `/api/action/rootid`);

  if (response.data.status === "success") return response.data.items;
  else return data;
};

/* ---------- ================== Changes API ================= ---------------- */

export const getChanges = async () => {
  const response = await axios.get(SERVER_URL + `/api/change/rootid`);

  if (response.data.status === "success") return response.data.items;
  else return data;
};

/* ---------- ================== Decisions API ================= ---------------- */

export const getDecisions = async () => {
  const response = await axios.get(SERVER_URL + `/api/decision/rootid`);

  if (response.data.status === "success") return response.data.items;
  else return data;
};

/* ---------- ================== Issues API ================= ---------------- */

export const getIssues = async () => {
  const response = await axios.get(SERVER_URL + `/api/issue/rootid`);

  if (response.data.status === "success") return response.data.items;
  else return data;
};

/* ---------- ================== Abseentees API ================= ---------------- */

export const getAbsentees = async () => {
  const response = await axios.get(SERVER_URL + `/api/absentee/rootid`);

  if (response.data.status === "success") return response.data.items;
  else return data;
};

/* ---------- ================== Date Format API ================= ---------------- */

export const getDateFormat = async () => {
  const response = await axios.get(SERVER_URL + `/api/dateformat/rootid`);

  if (response.data.status === "success") return response.data.items;
  else return data;
};

/* ---------- ================== Currency API ================= ---------------- */

export const getCurrency = async () => {
  const response = await axios.get(SERVER_URL + `/api/currency/rootid`);

  if (response.data.status === "success") return response.data.items;
  else return data;
};

/* ---------- ================== Week Start API ================= ---------------- */

export const getWeekStart = async () => {
  const response = await axios.get(SERVER_URL + `/api/weekstart/rootid`);

  if (response.data.status === "success") return response.data.items;
  else return data;
};

/* ---------- ================== Weekend API ================= ---------------- */

export const getWeekend = async () => {
  const response = await axios.get(SERVER_URL + `/api/weekend/rootid`);

  if (response.data.status === "success") return response.data.items;
  else return data;
};

/* ---------- ================== Holiday API ================= ---------------- */

export const getHoliday = async () => {
  const response = await axios.get(SERVER_URL + `/api/holiday/rootid`);

  if (response.data.status === "success") return response.data.items;
  else return data;
};

/* ---------- ================== Timesheet API ================= ---------------- */

export const getTimesheets = async () => {
  const response = await axios.get(SERVER_URL + `/api/timesheet/rootid`);

  if (response.data.status === "success") return response.data.items;
  else return data;
};

/* ---------- ================== Attachments API ================= ---------------- */

export const getAttachments = async (type, id) => {
  if (!id) return [];
  const response = await axios.get(SERVER_URL + `/api/attachment?type=${type}&id=${id}`);

  if (response.data.status === "success") return response.data.items;
  else return data;
};

/* ---------- ================== Comments API ================= ---------------- */

export const getComments = async (type, id) => {
  if (!id) return [];
  const response = await axios.get(SERVER_URL + `/api/comment?type=${type}&id=${id}`);

  if (response.data.status === "success") return response.data.items;
  else return data;
};

/* ---------- ================== Sub Task API ================= ---------------- */

export const getSubTasks = async (type, id) => {
  if (!id) return [];
  const response = await axios.get(SERVER_URL + `/api/subtask?type=${type}&id=${id}`);

  if (response.data.status === "success") return response.data.items;
  else return data;
};

/* ---------- ================== Notification API ================= ---------------- */

export const getNotifications = async () => {
  const response = await axios.get(SERVER_URL + `/api/notification/unread`);

  if (response.data.status === "success") return response.data.items;
  else return data;
};

/* ----------- ================ Exchange Rate ================ ----------------- */

export const getExchangeRate = async (currency) => {
  const response = await axios.get(SERVER_URL + `/api/exchange-rate/${currency}`);

  if (response.data.status === "success") return response.data.items;
  else return data;
};
