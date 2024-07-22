import { MdAreaChart, MdPayment, MdSavings } from "react-icons/md";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaCashRegister, FaPiggyBank, FaShoppingCart } from "react-icons/fa";
import { IoMdBriefcase } from "react-icons/io";
import { IoHome } from "react-icons/io5";

export const SidebarLinks = [
  {
    label: "Home",
    link: "/",
    icon: <IoHome />,
    dropdown: false,
    activename: "home",
  },
  {
    label: "Income",
    activename: "income",
    link: null,
    icon: <AiFillDollarCircle />,
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
    icon: <FaShoppingCart />,
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
    icon: <MdPayment />,
    dropdown: false,
  },
  {
    label: "Retirement",
    activename: "retirement",
    link: "/retirement",
    icon: <FaPiggyBank />,
    dropdown: false,
  },
  {
    label: "Savings",
    activename: "savings",
    link: "/savings",
    icon: <MdSavings />,
    dropdown: false,
  },
  {
    label: "Bank Register",
    activename: "bank",
    link: null,
    icon: <FaCashRegister />,
    dropdown: false,
    sub: [
      { label: "Bank Accounts", link: "/bank/bank-account" },
      { label: "Bank Transactions", link: "/bank/bank-transactions" },
    ],
  },
  {
    label: "Final Budget",
    activename: "budget",
    link: null,
    icon: <MdAreaChart />,
    dropdown: false,
    sub: [
      { label: "Budget Goals", link: "/budget/budget-goals" },
      { label: "Budget Details", link: "/budget/budget-details" },
      { label: "Checklist", link: "/budget/checklist" },
      { label: "Extra Funds Tracker", link: "/budget/extra-funds-tracker" },
    ],
  },
  {
    label: "Net Worth",
    activename: "net-worth",
    link: "/net-worth",
    icon: <IoMdBriefcase />,
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
