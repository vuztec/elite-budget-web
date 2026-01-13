import { getUnformattedBankBalanceTotal } from './budget.calculation';

const customIncomeList = [
  'Main Job',
  'Side Job',
  'Bonus',
  'Child Support',
  'Alimony',
  'Interest/Dividends',
  'Rental Income',
  'Other',
];

export const defaultIncomeSort = (data) => {
  return data.sort((a, b) => {
    // If both Owners are null, sort by IncomeSource using customIncomeList
    if (a.Owner === null && b.Owner === null) {
      const aIndex = customIncomeList.indexOf(a.IncomeSource);
      const bIndex = customIncomeList.indexOf(b.IncomeSource);
      return aIndex - bIndex;
    }

    // If one Owner is null and the other is not, prioritize the one with a non-null Owner
    if (a.Owner === null) return 1;
    if (b.Owner === null) return -1;

    // If both Owners are present, sort by Owner
    if (a.Owner < b.Owner) return 1;
    if (a.Owner > b.Owner) return -1;

    // If Owner is the same, sort by IncomeSource using customIncomeList
    const aIndex = customIncomeList.indexOf(a.IncomeSource);
    const bIndex = customIncomeList.indexOf(b.IncomeSource);
    return aIndex - bIndex;
  });
};

// export const defaultIncomeSort = (data) => {
//   return data.sort((a, b) => {
//     if (a.Owner === null && b.Owner !== null) return 1;
//     if (b.Owner === null && a.Owner !== null) return -1;

//     // If both Owners are null, treat them as equal
//     if (a.Owner === null && b.Owner === null) return 0;

//     if (a.Owner < b.Owner) return 1;
//     if (a.Owner > b.Owner) return -1;
//     // If Owner is the same, sort by IncomeSource using customList
//     const aIndex = customIncomeList.indexOf(a.IncomeSource);
//     const bIndex = customIncomeList.indexOf(b.IncomeSource);
//     return aIndex - bIndex;
//   });
// };

export const defaultTransactionSort = (data) => {
  return data.sort((a, b) => {
    if (a.Owner === null && b.Owner !== null) return 1;
    if (b.Owner === null && a.Owner !== null) return -1;

    // If both Owners are null, treat them as equal
    if (a.Owner === null && b.Owner === null) return 0;

    if (a.Owner === b.Owner) {
      return a.Description?.localeCompare(b.Description); // Ascending order for Description
    }
    return a.Owner < b.Owner ? 1 : -1; // Descending order for Owner
  });
};

export const defaultBankSort = (data) => {
  return data.sort((a, b) => {
    if (a.Owner === null && b.Owner !== null) return 1;
    if (b.Owner === null && a.Owner !== null) return -1;

    // If both Owners are null, treat them as equal
    if (a.Owner === null && b.Owner === null) return 0;

    if (a.Owner === b.Owner) {
      return a.Name < b.Name ? 1 : -1; // Descending order for Owner
    }
    return a.Owner > b.Owner ? 1 : -1; // Ascending order for Category
  });
};

export const defaultFundSort = (data) => {
  return data.sort((a, b) => {
    if (a.Owner === b.Owner) {
      return a.Description < b.Description ? 1 : -1; // Descending order for Owner
    }
    return a.Owner > b.Owner ? 1 : -1; // Ascending order for Category
  });
};

export const defaultDebSort = (data) => {
  return data.sort((a, b) => {
    // Handle cases where either Owner is null and Description is 'Enter'
    if (a.Owner === null && a.Description === 'Enter' && b.Owner !== null) return 1;
    if (b.Owner === null && b.Description === 'Enter' && a.Owner !== null) return -1;

    // Handle cases where both Owners are null
    if (a.Owner === null && b.Owner === null) {
      // If both have 'Enter' as Description, sort by NickName in ascending order
      if (a.Description === 'Enter' && b.Description === 'Enter') {
        return a.NickName?.localeCompare(b.NickName);
      }

      // Move the one with 'Enter' as Description to the end
      if (a.Description === 'Enter') return 1;
      if (b.Description === 'Enter') return -1;

      // Otherwise, sort by displayName in ascending order
      const aDisplayName = a.NickName || a.Description;
      const bDisplayName = b.NickName || b.Description;
      return aDisplayName?.localeCompare(bDisplayName);
    }

    // Handle cases where one Owner is null
    if (a.Owner === null) return 1;
    if (b.Owner === null) return -1;

    // Sort by Owner in descending order
    if (a.Owner < b.Owner) return 1;
    if (a.Owner > b.Owner) return -1;

    // If Owners are the same, sort by displayName (NickName or Description)
    const aDisplayName = a.NickName || a.Description;
    const bDisplayName = b.NickName || b.Description;
    return aDisplayName?.localeCompare(bDisplayName);
  });
};

