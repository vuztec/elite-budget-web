import IncomeRecordCard from '../income/IncomeCards'; // Ensure proper import
import { IoIosArrowRoundForward } from 'react-icons/io';
import Income from '../../../../assets/image/income.png';
import ExpenseImage from '../../../../assets/icon/expensesRecord.png';
import Joint from '../../../../assets/icon/jointContribution.png';

function Expenses() {
  // Array of record data to be rendered dynamically
  const incomeRecords = [
    {
      iconSrc: ExpenseImage,
      title: 'Expense Records',
      records: [
        'Track and manage your expenses efficiently with detailed records and insights ',
        'Monitor and categorize your spending to stay on top of your financial goals',
      ],
    },
    {
      iconSrc: Joint,
      title: 'Joint Contribution',
      records: [
        'Joint Contribution is the total combined financial input from all contributors.',
        "Joint Contribution represents the aggregate of all parties' financial contributions",
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10 gap-3">
      {/* First Section with Income Info and Image */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full lg:w-3/4">
        <div className="bg-[#C3C1C11A] p-10 w-full lg:w-1/2 rounded-lg text-center lg:text-left">
          <h1 className="text-[42px] text-[#171717] font-semibold">Expenses</h1>
          <p className="text-[#171717] font-normal text-sm">
            Expenses represent the total amount of money spent on various items, including bills, investments, and
            business operations. Monitoring expenses is crucial for effective budgeting, financial planning, and
            maintaining overall financial stability.
          </p>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center">
          <img src={Income} alt="Income" className="max-w-full h-auto" />
        </div>
      </div>

      {/* Second Section with Income Records */}
      <div className="flex flex-col md:flex-row lg:flex-row gap-6 w-full lg:w-3/4">
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

export default Expenses;
