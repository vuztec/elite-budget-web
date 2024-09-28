import { MdAreaChart, MdPayment, MdSavings } from 'react-icons/md';
import { AiFillDollarCircle } from 'react-icons/ai';
import { FaCashRegister, FaPiggyBank, FaShoppingCart } from 'react-icons/fa';
import { IoMdBriefcase } from 'react-icons/io';
import { IoHome } from 'react-icons/io5';
import { CiMoneyBill } from 'react-icons/ci';

export const SidebarLinks = [
  {
    label: 'Home',
    link: '/',
    title: 'Budget Summary',
    icon: <IoHome />,
    dropdown: false,
    activename: 'home',
  },
  {
    label: 'Income',
    activename: 'income',
    link: null,
    icon: <AiFillDollarCircle />,
    dropdown: false,
    sub: [
      {
        label: 'Income Records',
        title: 'Income Sources',
        link: '/income/income-records',
      },
      {
        label: 'Extra Pay Dates',
        title: 'Extra Pay Dates',
        link: '/income/extra-pay-dates',
      },
    ],
  },
  {
    label: 'Expenses',
    activename: 'expenses',
    link: null,
    icon: <FaShoppingCart />,
    dropdown: false,
    sub: [
      {
        label: 'Expense Records',
        title: 'Expenses',
        link: '/expenses/expense-records',
      },
      {
        label: 'Joint Contribution',
        title: 'Joint Contributions',
        link: '/expenses/joint-contribution',
      },
    ],
  },
  {
    label: 'Other Debts',
    title: 'Other Debts',
    activename: 'debts',
    link: '/debts',
    icon: <MdPayment />,
    dropdown: false,
  },
  {
    label: 'Retirement',
    title: 'Retirement Savings',
    activename: 'retirement',
    link: '/retirement',
    icon: <FaPiggyBank />,
    dropdown: false,
  },
  {
    label: 'Savings',
    title: 'Normal Savings',
    activename: 'savings',
    link: '/savings',
    icon: <MdSavings />,
    dropdown: false,
  },
  {
    label: 'Bank Register',
    activename: 'bank',
    link: null,
    icon: <FaCashRegister />,
    dropdown: false,
    sub: [
      {
        label: 'Bank Accounts',
        title: 'Bank Accounts',
        link: '/bank/bank-account',
      },
      {
        label: 'Bank Transactions',
        title: 'Bank Register(s)',
        link: '/bank/bank-transactions',
      },
    ],
  },
  {
    label: 'Final Budget',
    activename: 'budget',
    link: null,
    icon: <MdAreaChart />,
    dropdown: false,
    sub: [
      {
        label: 'Budget Goals',
        title: 'Budget Goals',
        link: '/budget/budget-goals',
      },
      {
        label: 'Budget Details',
        title: 'Budget Details',
        link: '/budget/budget-details',
      },
      {
        label: 'Checklist',
        title: 'Budget Checklist',
        link: '/budget/checklist',
      },
      {
        label: 'Extra Funds Tracker',
        title: 'Extra Funds Tracker',
        link: '/budget/extra-funds-tracker',
      },
    ],
  },
  {
    label: 'Net Worth',
    title: 'Net Worth',
    activename: 'net-worth',
    link: '/net-worth',
    icon: <IoMdBriefcase />,
    dropdown: false,
  },
  {
    label: 'Subscription',
    title: 'Subscription',
    activename: 'subscription',
    link: '/subscription',
    icon: <CiMoneyBill />,
    dropdown: false,
  },
];
