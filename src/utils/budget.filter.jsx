export const incomeOwners = ["Self", "Partner"];
export const expenseOwners = ["Self", "Partner", "Joint"];
export const expenseCategories = [
  "Charity",
  "Children",
  "Dues/Subscriptions",
  "Entertainment",
  "Food",
  "Health/Medical",
  "Household, Personal Care & Gifts",
  "Housing",
  "Other Insurance",
  "Parents/Elder Care",
  "Pets/Animals",
  "Recreation",
  "Rental Property",
  "Transportation",
  "Vacations",
];
export const debtCategories = [
  "Credit Card",
  "Department Store",
  "Family/Friend Loan",
  "Medical Debt",
  "Personal Loan",
  "Student Loan",
  "Other Debt",
];
export const getOwnerGridData = (data, owner) => {
  let ownerFilteredData;
  if (owner !== "Household" && owner !== "All" && parseInt(owner) !== 0) {
    ownerFilteredData = data?.filter((item) => item.Owner === owner);
  } else {
    ownerFilteredData = data;
  }

  return ownerFilteredData;
};

export const getCatGridData = (data, owner, catFilter) => {
  const ownerFilteredData = getOwnerGridData(data, owner);

  let catFilteredData;
  if (catFilter !== "All" && parseInt(catFilter) !== 0) {
    catFilteredData = ownerFilteredData?.filter(
      (item) => item.Category === catFilter
    );
  } else {
    catFilteredData = ownerFilteredData;
  }

  return catFilteredData;
};
