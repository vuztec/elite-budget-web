import { IoIosArrowRoundForward } from 'react-icons/io';
import IncomeRecordCard from '../income/IncomeCards';

function Retirment() {
  // Array of record data to be rendered dynamically
  const bankRecord = [
    {
      iconSrc: 'src/assets/icon/budgetGoal.png',
      title: 'Budget Goals',
      records: [
        'Monitor and control spending to ensure it aligns with budget limits for effective financial oversight.',
      ],
    },
    {
      iconSrc: 'src/assets/icon/budgetDetail.png',
      title: 'Budget Details',
      records: [
        ' List income sources and expenses for a clear view of financial allocations.',
        'Ensure all categories are detailed for precise tracking.',
      ],
    },
    {
      iconSrc: 'src/assets/icon/checklist.png',
      title: 'Check List  ',
      records: ['Regularly review and update income and expenses for accurate tracking and budget adherence.'],
    },
    {
      iconSrc: 'src/assets/icon/extraFound.png',
      title: 'Extra Fund Tracker',
      records: [
        'Track additional funds beyond the budget; manage surplus effectively and adjust financial plans as needed.',
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10 gap-3 bg-[#FEF5FB]">
      {/* First Section with Income Info and Image */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full lg:w-3/4">
        <div className=" p-10 w-full lg:w-1/2 rounded-lg text-center md:text-start lg:text-left">
          <h1 className="text-[42px] text-[#171717] font-semibold">Retirement</h1>
          <p className="text-[#171717] font-normal text-sm">
            Retirement planning encompasses all future financial needs, including savings, investments, and expected
            expenses. Tracking your retirement goals is essential for effective budgeting, long-term financial planning,
            and ensuring financial security.
          </p>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center">
          <img src="src/assets/image/retirement2.png" alt="Income" className="max-w-full h-auto" />
        </div>
      </div>

      {/* Second Section with Income Records */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full lg:w-3/4">
        {bankRecord.map((record, index) => (
          <IncomeRecordCard key={index} iconSrc={record.iconSrc} title={record.title} records={record.records} />
        ))}
      </div>

      <div className="flex items-center justify-center p-8">
        <a
          href="/login"
          className="flex items-center gap-2 text-xl font-medium p-3 bg-black text-white shadow-md shadow-[#00000040]"
        >
          Try Elite <IoIosArrowRoundForward className="text-3xl" />
        </a>
      </div>
    </div>
  );
}

export default Retirment;
