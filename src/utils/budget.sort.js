const customIncomeList = ["Main Job", "Side Job", "Interest/Dividends", "Child Support", "Bonus", "Rental Income", "Other"];

export const defaultIncomeSort = (data) => {
  return data.sort((a, b) => {
    if (a.Owner < b.Owner) return 1;
    if (a.Owner > b.Owner) return -1;
    // If Owner is the same, sort by IncomeSource using customList
    const aIndex = customIncomeList.indexOf(a.IncomeSource);
    const bIndex = customIncomeList.indexOf(b.IncomeSource);
    return aIndex - bIndex;
  });
};

export const defaultTransactionSort = (data) => {
  return data.sort((a, b) => {
    if (a.Owner === b.Owner) {
      return a.Description.localeCompare(b.Description); // Ascending order for Description
    }
    return a.Owner < b.Owner ? 1 : -1; // Descending order for Owner
  });
};

export const defaultBankSort = (data) => {
  return data.sort((a, b) => {
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
    // Determine the display names for both records
    const aDisplayName = a.NickName || a.Description;
    const bDisplayName = b.NickName || b.Description;

    // Sort by Owner in descending order
    if (a.Owner === b.Owner) {
      // If Owners are equal, sort by display name (NickName or Description) in ascending order
      return aDisplayName.localeCompare(bDisplayName);
    }
    return a.Owner < b.Owner ? 1 : -1;
  });
};

export const ascendingSort = (data, sortBy, sortBy2, isNumber) => {
  return data.sort((a, b) => {
    let aDisplayName = a[sortBy] || a[sortBy2];
    let bDisplayName = b[sortBy] || b[sortBy2];

    if (isNumber) {
      aDisplayName = Number(aDisplayName);
      bDisplayName = Number(bDisplayName);
    }

    if (typeof a[sortBy] === "boolean" || typeof b[sortBy] === "boolean") {
      aDisplayName = a[sortBy];
      bDisplayName = b[sortBy];
    }

    if (aDisplayName < bDisplayName) return -1;
    if (aDisplayName > bDisplayName) return 1;

    return 0;
  });
};

export const descendingSort = (data, sortBy, sortBy2, isNumber) => {
  return data.sort((a, b) => {
    let aDisplayName = a[sortBy] || a[sortBy2];
    let bDisplayName = b[sortBy] || b[sortBy2];

    if (isNumber) {
      aDisplayName = Number(aDisplayName);
      bDisplayName = Number(bDisplayName);
    }

    if (typeof a[sortBy] === "boolean" || typeof b[sortBy] === "boolean") {
      aDisplayName = a[sortBy];
      bDisplayName = b[sortBy];
    }

    if (aDisplayName < bDisplayName) return 1;
    if (aDisplayName > bDisplayName) return -1;

    return 0;
  });
};
