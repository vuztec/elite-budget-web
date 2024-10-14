import { IoIosArrowRoundForward } from 'react-icons/io';
import BudgetDetails from '../../assets/image/budget-detail.png';
import BankTransaction from '../../assets/image/bank-transactions.png';
import Checklist from '../../assets/image/checklist.png';
import ExtraFundTracker from '../../assets/image/extra-fund-tracker.png';
import ExtraPayDates from '../../assets/image/extra-pay-dates.png';
import JointContribution from '../../assets/image/joint-contribution.png';
import NetWork from '../../assets/image/net-worth.png';
import HomeImage from '../../assets/image/home.png';
import Navbar from '../../components/advert/navbar/Navbar';
import Hero from '../../components/advert/hero/Hero';
import ThreeCards from '../../components/advert/three-cards/ThreeCards';
import Footer from '../../components/advert/footer/Footer';
import Budget from '../../components/advert/budget/Budget';
import { useState } from 'react';
import ModalWrapper from '../../components/ModalWrapper';

export const Advert = () => {
  const [open, setOpen] = useState(false);

  const handleModal = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <div className="w-full bg-white">
        <Navbar />
        <Hero />
        <Budget />
        <div id="home" className="flex flex-col lg:flex-row items-center justify-center my-10 gap-8 lg:gap-12 p-8">
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <h1 className="text-[#171717] font-semibold text-[32px] lg:text-[42px]">Budget Summary</h1>

            <ul className="text-lg font-normal text-[#171717] list-decimal">
              <li>
                The Budget Summary report is a summary of the budget. Use this report when you need a budget overview.
              </li>
              <li>
                Point to the section above where it indicates all the items listed under: The Elite Budget app
                streamlines the budget management process in one easy-to-use platform.
              </li>
            </ul>
            <button className="flex hover:underline text-blue-500" onClick={handleModal}>
              show more
            </button>
            <a
              href="/login"
              className="hidden lg:flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-white shadow-md text-black rounded-md"
            >
              Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
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
              Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>
        </div>
        <div
          id="budget-detail"
          className="flex flex-col lg:flex-row-reverse items-center justify-center my-10 gap-8 lg:gap-12 p-8"
        >
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <h1 className="text-[#171717] font-semibold text-[32px] lg:text-[42px]">Budget Details</h1>
            <ul className="text-lg font-normal text-[#171717] list-decimal">
              <li>
                The Budget Detail report is a detailed list of all budget items included in each category. Use this
                report when you need a detailed view of your budget.
              </li>
              <li>
                Point to the section above where it indicates all the items listed under: The Elite Budget app
                streamlines the budget management process in one easy-to-use platform.
              </li>
            </ul>
            <button className="flex hover:underline text-blue-500" onClick={handleModal}>
              show more
            </button>
            <a
              href="/login"
              className="hidden lg:flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-white shadow-md text-black rounded-md"
            >
              Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
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
              Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>
        </div>
        <div id="checklist" className="flex flex-col lg:flex-row items-center justify-center my-10 gap-8 lg:gap-12 p-8">
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <h1 className="text-[#171717] font-semibold text-[32px] lg:text-[42px]">Checklist</h1>
            <ul className="text-lg font-normal text-[#171717] list-decimal">
              <li>
                Creating a checklist to track budget items is an excellent way to maintain control and ensure that no
                aspect of your financial plan is overlooked.{' '}
              </li>
              <li>
                Point to the section above where it indicates that the app includes budgeting tool add-ons: A handy
                checklist to use when you enter your budget items into your checkbook register so nothing is forgotten
                or overlooked
              </li>
            </ul>
            <button className="flex hover:underline text-blue-500" onClick={handleModal}>
              show more
            </button>
            <a
              href="/login"
              className="hidden lg:flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-white shadow-md text-black rounded-md"
            >
              Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
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
              Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>
        </div>
        <div
          id="networth"
          className="flex flex-col lg:flex-row-reverse items-center justify-center my-10 gap-8 lg:gap-12 p-8"
        >
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <h1 className="text-[#171717] font-semibold text-[32px] lg:text-[42px]">Networth</h1>
            <ul className="text-lg font-normal text-[#171717] list-decimal">
              <li>
                Point to the section above where it indicates that the app includes budgeting tool add-ons: Net worth
                Report (what you own less what you owe){' '}
              </li>
            </ul>
            <button className="flex hover:underline text-blue-500" onClick={handleModal}>
              show more
            </button>
            <a
              href="/login"
              className="hidden lg:flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-white shadow-md text-black rounded-md"
            >
              Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
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
              Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>
        </div>
        <div
          id="extra-pay-dates"
          className="flex flex-col lg:flex-row items-center justify-center my-10 gap-8 lg:gap-12 p-8"
        >
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <h1 className="text-[#171717] font-semibold text-[32px] lg:text-[42px]">Extra Pay Dates</h1>
            <ul className="text-lg font-normal text-[#171717] list-decimal">
              <li>
                Extra pay dates refer to additional pay periods per year that happen when you receive your paycheck on a
                weekly or biweekly basis which can provide a financial boost for budgeting.{' '}
              </li>
              <li>
                Point to the section above where it indicates that the app includes budgeting tool add-ons: Extra pay
                dates calendar for automatic savings (or debt reduction)
              </li>
            </ul>
            <button className="flex hover:underline text-blue-500" onClick={handleModal}>
              show more
            </button>
            <a
              href="/login"
              className="hidden lg:flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-white shadow-md text-black rounded-md"
            >
              Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
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
              Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>
        </div>
        <div
          id="joint"
          className="flex flex-col lg:flex-row-reverse items-center justify-center my-10 gap-8 lg:gap-12 p-8"
        >
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <h1 className="text-[#171717] font-semibold text-[32px] lg:text-[42px]">Joint Contribution Calculation</h1>
            <ul className="text-lg font-normal text-[#171717] list-decimal">
              <li>
                Point to the section above where it indicates that the app includes budgeting tool add-ons: Joint
                expense split calculator when couples wish to split their joint costs{' '}
              </li>
            </ul>
            <button className="flex hover:underline text-blue-500" onClick={handleModal}>
              show more
            </button>
            <a
              href="/login"
              className="hidden lg:flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-white shadow-md text-black rounded-md"
            >
              Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
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
              Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>
        </div>

        <div
          id="extra-fund-tracker"
          className="flex flex-col lg:flex-row items-center justify-center my-10 gap-8 lg:gap-12 p-8"
        >
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <h1 className="text-[#171717] font-semibold text-[32px] lg:text-[42px]">Extra Fund Tracker</h1>
            <ul className="text-lg font-normal text-[#171717] list-decimal">
              <li>
                Point to the section above where it indicates that the app includes budgeting tool add-ons: An extra
                funds tracker to manage the budget buffer (the money that exceeds your budget){' '}
              </li>
            </ul>
            <button className="flex hover:underline text-blue-500" onClick={handleModal}>
              show more
            </button>
            <a
              href="/login"
              className="hidden lg:flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-white shadow-md text-black rounded-md"
            >
              Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
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
              Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>
        </div>
        <div
          id="bank-tranaction"
          className="flex flex-col lg:flex-row-reverse items-center justify-center my-10 gap-8 lg:gap-12 p-8"
        >
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <h1 className="text-[#171717] font-semibold text-[32px] lg:text-[42px]">Bank Transaction</h1>
            <ul className="text-lg font-normal text-[#171717] list-decimal">
              <li>
                Point to the section above where it indicates that the app includes budgeting tool add-ons: Bank account
                registers so you can enter your bank transactions and reconcile your bank accounts{' '}
              </li>
            </ul>
            <button className="flex hover:underline text-blue-500" onClick={handleModal}>
              show more
            </button>
            <a
              href="/login"
              className="hidden lg:flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-white shadow-md text-black rounded-md"
            >
              Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
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
              Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>
        </div>

        <ThreeCards />
        <Footer />
      </div>

      <ModalWrapper open={open} handleClose={handleModal}>
        <ul className="ml-12 list-disc">
          <li>Step one is to enter all your data. That’s the hardest part but just for the first time!</li>
          <li>All reports and accounts are available by Individual, Partner, Joint or Household.</li>
          <li>
            The app includes budgeting tool add-ons:
            <ul className="list-disc ml-6">
              <li>
                <span className="font-bold"> Extra pay dates calendar</span> for automatic savings (or debt reduction)
              </li>
              <li>
                <span className="font-bold">A handy checklist</span> to use when you enter your budget items into your
                checkbook register so nothing is forgotten or overlooked
              </li>
              <li>
                {' '}
                <span className="font-bold">Joint expense split calculator</span> when couples wish to split their joint
                costs
              </li>
              <li>
                <span className="font-bold">An extra funds tracker</span> to manage the budget buffer (the money that
                exceeds your budget)
              </li>
              <li>
                <span className="font-bold">Bank account registers</span> so you can enter your bank transactions and
                reconcile your bank accounts
              </li>
              <li>
                <span className="font-bold">Net worth Report</span> (what you own less what you owe)
              </li>
            </ul>
          </li>
          <li>Easy to make changes</li>
          <li>All reports are automatically updated instantly.</li>
        </ul>
      </ModalWrapper>
    </>
  );
};
