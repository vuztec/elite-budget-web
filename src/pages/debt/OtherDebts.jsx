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
import { getDebts } from '../../config/api';
import { debtCategories, expenseOwners, getCatGridData } from '../../utils/budget.filter';
import { DebtListView } from '../../components/debt/DebtListView';
import { DebtSummary } from '../../components/debt/DebtSummary';
import { hasRecords } from '../../utils/budget.calculation';
import useUserStore from '../../app/user';
import { getPageCopyright, getPageTitle } from '../../utils';
import { ToolTip2 } from '../../components/tooltip';

export const OtherDebts = () => {
  const { user } = useUserStore();
  const [showAll, setShowAll] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [gridData, setGridData] = useState([]);
  const [ownerData, setOwnerData] = useState([]);
  const activeAccount = getActiveAccount(user);

  // Filters
  const [owner, setOwner] = useState('Household');
  const [catFilter, setCatFilter] = useState('All');

  const { data: debts, status: isDebtLoaded } = useQuery({
    queryKey: ['debts'],
    queryFn: getDebts,
    staleTime: 1000 * 60 * 60,
  });

  ///-------------Filters Data Source --------------------------------///
  const owners = expenseOwners.map((owner) => ({
    value: owner,
    label: owner,
  }));

  const categories = debtCategories.map((cat) => ({
    value: cat,
    label: cat,
  }));

  ///-------------END Filters Data Source --------------------------------///

  useEffect(() => {
    if (isDebtLoaded === 'success') {
      const debtData = getCatGridData(debts, owner, catFilter);
      setOwnerData(debtData);
      let updatedData = debtData;
      if (!showAll && hasRecords(debtData)) {
        updatedData = debtData.filter((item) => item.MarketValue > 0 || item.LoanBalance > 0 || item.MonthlyBudget > 0);
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
  }, [debts, isDebtLoaded, owner, catFilter, showAll]);

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

  const [isShowing, setIsShowing] = useState(true);

  return activeAccount ? (
    <>
      <div className="fixed bg-white w-[calc(100vw-40px)] lg:w-[calc(100vw-270px)] -mt-4 rounded px-4 z-9">
        <div className="w-full gap-4 h-10 md:h-12 px-2 rounded-full bg-white flex items-center justify-between">
          {hasRecords(ownerData) ? (
            <div className="group flex relative">
              <Button
                label={!showAll ? 'Add New' : 'Completed'}
                icon={!showAll && <IoMdAdd className="text-lg" />}
                className={clsx(
                  'flex flex-row-reverse gap-2 p-1 text-sm rounded-full items-center text-white hover:bg-viewcolor bg-black hover:text-black',
                  !showAll ? 'bg-black' : 'bg-red-800',
                )}
                onClick={() => setShowAll((old) => !old)}
              />
              <ToolTip2 showing={showAll} item={'other debts'} />
            </div>
          ) : (
            <div className="text-white">All</div>
          )}
          <div>{getPageTitle('Other Debts', user)}</div>
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
              onChange={handleCatChange}
              value={catFilter}
              options={categories}
              placeholder="All"
              label="Category"
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
            <DebtListView
              Data={gridData.filter((item) => item.Category === 'Credit Card')}
              category="Credit Card"
              showAll={showAll}
            />
          </div>

          <div className="w-full">
            <DebtListView
              Data={gridData.filter((item) => item.Category === 'Department Store')}
              category="Department Store"
              showAll={showAll}
            />
          </div>

          <div className="w-full">
            <DebtListView
              Data={gridData.filter((item) => item.Category === 'Family/Friend Loan')}
              category="Family/Friend Loan"
              showAll={showAll}
            />
          </div>

          <div className="w-full">
            <DebtListView
              Data={gridData.filter((item) => item.Category === 'Medical Debt')}
              category="Medical Debt"
              showAll={showAll}
            />
          </div>

          <div className="w-full">
            <DebtListView
              Data={gridData.filter((item) => item.Category === 'Personal Loan')}
              category="Personal Loan"
              showAll={showAll}
            />
          </div>

          <div className="w-full">
            <DebtListView
              Data={gridData.filter((item) => item.Category === 'Student Loan')}
              category="Student Loan"
              showAll={showAll}
            />
          </div>

          <div className="w-full">
            <DebtListView
              Data={gridData.filter((item) => item.Category === 'Other Debt')}
              category="Other Debt"
              showAll={showAll}
            />
          </div>

          <div className="w-full">
            <DebtSummary gridData={gridData} />
          </div>
          <div className="w-full bg-white rounded-lg border-t mt-8 p-6 text-center justify-center">
            <p>{getPageCopyright()}</p>
          </div>
        </div>
      )}
    </>
  ) : (
    <Package />
  );
};
