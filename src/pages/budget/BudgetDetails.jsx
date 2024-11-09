import React, { useEffect, useState } from 'react';
import MonthlyIncome from '../../components/budget/MonthlyIncome';
import MonthlySavings from '../../components/budget/MonthlySavings';
import MonthlyRetirement from '../../components/budget/MonthlyRetirement';
import MonthlyDebt from '../../components/budget/MonthlyDebt';
import MonthlyExpenses from '../../components/budget/MonthlyExpenses';
import MonthlySummary from '../../components/budget/MonthlySummary';
import Package from '../../package/Package';
import Loading from '../../components/Loader';
import { MdFilterAlt, MdFilterAltOff } from 'react-icons/md';
import Button from '../../components/Button';
import {
  getDebtGoals,
  getDebts,
  getExpenseGoals,
  getExpenses,
  getIncomes,
  getMainGoals,
  getRetirements,
  getSavings,
} from '../../config/api';
import { useQuery } from 'react-query';
import { getActiveAccount } from '../../utils/permissions';
import { expenseOwners, getOwnerExpenseGridData, getOwnerGridData } from '../../utils/budget.filter';
import clsx from 'clsx';
import Select from '../../components/Select';
import YearlyIncome from '../../components/budget/YearlyIncome';
import { PiPrinter } from 'react-icons/pi';
import generatePDF, { Margin, usePDF } from 'react-to-pdf';
import { getJointContribution } from '../../utils/budget.calculation';
import useUserStore from '../../app/user';
import { SidebarLinks } from '../../utils/sidebar.data';
import { useLocation } from 'react-router-dom';
import { getPageCopyright, getPageTitle } from '../../utils';

