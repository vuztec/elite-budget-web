import React from "react";
import TaskCard from "./TaskCard";

export const TaskBoardView = ({ tasks, customDateFormat, projectData }) => {
  return (
    <div className="w-full py-0 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-4 xl:gap-5">
      {tasks?.map((task, index) => (
        <TaskCard
          task={task}
          key={index}
          customDateFormat={customDateFormat}
          projectData={projectData}
        />
      ))}
    </div>
  );
};

export default TaskBoardView;
