function Budget() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="w-full bg-[#2F2F2F] flex flex-col items-center p-8 md:p-16">
        {/* Navigation Buttons */}
        <div className="w-full flex flex-wrap  gap-2 p-2 md:p-10 justify-center">
          <button
            onClick={() => scrollToSection('home')}
            className="p-2 md:p-4 rounded-lg bg-[#FF7452] text-white w-full max-w-[150px] flex-wrap"
          >
            Budget Summary
          </button>
          <button
            onClick={() => scrollToSection('budget-detail')}
            className="p-2 md:p-4 rounded-lg bg-[#2684FF] text-white w-full max-w-[150px] flex-grow"
          >
            Budget Details
          </button>
          <button
            onClick={() => scrollToSection('checklist')}
            className="p-2 md:p-4 rounded-lg bg-[#57D9A3] text-white w-full max-w-[150px] flex-grow"
          >
            Checklist
          </button>

          <button
            onClick={() => scrollToSection('extra-pay-dates')}
            className="p-2 md:p-4 rounded-lg bg-[#00C7E5] text-white w-full max-w-[150px] flex-grow"
          >
            Extra Pay Dates
          </button>
          <button
            onClick={() => scrollToSection('joint')}
            className="p-2 md:p-4 rounded-lg bg-[#F99CDB] text-white w-full max-w-[150px] flex-grow"
          >
            Joint Calculator
          </button>
          <button
            onClick={() => scrollToSection('extra-fund-tracker')}
            className="p-2 md:p-4 rounded-lg bg-[#FF820E] text-white w-full max-w-[150px] flex-grow"
          >
            Extra Funds Tracker
          </button>
          <button
            onClick={() => scrollToSection('bank-transaction')}
            className="p-2 md:p-4 rounded-lg bg-[#00AE5B] text-white w-full max-w-[150px] flex-grow"
          >
            Bank Registers
          </button>
          <button
            onClick={() => scrollToSection('networth')}
            className="p-2 md:p-4 rounded-lg bg-[#FFC400] text-white w-full max-w-[150px] flex-grow"
          >
            Networth
          </button>
        </div>

        <div className="flex flex-col gap-4 items-center mt-6 md:mt-8">
          <a
            href="/login"
            className="bg-[#00AE5B] text-xl md:text-2xl whitespace-nowrap text-white font-semibold px-6 md:px-8 text-center py-3 md:py-4 rounded-lg"
          >
            Try the App Now
          </a>
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        {/* Description */}
        <div className="w-full xl:w-[60%] mt-4">
          <div className="grid xl:grid-cols-1 gap-2 mt-6 shadow-lg py-5">
            <h1 className="text-[#131924] font-bold text-xl md:text-xl leading-tight md:text-center lg:text-left px-10">
              The Elite Budget app streamlines the budget management process in one easy-to-use platform.
            </h1>
            <ul className="list-outside custom-list px-20 flex flex-col gap-5">
              <li className="">
                It’s all about the budget! Step one is to enter all of your Income, expenses, debt and the market value
                of your assets. That’s the hardest part but just the first time!
              </li>
              <li>All reports and accounts are available by Individual, Partner, Joint or Household.</li>
              <li>
                The app includes budgeting tool add-ons:
                <ul className="custom-list2 ml-10 mt-3 flex flex-col gap-3">
                  <li>
                    <span className="font-bold"> Extra pay dates calendar</span> for automatic savings (or debt
                    reduction)
                  </li>
                  <li>
                    <span className="font-bold">A handy checklist</span> to use when you enter your budget items into
                    your checkbook register so nothing is forgotten or overlooked
                  </li>
                  <li>
                    {' '}
                    <span className="font-bold">Joint expense split calculator</span> when couples wish to split their
                    joint costs
                  </li>
                  <li>
                    <span className="font-bold">An extra funds tracker</span> to manage the budget buffer (the amount
                    that exceeds your budget)
                  </li>
                  <li>
                    <span className="font-bold">Bank account registers</span> so you can enter your bank transactions
                    and reconcile your bank accounts
                  </li>
                  <li>
                    <span className="font-bold">Net worth Report</span> (what you own less what you owe)
                  </li>
                </ul>
              </li>
              <li>Easy to make changes.</li>
              <li>All reports are automatically updated instantly.</li>
            </ul>
          </div>

          <div className="grid xl:grid-cols-1 gap-6 mt-6 shadow-lg py-5">
            <ul className="list-outside custom-list px-14 py-5  flex flex-col gap-5">
              <li>
                <span className="font-bold">Elite Problem Solving:</span> For those who demand a simple solution to the
                budget process. Achieve complete control over your finances with a budgeting app designed for
                individuals, couples and households. Finally, a SIMPLE budget process where you can gain control over
                your finances and improve your financial well-being.
              </li>
              <li>
                <span className="font-bold">Customizable Budgets:</span> Create tailored budgets based on your expense
                categories with just a few clicks. The App provides a budget process designed by a CPA with the busy
                person in mind. All key components of a budget are listed and pre-populated with a list of income and
                spending categories to choose from with the flexibility to make changes and add recognizable nicknames.
              </li>

              <li>
                <span className="font-bold">Financial Insights:</span> Summary & Detail Budget reports and a handy
                checklist lets you know where your money is going. There’s also a net worth report too!
              </li>
              <li>
                <span className="font-bold">Simple Interface:</span> The Elite budget app offers an intuitive and
                user-friendly design, making budgeting accessible for everyone, whether you're a beginner or a seasoned
                budgeter. All you need is the internet to log into your account. No spreadsheets!
              </li>
              <li>
                <span className="font-bold">Multi-Device Support:</span> Access your budget from your phone, tablet, or
                desktop seamlessly.
              </li>
              <li>
                <span className="font-bold">Data Security:</span> Your data is encrypted and secure ensuring your
                financial information stays safe. The app does not interface with your bank institution(s) for extra
                security. You also have the option to use nicknames for each account to provide you with the extra peace
                of mind that comes with using generic names instead of using formal institution names. The Elite Budget
                App offers privacy security ensuring complete peace of mind. Integrate with your existing security
                functions and customize protection with features like double encryption, and user authentication.
              </li>
              <li>
                <span className="font-bold">Free Trial:</span> Try the app for <strong>FREE</strong> for 14-days so you
                can start taking control of your finances today!
              </li>
              <li>
                <span className="font-bold">Ease of Onboarding:</span> Sign up in seconds and start taking control of
                your finances immediately!
              </li>
              <li>
                <span className="font-bold">Upgrade Your Finances:</span> Elevate your budgeting experience and enjoy
                the perks of having a smarter financial life. Sign up today to get started.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Budget;
