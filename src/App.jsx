import { Projects, Home, Login, Users, ProjectDetails, UserDetails } from "./pages";

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

          <Route path="/team" element={<Users />} />
          <Route path="/team/list" element={<Users />} />
          <Route path="/user/:id" element={<UserDetails />} />
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
