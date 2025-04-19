import React, { useEffect, useState } from 'react';
import Logo from '../../assets/logo.png';
import { useSearchParams } from 'react-router-dom';
import { FaBriefcase, FaCreditCard, FaGift, FaGifts } from 'react-icons/fa';
import { FcCalendar, FcDocument } from 'react-icons/fc';
import { FaPenClip } from 'react-icons/fa6';
import useUserStore from '../../app/user';
import clsx from 'clsx';

export const TermsAndConditions = () => {
  const { user, setAcceptTerms } = useUserStore();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const [terms, setTerms] = useState(false);
  useEffect(() => {
    terms ? setAcceptTerms(true) : setAcceptTerms(false);
  }, [terms]);

  return (
    <div className="w-full sm:w-4/6 mx-auto flex flex-col items-center justify-center text-justify bg-white p-5 xl:p-10">
      <div className="flex justify-between mb-5 bg-black px-3 py-1 rounded-full">
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

      <div>
        <h1 className="font-bold text-xl lg:text-2xl mb-5 text-left">Terms and Conditions of Use</h1>
        Please read these Terms and Conditions of Use (“TOU”) carefully. You must agree to these TOU{' '}
        <span className="underline">before</span> you are permitted to use any Elite Cash Flow Products, LLC such as the
        digital application or other cash flow products offered for sale by Elite Cash Flow Products, LLC (for any
        purpose), whether on a website hosted by Elite Cash Flow Products, LLC or a third-party website (collectively
        <span className="font-bold underline">“the Products”</span>).
      </div>

      <div className="flex flex-col w-full py-10">
        <h1 className="font-bold text-xl">If you do not agree with these TOU, you may not use the Products.</h1>
        <div>
          As used in these TOU, the term <span className="font-bold underline">“Releasees”</span> is defined to include
          the following: (i) Elite Cash Flow Products, LLC, its subsidiaries, affiliated companies, owners, members,
          managers, directors, officers, past and present employees, agents, coaches, representatives, successors and
          assigns (collectively <span className="font-bold underline">“the Company”</span>); (ii) any Company
          volunteers; (iii) spouse or friend.
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <h2 className="font-semibold text-lg">1. Participants</h2>
        <p className="pl-6">
          NOTE TO MINORS: You acknowledge that your parent or guardian has reviewed, understood and agreed to the terms
          below. Children under the age of 13 are not permitted to use the Web App. Children between the ages of 13 and
          18 must ask for their parent's or guardian's permission and agreement to these TOU before viewing our
          Products. <br />
          <br />
          NOTE TO PARENTS/GUARDIANS OF MINORS: You acknowledge that you have reviewed, understood and agreed to the
          terms of these TOU (such terms being interpreted as if they applied both to you and your minor child/ward) and
          have the legal authority to enter into these TOU on behalf of your minor child/ward. <br />
          <br />
          The Company reserves the right to offer the Products from time to time, for any subgroup of users/consumers.
          These Products are gifts. The selection of the users/consumers who may be gifted the Products is at the sole
          discretion of the Company.
        </p>

        <h2 className="font-semibold text-lg">2. Payment</h2>
        <p className="pl-6">
          You agree to the following fees and payment schedule:
          <br />
          <br />
          After the 14-day free trial of the Elite Web App, you will be billed a total of $95.88, and then billed
          annually on the anniversary of the date you initially paid, referenced as your anniversary date. All other
          product prices are posted and offered for sale at the listed prices.
          <br />
          <br />
          If paying by debit card or credit card, you give us permission to automatically charge your credit or debit
          card for all fees and charges due and payable to the Company, without any additional authorization, for which
          you will receive an electronic receipt. You also agree that the Company is authorized to share any payment
          information and instructions required to complete the payment transactions with its third-party payment
          service providers (e.g., credit card transaction processing, merchant settlement, and related services).{' '}
          <br />
          <br />
          If payment is not received when due, the Company reserves the right to terminate your access to the Products
          and all Content, as defined below, immediately and permanently.
        </p>

        <h2 className="font-semibold text-lg">3. Refunds</h2>

        <p className="pl-6">
          Your satisfaction with the Elite Budget Web Application is important to us. However, because of the extensive
          time, effort, preparation and care that goes into creating and providing the Elite Budget Web Application, we
          have a no refund policy. Unless otherwise provided by law, you acknowledge that we do not offer refunds for
          any portion of your payment for our Elite Budget Web Application and no refunds will be provided to you at any
          time. By using and/or purchasing our Elite Budget Web Application, you understand and agree that all sales are
          final, and no refunds will be provided.
          <br />
          <br />
          <div className="flex items-center justify-left gap-2">
            <FaBriefcase className="text-orange-900" />
            <p className="font-bold">Return & Refund Policy For Our Signature Checkbook Registers</p>
          </div>
          We take pride in offering elegant, high-quality checkbook registers designed to complement your lifestyle and
          we want you to love your purchase! If for any reason your purchase doesn’t meet expectations, we’ll make it
          right. Please review our return policy below:
          <br />
          <br />
          <div className="flex items-center justify-left gap-2">
            <FcCalendar className="text-orange-900" />
            <p className="font-bold">30-Day Return Window</p>
          </div>
          You may return the new, unused item within <strong>30 days of delivery</strong> for a full refund—no questions
          asked. We kindly ask that the item is unused and returned in its <strong>original packaging.</strong>
          <br />
          <br />
          <div className="flex items-center justify-left gap-2">
            <FcDocument />
            <p className="font-bold">Simple Return Process</p>
          </div>
          <ul className="custom-list mt-0 flex flex-col gap-1 -ml-4">
            <li>
              Contact us at <span className="text-blue-500">info@elitecashflowproducts.com</span> to start your return
              by providing the reason for the return.
            </li>
            <li>
              A <strong>prepaid return shipping label</strong> will be provided for your convenience.
            </li>
            <li>
              Once we receive the returned item, we will inspect and process your refund within{' '}
              <strong>2 business days</strong>.
            </li>
          </ul>
          <br />
          <div className="flex items-center justify-left gap-2">
            <FaCreditCard className="text-blue-500" />
            <p className="font-bold">Refunds</p>
          </div>
          All refunds are issued to your original payment method. If your item arrives damaged or with any defect,
          please reach out immediately—we will replace or refund your order at no cost to you.
          <br />
          <br />
          <div className="flex items-center justify-left gap-2">
            <FaGift className="text-orange-400" />
            <p className="font-bold">Holiday Returns</p>
          </div>
          Orders placed between <strong>November 1 and December 31</strong> qualify for extended returns until{' '}
          <strong>January 31</strong> of the following year.
          <br />
          <br />
          <div className="flex items-center justify-left gap-2">
            <FaPenClip className="text-blue-500" />
            <p className="font-bold">Our Promise</p>
          </div>
          Each register is designed with care and built to last. If you’re not fully satisfied, we're committed to
          making your experience seamless and stress-free.
          <br />
          <br />
          All payments are non-refundable for any request received after <strong>30 days of delivery</strong>.
          <br />
          <br />
          Upon determining that you are entitled to a refund pursuant to this policy, the Company will promptly issue an
          instruction to its payment processor to issue the refund. The Company does not control its payment processor
          and will not be able to expedite any refunds.
          <br />
          <br />
          If you receive a refund of any purchase through this money-back guarantee, that shall immediately terminate
          any and all licenses granted you to use the Elite Budget Web Application or the Products provided to you under
          these TOU. You shall immediately cease using the Products.
          <br />
          <br />
          All refunds are discretionary as determined by the Company. To further clarify, we will not provide refunds
          for requests made after the 15th day from the date you received the product, excluding the Elite Budget Web
          Application where no refunds are provided.
          <br />
          <br />
          Company reserves the right, in its sole discretion, to determine how to manage a user/consumer who violates
          these Terms. Therefore, if a user/consumer disagrees with how the Company manages another user/consumer and
          requests a refund, the Company will deny such request.
          <br />
          <br />
          Furthermore, if a user/consumer violates these Terms, the Company reserves the right, in its sole discretion,
          to offer the user/consumer another opportunity to abide by these Terms. If a user/consumer disagrees with the
          Company offering another user/consumer a second opportunity to follow these terms, no grounds for a
          user/consumer to receive a refund would be created, and any request for a refund on this basis shall be
          denied.
          <br />
          <br />
          If, in the Company’s sole right and discretion, you persist with behaviors or actions that violate these
          Terms, the Company may terminate your access to the Products without notice and without refund. <br />
          <br />
          The Company may offer the Products for a subgroup of participants i.e. women, minorities, other demographic
          groups. The Company reserves the right, in its sole discretion, to offer the Products to these specific
          user/consumers. If a user/consumer is denied these Products, no grounds for a user/consumer to receive a
          refund would be created and any request for a refund on this basis will be denied.
          <br />
          <br />
          Since we have a clear and explicit Refund Policy in these TOU that you have agreed to prior to completing the
          purchase of the Products, we do not tolerate or accept any type of chargeback threat or actual chargeback from
          your credit card company or payment processor. If a chargeback is placed on a purchase or we receive a
          chargeback threat during or after your purchase, we reserve the right to report the incident to all three
          credit reporting agencies or to any other entity for inclusion in any chargeback database or for listing as a
          delinquent account, which could have a negative impact on your credit report score. The information reported
          will include your name, email address, order date, order amount, and billing address. Chargeback abusers
          wishing to be removed from the database shall make the payment for the amount of the chargeback.{' '}
        </p>

        <h2 className="font-semibold text-lg">4. Intellectual Property Rights</h2>
        <ul className="pl-8 list-decimal list-outside">
          <li>
            <h3 className="font-bold">Ownership of the Content</h3>
            The words, videos, voice and sound recordings, training materials, design, layout, graphics, photos, images,
            information, materials, documents, data, databases and all other information and intellectual property
            accessible on or through the Company website, any third-party website the Company may use to distribute or
            host the Product, and contained in e-mails sent to you by the Company, as well as the look and feel of all
            of the foregoing <span className="font-bold">(“the Content”)</span> is property of the Company and/or our
            affiliates or licensors, unless otherwise noted, and it is protected by copyright, trademark, and other
            intellectual property laws.
          </li>
          <br />
          <li>
            {' '}
            <h3 className="font-bold">The Company’s Limited License to You</h3>
            If you view, purchase or access the Products or any of the Content, you will be considered our Licensee. For
            the avoidance of doubt, you are granted a revocable, non-transferable license for personal, non-commercial
            use only, limited to you only.
            <br />
            <br />
            <span className="italic">
              This means you may view, download, print, email and use the Products and Content for your own personal
              purposes or your own business only.
            </span>
            <br />
            <br />
            You may not republish, reproduce, duplicate, copy, sell, display, disclose, distribute to friends, family,
            or any other third party, or otherwise use any material from the Program or Content for commercial purposes
            or in any way that earns you or any third-party money (other than by applying them generally in your own
            business). By downloading, printing, or otherwise using the Program or Content for personal use you in no
            way assume any ownership rights of the Content – it is still Company property. Any unauthorized use of any
            materials found in the Program or Content shall constitute infringement.
            <br />
            <br />
            You must receive our written permission before using any of the Products or Content for your own commercial
            use or before sharing with others.
            <br />
            <br />
            The trademarks and logos displayed on the Products or Content are trademarks belonging to the Company,
            unless otherwise indicated. Any use including framing, metatags or other text utilizing these trademarks, or
            other trademarks displayed, is strictly prohibited without our written permission.
            <br />
            <br />
            All rights not expressly granted in these terms or any express written license, are reserved by us.
          </li>
          <br />
          <li>
            <h3 className="font-bold">Unauthorized Use</h3>
            Your use of any materials found in the Products or Content other than that expressly authorized in these TOU
            or by a separate written assignment, is not permitted (“Unauthorized Use”). You agree to pay liquidated
            damages of five (5) times the total fees paid for the Products in the event of your Unauthorized Use, or a
            minimum of $5,000 if you did not pay fees for the Products, in addition to any legal or equitable remedies
            the Company may be entitled to pursue. This is not a penalty but an agreed liquidated damages charge for the
            Unauthorized Use.
            <br />
            <br />
            You agree that any violation or threatened violation of the Intellectual Property Rights terms in these TOU
            would cause irreparable injury to Us that may not be adequately compensated by damages, entitling Us to
            obtain injunctive relief, without bond, in addition to all legal remedies.
          </li>
          <br />
          <li>
            <h3 className="font-bold">Your License to the Company; Use in Testimonials and Marketing.</h3>
            By posting comments, posts, photos, designs, graphics, images or videos or other contributions, you are
            representing to us that you are the owner of all such materials and you are at least 18 years old. You are
            also granting us, and anyone authorized by us, an unlimited, royalty-free, perpetual, irrevocable,
            non-exclusive, unrestricted, worldwide license to use, copy, modify, transmit, sell, exploit, create
            derivative works from, distribute, and/or publicly perform or display your contributions, in whole or in
            part, in any manner or medium, now known or developed in the future, for any purpose, and granting us the
            right to make it part of the Company’s current or future Products and Content. This right includes granting
            us proprietary rights or intellectual property rights under any relevant jurisdiction without any further
            permission from you or compensation by us to you. <br />
            <br />
            You also consent to photographs, videos, and/or audio recordings, including teleconference calls, or other
            communications, that may be made by the Company that may contain you, your voice and/or your likeness. In
            the Company’s sole discretion, we reserve the right to use these photographs, videos, and or/audio
            recordings and/or any other materials submitted by you to the Company or created by the Company in
            connection with your use of the Products, without compensation to you at any time, now or at any time in the
            future.
            <br />
            <br />
            You also grant us, and anyone authorized by us, the right to use your likeness and identify you as the
            author and individual depicted in any comments, posts, photos, images, videos or other contributions created
            by you or the Company, or by name, email address, or screen name, for any purposes, including commercial
            purposes and advertising. You acknowledge that we have the right but not the obligation to use any
            contributions from you and that we may elect to cease the use of any such contributions in the Program or in
            our Content at any time for any reason.
            <br />
            <br />
            <span className="italic">
              This means you give the Company permission to use anything you submit or post in any third- party forum or
              website operated by the Company, or anything captured by the Company during your use of the product(s),
              including images in which your face is visible and recognizable.{' '}
            </span>
          </li>
          <br />
          <li>
            <h3 className="font-bold">Request for Permission to Use the Content</h3>
            If you wish to use any of the Content, or any other intellectual property or property belonging to us, you
            should request permission in writing BEFORE you use the Content by sending an e-mail to
            <span className="text-blue-500"> michelle@elitecashflowproducts.com.</span>
            <br />
            <br />
            If you are granted permission by the Company, you agree to use the specific Content that the Company allows
            and only in the ways for which the Company has given you its written permission. If you choose to use the
            Content in ways that the Company does not specifically give you written permission, you agree now that you
            will be treated as if you had copied, duplicated and/or stolen such Content from us, and you consent to
            immediately stop using such Content and to take whatever actions as we may request and by the methods and in
            the time frame that we prescribe to protect our intellectual property and ownership rights in the Products
            and Content.
          </li>
        </ul>

        <h2 className="font-semibold text-lg">5. Your Conduct in the Program; Confidentiality</h2>
        <p className="pl-6">
          Please choose carefully the materials that you upload to, submit to, or embed on any website operated by the
          Company and any third-party forums operated by the Company. Any material you post on the Company’s website or
          in any third-party forums operated by the Company may become public.
          <br />
          <br />
          Company is not legally bound to keep your information confidential. Nevertheless, Company agrees to keep all
          information about our relationship strictly confidential except in very rare circumstances where disclosure is
          required by law, for example when a court might issue a subpoena for the file or information, or if you
          threaten to harm yourself, or others. You acknowledge that our communications are not covered by any
          doctor-patient privilege or other privilege.
          <br />
          <br />
          You are responsible for your material and for any liability that may result from the material you post. You
          participate, comment, and post material at your own risk. Any communication by you on the Company’s website
          and any third-party forums operated by the Company, whether by leaving a comment, participating in a chat,
          public or private forum, or other interactive service, must be respectful. You may not communicate or submit
          any content or material that is abusive, vulgar, threatening, harassing, knowingly false, defamatory or
          obscene or otherwise in violation of any law or the rights of others. You agree to post comments or other
          material only one time.
          <br />
          <br />
          The Company, in its discretion, may delete or modify, in whole or part, any post, comment or submission to the
          Company’s and any third-party forums operated by the Company. The Company does not, however, have any
          obligation to monitor posts, comments, or material submitted by third parties. The Company neither endorses
          nor makes any representations as to the truthfulness or validity of any third-party posts, comments, or
          material on the Company website or any third-party forums operated by the Company. The Company shall not be
          responsible or liable for any loss or damage caused by third-party posts, comments, or materials on the
          Company website and any third-party forums operated by the Company.
          <br />
          <br />
          You are strictly forbidden from the following:
          <ul className="list-disc list-inside">
            <li>Causing damage to any Company website or third-party forums operated by the Company</li>
            <li>
              Using any Company website or third-party forums operated by the Company for any unlawful, illegal,
              fraudulent or harmful purpose or activity
            </li>
            <li>
              Using any Company website or third-party forums operated by the Company to copy, store, host, transmit,
              send, use, publish or distribute any spyware, virus, worm, Trojan horse, keystroke logger or other
              malicious software
            </li>
            <li>
              Using any Company website or third-party forums operated by the Company to transmit, send or deliver
              unsolicited communications or for other marketing or advertising purposes
            </li>
            <li>
              Systematically or automatically collecting data from any Company website or third-party forums operated by
              the Company
            </li>
            <li>Sharing private and proprietary information about the Products</li>
          </ul>
          <br />
          <br />
          We may also post separate rules regarding your behavior in any online community or forum, whether hosted on
          the Company’s website or a third-party website, which may be updated from time to time. You agree that you are
          bound by those rules and they are expressly incorporated into these TOU.
          <br />
          <br />
          If, in the Company’s sole discretion, your conduct violates these TOU in any way, you agree that the Company
          may immediately and permanently terminate your participation in the Program and your access to the Content
          without refund.
          <br />
          <br />
          The Company does its best to create a safe and welcoming space for all participants, however, Company cannot
          guarantee that all participants will follow these guidelines. Company, in its sole discretion, may remove any
          user’s/consumer’s comments, posts, content or materials, however, Company does not have a duty to review all
          comments, posts, content and material shared within any online private forums or groups or on any group call.
          Therefore, Company shall not be held liable for any user’s/consumer’s comments, actions, posts, content or
          materials that result in another participant’s trauma or discomfort.
        </p>

        <h2 className="font-semibold text-lg">6. Username and Password</h2>
        <p className="pl-6">
          To access certain features of the Program, including any private membership areas, you may need a username and
          password. You agree to keep your username and password confidential. During the registration process for any
          service or product, you agree to provide true, accurate, current and complete information about yourself. If
          the Company has reasonable grounds to suspect that you have provided false information, shared your username
          and password with anyone else, or forwarded any non-public material from the Program to any other person, the
          Company has the right to suspend or terminate your account and refuse any and all current or future use of the
          Program or any Content, in whole or part, without refund. Any personally identifiable information you provide
          as part of the registration process is governed by the terms of the Company’s website Privacy Policy.
        </p>

        <h2 className="font-semibold text-lg">7. Termination or Cancellation</h2>
        <p className="pl-6">
          The Company reserves the right in its sole discretion to refuse or terminate your access to the Products and
          Content, in full or in part, upon delivery of written notice, at any time. In the event of cancellation or
          termination, you are no longer authorized to access the part of the Products or Content affected by such
          cancellation or termination. The restrictions imposed on you in these TOU with respect to the Products and its
          Content will still apply now and in the future, even after termination by you or the Company.
          <br />
          <br />
          If you would like to cancel your access to the Products, you must provide the Company with written notice
          (including e-mail). Your access to the Content of the Products will be immediately terminated upon your notice
          of cancellation. You will not be issued a refund for any remaining days or months of the Products after your
          cancellation.
          <br />
          <br />
          In the event you decide to cancel, any default, or late payments will be due immediately.
        </p>

        <h2 className="font-semibold text-lg">8. Personal Responsibility, Assumption of Risk, Release, Disclaimers</h2>

        <ol className="ml-4 list-decimal list-inside">
          <li>
            You acknowledge that, by engaging with the Company for the Products, you voluntarily assume an element of
            inherent risk, and knowingly and freely assume all risk and responsibility for injuries to any persons or
            damages to any property, and release, covenant not to sue, and hold Releasees harmless for any and all
            liability to you, your personal representatives, assigns, heirs and next of kin, for any and all claims,
            causes of action, obligations, lawsuits, charges, complaints, controversies, damages, costs or expenses of
            whatsoever kind, nature, or description, whether direct or indirect, in law or in equity, in contract or in
            tort, or otherwise, whether known or unknown, arising out of or connected with your or your minor
            child’s/ward’s) purchase of the Products, whether or not caused by the active or passive negligence of the
            Releasees.
            <br />
            <br />
            In the event that the release and hold harmless provision is held unenforceable for any reason, you agree to
            limit any damages claimed to the total paid to the Company for the Products.
          </li>
          <br />
          <li>
            The Product and Content provide information and education only, and do not provide any financial, legal,
            medical or psychological services or advice. None of the Product or Content prevents, cures or treats any
            mental or medical condition. The Product and Content is not intended to be a substitute for professional
            advice that can be provided by your own accountant, lawyer, financial advisor, or medical professional. You
            are responsible for your own financial, legal, physical, mental and emotional well-being, decisions,
            choices, actions and results. You should consult with a professional if you have specific questions about
            your own unique situation. The Company disclaims any liability for your reliance on any opinions or advice
            contained in the Product.
          </li>
          <br />
          <li>
            <span className="font-bold">Earnings and Results Disclaimer.</span> You agree that Company has not made and
            does not make any representations about the earnings or results you may receive as a result of your purchase
            of the Products. The Company cannot and does not guarantee that you will achieve any particular result or
            earnings from your use of the Products, and you understand that results and earnings differ for each
            individual.
          </li>
          <br />
          <li>
            Any links to third-party products, services, or sites are subject to separate terms and conditions. The
            Company is not responsible for or liable for any content on or actions taken by such third-party company or
            website. Although the Company may recommend third-party sites, products or services, it is your
            responsibility to fully research such third parties before entering into any transaction or relationship
            with them.
          </li>
          <br />
          <li>
            The Company tries to ensure that the availability and delivery of the Products and Content is uninterrupted
            and error-free. However, the Company cannot guarantee that your access will not be suspended or restricted
            from time to time, including to allow for repairs, maintenance or updates, although, of course, we will try
            to limit the frequency and duration of suspension or restriction.
          </li>
          <br />
          <li>
            THE INFORMATION AND PRODUCTS OFFERED ON OR THROUGH THE PRODUCTS AND CONTENT ARE PROVIDED “AS IS” AND WITHOUT
            WARRANTIES OF ANY KIND EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE BY APPLICABLE LAW, THE
            COMPANY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF
            MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE COMPANY DOES NOT WARRANT THAT THE PRODUCTS OR ANY
            OF ITS FUNCTIONS WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT ANY PART OF
            THE WEBSITE, INCLUDING SUBSCRIPTION PAGES, OR THE SERVERS THAT MAKE IT AVAILABLE, ARE FREE OF VIRUSES OR
            OTHER HARMFUL COMPONENTS.
          </li>
          <br />
          <li>
            THE COMPANY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES
            THAT RESULT FROM THE USE OF, OR THE INABILITY TO USE, THE PRODUCTS, INCLUDING ITS MATERIALS, PRODUCTS OR
            THIRD- PARTY MATERIALS, PRODUCTS OR SERVICES MADE AVAILABLE THROUGH THE PRODUCTS.{' '}
          </li>
        </ol>

        <h2 className="font-semibold text-lg">9. Security</h2>
        <p className="pl-6">
          Security for all personally identifiable information is extremely important to us. Unfortunately, no data
          transmission over the internet can be guaranteed to be 100% secure. As a result, while we strive to protect
          your personal information, The Company cannot ensure or warrant the security of any information you transmit
          via the internet. By transmitting any such information to the Company, you accept that you do so at your own
          risk.
        </p>
        <h2 className="font-semibold text-lg">10. Legal Disputes</h2>
        <p className="pl-6">
          These TOU shall be governed by and construed in accordance with the laws of the State of California without
          giving effect to its conflict of laws principles. The state and federal court nearest to San Ramon, California
          shall have exclusive jurisdiction over any case or controversy arising from or relating to the Products or
          Content, including but not limited to the Company’s Privacy Policy or these TOU. By using the Products or
          Content, you hereby submit to the exclusive jurisdiction and venue of these courts and consent irrevocably to
          personal jurisdiction in such courts and waive any defense of forum non conveniens. The prevailing party in
          any dispute between the parties arising out of or related to these TOU, whether resolved by negotiation,
          mediation, or litigation, shall be entitled to recover its attorneys’ fees and costs from the other party.
        </p>
        <h2 className="font-semibold text-lg">11. Users Outside United States</h2>
        <p className="pl-6">
          The Company controls and operates the Products from offices in the United States. The Company does not
          represent that materials on the Products are appropriate or available for use in other locations. People who
          choose to access the Products from other locations do so on their own initiative and are responsible for
          compliance with local laws, if and to the extent local laws are applicable.
        </p>
        <h2 className="font-semibold text-lg">12. Indemnification</h2>
        <p className="pl-6">
          You agree to defend, indemnify, release, and hold harmless the Company and any directors, officers, agents,
          contractors, partners, assigns, successors-in-interest and its and their employees from and against any and
          all claims, damages, obligations, losses, liabilities, costs, debt and expenses (including but not limited to
          attorney’s fees) arising from or in connection with: (i) your use of the Products or Content in violation of
          these TOU, (ii) any breach by you of these TOU or any representation and warranty made by you herein, (iii)
          any comment, post, or material you submit to the Company’s website or any third-party forum or website
          operated by the Company, (iv) your use of materials or features available on the Products or Content (except
          to the extent a claim is based upon infringement of a third-party right by materials created by the Company)
          or (v) a violation by you of applicable law or any agreement or terms with a third party to which you are
          subject.
        </p>
        <h2 className="font-semibold text-lg">13. Force Majeure</h2>
        <p className="pl-6">
          The Company shall not be deemed in breach of these TOU if Company is unable to provide all of the Products or
          any portion thereof by reason of fire, earthquake, labor dispute, act of God or public enemy, epidemic,
          pandemic, death, illness or incapacity of the Company or any local, state, federal, national or international
          law, governmental order or regulation or any other event beyond Company’s control (collectively, “Force
          Majeure Event”). Upon occurrence of any Force Majeure Event, the Company shall give notice to you of its
          inability to perform or of delay in providing the Products and shall propose revisions to the schedule for
          providing the Products or other accommodations or may terminate these TOU.
        </p>
        <h2 className="font-semibold text-lg">14. General Provisions.</h2>
        <p className="pl-6">
          The Company may modify these TOU at any time. All modifications shall be posted on the Company’s website and
          participants shall be notified when accessing the course or program or via email. If any provision of these
          TOU is held invalid or unenforceable, the remainder of these TOU will remain in full force and the invalid or
          unenforceable provision will be replaced by a valid or enforceable provision. This is the entire agreement of
          the parties, and reflects a complete understanding of the parties with respect to the subject matter. These
          TOU supersede all prior written and oral representations.
        </p>
        <p>
          <strong>
            By clicking on the box when signing up for the Program, you are providing the electronic equivalent of your
            signature and assert that you have read, understood and agreed to this entire document. If you do not agree
            with these TOU, do not purchase or use the Program or Content.
          </strong>
        </p>
        <p className="py-10">Updated on April 19, 2025</p>
      </div>
      <div
        className={clsx(
          'text-xl flex gap-3 w-full px-2 py-1 rounded-md text-white',
          terms ? 'bg-green-500' : 'bg-red-500',
        )}
      >
        <input type="radio" checked={terms} onChange={() => setTerms((prev) => !prev)} />
        {`I, ${user ? user?.FullName : 'the undersigned'}, confirm that I have read, fully understand, and agree to the terms outlined in the Terms and Conditions.`}
      </div>
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
    </div>
  );
};

export default TermsAndConditions;
