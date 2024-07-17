export const getFormattedValue = (user, Amount) => {
  const usedCurrency = user?.Currency ? user?.Currency : "$";
  const separator = user?.Separator ? user?.Separator : "en-us";

  let formattedAmount = "";
  if (Amount !== "" && Amount > 0.0) {
    formattedAmount =
      usedCurrency +
      new Intl.NumberFormat(separator, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(Amount);
  }

  return formattedAmount;
};

export const getIncomeAmount = (user, amount, frequency, column) => {
  let Amount = "-";
  if (amount > 0) {
    if (column === "Yearly") {
      if (frequency === "Yearly") {
        Amount = amount * 1;
      } else if (frequency === "Monthly") {
        Amount = amount * 12;
      } else if (frequency === "Semi-Monthly") {
        Amount = amount * 24;
      } else if (frequency === "Weekly") {
        Amount = amount * 52;
      } else if (frequency === "Bi-Weekly") {
        Amount = amount * 26;
      } else {
        Amount = "-";
      }
    }

    if (column === "Monthly") {
      if (frequency === "Yearly") {
        Amount = amount / 12;
      } else if (frequency === "Monthly") {
        Amount = amount * 1;
      } else if (frequency === "Semi-Monthly") {
        Amount = amount * 2;
      } else if (frequency === "Weekly") {
        Amount = amount * 4;
      } else if (frequency === "Bi-Weekly") {
        Amount = amount * 2;
      } else {
        Amount = "-";
      }
    }

    if (column !== "Yearly" && column !== "Monthly") {
      if (frequency === "Semi-Monthly" && column === "Semi-Monthly") {
        Amount = amount;
      } else if (frequency === "Weekly" && column === "Weekly") {
        Amount = amount;
      } else if (frequency === "Bi-Weekly" && column === "Bi-Weekly") {
        Amount = amount;
      } else {
        Amount = "-";
      }
    }
  }

  let formattedAmount = "-";
  if (Amount !== "-") {
    formattedAmount = getFormattedValue(user, Amount);
  }

  return formattedAmount;
};

export const getGrossWeeklyTotal = (user, data) => {
  const filteredData = data?.filter((item) => item.Frequency === "Weekly");
  const Amount = filteredData.reduce((accumulator, record) => {
    const amount = record?.GrossAmount || 0;
    return accumulator + Number(amount);
  }, 0);
  const formattedAmount = getFormattedValue(user, Amount);
  return formattedAmount;
};

export const getNetWeeklyTotal = (user, data) => {
  const filteredData = data?.filter((item) => item.Frequency === "Weekly");
  const Amount = filteredData.reduce((accumulator, record) => {
    const amount = record?.NetAmount || 0;
    return accumulator + Number(amount);
  }, 0);
  const formattedAmount = getFormattedValue(user, Amount);
  return formattedAmount;
};

export const getGrossBiWeeklyTotal = (user, data) => {
  const filteredData = data?.filter((item) => item.Frequency === "Bi-Weekly");
  const Amount = filteredData.reduce((accumulator, record) => {
    const amount = record?.GrossAmount || 0;
    return accumulator + Number(amount);
  }, 0);
  const formattedAmount = getFormattedValue(user, Amount);
  return formattedAmount;
};

export const getNetBiWeeklyTotal = (user, data) => {
  const filteredData = data?.filter((item) => item.Frequency === "Bi-Weekly");
  const Amount = filteredData.reduce((accumulator, record) => {
    const amount = record?.NetAmount || 0;
    return accumulator + Number(amount);
  }, 0);
  const formattedAmount = getFormattedValue(user, Amount);
  return formattedAmount;
};

export const getGrossSemiMonthlyTotal = (user, data) => {
  const filteredData = data?.filter(
    (item) => item.Frequency === "Semi-Monthly"
  );
  const Amount = filteredData.reduce((accumulator, record) => {
    const amount = record?.GrossAmount || 0;
    return accumulator + Number(amount);
  }, 0);
  const formattedAmount = getFormattedValue(user, Amount);
  return formattedAmount;
};

export const getNetSemiMonthlyTotal = (user, data) => {
  const filteredData = data?.filter(
    (item) => item.Frequency === "Semi-Monthly"
  );
  const Amount = filteredData.reduce((accumulator, record) => {
    const amount = record?.NetAmount || 0;
    return accumulator + Number(amount);
  }, 0);
  const formattedAmount = getFormattedValue(user, Amount);
  return formattedAmount;
};

export const getGrossMonthlyTotal = (user, data) => {
  const Amount = data.reduce((accumulator, record) => {
    const income = record?.GrossAmount || 0;
    const payFrequency = record?.Frequency || "";

    let monthlyIncome = 0;

    switch (payFrequency) {
      case "Yearly":
        monthlyIncome = income / 12;
        break;
      case "Monthly":
        monthlyIncome = income;
        break;
      case "Semi-Monthly":
        monthlyIncome = income * 2;
        break;
      case "Weekly":
        monthlyIncome = income * 4;
        break;
      case "Bi-Weekly":
        monthlyIncome = income * 2;
        break;
      default:
        monthlyIncome = 0;
    }

    return accumulator + Number(monthlyIncome);
  }, 0);
  const formattedAmount = getFormattedValue(user, Amount);
  return formattedAmount;
};

export const getNetMonthlyTotal = (user, data) => {
  const Amount = data.reduce((accumulator, record) => {
    const income = record?.NetAmount || 0;
    const payFrequency = record?.Frequency || "";

    let monthlyIncome = 0;

    switch (payFrequency) {
      case "Yearly":
        monthlyIncome = income / 12;
        break;
      case "Monthly":
        monthlyIncome = income;
        break;
      case "Semi-Monthly":
        monthlyIncome = income * 2;
        break;
      case "Weekly":
        monthlyIncome = income * 4;
        break;
      case "Bi-Weekly":
        monthlyIncome = income * 2;
        break;
      default:
        monthlyIncome = 0;
    }

    return accumulator + Number(monthlyIncome);
  }, 0);
  const formattedAmount = getFormattedValue(user, Amount);
  return formattedAmount;
};

export const getGrossYearlyTotal = (user, data) => {
  const Amount = data.reduce((accumulator, record) => {
    const income = record?.GrossAmount || 0;
    const payFrequency = record?.Frequency || "";

    let yearlyIncome = 0;

    switch (payFrequency) {
      case "Yearly":
        yearlyIncome = income;
        break;
      case "Monthly":
        yearlyIncome = income * 12;
        break;
      case "Semi-Monthly":
        yearlyIncome = income * 24;
        break;
      case "Weekly":
        yearlyIncome = income * 52;
        break;
      case "Bi-Weekly":
        yearlyIncome = income * 26;
        break;
      default:
        yearlyIncome = 0;
    }

    return accumulator + Number(yearlyIncome);
  }, 0);
  const formattedAmount = getFormattedValue(user, Amount);
  return formattedAmount;
};

export const getNetYearlyTotal = (user, data) => {
  const Amount = data.reduce((accumulator, record) => {
    const income = record?.NetAmount || 0;
    const payFrequency = record?.Frequency || "";

    let yearlyIncome = 0;

    switch (payFrequency) {
      case "Yearly":
        yearlyIncome = income;
        break;
      case "Monthly":
        yearlyIncome = income * 12;
        break;
      case "Semi-Monthly":
        yearlyIncome = income * 24;
        break;
      case "Weekly":
        yearlyIncome = income * 52;
        break;
      case "Bi-Weekly":
        yearlyIncome = income * 26;
        break;
      default:
        yearlyIncome = 0;
    }

    return accumulator + Number(yearlyIncome);
  }, 0);
  const formattedAmount = getFormattedValue(user, Amount);
  return formattedAmount;
};

export const getMarketValueTotal = (user, data) => {
  const Amount = data.reduce((accumulator, record) => {
    const amount = record?.MarketValue || 0;
    return accumulator + Number(amount);
  }, 0);
  const formattedAmount = getFormattedValue(user, Amount);
  return formattedAmount;
};

export const getLoanBalanceTotal = (user, data) => {
  const Amount = data.reduce((accumulator, record) => {
    const amount = record?.LoanBalance || 0;
    return accumulator + Number(amount);
  }, 0);
  const formattedAmount = getFormattedValue(user, Amount);
  return formattedAmount;
};

export const getMonthlyBudgetTotal = (user, data) => {
  const Amount = data.reduce((accumulator, record) => {
    const amount = record?.MonthlyBudget || 0;
    return accumulator + Number(amount);
  }, 0);
  const formattedAmount = getFormattedValue(user, Amount);
  return formattedAmount;
};

export const getYearlyBudgetTotal = (user, data) => {
  const Amount =
    12 *
    data.reduce((accumulator, record) => {
      const amount = record?.MonthlyBudget || 0;
      return accumulator + Number(amount);
    }, 0);
  const formattedAmount = getFormattedValue(user, Amount);
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
      item.GrossAmount > 0
  );
  if (updatedData.length > 0) {
    hasRecords = true;
  }
  return hasRecords;
};
