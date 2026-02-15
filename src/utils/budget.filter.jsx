export const incomeOwners = ['Self', 'Partner', 'Joint'];
export const retirementOwners = ['Self', 'Partner'];
export const expenseOwners = ['Self', 'Partner', 'Joint'];
export const paymentMethods = ['Auto Debit', 'Auto Transfer', 'Bill Pay', 'Check or Cash', 'Credit'];
export const daydues = [
  // 'Weekly',
  // 'Biweekly',
  // 'Semi-Monthly',
  // 'Monthly',
  // 'Quarterly',
  // 'Annually',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  'N/A',
];
export const expenseCategories = [
  'Alimony',
  'Charity',
  'Children',
  'Dues/Subscriptions',
  'Entertainment',
  'Food',
  'Health/Medical',
  'Household, Personal Care & Gifts',
  'Housing',
  'Insurance (Other)',
  'Joint Contribution',
  'Parents/Elder Care',
  'Pets/Animals',
  'Recreation',
  'Rental Property',
  'Transportation',
  'Vacations',
];
export const debtCategories = [
  'Credit Card',
  'Department Store',
  'Family/Friend Loan',
  'Medical Debt',
  'Personal Loan',
  'Student Loan',
  'Other Debt',
];

export const DateFormats = [
  { value: 'dd.MM.yyyy', label: 'dd.mm.yyyy' },
  { value: 'dd/MM/yyyy', label: 'dd/mm/yyyy' },
  { value: 'ddd, dd MMM yyyy', label: 'ddd, dd mmm yyyy' },
  { value: 'ddd, dd MMMM yyyy', label: 'ddd, dd mmmm yyyy' },
  { value: 'dddd, dd MMM yyyy', label: 'dddd, dd mmm yyyy' },
  { value: 'dddd, dd MMMM yyyy', label: 'dddd, dd mmmm yyyy' },
  { value: 'dd-MMM-yy', label: 'dd-mmm-yy' },
  { value: 'dd-MMM-yyyy', label: 'dd-mmm-yyyy' },
  { value: 'MM.dd.yyyy', label: 'mm.dd.yyyy' },
  { value: 'MM/dd/yyyy', label: 'mm/dd/yyyy' },
  { value: 'MM-dd-yyyy', label: 'mm-dd-yyyy' },
  { value: 'MMM dd, yyyy', label: 'mmm dd, yyyy' },
  { value: 'yy.MM.dd', label: 'yy.mm.dd' },
  { value: 'yy/MM/dd', label: 'yy/mm/dd' },
  { value: 'yy-MM-dd', label: 'yy-mm-dd' },
  { value: 'yyyy.MM.dd', label: 'yyyy.mm.dd' },
  { value: 'yyyy/MM/dd', label: 'yyyy/mm/dd' },
  { value: 'yyyy-MM-dd', label: 'yyyy-mm-dd' },
];

export const getOwnerGridData = (data, owner) => {
  let ownerFilteredData;
  if (owner !== 'Household' && owner !== 'All' && parseInt(owner) !== 0) {
    ownerFilteredData = data?.filter((item) => item.Owner === owner || item.Owner === null);
  } else {
    ownerFilteredData = data;
  }

  return ownerFilteredData;
};

export const getOwnerTransGridData = (data, owner) => {
  let ownerFilteredData;
  if (owner !== 'Household' && owner !== 'All' && parseInt(owner) !== 0) {
    ownerFilteredData = data?.filter((item) => item.BankAccountName.Owner === owner);
  } else {
    ownerFilteredData = data;
  }

  return ownerFilteredData;
};

export const getOwnerExpenseGridData = (data, owner) => {
  let ownerFilteredData;
  if (owner !== 'Household' && owner !== 'All' && parseInt(owner) !== 0) {
    ownerFilteredData = data?.filter((item) => item.Owner === owner || item.Owner === null);
  } else {
    ownerFilteredData = data.filter((item) => item.Category !== 'Joint Contribution');
  }

  return ownerFilteredData;
};

export const getBankGridData = (data, owner, bank) => {
  const ownerFilteredData = getOwnerTransGridData(data, owner);

  let bankFilteredData;
  if (bank !== 'All' && parseInt(bank) !== 0) {
    bankFilteredData = ownerFilteredData?.filter((item) => item.BankAccountName.id === parseInt(bank));
  } else {
    bankFilteredData = ownerFilteredData;
  }

  return bankFilteredData;
};

export const getCatGridData = (data, owner, catFilter) => {
  const ownerFilteredData = getOwnerExpenseGridData(data, owner);

  let catFilteredData;
  if (catFilter !== 'All' && parseInt(catFilter) !== 0) {
    catFilteredData = ownerFilteredData?.filter((item) => item.Category === catFilter);
  } else {
    catFilteredData = ownerFilteredData;
  }

  return catFilteredData;
};

///************************CHECKLIST*************************** */

