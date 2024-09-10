// import FinalBudget from '../../../../assets/image/finalbudget.png';
import FinalBudget from '../../../../assets/icon/finalbudget.png';
import Dashboard from '../../../../assets/image/dashboard.png';
import BankRegister from '../../../../assets/image/bankRegister.png';

const BudgetManagement = () => {
  return (
    <div className="bg-gradient-to-b from-[#066B7E] to-blue-300 min-h-screen flex flex-col items-center">
      <div className="text-center py-12 px-4">
        <h1 className="text-3xl font-bold mb-4 text-white">
          Experience budget management from a fresh perspective with Elite
        </h1>
        <p className="text-lg text-white">
          Review your finances from multiple angles and gain new insights into your budget with Elite
        </p>
        <button className="mt-6 px-6 py-4 bg-white text-black text-xl font-semibold rounded-lg">Request a demo</button>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-10 p-6">
        {/* Final Budget Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
          {/* Mobile View */}
          <div className="block md:hidden">
            <div className="flex gap-3 items-center mb-2">
              <img src={FinalBudget} className="h-8 w-8" alt="Final Budget Icon" />
              <h2 className="text-xl font-semibold uppercase">Final Budget</h2>
            </div>
            <p className="text-gray-600 text-justify">
              <strong>Final budget</strong> refers to the comprehensive financial plan that outlines expected income,
              planned expenditures, and savings goals for a specific period. The final budget helps ensure that spending
              aligns with financial goals, supports effective financial management, and aids in achieving long-term
              financial stability.
            </p>
          </div>
          {/* Image */}
          <img src={Dashboard} alt="Final Budget Screenshot" className="w-full md:w-1/2 mb-4 md:mb-0 rounded-md" />
          {/* Desktop View */}
          <div className="hidden md:block">
            <div className="flex gap-3 items-center mb-2">
              <img src={FinalBudget} className="h-8 w-8" alt="Final Budget Icon" />
              <h2 className="text-xl font-semibold uppercase">Final Budget</h2>
            </div>
            <p className="text-gray-600 text-justify">
              <strong>Final budget</strong> refers to the comprehensive financial plan that outlines expected income,
              planned expenditures, and savings goals for a specific period. The final budget helps ensure that spending
              aligns with financial goals, supports effective financial management, and aids in achieving long-term
              financial stability.
            </p>
          </div>
        </div>

        {/* Bank Register Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
          {/* Content */}
          <div>
            <div className="flex gap-3 items-center mb-2">
              <img src={BankRegister} className="h-8 w-8" alt="Bank Register Icon" />
              <h2 className="text-xl font-semibold uppercase">Bank Register</h2>
            </div>
            <p className="text-gray-600 text-justify">
              Bank registration in a dashboard involves linking and tracking various bank accounts to monitor
              transactions, balances, and financial activity in one place. It provides a consolidated view of account
              details, helping users manage finances efficiently, reconcile transactions, and keep track of cash flow.
            </p>
          </div>
          {/* Image */}
          <img src={Dashboard} alt="Bank Register Screenshot" className="w-full md:w-1/2 mb-4 md:mb-0 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default BudgetManagement;
