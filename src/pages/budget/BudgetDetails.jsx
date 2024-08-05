import React, { useEffect, useState } from "react";
import MonthlyIncome from "../../components/budget/MonthlyIncome";
import MonthlySavings from "../../components/budget/MonthlySavings";
import MonthlyRetirement from "../../components/budget/MonthlyRetirement";
import MonthlyDebt from "../../components/budget/MonthlyDebt";
import MonthlyExpenses from "../../components/budget/MonthlyExpenses";
import MonthlySummary from "../../components/budget/MonthlySummary";
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
import { getActiveAccount } from "../../utils/permissions";
import {
  expenseOwners,
  getOwnerExpenseGridData,
  getOwnerGridData,
} from "../../utils/budget.filter";
import clsx from "clsx";
import Select from "../../components/Select";
import YearlyIncome from "../../components/budget/YearlyIncome";
import { PiPrinter } from "react-icons/pi";
import { usePDF } from "react-to-pdf";
import { getJointContribution } from "../../utils/budget.calculation";
import useUserStore from "../../app/user";

export const BudgetDetails = () => {
  const { user } = useUserStore();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [incomeGridData, setIncomeGridData] = useState([]);
  const [savingsGridData, setSavingsGridData] = useState([]);
  const [retirementGridData, setRetirementGridData] = useState([]);
  const [expenseGridData, setExpenseGridData] = useState([]);
  const [debtGridData, setDebtGridData] = useState([]);
  const [selfContribution, setSelfContribution] = useState(0);
  const [partnerContribution, setPartnerContribution] = useState(0);
  const { toPDF, targetRef } = usePDF({ filename: "budget-details.pdf" });

  const activeAccount = getActiveAccount(user);

  // Filters
  const [owner, setOwner] = useState("Household");

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

      const expenseData = getOwnerExpenseGridData(expenses, owner);
      setExpenseGridData(expenseData);

      const debtData = getOwnerGridData(debts, owner);
      setDebtGridData(debtData);

      const incomeData = getOwnerGridData(incomes, owner);
      setIncomeGridData(incomeData);

      const selfAmount = getJointContribution(expenses, "Self");
      setSelfContribution(selfAmount);
      const partnerAmount = getJointContribution(expenses, "Partner");
      setPartnerContribution(partnerAmount);

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

  const [isShowing, setIsShowing] = useState(true);

  return activeAccount ? (
    <>
      <div className="w-full flex item-center justify-end">
        <div className="w-fit gap-4 h-10 md:h-12 px-2 rounded-full bg-white flex items-center">
          <div className="flex items-center gap-2">
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
            <Button
              onClick={toPDF}
              icon={<PiPrinter />}
              label={"Print"}
              className={
                "flex flex-row-reverse justify-center items-center bg-black text-white text-lg gap-2 hover:bg-[whitesmoke] hover:text-black"
              }
            />
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
        <div
          className="w-full flex flex-col items-center gap-5 xl:gap-10 bg-white p-5 mt-4"
          ref={targetRef}
        >
          <div className="w-full 2xl:w-[90%] flex flex-col items-center justify-center gap-5">
            <div className="flex flex-col xl:flex-row w-full gap-5 xl:gap-10">
              <div className="flex flex-col w-full gap-5">
                <div className="w-full">
                  <YearlyIncome
                    incomeGridData={incomeGridData}
                    owner={owner}
                    selfContribution={selfContribution}
                    partnerContribution={partnerContribution}
                  />
                </div>
                <div className="w-full">
                  <MonthlyIncome
                    incomeGridData={incomeGridData}
                    owner={owner}
                    selfContribution={selfContribution}
                    partnerContribution={partnerContribution}
                  />
                </div>
                <div className="w-full">
                  <MonthlySavings
                    savingsGridData={savingsGridData}
                    incomeGridData={incomeGridData}
                    maingoals={maingoals}
                    owner={owner}
                  />
                </div>
                <div className="w-full">
                  <MonthlyRetirement
                    retirementGridData={retirementGridData}
                    incomeGridData={incomeGridData}
                    maingoals={maingoals}
                    owner={owner}
                  />
                </div>
                <div className="w-full">
                  <MonthlyDebt
                    debtGridData={debtGridData}
                    incomeGridData={incomeGridData}
                    debtgoals={debtgoals}
                    maingoals={maingoals}
                    owner={owner}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full">
                <div className="w-full">
                  <MonthlyExpenses
                    expenseGridData={expenseGridData}
                    incomeGridData={incomeGridData}
                    expensegoals={expensegoals}
                    maingoals={maingoals}
                    owner={owner}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col xl:flex-row w-full gap-5 mt-10 xl:gap-10">
              <div className="hidden xl:block w-full"></div>
              <div className="flex flex-col w-full">
                <div className="w-full">
                  <MonthlySummary
                    incomeGridData={incomeGridData}
                    savingsGridData={savingsGridData}
                    retirementGridData={retirementGridData}
                    debtGridData={debtGridData}
                    expenseGridData={expenseGridData}
                    owner={owner}
                    selfContribution={selfContribution}
                    partnerContribution={partnerContribution}
                  />
                </div>
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

export default BudgetDetails;
