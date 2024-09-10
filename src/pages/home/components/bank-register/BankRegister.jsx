import { IoIosArrowRoundForward } from 'react-icons/io';
import IncomeRecordCard from '../income/IncomeCards';
import BankRegister from '../../../../assets/image/bankRegister.png';

function BankRegister() {
  // Array of record data to be rendered dynamically
  const bankRecord = [
    {
      iconSrc: 'src/assets/icon/bankAccount.png',
      title: 'Bank Account',
      records: [
        'Bank Account tracks all transactions for accurate financial management.',
        'Stay on top of your finances with real-time transaction tracking.',
      ],
    },
    {
      iconSrc: 'src/assets/icon/bankTransaction.png',
      title: 'Bank Transactions',
      records: [
        'Bank Transaction logs and categorizes all transactions for easy tracking.',
        'Keep your finances organized with automatic transaction logging.',
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10 gap-3">
      {/* First Section with Income Info and Image */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full lg:w-3/4">
        <div className="bg-[#C3C1C11A] p-10 w-full lg:w-1/2 rounded-lg text-center lg:text-left">
          <h1 className="text-[42px] text-[#171717] font-semibold">Bank Register</h1>
          <p className="text-[#171717] font-normal text-sm">
            Bank Register represents the total record of all financial transactions, including deposits, withdrawals,
            and transfers. Monitoring your bank register is essential for accurate budgeting, financial planning, and
            maintaining overall financial stability.
          </p>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center">
          <img src={BankRegister} alt="Income" className="max-w-full h-auto" />
        </div>
      </div>

      {/* Second Section with Income Records */}
      <div className="flex flex-col md:flex-row lg:flex-row gap-6 w-full lg:w-3/4">
        {bankRecord.map((record, index) => (
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

export default BankRegister;
