import React, { useEffect, useState } from "react";
import Loading from "../../components/Loader";
import useUserStore from "../../app/user";
import { LatestProjects, LatestResources, LatestTasks } from "../../components/home";
import { ProjectCostChart, StageChart } from "../../components/project";
import {
  getBankAccountNames,
  getBankAccountTransactions,
  getDebts,
  getExpenses,
  getExtraFundsTrackers,
  getIncomes,
  getJointSplits,
  getRetirements,
  getSavings,
} from "../../config/api";
import { useQuery } from "react-query";
import Package from "../../package/Package";

export const Home = () => {
  const { user } = useUserStore();
  const usedCurrency = "$";
  const customDateFormat = "MMM dd, yyyy";
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [updatedProjectData, setUpdatedProjectData] = useState([]);
  const [updatedCostData, setUpdatedCostData] = useState([]);
  const [updatedTaskData, setUpdatedTaskData] = useState([]);
  const [updatedAbsenteeData, setUpdatedAbsenteeData] = useState([]);
  const activeAccount = true;

  const { data: accountnames, status: isNamesLoaded } = useQuery({
    queryKey: ["accountnames"],
    queryFn: getBankAccountNames,
    staleTime: 1000 * 60 * 60,
  });

  const { data: transactions, status: isTransactionLoaded } = useQuery({
    queryKey: ["banktransactions"],
    queryFn: getBankAccountTransactions,
    staleTime: 1000 * 60 * 60,
  });

  const { data: debts, status: isDebtLoaded } = useQuery({
    queryKey: ["debts"],
    queryFn: getDebts,
    staleTime: 1000 * 60 * 60,
  });

  const { data: expenses, status: isExpenseLoaded } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
    staleTime: 1000 * 60 * 60,
  });

  const { data: extrafunds, status: isFundLoaded } = useQuery({
    queryKey: ["extrafunds"],
    queryFn: getExtraFundsTrackers,
    staleTime: 1000 * 60 * 60,
  });

  const { data: incomes, status: isIncomeLoaded } = useQuery({
    queryKey: ["incomes"],
    queryFn: getIncomes,
    staleTime: 1000 * 60 * 60,
  });

  const { data: jointsplits, status: isJointLoaded } = useQuery({
    queryKey: ["jointsplits"],
    queryFn: getJointSplits,
    staleTime: 1000 * 60 * 60,
  });

  const { data: savings, status: isSavingLoaed } = useQuery({
    queryKey: ["savings"],
    queryFn: getSavings,
    staleTime: 1000 * 60 * 60,
  });

  const { data: retirements, status: isRetLoaded } = useQuery({
    queryKey: ["retirements"],
    queryFn: getRetirements,
    staleTime: 1000 * 60 * 60,
  });

  const uniqueProjectIDs = [];

  return !isDataLoaded ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <>
      {isDataLoaded &&
        (activeAccount ? (
          <div className="flex flex-col h-full py-5 gap-10">
            <div className="w-full flex flex-col xl:flex-row gap-5">
              <StageChart updatedProjectData={updatedProjectData} />
              <ProjectCostChart
                updatedProjectData={updatedProjectData}
                updatedCostData={updatedCostData}
                uniqueProjectIDs={uniqueProjectIDs}
                usedCurrency={usedCurrency}
              />
            </div>

            <div className="w-full flex flex-col xl:flex-row gap-5">
              <LatestProjects
                updatedProjectData={updatedProjectData}
                usedCurrency={usedCurrency}
                updatedCostData={updatedCostData}
                updatedTaskData={updatedTaskData}
                customDateFormat={customDateFormat}
              />
            </div>
            <div className="w-full flex flex-col 2xl:flex-row gap-5">
              <LatestResources resourceData={[]} />
            </div>
            <div className="w-full flex flex-col xl:flex-row gap-5">
              <LatestTasks updatedProjectData={updatedProjectData} updatedTaskData={updatedTaskData} resourceData={[]} />
            </div>
          </div>
        ) : (
          <Package />
        ))}
    </>
  );
};
