import useUserStore from "../../app/user";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDateFormat,
  getCosts,
  getCurrency,
  getAttachments,
  getComments,
  getSubTasks,
  getProjects,
} from "../../config/api";
import { useQuery } from "react-query";
import { CostGeneralDetails } from "../../components/cost/CostGeneralDetails";
import { Assignees } from "../../components/assignee/Assignees";
import { SubTasks } from "../../components/subtask/SubTasks";
import { Attachments } from "../../components/attachment/Attachments";
import { Comments } from "../../components/comment/Comment";
import Button from "../../components/Button";
import { FaEye } from "react-icons/fa";
import clsx from "clsx";
import { themeColors } from "../../utils";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import {
  getSuperCostPermission,
  getEditCostPermission,
} from "../../utils/permissions";
import { getCostChatUsers } from "../../utils/users";

export const CostDetails = () => {
  const { id } = useParams();
  const { user, root } = useUserStore();
  const [selectedCost, setSelectedCost] = useState();
  const [usedCurrency, setUsedCurrency] = useState();
  const [customDateFormat, setCustomDateFormat] = useState();
  const [selectedChatUsers, setSelectedChatUsers] = useState(null);

  const type = "cost_id";

  const { data: projectData } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 1000 * 60 * 60,
  });
  const { data: costData, status: isCostLoaded } = useQuery({
    queryKey: ["costs"],
    queryFn: getCosts,
    staleTime: 1000 * 60 * 60,
  });
  const { data: dateFormatData, status: isDateFormatLoaded } = useQuery({
    queryKey: ["dateformat"],
    queryFn: getDateFormat,
    staleTime: 1000 * 60 * 60,
  });
  const { data: currencyData, status: isCurrencyLoaded } = useQuery({
    queryKey: ["currency"],
    queryFn: getCurrency,
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

  const hasAdd = getSuperCostPermission(user, selectedCost, projectData);
  const hasEdit = getEditCostPermission(user, selectedCost, projectData);
  const hasDel = getSuperCostPermission(user, selectedCost, projectData);

  useEffect(() => {
    if (
      isCostLoaded === "success" &&
      isDateFormatLoaded === "success" &&
      isCurrencyLoaded === "success"
    ) {
      const cost = costData?.find((item) => item.id === parseInt(id));
      setSelectedCost(cost);
      const targetFormatData = dateFormatData?.find(
        (item) => item.UserID === user.id
      );
      const userDateFormat = targetFormatData
        ? targetFormatData.Format
        : "MMM dd, yyyy";
      setCustomDateFormat(userDateFormat);

      const targetCurrencyData = currencyData.find(
        (item) => item.RootID === user.RootID
      );
      const userCurrencyFormat = targetCurrencyData
        ? targetCurrencyData.Currency
        : "$";
      setUsedCurrency(userCurrencyFormat);
      const chatUsers = getCostChatUsers(
        projectData,
        cost,
        cost.ProjectID,
        user
      );
      setSelectedChatUsers(() => chatUsers);
    }
  }, [
    costData,
    isCostLoaded,
    dateFormatData,
    currencyData,
    isCurrencyLoaded,
    isDateFormatLoaded,
    id,
  ]);

  const navigate = useNavigate();
  const viewAllClick = () => {
    navigate("/costs?name=costs&tab=2");
  };

  return (
    <div className="w-full flex flex-col gap-3 mb-4 overflow-y-hidden">
      <div className="flex items-center justify-between">
        <span className="flex items-center justify-left gap-2 text-sm md:text-2xl text-center">
          <LiaMoneyCheckAltSolid /> {selectedCost?.Description}
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
          <CostGeneralDetails
            cost={selectedCost}
            customDateFormat={customDateFormat}
            usedCurrency={usedCurrency}
            hasAdd={hasAdd}
            hasEdit={hasEdit}
            hasDel={hasDel}
          />
          <SubTasks
            subtasks={subtasks}
            customDateFormat={customDateFormat}
            type={type}
            itemID={parseInt(id)}
            query={"costs"}
            hasAdd={hasAdd}
            hasEdit={hasEdit}
            hasDel={hasDel}
            chatUsers={selectedChatUsers}
          />
        </div>

        <div className="w-full h-full flex flex-col xl:flex-row gap-5">
          <Assignees
            assignees={selectedCost?.costdb_assignee}
            type={type}
            itemID={parseInt(id)}
            itemData={selectedCost}
            hasAdd={hasAdd}
            hasEdit={hasEdit}
            hasDel={hasDel}
            query={"costs"}
          />
          <Comments
            comments={comments}
            type={type}
            itemID={parseInt(id)}
            query={"costs"}
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
            itemID={id}
            query={"costs"}
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
