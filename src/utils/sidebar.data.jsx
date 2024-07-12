import { FiHome } from "react-icons/fi";
import { GrProjects } from "react-icons/gr";
import { MdPeople } from "react-icons/md";

export const SidebarLinks = [
  {
    label: "Home",
    link: "/",
    icon: <FiHome />,
    dropdown: false,
  },
  {
    label: "Income",
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
    link: null,
    icon: <GrProjects />,
    dropdown: false,
    sub: [
      { label: "Expense Records", link: "/expense/expense-records" },
      { label: "Joint Contribution", link: "/expense/joint-contribution" },
    ],
  },
  {
    label: "Other Debts",
    link: "/debts",
    icon: <FiHome />,
    dropdown: false,
  },
  {
    label: "Retirement",
    link: "/retirements",
    icon: <FiHome />,
    dropdown: false,
  },
  {
    label: "Savings",
    link: "/savings",
    icon: <FiHome />,
    dropdown: false,
  },
  {
    label: "Bank Register",
    link: null,
    icon: <MdPeople />,
    dropdown: false,
    sub: [
      { label: "Transactions", link: "/bank/transactions" },
      { label: "Bank Account", link: "/bank/bank-account" },
    ],
  },
  {
    label: "Final Budget",
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
