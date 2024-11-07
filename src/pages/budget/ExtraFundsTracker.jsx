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
import {
  getDebts,
  getExcessBalance,
  getExpenses,
  getExtraFundsTrackers,
  getIncomes,
  getRetirements,
  getSavings,
} from '../../config/api';
import { calculateBalances, getOwnerExpenseGridData, getOwnerGridData, incomeOwners } from '../../utils/budget.filter';
import { ExtraFundListView } from '../../components/budget/ExtraFundListView';
import AddExtraFund from '../../components/budget/AddExtraFund';
import { defaultFundSort } from '../../utils/budget.sort';
import useUserStore from '../../app/user';
import { getJointContribution } from '../../utils/budget.calculation';
import { getPageTitle } from '../../utils';

export const ExtraFundsTracker = () => {
  const { user } = useUserStore();
  const [incomeGridData, setIncomeGridData] = useState([]);
  const [savingsGridData, setSavingsGridData] = useState([]);
  const [retirementGridData, setRetirementGridData] = useState([]);
  const [expenseGridData, setExpenseGridData] = useState([]);
  const [debtGridData, setDebtGridData] = useState([]);
  const [selfContribution, setSelfContribution] = useState(0);
  const [partnerContribution, setPartnerContribution] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [gridData, setGridData] = useState([]);
  const [open, setOpen] = useState(false);
  const activeAccount = getActiveAccount(user);

  // Filters
  const [owner, setOwner] = useState('Household');

  const { data: extrafunds, status: isFundLoaded } = useQuery({
    queryKey: ['extrafunds'],
    queryFn: getExtraFundsTrackers,
    staleTime: 1000 * 60 * 60,
  });

  const { data: debts, status: isDebtLoaded } = useQuery({
    queryKey: ['debts'],
    queryFn: getDebts,
    staleTime: 1000 * 60 * 60,
  });

  const { data: expenses, status: isExpenseLoaded } = useQuery({
    queryKey: ['expenses'],
    queryFn: getExpenses,
    staleTime: 1000 * 60 * 60,
  });

  const { data: incomes, status: isIncomeLoaded } = useQuery({
    queryKey: ['incomes'],
    queryFn: getIncomes,
    staleTime: 1000 * 60 * 60,
  });

  const { data: savings, status: isSavingLoaded } = useQuery({
    queryKey: ['savings'],
    queryFn: getSavings,
    staleTime: 1000 * 60 * 60,
  });

  const { data: retirements, status: isRetLoaded } = useQuery({
    queryKey: ['retirements'],
    queryFn: getRetirements,
    staleTime: 1000 * 60 * 60,
  });

  const { data: excessBal } = useQuery({
    queryKey: ['excessbalance'],
    queryFn: getExcessBalance,
    staleTime: 1000 * 60 * 60,
  });

  ///-------------Filters Data Source --------------------------------///
  const owners = incomeOwners.map((owner) => ({
    value: owner,
    label: owner,
  }));

  ///-------------END Filters Data Source --------------------------------///

  useEffect(() => {
    if (
      isSavingLoaded === 'success' &&
      isRetLoaded === 'success' &&
      isExpenseLoaded === 'success' &&
      isDebtLoaded === 'success' &&
      isIncomeLoaded === 'success' &&
      isFundLoaded === 'success'
    ) {
      const transData = getOwnerGridData(extrafunds, owner);

      // Sort the data by Owner property

      const sortedData = defaultFundSort(transData);

      const dataWithBalances = calculateBalances(sortedData);

      setGridData(dataWithBalances);

      const savingData = getOwnerGridData(savings, owner);
      setSavingsGridData(savingData);

      const updatedRetirements = retirements.filter(
        (retirement) =>
          retirement.Description !== 'Retirement (401k, Roth 401k, 403b) Payroll Deductions' &&
          retirement.Description !== 'Retirement (401k, Roth 401k, 403b) Prior Job',
      );
      const retirementData = getOwnerGridData(updatedRetirements, owner);

      setRetirementGridData(retirementData);

      const expenseData = getOwnerExpenseGridData(expenses, owner);
      setExpenseGridData(expenseData);

      const debtData = getOwnerGridData(debts, owner);
      setDebtGridData(debtData);

      const incomeData = getOwnerGridData(incomes, owner);
      setIncomeGridData(incomeData);

      const selfAmount = getJointContribution(expenses, 'Self');
      setSelfContribution(selfAmount);
      const partnerAmount = getJointContribution(expenses, 'Partner');
      setPartnerContribution(partnerAmount);

      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
    }
  }, [
    savings,
    retirements,
    debts,
    incomes,
    expenses,
    isIncomeLoaded,
    isSavingLoaded,
    isExpenseLoaded,
    isDebtLoaded,
    isRetLoaded,
    extrafunds,
    isFundLoaded,
    owner,
  ]);

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
          <div>{getPageTitle('Extra Funds Tracker', user)}</div>
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
            <ExtraFundListView
              gridData={gridData}
              incomeGridData={incomeGridData}
              savingsGridData={savingsGridData}
              retirementGridData={retirementGridData}
              debtGridData={debtGridData}
              expenseGridData={expenseGridData}
              owner={owner}
              selfContribution={selfContribution}
              partnerContribution={partnerContribution}
              excessBal={excessBal}
            />
          </div>

          <AddExtraFund open={open} setOpen={setOpen} recordData={''} />
        </div>
      )}
    </>
  ) : (
    <Package />
  );
};
