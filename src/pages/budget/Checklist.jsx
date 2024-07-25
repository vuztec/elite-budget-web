import React, { useEffect, useState } from "react";
import Package from "../../package/Package";
import Loading from "../../components/Loader";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import Button from "../../components/Button";
import {
  getDebts,
  getExpenses,
  getRetirements,
  getSavings,
} from "../../config/api";
import { useQuery } from "react-query";
import { getActiveAccount } from "../../utils/permissions";
import {
  expenseOwners,
  getCombineData,
  getOwnerGridData,
  getUniqueBudgetItemsByCategory,
  getUniqueCategories,
  getUniqueDescriptionsByCategory,
} from "../../utils/budget.filter";
import clsx from "clsx";
import Select from "../../components/Select";
import { useMemo } from "react";
import useUserStore from "../../app/user";
import { CheckListView } from "../../components/checklist/CheckListView";

export const Checklist = () => {
  const { user } = useUserStore();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [combinedData, setCombinedData] = useState([]);
  const [monthsName, setMonthsName] = useState(["Filter Months"]);
  const activeAccount = getActiveAccount(root);

  // Filters
  const [owner, setOwner] = useState("Household");
  const uniqueCategories = getUniqueCategories(combinedData);
  const uniqueBudgetItemsByCategory =
    getUniqueBudgetItemsByCategory(combinedData);
  const uniqueDescriptionsByCategory =
    getUniqueDescriptionsByCategory(combinedData);

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
      owner
    ) {
      const savingData = getOwnerGridData(savings, owner);
      const retirementData = getOwnerGridData(retirements, owner);
      const expenseData = getOwnerGridData(expenses, owner);
      const debtData = getOwnerGridData(debts, owner);
      const combinedData = getCombineData(
        savingData,
        expenseData,
        retirementData,
        debtData
      );
      const filteredData = combinedData.filter(
        (data) => data.MonthlyBudget > 0
      );
      const sortedData = filteredData.sort((a, b) => {
        // Determine the display names for both records
        const aDisplayName = a.NickName || a.Description;
        const bDisplayName = b.NickName || b.Description;

        // First sort by Category
        if (a.Category < b.Category) return -1;
        if (a.Category > b.Category) return 1;

        // If Categories are equal, sort by BudgetItem
        if (a.BudgetItem < b.BudgetItem) return -1;
        if (a.BudgetItem > b.BudgetItem) return 1;

        // If BudgetItems are equal, sort by display name (NickName or Description)
        if (aDisplayName < bDisplayName) return -1;
        if (aDisplayName > bDisplayName) return 1;

        return 0;
      });

      setCombinedData(sortedData);
      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
    }
  }, [
    savings,
    retirements,
    debts,
    expenses,
    isSavingLoaded,
    isExpenseLoaded,
    isDebtLoaded,
    isRetLoaded,
    owner,
  ]);

  const handleOwnerChange = (e) => {
    if (e && e.target?.value) {
      setOwner(e.target?.value);
    }
  };

  const getCurrentYear = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    return currentYear?.toString().slice(-2);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setMonthsName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const generateMonthHeaders = () => {
    const lastTwoDigitsOfYear = getCurrentYear();
    let newMonths = months;
    if (monthsName.length > 1)
      newMonths = monthsName
        .filter((item) => item !== "Filter Months")
        .sort((a, b) => months.indexOf(a) - months.indexOf(b));
    const monthHeaders = newMonths?.map(
      (month) => `${month}-${lastTwoDigitsOfYear}`
    );

    return monthHeaders;
  };
  const monthHeaders = useMemo(
    () => generateMonthHeaders(),
    [monthsName, generateMonthHeaders]
  );

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
        <div className="w-full">
          <Select
            onChange={handleChange}
            value={monthsName}
            options={months}
            placeholder="Household"
            label="Months"
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
        <div className="w-full">
          <CheckListView
            uniqueCategories={uniqueCategories}
            uniqueBudgetItemsByCategory={uniqueBudgetItemsByCategory}
            uniqueDescriptionsByCategory={uniqueDescriptionsByCategory}
            monthHeaders={monthHeaders}
          />
        </div>
      )}
    </>
  ) : (
    <Package />
  );
};

export default Checklist;
