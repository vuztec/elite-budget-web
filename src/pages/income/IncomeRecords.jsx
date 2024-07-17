import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import Button from "../../components/Button";
import { IoMdAdd } from "react-icons/io";
import { HiMinusSm } from "react-icons/hi";
import Loading from "../../components/Loader";
import { useQuery } from "react-query";
import useUserStore from "../../app/user";
import clsx from "clsx";
import Select from "../../components/Select";
import { getActiveAccount } from "../../utils/permissions";
import Package from "../../package/Package";
import AddIncome from "../../components/income/AddIncome";
import { getIncomes } from "../../config/api";
import { getOwnerGridData, incomeOwners } from "../../utils/budget.filter";
import { IncomeListView } from "../../components/income/IncomeListView";

const customList = [
  "Main Job",
  "Side Job",
  "Interest/Dividends",
  "Child Support",
  "Bonus",
  "Rental Income",
  "Other",
];

export const IncomeRecords = () => {
  const { user } = useUserStore();
  const [showAll, setShowAll] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [gridData, setGridData] = useState([]);
  const [open, setOpen] = useState(false);
  const activeAccount = getActiveAccount(root);

  // Filters
  const [owner, setOwner] = useState("Household");

  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const tab = searchParams.get("tab");

  const { data: incomes, status: isIncomeLoaded } = useQuery({
    queryKey: ["incomes"],
    queryFn: getIncomes,
    staleTime: 1000 * 60 * 60,
  });

  console.log("data: ", gridData);

  ///-------------Filters Data Source --------------------------------///
  const owners = incomeOwners.map((owner) => ({
    value: owner,
    label: owner,
  }));

  ///-------------END Filters Data Source --------------------------------///

  useEffect(() => {
    if (name === "projects") setSelected(parseInt(tab));
  }, [name, tab]);

  useEffect(() => {
    if (isIncomeLoaded === "success") {
      const incomeData = getOwnerGridData(incomes, owner);
      let updatedData = incomeData;
      if (!showAll) {
        updatedData = incomeData.filter((item) => item.GrossAmount > 0);
      }
      // Sort the data by Owner property
      const sortedData = updatedData.sort((a, b) => {
        if (a.Owner < b.Owner) return 1;
        if (a.Owner > b.Owner) return -1;
        // If Owner is the same, sort by IncomeSource using customList
        const aIndex = customList.indexOf(a.IncomeSource);
        const bIndex = customList.indexOf(b.IncomeSource);
        return aIndex - bIndex;
      });
      setGridData(sortedData);
      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
    }
  }, [incomes, isIncomeLoaded, owner, showAll]);

  const handleOwnerChange = (e) => {
    if (e && e.target?.value) {
      setOwner(e.target?.value);
    }
  };

  const addNewClick = () => {
    setShowAll(true);
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
        <div className="w-full">
          <div className="py-4 w-full">
            <IncomeListView gridData={gridData} />
          </div>

          {/* <AddIncome
            open={open}
            setOpen={setOpen}
            recordData={""}
            key={new Date().getTime().toString()}
          /> */}
        </div>
      )}
    </>
  ) : (
    <Package />
  );
};
