import React, { useEffect, useState } from 'react';
import Package from '../../package/Package';
import Loading from '../../components/Loader';
import { MdFilterAlt, MdFilterAltOff } from 'react-icons/md';
import Button from '../../components/Button';
import { getDebts, getExpenses, getRetirements, getSavings } from '../../config/api';
import { useQuery } from 'react-query';
import { getActiveAccount } from '../../utils/permissions';
import {
  expenseOwners,
  getCombineData,
  getDescriptionsByCategory,
  getOwnerExpenseGridData,
  getOwnerGridData,
  getUniqueBudgetItemsByCategory,
  getUniqueCategories,
} from '../../utils/budget.filter';
import clsx from 'clsx';
import Select from '../../components/Select';
import { useMemo } from 'react';
import useUserStore from '../../app/user';
import { CheckListView } from '../../components/checklist/CheckListView';
import MultiSelectDropdown from '../../components/MultiSelect';
import { PiPrinter } from 'react-icons/pi';
import { useLocation } from 'react-router-dom';
import { SidebarLinks } from '../../utils/sidebar.data';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CheckListPDF } from '../../components/checklist/CheckListPDF';
import { getPageCopyright, getPageTitle } from '../../utils';

export const Checklist = () => {
  const { user } = useUserStore();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [combinedData, setCombinedData] = useState([]);
  const [monthsName, setMonthsName] = useState([]);
  const activeAccount = getActiveAccount(user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filters
  const [owner, setOwner] = useState('Household');
  const uniqueCategories = getUniqueCategories(combinedData);
  const uniqueBudgetItemsByCategory = getUniqueBudgetItemsByCategory(combinedData);
  const uniqueDescriptionsByCategory = getDescriptionsByCategory(combinedData);
  const [title, setTitle] = useState('');
  const location = useLocation();

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
      owner
    ) {
      const savingData = getOwnerGridData(savings, owner);
      const updatedRetirements = retirements.filter(
        (retirement) =>
          retirement.Description !== 'Retirement (401k, Roth 401k, 403b) Payroll Deductions' &&
          retirement.Description !== 'Retirement (401k, Roth 401k, 403b) Prior Job',
      );
      const retirementData = getOwnerGridData(updatedRetirements, owner);
      const expenseData = getOwnerExpenseGridData(expenses, owner);
      const debtData = getOwnerGridData(debts, owner);
      const combinedData = getCombineData(savingData, expenseData, retirementData, debtData);
      const filteredData = combinedData.filter((data) => data.MonthlyBudget > 0);
      const sortedData = filteredData.sort((a, b) => {
        // First sort by Category
        if (a.Category < b.Category) return -1;
        if (a.Category > b.Category) return 1;

        // If Categories are equal, sort by BudgetItem
        if (a.BudgetItem < b.BudgetItem) return -1;
        if (a.BudgetItem > b.BudgetItem) return 1;

        // If BudgetItems are equal, sort by DueDate
        if (a.DueDate < b.DueDate) return -1;
        if (a.DueDate > b.DueDate) return 1;

        // If DueDate are equal, sort by Description
        if (a.Description < b.Description) return -1;
        if (a.Description > b.Description) return 1;

        return 0;
      });

      setCombinedData(sortedData);
      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
    }
  }, [savings, retirements, debts, expenses, isSavingLoaded, isExpenseLoaded, isDebtLoaded, isRetLoaded, owner]);

  const handleOwnerChange = (e) => {
    if (e && e.target?.value) {
      setOwner(e.target?.value);
    }
  };

  const getCurrentYear = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    return currentYear?.toString().slice(-2);
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const generateMonthHeaders = () => {
    const lastTwoDigitsOfYear = getCurrentYear();
    let newMonths = months;
    if (monthsName.length) newMonths = monthsName.sort((a, b) => months.indexOf(a) - months.indexOf(b));
    const monthHeaders = newMonths?.map((month) => `${month}-${lastTwoDigitsOfYear}`);

    return monthHeaders;
  };

  const monthHeaders = useMemo(() => generateMonthHeaders(), [monthsName, generateMonthHeaders]);

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

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return activeAccount ? (
    <>
      <div
        className="fixed bg-white w-[calc(100vw-40px)] lg:w-[calc(100vw-270px)] -mt-4 rounded px-4 z-9"
        onClick={() => setIsDropdownOpen(false)}
      >
        <div className="w-full flex item-center justify-end pr-6">
          <div className="w-full gap-4 h-10 md:h-12 px-0 md:px-2 rounded-full bg-white flex items-center justify-between">
            <div className="w-[330px] hidden lg:block"></div>
            <div className="hidden md:block">{getPageTitle('Budget Checklist', user)}</div>
            <div className="flex w-[330px] items-center gap-2">
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

              <PDFDownloadLink
                document={
                  <CheckListPDF
                    uniqueCategories={uniqueCategories}
                    uniqueBudgetItemsByCategory={uniqueBudgetItemsByCategory}
                    uniqueDescriptionsByCategory={uniqueDescriptionsByCategory}
                    monthHeaders={monthHeaders}
                    combinedData={combinedData}
                    user={user}
                    title={title}
                    owner={owner}
                  />
                }
                fileName="checklist.pdf"
              >
                {({ blob, url, loading, error }) => (
                  <Button
                    icon={<PiPrinter />} // You can use a different icon or text if preferred
                    label={loading ? 'Loading document...' : 'Print'}
                    className={`flex justify-center items-center text-lg gap-2 ${
                      loading ? 'bg-gray-400 text-white' : 'bg-black text-white hover:bg-[whitesmoke] hover:text-black'
                    }`}
                  />
                )}
              </PDFDownloadLink>
              <div className="text-sm min-w-fit whitespace-nowrap">
                <MultiSelectDropdown
                  options={months}
                  placeholder={'Filter Months'}
                  value={monthsName}
                  setValue={setMonthsName}
                  toggleDropdown={toggleDropdown}
                  isDropdownOpen={isDropdownOpen}
                />
              </div>
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
        <div className={`w-full ${isShowing ? 'mt-40' : 'mt-10'}`} onClick={() => setIsDropdownOpen(false)}>
          <CheckListView
            uniqueCategories={uniqueCategories}
            uniqueBudgetItemsByCategory={uniqueBudgetItemsByCategory}
            uniqueDescriptionsByCategory={uniqueDescriptionsByCategory}
            monthHeaders={monthHeaders}
            combinedData={combinedData}
          />
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

export default Checklist;
