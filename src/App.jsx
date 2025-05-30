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
  PrivacyPolicy,
  TermsAndConditions,
  OldHome,
  Advert,
  Faqs,
  Signup,
  Users,
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
import { BiArrowToTop } from 'react-icons/bi';
import About from './pages/policy/About';
import OtpPage from './pages/otp';
import Welcome from './pages/welcome/Welcome';
import Denied from './pages/welcome/Denied';
import Resource from './pages/resource/Resource';

function Layout() {
  //const user = false;
  const { sidebar, user, setSidebar } = useUserStore();

  const location = useLocation();

  const scrollToTop = () => {
    const scrollableDiv = document.querySelector('.flex-1.overflow-auto');
    if (scrollableDiv) {
      scrollableDiv.scrollTo({
        top: 0,
        behavior: 'smooth', // Optional for smooth scrolling
      });
    } else {
      // Fallback to window scroll (in case your layout changes)
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

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
        <div className="p-4">
          <Outlet />
          <div className="fixed bottom-4 right-4">
            <button className="text-black font-bold p-4 bg-gray-300 rounded-full shadow-lg" onClick={scrollToTop}>
              <BiArrowToTop className="h-6 w-6" />
            </button>
          </div>
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
          <Route path="/income/income-records" element={<IncomeRecords />} />
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
          <Route path="/subscribers" element={<Users />} />
          <Route path="/training-videos" element={<Resource />} />
        </Route>
        <Route path="/advert" element={<Advert />} />
        <Route path="/old" element={<OldHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/about-elite" element={<About />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/denied" element={<Denied />} />
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
