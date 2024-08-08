import React, { useEffect, useState } from "react";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import Button from "../../components/Button";
import { IoMdAdd } from "react-icons/io";
import Loading from "../../components/Loader";
import { useQuery } from "react-query";
import clsx from "clsx";
import Select from "../../components/Select";
import { getActiveAccount } from "../../utils/permissions";
import Package from "../../package/Package";
import {
  getBankAccountNames,
  getBankAccountTransactions,
} from "../../config/api";
import {
  getBankGridData,
  getOwnerGridData,
  incomeOwners,
} from "../../utils/budget.filter";
import { TransactionListView } from "../../components/bank/TransactionListView";
import AddTransaction from "../../components/bank/AddTransaction";
import useUserStore from "../../app/user";

export const Transactions = () => {
  const { user } = useUserStore();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [gridData, setGridData] = useState([]);
  const [open, setOpen] = useState(false);
  const activeAccount = getActiveAccount(user);

  // Filters
  const [owner, setOwner] = useState("Household");
  const [bank, setBank] = useState("All");
  const [year, setYear] = useState("All");
  const [month, setMonth] = useState("All");

  const { data: transactions, status: isTransactionLoaded } = useQuery({
    queryKey: ["banktransactions"],
    queryFn: getBankAccountTransactions,
    staleTime: 1000 * 60 * 60,
  });

  const { data: accountnames, status: isNamesLoaded } = useQuery({
    queryKey: ["accountnames"],
    queryFn: getBankAccountNames,
    staleTime: 1000 * 60 * 60,
  });

  console.log(transactions, "transactions");

  ///-------------Filters Data Source --------------------------------///
  const owners = incomeOwners.map((owner) => ({
    value: owner,
    label: owner,
  }));

  const banks = accountnames?.map((bank) => ({
    value: bank.id,
    label: bank.Name,
  }));

  ///-------------END Filters Data Source --------------------------------///

  useEffect(() => {
    if (isTransactionLoaded === "success" && isNamesLoaded === "success") {
      const transData = getBankGridData(transactions, owner, bank);

      // Sort the data by Owner property
      const sortedData = transData.sort((a, b) => {
        if (a.Owner === b.Owner) {
          return a.Description < b.Description ? 1 : -1; // Descending order for Owner
        }
        return a.Owner > b.Owner ? 1 : -1; // Ascending order for Category
      });

      setGridData(sortedData);
      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
    }
  }, [transactions, isTransactionLoaded, isNamesLoaded, owner, bank]);

  const handleOwnerChange = (e) => {
    if (e && e.target?.value) {
      setOwner(e.target?.value);
    }
  };

  const handleBankChange = (e) => {
    if (e && e.target?.value) {
      setBank(e.target?.value);
    }
  };

  const handleYearChange = (e) => {
    if (e && e.target?.value) {
      setYear(e.target?.value);
    }
  };

  const handleMonthChange = (e) => {
    if (e && e.target?.value) {
      setMonth(e.target?.value);
    }
  };

  const addNewClick = () => {
    setOpen(true);
  };

  const [isShowing, setIsShowing] = useState(true);

  return activeAccount ? (
    <>
      <div className="w-full gap-4 h-10 md:h-12 px-2 rounded-full bg-white flex items-center justify-between">
        <div className="text-sm">
          <Button
            label="Add New"
            icon={<IoMdAdd className="text-lg" />}
            className={clsx(
              "flex flex-row-reverse gap-2 p-1 text-sm rounded-full items-center text-white hover:bg-viewcolor",
              `bg-black hover:text-black`
            )}
            onClick={() => addNewClick()}
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
            onChange={handleBankChange}
            value={bank}
            options={banks}
            placeholder="All"
            label="Bank Account"
            className="bg-white w-full py-1"
          />
        </div>
        {/* <div className="w-full">
          <Select
            onChange={handleYearChange}
            value={year}
            options={owners}
            placeholder="Household"
            label="Year"
            className="bg-white w-full py-1"
          />
        </div>
        <div className="w-full">
          <Select
            onChange={handleMonthChange}
            value={month}
            options={owners}
            placeholder="Household"
            label="Month"
            className="bg-white w-full py-1"
          />
        </div> */}
      </div>

      {!isDataLoaded && (
        <div className="py-10">
          <Loading />
        </div>
      )}

      {isDataLoaded && (
        <div className="w-full">
          {accountnames?.map((bankName, index) => (
            <div className="w-full">
              <TransactionListView
                Data={gridData.filter(
                  (item) => item.BankAccountName.id === bankName.id
                )}
                key={index}
                bankName={bankName}
              />
            </div>
          ))}
          <AddTransaction
            open={open}
            setOpen={setOpen}
            recordData={""}
            key={new Date().getTime().toString()}
          />
        </div>
      )}
    </>
  ) : (
    <Package />
  );
};
