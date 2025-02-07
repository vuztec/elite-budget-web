import React, { useState } from 'react';
import useUserStore from '../../app/user';
import { getActiveAccount } from '../../utils/permissions';
import { getFormattedDateSubscription } from '../../utils/budget.calculation';
import { MdOutlinePayment } from 'react-icons/md';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from '../../config/axios';
import ModalWrapper from '../../components/ModalWrapper';
import CheckoutForm from './CheckoutForm';
import './Package.css';
import { getPaymentMethods } from '../../config/api';
import { useQuery, useQueryClient } from 'react-query';
import AddPaymentMethod from './AddPaymentMethod';
import ChargeCustomer from './ChargeCustomer';
import Mastercard from '../../components/cards/MasterCard';
import VisaCard from '../../components/cards/VisaCard';
import GeneralCard from '../../components/cards/GeneralCard';
import DiscoverCard from '../../components/cards/DiscoverCard';
import AmexCard from '../../components/cards/AmericanCard';
import ConfirmationDialog from '../../components/Dialogs';
import { handleAxiosResponseError } from '../../utils/handleResponseError';
import Loading from '../../components/Loader';
import { getPageCopyright, getPageTitle } from '../../utils';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const Subscription = () => {
  const { user, setUser } = useUserStore();
  const activeAccount = getActiveAccount(user);
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openCharge, setOpenCharge] = useState(false);
  const [card, setCard] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(user?.Auto_Renewal);

  const queryClient = useQueryClient();

  const { data: paymentmethods, status: isPaymentMethodLoaded } = useQuery({
    queryKey: ['payment-methods'],
    queryFn: getPaymentMethods,
    staleTime: 1000 * 60 * 60,
  });

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  // console.log(paymentmethods);

  const today = new Date();
  const subscription = new Date(user?.SubscribeDate);
  const todayYear = today.getFullYear();
  const subscriptionYear = subscription.getFullYear();
  let totalDaysInYears = 0;

  // Calculate total days in subscription years
  for (let year = subscriptionYear; year <= todayYear; year++) {
    totalDaysInYears += isLeapYear(year) ? 366 : 365;
  }
  // Calculate the renewal date
  const renewal = new Date(subscription.getTime() + totalDaysInYears * 24 * 60 * 60 * 1000);

  const PayNow = () => {
    setLoading(true);
    axios
      .post('/api/payment')
      .then(({ data }) => {
        setClientSecret(data.client_secret);
        setOpen(() => true);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const deleteHandler = () => {
    setIsDeleteLoading(true);
    axios
      .delete('/api/payment/payment-method/' + card.id)
      .then(({ data }) => {
        queryClient.setQueryData(['payment-methods'], (prev) => prev.filter((method) => method.id !== card.id));
        setDeleteOpen(() => false);
        setIsDeleteLoading(false);
      })
      .catch((err) => {
        setIsDeleteLoading(false);
        console.log(err);
      });
  };

  const options = {
    clientSecret: clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClosePaymentMethod = () => {
    setOpenPayment(false);
  };

  const handlePayment = (card) => {
    setCard(card);
    setOpenCharge(true);
  };

  const handlePaymentClose = () => {
    setOpenCharge(false);
    setCard(null);
  };

  const handleDelete = (item) => {
    setDeleteOpen(true);
    setCard(item);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    axios
      .patch('/api/rootusers/renewal', { Auto_Renewal: !isChecked })
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
        console.log(handleAxiosResponseError(err));
      });
  };

  return (
    <>
      <div className="">
        <div className="hidden md:block">
          <div className="w-full gap-4 h-10 md:h-12 px-2 rounded-full bg-white flex items-center justify-between">
            <div></div>
            <div>{getPageTitle('Subscription', user)}</div>
            <div></div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-5 xl:gap-10 bg-white p-5 mt-4  text-sm xl:text-[16px] rounded-lg">
          <div className="w-full xl:w-1/2 flex flex-col gap-5">
            <p className="font-bold text-[16px] xl:text-[18px]">
              Elite Cash Flow Consulting's Limited License to You:{' '}
            </p>
            <p className="text-justify">
              If you view, purchase or access any Program or any of the Content, you will be considered our Licensee.
              For the avoidance of doubt, you are granted a revocable, non-transferable license for personal,
              non-commercial use only, limited to you only. This means you may view, download, print, email and use one
              copy of individual pages of the Program and Content for your own personal purposes or your own business
              only.
            </p>
            <p className="font-bold text-justify">
              You may not republish, reproduce, duplicate, copy, sell, display, disclose, distribute to friends, family,
              or any other third party, or otherwise use any material from the Program or Content for commercial
              purposes or in any way that earns you or any third party money (other than by applying them generally in
              your own business).
            </p>
            <p className="text-justify">
              By downloading, printing, or otherwise using the Program or Content for personal use, you in no way assume
              any ownership rights of the Content – it is still the property of Elite Cash Flow Consulting. Any
              unauthorized use of any materials found in the Program or Content shall constitute infringement. You must
              receive our written permission before using any of the Program or Content for your own commercial use or
              before sharing with others.
            </p>
          </div>
          <div className="w-full xl:w-1/2 flex flex-col gap-5">
            <p className="font-bold text-[16px] xl:text-[18px]">Price and Status</p>
            <div className="w-full overflow-x-auto">
              <table className="w-[97%] mb-5">
                <tbody className="border border-gray-300 text-sm xl:text-[16px] text-left">
                  <tr className="border-b border-gray">
                    <td className="min-w-fit whitespace-nowrap p-2">License Type</td>
                    <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200 font-bold">Full Access</td>
                  </tr>
                  <tr className="border-b border-gray">
                    <td className="min-w-fit whitespace-nowrap p-2">Monthly Subscription</td>
                    <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200 font-bold">
                      <div className="flex items-start gap-2">
                        <p className=""> $7.99 per month</p>
                        <p className="italic">(Billed Annually)</p>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray">
                    <td className="min-w-fit whitespace-nowrap p-2">Status</td>
                    <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200 font-bold">
                      <p>{activeAccount ? 'Active' : 'In-Active'}</p>
                    </td>
                  </tr>
                  <tr className="border-b border-gray">
                    <td className="min-w-fit whitespace-nowrap p-2">Subscription Date</td>
                    <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200 font-bold">
                      {activeAccount ? getFormattedDateSubscription(user, subscription) : ''}
                    </td>
                  </tr>
                  <tr>
                    <td className="min-w-fit whitespace-nowrap p-2">Renewal Date</td>
                    <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200 font-bold">
                      {activeAccount ? getFormattedDateSubscription(user, renewal) : ''}
                    </td>
                  </tr>
                  <tr>
                    <td className="min-w-fit whitespace-nowrap p-2">Auto Renewal</td>
                    <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200 font-bold">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="-mt-5 flex gap-2">
              <p className="italic font-bold">Note:</p>
              <p className="italic">For manual payment or renewal, click the card to pay.</p>
            </div>

            <div className="flex flex-wrap gap-6">
              {paymentmethods?.map((item, index) => {
                if (item.card.brand === 'visa')
                  return <VisaCard card={item} key={index} handlePayment={handlePayment} handleDelete={handleDelete} />;
                else if (item.card.brand === 'mastercard')
                  return (
                    <Mastercard card={item} key={index} handlePayment={handlePayment} handleDelete={handleDelete} />
                  );
                else if (item.card.brand === 'discover')
                  return (
                    <DiscoverCard card={item} key={index} handlePayment={handlePayment} handleDelete={handleDelete} />
                  );
                else if (item.card.brand === 'amex')
                  return <AmexCard card={item} key={index} handlePayment={handlePayment} handleDelete={handleDelete} />;
                else
                  return (
                    <GeneralCard card={item} key={index} handlePayment={handlePayment} handleDelete={handleDelete} />
                  );
              })}
            </div>
            <div className="flex items-center justify-center mb-5 -mt-3">
              {loading ? (
                <Loading />
              ) : (
                <div className="flex gap-5">
                  <button
                    className="w-fit flex gap-3 items-center justify-center bg-black text-white hover:bg-[whitesmoke] hover:text-black px-2 py-1 rounded-full cursor-pointer"
                    onClick={PayNow}
                  >
                    <MdOutlinePayment className="text-2xl" /> Subscribe Now
                  </button>
                  <button
                    className="w-fit flex gap-3 items-center justify-center bg-black text-white hover:bg-[whitesmoke] hover:text-black px-2 py-1 rounded-full cursor-pointer"
                    onClick={() => setOpenPayment(true)}
                  >
                    <MdOutlinePayment className="text-2xl" /> Add Card
                  </button>
                </div>
              )}
            </div>
          </div>

          <ModalWrapper open={open} handleClose={handleClose}>
            {clientSecret && (
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
              </Elements>
            )}
          </ModalWrapper>
          <ModalWrapper open={openPayment} handleClose={handleClosePaymentMethod}>
            <Elements stripe={stripePromise}>
              <AddPaymentMethod handleClose={handleClosePaymentMethod} />
            </Elements>
          </ModalWrapper>

          <ModalWrapper open={openCharge} handleClose={handlePaymentClose}>
            <ChargeCustomer card={card} handleClose={handlePaymentClose} />
          </ModalWrapper>

          <ConfirmationDialog
            isLoading={isDeleteLoading}
            open={deleteOpen}
            setOpen={setDeleteOpen}
            msg={'Do you want to delete your card?'}
            buttonText={'Yes'}
            onClick={() => deleteHandler()}
          />
        </div>
      </div>
      <div className="w-full bg-white rounded-lg border-t mt-8 p-6 text-center justify-center">
        <p>{getPageCopyright()}</p>
      </div>
    </>
  );
};

export default Subscription;
