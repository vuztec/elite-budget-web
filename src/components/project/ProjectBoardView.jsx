import React from "react";
import ProjectCard from "./ProjectCard";

export const ProjectBoardView = ({ projects, costData, taskData, customDateFormat, usedCurrency }) => {
  return (
    <div className="w-full py-0 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-4 xl:gap-5">
      {projects?.map((project, index) => (
        <ProjectCard
          project={project}
          costData={costData}
          taskData={taskData}
          key={index}
          customDateFormat={customDateFormat}
          usedCurrency={usedCurrency}
        />
      ))}
    </div>
  );
};

export default ProjectBoardView;
