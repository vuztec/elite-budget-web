export const InternationalPrices = {
  Basic: 10,
  Standard: 15,
  Premium: 20,
};

export const ProjectFactors = {
  1: 0,
  2: 4,
  3: 6,
  4: 8,
  5: 10,
  6: 12,
  7: 14,
  8: 16,
  9: 18,
  10: 20,
  11: 22,
  12: 24,
  13: 26,
  14: 28,
  15: 30,
  16: 32,
  17: 34,
  18: 36,
  19: 38,
  20: 40,
  21: 40,
  22: 40,
  23: 40,
  24: 40,
  25: 40,
  26: 40,
  27: 40,
  28: 40,
  29: 40,
  30: 40,
  31: 45,
  32: 45,
  33: 45,
  34: 45,
  35: 45,
  36: 45,
  37: 45,
  38: 45,
  39: 45,
  40: 45,
  41: 50,
  42: 50,
  43: 50,
  44: 50,
  45: 50,
  46: 50,
  47: 50,
  48: 50,
  49: 50,
  50: 50,
  60: 60,
  70: 60,
  80: 60,
  90: 60,
  100: 60,
};

export const TeamFactors = {
  1: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  10: 9,
  11: 10,
  12: 10,
  13: 10,
  14: 10,
  15: 10,
  16: 10,
  17: 10,
  18: 10,
  19: 10,
  20: 10,
  21: 15,
  22: 15,
  23: 15,
  24: 15,
  25: 15,
  26: 15,
  27: 15,
  28: 15,
  29: 15,
  30: 15,
  40: 15,
  50: 20,
  60: 20,
  70: 20,
  80: 20,
  90: 20,
  100: 25,
  200: 30,
};

export const NumberOfProject = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 40, 50, 60, 70, 80, 90, 100,
];

export const NumberOfTeam = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 40, 50, 60, 70, 80, 90, 100, 200,
];

export const Packages = [
  { Feature: "Projects", Basic: 1, Standard: 1, Premium: 1 },
  { Feature: "Tasks", Basic: 25, Standard: 50, Premium: "Unlimited" },
  { Feature: "Costs", Basic: 15, Standard: 30, Premium: "Unlimited" },
  { Feature: "Team Members", Basic: 1, Standard: 1, Premium: 1 },
  { Feature: "Work Allocations", Basic: 0, Standard: 0, Premium: 1 },
  { Feature: "Team Absentees", Basic: 0, Standard: 0, Premium: 1 },
  { Feature: "Team Timesheets", Basic: 0, Standard: 0, Premium: 1 },
  { Feature: "Subtasks", Basic: 0, Standard: 1, Premium: 1 },
  { Feature: "Attachments", Basic: 0, Standard: 1, Premium: 1 },
  { Feature: "Messages", Basic: 0, Standard: 1, Premium: 1 },
  {
    Feature: "Notifications",
    Basic: 1,
    Standard: 1,
    Premium: 1,
  },
  {
    Feature: "Permissions",
    Basic: 1,
    Standard: 1,
    Premium: 1,
  },
  {
    Feature: "File Storage",
    Basic: 10,
    Standard: 25,
    Premium: 100,
  },
];
export const getProjectItems = (item, Package) => {
  let perItem = "";
  if (Package !== "Unlimited") {
    if (
      item === "Tasks" ||
      item === "Risks" ||
      item === "Issues" ||
      item === "Action Items" ||
      item === "Costs" ||
      item === "Change Requests" ||
      item === "Decisions"
    ) {
      perItem = " per project";
    }
    if (item === "Subtasks" || item === "Attachments" || item === "Messages") {
      perItem = " per record";
    }
    if (item === "File Storage") {
      perItem = "GB";
    }
  }
  return perItem;
};

export const getTotalPrice = (projectSize, TeamSize, Package) => {
  let price = 0;
  price =
    Number(TeamSize) *
    (Number(InternationalPrices[Package]) *
      (1 - Number(TeamFactors[TeamSize]) / 100) *
      Number(1 + Number(ProjectFactors[projectSize]) / 100));
  return Number(price.toFixed(2));
};

export const getPackagePrice = (projectSize, TeamSize, Package) => {
  let price = 0;
  price =
    12 *
    Number(TeamSize) *
    (Number(InternationalPrices[Package]) *
      (1 - Number(TeamFactors[TeamSize]) / 100) *
      Number(1 + Number(ProjectFactors[projectSize]) / 100));
  return Number(price.toFixed(2));
};

export const getUnitPrice = (projectSize, TeamSize, Package) => {
  let price = 0;
  price =
    Number(InternationalPrices[Package]) *
    (1 - Number(TeamFactors[TeamSize]) / 100) *
    Number(1 + Number(ProjectFactors[projectSize]) / 100);
  return Number(price.toFixed(2));
};

export const getLimit = (data, dataFilter, Item, Package) => {
  let canAdd = true;
  if (Package === "Premium") {
    canAdd = true;
  } else {
    const taskQty = data?.filter(
      (item) => item?.ProjectID === parseInt(dataFilter)
    ).length;

    const record = Packages.filter((item) => item.Feature === Item);
    const limit = record[0][Package];
    if (taskQty >= limit) {
      canAdd = false;
    } else {
      canAdd = true;
    }
  }
  return canAdd;
};
