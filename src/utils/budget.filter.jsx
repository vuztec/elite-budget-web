export const incomeOwners = ["Self", "Partner"];
export const getOwnerGridData = (data, owner) => {
  let ownerFilteredData;
  if (owner !== "Household" && owner !== "All" && parseInt(owner) !== 0) {
    ownerFilteredData = data?.filter((item) => item.Owner === owner);
  } else {
    ownerFilteredData = data;
  }

  // Sort the data by the Owner property
  const sortedData = ownerFilteredData.sort((a, b) => {
    if (a.Owner < b.Owner) return 1;
    if (a.Owner > b.Owner) return -1;
    return 0;
  });

  return sortedData;
};
