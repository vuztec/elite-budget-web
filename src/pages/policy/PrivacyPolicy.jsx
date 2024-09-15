import React from 'react';
import Logo from '../../assets/logo.png';
import { useSearchParams } from 'react-router-dom';

export const PrivacyPolicy = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');

  return (
    <div className="w-full xl:w-1/2 flex flex-col items-center justify-center text-justify bg-white p-5 xl:p-10">
      <div className="flex justify-between mb-10 bg-black px-3 py-1 rounded-full">
        <a
          href={page === 'advert' ? '/advert' : '/login'}
          className="text-sm text-white hover:text-blue-500 underline cursor-pointer"
        >
          Return to Login or Create Account
        </a>
      </div>
      <h1 className="flex items-start justify-start mb-4">
        <img src={Logo} alt="logo" className="h-8 md:h-16 lg:h-32" />
      </h1>
      <h1 className="font-bold text-xl lg:text-2xl mb-5 text-left">
        Privacy Policy for "budget.elitecashflowconsulting.com"
      </h1>

      <div className="flex flex-col space-y-4">
        <h2 className="font-semibold text-lg">1. Introduction</h2>
        <p>
          Welcome to Budget.elitecashflowconsulting.com (the “App”), a service provided by Elite Cashflow Consulting. We
          respect your privacy and are committed to protecting your personal information. This Privacy Policy explains
          how we collect, use, disclose, and safeguard your information when you use our web application.
        </p>

        <h2 className="font-semibold text-lg">2. Information We Collect</h2>
        <ul className="pl-8 list-disc list-outside">
          <li>
            <strong>Personal Information:</strong> When you register for an account on our App, we collect personal
            details such as your name, email address, country, and age.
          </li>
          <li>
            <strong>Account Security Information:</strong> You will create a password, which is encrypted for privacy
            and security. In the event of a forgotten password, you can reset it using our secure OTP (One-Time
            Password) system.
          </li>
          <li>
            <strong>Financial Information:</strong> Users will enter their income, expenses, debts, savings, and
            retirement savings to manage their monthly and yearly budgets.
          </li>
          <li>
            <strong>Payment Information:</strong> If you purchase a subscription, we collect credit card information via
            Stripe, a third-party payment processor. Your credit card details are encrypted and handled securely. We do
            not store this information on our servers.
          </li>
        </ul>

        <h2 className="font-semibold text-lg">3. How We Use Your Information</h2>
        <ul className="pl-8 list-disc list-outside">
          <li>
            <strong>Personal Information:</strong> Your email and other personal details are used to create and manage
            your account, communicate with you, and provide you with the services you have requested.
          </li>
          <li>
            <strong>Account Security Information:</strong> Your encrypted password is used solely for accessing your
            account. If you forget your password, the OTP system will allow you to securely reset it.
          </li>
          <li>
            <strong>Financial Information:</strong> The data you enter for income, expenses, debts, and savings is
            solely for your use in budget management. We do not access, analyze, or use this information for any other
            purpose.
          </li>
          <li>
            <strong>Payment Information:</strong> Your payment details are processed by Stripe. We do not use your
            credit card information for any purpose other than processing your subscription payments.
          </li>
        </ul>

        <h2 className="font-semibold text-lg">4. How We Protect Your Information</h2>
        <ul className="pl-8 list-disc list-outside">
          <li>
            <strong>Encryption:</strong> All sensitive information, including passwords and payment details, is
            encrypted to ensure your privacy and security.
          </li>
          <li>
            <strong>Data Security:</strong> We implement various security measures, such as SSL encryption, to protect
            your personal information from unauthorized access.
          </li>
          <li>
            <strong>No Sharing of Information:</strong> We do not sell, trade, or otherwise transfer your personal or
            financial information to outside parties.
          </li>
        </ul>

        <h2 className="font-semibold text-lg">5. Third-Party Services</h2>
        <ul className="pl-8 list-disc list-outside">
          <li>
            <strong>Stripe:</strong> Payment processing for subscriptions is handled by Stripe. They adhere to strict
            privacy and security standards to protect your financial information. Please review Stripe's privacy policy
            for more information.
          </li>
        </ul>

        <h2 className="font-semibold text-lg">6. Your Rights</h2>
        <ul className="pl-8 list-disc list-outside">
          <li>
            <strong>Access and Correction:</strong> You can access and update your personal information at any time
            through your account settings.
          </li>
          <li>
            <strong>Data Deletion:</strong> You may delete or request the deletion of your account and all associated
            data by contacting us. We will comply with your request in accordance with applicable laws.
          </li>
        </ul>

        <h2 className="font-semibold text-lg">7. Changes to This Privacy Policy</h2>
        <p className="pl-6">
          We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage
          you to review it periodically.
        </p>

        <h2 className="font-semibold text-lg">8. Contact Us</h2>
        <p className="pl-6">If you have any questions about this Privacy Policy, please contact us at:</p>
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

export default PrivacyPolicy;