export const getCombineData = (savings, expenses, retirement, debts) => {
  const combinedArray = [];
  // Function to add data from a specific category
  const addData = (data, category) => {
    data.forEach((item) => {
      combinedArray.push({
        Category: category,
        BudgetItem: item.Category || '',
        Description: item.Description || '',
        Frequency: item.Frequency || '',
        DueDate: item.DueDate || '',
        MonthlyBudget: item.MonthlyBudget || 0,
        PaymentMethod: item.PaymentMethod || '',
        NickName: item.NickName || '',
      });
    });
  };
  // Add data from each category
  addData(debts, 'DEBT PAYMENTS');
  addData(expenses, 'EXPENSE PAYMENTS');
  addData(retirement, 'RETIREMENT SAVINGS PAYMENTS');
  addData(savings, 'SAVING & INVESTING PAYMENTS');

  return combinedArray;
};

export const getCombineExpenseDebtData = (expenses, debts) => {
  const combinedArray = [];
  // Combine expenses
  expenses.forEach((item) => {
    combinedArray.push({
      Category: item.Category || '',
      Description: item.Description || '',
      DueDate: item.DueDate || '',
      LoanBalance: item.LoanBalance || 0,
      MarketValue: item.MarketValue || 0,
    });
  });
  // Combine debts
  debts.forEach((item) => {
    combinedArray.push({
      Category: item.Category || '',
      Description: item.Description || '',
      DueDate: item.DueDate || '',
      LoanBalance: item.LoanBalance || 0,
      MarketValue: item.MarketValue || 0,
    });
  });

  return combinedArray;
};

export const getUniqueCategories = (combinedData) => {
  const uniqueCategories = new Set();
  combinedData.forEach((item) => {
    uniqueCategories.add(item.Category);
  });
  return Array.from(uniqueCategories);
};

export const getUniqueBudgetItemsByCategory = (combinedData) => {
  const uniqueBudgetItemsByCategory = {};
  combinedData.forEach((item) => {
    const category = item.Category;
    const budgetItem = item.BudgetItem;
    if (!uniqueBudgetItemsByCategory[category]) {
      uniqueBudgetItemsByCategory[category] = new Set();
    }
    uniqueBudgetItemsByCategory[category].add(budgetItem);
  });
  // Convert sets to arrays
  for (const category in uniqueBudgetItemsByCategory) {
    uniqueBudgetItemsByCategory[category] = Array.from(uniqueBudgetItemsByCategory[category]);
  }
  return uniqueBudgetItemsByCategory;
};

export const getUniqueDescriptionsByCategory = (combinedData) => {
  const uniqueDescriptionsByCategory = {};
  combinedData.forEach((item) => {
    const category = item.Category;
    const budgetItem = item.BudgetItem;
    const description = item.Description;
    const frequency = item.Frequency;
    const DueDate = item.DueDate;
    const paymentMethod = item.PaymentMethod;
    const MonthlyBudget = item.MonthlyBudget;
    const NickName = item.NickName;
    const owner = item.Owner;
    if (!uniqueDescriptionsByCategory[category]) {
      uniqueDescriptionsByCategory[category] = {};
    }

    if (!uniqueDescriptionsByCategory[category][budgetItem]) {
      uniqueDescriptionsByCategory[category][budgetItem] = {};
    }
    if (!uniqueDescriptionsByCategory[category][budgetItem][description]) {
      uniqueDescriptionsByCategory[category][budgetItem][description] = {
        DueDate: DueDate,
        PaymentMethod: paymentMethod,
        MonthlyBudget: MonthlyBudget,
        NickName: NickName,
        Owner: owner,
        Frequency: frequency,
      };
    }
  });

  return uniqueDescriptionsByCategory;
};

export const getDescriptionsByCategory = (combinedData) => {
  const descriptionsByCategory = {};
  console.log('combinedData', combinedData);
  combinedData.forEach((item) => {
    const Category = item.Category;
    const BudgetItem = item.BudgetItem;
    const Description = item.Description;
    const Frequency = item.Frequency;
    const DueDate = item.DueDate;
    const PaymentMethod = item.PaymentMethod;
    const MonthlyBudget = item.MonthlyBudget;
    const NickName = item.NickName;
    const Owner = item.Owner;

    if (!descriptionsByCategory[Category]) {
      descriptionsByCategory[Category] = {};
    }

    if (!descriptionsByCategory[Category][BudgetItem]) {
      descriptionsByCategory[Category][BudgetItem] = [];
    }

    // Add the description and associated data to the array
    descriptionsByCategory[Category][BudgetItem].push({
      Description: Description,
      Frequency: Frequency,
      DueDate: DueDate,
      PaymentMethod: PaymentMethod,
      MonthlyBudget: MonthlyBudget,
      NickName: NickName,
      Owner: Owner,
    });
  });

  return descriptionsByCategory;
};

export const generateMonthHeaders = () => {
  const lastTwoDigitsOfYear = getCurrentYear();
  let newMonths = months;
  if (monthsName.length > 1)
    newMonths = monthsName
      .filter((item) => item !== 'Filter Months')
      .sort((a, b) => months.indexOf(a) - months.indexOf(b));
  const monthHeaders = newMonths?.map((month) => `${month}-${lastTwoDigitsOfYear}`);

  return monthHeaders;
};

///**************************BANK BALANCE************** */
export const calculateBalances = (data) => {
  let runningBalance = 0;
  return data.map((record) => {
    const amount = Number(record.Amount) || 0;
    const transactionAmount = record.Type === 'Withdrawal' ? -amount : amount;
    runningBalance += transactionAmount;

    return {
      ...record,
      Balance: runningBalance,
    };
  });
};
