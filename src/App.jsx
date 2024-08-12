import {
  Home,
  Login,
  IncomeRecords,
  ExtraPayDates,
  ExpenseRecords,
  JointContribution,
  OtherDebts,
  Retirement,
  Savings,
  Transactions,
  BankAccounts,
  BudgetDetails,
  Checklist,
  ExtraFundsTracker,
  Networth,
  BudgetGoals,
  Subscription,
} from './pages';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import useUserStore from './app/user';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ForgetPassword from './pages/forgetpassword';
import VerifyOtp from './pages/verifyotp';
import UpdatePassword from './pages/updatepassword';

function Layout() {
  //const user = false;
  const { sidebar, user, setSidebar } = useUserStore();

  const location = useLocation();

  return user ? (
    <div className="w-full h-screen flex">
      <div
        className={`w-full overflow-auto z-20 lg:w-max h-full lg:h-min lg:m-0 lg:rounded-none bg-[rgba(0,0,0,0.3)] lg:bg-white top-0 fixed lg:static lg:block ${
          sidebar ? '' : 'hidden'
        }`}
        onClick={setSidebar}
      >
        <Sidebar />
      </div>
      {/* <MobileSidebar/> */}
      <div className="flex-1 overflow-auto">
        <Navbar />
        <div className="p-4 2xl:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
function App() {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6]">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="//income/income-records" element={<IncomeRecords />} />
          <Route path="/income/extra-pay-dates" element={<ExtraPayDates />} />
          <Route path="/expenses/expense-records" element={<ExpenseRecords />} />
          <Route path="/expenses/joint-contribution" element={<JointContribution />} />
          <Route path="/debts" element={<OtherDebts />} />
          <Route path="/retirement" element={<Retirement />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/bank/bank-transactions" element={<Transactions />} />
          <Route path="/bank/bank-account" element={<BankAccounts />} />
          <Route path="/budget/budget-details" element={<BudgetDetails />} />
          <Route path="/budget/budget-goals" element={<BudgetGoals />} />
          <Route path="/budget/checklist" element={<Checklist />} />
          <Route path="/budget/extra-funds-tracker" element={<ExtraFundsTracker />} />
          <Route path="/net-worth" element={<Networth />} />
          <Route path="/subscription" element={<Subscription />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/updatepassword" element={<UpdatePassword />} />
      </Routes>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
}

export default App;
