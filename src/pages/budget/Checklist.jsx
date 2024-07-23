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
import { useSearchParams } from "react-router-dom";
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
import { getFormattedValueTotal } from "../../utils/budget.calculation";

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

  console.log("combinedData: ", combinedData);
  console.log("uniqueCategories: ", uniqueCategories);
  console.log("uniqueBudgetItemsByCategory: ", uniqueBudgetItemsByCategory);
  console.log("uniqueDescriptionsByCategory: ", uniqueDescriptionsByCategory);

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
      filteredData.sort((a, b) => {
        // Compare by Category
        if (a.Category !== b.Category) {
          return a.Category.localeCompare(b.Category);
        }
        // If Category is the same, compare by BudgetItem
        if (a.BudgetItem !== b.BudgetItem) {
          return a.BudgetItem.localeCompare(b.BudgetItem);
        }
        // If BudgetItem is also the same, compare by Description
        return a.Description.localeCompare(b.Description);
      });
      setCombinedData(filteredData);
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

  const tableCategoryStyle = {
    padding: "8px",
    textAlign: "left",
    backgroundColor: "black",
    color: "#ffe99b",
    fontWeight: "bold",
  };

  const tableBudgetItemStyle = {
    padding: "8px",
    textAlign: "left",
    backgroundColor: "lightgray",
    paddingLeft: "20px",
    fontWeight: "bold",
    whiteSpace: "pre-wrap",
  };

  const tableDescriptionStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
  };

  const tableFirstDescriptionStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    paddingLeft: "40px",
    textAlign: "left",
  };

  const tableCurrencyStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    paddingLeft: "20px",
    textAlign: "left",
    whiteSpace: "pre-wrap",
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
          <div className="flex flex-col xl:flex-row w-full gap-5 xl:gap-10">
            <table className="w-[97%] ml-5 -mb-5">
              <thead>
                <tr className="font-bold bg-gray-200 text-black border border-gray-400 text-left text-sm xl:text-lg">
                  <th
                    style={{
                      border: "1px solid #ddd",
                      textAlign: "left",
                      padding: "8px",
                    }}
                  >
                    Savings & Spending
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "5px" }}>
                    Day Due
                  </th>
                  <th
                    style={{
                      whiteSpace: "nowrap",
                      border: "1px solid #ddd",
                      padding: "5px",
                    }}
                  >
                    Monthly Budget
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "5px" }}>
                    Payment Method
                  </th>
                  {monthHeaders.map((header, index) => (
                    <th
                      key={index}
                      style={{
                        whiteSpace: "nowrap",
                        border: "1px solid #ddd",
                        padding: "5px",
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {uniqueCategories &&
                  uniqueCategories.map((category, categoryIndex) => (
                    <React.Fragment key={categoryIndex}>
                      <tr>
                        <td style={tableCategoryStyle}>{category}</td>{" "}
                        {/* SAVINGS & SPENDING */}
                        <td style={tableCategoryStyle}>
                          {/* DAY DUE COLUMN */}
                        </td>
                        <td style={tableCategoryStyle}>
                          {/* Monthly Budget column */}
                        </td>
                        <td style={tableCategoryStyle}>
                          {/* PAYMENT METHOD column */}
                        </td>
                        {monthHeaders.map((header, index) => (
                          <td key={index} style={tableCategoryStyle}>
                            {/* Your content for each cell in the row */}
                          </td>
                        ))}
                      </tr>
                      {uniqueBudgetItemsByCategory[category] &&
                        uniqueBudgetItemsByCategory[category].map(
                          (budgetItem, budgetItemIndex) => (
                            <React.Fragment
                              key={`${category}_${budgetItemIndex}`}
                            >
                              <tr>
                                <td style={tableBudgetItemStyle}>
                                  {budgetItem}
                                </td>{" "}
                                {/* Each budget item under the category */}
                                <td style={tableBudgetItemStyle}>
                                  {/* DAY DUE COLUMN */}
                                </td>
                                <td style={tableBudgetItemStyle}>
                                  {/* Monthly Budget column */}
                                </td>
                                <td style={tableBudgetItemStyle}>
                                  {/* PAYMENT METHOD column */}
                                </td>
                                {monthHeaders.map((header, index) => (
                                  <td key={index} style={tableBudgetItemStyle}>
                                    {/* Your content for each cell in the row */}
                                  </td>
                                ))}
                              </tr>
                              {uniqueDescriptionsByCategory[category] &&
                                uniqueDescriptionsByCategory[category][
                                  budgetItem
                                ] &&
                                Object.entries(
                                  uniqueDescriptionsByCategory[category][
                                    budgetItem
                                  ]
                                ).map(
                                  (
                                    [description, details],
                                    descriptionIndex
                                  ) => (
                                    <tr
                                      key={`${category}_${budgetItem}_${descriptionIndex}`}
                                    >
                                      <td style={tableFirstDescriptionStyle}>
                                        {details.NickName
                                          ? details.NickName
                                          : description}
                                      </td>{" "}
                                      {/* Description */}
                                      <td style={tableDescriptionStyle}>
                                        {details.DueDate}
                                      </td>{" "}
                                      {/* DAY DUE COLUMN */}
                                      <td style={tableCurrencyStyle}>
                                        {getFormattedValueTotal(
                                          user,
                                          details.MonthlyBudget
                                        )}
                                      </td>
                                      {/* Monthly Budget column */}
                                      <td style={tableDescriptionStyle}>
                                        {details.PaymentMethod}
                                      </td>{" "}
                                      {/* PAYMENT METHOD column */}
                                      {monthHeaders.map((header, index) => (
                                        <td
                                          key={index}
                                          style={tableDescriptionStyle}
                                        >
                                          {/* Your content for each cell in the row */}
                                        </td>
                                      ))}
                                    </tr>
                                  )
                                )}
                            </React.Fragment>
                          )
                        )}
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  ) : (
    <Package />
  );
};

export default Checklist;
