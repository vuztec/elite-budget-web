function Budget() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="w-full bg-[#2F2F2F] flex flex-col items-center p-8 md:p-16">
        {/* Navigation Buttons */}
        <div className="flex flex-wrap  gap-2 p-2 md:p-10 justify-center">
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
            Joint Contribution
          </button>
          <button
            onClick={() => scrollToSection('extra-fund-tracker')}
            className="p-2 md:p-4 rounded-lg bg-[#FF820E] text-white w-full max-w-[150px] flex-grow"
          >
            Extra Fund Tracker
          </button>
          <button
            onClick={() => scrollToSection('bank-transaction')}
            className="p-2 md:p-4 rounded-lg bg-[#00AE5B] text-white w-full max-w-[150px] flex-grow"
          >
            Bank Transaction
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
      <div className="w-full flex flex-col items-center p-8 md:p-16">
        {/* Heading */}
        <div className="">
          <div className="lg:w-[900px] text-center lg:px-2">
            <h1 className="text-3xl md:text-[32px] font-semibold">The Elite Budget Web App…………A NEW WAY TO BUDGET! </h1>
            <p>Take control of your finances with this simple, user-friendly money management tool.</p>
            <p>
              Crafted for those who expect more. It’s the luxury of total financial control. Join an exclusive group of
              elite savers and elevate your financial status. Sign up today and unlock the power of premium budgeting.
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="w-full px-8 pt-0 my-4 md:my-2">
          {/* <p className="text-[#FFFFFF] font-normal text-lg md:text-lg lg:leading-[28px] md:text-center">
          With everything neatly organized and easily accessible, your team can quickly find and share the information
          they need. Project progress remains transparent, helping everyone stay aligned, focused, and stress-free, no
          matter where they work.
        </p> */}
          <div className="grid xl:grid-cols-2 gap-6 xl:gap-10 mt-6">
            <ul className="list-outside list-disc shadow-lg px-10 py-5">
              <h1 className="">
                Elite streamlines budget management and team collaboration in one easy-to-use platform.
              </h1>
              <li>Step one is to enter all your data. That’s the hardest part but just for the first time!</li>
              <li>All reports and accounts are available by Individual, Partner, Joint or Household.</li>
              <li>
                The app includes budgeting tool add-ons:
                <ul className="list-disc ml-6">
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
                    <span className="font-bold">An extra funds tracker</span> to manage the budget buffer (the money
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
              <li>Easy to make changes</li>
              <li>All reports are automatically updated instantly.</li>
            </ul>
            <ul className="list-outside list-disc shadow-lg px-10 py-5">
              <li>
                <span className="font-bold">Elite Problem Solving:</span> For those who demand more from their financial
                tools. Achieve complete control over your finances with a budgeting app designed for individuals,
                couples and households that seek premium performance. Finally, a budget process where you can gain
                control over your finances and improve your long-term financial well-being.{' '}
              </li>
              <li>
                <span className="font-bold">Simple Interface:</span> The Elite budget app offers an intuitive design,
                making budgeting accessible for everyone, whether you're a beginner or a seasoned saver. All you need is
                the internet to log into your account. No spreadsheets!
              </li>
              <li>
                <span className="font-bold"> Luxurious Design:</span> Experience a sleek, elegant interface that
                reflects your premium lifestyle—simple, stylish, and effective.
              </li>
              <li>
                <span className="font-bold">Customizable Budgets:</span> Create tailored budgets based on your expense
                categories with just a few clicks. The App provides a budget process tailored to elite savers and
                spenders. All key components of a budget are listed, prepopulated with a list of income and spending
                categories to choose from with the flexibility to make changes and add recognizable nicknames.
              </li>
              <li>
                <span className="font-bold">Financial Insights:</span> Summary & Detail Budget reports and a handy
                checklist lets you know where your money is going and how to save more. There’s also a net worth report
                too!
              </li>
              <li>
                <span className="font-bold">Multi-Device Support:</span> Access your budget from your phone, tablet, or
                desktop seamlessly.
              </li>
              <li>
                <span className="font-bold">Data Security:</span> Your data is encrypted and secure, ensuring your
                financial information stays safe.
              </li>
              <li>
                <span className="font-bold">Free Trial or Signup:</span> Try the budgeting portion of the app for a free
                7-day trial (banking and net worth are included with a paid subscription) and start taking control of
                your finances today!
              </li>
              <li>
                <span className="font-bold">Ease of Onboarding:</span> Sign up in seconds and start budgeting
                immediately!
              </li>
              <li>
                <span className="font-bold">Exclusive Membership:</span> Join a select group of elite users who trust
                the Elite Budget app for their financial planning needs.
              </li>
              <li>
                <span className="font-bold">Upgrade Your Finances:</span> Elevate your budgeting experience and enjoy
                the perks of a smarter financial life. Sign up today to unlock premium features.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Budget;
