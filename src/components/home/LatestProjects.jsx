import React, { useEffect, useState } from "react";
import Title from "../Title";
import Button from "../Button";
import { FaEye } from "react-icons/fa";
import clsx from "clsx";
import { themeColors } from "../../utils";
import { GrProjects } from "react-icons/gr";
import { ProjectListView } from "../project";
import { useNavigate } from "react-router-dom";

export const LatestProjects = ({ updatedProjectData, usedCurrency, updatedCostData, updatedTaskData, customDateFormat }) => {
  const [gridData, setGridData] = useState([]);
  const navigate = useNavigate();

  const viewAllClick = () => {
    navigate("/projects?name=projects&tab=2");
  };

  return (
    <>
      {gridData?.length > 0 && (
        <>
          <div className="flex flex-col w-full gap-2 shadow-md rounded bg-white">
            <div className="flex items-center justify-between px-2 pt-3 md:px-5 ">
              <div className="flex items-center gap-2">
                <GrProjects className={`text-xl text-[${themeColors[1]}]`} />
                <Title title="Recent Added Projects" />
              </div>
              <Button
                label="View All"
                icon={<FaEye className="text-lg" />}
                className={clsx(
                  "flex flex-row-reverse gap-1 items-center text-white hover:bg-viewcolor rounded-full px-2 py-1",
                  `bg-[${themeColors[1]}] hover:text-[${themeColors[1]}]`
                )}
                onClick={() => viewAllClick()}
              />
            </div>
            <div className="overflow-x-auto">
              <ProjectListView
                gridData={gridData}
                costData={updatedCostData}
                customDateFormat={customDateFormat}
                taskData={updatedTaskData}
                usedCurrency={usedCurrency}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
