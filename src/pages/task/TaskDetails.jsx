import useUserStore from "../../app/user";
import React, { useEffect, useState } from "react";
import { MdOutlineTask } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { getAttachments, getComments, getDateFormat, getProjects, getSubTasks, getTasks } from "../../config/api";
import { useQuery } from "react-query";
import { TaskGeneralDetails } from "../../components/task/TaskGeneralDetails";
import { Assignees } from "../../components/assignee/Assignees";
import { SubTasks } from "../../components/subtask/SubTasks";
import { Attachments } from "../../components/attachment/Attachments";
import { Comments } from "../../components/comment/Comment";
import Button from "../../components/Button";
import { FaEye } from "react-icons/fa";
import clsx from "clsx";
import { themeColors } from "../../utils";
import { getSuperTaskPermission, getEditTaskPermission } from "../../utils/permissions";
import { getTaskChatUsers } from "../../utils/users";

export const TaskDetails = () => {
  const { id } = useParams();
  const { user, root } = useUserStore();
  const [selectedTask, setSelectedTask] = useState();
  const [customDateFormat, setCustomDateFormat] = useState();
  const [selectedChatUsers, setSelectedChatUsers] = useState(null);

  const type = "task_id";

  const { data: projectData } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 1000 * 60 * 60,
  });
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

  const { data: attachments } = useQuery({
    queryKey: ["attachments", type, parseInt(id)],
    queryFn: () => getAttachments(type, id),
    staleTime: 1000 * 60 * 60,
  });

  const { data: comments } = useQuery({
    queryKey: ["comments", type, parseInt(id)],
    queryFn: () => getComments(type, id),
    staleTime: 1000 * 60 * 60,
  });

  const { data: subtasks } = useQuery({
    queryKey: ["subtasks", type, parseInt(id)],
    queryFn: () => getSubTasks(type, id),
    staleTime: 1000 * 60 * 60,
  });

  const hasAdd = getSuperTaskPermission(user, selectedTask, projectData);
  const hasEdit = getEditTaskPermission(user, selectedTask, projectData);
  const hasDel = getSuperTaskPermission(user, selectedTask, projectData);

  useEffect(() => {
    if (isTaskLoaded === "success" && isDateFormatLoaded === "success") {
      const task = taskData?.find((item) => item.id === parseInt(id));
      setSelectedTask(task);
      const targetFormatData = dateFormatData?.find((item) => item.UserID === user.id);
      const userDateFormat = targetFormatData ? targetFormatData.Format : "MMM dd, yyyy";
      setCustomDateFormat(userDateFormat);
      const chatUsers = getTaskChatUsers(projectData, task, task.ProjectID, user);
      setSelectedChatUsers(() => chatUsers);
    }
  }, [taskData, isTaskLoaded, dateFormatData, isDateFormatLoaded, id]);

  const navigate = useNavigate();
  const viewAllClick = () => {
    navigate("/tasks?name=tasks&tab=2");
  };

  return (
    <div className="w-full flex flex-col gap-3 mb-4 overflow-y-hidden">
      <div className="flex items-center justify-between">
        <span className="flex items-center justify-left gap-2 text-sm md:text-2xl text-center">
          <MdOutlineTask /> {selectedTask?.Description}
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
          <TaskGeneralDetails task={selectedTask} customDateFormat={customDateFormat} hasAdd={hasAdd} hasEdit={hasEdit} hasDel={hasDel} />
          <SubTasks
            subtasks={subtasks}
            customDateFormat={customDateFormat}
            type={type}
            itemID={parseInt(id)}
            query={"tasks"}
            hasAdd={hasAdd}
            hasEdit={hasEdit}
            hasDel={hasDel}
            chatUsers={selectedChatUsers}
          />
        </div>

        <div className="w-full h-full flex flex-col xl:flex-row gap-5">
          <Assignees
            assignees={selectedTask?.taskdb_assignee}
            type={type}
            query={"tasks"}
            itemID={parseInt(id)}
            itemData={selectedTask}
            hasAdd={hasAdd}
            hasEdit={hasEdit}
            hasDel={hasDel}
          />

          <Comments
            comments={comments}
            type={type}
            itemID={parseInt(id)}
            query={"tasks"}
            hasAdd={hasAdd}
            hasEdit={hasEdit}
            hasDel={hasDel}
            chatUsers={selectedChatUsers}
          />
        </div>

        <div className="w-full h-full flex flex-col xl:flex-row gap-5">
          <Attachments
            attachments={attachments}
            type={type}
            itemID={parseInt(id)}
            query={"tasks"}
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
