import Assets from '../../components/networth/Assets';
import Liabilities from '../../components/networth/Liabilities';
import CurrentNetworth from '../../components/networth/CurrentNetworth';
import ExpectedNetworth from '../../components/networth/ExpectedNetworth';
import React, { useEffect, useState } from 'react';
import Package from '../../package/Package';
import Loading from '../../components/Loader';
import { MdFilterAlt, MdFilterAltOff } from 'react-icons/md';
import Button from '../../components/Button';
import {
  getBankAccountNames,
  getBankAccountTransactions,
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
import {
  expenseOwners,
  getOwnerExpenseGridData,
  getOwnerGridData,
  getOwnerTransGridData,
} from '../../utils/budget.filter';
import clsx from 'clsx';
import Select from '../../components/Select';
import generatePDF, { Margin, usePDF } from 'react-to-pdf';
import { PiPrinter } from 'react-icons/pi';
import useUserStore from '../../app/user';
import { SidebarLinks } from '../../utils/sidebar.data';
import { useLocation } from 'react-router-dom';
import { getPageCopyright, getPageTitle } from '../../utils';

export const Networth = () => {
  const { user } = useUserStore();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [incomeGridData, setIncomeGridData] = useState([]);
  const [savingsGridData, setSavingsGridData] = useState([]);
  const [retirementGridData, setRetirementGridData] = useState([]);
  const [expenseGridData, setExpenseGridData] = useState([]);
  const [debtGridData, setDebtGridData] = useState([]);
  const [transactionGridData, setTransactionGridData] = useState([]);
  const [bankGridData, setBankGridData] = useState([]);
  const { toPDF, targetRef } = usePDF({ filename: 'networth.pdf', page: { margin: Margin.MEDIUM } });
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
      isTransactionLoaded === 'success' &&
      isNamesLoaded === 'success' &&
      owner
    ) {
      const savingData = getOwnerGridData(savings, owner);
      setSavingsGridData(savingData);

      const retirementData = getOwnerGridData(retirements, owner);
      setRetirementGridData(retirementData);

      const expenseData = getOwnerExpenseGridData(expenses, owner);
      setExpenseGridData(expenseData);

      const debtData = getOwnerGridData(debts, owner);
      setDebtGridData(debtData);

      const incomeData = getOwnerGridData(incomes, owner);
      setIncomeGridData(incomeData);

      const transData = getOwnerTransGridData(transactions, owner);
      setTransactionGridData(transData);

      const bankData = getOwnerGridData(accountnames, owner);
      setBankGridData(bankData);

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
    isTransactionLoaded,
    isNamesLoaded,
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
        <div className="w-full gap-4 h-10 md:h-12 px-2 rounded-full bg-white flex items-center justify-between">
          <div></div>
          <div>{getPageTitle('NET WORTH', user)}</div>
          <div className="w-fit gap-4 h-10 md:h-12 px-2 rounded-full bg-white flex items-center">
            <div className="text-sm min-w-fit whitespace-nowrap">
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
            <div className="w-full 2xl:w-[80%] flex flex-col items-center justify-center gap-5">
              <div className="flex flex-col w-full">
                <h1 className="w-full bg-[whitesmoke] text-black flex items-center justify-center p-2 rounded-md font-bold border border-gray-300">
                  ASSETS (Market Value of What You Own)
                </h1>
                <div>
                  <Assets
                    savingsGridData={savingsGridData}
                    retirementGridData={retirementGridData}
                    expenseGridData={expenseGridData}
                    transactionGridData={transactionGridData}
                    bankGridData={bankGridData}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full">
                <h1 className="w-full bg-[whitesmoke] text-black flex items-center justify-center p-2 rounded-md font-bold border border-gray-300">
                  LIABILITIES (How Much You Owe)
                </h1>
                <div>
                  <Liabilities expenseGridData={expenseGridData} debtGridData={debtGridData} />
                </div>
              </div>
              <div className="flex flex-col w-full">
                <h1 className="w-full bg-[whitesmoke] text-black flex items-center justify-center p-2 rounded-md font-bold border border-gray-300">
                  NET WORTH (Assets - Liabilities)
                </h1>
                <div>
                  <CurrentNetworth
                    savingsGridData={savingsGridData}
                    retirementGridData={retirementGridData}
                    expenseGridData={expenseGridData}
                    debtGridData={debtGridData}
                    transactionGridData={transactionGridData}
                    bankGridData={bankGridData}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full">
                <h1 className="w-full bg-[whitesmoke] text-black flex items-center justify-center p-2 rounded-md font-bold border border-gray-300">
                  EXPECTED NET WORTH
                </h1>
                <div>
                  <ExpectedNetworth
                    incomeGridData={incomeGridData}
                    savingsGridData={savingsGridData}
                    retirementGridData={retirementGridData}
                    expenseGridData={expenseGridData}
                    debtGridData={debtGridData}
                    transactionGridData={transactionGridData}
                    bankGridData={bankGridData}
                    owner={owner}
                  />
                </div>
              </div>
              <div className="w-full pt-5 text-xs xl:text-sm text-left italic"></div>
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
export default Networth;
