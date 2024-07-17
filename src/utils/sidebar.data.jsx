import { FiHome } from "react-icons/fi";
import { GrProjects } from "react-icons/gr";
import { MdPeople } from "react-icons/md";

export const SidebarLinks = [
  {
    label: "Home",
    link: "/",
    icon: <FiHome />,
    dropdown: false,
    activename: "home",
  },
  {
    label: "Income",
    activename: "income",
    link: null,
    icon: <GrProjects />,
    dropdown: false,
    sub: [
      { label: "Income Records", link: "/income/income-records" },
      { label: "Extra Pay Dates", link: "/income/extra-pay-dates" },
    ],
  },
  {
    label: "Expenses",
    activename: "expenses",
    link: null,
    icon: <GrProjects />,
    dropdown: false,
    sub: [
      { label: "Expense Records", link: "/expenses/expense-records" },
      { label: "Joint Contribution", link: "/expenses/joint-contribution" },
    ],
  },
  {
    label: "Other Debts",
    activename: "debts",
    link: "/debts",
    icon: <FiHome />,
    dropdown: false,
  },
  {
    label: "Retirement",
    activename: "retirement",
    link: "/retirement",
    icon: <FiHome />,
    dropdown: false,
  },
  {
    label: "Savings",
    activename: "savings",
    link: "/savings",
    icon: <FiHome />,
    dropdown: false,
  },
  {
    label: "Bank Register",
    activename: "bank",
    link: null,
    icon: <MdPeople />,
    dropdown: false,
    sub: [
      { label: "Bank Transactions", link: "/bank/bank-transactions" },
      { label: "Bank Account", link: "/bank/bank-account" },
    ],
  },
  {
    label: "Final Budget",
    activename: "budget",
    link: null,
    icon: <MdPeople />,
    dropdown: false,
    sub: [
      { label: "Budget Details", link: "/budget/budget-details" },
      { label: "Checklist", link: "/budget/checklist" },
      { label: "Extra Funds Tracker", link: "/budget/extra-funds-tracker" },
    ],
  },
  {
    label: "Net Worth",
    activename: "net-worth",
    link: "/net-worth",
    icon: <FiHome />,
    dropdown: false,
  },
  // {
  //   label: "Account",
  //   link: null,
  //   icon: <MdPeople />,
  //   dropdown: false,
  //   sub: [{ label: "Profile", link: "/team" }],
  // },
];
