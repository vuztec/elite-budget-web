import React, { useEffect, useState } from 'react';
import { MdFilterAlt, MdFilterAltOff } from 'react-icons/md';
import Button from '../../components/Button';
import { IoMdAdd } from 'react-icons/io';
import Loading from '../../components/Loader';
import { useQuery } from 'react-query';
import clsx from 'clsx';
import Select from '../../components/Select';
import { getActiveAccount } from '../../utils/permissions';
import Package from '../../package/Package';
import { getBankAccountNames, getBankAccountTransactions } from '../../config/api';
import { getBankGridData, incomeOwners } from '../../utils/budget.filter';
import { TransactionListView } from '../../components/bank/TransactionListView';
import AddTransaction from '../../components/bank/AddTransaction';
import useUserStore from '../../app/user';
import { getPageCopyright, getPageTitle } from '../../utils';

export const Transactions = () => {
  const { user } = useUserStore();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [gridData, setGridData] = useState([]);
  const [filteredOwnerBank, setFilteredOwnerBank] = useState([]);
  const [filteredBank, setFilteredBank] = useState([]);
  const [open, setOpen] = useState(false);
  const activeAccount = getActiveAccount(user);

  // Filters
  const [owner, setOwner] = useState('Household');
  const [bank, setBank] = useState('All');
  const [year, setYear] = useState('All');
  const [month, setMonth] = useState('All');

  const { data: transactions, status: isTransactionLoaded } = useQuery({
    queryKey: ['banktransactions'],
    queryFn: getBankAccountTransactions,
    staleTime: 1000 * 60 * 60,
  });

  const { data: accountnames, status: isNamesLoaded } = useQuery({
    queryKey: ['accountnames'],
    queryFn: getBankAccountNames,
    staleTime: 1000 * 60 * 60,
  });

  ///-------------Filters Data Source --------------------------------///
  const owners = incomeOwners.map((owner) => ({
    value: owner,
    label: owner,
  }));

  const ownerBanks = filteredOwnerBank?.map((bank) => ({
    value: bank.id,
    label: bank.Name,
  }));

  const banks = filteredBank?.map((bank) => ({
    value: bank.id,
    label: bank.Name,
  }));

  ///-------------END Filters Data Source --------------------------------///

  useEffect(() => {
    if (isTransactionLoaded === 'success' && isNamesLoaded === 'success') {
      let updatedOwnerBank = accountnames;
      if (owner !== 'Household' && parseInt(owner) !== 0) {
        updatedOwnerBank = accountnames.filter((account) => account.Owner === owner);
      }
      setFilteredOwnerBank(updatedOwnerBank);
      let updatedBank = updatedOwnerBank;
      if (bank !== 'All' && parseInt(bank) !== 0) {
        updatedBank = updatedOwnerBank.filter((account) => parseInt(account.id) === parseInt(bank));
      }
      setFilteredBank(updatedBank);

      const transData = getBankGridData(transactions, owner, bank);
      // Sort the data by Owner property
      const sortedData = transData?.sort((a, b) => {
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
  }, [transactions, isTransactionLoaded, accountnames, isNamesLoaded, owner, bank]);

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

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  const [isShowing, setIsShowing] = useState(true);

  return activeAccount ? (
    <>
      <div className="fixed bg-white w-[calc(100vw-40px)] lg:w-[calc(100vw-270px)] -mt-4 rounded px-4 z-9">
        <div className="w-full gap-4 h-10 md:h-12 px-2 rounded-full bg-white flex items-center justify-between">
          <div className="text-sm min-w-fit whitespace-nowrap">
            <Button
              label="Add New"
              icon={<IoMdAdd className="text-lg" />}
              className={clsx(
                'flex flex-row-reverse gap-2 p-1 text-sm rounded-full items-center text-white hover:bg-viewcolor',
                `bg-black hover:text-black`,
              )}
              onClick={() => addNewClick()}
            />
          </div>
          <div>{getPageTitle('Bank Register(s)', user)}</div>
          <div className="text-sm min-w-fit whitespace-nowrap">
            <Button
              label={!isShowing ? 'Show Filters' : 'Hide Filters'}
              icon={!isShowing ? <MdFilterAlt className="text-lg" /> : <MdFilterAltOff className="text-lg" />}
              className={clsx(
                'flex flex-row-reverse gap-2 p-1 text-sm rounded-full items-center text-white hover:text-black hover:bg-viewcolor',
                !isShowing ? 'bg-green-800' : 'bg-red-800',
              )}
              onClick={() => setIsShowing((old) => !old)}
            />
          </div>
        </div>
        <div
          className={clsx(
            'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 pb-5',
            isShowing ? 'block' : 'hidden',
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
              options={ownerBanks}
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
      </div>

      {!isDataLoaded && (
        <div className="py-10 mt-40">
          <Loading />
        </div>
      )}

      {isDataLoaded && (
        <div className={`w-full ${isShowing ? 'mt-40' : 'mt-10'}`}>
          {filteredBank?.map((bankName, index) => (
            <div className="w-full" key={index}>
              <TransactionListView
                Data={gridData.filter((item) => item.BankAccountName.id === bankName.id)}
                key={index}
                bankName={bankName}
                banks={banks}
              />
            </div>
          ))}
          <div className="w-full bg-white rounded-lg border-t mt-8 p-6 text-center justify-center">
            <p>{getPageCopyright()}</p>
          </div>
          <AddTransaction
            open={open}
            handleClose={handleClose}
            recordData={''}
            key={new Date().getTime().toString()}
            banks={banks}
          />
        </div>
      )}
    </>
  ) : (
    <Package />
  );
};
