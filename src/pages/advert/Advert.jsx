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
import Button from '../../components/Button';
import { TiCancel } from 'react-icons/ti';
import ModalWrapperFull from '../../components/ModalWrapperFull';

export const Advert = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);

  const handleModal = () => {
    setOpen((prev) => !prev);
    setImage(() => null);
  };

  const handleOpenModal = (img) => {
    setImage(() => img);
    setOpen(() => true);
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

            <ul className="text-lg font-normal text-[#171717] list-decimal flex flex-col gap-5">
              <li>
                The Budget Summary report is a <strong>printable</strong> summary of the budget. Use this report when
                you need a budget overview.
              </li>
              <li className="">All reports and accounts are available by Individual, Partner, Joint or Household.</li>
              <li className="">Easy to make changes.</li>
              <li className="">All reports are automatically updated instantly.</li>
            </ul>

            <a
              href="/login"
              className="hidden lg:flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-white shadow-md text-black rounded-md"
            >
              Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>

          <div className="w-full lg:w-1/2 cursor-pointer" onClick={() => handleOpenModal(HomeImage)}>
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
            <ul className="text-lg font-normal text-[#171717] list-decimal flex flex-col gap-5">
              <li>
                The Budget Detail report is a <strong>printable</strong> detailed list of all budget items included in
                each category. Use this report when you need a detailed view of your budget.
              </li>
              <li className="">All reports and accounts are available by Individual, Partner, Joint or Household.</li>
              <li className="">Easy to make changes.</li>
              <li className="">All reports are automatically updated instantly.</li>
            </ul>

            <a
              href="/login"
              className="hidden lg:flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-white shadow-md text-black rounded-md"
            >
              Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>

          <div className="w-full lg:w-1/2" onClick={() => handleOpenModal(BudgetDetails)}>
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
            <ul className="text-lg font-normal text-[#171717] list-decimal flex flex-col gap-3">
              <li>
                Creating a checklist to track budget items is an excellent way to maintain control and ensure that no
                aspect of your financial plan is overlooked.
              </li>

              <li>
                Provides <strong>a printable checklist</strong> to use when you enter your budget items into your
                checkbook register so nothing is forgotten or overlooked.
              </li>
              <li className="">The checklist is available by Individual, Partner, Joint or Household.</li>
              <li className="">When there are budget changes, the checklist is automatically updated instantly.</li>
              <li className="">The checklist can be filtered by selected month(s).</li>
            </ul>
            <a
              href="/login"
              className="hidden lg:flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-white shadow-md text-black rounded-md"
            >
              Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>

          <div className="w-full lg:w-1/2" onClick={() => handleOpenModal(Checklist)}>
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
          id="extra-pay-dates"
          className="flex flex-col lg:flex-row-reverse items-center justify-center my-10 gap-8 lg:gap-12 p-8"
        >
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <h1 className="text-[#171717] font-semibold text-[32px] lg:text-[42px]">Extra Pay Dates</h1>
            <ul className="text-lg font-normal text-[#171717] list-decimal flex flex-col gap-3">
              <li>
                Extra pay dates refer to the additional pay periods per year that occur when you receive your paycheck
                on a weekly or biweekly basis. These extra paychecks can provide a financial boost to your savings or
                debt reduction.
              </li>
              <li>
                Provides a <strong>printable extra pay dates calendar</strong> for automatic savings (or debt
                reduction).
              </li>
            </ul>

            <a
              href="/login"
              className="hidden lg:flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-white shadow-md text-black rounded-md"
            >
              Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>

          <div className="w-full lg:w-1/2" onClick={() => handleOpenModal(ExtraPayDates)}>
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
        <div id="joint" className="flex flex-col lg:flex-row items-center justify-center my-10 gap-8 lg:gap-12 p-8">
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <h1 className="text-[#171717] font-semibold text-[32px] lg:text-[42px]">Joint Split Calculation</h1>
            <ul className="text-lg font-normal text-[#171717] list-decimal">
              <li>
                Provides a <strong>joint expense split calculator</strong> when couples wish to split their joint costs.
              </li>
            </ul>

            <a
              href="/login"
              className="hidden lg:flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-white shadow-md text-black rounded-md"
            >
              Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>

          <div className="w-full lg:w-1/2" onClick={() => handleOpenModal(JointContribution)}>
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
          className="flex flex-col lg:flex-row-reverse items-center justify-center my-10 gap-8 lg:gap-12 p-8"
        >
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <h1 className="text-[#171717] font-semibold text-[32px] lg:text-[42px]">Extra Fund Tracker</h1>
            <ul className="text-lg font-normal text-[#171717] list-decimal">
              <li>
                Provides an <strong> extra funds tracker</strong> to manage the budget buffer (the money that exceeds
                your budget).
              </li>
            </ul>

            <a
              href="/login"
              className="hidden lg:flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-white shadow-md text-black rounded-md"
            >
              Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>

          <div className="w-full lg:w-1/2" onClick={() => handleOpenModal(ExtraFundTracker)}>
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
          className="flex flex-col lg:flex-row items-center justify-center my-10 gap-8 lg:gap-12 p-8"
        >
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <h1 className="text-[#171717] font-semibold text-[32px] lg:text-[42px]">Bank Registers</h1>
            <ul className="text-lg font-normal text-[#171717] list-decimal flex flex-col gap-3">
              <li>
                Provides <strong>Bank account registers</strong> so you can enter your bank transactions and reconcile
                your bank accounts.
              </li>
              <li>
                Can add <strong>unlimited number of bank accounts.</strong>
              </li>
            </ul>

            <a
              href="/login"
              className="hidden lg:flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-white shadow-md text-black rounded-md"
            >
              Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>

          <div className="w-full lg:w-1/2" onClick={() => handleOpenModal(BankTransaction)}>
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
        <div
          id="networth"
          className="flex flex-col lg:flex-row-reverse items-center justify-center my-10 gap-8 lg:gap-12 p-8"
        >
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <h1 className="text-[#171717] font-semibold text-[32px] lg:text-[42px]">Networth</h1>
            <ul className="text-lg font-normal text-[#171717] list-decimal flex flex-col gap-3">
              <li>
                Calculating <strong>net worth</strong> is a great way to assess your financial health over time.
              </li>
              <li>
                Creates your <strong>Net worth Report</strong> (what you own less what you owe).
              </li>
              <li className="">All reports and accounts are available by Individual, Partner, Joint or Household.</li>
              <li className="">Easy to make changes.</li>
              <li className="">All reports are automatically updated instantly.</li>
            </ul>
            <a
              href="/login"
              className="hidden lg:flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 bg-white shadow-md text-black rounded-md"
            >
              Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>

          <div className="w-full lg:w-1/2" onClick={() => handleOpenModal(NetWork)}>
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

        {/* <ThreeCards /> */}
        <Footer />
      </div>

      <ModalWrapperFull open={open} handleClose={handleModal}>
        <div className="">
          <img src={image} alt="Budget Details" className="w-full h-auto" />
        </div>
        <div className="py-3 flex justify-center gap-4">
          <Button
            type="button"
            className="bg-gray-100 flex flex-row-reverse items-center gap-1 px-8 text-sm font-semibold text-gray-900 sm:w-auto border"
            onClick={handleModal}
            label="Close"
            icon={<TiCancel />}
          />
        </div>
      </ModalWrapperFull>
    </>
  );
};
