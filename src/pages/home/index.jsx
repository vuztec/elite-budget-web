import Navbar from './components/navbar/Navbar.jsx';
import Budget from './components/budget/Budget.jsx';
import ThreeCards from './components/three-cards/ThreeCards.jsx';
import Footer from './components/footer/Footer.jsx';
import Hero from './components/hero/Hero.jsx';
import { IoIosArrowRoundForward } from 'react-icons/io';
import BudgetDetails from '../../assets/image/budget-detail.png';
import BankTransaction from '../../assets/image/bank-transactions.png';
import Checklist from '../../assets/image/checklist.png';
import ExtraFundTracker from '../../assets/image/extra-fund-tracker.png';
import ExtraPayDates from '../../assets/image/extra-pay-dates.png';
import JointContribution from '../../assets/image/joint-contribution.png';
import NetWork from '../../assets/image/net-worth.png';
import HomeImage from '../../assets/image/home.png';

export const Home = () => {
  return (
    <>
      <div className="w-full bg-white">
        <Navbar />
        <Hero />
        <Budget />
        <div id="home" className="flex flex-col lg:flex-row items-center justify-center my-10 gap-8 lg:gap-12 p-8">
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <h1 className="text-[#171717] font-semibold text-[32px] lg:text-[42px]">Budget Summary</h1>
            <p className="text-lg lg:text-2xl font-normal text-[#171717]">
              Retirement planning encompasses all future financial needs, including savings, investments, and
              expectedexpenses. Tracking your retirement goals is essential for effective budgeting, long-term financial
              planning,and ensuring financial security.
            </p>
            <a
              href="/login"
              className="hidden lg:flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-white shadow-md text-black rounded-md"
            >
              Try Elite <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>

          <div className="w-full lg:w-1/2">
            <img src={HomeImage} alt="Budget Details" className="w-full h-auto" />
          </div>
          <div className="w-full lg:hidden justify-center">
            <a
              href="/login"
              className="flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-black shadow-md text-white rounded-md lg:hidden"
            >
              Try Elite <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>
        </div>
        <div
          id="budget-detail"
          className="flex flex-col lg:flex-row-reverse items-center justify-center my-10 gap-8 lg:gap-12 p-8"
        >
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <h1 className="text-[#171717] font-semibold text-[32px] lg:text-[42px]">Budget Details</h1>
            <p className="text-lg lg:text-2xl font-normal text-[#171717]">
              Retirement planning encompasses all future financial needs, including savings, investments, and
              expectedexpenses. Tracking your retirement goals is essential for effective budgeting, long-term financial
              planning,and ensuring financial security.
            </p>
            <a
              href="/login"
              className="hidden lg:flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-white shadow-md text-black rounded-md"
            >
              Try Elite <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>

          <div className="w-full lg:w-1/2">
            <img src={BudgetDetails} alt="Budget Details" className="w-full h-auto" />
          </div>
          <div className="w-full lg:hidden justify-center">
            <a
              href="/login"
              className="flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-black shadow-md text-white rounded-md lg:hidden"
            >
              Try Elite <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>
        </div>
        <div id="checklist" className="flex flex-col lg:flex-row items-center justify-center my-10 gap-8 lg:gap-12 p-8">
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <h1 className="text-[#171717] font-semibold text-[32px] lg:text-[42px]">Checklist</h1>
            <p className="text-lg lg:text-2xl font-normal text-[#171717]">
              Retirement planning encompasses all future financial needs, including savings, investments, and
              expectedexpenses. Tracking your retirement goals is essential for effective budgeting, long-term financial
              planning,and ensuring financial security.
            </p>
            <a
              href="/login"
              className="hidden lg:flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-white shadow-md text-black rounded-md"
            >
              Try Elite <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>

          <div className="w-full lg:w-1/2">
            <img src={Checklist} alt="Budget Details" className="w-full h-auto" />
          </div>
          <div className="w-full lg:hidden justify-center">
            <a
              href="/login"
              className="flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-black shadow-md text-white rounded-md lg:hidden"
            >
              Try Elite <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>
        </div>
        <div
          id="networth"
          className="flex flex-col lg:flex-row-reverse items-center justify-center my-10 gap-8 lg:gap-12 p-8"
        >
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <h1 className="text-[#171717] font-semibold text-[32px] lg:text-[42px]">Networth</h1>
            <p className="text-lg lg:text-2xl font-normal text-[#171717]">
              Retirement planning encompasses all future financial needs, including savings, investments, and
              expectedexpenses. Tracking your retirement goals is essential for effective budgeting, long-term financial
              planning,and ensuring financial security.
            </p>
            <a
              href="/login"
              className="hidden lg:flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-white shadow-md text-black rounded-md"
            >
              Try Elite <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>

          <div className="w-full lg:w-1/2">
            <img src={NetWork} alt="Budget Details" className="w-full h-auto" />
          </div>
          <div className="w-full lg:hidden justify-center">
            <a
              href="/login"
              className="flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-black shadow-md text-white rounded-md lg:hidden"
            >
              Try Elite <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>
        </div>
        <div
          id="extra-pay-dates"
          className="flex flex-col lg:flex-row items-center justify-center my-10 gap-8 lg:gap-12 p-8"
        >
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <h1 className="text-[#171717] font-semibold text-[32px] lg:text-[42px]">Extra Pay Dates</h1>
            <p className="text-lg lg:text-2xl font-normal text-[#171717]">
              Retirement planning encompasses all future financial needs, including savings, investments, and
              expectedexpenses. Tracking your retirement goals is essential for effective budgeting, long-term financial
              planning,and ensuring financial security.
            </p>
            <a
              href="/login"
              className="hidden lg:flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-white shadow-md text-black rounded-md"
            >
              Try Elite <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>

          <div className="w-full lg:w-1/2">
            <img src={ExtraPayDates} alt="Budget Details" className="w-full h-auto" />
          </div>
          <div className="w-full lg:hidden justify-center">
            <a
              href="/login"
              className="flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-black shadow-md text-white rounded-md lg:hidden"
            >
              Try Elite <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>
        </div>
        <div
          id="joint"
          className="flex flex-col lg:flex-row-reverse items-center justify-center my-10 gap-8 lg:gap-12 p-8"
        >
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <h1 className="text-[#171717] font-semibold text-[32px] lg:text-[42px]">Joint Contribution Calculation</h1>
            <p className="text-lg lg:text-2xl font-normal text-[#171717]">
              Retirement planning encompasses all future financial needs, including savings, investments, and
              expectedexpenses. Tracking your retirement goals is essential for effective budgeting, long-term financial
              planning,and ensuring financial security.
            </p>
            <a
              href="/login"
              className="hidden lg:flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-white shadow-md text-black rounded-md"
            >
              Try Elite <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>

          <div className="w-full lg:w-1/2">
            <img src={JointContribution} alt="Budget Details" className="w-full h-auto" />
          </div>
          <div className="w-full lg:hidden justify-center">
            <a
              href="/login"
              className="flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-black shadow-md text-white rounded-md lg:hidden"
            >
              Try Elite <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>
        </div>

        <div
          id="extra-fund-tracker"
          className="flex flex-col lg:flex-row items-center justify-center my-10 gap-8 lg:gap-12 p-8"
        >
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <h1 className="text-[#171717] font-semibold text-[32px] lg:text-[42px]">Extra Fund Tracker</h1>
            <p className="text-lg lg:text-2xl font-normal text-[#171717]">
              Retirement planning encompasses all future financial needs, including savings, investments, and
              expectedexpenses. Tracking your retirement goals is essential for effective budgeting, long-term financial
              planning,and ensuring financial security.
            </p>
            <a
              href="/login"
              className="hidden lg:flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-white shadow-md text-black rounded-md"
            >
              Try Elite <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>

          <div className="w-full lg:w-1/2">
            <img src={ExtraFundTracker} alt="Budget Details" className="w-full h-auto" />
          </div>
          <div className="w-full lg:hidden justify-center">
            <a
              href="/login"
              className="flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-black shadow-md text-white rounded-md lg:hidden"
            >
              Try Elite <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>
        </div>
        <div
          id="bank-tranaction"
          className="flex flex-col lg:flex-row-reverse items-center justify-center my-10 gap-8 lg:gap-12 p-8"
        >
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <h1 className="text-[#171717] font-semibold text-[32px] lg:text-[42px]">Bank Transaction</h1>
            <p className="text-lg lg:text-2xl font-normal text-[#171717]">
              Retirement planning encompasses all future financial needs, including savings, investments, and
              expectedexpenses. Tracking your retirement goals is essential for effective budgeting, long-term financial
              planning,and ensuring financial security.
            </p>
            <a
              href="/login"
              className="hidden lg:flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-white shadow-md text-black rounded-md"
            >
              Try Elite <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>

          <div className="w-full lg:w-1/2">
            <img src={BankTransaction} alt="Budget Details" className="w-full h-auto" />
          </div>
          <div className="w-full lg:hidden justify-center">
            <a
              href="/login"
              className="flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-black shadow-md text-white rounded-md lg:hidden"
            >
              Try Elite <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>
        </div>

        <ThreeCards />
        <Footer />
      </div>
    </>
  );
};
