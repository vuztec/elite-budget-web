import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loading from "../../components/Loader";
import { useQuery } from "react-query";
import { getActiveAccount } from "../../utils/permissions";
import Package from "../../package/Package";
import { getDebtGoals, getExpenseGoals, getMainGoals } from "../../config/api";
import { GoalListView } from "../../components/budget/GoalListView";

export const BudgetGoals = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const activeAccount = getActiveAccount(root);

  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const tab = searchParams.get("tab");

  const { data: debtgoals, status: isDebtGoalsLoaded } = useQuery({
    queryKey: ["debtgoals"],
    queryFn: getDebtGoals,
    staleTime: 1000 * 60 * 60,
  });

  const { data: expensegoals, status: isExpenseGoalsLoaded } = useQuery({
    queryKey: ["expensegoals"],
    queryFn: getExpenseGoals,
    staleTime: 1000 * 60 * 60,
  });

  const { data: maingoals, status: isMainGoalsLoaded } = useQuery({
    queryKey: ["maingoals"],
    queryFn: getMainGoals,
    staleTime: 1000 * 60 * 60,
  });

  ///-------------END Filters Data Source --------------------------------///

  useEffect(() => {
    if (name === "projects") setSelected(parseInt(tab));
  }, [name, tab]);

  useEffect(() => {
    if (
      isDebtGoalsLoaded === "success" &&
      isMainGoalsLoaded === "success" &&
      isExpenseGoalsLoaded === "success"
    ) {
      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
    }
  }, [isDebtGoalsLoaded, isExpenseGoalsLoaded, isMainGoalsLoaded]);

  return activeAccount ? (
    <>
      {!isDataLoaded && (
        <div className="py-10">
          <Loading />
        </div>
      )}

      {isDataLoaded && (
        <div className="w-full">
          <div className="w-full">
            <GoalListView gridData={maingoals} goal="Main" />
          </div>

          <div className="w-full">
            <GoalListView gridData={expensegoals} goal="Expense" />
          </div>

          <div className="w-full">
            <GoalListView gridData={debtgoals} goal="Debt" />
          </div>
        </div>
      )}
    </>
  ) : (
    <Package />
  );
};