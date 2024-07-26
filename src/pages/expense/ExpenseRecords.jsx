import React, { useEffect, useState } from "react";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import Button from "../../components/Button";
import { IoMdAdd } from "react-icons/io";
import { HiMinusSm } from "react-icons/hi";
import Loading from "../../components/Loader";
import { useQuery } from "react-query";
import clsx from "clsx";
import Select from "../../components/Select";
import { getActiveAccount } from "../../utils/permissions";
import Package from "../../package/Package";
import { getExpenses } from "../../config/api";
import {
  expenseCategories,
  expenseOwners,
  getCatGridData,
} from "../../utils/budget.filter";
import { ExpenseListView } from "../../components/expense/ExpenseListView";
import { ExpenseSummary } from "../../components/expense/ExpenseSummary";
import { hasRecords } from "../../utils/budget.calculation";

export const ExpenseRecords = () => {
  const [showAll, setShowAll] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [gridData, setGridData] = useState([]);
  const activeAccount = getActiveAccount(root);

  // Filters
  const [owner, setOwner] = useState("Household");
  const [catFilter, setCatFilter] = useState("All");

  const { data: expenses, status: isExpenseLoaded } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
    staleTime: 1000 * 60 * 60,
  });

  ///-------------Filters Data Source --------------------------------///
  const owners = expenseOwners.map((owner) => ({
    value: owner,
    label: owner,
  }));

  const categories = expenseCategories.map((cat) => ({
    value: cat,
    label: cat,
  }));

  ///-------------END Filters Data Source --------------------------------///

  useEffect(() => {
    if (isExpenseLoaded === "success") {
      const expenseData = getCatGridData(expenses, owner, catFilter);
      let updatedData = expenseData;
      if (!showAll && hasRecords(expenseData)) {
        updatedData = expenseData.filter(
          (item) =>
            item.MarketValue > 0 ||
            item.LoanBalance > 0 ||
            item.MonthlyBudget > 0
        );
      }
      // Sort the data by Owner property
      const sortedData = updatedData.sort((a, b) => {
        if (a.Category === b.Category) {
          return a.Owner < b.Owner ? 1 : -1; // Descending order for Owner
        }
        return a.Category > b.Category ? 1 : -1; // Ascending order for Category
      });
      setGridData(sortedData);
      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
    }
  }, [expenses, isExpenseLoaded, owner, catFilter, showAll]);

  const handleOwnerChange = (e) => {
    if (e && e.target?.value) {
      setOwner(e.target?.value);
    }
  };

  const handleCatChange = (e) => {
    if (e && e.target?.value) {
      setCatFilter(e.target?.value);
    }
  };

  const [isShowing, setIsShowing] = useState(false);

  return activeAccount ? (
    <>
      <div className="w-full gap-4 h-10 md:h-12 px-2 rounded-full bg-white flex items-center justify-between">
        <div className="text-sm">
          <Button
            label={!showAll ? "Add New" : "Cancel Add"}
            icon={
              !showAll ? (
                <IoMdAdd className="text-lg" />
              ) : (
                <HiMinusSm className="text-lg" />
              )
            }
            className={clsx(
              "flex flex-row-reverse gap-2 p-1 text-sm rounded-full items-center text-white hover:bg-viewcolor bg-black hover:text-black",
              !showAll ? "bg-black" : "bg-red-800"
            )}
            onClick={() => setShowAll((old) => !old)}
          />
        </div>
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
              "flex flex-row-reverse gap-2 p-1 text-sm rounded-full items-center text-white hover:text-black hover:bg-viewcolor",
              !isShowing ? "bg-green-800" : "bg-red-800"
            )}
            onClick={() => setIsShowing((old) => !old)}
          />
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
            onChange={handleCatChange}
            value={catFilter}
            options={categories}
            placeholder="All"
            label="Category"
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
          <div className="w-full">
            <ExpenseListView
              Data={gridData.filter((item) => item.Category === "Charity")}
              category="Charity"
              showColumn={false}
              showAll={showAll}
            />
          </div>

          <div className="w-full">
            <ExpenseListView
              Data={gridData.filter((item) => item.Category === "Children")}
              category="Children"
              showColumn={true}
              showAll={showAll}
            />
          </div>

          <div className="w-full">
            <ExpenseListView
              Data={gridData.filter(
                (item) => item.Category === "Dues/Subscriptions"
              )}
              category="Dues/Subscriptions"
              showColumn={false}
              showAll={showAll}
            />
          </div>

          <div className="w-full">
            <ExpenseListView
              Data={gridData.filter(
                (item) => item.Category === "Entertainment"
              )}
              category="Entertainment"
              showColumn={false}
              showAll={showAll}
            />
          </div>

          <div className="w-full">
            <ExpenseListView
              Data={gridData.filter((item) => item.Category === "Food")}
              category="Food"
              showColumn={false}
              showAll={showAll}
            />
          </div>

          <div className="w-full">
            <ExpenseListView
              Data={gridData.filter(
                (item) => item.Category === "Health / Medical"
              )}
              category="Health / Medical"
              showColumn={false}
              showAll={showAll}
            />
          </div>

          <div className="w-full">
            <ExpenseListView
              Data={gridData.filter(
                (item) => item.Category === "Household, Personal Care & Gifts"
              )}
              category="Household, Personal Care & Gifts"
              showColumn={true}
              showAll={showAll}
            />
          </div>

          <div className="w-full">
            <ExpenseListView
              Data={gridData.filter((item) => item.Category === "Housing")}
              category="Housing"
              showColumn={true}
              showAll={showAll}
            />
          </div>

          <div className="w-full">
            <ExpenseListView
              Data={gridData.filter(
                (item) => item.Category === "Joint Contribution"
              )}
              category="Joint Contribution"
              showColumn={true}
              showAll={showAll}
            />
          </div>

          <div className="w-full">
            <ExpenseListView
              Data={gridData.filter(
                (item) => item.Category === "Other Insurance"
              )}
              category="Other Insurance"
              showColumn={false}
              showAll={showAll}
            />
          </div>

          <div className="w-full">
            <ExpenseListView
              Data={gridData.filter(
                (item) => item.Category === "Parents/Elder Care"
              )}
              category="Parents/Elder Care"
              showColumn={false}
              showAll={showAll}
            />
          </div>

          <div className="w-full">
            <ExpenseListView
              Data={gridData.filter((item) => item.Category === "Pets/Animals")}
              category="Pets/Animals"
              showColumn={false}
              showAll={showAll}
            />
          </div>

          <div className="w-full">
            <ExpenseListView
              Data={gridData.filter((item) => item.Category === "Recreation")}
              category="Recreation"
              showColumn={true}
              showAll={showAll}
            />
          </div>

          <div className="w-full">
            <ExpenseListView
              Data={gridData.filter(
                (item) => item.Category === "Rental Property"
              )}
              category="Rental Property"
              showColumn={true}
              showAll={showAll}
            />
          </div>

          <div className="w-full">
            <ExpenseListView
              Data={gridData.filter(
                (item) => item.Category === "Transportation"
              )}
              category="Transportation"
              showColumn={true}
              showAll={showAll}
            />
          </div>

          <div className="w-full">
            <ExpenseListView
              Data={gridData.filter((item) => item.Category === "Vacations")}
              category="Vacations"
              showColumn={false}
              showAll={showAll}
            />
          </div>

          <div className="w-full">
            <ExpenseSummary gridData={gridData} />
          </div>
        </div>
      )}
    </>
  ) : (
    <Package />
  );
};
