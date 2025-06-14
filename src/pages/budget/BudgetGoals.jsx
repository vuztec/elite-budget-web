import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loader';
import { useQuery } from 'react-query';
import { getActiveAccount } from '../../utils/permissions';
import Package from '../../package/Package';
import { getDebtGoals, getExpenseGoals, getMainGoals } from '../../config/api';
import { GoalListView } from '../../components/budget/GoalListView';
import useUserStore from '../../app/user';
import { getPageCopyright, getPageTitle } from '../../utils';
import { getGoalTotal } from '../../utils/budget.calculation';

export const BudgetGoals = () => {
  const { user } = useUserStore();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const activeAccount = getActiveAccount(user);

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

  ///-------------END Filters Data Source --------------------------------///

  useEffect(() => {
    if (isDebtGoalsLoaded === 'success' && isMainGoalsLoaded === 'success' && isExpenseGoalsLoaded === 'success') {
      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
    }
  }, [isDebtGoalsLoaded, isExpenseGoalsLoaded, isMainGoalsLoaded]);

  return activeAccount ? (
    <>
      <div className="hidden md:block">
        <div className="w-full gap-4 h-10 md:h-12 px-2 rounded-full bg-white flex items-center justify-between">
          <div></div>
          <div>{getPageTitle('Budget Goal', user)}</div>
          <div></div>
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
            <GoalListView gridData={maingoals} goal="Main" Max={'100.00'} Total={getGoalTotal(maingoals)} />
          </div>

          <div className="w-full">
            <GoalListView
              gridData={expensegoals}
              goal="Expense"
              maingoals={maingoals}
              Max={maingoals?.find((g) => g?.Category === 'Expenses')?.Percentage}
              Total={getGoalTotal(expensegoals)}
            />
          </div>

          <div className="w-full">
            <GoalListView
              gridData={debtgoals}
              goal="Debt"
              maingoals={maingoals}
              Max={maingoals?.find((g) => g?.Category === 'Debts')?.Percentage}
              Total={getGoalTotal(debtgoals)}
            />
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
