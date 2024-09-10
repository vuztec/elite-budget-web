import IncomeRecordCard from './IncomeCards.jsx'; // Ensure proper import
import { IoIosArrowRoundForward } from 'react-icons/io';

function Income() {
  // Array of record data to be rendered dynamically
  const incomeRecords = [
    {
      iconSrc: 'src/assets/icon/incomeRecord.png',
      title: 'Income Records',
      records: [
        'Budgeted monthly income for someone paid weekly is based on 4 pay periods per month',
        'Budgeted monthly income for someone paid biweekly is based on 2 pay periods per month',
      ],
    },
    {
      iconSrc: 'src/assets/icon/extraPay.png',
      title: 'Extra Pay Dates',
      records: [
        'Budgeted monthly income for someone paid weekly is based on 4 pay periods per month',
        'Budgeted monthly income for someone paid biweekly is based on 2 pay periods per month',
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10 gap-3">
      {/* First Section with Income Info and Image */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full lg:w-3/4">
        <div className="bg-[#C3C1C11A] p-10 w-full lg:w-1/2 rounded-lg text-center lg:text-left">
          <h1 className="text-[42px] text-[#171717] font-semibold">Income</h1>
          <p className="text-[#171717] font-normal text-sm">
            Income is the total money received from various sources, including salaries, investments, and business
            activities. It is essential for budgeting, financial planning, and assessing overall financial health.
          </p>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center">
          <img src="src/assets/image/income.png" alt="Income" className="max-w-full h-auto" />
        </div>
      </div>

      {/* Second Section with Income Records */}
      <div className="flex flex-col lg:flex-row gap-6 w-full lg:w-3/4">
        {incomeRecords.map((record, index) => (
          <IncomeRecordCard key={index} iconSrc={record.iconSrc} title={record.title} records={record.records} />
        ))}
      </div>
      <div className="flex items-center justify-center p-8">
        <a
          href="/login"
          className="flex items-center gap-2 text-xl font-medium p-3 bg-[#FFFFFF] shadow-md shadow-[#00000040]"
        >
          Try Elite <IoIosArrowRoundForward className="text-3xl" />
        </a>
      </div>
    </div>
  );
}

export default Income;