export const BudgetDetails = () => {
  const { user } = useUserStore();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [incomeGridData, setIncomeGridData] = useState([]);
  const [savingsGridData, setSavingsGridData] = useState([]);
  const [retirementGridData, setRetirementGridData] = useState([]);
  const [retirementGridDataAll, setRetirementGridDataAll] = useState([]);
  const [expenseGridData, setExpenseGridData] = useState([]);
  const [debtGridData, setDebtGridData] = useState([]);
  const [selfContribution, setSelfContribution] = useState(0);
  const [partnerContribution, setPartnerContribution] = useState(0);
  const { toPDF, targetRef } = usePDF({ filename: 'budget-details.pdf', page: { margin: Margin.MEDIUM } });
  const [showPdfContent, setShowPdfContent] = useState(false);
  const [title, setTitle] = useState('');
  const location = useLocation();

  const activeAccount = getActiveAccount(user);

  // Filters
  const [owner, setOwner] = useState('Household');

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

  const { data: debtgoals, status: isDebtGoalsLoaded } = useQuery({
    queryKey: ['debtgoals'],
    queryFn: getDebtGoals,
    staleTime: 1000 * 60 * 60,
  });

  const { data: expensegoals, status: isExpenseGoalsLoaded } = useQuery({
    queryKey: ['expensegoals'],
    queryFn: getExpenseGoals,
    staleTime: 1000 * 60 * 60,
  });

  const { data: maingoals, status: isMainGoalsLoaded } = useQuery({
    queryKey: ['maingoals'],
    queryFn: getMainGoals,
    staleTime: 1000 * 60 * 60,
  });

  ///-------------Filters Data Source --------------------------------///
  const owners = expenseOwners.map((owner) => ({
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
      isMainGoalsLoaded === 'success' &&
      isDebtGoalsLoaded === 'success' &&
      isExpenseGoalsLoaded === 'success' &&
      owner
    ) {
      const savingData = getOwnerGridData(savings, owner);
      setSavingsGridData(savingData);
      const updatedRetirements = retirements.filter(
        (retirement) =>
          retirement.Description !== 'Retirement (401k, Roth 401k, 403b) Payroll Deductions' &&
          retirement.Description !== 'Retirement (401k, Roth 401k, 403b) Prior Job',
      );
      const retirementData = getOwnerGridData(updatedRetirements, owner);
      setRetirementGridData(retirementData);

      const retirementDataAll = getOwnerGridData(retirements, owner);
      setRetirementGridDataAll(retirementDataAll);

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
    isMainGoalsLoaded,
    isDebtGoalsLoaded,
    isExpenseGoalsLoaded,
    owner,
  ]);

  const handleOwnerChange = (e) => {
    if (e && e.target?.value) {
      setOwner(e.target?.value);
    }
  };

  const [isShowing, setIsShowing] = useState(true);

  useEffect(() => {
    const data = SidebarLinks.find((item) =>
      item.link ? item.link === location.pathname : item.sub.find((sub_item) => sub_item.link === location.pathname),
    );

    if (data?.sub?.length) {
      const sub = data.sub.find((sub_item) => sub_item.link === location.pathname);
      setTitle(sub?.title);
    } else setTitle(data?.title);
  }, [location.pathname]);

  const handlePdf = () => {
    setShowPdfContent(true);
    setTimeout(() => {
      toPDF();
      setShowPdfContent(false);
    }, 10);
  };

  return activeAccount ? (
    <>
      <div className="fixed bg-white w-[calc(100vw-40px)] lg:w-[calc(100vw-270px)] -mt-4 rounded px-4 z-9">
        <div className="w-full flex item-center justify-end">
          <div className="w-full gap-4 h-10 md:h-12 px-2 rounded-full bg-white flex items-center justify-between">
            <div></div>
            <div>{getPageTitle('Budget Details', user)}</div>
            <div className="flex items-center gap-2">
              <div className="text-sm">
                <Button
                  label={!isShowing ? 'Show Filters' : 'Hide Filters'}
                  icon={!isShowing ? <MdFilterAlt className="text-lg" /> : <MdFilterAltOff className="text-lg" />}
                  className={clsx(
                    'flex flex-row-reverse gap-2 p-1 text-sm rounded-full items-center text-white hover:text-black',
                    !isShowing ? 'bg-green-800' : 'bg-red-800',
                  )}
                  onClick={() => setIsShowing((old) => !old)}
                />
              </div>
              <Button
                onClick={handlePdf}
                icon={<PiPrinter />}
                label={'Print'}
                className={
                  'flex flex-row-reverse justify-center items-center bg-black text-white text-lg gap-2 hover:bg-[whitesmoke] hover:text-black'
                }
              />
            </div>
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
              className="bg-white w-full py-1 lg:text-base"
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
        <>
          <div
            className={`w-full flex flex-col items-center gap-5 xl:gap-10 bg-white p-5 ${isShowing ? 'mt-40' : 'mt-10'}`}
            ref={targetRef}
          >
            {showPdfContent && (
              <div className="w-full">
                <div className="w-full flex justify-center items-center py-2 px-3 gap-2 rounded-full">
                  <h1 className="font-bold uppercase hidden md:block">{title + ' for ' + (user?.FullName || '')}</h1>
                  <h1 className="font-bold uppercase md:hidden"> {title}</h1>
                </div>

                <div className="w-full">
                  <h1 className="font-medium text-left">
                    Account Owner: <span className="italic font-bold"> {owner === '0' ? 'Household' : owner}</span>
                  </h1>
                </div>
              </div>
            )}
            <div className="w-full 2xl:w-[90%] flex flex-col items-center justify-center gap-5">
              <div className="flex flex-col xl:flex-row w-full gap-5 xl:gap-10">
                <div className="flex flex-col w-full gap-5">
                  <div className="w-full">
                    <YearlyIncome
                      incomeGridData={incomeGridData}
                      owner={owner}
                      selfContribution={selfContribution}
                      partnerContribution={partnerContribution}
                    />
                  </div>
                  <div className="w-full">
                    <MonthlyIncome
                      incomeGridData={incomeGridData}
                      owner={owner}
                      selfContribution={selfContribution}
                      partnerContribution={partnerContribution}
                    />
                  </div>
                  <div className="w-full">
                    <MonthlySavings
                      savingsGridData={savingsGridData}
                      incomeGridData={incomeGridData}
                      maingoals={maingoals}
                      owner={owner}
                    />
                  </div>
                  <div className="w-full">
                    <MonthlyRetirement
                      retirementGridData={retirementGridData}
                      retirementGridDataAll={retirementGridDataAll}
                      incomeGridData={incomeGridData}
                      maingoals={maingoals}
                      owner={owner}
                    />
                  </div>
                  <div className="w-full">
                    <MonthlyDebt
                      debtGridData={debtGridData}
                      incomeGridData={incomeGridData}
                      debtgoals={debtgoals}
                      maingoals={maingoals}
                      owner={owner}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="w-full">
                    <MonthlyExpenses
                      expenseGridData={expenseGridData}
                      incomeGridData={incomeGridData}
                      expensegoals={expensegoals}
                      maingoals={maingoals}
                      owner={owner}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col xl:flex-row w-full gap-5 mt-5 xl:gap-10">
                <div className="hidden xl:block w-full"></div>
                <div className="flex flex-col w-full">
                  <div className="w-full">
                    <MonthlySummary
                      incomeGridData={incomeGridData}
                      savingsGridData={savingsGridData}
                      retirementGridData={retirementGridData}
                      debtGridData={debtGridData}
                      expenseGridData={expenseGridData}
                      owner={owner}
                      selfContribution={selfContribution}
                      partnerContribution={partnerContribution}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-lg border-t mt-8 p-6 text-center justify-center">
            <p>{getPageCopyright()}</p>
          </div>
        </>
      )}
    </>
  ) : (
    <Package />
  );
};

export default BudgetDetails;