export const ascendingSort = (data, sortBy, sortBy2, isNumber, type) => {
  return data.sort((a, b) => {
    let aDisplayName = a[sortBy] || a[sortBy2];
    let bDisplayName = b[sortBy] || b[sortBy2];

    if (isNumber) {
      if (type === 'Widthdraw') {
        aDisplayName = a.Type === 'Withdrawal' ? Number(aDisplayName) : 0;
        bDisplayName = b.Type === 'Withdrawal' ? Number(bDisplayName) : 0;
      } else if (type === 'Credit') {
        aDisplayName = a.Type === 'Credit' ? Number(aDisplayName) : 0;
        bDisplayName = b.Type === 'Credit' ? Number(bDisplayName) : 0;
      } else {
        aDisplayName = Number(aDisplayName);
        bDisplayName = Number(bDisplayName);
      }
    }

    if (typeof a[sortBy] === 'boolean' || typeof b[sortBy] === 'boolean') {
      aDisplayName = a[sortBy];
      bDisplayName = b[sortBy];
    }

    if (aDisplayName < bDisplayName) return -1;
    if (aDisplayName > bDisplayName) return 1;

    return 0;
  });
};

export const ascendingSortCurrentBalance = (data, sortBy, transactions) => {
  return data.sort((a, b) => {
    let aDisplayName =
      Number(a[sortBy]) +
      getUnformattedBankBalanceTotal(transactions?.filter((item) => item?.BankAccountName?.id === a.id));
    let bDisplayName =
      Number(b[sortBy]) +
      getUnformattedBankBalanceTotal(transactions?.filter((item) => item?.BankAccountName?.id === b.id));

    if (aDisplayName < bDisplayName) return -1;
    if (aDisplayName > bDisplayName) return 1;

    return 0;
  });
};

export const descendingSortCurrentBalance = (data, sortBy, transactions) => {
  return data.sort((a, b) => {
    let aDisplayName =
      Number(a[sortBy]) +
      getUnformattedBankBalanceTotal(transactions?.filter((item) => item?.BankAccountName?.id === a.id));
    let bDisplayName =
      Number(b[sortBy]) +
      getUnformattedBankBalanceTotal(transactions?.filter((item) => item?.BankAccountName?.id === b.id));

    if (aDisplayName < bDisplayName) return 1;
    if (aDisplayName > bDisplayName) return -1;
    return 0;
  });
};

export const ascendingSortExtraPayCheck = (data, sortBy, isNumber) => {
  return data.sort((a, b) => {
    let aDisplayName = a[sortBy];
    let bDisplayName = b[sortBy];

    if (isNumber) {
      aDisplayName = Number(aDisplayName);
      bDisplayName = Number(bDisplayName);
    }

    // Handle null dates by moving them to the end first
    const aDate = a.Date ? new Date(a.Date) : null;
    const bDate = b.Date ? new Date(b.Date) : null;

    if (aDate === null && bDate !== null) return 1;
    if (bDate === null && aDate !== null) return -1;
    if (aDate === null && bDate === null) return 0;

    // If both dates are not null, proceed with sorting by displayName
    if (aDisplayName < bDisplayName) return -1;
    if (aDisplayName > bDisplayName) return 1;

    // If displayName is the same, sort by Date
    if (aDate < bDate) return -1;
    if (aDate > bDate) return 1;

    return 0;
  });
};

export const descendingSort = (data, sortBy, sortBy2, isNumber, type) => {
  return data.sort((a, b) => {
    let aDisplayName = a[sortBy] || a[sortBy2];
    let bDisplayName = b[sortBy] || b[sortBy2];

    if (isNumber) {
      if (type === 'Widthdraw') {
        aDisplayName = a.Type === 'Withdrawal' ? Number(aDisplayName) : 0;
        bDisplayName = b.Type === 'Withdrawal' ? Number(bDisplayName) : 0;
      } else if (type === 'Credit') {
        aDisplayName = a.Type === 'Credit' ? Number(aDisplayName) : 0;
        bDisplayName = b.Type === 'Credit' ? Number(bDisplayName) : 0;
      } else {
        aDisplayName = Number(aDisplayName);
        bDisplayName = Number(bDisplayName);
      }
    }

    if (typeof a[sortBy] === 'boolean' || typeof b[sortBy] === 'boolean') {
      aDisplayName = a[sortBy];
      bDisplayName = b[sortBy];
    }

    if (aDisplayName < bDisplayName) return 1;
    if (aDisplayName > bDisplayName) return -1;

    return 0;
  });
};

export const descendingSortExtraPayCheck = (data, sortBy, isNumber) => {
  return data.sort((a, b) => {
    let aDisplayName = a[sortBy];
    let bDisplayName = b[sortBy];

    if (isNumber) {
      aDisplayName = Number(aDisplayName);
      bDisplayName = Number(bDisplayName);
    }

    // First, handle null dates by moving them to the end
    const aDate = a.Date ? new Date(a.Date) : null;
    const bDate = b.Date ? new Date(b.Date) : null;

    if (aDate === null && bDate !== null) return 1;
    if (bDate === null && aDate !== null) return -1;
    if (aDate === null && bDate === null) return 0;

    // Sort by displayName in descending order
    if (aDisplayName < bDisplayName) return 1;
    if (aDisplayName > bDisplayName) return -1;

    // If displayName is the same, sort by Date in descending order
    if (aDate < bDate) return 1;
    if (aDate > bDate) return -1;

    return 0;
  });
};
