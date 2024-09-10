import { IoIosArrowRoundForward } from 'react-icons/io';

function RetirementSec() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 p-8 bg-[#CCCCCC1A]">
      {/* Text Section */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <h1 className="text-[#171717] font-semibold text-[32px] lg:text-[42px]">Retirement</h1>
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

      {/* Image Section */}
      <div className="w-full lg:w-1/2">
        <img
          src="src/assets/image/retirment.png" // Correct image import
          alt="Other Debts"
          className="w-full h-auto"
        />
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
  );
}

export default RetirementSec;
