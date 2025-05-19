import React, { useEffect, useState } from 'react';
import Logo from '../../assets/logo.png';
import { useSearchParams } from 'react-router-dom';
import useUserStore from '../../app/user';
import clsx from 'clsx';

export const PrivacyPolicy = ({ isDialog }) => {
  const { user, setAcceptPrivacy } = useUserStore();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const [privacy, setPrivacy] = useState(false);
  useEffect(() => {
    privacy ? setAcceptPrivacy(true) : setAcceptPrivacy(false);
  }, [privacy]);

  return (
    <div
      className={clsx(
        'w-full  mx-auto flex flex-col items-center justify-center text-justify bg-white p-5 xl:p-10',
        isDialog ? '' : 'sm:w-4/6',
      )}
    >
      {!isDialog ? (
        <>
          <div className="flex justify-between mb-10 bg-black px-3 py-1 rounded-full">
            <a
              href={
                page === 'advert'
                  ? '/advert'
                  : page === 'signup'
                    ? '/signup'
                    : page === 'subscription'
                      ? '/subscription'
                      : '/login'
              }
              className="text-sm text-white hover:text-blue-500 underline cursor-pointer"
            >
              {page === 'advert'
                ? 'Return to Advert'
                : page === 'signup'
                  ? 'Return to Signup'
                  : page === 'subscription'
                    ? 'Return to Subscription'
                    : 'Return Login'}
            </a>
          </div>
          <h1 className="flex flex-col items-center justify-start mb-4">
            <img src={Logo} alt="logo" className="h-32 lg:h-32" />
            <h1 className="font-bold">Elite Cash Flow Products, LLC</h1>
            <a href="https://www.elitecashflowproducts.com/" target="_blank" className="text-blue-500 hover:underline">
              www.elitecashflowproducts.com
            </a>
          </h1>
        </>
      ) : (
        ''
      )}
      <div className={clsx('flex flex-col w-full ', isDialog ? 'pt-0' : 'py-10')}>
        <h1 className="font-bold text-xl lg:text-2xl mb-5 text-left">Privacy Policy</h1>
        <div>
          Your privacy is important to Elite Cash Flow Products, LLC. Please read this privacy notice carefully as it
          contains important information on who we are, how and why we collect, store, use, and share personal
          information, your rights in relation to your personal information and on how to contact us and supervisory
          authorities in the event you have a complaint.
        </div>
        <br />
        <div>
          By using our website{' '}
          <a href="https://www.elitecashflowproducts.com/" target="_blank" className="text-blue-500 hover:underline">
            www.elitecashflowproducts.com
          </a>{' '}
          and the Elite Budget web application (the “App”){' '}
          <a className="text-blue-500 hover:underline">www.budget.elitecashflowproducts.com</a>, you signify your
          consent to the terms of our Privacy Policy. If you do not agree with any terms of this Privacy Policy, please
          do not use this site or the “App” or submit any personal information to us.
        </div>
      </div>

      <div className="flex flex-col py-4 space-y-4">
        <h2 className="font-semibold text-lg">1. Who We Are</h2>
        <p>
          Elite Cash Flow Products, LLC operating at{' '}
          <a href="https://www.elitecashflowproducts.com/" target="_blank" className="text-blue-500 hover:underline">
            www.elitecashflowproducts.com
          </a>{' '}
          collects, uses and is responsible for certain personal information about you. Our Elite budget web application
          (the “App”), <a className="text-blue-500 hover:underline">www.budget.elitecashflowproducts.com</a> also
          collects, uses and is responsible for certain personal information about you.
        </p>

        <h2 className="font-semibold text-lg">2. Children’s Online Privacy Protection Act</h2>
        <p>
          This website and any products and services offered herein are not intended for persons under the age of 13.
          Elite Cash Flow Products, LLC does not knowingly collect information from anyone under 13 years of age. Elite
          Cash Flow Products, LLC prohibits children under the age of 13 from using all interactive portions of this
          website, including leaving any comments, filling out forms, or otherwise submitting information. Elite Cash
          Flow Products, LLC will not knowingly collect personally identifiable information from children under 13. If
          Elite Cash Flow Products, LLC learns it has any information or content from anyone under the age of 13, it
          will delete that information.
        </p>

        <h2 className="font-semibold text-lg">3. The Personal Information We Collect and Use</h2>
        <ul className="pl-8 list-disc list-outside">
          <div>
            <h1 className="font-bold">a. Information Collected by Us:</h1>
            Elite Cash Flow Products, LLC may collect, use, and is responsible for certain personal information that you
            provide when you voluntarily sign up for the “App”, e-mails or free gifts, register for a class, workshop or
            presentation, leave comments, order a service or product, fill out any type of form, access private
            membership pages, or otherwise contact Elite Cash Flow Products, LLC via an online form or e-mail. The
            information collected may include your name, e-mail, address, phone number, and/or billing information. You
            are not required to provide any personally identifiable information to merely access or visit the website{' '}
            <a href="https://www.elitecashflowproducts.com/" target="_blank" className="text-blue-500 hover:underline">
              www.elitecashflowproducts.com
            </a>{' '}
            or the “App”, <a className="text-blue-500 hover:underline">www.budget.elitecashflowproducts.com</a>.
            <br />
            <br />
            Elite Cash Flow Products, LLC may collect domain information, your numerical IP address, the type of browser
            you use, which pages you view, and the files you request. We may also use “cookies” (small files saved on
            your hard drive by your web browser) to analyze website and advertisement performance, track user patterns,
            save information from your previous visits and customize your experience.
            <br />
            <br />
            If your browser sends a "Do Not Track" signal, only a generic cookie will be placed on your device while the
            website is accessed.
            <br />
            <br />
            We will ask for your consent to allow us to use cookies. Elite Cash Flow Products, LLC or its third-party
            vendors may collect nonpersonal information through the use of these technologies. Nonpersonal information
            might include the browser you use, the type of computer you use and technical information about your means
            of connection to this website such as the operating systems and the Internet service providers utilized and
            other similar information. Elite Cash Flow Products, LLC’s systems may also automatically gather information
            about the areas you visit and search terms you use on this website and about the links you may select from
            within this website to other areas of the Internet.
            <br />
            <br />
            If you are located in the European Economic Area (“EEA”), we are regulated under the General Data Protection
            Regulation which applies across the European Union and we are responsible as controller of that personal
            information for the purposes of those laws.
            <br />
            <br />
            If you are located in the United Kingdom (“UK”), we are regulated under UK data regulations known as “UK
            GDPR.”
          </div>
          <br />
          <div>
            <h1 className="font-bold">b. Information Collected from Other Sources</h1>
            We also obtain personal information from the use of other third-party sources on our website such as
            Calendly, DocuSign and Survey Monkey which then passes the information entered to Elite Cash Flow Products,
            LLC.
          </div>
          <br />
          <div>
            <h1 className="font-bold">c. How we use your personal information</h1>
            Elite Cash Flow Products, LLC collects such information in order to send e-mails, fulfill orders, deliver
            services and products, complete customer transactions, oversee contests and promotions and improve website
            performance and customer service.
          </div>
          <br />
          <div>
            <h1 className="font-bold">d. Who We Share Your Personal Information With</h1>
            Elite Cash Flow Products, LLC respects your privacy and will never sell, trade or transfer your personally
            identifiable information to third parties (beyond what is necessary for fulfilling a customer transaction or
            for the basic functionality of an online service) without your consent.
            <br />
            <br />
            We do, however, share your name and delivery address details with credit card processors or shipping
            companies.
            <br />
            <br />
            This data sharing enables them to deliver the goods you ordered directly to you. Those third-party
            recipients are not based outside the European Economic Area or the UK — for further information including on
            how we safeguard your personal data when this occurs, see Transfer of your information out of the EEA, UK
            below.
            <br />
            <br />
            Elite Cash Flow Products, LLC may release personal information to enforce its Website Terms and Conditions
            of Use, other Terms and Conditions, manage its business, protect users or the general public, or to
            otherwise comply with legal obligations.
            <br />
            <br />
            If you give Elite Cash Flow Products, LLC your permission, it may also use personal identification
            information for internal or external marketing and promotional purposes.
            <br />
            <br />
            On occasion, Elite Cash Flow Products, LLC may collect personal identification information from you in
            connection with optional contests, special offers or promotions. Elite Cash Flow Products, LLC will share
            such information with necessary third parties for the purpose of carrying out the contest, special offer or
            promotion. We will ask for your consent to such disclosure and use of such information, prior to your
            participation in the contest, special offer or promotion.
            <br />
            <br />
            We reserve the right to transfer personal information in the event that we merge with or are acquired by a
            third party. We also may disclose your personal information for any other purpose permitted by law or to
            which you consent.
            <br />
            <br />
            We will not share your personal information with any other third party.
          </div>
          <br />
          <div>
            <h1 className="font-bold">e. Whether Information Has to Be Provided by You and Why</h1>
            We do not require you to provide any personal data in order to access the public areas of our website. We
            will inform you when we collect it whether you are required to provide the information to us.
          </div>
          <br />
          <div>
            <h1 className="font-bold">f. How Long Your Personal Information Will Be Kept</h1>
            We will hold all non-client personal data until you let us know you would like for us to delete it or
            unsubscribe from our marketing contacts, which you are free to do at any time. We will hold all client and
            customer personal data in our files for six years.
          </div>
          <br />
          <div>
            <h1 className="font-bold">g. Reasons We Can Collect and Use Your Personal Information</h1>
            Elite Cash Flow Products, LLC collects and uses your personal information to send e-mails, fulfill orders,
            deliver services and products, complete customer transactions, oversee contests and promotions and improve
            website performance and customer service.
          </div>
        </ul>

        <h2 className="font-semibold text-lg">4. Use and Transfer of Your Information Out of the EEA, UK</h2>
        <p className="pl-6">
          This website is operated in the United States and third parties with whom we might share your personal
          information as explained above are also located in the United States. If you are located in the EEA, the UK,
          or elsewhere outside of the United States, please be aware that{' '}
          <strong>any information you provide will be transferred to the United States</strong>. By using this website,
          participating in any of its services and/or providing your information, you consent to this transfer
          <br />
          <br />
          These countries do not have the same data protection laws as the EEA or UK. While the European Commission has
          not given a formal decision that these countries OR United States provides an adequate level of data
          protection similar to those which apply in the EEA, any transfer of your personal information will be subject
          to the derogation in Article 49 permitting non-repetitive transfers that concern only a limited number of data
          subjects, as permitted by Article 49 of the General Data Protection Regulation that is designed to help
          safeguard your privacy rights and give you remedies in the unlikely event of a misuse of your personal
          information.
          <br />
          <br />
          If you would like further information, (see “How to contact us” below. We will not otherwise transfer your
          personal data outside of the EEA or UK, or to any organization (or subordinate bodies) governed by public
          international law or which is set up under any agreement between two or more countries.
        </p>

        <h2 className="font-semibold text-lg">5. Your Rights</h2>
        <p className="pl-6">
          If you want to unsubscribe from receiving e-mails from Elite Cash Flow Products, LLC, you may do so at any
          time. Each e-mail from Elite Cash Flow Products, LLC includes instructions for unsubscribing from these e-mail
          communications.
          <br />
          <br />
          If you are covered by the General Data Protection Regulation, or other relevant privacy regulations, you have
          a number of important rights free of charge. In summary, those include rights to:
        </p>
        <ul className="custom-list mt-0 flex flex-col gap-1 -ml-4">
          <li>Fair processing of information and transparency over how we use your use personal information</li>
          <li>
            Access to your personal information and to certain other supplementary information that this Privacy Notice
            is already designed to address
          </li>
          <li>Require us to correct any mistakes in your information which we hold</li>
          <li>Require the erasure of personal information concerning you in certain situations</li>
          <li>
            Receive the personal information concerning you which you have provided to us, in a structured, commonly
            used and machine-readable format and have the right to transmit those data to a third party in certain
            situations
          </li>
          <li>Object at any time to processing of personal information concerning you for direct marketing</li>
          <li>
            Object to decisions being taken by automated means which produce legal effects concerning you or similarly
            significantly affect you
          </li>
          <li>Object in certain other situations to our continued processing of your personal information</li>
          <li>Otherwise restrict our processing of your personal information in certain circumstances</li>
        </ul>
        <p className="pl-6">
          You may also have the right to claim compensation for damages caused by our breach of any data protection
          laws.
          <br />
          <br />
          For further information on each of those rights, including the circumstances in which they apply, visit{' '}
          <a href="https://www.gdpr.eu" target="_blank" className="text-blue-500 hover:underline">
            www.gdpr.eu
          </a>
          {' or '}
          <a
            href="https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-
            protection-regulation-gdpr/individual-rights/
          </a>
          ; {' or '}
          <a href="https://www.priv.gc.ca/en" target="_blank" className="text-blue-500 hover:underline">
            https://www.priv.gc.ca/en
          </a>
          .
          <br />
          <br />
          If you would like to exercise any of those rights, please:
        </p>

        <ul className="custom-list mt-0 flex flex-col gap-1 -ml-4">
          <li>Email, call, or write to us</li>
          <li>
            Provide us enough information to identify you (e.g., first and last name, account number, user name,
            registration details).
          </li>
          <li>
            Provide us proof of your identity and address (a copy of your driver’s license or passport and a recent
            utility or credit card bill).
          </li>
          <li>
            Provide us with the information to which your request relates including any account or reference numbers, if
            you have them.
          </li>
        </ul>

        <h2 className="font-semibold text-lg">6. Keeping Your Personal Information Secure</h2>
        <p className="pl-6">
          We have appropriate security measures in place to prevent personal information from being accidentally lost,
          used or accessed in an unauthorized way. We limit access to your personal information to those who have a
          genuine business need to know it. Those processing your information will do so only in an authorized manner
          and may be subject to a duty of confidentiality.
          <br />
          <br />
          We also have procedures in place to deal with any suspected data security breach. We will notify you and any
          applicable authorities of a suspected data security breach where we are legally required to do so.
          <br />
          <br />
          It is important to understand that no security measures are absolute. We cannot guarantee the safety of any
          information you provide to us.
          <br />
          <br />
          For the “App”, <a className="text-blue-500 hover:underline">www.budget.elitecashflowproducts.com</a> we
          implement various security measures, such as SSL encryption, in an attempt to protect your personal
          information from unauthorized access.
          <br />
          <br />
          Please note that any comments or information that you post on the website, including social media pages or
          groups, become public and third parties may use your information. Elite Cash Flow Products, LLC is not
          responsible for any unauthorized uses by third parties in such context. You disclose such information at your
          own risk.
          <br />
          <br />
          The “App”, <a className="text-blue-500 hover:underline">www.budget.elitecashflowproducts.com</a>
        </p>
        <ul className="custom-list mt-0 flex flex-col gap-1 -ml-4">
          <li>
            <strong>Account Security:</strong> The user will create a password, which is encrypted for privacy and
            security allowing the user to access their account. If a user forgets their password, they can reset it
            using the secure OTP (One-Time Password) system. Users should keep their login information secure from
            unauthorized use.
          </li>
          <li>
            <strong>Financial Information:</strong> Users will enter their age, income, expenses, debts, savings,
            retirement savings as well as the market value of their assets while using the “App” in order to create and
            manage their budgets and calculate their net worth. The data entered in the “App” belongs to the user. Elite
            Cash Flow Products, LLC will never access, analyze, or use this information for any reason.
          </li>
          <li>
            <strong>Payment Information:</strong> When you purchase a subscription, we collect credit card information
            via a third-party payment processor. Your credit card details are encrypted and handled securely.
            Third-party payments processors are required to adhere to strict privacy and security standards to protect
            your financial information.
          </li>
        </ul>

        <h2 className="font-semibold text-lg">7. Links to Other Sites</h2>
        <p className="pl-6">
          You may see advertising or other content on this website that links to the sites and services of our partners,
          suppliers, advertisers, sponsors, licensors or other third parties. Any products or services reached through a
          third-party link are subject to separate privacy policies. Elite Cash Flow Products, LLC is not responsible
          for or liable for any content on or actions taken by such third-party websites.
        </p>

        <h2 className="font-semibold text-lg">8. How to Complain</h2>
        <p className="pl-6">
          We hope that we can resolve any question or concern you raise about our use of your information.
          <br />
          <br />
          If you are covered by the General Data Protection Regulation or UK GDPR, you may lodge a complaint with a
          supervisory authority, in particular in the UK or European Union (or European Economic Area) state where you
          work, normally live, or where any alleged infringement of data protection laws occurred.
        </p>

        <h2 className="font-semibold text-lg">9. Changes to This Privacy Notice</h2>
        <p className="pl-6">
          This policy is effective as of January 14, 2025. We may change, modify or update this Privacy Policy at any
          time and will notify you of any fundamental changes by email or postal mail. Otherwise, we will reflect any
          such modifications to this Privacy Policy on our website{' '}
          <a href="https://www.elitecashflowproducts.com/" target="_blank" className="text-blue-500 hover:underline">
            www.elitecashflowproducts.com
          </a>{' '}
          and the sign-in page at <a className="text-blue-500 hover:underline">www.budget.elitecashflowproducts.com</a>.
          We suggest that you periodically consult this Privacy Policy. Your continued use of our website after any such
          changes constitutes your acceptance of this Privacy Policy, as revised.
        </p>
        <h2 className="font-semibold text-lg">10. How to Contact Us</h2>
        <p className="pl-6">
          If you have any questions or concerns about this Privacy Policy, the information we hold about you, or you
          wish to change your personal information in our records, please contact Michelle Romero, CPA, CEO at{' '}
          <span className="text-blue-500 underline"> michelle@elitecashflowproducts.com.</span>.
        </p>
        <h2 className="font-semibold text-lg">11. Do You Need Extra Help?</h2>
        <p className="pl-6">
          If you would like this notice in another format (for example: audio, large print, braille) please contact us
          (see “How to contact us” above).
        </p>

        <p className="py-10">Policy Last Updated January 14, 2025</p>
      </div>
      <div
        className={clsx(
          'text-xl flex gap-3 w-full px-2 py-1 rounded-md text-white',
          privacy ? 'bg-green-500' : 'bg-red-500',
        )}
      >
        <input type="radio" checked={privacy} onChange={() => setPrivacy((prev) => !prev)} />
        {`I, ${user ? user?.FullName : 'the undersigned'}, confirm that I have read, fully understand, and agree to the terms outlined in the Privacy Policy.`}
      </div>
      {!isDialog ? (
        <div className="flex justify-between mt-10 bg-black px-3 py-1 rounded-full">
          <a
            href={
              page === 'advert'
                ? '/advert'
                : page === 'signup'
                  ? '/signup'
                  : page === 'subscription'
                    ? '/subscription'
                    : '/login'
            }
            className="text-sm text-white hover:text-blue-500 underline cursor-pointer"
          >
            {page === 'advert'
              ? 'Return to Advert'
              : page === 'signup'
                ? 'Return to Signup'
                : page === 'subscription'
                  ? 'Return to Subscription'
                  : 'Return Login'}
          </a>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default PrivacyPolicy;
