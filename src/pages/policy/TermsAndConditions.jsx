import React from 'react';
import Logo from '../../assets/logo.png';

export const TermsAndConditions = () => {
  return (
    <div className="w-full xl:w-1/2 flex flex-col items-center justify-center text-justify bg-white p-5 xl:p-10">
      <div className="flex justify-between mb-5 bg-black px-3 py-1 rounded-full">
        <a href="/login" className="text-sm text-white hover:text-blue-500 underline cursor-pointer">
          Return to Login or Create Account
        </a>
      </div>
      <h1 className="flex items-start justify-start mb-4">
        <img src={Logo} alt="logo" className="h-8 md:h-16 lg:h-32" />
      </h1>
      <h1 className="font-bold text-xl lg:text-2xl mb-5 text-left">
        Terms and Conditions for "budget.elitecashflowconsulting.com"
      </h1>

      <div className="flex flex-col space-y-4">
        <h2 className="font-semibold text-lg">1. Acceptance of Terms</h2>
        <p>
          By accessing and using Budget.elitecashflowconsulting.com (the “App”), you accept and agree to be bound by the
          terms and provisions of this agreement. If you do not agree to these terms, you should not use this App or
          services.
        </p>

        <h2 className="font-semibold text-lg">2. Changes to Terms</h2>
        <p>
          Elite Cashflow Consulting reserves the right to change, modify, or update these Terms and Conditions at any
          time. Any changes will be effective immediately upon posting on the App. Your continued use of the App
          following the posting of changes constitutes your acceptance of such changes.
        </p>

        <h2 className="font-semibold text-lg">3. Use of the App</h2>
        <ul className="list-disc list-outside">
          <li>
            You agree to use the App in a manner that is lawful and in accordance with these Terms and Conditions.
          </li>
          <li>You agree not to use the App for any illegal or unauthorized purpose.</li>
          <li>
            You must not attempt to gain unauthorized access to any portion or feature of the App, or any other systems
            or networks connected to the App.
          </li>
        </ul>

        <h2 className="font-semibold text-lg">4. User Accounts</h2>
        <ul className="list-disc list-outside">
          <li>
            You are responsible for maintaining the confidentiality of your account and password and for restricting
            access to your computer.
          </li>
          <li>You agree to accept responsibility for all activities that occur under your account or password.</li>
          <li>
            Elite Cashflow Consulting reserves the right to refuse service, terminate accounts, or remove or edit
            content at its sole discretion.
          </li>
        </ul>

        <h2 className="font-semibold text-lg">5. Subscription and Payment</h2>
        <ul className="list-disc list-outside">
          <li>
            Subscriptions are handled through Stripe, and by purchasing a subscription, you agree to Stripe's terms and
            conditions as well.
          </li>
          <li>All subscription fees are non-refundable unless otherwise stated in these Terms and Conditions.</li>
          <li>
            Elite Cashflow Consulting reserves the right to change subscription fees at any time, with notice provided
            before changes take effect.
          </li>
        </ul>

        <h2 className="font-semibold text-lg">6. Intellectual Property</h2>
        <p>
          All content on the App, including text, graphics, logos, and software, is the property of Elite Cashflow
          Consulting or its content suppliers and is protected by international copyright laws.
        </p>

        <h2 className="font-semibold text-lg">7. Limitation of Liability</h2>
        <p>
          In no event shall Elite Cashflow Consulting be liable for any direct, indirect, incidental, special, or
          consequential damages resulting from the use or inability to use the App.
        </p>

        <h2 className="font-semibold text-lg">8. Governing Law</h2>
        <p>
          These Terms and Conditions are governed by and construed in accordance with the laws of [Your Jurisdiction],
          without regard to its conflict of law principles.
        </p>

        <h2 className="font-semibold text-lg">9. Contact Information</h2>
        <p>If you have any questions or concerns regarding these Terms and Conditions, please contact us at:</p>
        <p>
          <strong>Elite Cashflow Consulting</strong>
        </p>
        <p>Email: [Your Contact Email]</p>
        <p>Phone: [Your Contact Phone Number]</p>
        <p>Address: [Your Business Address]</p>
      </div>
      <div className="flex justify-between mt-10 bg-black px-3 py-1 rounded-full">
        <a href="/login" className="text-sm text-white hover:text-blue-500 underline cursor-pointer">
          Return to Login or Create Account
        </a>
      </div>
    </div>
  );
};

export default TermsAndConditions;
