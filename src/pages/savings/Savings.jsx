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
import { getSavings } from "../../config/api";
import { expenseOwners, getOwnerGridData } from "../../utils/budget.filter";
import { SavingListView } from "../../components/savings/SavingListView";
import { hasRecords } from "../../utils/budget.calculation";
import { defaultDebSort } from "../../utils/budget.sort";

export const Savings = () => {
  const [showAll, setShowAll] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [gridData, setGridData] = useState([]);
  const activeAccount = getActiveAccount(root);

  // Filters
  const [owner, setOwner] = useState("Household");

  const { data: savings, status: isSavingLoaded } = useQuery({
    queryKey: ["savings"],
    queryFn: getSavings,
    staleTime: 1000 * 60 * 60,
  });

  ///-------------Filters Data Source --------------------------------///
  const owners = expenseOwners.map((owner) => ({
    value: owner,
    label: owner,
  }));

  ///-------------END Filters Data Source --------------------------------///

  useEffect(() => {
    if (isSavingLoaded === "success") {
      const savingData = getOwnerGridData(savings, owner);
      let updatedData = savingData;
      if (!showAll && hasRecords(savingData)) {
        updatedData = savingData.filter((item) => item.MarketValue > 0 || item.LoanBalance > 0 || item.MonthlyBudget > 0);
      }

      const sortedData = defaultDebSort(updatedData);

      setGridData(sortedData);
      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
    }
  }, [savings, isSavingLoaded, owner, showAll]);

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
                icon={!isShowing ? <MdFilterAlt className="text-lg" /> : <MdFilterAltOff className="text-lg" />}
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
              icon={!showAll ? <IoMdAdd className="text-lg" /> : <HiMinusSm className="text-lg" />}
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
          <div className="w-full">
            <SavingListView gridData={gridData} />
          </div>
        </div>
      )}
    </>
  ) : (
    <Package />
  );
};
