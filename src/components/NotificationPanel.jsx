import { Popover, Transition } from "@headlessui/react";
import moment from "moment";
import { Fragment, useState } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { useQuery, useQueryClient } from "react-query";
import { getCosts, getProjects, getResources, getTasks } from "../config/api";
import { getAbsenteeChatUsers, getCostChatUsers, getProjectChatUsers, getTaskChatUsers, getTimesheetChatUsers } from "../utils/users";
import useUserStore from "../app/user";
import SubTasksDialog, { AttachmentsDialog, CommentsDialog } from "./DisplayDialogs";
import {
  getAddAbsenteePermission,
  getAddTimesheetPermission,
  getAddUserPermission,
  getDeleteTimesheetPermission,
  getEditAbsenteePermission,
  getEditCostPermission,
  getEditProjectPermission,
  getEditTaskPermission,
  getEditTimesheetPermission,
  getEditUserPermission,
  getSuperCostPermission,
  getSuperProjectPermission,
  getSuperTaskPermission,
} from "../utils/permissions";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const ICONS = {
  alert: <HiBellAlert className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" />,
  message: <BiSolidMessageRounded className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" />,
};

const NotificationPanel = ({ notifications }) => {
  const [selected, setSelected] = useState(null);
  const [selectedChatUsers, setSelectedChatUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [openComments, setOpenComments] = useState(false);
  const [openAttachments, setOpenAttachments] = useState(false);
  const [openSubTask, setOpenSubTask] = useState(false);
  const [hasAdd, setHasAdd] = useState(false);
  const [hasEdit, setHasEdit] = useState(false);
  const [hasDel, setHasDel] = useState(false);
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: projectData } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 1000 * 60 * 60,
  });

  const { data: taskData } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    staleTime: 1000 * 60 * 60,
  });

  const { data: resourceData } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
    staleTime: 1000 * 60 * 60,
  });

  const { data: costData } = useQuery({
    queryKey: ["costs"],
    queryFn: getCosts,
    staleTime: 1000 * 60 * 60,
  });

  const readHandler = () => {
    axios
      .patch(SERVER_URL + `/api/notification/read-all`)
      .then(({ data }) => {
        queryClient.setQueryData(["notifications"], () => []);
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  };

  const handleCommentsNotification = (notif, column) => {
    let notif_type = "";
    let temp_query = "";
    let chatUsers = [];
    let temp_add = false;
    let temp_edit = false;
    let temp_del = false;

    if (notif.project_id) {
      notif_type = "project_id";
      temp_query = "projects";
      setSelected(() => notif.projectdb);
      chatUsers = getProjectChatUsers(notif.projectdb, taskData, costData, notif.project_id, user);

      temp_add = getSuperProjectPermission(user);
      temp_edit = getEditProjectPermission(user, notif.projectdb);
      temp_del = temp_add;
    } else if (notif.task_id) {
      notif_type = "task_id";
      temp_query = "tasks";

      setSelected(() => notif.taskdb);

      chatUsers = getTaskChatUsers(projectData, notif.taskdb, notif.taskdb.ProjectID, user);

      temp_add = getSuperTaskPermission(user, notif.taskdb, projectData);
      temp_edit = getEditTaskPermission(user, notif.taskdb, projectData);
      temp_del = temp_add;
    } else if (notif.cost_id) {
      notif_type = "cost_id";
      temp_query = "costs";
      setSelected(() => notif.costdb);
      chatUsers = getCostChatUsers(projectData, notif.costdb, notif.costdb.ProjectID, user);

      temp_add = getSuperCostPermission(user, notif.costdb, projectData);
      temp_edit = getEditCostPermission(user, notif.costdb, projectData);
      temp_del = temp_add;
    } else if (notif.timesheet_id) {
      notif_type = "timesheet_id";
      temp_query = "timesheets";
      setSelected(() => notif.timesheetdb);
      chatUsers = getTimesheetChatUsers(projectData, notif.timesheetdb, notif.timesheetdb.ProjectID, user);

      temp_add = getAddTimesheetPermission(user, projectData);
      temp_edit = getEditTimesheetPermission(user, notif.timesheetdb, projectData);
      temp_del = getDeleteTimesheetPermission(user);
    } else if (notif.absentee_id) {
      notif_type = "absentee_id";
      temp_query = "absentees";
      setSelected(() => notif.absenteesdb);
      chatUsers = getAbsenteeChatUsers(resourceData, user);

      temp_add = getAddAbsenteePermission(user, projectData);
      temp_edit = getEditAbsenteePermission(user, projectData);
      temp_del = temp_add;
    } else if (notif.resource_id) {
      notif_type = "resource_id";
      temp_query = "resources";
      setSelected(() => notif.resourcesdb);
      chatUsers = getAbsenteeChatUsers(resourceData, user);

      temp_add = getAddUserPermission(user, projectData);
      temp_edit = getEditUserPermission(user, notif.resourcesdb, projectData);
    }

    setType(() => notif_type);
    setQuery(() => temp_query);
    setSelectedChatUsers(() => chatUsers);

    setHasAdd(() => temp_add);
    setHasEdit(() => temp_edit);
    setHasDel(() => temp_del);

    if (column === "is_comment") setOpenComments(() => true);
    else if (column === "is_attachment") setOpenAttachments(() => true);
    else if (column === "is_subtask" || column === "is_subtask_status") setOpenSubTask(() => true);

    readNotification(notif, column, notif_type);
  };

  const handleAssigneeNotification = (notif) => {
    let notif_type = "";
    if (notif.action_id) {
      notif_type = "action_id";
      navigate("/action/" + notif.action_id);
    } else if (notif.cost_id) {
      notif_type = "cost_id";
      navigate("/cost/" + notif.cost_id);
    } else if (notif.task_id) {
      notif_type = "task_id";
      navigate("/task/" + notif.task_id);
    }

    readNotification(notif, "is_assignee", notif_type);
  };

  const handleApproverNotification = (notif) => {
    let notif_type = "";

    notif_type = "timesheet_id";
    navigate("/timesheet/" + notif.timesheet_id);

    readNotification(notif, "is_approver", notif_type);
  };

  const handleManagerNotification = (notif) => {
    let notif_type = "project_id";
    navigate("/project/" + notif.project_id);

    readNotification(notif, "is_project_manager", notif_type);
  };

  const handleAdminNotification = (notif) => {
    let notif_type = "project_id";
    navigate("/project/" + notif.project_id);

    readNotification(notif, "is_project_admin", notif_type);
  };

  const handleStakeholderNotification = (notif) => {
    let notif_type = "project_id";
    navigate("/project/" + notif.project_id);

    readNotification(notif, "is_project_stakeholder", notif_type);
  };

  const handleItemStatusNotification = (notif) => {
    let notif_type = "";

    if (notif.project_id) {
      notif_type = "project_id";
      navigate("/project/" + notif.project_id);
    } else if (notif.task_id) {
      notif_type = "task_id";
      navigate("/task/" + notif.task_id);
    } else if (notif.cost_id) {
      notif_type = "cost_id";
      navigate("/cost/" + notif.cost_id);
    }

    readNotification(notif, "is_item_status", notif_type);
  };

  const handleItemPriorityNotification = (notif) => {
    let notif_type = "";

    notif_type = "task_id";
    navigate("/task/" + notif.task_id);

    readNotification(notif, "is_item_priority", notif_type);
  };

  const handleItemDueDateNotification = (notif) => {
    let notif_type = "";

    if (notif.project_id) {
      notif_type = "project_id";
      navigate("/project/" + notif.project_id);
    } else if (notif.task_id) {
      notif_type = "task_id";
      navigate("/task/" + notif.task_id);
    }

    readNotification(notif, "is_item_due_date", notif_type);
  };

  const viewHandler = (notif) => {
    if (notif.is_comment) handleCommentsNotification(notif, "is_comment");

    if (notif.is_assignee) handleAssigneeNotification(notif);

    if (notif.is_approver) handleApproverNotification(notif);

    if (notif.is_project_manager) handleManagerNotification(notif);

    if (notif.is_project_admin) handleAdminNotification(notif);

    if (notif.is_project_stakeholder) handleStakeholderNotification(notif);

    if (notif.is_attachment) handleCommentsNotification(notif, "is_attachment");

    if (notif.is_subtask_status) handleCommentsNotification(notif, "is_subtask_status");

    if (notif.is_subtask) handleCommentsNotification(notif, "is_subtask");

    if (notif.is_item_status) handleItemStatusNotification(notif);

    if (notif.is_item_priority) handleItemPriorityNotification(notif);

    if (notif.is_item_due_date) handleItemDueDateNotification(notif);
  };

  const callsToAction = [
    { name: "Cancel", href: "#", icon: "" },
    {
      name: "Mark All Read",
      href: "#",
      icon: "",
      onClick: readHandler,
    },
  ];

  const handleCommentText = (notif) => {
    const is_root = notif?.commentdb?.is_root;
    if (notif.project_id)
      return `${is_root ? notif.commentdb.rootuserdb?.FullName : notif.commentdb.user?.FullName} left a message on a project record (${
        notif.projectdb.Description
      })`;

    if (notif.task_id)
      return `${is_root ? notif.commentdb?.rootuserdb?.FullName : notif.commentdb?.user?.FullName} left a message on a task record (${
        notif.taskdb.Description
      }) of ${notif.taskdb.projectdb?.Description}`;
    if (notif.cost_id)
      return `${is_root ? notif.commentdb?.rootuserdb?.FullName : notif.commentdb?.user?.FullName} left a message on a cost record (${
        notif.costdb.Description
      }) of ${notif?.costdb?.projectdb?.Description}`;
    if (notif.timesheet_id)
      return `${is_root ? notif.commentdb?.rootuserdb?.FullName : notif.commentdb?.user?.FullName} left a message on a timesheet record (${
        notif.timesheetdb.Description
      }) of ${notif?.timesheetdb?.resourcesdb?.FullName}`;
    if (notif.absentee_id)
      return `${is_root ? notif.commentdb?.rootuserdb?.FullName : notif.commentdb?.user?.FullName} left a message on an absentee record (${
        notif.absenteesdb.Description
      }) of ${notif?.timesheetdb?.resourcesdb?.FullName}`;

    if (notif.resource_id)
      return `${is_root ? notif.commentdb?.rootuserdb?.FullName : notif.commentdb?.user?.FullName} left a message on a team member (${
        notif.resourcesdb.FullName
      })`;
  };

  const handleAssigneeText = (notif) => {
    if (notif.cost_id)
      return `You have been assigned as a responsible person of cost a record (${notif?.costdb?.Description}) of ${notif?.costdb?.projectdb?.Description}`;
    if (notif.task_id)
      return `You have been assigned as a responsible person of a task (${notif?.taskdb?.Description}) of ${notif?.taskdb?.projectdb?.Description}`;
  };

  const handleApproverText = (notif) => {
    return `You have been assigned as an approver of a timesheet record (${notif?.timesheetdb?.Description}) of ${notif?.timesheetdb?.projectdb?.Description}`;
  };

  const handleManagerText = (notif) => {
    return `You have been assigned as a manager of ${notif?.projectdb?.Description}`;
  };

  const handleAdminText = (notif) => {
    return `You have been assigned as an administrator of ${notif?.projectdb?.Description}`;
  };

  const handleStakeholderText = (notif) => {
    return `You have been assigned as an Stakeholder of ${notif?.projectdb?.Description}`;
  };

  const handleAttachmentText = (notif) => {
    const is_root = notif?.attachmentdb?.is_root;
    if (notif.project_id)
      return `${is_root ? notif.attachmentdb.rootuserdb?.FullName : notif.attachmentdb.user?.FullName} has added an ${
        notif.attachmentdb.Description
      } of ${notif.projectdb.Description}`;
    if (notif.task_id)
      return `${is_root ? notif.attachmentdb?.rootuserdb?.FullName : notif.attachmentdb?.user?.FullName} has added an ${
        notif.attachmentdb.Description
      } of ${notif.taskdb.Description} of ${notif.taskdb.projectdb?.Description}`;
    if (notif.cost_id)
      return `${is_root ? notif.attachmentdb?.rootuserdb?.FullName : notif.attachmentdb?.user?.FullName} has added an ${
        notif.attachmentdb.Description
      } of ${notif.costdb.Description} of ${notif?.costdb?.projectdb?.Description}`;
    if (notif.timesheet_id)
      return `${is_root ? notif.attachmentdb?.rootuserdb?.FullName : notif.attachmentdb?.user?.FullName} has added an ${
        notif.attachmentdb.Description
      } of ${notif.timesheetdb.Description} of ${notif?.timesheetdb?.resourcesdb?.FullName}`;
    if (notif.absentee_id)
      return `${is_root ? notif.attachmentdb?.rootuserdb?.FullName : notif.attachmentdb?.user?.FullName} has added an ${
        notif.attachmentdb.Description
      } of ${notif.absenteesdb.Description} of ${notif.timesheetdb.resourcesdb.FullName}`;
  };

  const handleSubtaskText = (notif) => {
    const is_root = notif?.subtaskdb?.is_root;
    if (notif.project_id)
      return `${is_root ? notif.subtaskdb.rootuserdb?.FullName : notif.subtaskdb.resourcesdb?.FullName} has added an ${
        notif.subtaskdb.Description
      } of ${notif.projectdb.Description}`;
    if (notif.task_id)
      return `${is_root ? notif.subtaskdb?.rootuserdb?.FullName : notif.subtaskdb?.resourcesdb?.FullName} has added an ${
        notif.subtaskdb.Description
      } of ${notif.taskdb.Description} of ${notif.taskdb.projectdb?.Description}`;
    if (notif.cost_id)
      return `${is_root ? notif.subtaskdb?.rootuserdb?.FullName : notif.subtaskdb?.resourcesdb?.FullName} has added an ${
        notif.subtaskdb.Description
      } of ${notif.costdb.Description} of ${notif?.costdb?.projectdb?.Description}`;
    if (notif.timesheet_id)
      return `${is_root ? notif.subtaskdb?.rootuserdb?.FullName : notif.subtaskdb?.resourcesdb?.FullName} has added an ${
        notif.subtaskdb.Description
      } of ${notif.timesheetdb.Description} of ${notif?.timesheetdb?.resourcesdb?.FullName}`;
    if (notif.absentee_id)
      return `${is_root ? notif.subtaskdb?.rootuserdb?.FullName : notif.subtaskdb?.resourcesdb?.FullName} has added an ${
        notif.subtaskdb.Description
      } of ${notif.absenteesdb.Description} of ${notif.timesheetdb.resourcesdb.FullName}`;
  };

  const handleSubtaskStatusText = (notif) => {
    const is_root = notif?.subtaskdb?.is_root;
    if (notif.project_id)
      return `${is_root ? notif.subtaskdb.rootuserdb?.FullName : notif.subtaskdb.resourcesdb?.FullName} has changed the status of ${
        notif.subtaskdb.Description
      } of ${notif.projectdb.Description}`;
    if (notif.task_id)
      return `${is_root ? notif.subtaskdb?.rootuserdb?.FullName : notif.subtaskdb?.resourcesdb?.FullName} has changed the status of ${
        notif.subtaskdb.Description
      } of ${notif.taskdb.Description} of ${notif.taskdb.projectdb?.Description}`;
    if (notif.cost_id)
      return `${is_root ? notif.subtaskdb?.rootuserdb?.FullName : notif.subtaskdb?.resourcesdb?.FullName} has changed the status of ${
        notif.subtaskdb.Description
      } of ${notif.costdb.Description} of ${notif?.costdb?.projectdb?.Description}`;
    if (notif.timesheet_id)
      return `${is_root ? notif.subtaskdb?.rootuserdb?.FullName : notif.subtaskdb?.resourcesdb?.FullName} has changed the status of ${
        notif.subtaskdb.Description
      } of ${notif.timesheetdb.Description} of ${notif?.timesheetdb?.resourcesdb?.FullName}`;
    if (notif.absentee_id)
      return `${is_root ? notif.subtaskdb?.rootuserdb?.FullName : notif.subtaskdb?.resourcesdb?.FullName} has changed the status of ${
        notif.subtaskdb.Description
      } of ${notif.absenteesdb.Description} of ${notif.timesheetdb.resourcesdb.FullName}`;
  };

  const handleItemStatusText = (notif) => {
    const is_root = notif?.is_root;
    if (notif.project_id)
      return `${is_root ? notif.rootuserdb?.FullName : notif.resourcesdb?.FullName} has changed the stage of ${
        notif.projectdb.Description
      }`;
    if (notif.task_id)
      return `${is_root ? notif?.rootuserdb?.FullName : notif?.resourcesdb?.FullName} has changed the stage of ${
        notif.taskdb.Description
      } of ${notif.taskdb.projectdb?.Description}`;
    if (notif.cost_id)
      return `${is_root ? notif?.rootuserdb?.FullName : notif?.resourcesdb?.FullName} has changed the status of ${
        notif.costdb.Description
      } of ${notif?.costdb?.projectdb?.Description}`;
  };

  const handleItemDueDateText = (notif) => {
    const is_root = notif?.is_root;
    if (notif.project_id)
      return `${is_root ? notif.rootuserdb?.FullName : notif.resourcesdb?.FullName} has changed the DUE DATE of ${
        notif.projectdb.Description
      }`;
    if (notif.task_id)
      return `${is_root ? notif?.rootuserdb?.FullName : notif?.resourcesdb?.FullName} has changed the DUE DATE of ${
        notif.taskdb.Description
      } of ${notif.taskdb.projectdb?.Description}`;
  };

  const handleItemPriorityText = (notif) => {
    const is_root = notif?.is_root;
    return `${is_root ? notif?.rootuserdb?.FullName : notif?.resourcesdb?.FullName} has changed the Priority of ${
      notif.taskdb.Description
    } of ${notif.taskdb.projectdb?.Description}`;
  };

  const getNotificationText = (notif) => {
    if (notif.is_comment) return handleCommentText(notif);

    if (notif.is_assignee) return handleAssigneeText(notif);

    if (notif.is_approver) return handleApproverText(notif);

    if (notif.is_project_manager) return handleManagerText(notif);

    if (notif.is_project_admin) return handleAdminText(notif);

    if (notif.is_project_stakeholder) return handleStakeholderText(notif);

    if (notif.is_attachment) return handleAttachmentText(notif);

    if (notif.is_subtask) return handleSubtaskText(notif);

    if (notif.is_subtask_status) return handleSubtaskStatusText(notif);

    if (notif.is_item_status) return handleItemStatusText(notif);

    if (notif.is_item_due_date) return handleItemDueDateText(notif);

    if (notif.is_item_priority) return handleItemPriorityText(notif);

    // return `${is_root ? notif?.commentdb?.rootuserdb?.FullName : notif?.commentdb?.user?.FullName} left a message`;
  };

  const readNotification = (notif, notif_type, type) => {
    axios
      .patch(SERVER_URL + `/api/notification/read`, {
        notif_type: notif_type,
        type: type,
        id: notif[type],
      })
      .then(({ data }) => {
        queryClient.setQueryData(["notifications"], (prev) => prev.filter((item) => item[type] !== notif[type]));
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  };

  return (
    <>
      <Popover className="relative">
        <Popover.Button className="inline-flex items-center outline-none">
          <div className="w-8 h-8 flex items-center justify-center text-gray-800 relative">
            <IoIosNotificationsOutline className="text-2xl" />
            {notifications?.length > 0 && (
              <span className="absolute text-center top-0 right-1 text-xs text-white font-semibold w-5 h-5 rounded-full bg-red-600">
                {notifications?.length}
              </span>
            )}
          </div>
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute -right-16 md:-right-2 z-10 mt-5 flex w-screen max-w-max  px-4">
            {({ close }) =>
              notifications?.length > 0 && (
                <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4 h-auto max-h-96 overflow-y-auto">
                    {notifications?.map((item, index) => (
                      <div key={index} className="group relative flex gap-x-4 rounded-lg p-4 hover:bg-gray-50">
                        <div className="mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 group-hover:bg-white">
                          {ICONS.alert}
                        </div>

                        <div className="cursor-pointer" onClick={() => viewHandler(item)}>
                          <div className="flex items-center gap-3 font-semibold text-gray-900 capitalize">
                            {/* <p> {item.notiType}</p> */}
                            <span className="text-xs font-normal lowercase">{moment(item.created_at).fromNow()}</span>
                          </div>
                          <p className="mt-1 text-gray-600">{getNotificationText(item)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 divide-x bg-gray-50">
                    {callsToAction.map((item) => (
                      <Link
                        key={item.name}
                        onClick={item?.onClick ? () => item.onClick() : () => close()}
                        className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-blue-600 hover:bg-gray-100"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            }
          </Popover.Panel>
        </Transition>
      </Popover>
      <CommentsDialog
        open={openComments}
        setOpen={setOpenComments}
        recordData={selected}
        type={type}
        query={query}
        chatUsers={selectedChatUsers}
      />
      <SubTasksDialog
        open={openSubTask}
        setOpen={setOpenSubTask}
        recordData={selected}
        query={query}
        type={type}
        hasAdd={hasAdd}
        hasEdit={hasEdit}
        hasDel={hasDel}
        chatUsers={selectedChatUsers}
      />
      <AttachmentsDialog
        open={openAttachments}
        setOpen={setOpenAttachments}
        recordData={selected}
        type={type}
        query={query}
        hasAdd={hasAdd}
        hasEdit={hasEdit}
        hasDel={hasDel}
        chatUsers={selectedChatUsers}
      />
    </>
  );
};

export default NotificationPanel;
