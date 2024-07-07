import {
  Costs,
  Projects,
  Tasks,
  Home,
  Login,
  LoginAdmin,
  DateFormat,
  Holidays,
  Package,
  UserCurrency,
  Weekends,
  WeekStart,
  Membership,
  Users,
  Allocation,
  Absentee,
  Timesheet,
  CostDetails,
  TaskDetails,
  ProjectDetails,
  TimesheetDetails,
  UserDetails,
  AbsenteeDetails,
} from "./pages";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import useUserStore from "./app/user";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ForgetPassword from "./pages/forgetpassword";
import VerifyOtp from "./pages/verifyotp";
import UpdatePassword from "./pages/updatepassword";

function Layout() {
  //const user = false;
  const { sidebar, user, setSidebar } = useUserStore();
  const location = useLocation();
  return user ? (
    <div className="w-full h-screen flex">
      <div
        className={`w-full overflow-auto md:w-max h-full md:h-min md:rounded-3xl md:m-2 lg:m-0 lg:rounded-none bg-[rgba(0,0,0,0.3)] md:bg-white top-0 fixed md:static md:block ${
          sidebar ? "" : "hidden"
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
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<ProjectDetails />} />

          <Route path="/tasks" element={<Tasks />} />
          <Route path="/task/:id" element={<TaskDetails />} />

          <Route path="/costs" element={<Costs />} />
          <Route path="/cost/:id" element={<CostDetails />} />

          <Route path="/team" element={<Users />} />
          <Route path="/team/list" element={<Users />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/team/allocations" element={<Allocation />} />
          <Route path="/team/absentee" element={<Absentee />} />
          <Route path="/absentee/:id" element={<AbsenteeDetails />} />
          <Route path="/team/timesheet" element={<Timesheet />} />
          <Route path="/timesheet/:id" element={<TimesheetDetails />} />

          <Route path="/settings" element={<Holidays />} />
          <Route path="/settings/holidays" element={<Holidays />} />
          <Route path="/settings/weekends" element={<Weekends />} />
          <Route path="/settings/weekstart" element={<WeekStart />} />
          <Route path="/settings/dateformat" element={<DateFormat />} />
          <Route path="/settings/currency" element={<UserCurrency />} />
          <Route path="/settings/membership" element={<Membership />} />

          <Route path="/packages" element={<Package />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/login/admin" element={<LoginAdmin />} />
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
