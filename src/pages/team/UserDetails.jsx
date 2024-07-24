import useUserStore from "../../app/user";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";

import Button from "../../components/Button";
import { FaEye } from "react-icons/fa";
import clsx from "clsx";
import { themeColors } from "../../utils";
import { IoPerson } from "react-icons/io5";
import { ResourceGeneralDetails } from "../../components/team/ResourceGeneralDetails";

export const UserDetails = () => {
  const { id } = useParams();
  const [selectedResource, setSelectedResource] = useState();
  const [customDateFormat, setCustomDateFormat] = useState("MMM dd, yyyy");

  const navigate = useNavigate();
  const viewAllClick = () => {
    navigate("/resources?name=resources&tab=2");
  };

  return (
    <div className="w-full flex flex-col gap-3 mb-4 overflow-y-hidden">
      <div className="flex items-center justify-between">
        <span className="flex items-center justify-left gap-2 text-sm md:text-2xl text-center">
          <IoPerson /> {selectedResource?.FullName}
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
          <ResourceGeneralDetails resource={selectedResource} customDateFormat={customDateFormat} resourceID={parseInt(id)} />
        </div>
      </div>
    </div>
  );
};
