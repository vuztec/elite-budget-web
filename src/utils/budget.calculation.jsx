import { format } from 'date-fns';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';

export const getFormattedDate = (user, date) => {
  const formattedDate = date ? format(new Date(date?.split('T')[0] + 'T00:00:00'), user.DateFormat) : '';
  return formattedDate;
};

export const getFormattedDateSubscription = (user, date) => {
  const formattedDate = date ? format(new Date(date), user.DateFormat) : '';
  return formattedDate;
};

export const getFormattedValue = (user, Amount) => {
  const usedCurrency = user?.Currency ? user?.Currency : '$';
  const separator = user?.Separator ? user?.Separator : 'en-us';

  let formattedAmount = '';
  if (Amount !== '' && Amount > 0.0) {
    // Check if the amount is negative
    const isNegative = Number(Amount) < 0;
    const absoluteAmount = Math.abs(Amount);

    // Format the absolute value of the amount
    formattedAmount = new Intl.NumberFormat(separator, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(absoluteAmount);

    // Prepend the currency and minus sign if negative
    formattedAmount = (isNegative ? '-' : '') + usedCurrency + formattedAmount;
  }

  return formattedAmount;
};

export const getFormattedValueTotal = (user, Amount) => {
  const usedCurrency = user?.Currency ? user?.Currency : '$';
  const separator = user?.Separator ? user?.Separator : 'en-us';

  let formattedAmount = '';
  if (Amount !== '') {
    // Check if the amount is negative
    const isNegative = Number(Amount) < 0;
    const absoluteAmount = Math.abs(Amount);

    // Format the absolute value of the amount
    formattedAmount = new Intl.NumberFormat(separator, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(absoluteAmount);

    // Prepend the currency and minus sign if negative
    formattedAmount = (isNegative ? '-' : '') + usedCurrency + formattedAmount;
  }
  return formattedAmount;
};

export const getIncomeAmount = (user, amount, frequency, column) => {
  let Amount = '-';
  if (amount > 0) {
    if (column === 'Yearly') {
      if (frequency === 'Yearly') {
        Amount = amount * 1;
      } else if (frequency === 'Monthly') {
        Amount = amount * 12;
      } else if (frequency === 'Semi-Monthly') {
        Amount = amount * 24;
      } else if (frequency === 'Weekly') {
        Amount = amount * 52;
      } else if (frequency === 'Bi-Weekly') {
        Amount = amount * 26;
      } else {
        Amount = '-';
      }
    }

    if (column === 'Monthly') {
      if (frequency === 'Yearly') {
        Amount = amount / 12;
      } else if (frequency === 'Monthly') {
        Amount = amount * 1;
      } else if (frequency === 'Semi-Monthly') {
        Amount = amount * 2;
      } else if (frequency === 'Weekly') {
        Amount = amount * 4;
      } else if (frequency === 'Bi-Weekly') {
        Amount = amount * 2;
      } else {
        Amount = '-';
      }
    }

    if (column !== 'Yearly' && column !== 'Monthly') {
      if (frequency === 'Semi-Monthly' && column === 'Semi-Monthly') {
        Amount = amount;
      } else if (frequency === 'Weekly' && column === 'Weekly') {
        Amount = amount;
      } else if (frequency === 'Bi-Weekly' && column === 'Bi-Weekly') {
        Amount = amount;
      } else {
        Amount = '-';
      }
    }
  }

  let formattedAmount = '-';
  if (Amount !== '-') {
    formattedAmount = getFormattedValueTotal(user, Amount);
  }

  return formattedAmount;
};

export const getGrossWeeklyTotal = (user, data) => {
  const filteredData = data?.filter((item) => item.Frequency === 'Weekly');
  const Amount = filteredData?.reduce((accumulator, record) => {
    const amount = record?.GrossAmount || 0;
    return accumulator + Number(amount);
  }, 0);
  const formattedAmount = getFormattedValueTotal(user, Amount);
  return formattedAmount;
};

export const getNetWeeklyTotal = (user, data) => {
  const filteredData = data?.filter((item) => item.Frequency === 'Weekly');
  const Amount = filteredData?.reduce((accumulator, record) => {
    const amount = record?.NetAmount || 0;
    return accumulator + Number(amount);
  }, 0);
  const formattedAmount = getFormattedValueTotal(user, Amount);
  return formattedAmount;
};

export const getGrossBiWeeklyTotal = (user, data) => {
  const filteredData = data?.filter((item) => item.Frequency === 'Bi-Weekly');
  const Amount = filteredData?.reduce((accumulator, record) => {
    const amount = record?.GrossAmount || 0;
    return accumulator + Number(amount);
  }, 0);
  const formattedAmount = getFormattedValueTotal(user, Amount);
  return formattedAmount;
};

export const getNetBiWeeklyTotal = (user, data) => {
  const filteredData = data?.filter((item) => item.Frequency === 'Bi-Weekly');
  const Amount = filteredData?.reduce((accumulator, record) => {
    const amount = record?.NetAmount || 0;
    return accumulator + Number(amount);
  }, 0);
  const formattedAmount = getFormattedValueTotal(user, Amount);
  return formattedAmount;
};

export const getGrossSemiMonthlyTotal = (user, data) => {
  const filteredData = data?.filter((item) => item.Frequency === 'Semi-Monthly');
  const Amount = filteredData?.reduce((accumulator, record) => {
    const amount = record?.GrossAmount || 0;
    return accumulator + Number(amount);
  }, 0);
  const formattedAmount = getFormattedValueTotal(user, Amount);
  return formattedAmount;
};

export const getNetSemiMonthlyTotal = (user, data) => {
  const filteredData = data?.filter((item) => item.Frequency === 'Semi-Monthly');
  const Amount = filteredData?.reduce((accumulator, record) => {
    const amount = record?.NetAmount || 0;
    return accumulator + Number(amount);
  }, 0);
  const formattedAmount = getFormattedValueTotal(user, Amount);
  return formattedAmount;
};

export const getGrossMonthlyTotal = (user, data) => {
  const Amount = data?.reduce((accumulator, record) => {
    const income = record?.GrossAmount || 0;
    const payFrequency = record?.Frequency || '';

    let monthlyIncome = 0;

    switch (payFrequency) {
      // case "Yearly":
      //   monthlyIncome = income / 12;
      //   break;
      case 'Monthly':
        monthlyIncome = income;
        break;
      case 'Semi-Monthly':
        monthlyIncome = income * 2;
        break;
      case 'Weekly':
        monthlyIncome = income * 4;
        break;
      case 'Bi-Weekly':
        monthlyIncome = income * 2;
        break;
      default:
        monthlyIncome = 0;
    }

    return accumulator + Number(monthlyIncome);
  }, 0);
  const formattedAmount = getFormattedValueTotal(user, Amount);
  return formattedAmount;
};

export const getNetMonthlyTotal = (user, data) => {
  const Amount = data?.reduce((accumulator, record) => {
    const income = record?.NetAmount || 0;
    const payFrequency = record?.Frequency || '';

    let monthlyIncome = 0;

    switch (payFrequency) {
      // case "Yearly":
      //   monthlyIncome = income / 12;
      //   break;
      case 'Monthly':
        monthlyIncome = income;
        break;
      case 'Semi-Monthly':
        monthlyIncome = income * 2;
        break;
      case 'Weekly':
        monthlyIncome = income * 4;
        break;
      case 'Bi-Weekly':
        monthlyIncome = income * 2;
        break;
      default:
        monthlyIncome = 0;
    }

    return accumulator + Number(monthlyIncome);
  }, 0);
  const formattedAmount = getFormattedValueTotal(user, Amount);
  return formattedAmount;
};

export const getGrossYearlyTotal = (user, data) => {
  const Amount = data?.reduce((accumulator, record) => {
    const income = record?.GrossAmount || 0;
    const payFrequency = record?.Frequency || '';

    let yearlyIncome = 0;

    switch (payFrequency) {
      case 'Yearly':
        yearlyIncome = income;
        break;
      case 'Monthly':
        yearlyIncome = income * 12;
        break;
      case 'Semi-Monthly':
        yearlyIncome = income * 24;
        break;
      case 'Weekly':
        yearlyIncome = income * 52;
        break;
      case 'Bi-Weekly':
        yearlyIncome = income * 26;
        break;
      default:
        yearlyIncome = 0;
    }

    return accumulator + Number(yearlyIncome);
  }, 0);
  const formattedAmount = getFormattedValueTotal(user, Amount);
  return formattedAmount;
};

export const getNetYearlyTotal = (user, data) => {
  const Amount = data?.reduce((accumulator, record) => {
    const income = record?.NetAmount || 0;
    const payFrequency = record?.Frequency || '';

    let yearlyIncome = 0;

    switch (payFrequency) {
      case 'Yearly':
        yearlyIncome = income;
        break;
      case 'Monthly':
        yearlyIncome = income * 12;
        break;
      case 'Semi-Monthly':
        yearlyIncome = income * 24;
        break;
      case 'Weekly':
        yearlyIncome = income * 52;
        break;
      case 'Bi-Weekly':
        yearlyIncome = income * 26;
        break;
      default:
        yearlyIncome = 0;
    }

    return accumulator + Number(yearlyIncome);
  }, 0);
  const formattedAmount = getFormattedValueTotal(user, Amount);
  return formattedAmount;
};

export const getMarketValueTotal = (user, data) => {
  const Amount = data?.reduce((accumulator, record) => {
    const amount = record?.MarketValue || 0;
    return accumulator + Number(amount);
  }, 0);
  const formattedAmount = getFormattedValueTotal(user, Amount);
  return formattedAmount;
};

export const getLoanBalanceTotal = (user, data) => {
  const Amount = data?.reduce((accumulator, record) => {
    const amount = record?.LoanBalance || 0;
    return accumulator + Number(amount);
  }, 0);
  const formattedAmount = getFormattedValueTotal(user, Amount);
  return formattedAmount;
};

export const getMonthlyBudgetTotal = (user, data) => {
  const Amount = data?.reduce((accumulator, record) => {
    const amount = record?.MonthlyBudget || 0;
    return accumulator + Number(amount);
  }, 0);
  const formattedAmount = getFormattedValueTotal(user, Amount);
  return formattedAmount;
};

export const getMonthlyBudgetCategory = (user, data, cat) => {
  const filteredData = data?.filter((item) => item.Category === cat);
  const Amount = filteredData?.reduce((accumulator, record) => {
    const amount = record?.MonthlyBudget || 0;
    return accumulator + Number(amount);
  }, 0);
  const formattedAmount = getFormattedValueTotal(user, Amount);
  return formattedAmount;
};

export const getMonthlyBudgetItem = (user, data, cat, budgetItem) => {
  const filteredData = data?.filter((item) => item.Category === cat && item.BudgetItem === budgetItem);
  const Amount = filteredData?.reduce((accumulator, record) => {
    const amount = record?.MonthlyBudget || 0;
    return accumulator + Number(amount);
  }, 0);
  const formattedAmount = getFormattedValueTotal(user, Amount);
  return formattedAmount;
};

export const getYearlyBudgetTotal = (user, data) => {
  const Amount =
    12 *
    data?.reduce((accumulator, record) => {
      const amount = record?.MonthlyBudget || 0;
      return accumulator + Number(amount);
    }, 0);
  const formattedAmount = getFormattedValueTotal(user, Amount);
  return formattedAmount;
};

///**************EXPENSE SUMMARY*********************** */

export const getSummaryMarketValueTotal = (user, data, cat) => {
  const updatedData = data.filter((item) => item.Category === cat);
  const formattedAmount = getMarketValueTotal(user, updatedData);
  return formattedAmount;
};

export const getSummaryLoanBalanceTotal = (user, data, cat) => {
  const updatedData = data.filter((item) => item.Category === cat);
  const formattedAmount = getLoanBalanceTotal(user, updatedData);
  return formattedAmount;
};

export const getSummaryMonthlyBudgetTotal = (user, data, cat) => {
  const updatedData = data.filter((item) => item.Category === cat);
  const formattedAmount = getMonthlyBudgetTotal(user, updatedData);
  return formattedAmount;
};

export const getSummaryYearlyBudgetTotal = (user, data, cat) => {
  const updatedData = data.filter((item) => item.Category === cat);
  const formattedAmount = getYearlyBudgetTotal(user, updatedData);
  return formattedAmount;
};

export const hasRecords = (data) => {
  let hasRecords = false;
  const updatedData = data.filter(
    (item) =>
      item.MarketValue > 0 ||
      item.LoanBalance > 0 ||
      item.MonthlyBudget > 0 ||
      item.SelfAmount > 0 ||
      item.PartnerAmount > 0 ||
      item.GrossAmount > 0 ||
      item.NetAmount > 0,
  );
  if (updatedData.length > 0) {
    hasRecords = true;
  }
  return hasRecords;
};

export const canDelete = (item) => {
  let canDelete = false;
  if (
    item.MarketValue > 0 ||
    item.LoanBalance > 0 ||
    item.MonthlyBudget > 0 ||
    item.SelfAmount > 0 ||
    item.PartnerAmount > 0 ||
    item.GrossAmount > 0 ||
    item.NetAmount > 0
  ) {
    canDelete = true;
  }
  return canDelete;
};

/////************************BANK ACCOUNT ********************************************************

export const getFormattedValueType = (user, Amount, type, column) => {
  const usedCurrency = user?.Currency ? user?.Currency : '$';
  const separator = user?.Separator ? user?.Separator : 'en-us';
  let formattedAmount = '';

  if (type === column) {
    if (Amount !== '' && Amount > 0.0) {
      // Check if the amount is negative
      const isNegative = Number(Amount) < 0;
      const absoluteAmount = Math.abs(Amount);

      // Format the absolute value of the amount
      formattedAmount = new Intl.NumberFormat(separator, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(absoluteAmount);

      // Prepend the currency and minus sign if negative
      formattedAmount = (isNegative ? '-' : '') + usedCurrency + formattedAmount;
    }
  }

  return formattedAmount;
};

export const getBankAccountTypeTotal = (user, data, column) => {
  const updatedData = data.filter((item) => item.Type === column);
  const Amount = updatedData?.reduce((accumulator, record) => {
    const amount = record?.Amount || 0;
    return accumulator + Number(amount);
  }, 0);
  const formattedAmount = getFormattedValueTotal(user, Amount);
  return formattedAmount;
};

export const networthExpenses = [
  'Mortgage/House Payment',
  'Home Equity Line of Credit',
  'Enter',
  'Car Payment #1',
  'Car Payment #2',
  'Car Payment #3',
  'Motorcycle Payment',
  'Clothes & Shoes',
  'Computer & Accessories (keyboard & mouse, printer, Ink, Paper)',
  'Toys/child gear',
  'Cell/Telephone',
  'Clothing, shoes & purses',
  'Furniture',
  'Hobby expenses',
  'Household Items (kitchenware, appliances, cookware, home décor etc.)',
  'Jewelry',
  'Office Supplies',
  'Boat Payment',
  'Golf Equipment (Gear, balls, etc.)',
  'Jetski Payment',
  'Recreational Vehicle',
  //"Wash/Detailing Service",
  'Mortgage Payment - Rental Property',
  'Enter - Rental Property',
];

export const showFields = (data) => {
  let showFields = false;
  if (
    data?.Category === 'Housing' ||
    data?.Category === 'Transportation' ||
    data?.Category === 'Children' ||
    data?.Category === 'Household, Personal Care & Gifts' ||
    data?.Category === 'Recreation' ||
    data?.Category === 'Rental Property'
  ) {
    showFields = networthExpenses.includes(data?.Description);
  }

  return showFields;
};

export const SavingsDescriptions = [
  '6 mo. Emergency Fund Savings Acct',
  "Add'l Savings Acct #1",
  "Add'l Savings Acct #2",
  "Add'l Savings Acct #3",
  "Add'l Savings Acct #4",
  'Investment Account #1',
  'Investment Account #2',
  'Investment Account #3',
  '529 Plan: Education Investment Account',
];

export const showMarketValue = (data) => {
  let showFields = false;
  showFields = SavingsDescriptions.includes(data?.Description);
  return showFields;
};

//-----------------------------JOINT CONTRIBUTION-----------------------------------//

export const getOwnerGrossMonthlyTotal = (user, data, owner) => {
  const updatedData = data?.filter((data) => data?.Owner === owner);
  const formattedAmount = getGrossMonthlyTotal(user, updatedData);
  return formattedAmount;
};

export const getUnformattedGrossMonthlyTotal = (data) => {
  const Amount = data?.reduce((accumulator, record) => {
    const income = record?.GrossAmount || 0;
    const payFrequency = record?.Frequency || '';

    let monthlyIncome = 0;

    switch (payFrequency) {
      // case "Yearly":
      //   monthlyIncome = income / 12;
      //   break;
      case 'Monthly':
        monthlyIncome = income;
        break;
      case 'Semi-Monthly':
        monthlyIncome = income * 2;
        break;
      case 'Weekly':
        monthlyIncome = income * 4;
        break;
      case 'Bi-Weekly':
        monthlyIncome = income * 2;
        break;
      default:
        monthlyIncome = 0;
    }

    return accumulator + Number(monthlyIncome);
  }, 0);
  return Amount;
};

export const getOwnerGrossMonthlyPercentage = (data, owner) => {
  const updatedData = data?.filter((data) => data.Owner === owner);
  const totalData = data?.filter((data) => data.Owner !== 'Joint');
  const totalGrossMonthly = getUnformattedGrossMonthlyTotal(totalData);
  const ownerGrossMonthly = getUnformattedGrossMonthlyTotal(updatedData);
  let percentage = 0;
  if (owner === 'Self') {
    percentage = totalGrossMonthly ? (ownerGrossMonthly / totalGrossMonthly) * 100 : 0;
  } else if (owner === 'Partner') {
    percentage = totalGrossMonthly ? (ownerGrossMonthly / totalGrossMonthly) * 100 : 100;
  }
  return percentage.toFixed(0);
};

export const getGrossMonthlyTotalOwner = (user, data) => {
  const totalData = data?.filter((data) => data.Owner !== 'Joint');
  const Amount = totalData?.reduce((accumulator, record) => {
    const income = record?.GrossAmount || 0;
    const payFrequency = record?.Frequency || '';

    let monthlyIncome = 0;

    switch (payFrequency) {
      // case "Yearly":
      //   monthlyIncome = income / 12;
      //   break;
      case 'Monthly':
        monthlyIncome = income;
        break;
      case 'Semi-Monthly':
        monthlyIncome = income * 2;
        break;
      case 'Weekly':
        monthlyIncome = income * 4;
        break;
      case 'Bi-Weekly':
        monthlyIncome = income * 2;
        break;
      default:
        monthlyIncome = 0;
    }

    return accumulator + Number(monthlyIncome);
  }, 0);
  const formattedAmount = getFormattedValueTotal(user, Amount);
  return formattedAmount;
};

export const getGrossMonthlyTotalJoint = (data) => {
  const totalData = data?.filter((data) => data.Owner === 'Joint');
  const Amount = totalData?.reduce((accumulator, record) => {
    const income = record?.GrossAmount || 0;
    const payFrequency = record?.Frequency || '';

    let monthlyIncome = 0;

    switch (payFrequency) {
      // case "Yearly":
      //   monthlyIncome = income / 12;
      //   break;
      case 'Monthly':
        monthlyIncome = income;
        break;
      case 'Semi-Monthly':
        monthlyIncome = income * 2;
        break;
      case 'Weekly':
        monthlyIncome = income * 4;
        break;
      case 'Bi-Weekly':
        monthlyIncome = income * 2;
        break;
      default:
        monthlyIncome = 0;
    }

    return accumulator + Number(monthlyIncome);
  }, 0);

  return Amount;
};

export const getUnformattedMonthlyBudgetTotal = (data) => {
  const updatedData = data?.filter((data) => data.Owner === 'Joint');
  const Amount = updatedData?.reduce((accumulator, record) => {
    const amount = record?.MonthlyBudget || 0;
    return accumulator + Number(amount);
  }, 0);
  return Amount;
};

export const getSelfContributionTotal = (user, selfPerc, incomes, totalExpense) => {
  let percentage = selfPerc;

  if (selfPerc === '') {
    percentage = getOwnerGrossMonthlyPercentage(incomes, 'Self');
  }
  const Amount = (Number(totalExpense) * Number(percentage)) / 100;
  const formattedAmount = getFormattedValueTotal(user, Amount);
  return formattedAmount;
};

export const getPartnerContributionTotal = (user, selfPerc, incomes, totalExpense) => {
  let percentage = 100 - Number(selfPerc);

  if (selfPerc === '') {
    percentage = getOwnerGrossMonthlyPercentage(incomes, 'Partner');
  }
  const Amount = (Number(totalExpense) * Number(percentage)) / 100;
  const formattedAmount = getFormattedValueTotal(user, Amount);
  return formattedAmount;
};

export const getSelfContributionPercentage = (selfPerc, incomes) => {
  let percentage = selfPerc;

  if (selfPerc === '') {
    percentage = getOwnerGrossMonthlyPercentage(incomes, 'Self');
  }
  const formattedAmount = Number(percentage);
  return formattedAmount.toFixed(0);
};

export const getPartnerContributionPercentage = (selfPerc, incomes) => {
  let percentage = 100 - Number(selfPerc);
  if (selfPerc === '') {
    percentage = getOwnerGrossMonthlyPercentage(incomes, 'Partner');
  }
  const unFormattedAmount = Number(percentage);
  return unFormattedAmount.toFixed(0);
};

export const getExtraJointExpense = (expense, income) => {
  let amount = Number(expense) - Number(income);
  if (amount < 0) amount = 0;
  return amount;
};

///***************************FINAL BUDGET***************************** */

export const getNegativeFormattedValue = (user, Amount) => {
  const usedCurrency = user?.Currency ? user?.Currency : '$';
  const separator = user?.Separator ? user?.Separator : 'en-us';

  let formattedAmount = '';
  if (Amount !== '') {
    // Check if the amount is negative
    const isNegative = Number(Amount) < 0;
    const absoluteAmount = Math.abs(Amount);

    // Format the absolute value of the amount
    formattedAmount = new Intl.NumberFormat(separator, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(absoluteAmount);

    // Prepend the currency and minus sign if negative
    formattedAmount = (isNegative ? '-' : '') + usedCurrency + formattedAmount;
  }

  return formattedAmount;
};

export const getBudgetGoal = (goals, category) => {
  const goal = goals.find((g) => g.Category === category);
  const perc = goal?.Percentage;
  return Number(perc).toFixed(2);
};

export const getUnformattedGrossYearlyTotal = (data) => {
  const Amount = data?.reduce((accumulator, record) => {
    const income = record?.GrossAmount || 0;
    const payFrequency = record?.Frequency || '';

    let yearlyIncome = 0;

    switch (payFrequency) {
      case 'Yearly':
        yearlyIncome = income;
        break;
      case 'Monthly':
        yearlyIncome = income * 12;
        break;
      case 'Semi-Monthly':
        yearlyIncome = income * 24;
        break;
      case 'Weekly':
        yearlyIncome = income * 52;
        break;
      case 'Bi-Weekly':
        yearlyIncome = income * 26;
        break;
      default:
        yearlyIncome = 0;
    }

    return accumulator + Number(yearlyIncome);
  }, 0);
  return Amount;
};

export const getUnformattedNetYearlyTotal = (data) => {
  const Amount = data?.reduce((accumulator, record) => {
    const income = record?.NetAmount || 0;
    const payFrequency = record?.Frequency || '';

    let yearlyIncome = 0;

    switch (payFrequency) {
      case 'Yearly':
        yearlyIncome = income;
        break;
      case 'Monthly':
        yearlyIncome = income * 12;
        break;
      case 'Semi-Monthly':
        yearlyIncome = income * 24;
        break;
      case 'Weekly':
        yearlyIncome = income * 52;
        break;
      case 'Bi-Weekly':
        yearlyIncome = income * 26;
        break;
      default:
        yearlyIncome = 0;
    }

    return accumulator + Number(yearlyIncome);
  }, 0);
  return Amount;
};

export const getUnformattedNetMonthlyTotal = (data) => {
  const Amount = data?.reduce((accumulator, record) => {
    const income = record?.NetAmount || 0;
    const payFrequency = record?.Frequency || '';

    let monthlyIncome = 0;

    switch (payFrequency) {
      // case "Yearly":
      //   monthlyIncome = income / 12;
      //   break;
      case 'Monthly':
        monthlyIncome = income;
        break;
      case 'Semi-Monthly':
        monthlyIncome = income * 2;
        break;
      case 'Weekly':
        monthlyIncome = income * 4;
        break;
      case 'Bi-Weekly':
        monthlyIncome = income * 2;
        break;
      default:
        monthlyIncome = 0;
    }

    return accumulator + Number(monthlyIncome);
  }, 0);

  return 12 * Number(Amount);
};

export const getUnformattedNetMonthlyExp = (data) => {
  const Amount = data?.reduce((accumulator, record) => {
    const income = record?.NetAmount || 0;
    const payFrequency = record?.Frequency || '';

    let monthlyIncome = 0;

    switch (payFrequency) {
      // case "Yearly":
      //   monthlyIncome = income / 12;
      //   break;
      case 'Monthly':
        monthlyIncome = income;
        break;
      case 'Semi-Monthly':
        monthlyIncome = income * 2;
        break;
      case 'Weekly':
        monthlyIncome = income * 4;
        break;
      case 'Bi-Weekly':
        monthlyIncome = income * 2;
        break;
      default:
        monthlyIncome = 0;
    }

    return accumulator + Number(monthlyIncome);
  }, 0);

  return Number(Amount);
};

export const getUnformattedMonthlyBudgetExp = (data) => {
  const Amount = data?.reduce((accumulator, record) => {
    const amount = record?.MonthlyBudget || 0;
    return accumulator + Number(amount);
  }, 0);
  return Amount;
};

export const getUnformattedYearlyBudgetTotal = (data) => {
  const Amount =
    12 *
    data?.reduce((accumulator, record) => {
      const amount = record?.MonthlyBudget || 0;
      return accumulator + Number(amount);
    }, 0);
  return Amount;
};

export const getUnformattedMonthlyBudget = (data) => {
  const Amount = data?.reduce((accumulator, record) => {
    const amount = record?.MonthlyBudget || 0;
    return accumulator + Number(amount);
  }, 0);
  return Amount;
};

export const getActualGoal = (incomeData, budgetData, category) => {
  const budget = getUnformattedYearlyBudgetTotal(budgetData);
  let income = getUnformattedNetMonthlyTotal(incomeData);
  if (category === 'Retirement') {
    income = 12 * Number(getUnformattedGrossMonthlyTotal(incomeData));
  }
  const perc = income > 0 ? (Number(budget) / Number(income)) * 100 : 0;
  return Number(perc).toFixed(2);
};

export const getActualGoalExp = (incomeData, budgetData, category) => {
  const budget = getUnformattedMonthlyBudgetExp(budgetData);
  let income = getUnformattedNetMonthlyExp(incomeData);
  if (category === 'Retirement') {
    income = Number(getUnformattedGrossMonthlyTotal(incomeData));
  }
  const perc = income > 0 ? (Number(budget) / Number(income)) * 100 : 0;
  return Number(perc).toFixed(2);
};

export const getActualGoalYearly = (incomeData, budgetData, category) => {
  const budget = getUnformattedYearlyBudgetTotal(budgetData);
  let income = getUnformattedNetYearlyTotal(incomeData);
  if (category === 'Retirement') {
    income = Number(getUnformattedGrossYearlyTotal(incomeData));
  }
  const perc = income > 0 ? (Number(budget) / Number(income)) * 100 : 0;
  return Number(perc).toFixed(2);
};

export const getCatActualGoal = (incomeData, budgetData, category) => {
  const filteredData = budgetData.filter((data) => data.Category === category);
  const budget = getUnformattedMonthlyBudgetExp(filteredData);
  const income = getUnformattedNetMonthlyExp(incomeData);

  const perc = income > 0 ? (Number(budget) / Number(income)) * 100 : 0;
  return Number(perc).toFixed(2);
};

export const getIcon = (incomeData, budgetData, category, goals) => {
  const budget = getUnformattedYearlyBudgetTotal(budgetData);
  let income = getUnformattedNetYearlyTotal(incomeData);
  if (category === 'Retirement') {
    income = getUnformattedGrossYearlyTotal(incomeData);
  }
  const actualPerc = (Number(budget) / Number(income)) * 100;
  const goalPerc = getBudgetGoal(goals, category);
  let icon = '';
  if (category === 'Retirement' || category === 'Savings') {
    if (actualPerc >= goalPerc) {
      icon = <FaThumbsUp className="text-green-500 text-xl" />;
    } else {
      icon = <FaThumbsDown className="text-red-500 text-xl" />;
    }
  } else if (category === 'Debts' || category === 'Expenses') {
    if (actualPerc >= goalPerc) {
      icon = <FaThumbsDown className="text-red-500 text-xl" />;
    } else {
      icon = <FaThumbsUp className="text-green-500 text-xl" />;
    }
  }
  return icon;
};

export const getCatIcon = (incomeData, budgetData, category, goals) => {
  const filteredData = budgetData.filter((data) => data.Category === category);
  const budget = getUnformattedYearlyBudgetTotal(filteredData);
  let income = getUnformattedNetYearlyTotal(incomeData);

  const actualPerc = (Number(budget) / Number(income)) * 100;
  const goalPerc = getBudgetGoal(goals, category);
  let icon = '';
  if (actualPerc >= goalPerc && goalPerc > 0) {
    icon = <FaThumbsDown className="text-red-500 text-xl" />;
  } else if (actualPerc < goalPerc && goalPerc > 0) {
    icon = <FaThumbsUp className="text-green-500 text-xl" />;
  }
  return icon;
};

export const getLabel = (incomeData, budgetData, category, goals) => {
  const budget = getUnformattedYearlyBudgetTotal(budgetData);
  let income = getUnformattedNetYearlyTotal(incomeData);
  if (category === 'Retirement') {
    income = getUnformattedGrossYearlyTotal(incomeData);
  }
  const actualPerc = (Number(budget) / Number(income)) * 100;
  const goalPerc = getBudgetGoal(goals, category);
  let label = 'Over/(Under) by';
  if (category === 'Retirement' || category === 'Savings') {
    if (actualPerc >= goalPerc) {
      label = 'Over by';
    } else {
      label = 'Under by';
    }
  } else if (category === 'Debts' || category === 'Expenses') {
    if (actualPerc >= goalPerc) {
      label = 'Over by';
    } else {
      label = 'Under by';
    }
  }
  return label;
};

export const getTotalLabel = (diff) => {
  let label = 'Over/Under Bubget by';
  if (diff < 0) {
    label = 'Over Budget by';
  } else if (diff > 0) {
    label = 'Under Budget by';
  }
  return label;
};

export const getDifference = (incomeData, budgetData, category, goals, user) => {
  const budget = getUnformattedYearlyBudgetTotal(budgetData);
  let income = getUnformattedNetYearlyTotal(incomeData);
  if (category === 'Retirement') {
    income = getUnformattedGrossYearlyTotal(incomeData);
  }
  const actualPerc = income > 0 ? Number(budget) / Number(income) : 0;
  const goalPerc = getBudgetGoal(goals, category) / 100;
  let Amount = 0;
  if (category === 'Retirement' || category === 'Savings') {
    // Amount = (Number(actualPerc) / Number(goalPerc)) * Number(budget);
    Amount = Number(actualPerc) * Number(income) - Number(goalPerc) * Number(income);
  } else if (category === 'Debts' || category === 'Expenses') {
    Amount = Number(goalPerc) * Number(income) - Number(actualPerc) * Number(income);
  }
  const formattedAmount = getNegativeFormattedValue(user, Amount);
  return formattedAmount;
};

// Function to find unique budget items and their sum
export const getUniqueBudgetItemsWithSum = (data) => {
  const uniqueBudgetItems = new Set();
  const budgetItemValue = {};
  data?.forEach((record) => {
    const budgetItem = record?.Category || '';
    const monthlyPayment = record?.MonthlyBudget || 0;
    if (!uniqueBudgetItems.has(budgetItem)) {
      uniqueBudgetItems.add(budgetItem);
      budgetItemValue[budgetItem] = 0;
    }
    budgetItemValue[budgetItem] += Number(monthlyPayment);
  });

  return {
    uniqueBudgetItems: Array.from(uniqueBudgetItems),
    budgetItemValue,
  };
};

// Function to get unique descriptions and their sum values for each unique budget item
export const getUniqueDescriptionsWithSumForEachBudgetItem = (data) => {
  const uniqueDescriptions = {};

  data?.forEach((record) => {
    const budgetItem = record?.Category || '';
    const description = record?.Description || '';
    const nickName = record?.NickName || '';
    const monthlyPayment = record?.MonthlyBudget || 0;

    // Use NickName if it's not blank, otherwise use Description
    const displayName = nickName || description;

    if (!uniqueDescriptions[budgetItem]) {
      uniqueDescriptions[budgetItem] = {};
    }

    if (!uniqueDescriptions[budgetItem][displayName]) {
      uniqueDescriptions[budgetItem][displayName] = 0;
    }

    uniqueDescriptions[budgetItem][displayName] += Number(monthlyPayment);
  });

  return uniqueDescriptions;
};

//****************************NETWORTH****************************/

export const getRealEstateMarketValueTotal = (user, data, cat1, cat2) => {
  const updatedData = data.filter((item) => item.Category === cat1 || item.Category === cat2);
  const formattedAmount = getMarketValueTotal(user, updatedData);
  return formattedAmount;
};

export const getVehicleMarketValueTotal = (user, data, cat1) => {
  const updatedData = data.filter((item) => item.Category === cat1);
  const formattedAmount = getMarketValueTotal(user, updatedData);
  return formattedAmount;
};

export const getHouseHoldMarketValueTotal = (user, data, cat1, cat2) => {
  const updatedData = data.filter((item) => item.Category === cat1 || item.Category === cat2);
  const formattedAmount = getMarketValueTotal(user, updatedData);
  return formattedAmount;
};

export const getOtherAssetMarketValueTotal = (user, data, cat1) => {
  const updatedData = data.filter((item) => item.Category === cat1);
  const formattedAmount = getMarketValueTotal(user, updatedData);
  return formattedAmount;
};

export const getUnformattedMarketValueTotal = (data) => {
  const Amount = data?.reduce((accumulator, record) => {
    const amount = record?.MarketValue || 0;
    return accumulator + Number(amount);
  }, 0);
  return Amount;
};

export const getUnformattedLoanBalanceTotal = (data) => {
  const Amount = data?.reduce((accumulator, record) => {
    const amount = record?.LoanBalance || 0;
    return accumulator + Number(amount);
  }, 0);
  return Amount;
};

export const getUnformattedOpeningBalanceTotal = (data) => {
  const Amount = data?.reduce((accumulator, record) => {
    const amount = record?.OpeningBalance || 0;
    return accumulator + Number(amount);
  }, 0);
  return Amount;
};

export const getUnformattedBankBalanceTotal = (data) => {
  const Amount = data?.reduce((accumulator, record) => {
    const type = record?.Type;
    let amount = record?.Amount || 0;
    if (type === 'Withdrawal') {
      amount = -amount;
    }
    return accumulator + Number(amount);
  }, 0);
  return Amount;
};

export const getCreditCardLoanBalanceTotal = (user, data, cat1, cat2) => {
  const updatedData = data.filter((item) => item.Category === cat1 || item.Category === cat2);
  const formattedAmount = getLoanBalanceTotal(user, updatedData);
  return formattedAmount;
};

export const getRealEstateLoanBalanceTotal = (user, data, cat1, cat2) => {
  const updatedData = data.filter((item) => item.Category === cat1 || item.Category === cat2);
  const formattedAmount = getLoanBalanceTotal(user, updatedData);
  return formattedAmount;
};

export const getVehicleLoanBalanceTotal = (user, data, cat1) => {
  const updatedData = data.filter((item) => item.Category === cat1);
  const formattedAmount = getLoanBalanceTotal(user, updatedData);
  return formattedAmount;
};

export const getMedicalDebtBalanceTotal = (user, data, cat1) => {
  const updatedData = data.filter((item) => item.Category === cat1);
  const formattedAmount = getLoanBalanceTotal(user, updatedData);
  return formattedAmount;
};

export const getLoanOtherLoanBalanceTotal = (user, data, cat1, cat2, cat3) => {
  const updatedData = data.filter((item) => item.Category !== cat1 && item.Category !== cat2 && item.Category !== cat3);
  const formattedAmount = getLoanBalanceTotal(user, updatedData);
  return formattedAmount;
};

export const getRealOtherDebtLoanBalanceTotal = (user, data, cat1, cat2, cat3) => {
  const updatedData = data.filter((item) => item.Category === cat1 || item.Category === cat2 || item.Category === cat3);
  const formattedAmount = getLoanBalanceTotal(user, updatedData);
  return formattedAmount;
};

export const getAge = (user, owner) => {
  const self = Number(user.SelfAge) || 0;
  const partner = Number(user.PartnerAge) || 0;
  let age = Math.max(self, partner);

  if (owner === 'Self') {
    age = self;
  } else if (owner === 'Partner') {
    age = partner;
  }

  return age.toFixed(0);
};

//*************************Joint Contribution*************************/

export const getJointContribution = (data, owner) => {
  const Amount = data.reduce((accumulator, record) => {
    const amount = record?.MonthlyBudget || 0;
    if (record.Category === 'Joint Contribution' && record.Owner === owner) {
      return accumulator + Number(amount);
    }
    return accumulator;
  }, 0);

  return Amount;
};

export const getExtraPayCheckTotal = (user, data, owner) => {
  let Amount = 0;
  if (owner === 'Self') {
    Amount = data?.reduce((accumulator, record) => {
      const amount = record?.SelfAmount || 0;
      return accumulator + Number(amount);
    }, 0);
  } else if (owner === 'Partner') {
    Amount = data?.reduce((accumulator, record) => {
      const amount = record?.PartnerAmount || 0;
      return accumulator + Number(amount);
    }, 0);
  }
  const formattedAmount = getFormattedValueTotal(user, Amount);
  return formattedAmount;
};

export const getGoalTotal = (goals) => {
  const total = goals?.reduce((accumulator, record) => {
    const amount = record?.Percentage || 0;
    return accumulator + Number(amount);
  }, 0);

  return total;
};

export const getCategoryTotal = (type, maingoals) => {
  let total = 100;
  if (type === 'Expense') {
    const updatedData = maingoals?.filter((goal) => goal?.Category === 'Expenses' && goal?.Type === 'Main');
    total = updatedData?.[0]?.Percentage || 0;
  } else if (type === 'Debt') {
    const updatedData = maingoals?.filter((goal) => goal?.Category === 'Debts' && goal?.Type === 'Main');
    total = updatedData?.[0]?.Percentage || 0;
  }

  return Number(total);
};

export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getIsTrial(user) {
  const subscription = user?.SubscribeDate ? new Date(user?.SubscribeDate) : '';
  const trialEnd = new Date(new Date(user?.CreatedAt).setDate(new Date(user?.CreatedAt).getDate() + 14));
  const currentDate = new Date();
  const isTrial = !subscription || currentDate <= trialEnd;
  return isTrial;
}

export function getRenewalDate(user) {
  const today = new Date();
  const subscription = user?.SubscribeDate ? new Date(user?.SubscribeDate) : '';
  const todayYear = today.getFullYear();
  const subscriptionYear = user?.SubscribeDate ? subscription.getFullYear() : '';
  let totalDaysInYears = 0;
  // Calculate total days in subscription years
  for (let year = subscriptionYear; year <= todayYear; year++) {
    totalDaysInYears += isLeapYear(year) ? 366 : 365;
  }
  // Calculate the renewal date
  const renewal = user?.SubscribeDate ? new Date(subscription.getTime() + totalDaysInYears * 24 * 60 * 60 * 1000) : '';
  return renewal;
}
