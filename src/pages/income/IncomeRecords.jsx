import React, { useEffect, useState } from 'react';
import { MdFilterAlt, MdFilterAltOff } from 'react-icons/md';
import Button from '../../components/Button';
import { IoMdAdd } from 'react-icons/io';
import { HiMinusSm } from 'react-icons/hi';
import Loading from '../../components/Loader';
import { useQuery } from 'react-query';
import clsx from 'clsx';
import Select from '../../components/Select';
import { getActiveAccount } from '../../utils/permissions';
import Package from '../../package/Package';
import { getExtraPayChecks, getIncomes } from '../../config/api';
import { getOwnerGridData, incomeOwners } from '../../utils/budget.filter';
import { IncomeListView } from '../../components/income/IncomeListView';
import { hasRecords } from '../../utils/budget.calculation';
import { ExtraPayListView } from '../../components/extrapay/ExtraPayListView';
import { defaultIncomeSort } from '../../utils/budget.sort';
import useUserStore from '../../app/user';
import { getPageTitle } from '../../utils';

export const IncomeRecords = () => {
  const { user } = useUserStore();
  const [showAll, setShowAll] = useState(false);
  const [showAll2, setShowAll2] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [gridData, setGridData] = useState([]);
  const [extraGridData, setExtraGridData] = useState([]);
  const activeAccount = getActiveAccount(user);

  // Filters
  const [owner, setOwner] = useState('Household');

  const { data: incomes, status: isIncomeLoaded } = useQuery({
    queryKey: ['incomes'],
    queryFn: getIncomes,
    staleTime: 1000 * 60 * 60,
  });

  const { data: extrapaychecks, status: isPayChecksLoaded } = useQuery({
    queryKey: ['extrapaychecks'],
    queryFn: getExtraPayChecks,
    staleTime: 1000 * 60 * 60,
  });

  ///-------------Filters Data Source --------------------------------///
  const owners = incomeOwners.map((owner) => ({
    value: owner,
    label: owner,
  }));

  ///-------------END Filters Data Source --------------------------------///

  useEffect(() => {
    if (isIncomeLoaded === 'success' && isPayChecksLoaded === 'success') {
      const incomeData = getOwnerGridData(incomes, owner);
      let updatedData = incomeData;
      let updatedExtraData = extrapaychecks;

      if (!showAll && hasRecords(incomeData)) {
        updatedData = incomeData.filter((item) => item.GrossAmount > 0);
      }

      if (!showAll2 && hasRecords(extrapaychecks)) {
        updatedExtraData = extrapaychecks.filter((item) => item.SelfAmount > 0 || item.PartnerAmount > 0);
      }

      // Sort the data by Owner property
      const sortedData = defaultIncomeSort(updatedData);
      setGridData(sortedData);
      setExtraGridData(updatedExtraData);
      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
    }
  }, [incomes, extrapaychecks, isIncomeLoaded, isPayChecksLoaded, owner, showAll, showAll2]);

  const handleOwnerChange = (e) => {
    if (e && e.target?.value) {
      setOwner(e.target?.value);
    }
  };

  const [isShowing, setIsShowing] = useState(true);

  return activeAccount ? (
    <>
      <div className="fixed bg-white w-[calc(100vw-40px)] lg:w-[calc(100vw-270px)] -mt-4 rounded px-4 z-9">
        <div className="w-full gap-4 h-10 md:h-12 px-2 rounded-full bg-white flex items-center justify-between">
          <div className="text-sm min-w-fit whitespace-nowrap">
            <Button
              label={!showAll ? 'Add New' : 'Completed'}
              icon={!showAll && <IoMdAdd className="text-lg" />}
              className={clsx(
                'flex flex-row-reverse gap-2 p-1 text-sm rounded-full items-center text-white hover:bg-viewcolor bg-black hover:text-black',
                !showAll ? 'bg-black' : 'bg-red-800',
              )}
              onClick={() => setShowAll((old) => !old)}
            />
          </div>
          <div>{getPageTitle('Income Sources', user)}</div>
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
        </div>
      </div>

      {!isDataLoaded && (
        <div className="py-10 mt-40">
          <Loading />
        </div>
      )}

      {isDataLoaded && (
        <div className={`w-full ${isShowing ? 'mt-40' : 'mt-10'}`}>
          <div className="w-full">
            <IncomeListView gridData={gridData} />
          </div>

          <div className="w-full gap-4 h-10 md:h-12 px-2 bg-white flex items-center justify-between mt-5 -mb-7">
            <div className="text-sm">
              <Button
                label={!showAll2 ? 'Add New' : 'Completed'}
                icon={!showAll2 && <IoMdAdd className="text-lg" />}
                className={clsx(
                  'flex flex-row-reverse gap-2 p-1 text-sm rounded-full items-center text-white hover:bg-viewcolor bg-black hover:text-black',
                  !showAll2 ? 'bg-black' : 'bg-red-800',
                )}
                onClick={() => setShowAll2((old) => !old)}
              />
            </div>
          </div>

          <div className="w-full">
            <ExtraPayListView gridData={extraGridData} />
          </div>
        </div>
      )}
    </>
  ) : (
    <Package />
  );
};
