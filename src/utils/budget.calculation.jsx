import { format } from "date-fns";

export const getFormattedDate = (user, date) => {
  const formattedDate = date ? format(new Date(date), user.DateFormat) : "";
  return formattedDate;
};

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

export const getFormattedValueTotal = (user, Amount) => {
  const usedCurrency = user?.Currency ? user?.Currency : "$";
  const separator = user?.Separator ? user?.Separator : "en-us";

  let formattedAmount = "";
  if (Amount !== "") {
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
  const Amount = filteredData?.reduce((accumulator, record) => {
    const amount = record?.NetAmount || 0;
    return accumulator + Number(amount);
  }, 0);
  const formattedAmount = getFormattedValue(user, Amount);
  return formattedAmount;
};

export const getGrossMonthlyTotal = (user, data) => {
  const Amount = data?.reduce((accumulator, record) => {
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

/////************************BANK ACCOUNT ********************************************************

export const getFormattedValueType = (user, Amount, type, column) => {
  const usedCurrency = user?.Currency ? user?.Currency : "$";
  const separator = user?.Separator ? user?.Separator : "en-us";
  let formattedAmount = "";

  if (type === column) {
    if (Amount !== "" && Amount > 0.0) {
      formattedAmount =
        usedCurrency +
        new Intl.NumberFormat(separator, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(Amount);
    }
  }

  return formattedAmount;
};

export const getBankAccountTypeTotal = (user, data, column) => {
  const updatedData = data.filter((item) => item.Type === column);
  const Amount = updatedData.reduce((accumulator, record) => {
    const amount = record?.Amount || 0;
    return accumulator + Number(amount);
  }, 0);
  const formattedAmount = getFormattedValue(user, Amount);
  return formattedAmount;
};

export const networthExpenses = [
  "Mortgage/House Payment",
  "Home Equity Line of Credit",
  "Enter",
  "Car Payment #1",
  "Car Payment #2",
  "Car Payment #3",
  "Motorcycle Payment",
  "Clothes & Shoes",
  "Computer & Accessories (keyboard & mouse, printer, Ink, Paper)",
  "Toys/child gear",
  "Cell/Telephone",
  "Clothing, shoes & purses",
  "Furniture",
  "Hobby expenses",
  "Household Items (kitchenware, appliances, cookware, home décor etc.)",
  "Jewelry",
  "Office Supplies",
  "Boat Payment",
  "Golf Equipment (Gear, balls, etc.)",
  "Jetski Payment",
  "Recreational Vehicle",
  "Wash/Detailing Service",
  "Mortgage Payment - Rental Property",
  "Enter - Rental Property",
];

export const showFields = (data) => {
  let showFields = false;
  if (
    data?.Category === "Housing" ||
    data?.Category === "Transportation" ||
    data?.Category === "Children" ||
    data?.Category === "Household, Personal Care & Gifts" ||
    data?.Category === "Recreation" ||
    data?.Category === "Rental Property"
  ) {
    showFields = networthExpenses.includes(data?.Description);
  }

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
  return Amount;
};

export const getOwnerGrossMonthlyPercentage = (data, owner) => {
  const updatedData = data?.filter((data) => data.Owner === owner);
  const totalGrossMonthly = getUnformattedGrossMonthlyTotal(data);
  const ownerGrossMonthly = getUnformattedGrossMonthlyTotal(updatedData);
  const percentage = (ownerGrossMonthly / totalGrossMonthly) * 100;
  return percentage.toFixed(0);
};

export const getUnformattedMonthlyBudgetTotal = (data) => {
  const updatedData = data?.filter((data) => data.Owner === "Joint");
  const Amount = updatedData.reduce((accumulator, record) => {
    const amount = record?.MonthlyBudget || 0;
    return accumulator + Number(amount);
  }, 0);
  return Amount;
};

export const getSelfContributionTotal = (
  user,
  selfPerc,
  incomes,
  totalExpense
) => {
  let percentage = selfPerc;

  if (selfPerc === "") {
    percentage = getOwnerGrossMonthlyPercentage(incomes, "Self");
  }
  const Amount = (Number(totalExpense) * Number(percentage)) / 100;
  const formattedAmount = getFormattedValueTotal(user, Amount);
  return formattedAmount;
};

export const getPartnerContributionTotal = (
  user,
  selfPerc,
  incomes,
  totalExpense
) => {
  let percentage = selfPerc;

  if (selfPerc === "") {
    percentage = getOwnerGrossMonthlyPercentage(incomes, "Self");
  }
  const Amount = (Number(totalExpense) * (100 - Number(percentage))) / 100;
  const formattedAmount = getFormattedValueTotal(user, Amount);
  return formattedAmount;
};

export const getSelfContributionPercentage = (selfPerc, incomes) => {
  let percentage = selfPerc;

  if (selfPerc === "") {
    percentage = getOwnerGrossMonthlyPercentage(incomes, "Self");
  }
  const formattedAmount = Number(percentage);
  return formattedAmount.toFixed(0);
};

export const getPartnerContributionPercentage = (selfPerc, incomes) => {
  let percentage = selfPerc;

  if (selfPerc === "") {
    percentage = getOwnerGrossMonthlyPercentage(incomes, "Self");
  }
  const formattedAmount = 100 - Number(percentage);
  return formattedAmount.toFixed(0);
};
