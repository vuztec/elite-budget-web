import clsx from "clsx";
import React from "react";
import { CiFilter } from "react-icons/ci";
import { PriorityIcon, getPriorityRatingColor } from "../../utils";

export const TaskTitle = ({ label, className, onClick }) => {
  return (
    <>
      <div className="w-fit gap-4 h-10 md:h-12 px-2 md:px-4 rounded-full bg-white flex items-center">
        <button
          className={clsx(
            "flex gap-2 items-center p-1 md:px-2 md:py-1 rounded-full",
            className
          )}
          onClick={onClick}
        >
          <span>{PriorityIcon[label]}</span>
          <p className="text-sm hidden md:block">{label}</p>
        </button>

        <button className="text-sm hidden md:block">
          <CiFilter
            className={clsx(
              "text-2xl rounded-full p-1",
              getPriorityRatingColor(label)
            )}
            onClick={onClick}
          />
        </button>
      </div>
    </>
  );
};

export default TaskTitle;
