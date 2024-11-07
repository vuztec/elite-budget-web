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
import { getBankAccountNames } from '../../config/api';
import { getOwnerGridData, incomeOwners } from '../../utils/budget.filter';
import AddBank from '../../components/bank/AddBank';
import { BankListView } from '../../components/bank/BankListView';
import { defaultBankSort } from '../../utils/budget.sort';
import useUserStore from '../../app/user';
import { getPageTitle } from '../../utils';

export const BankAccounts = () => {
  const { user } = useUserStore();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [gridData, setGridData] = useState([]);
  const [open, setOpen] = useState(false);
  const activeAccount = getActiveAccount(user);

  // Filters
  const [owner, setOwner] = useState('Household');

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

  ///-------------END Filters Data Source --------------------------------///

  useEffect(() => {
    if (isNamesLoaded === 'success') {
      const accountData = getOwnerGridData(accountnames, owner);

      // Sort the data by Owner property
      const sortedData = defaultBankSort(accountData);
      setGridData(sortedData);
      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
    }
  }, [accountnames, isNamesLoaded, owner]);

  const handleOwnerChange = (e) => {
    if (e && e.target?.value) {
      setOwner(e.target?.value);
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
              'flex flex-row-reverse gap-2 p-1 text-sm rounded-full items-center text-white hover:bg-viewcolor',
              `bg-black hover:text-black`,
            )}
            onClick={() => addNewClick()}
          />
        </div>
        <div>{getPageTitle('Bank Account(s)', user)}</div>
        <div className="text-sm">
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
      </div>

      {!isDataLoaded && (
        <div className="py-10">
          <Loading />
        </div>
      )}

      {isDataLoaded && (
        <div className="w-full">
          <div className="w-full">
            <BankListView gridData={gridData} />
          </div>

          <AddBank open={open} setOpen={setOpen} recordData={''} key={new Date().getTime().toString()} />
        </div>
      )}
    </>
  ) : (
    <Package />
  );
};
