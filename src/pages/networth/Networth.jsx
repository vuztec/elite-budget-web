import Assets from "../../components/networth/Assets";
import Liabilities from "../../components/networth/Liabilities";
import CurrentNetworth from "../../components/networth/CurrentNetworth";
import ExpectedNetworth from "../../components/networth/ExpectedNetworth";
import React, { useEffect, useState } from "react";
import Package from "../../package/Package";
import Loading from "../../components/Loader";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import Button from "../../components/Button";
import {
  getDebtGoals,
  getDebts,
  getExpenseGoals,
  getExpenses,
  getIncomes,
  getMainGoals,
  getRetirements,
  getSavings,
} from "../../config/api";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { getActiveAccount } from "../../utils/permissions";
import { expenseOwners, getOwnerGridData } from "../../utils/budget.filter";
import clsx from "clsx";
import Select from "../../components/Select";

export const Networth = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [incomeGridData, setIncomeGridData] = useState([]);
  const [savingsGridData, setSavingsGridData] = useState([]);
  const [retirementGridData, setRetirementGridData] = useState([]);
  const [expenseGridData, setExpenseGridData] = useState([]);
  const [debtGridData, setDebtGridData] = useState([]);

  const activeAccount = getActiveAccount(root);

  // Filters
  const [owner, setOwner] = useState("Household");

  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const tab = searchParams.get("tab");

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

  const { data: incomes, status: isIncomeLoaded } = useQuery({
    queryKey: ["incomes"],
    queryFn: getIncomes,
    staleTime: 1000 * 60 * 60,
  });

  const { data: savings, status: isSavingLoaded } = useQuery({
    queryKey: ["savings"],
    queryFn: getSavings,
    staleTime: 1000 * 60 * 60,
  });

  const { data: retirements, status: isRetLoaded } = useQuery({
    queryKey: ["retirements"],
    queryFn: getRetirements,
    staleTime: 1000 * 60 * 60,
  });

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

  ///-------------Filters Data Source --------------------------------///
  const owners = expenseOwners.map((owner) => ({
    value: owner,
    label: owner,
  }));

  ///-------------END Filters Data Source --------------------------------///

  useEffect(() => {
    if (name === "projects") setSelected(parseInt(tab));
  }, [name, tab]);

  useEffect(() => {
    if (
      isSavingLoaded === "success" &&
      isRetLoaded === "success" &&
      isExpenseLoaded === "success" &&
      isDebtLoaded === "success" &&
      isIncomeLoaded === "success" &&
      isMainGoalsLoaded === "success" &&
      isDebtGoalsLoaded === "success" &&
      isExpenseGoalsLoaded === "success" &&
      owner
    ) {
      const savingData = getOwnerGridData(savings, owner);
      setSavingsGridData(savingData);

      const retirementData = getOwnerGridData(retirements, owner);
      setRetirementGridData(retirementData);

      const expenseData = getOwnerGridData(expenses, owner);
      setExpenseGridData(expenseData);

      const debtData = getOwnerGridData(debts, owner);
      setDebtGridData(debtData);

      const incomeData = getOwnerGridData(incomes, owner);
      setIncomeGridData(incomeData);

      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
    }
  }, [
    savings,
    retirements,
    debts,
    incomes,
    expenses,
    isIncomeLoaded,
    isSavingLoaded,
    isExpenseLoaded,
    isDebtLoaded,
    isRetLoaded,
    isMainGoalsLoaded,
    isDebtGoalsLoaded,
    isExpenseGoalsLoaded,
    owner,
  ]);

  const handleOwnerChange = (e) => {
    if (e && e.target?.value) {
      setOwner(e.target?.value);
    }
  };

  const [isShowing, setIsShowing] = useState(false);

  return activeAccount ? (
    <>
      <div className="w-full flex item-center justify-end">
        <div className="w-fit gap-4 h-10 md:h-12 px-2 rounded-full bg-white flex items-center">
          <div>
            <div className="text-sm">
              <Button
                label={!isShowing ? "Show Filters" : "Hide Filters"}
                icon={
                  !isShowing ? (
                    <MdFilterAlt className="text-lg" />
                  ) : (
                    <MdFilterAltOff className="text-lg" />
                  )
                }
                className={clsx(
                  "flex flex-row-reverse gap-2 p-1 text-sm rounded-full items-center text-white hover:text-black",
                  !isShowing ? "bg-green-800" : "bg-red-800"
                )}
                onClick={() => setIsShowing((old) => !old)}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 pb-5",
          isShowing ? "block" : "hidden"
        )}
      >
        <div className="w-full">
          <Select
            onChange={handleOwnerChange}
            value={owner}
            options={owners}
            placeholder="Household"
            label="Account Owner"
            className="bg-white w-full py-1"
          />
        </div>
      </div>

      {!isDataLoaded && (
        <div className="py-10">
          <Loading />
        </div>
      )}
      {isDataLoaded && (
        <div className="w-full flex flex-col items-center gap-5 xl:gap-10 bg-white p-5 mt-4">
          <div className="w-full 2xl:w-[80%] flex flex-col items-center justify-center gap-5">
            <div className="flex flex-col w-full">
              <h1 className="w-full bg-[whitesmoke] text-black flex items-center justify-center p-2 rounded-md font-bold border border-gray-300">
                ASSETS (Market Value of What You Own)
              </h1>
              <div>
                <Assets />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <h1 className="w-full bg-[whitesmoke] text-black flex items-center justify-center p-2 rounded-md font-bold border border-gray-300">
                LIABILITIES (How Much You Owe)
              </h1>
              <div>
                <Liabilities />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <h1 className="w-full bg-[whitesmoke] text-black flex items-center justify-center p-2 rounded-md font-bold border border-gray-300">
                NET WORTH (Assets - Liabilities)
              </h1>
              <div>
                <CurrentNetworth />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <h1 className="w-full bg-[whitesmoke] text-black flex items-center justify-center p-2 rounded-md font-bold border border-gray-300">
                EXPECTED NET WORTH
              </h1>
              <div>
                <ExpectedNetworth />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  ) : (
    <Package />
  );
};
export default Networth;
