import React from 'react';
import Logo from '../../assets/logo.png';
import { useSearchParams } from 'react-router-dom';

export const About = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  return (
    <div className="w-full sm:w-4/6 mx-auto flex flex-col items-center justify-center text-justify bg-white p-5 xl:p-10">
      <div className="flex justify-between mb-5 bg-black px-3 py-1 rounded-full">
        <a
          href={page === 'advert' ? '/advert' : page === 'signup' ? '/signup' : '/login'}
          className="text-sm text-white hover:text-blue-500 underline cursor-pointer"
        >
          {page === 'advert' ? 'Return to Advert' : page === 'signup' ? 'Return to Signup' : 'Return Login'}
        </a>
      </div>
      <h1 className="flex flex-col items-center justify-start mb-4">
        <img src={Logo} alt="logo" className="h-32 lg:h-32" />
        <h1 className="font-bold">Elite Cash Flow Products, LLC</h1>
        <a href="https://www.elitecashflowproducts.com/" target="_blank" className="text-blue-500 hover:underline">
          www.elitecashflowproducts.com
        </a>
      </h1>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg lg:text-xl text-left">About Me</h1>
          <p>
            Welcome! I'm Michelle, a CPA & CEO of Elite Cash Flow Products, LLC. I’m offering the web app, Elite Budget
            and the MONEY collection of luxury Checkbook Registers.
            <br />
            <br />
            My work is built on a foundation of simplicity and effectiveness. I believe in the power of smart,
            intentional finance and record keeping. My mission is to elevate everyday money management through
            beautifully designed tools whether you're navigating the digital world or the pages of a luxury checkbook
            register.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <h1 className="font-bold text-lg lg:text-xl text-left">The Web App</h1>
            <h1 className="font-bold lg:text-lg text-left">A Modern, Trusted Approach to Budgeting</h1>
          </div>

          <p>
            Elite Budget is a smart, reliable tool for anyone seeking a simplified approach to managing their cash flow.
            <br />
            <br />
            In an age of constant digital distractions, I’ve created a streamlined budget tool that simplifies the
            budget process. The web app combines the reliability of my proven financial strategies with the convenience
            of modern technology. This is my budget process and it works!
            <br />
            <br />
            How does it work?
          </p>
          <ul className=" flex flex-col gap-5 ml-4">
            <li className="flex flex-col">
              <p>
                1. <strong>Start with the Essentials</strong>
              </p>
              <p className="ml-4">
                Input all of your income, expenses, debt payments, retirement contributions, and savings goals. This
                forms the foundation of your monthly budget.
              </p>
            </li>
            <li className="flex flex-col">
              <p>
                2. <strong>Review and Refine</strong>
              </p>
              <p className="ml-4">
                Once your budget is generated, review it carefully. Make any necessary adjustments to reflect your real
                financial picture.
              </p>
            </li>
            <li className="flex flex-col">
              <p>
                3. <strong>Automate the Core</strong>
              </p>
              <p className="ml-4">
                Set up automation for your recurring expenses, debt payments, and savings transfers. This ensures bills
                are paid on time—no more late fees, missed payments, or guesswork.
              </p>
            </li>
            <li className="flex flex-col">
              <p>
                4. <strong>Track What’s Left</strong>
              </p>
              <p className="ml-4">
                Use the <strong>Extra Funds Tracker</strong> to see your true available cash. Whether it’s for surprise
                expenses, budget overruns, or the rare occasion you come in under budget, this tool keeps you flexible
                and prepared.
              </p>
            </li>
            <li className="flex flex-col">
              <p>
                5. <strong>Stay Organized</strong>
              </p>
              <p className="ml-4">
                The <strong>Budget Checklist</strong> helps you make sure nothing is overlooked as you input your
                payments and savings into your bank register.
              </p>
            </li>
            <li className="flex flex-col">
              <p>
                6. <strong>Reconcile and Balance</strong>
              </p>
              <p className="ml-4">
                Finally, reconcile your bank accounts with your budget. Stay aligned, accurate, and fully in control of
                your cash flow.
              </p>
            </li>
            <li className="flex flex-col">
              <p>
                7. <strong>Net Worth</strong>
              </p>
              <p className="ml-4">
                The app also tracks your <strong>Net Worth</strong> and benchmarks it against expected net worth figures
                based on your age and income—giving you meaningful context, not just numbers.
              </p>
            </li>
            <li className="flex flex-col">
              <p>
                8. <strong>Reports</strong>
              </p>
              <p className="ml-4">
                All reports are customizable and can be viewed by Self, Partner, Joint, or Family, so you can budget the
                way that fits your life.
              </p>
            </li>
          </ul>
          <br />
          <p>
            This is budgeting the way it was always meant to be: effective, organized, straightforward and a time saver!
          </p>
          <br />
          <div>
            <h1 className="font-bold text-lg lg:text-xl text-left">Luxury Checkbook Registers</h1>
            <h1 className="font-bold lg:text-lg text-left">A Return to the Beautifully Practical</h1>
          </div>
          <p>
            In a fast-paced digital world, there's something timeless about putting pen to paper. My luxury checkbook
            registers are crafted for those who appreciate fine materials, a luxurious design, and the quiet
            satisfaction of handwritten records. Each piece is thoughtfully produced—because even the smallest details
            of daily life deserve beauty and intention.
            <br />
            <br />
            These are not your average registers; they are a celebration of form and function and luxury, designed to
            elevate the everyday.
          </p>
          <br />
          <div>
            <h1 className="font-bold lg:text-lg text-left">Why We Do Both</h1>
          </div>
          <p>
            Because luxury is not just about indulgence—it’s about choice. Whether you prefer the speed of digital or
            the tactile ritual of writing, I believe your tools should reflect your standards.
            <br />
            <br />
            At Elite Cash Flow Products, I provide products designed to meet you where you are—with beauty, intention,
            and unparalleled function.
            <br />
            <br />
            Welcome to a smarter, more sophisticated way to manage your cash flow!
            <br />
            <br />
            Thanks for stopping by—I'm so glad you're here.
            <br />
            <br />
            ~Michelle
            <br />
            CPA, CEO
            <br />
            Elite Cash Flow Products, LLC
          </p>
        </div>

        <div className="flex justify-between mt-10 bg-black px-3 py-1 rounded-full">
          <a
            href={page === 'advert' ? '/advert' : page === 'signup' ? '/signup' : '/login'}
            className="text-sm text-white hover:text-blue-500 underline cursor-pointer"
          >
            {page === 'advert' ? 'Return to Advert' : page === 'signup' ? 'Return to Signup' : 'Return Login'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
