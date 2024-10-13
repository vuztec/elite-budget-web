import React from 'react';
import Logo from '../../assets/logo.png';
import { useSearchParams } from 'react-router-dom';

export const TermsAndConditions = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  return (
    <div className="w-full sm:w-4/6 mx-auto flex flex-col items-center justify-center text-justify bg-white p-5 xl:p-10">
      <div className="flex justify-between mb-5 bg-black px-3 py-1 rounded-full">
        <a
          href={page === 'advert' ? '/advert' : '/login'}
          className="text-sm text-white hover:text-blue-500 underline cursor-pointer"
        >
          {page === 'advert' ? 'Return to Advert' : 'Return to Login or Create Account'}
        </a>
      </div>
      <h1 className="flex items-start justify-start mb-4">
        <img src={Logo} alt="logo" className="h-8 md:h-16 lg:h-32" />
      </h1>
      <h1 className="font-bold text-xl lg:text-2xl mb-5 text-left">Terms and Conditions of Use</h1>

      <div>
        Please read these Terms and Conditions of Use (“TOU”) carefully. You must agree to these TOU before you are
        permitted to use any Elite Cash Flow Consulting digital (such as the web budget application{' '}
        <a href="https://budget.elitecashflowconsulting.com/" className="text-blue-500 hover:underline">
          www.budget.elitecashflowconsulting.com
        </a>
        ) or downloadable resources, online course, one-on-one or group coaching, class, program, workshop, training, or
        any online private forums operated by Elite Cash Flow Consulting (for any purpose), whether on a website hosted
        by Elite Cash Flow Consulting,{' '}
        <a href="https://www.elitecashflowconsulting.com/" className="text-blue-500 hover:underline">
          www.elitecashflowconsulting.com
        </a>{' '}
        or a third-party website such as an online course platform or facebook.com (collectively{' '}
        <span className="font-bold">“the Program”</span>).
      </div>

      <div className="flex flex-col w-full py-10">
        <h1 className="font-bold text-xl">If you do not agree with these TOU, you may not use the Program.</h1>
        <div>
          As used in these TOU, the term <span className="font-bold">“Releasees”</span> is defined to include the
          following: (i) Elite Cash Flow Consulting,{' '}
          <a href="https://www.elitecashflowconsulting.com/" className="text-blue-500 hover:underline">
            www.elitecashflowconsulting.com
          </a>
          ,
          <a href="https://budget.elitecashflowconsulting.com/" className="text-blue-500 hover:underline">
            www.budget.elitecashflowconsulting.com
          </a>
          , its subsidiaries, affiliated companies, owners, members, managers, directors, officers, past and present
          employees, agents, coaches, representatives, successors and assigns (collectively{' '}
          <span className="font-bold">“the Company”</span>); (ii) any Company volunteers; (iii) anyone else who will
          help out with <span className="font-bold">the Program</span> but is not an employee or contractor, such as a
          spouse or friend.
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <h2 className="font-semibold text-lg">1. Participants</h2>
        <p className="pl-6">
          NOTE TO MINORS: You acknowledge that your parent or guardian has reviewed, understood and agreed to the terms
          below. Children under the age of 13 are not permitted to use this Program. Children between the ages of 13 and
          18 must ask for their parent's or guardian's permission and agreement to these TOU before viewing our Program.
          <br />
          <br />
          NOTE TO PARENTS/GUARDIANS OF MINORS: You acknowledge that you have reviewed, understood and agreed to the
          terms of these TOU (such terms being interpreted as if they applied both to you and your minor child/ward) and
          have the legal authority to enter into these TOU on behalf of your minor child/ward.
          <br />
          <br />
          The Company reserves the right to offer additional program elements from time to time, for any subgroup of
          participants. These additional program elements are a bonus, not a part of the services included in the base
          version of the Program. The selection of the participants who may participate in any additional program
          elements is at the sole discretion of the Company.
        </p>

        <h2 className="font-semibold text-lg">2. Payment</h2>
        <p className="pl-6">
          If paying by debit card or credit card, you give us permission to automatically charge your credit or debit
          card for all fees and charges due and payable to the Company, without any additional authorization, for which
          you will receive an electronic receipt. You also agree that the Company is authorized to share any payment
          information and instructions required to complete the payment transactions with its third-party payment
          service providers (e.g., credit card transaction processing, merchant settlement, and related services).
          <br />
          <br />
          If payment is not received when due, the Company reserves the right to terminate your access to the Program
          and all Content, as defined below, immediately and permanently. You shall immediately cease using the material
          and shall destroy all copies of the information provided to you, including without limitation: video
          recordings, audio recordings, forms, template documents, slide shows, membership areas, social media groups
          limited to paying members, and other resources.
          <br />
          <br />
          If you fail to make any payment in a timely manner or voluntarily withdraw from the Program at any time or for
          any reason, you will remain fully responsible for the full cost of the Program and all payments in any payment
          plan you have chosen. The Company reserves the right to charge a late fee on all balances more than 30 days
          overdue. You agree to reimburse the Company for all collection and/or legal fees and expenses necessitated by
          lateness or default in payment.
        </p>

        <h2 className="font-semibold text-lg">3. Refunds</h2>

        <p className="pl-6">
          Your satisfaction with the Program is important to us. However, because of the extensive time, effort,
          preparation and care that goes into creating and providing the Program we have a no refund policy. Unless
          otherwise provided by law, you acknowledge that we do not offer refunds for any portion of your payment for
          any of our Program and no refunds will be provided to you at any time. By using and/or purchasing our Program,
          you understand and agree that all sales are final and no refunds will be provided.
          <br />
          <br />
          Company reserves the right, in its sole discretion, to determine how to discipline a participant who violates
          these Terms. Therefore, if a participant disagrees with how the Company disciplines another member and
          requests a refund, the Company will deny such request. Furthermore, if a participant violates these Terms, the
          Company reserves the right, in its sole discretion, to offer the participant another opportunity to abide by
          these Terms. If a participant disagrees with the Company offering another participant a second opportunity to
          follow these terms, no grounds for a participant to receive a refund would be created, and any request for a
          refund on this basis shall be denied.
          <br />
          <br />
          If, in the Company’s sole right and discretion, you persist with behaviors or actions that violate these
          Terms, the Company may terminate your access and participation in the Program without notice and without
          refund.
          <br />
          <br />
          The Company may offer additional program elements for subgroup members i.e. cancer survivors, women,
          minorities, other demographic groups. The Company reserves the right, in its sole discretion, to offer member
          participation in these additional program elements to specific members. If a member is denied participation in
          these additional program elements, no grounds for a member to receive a refund would be created and any
          request for a refund on this basis will be denied.
          <br />
          <br />
          Since we have a clear and explicit Refund Policy in these TOU that you have agreed to prior to completing the
          purchase of the Program, we do not tolerate or accept any type of chargeback threat or actual chargeback from
          your credit card company or payment processor. If a chargeback is placed on a purchase or we receive a
          chargeback threat during or after your purchase, we reserve the right to report the incident to all three
          credit reporting agencies or to any other entity for inclusion in any chargeback database or for listing as a
          delinquent account, which could have a negative impact on your credit report score. The information reported
          will include your name, email address, order date, order amount, and billing address. Chargeback abusers
          wishing to be removed from the database shall make the payment for the amount of the chargeback.
        </p>

        <h2 className="font-semibold text-lg">4. Intellectual Property Rights</h2>
        <ul className="pl-8 list-decimal list-outside">
          <li>
            <h3 className="font-bold">Ownership of the Content</h3>
            The words, videos, voice and sound recordings, training materials, design, layout, graphics, photos, images,
            information, materials, documents, data, databases and all other information and intellectual property
            accessible on or through the Company website, any third-party website the Company may use to distribute or
            host the Program, and contained in e-mails sent to you by the Company, as well as the look and feel of all
            of the foregoing <span className="font-bold">(“the Content”)</span> is property of the Company and/or our
            affiliates or licensors, unless otherwise noted, and it is protected by copyright, trademark, and other
            intellectual property laws.
          </li>
          <br />
          <li>
            {' '}
            <h3 className="font-bold">The Company’s Limited License to You</h3>
            If you view, purchase or access any Program or any of the Content, you will be considered our Licensee. For
            the avoidance of doubt, you are granted a revocable, non-transferable license for personal, non-commercial
            use only, limited to you only.
            <br />
            <br />
            <span className="italic">
              This means you may view, download, print, email and use one copy of individual pages of the Program and
              Content for your own personal purposes or your own business only.
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
            You must receive our written permission before using any of the Program or Content for your own commercial
            use or before sharing with others.
            <br />
            <br />
            The trademarks and logos displayed on the Program or Content are trademarks belonging to the Company, unless
            otherwise indicated. Any use including framing, metatags or other text utilizing these trademarks, or other
            trademarks displayed, is strictly prohibited without our written permission. All rights not expressly
            granted in these terms or any express written license, are reserved by us.{' '}
          </li>
          <br />
          <li>
            <h3 className="font-bold">Unauthorized Use</h3>
            Your use of any materials found in the Program or Content other than that expressly authorized in these TOU
            or by a separate written assignment, is not permitted (“Unauthorized Use”). You agree to pay liquidated
            damages of five (5) times the total fees paid for the Program in the event of your Unauthorized Use, or a
            minimum of $5,000 if you did not pay fees for the Program, in addition to any legal or equitable remedies
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
            By posting or submitting any material during the Program such as comments, posts, photos, designs, graphics,
            images or videos or other contributions, you are representing to us that you are the owner of all such
            materials and you are at least 18 years old. You are also granting us, and anyone authorized by us, an
            unlimited, royalty-free, perpetual, irrevocable, non-exclusive, unrestricted, worldwide license to use,
            copy, modify, transmit, sell, exploit, create derivative works from, distribute, and/or publicly perform or
            display your contributions, in whole or in part, in any manner or medium, now known or developed in the
            future, for any purpose, and granting us the right to make it part of the Company’s current or future
            Program and Content. This right includes granting us proprietary rights or intellectual property rights
            under any relevant jurisdiction without any further permission from you or compensation by us to you.
            <br />
            <br />
            You also consent to photographs, videos, and/or audio recordings, including teleconference calls, webinars,
            or other communications, that may be made by the Company during the Program that may contain you, your voice
            and/or your likeness. In the Company’s sole discretion, we reserve the right to use these photographs,
            videos, and or/audio recordings and/or any other materials submitted by you to the Company or created by the
            Company in connection with your participation in any Program, without compensation to you at any time, now
            or at any time in the future.
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
              This means you give the Company permission to use anything you submit or post in the Program or any
              third-party forum or website operated by the Company, or anything captured by the Company during your
              participation in the Program, including images in which your face is visible and recognizable.
            </span>
          </li>
          <br />
          <li>
            <h3 className="font-bold">Request for Permission to Use the Content</h3>
            If you wish to use any of the Content, or any other intellectual property or property belonging to us, you
            should request permission in writing BEFORE you use the Content by sending an e-mail to{' '}
            <span className="text-blue-500"> mailto:info@elitecashflowconsulting.com.</span>
            <br />
            <br />
            If you are granted permission by the Company, you agree to use the specific Content that the Company allows
            and only in the ways for which the Company has given you its written permission. If you choose to use the
            Content in ways that the Company does not specifically give you written permission, you agree now that you
            will be treated as if you had copied, duplicated and/or stolen such Content from us, and you consent to
            immediately stop using such Content and to take whatever actions as we may request and by the methods and in
            the time frame that we prescribe to protect our intellectual property and ownership rights in the Program
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
          You agree to keep all information you learn about other Program participants, their business, or clients (as
          applicable), strictly confidential except in very rare circumstances where disclosure is required by law.
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
              You cannot attempt to gain unauthorized access to any portion or feature of the budget web app, including
              any other systems or networks connected to the web app.
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
            <li>Sharing private and proprietary information from the Program or other participants with anyone else</li>
            <li>
              Discriminatory speech, hate speech, comments, or actions against another member based on their sex,
              gender, age, ethnicity, race, socio-economic status, disability, or other labels
            </li>
            <li>Harassing, fighting with, or being disrespectful to other participants</li>
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
          participant’s comments, posts, content or materials, however, Company does not have a duty to review all
          comments, posts, content and material shared within any online private forums or groups or on any group call.
          Therefore, Company shall not be held liable for any participant’s comments, actions, posts, content or
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
          The Company reserves the right in its sole discretion to refuse or terminate your access to the Program and
          Content, in full or in part, at any time without notice. In the event of cancellation or termination, you are
          no longer authorized to access the part of the Program or Content affected by such cancellation or
          termination. The restrictions imposed on you in these TOU with respect to the Program and its Content will
          still apply now and in the future, even after termination by you or the Company.
          <br />
          <br />
          If you would like to cancel your access and participation in the Program, you must provide the Company with
          written notice (including an e-mail to michelle@elitecashflowconsulting.com). Your access to the materials and
          Content of the Program will be immediately terminated upon your notice of cancellation. You will not be issued
          a refund for any remaining days or months of the Program after your cancellation.
          <br />
          <br />
          In the event you decide to cancel, any default, or late payments will be due immediately.
        </p>

        <h2 className="font-semibold text-lg">8. Personal Responsibility, Assumption of Risk, Release, Disclaimers</h2>
        <p className="pl-6">
          These Terms and Conditions are governed by and construed in accordance with the laws of [Your Jurisdiction],
          without regard to its conflict of law principles.
        </p>

        <ol className="ml-4 list-decimal list-inside">
          <li>
            You acknowledge that, by engaging with the Company for the Program, you voluntarily assume an element of
            inherent risk, and knowingly and freely assume all risk and responsibility for injuries to any persons or
            damages to any property, and release, covenant not to sue, and hold Releasees harmless for any and all
            liability to you, your personal representatives, assigns, heirs and next of kin, for any and all claims,
            causes of action, obligations, lawsuits, charges, complaints, controversies, damages, costs or expenses of
            whatsoever kind, nature, or description, whether direct or indirect, in law or in equity, in contract or in
            tort, or otherwise, whether known or unknown, arising out of or connected with your or your minor
            child’s/ward’s participation in the Program, whether or not caused by the active or passive negligence of
            the Releasees.
            <br />
            <br />
            In the event that the release and hold harmless provision is held unenforceable for any reason, you agree to
            limit any damages claimed to the total paid to the Company for the Program.
          </li>
          <br />
          <li>
            The Program and Content provide information and education only, and do not provide any financial, legal,
            medical or psychological services or advice. None of the Program or Content prevents, cures or treats any
            mental or medical condition. The Program and Content is not intended to be a substitute for professional
            advice that can be provided by your own accountant, lawyer, financial advisor, or medical professional. You
            are responsible for your own financial, legal, physical, mental and emotional well-being, decisions,
            choices, actions and results. You should consult with a professional if you have specific questions about
            your own unique situation. The Company disclaims any liability for your reliance on any opinions or advice
            contained in the Program.
          </li>
          <br />
          <li>
            <span className="font-bold">Earnings and Results Disclaimer.</span> You agree that Company has not made and
            does not make any representations about the earnings or results you may receive as a result of your
            participation in the Program. The Company cannot and does not guarantee that you will achieve any particular
            result or earnings from your use of the Program, and you understand that results and earnings differ for
            each individual.
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
            The Company tries to ensure that the availability and delivery of the Program and Content is uninterrupted
            and error-free. However, the Company cannot guarantee that your access will not be suspended or restricted
            from time to time, including to allow for repairs, maintenance or updates, although, of course, we will try
            to limit the frequency and duration of suspension or restriction.
          </li>
          <br />
          <li>
            THE INFORMATION, PRODUCTS AND SERVICES OFFERED ON OR THROUGH THE PROGRAM AND CONTENT ARE PROVIDED “AS IS”
            AND WITHOUT WARRANTIES OF ANY KIND EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE BY
            APPLICABLE LAW, THE COMPANY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
            IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE COMPANY DOES NOT WARRANT
            THAT THE PROGRAM OR ANY OF ITS FUNCTIONS WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE
            CORRECTED, OR THAT ANY PART OF THE WEBSITE, INCLUDING MEMBERSHIP PAGES, OR THE SERVERS THAT MAKE IT
            AVAILABLE, ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
          </li>
          <br />
          <li>
            THE COMPANY SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE
            DAMAGES THAT RESULT FROM THE USE OF, OR THE INABILITY TO USE, THE PROGRAM, INCLUDING ITS MATERIALS, PRODUCTS
            OR SERVICES, OR THIRD-PARTY MATERIALS, PRODUCTS OR SERVICES MADE AVAILABLE THROUGH THE PROGRAM.
          </li>
        </ol>

        <h2 className="font-semibold text-lg">9. Security</h2>
        <p className="pl-6">
          Security for all personally identifiable information is extremely important to us. Unfortunately, no data
          transmission over the internet can be guaranteed to be 100% secure. As a result, while we strive to protect
          your personal information, The Company cannot ensure or warrant the security of any information you transmit
          via the internet. By transmitting any such information to the Company, you accept that you do so at your own
          risk.{' '}
        </p>
        <h2 className="font-semibold text-lg">10. Legal Disputes</h2>
        <p className="pl-6">
          These TOU shall be governed by and construed in accordance with the laws of the State of California without
          giving effect to its conflict of laws principles. The state and federal court nearest to San Ramon, California
          shall have exclusive jurisdiction over any case or controversy arising from or relating to the Program or
          Content, including but not limited to the Company’s Privacy Policy or these TOU. By using the Program or
          Content, you hereby submit to the exclusive jurisdiction and venue of these courts and consent irrevocably to
          personal jurisdiction in such courts and waive any defense of forum non conveniens. The prevailing party in
          any dispute between the parties arising out of or related to these TOU, whether resolved by negotiation,
          mediation, or litigation, shall be entitled to recover its attorneys’ fees and costs from the other party.
        </p>
        <h2 className="font-semibold text-lg">11. Users Outside United States</h2>
        <p className="pl-6">
          The Company controls and operates the Program from offices in the United States. The Company does not
          represent that materials on the Program are appropriate or available for use in other locations. People who
          choose to access the Program from other locations do so on their own initiative and are responsible for
          compliance with local laws, if and to the extent local laws are applicable.{' '}
        </p>
        <h2 className="font-semibold text-lg">12. Indemnification</h2>
        <p className="pl-6">
          You agree to defend, indemnify, release, and hold harmless the Company and any directors, officers, agents,
          contractors, partners, assigns, successors-in-interest and its and their employees from and against any and
          all claims, damages, obligations, losses, liabilities, costs, debt and expenses (including but not limited to
          attorney’s fees) arising from or in connection with: (i) your use of the Program or Content in violation of
          these TOU, (ii) any breach by you of these TOU or any representation and warranty made by you herein, (iii)
          any comment, post, or material you submit to the Company’s website or any third-party forum or website
          operated by the Company, (iv) your use of materials or features available on the Program or Content (except to
          the extent a claim is based upon infringement of a third-party right by materials created by the Company) or 9
          (v) a violation by you of applicable law or any agreement or terms with a third party to which you are
          subject.{' '}
        </p>
        <h2 className="font-semibold text-lg">13. Force Majeure</h2>
        <p className="pl-6">
          The Company shall not be deemed in breach of these TOU if Company is unable to provide all of the Program or
          any portion thereof by reason of fire, earthquake, labor dispute, act of God or public enemy, epidemic,
          pandemic, death, illness or incapacity of the Company or any local, state, federal, national or international
          law, governmental order or regulation or any other event beyond Company’s control (collectively, “Force
          Majeure Event”). Upon occurrence of any Force Majeure Event, the Company shall give notice to you of its
          inability to perform or of delay in completing the Program and shall propose revisions to the schedule for
          completion of the Program or other accommodations, or may terminate these TOU.{' '}
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
        <p className="font-bold">Updated on September 24, 2024</p>
      </div>
      <div className="flex justify-between mt-10 bg-black px-3 py-1 rounded-full">
        <a
          href={page === 'advert' ? '/advert' : '/login'}
          className="text-sm text-white hover:text-blue-500 underline cursor-pointer"
        >
          {page === 'advert' ? 'Return to Advert' : 'Return to Login or Create Account'}
        </a>
      </div>
    </div>
  );
};

export default TermsAndConditions;
