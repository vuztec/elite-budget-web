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
import Loading from '../../components/Loader';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const Subscription = () => {
  const { user } = useUserStore();
  const activeAccount = getActiveAccount(user);
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

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

  const options = {
    clientSecret: clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="w-full flex flex-col gap-5 xl:gap-10 bg-white p-5 mt-4  text-sm xl:text-[16px]">
      <div className="w-full xl:w-1/2 flex flex-col gap-5">
        <p className="font-bold text-[16px] xl:text-[18px]">Elite Cash Flow Consulting's Limited License to You: </p>
        <p className="text-justify">
          If you view, purchase or access any Program or any of the Content, you will be considered our Licensee. For
          the avoidance of doubt, you are granted a revocable, non-transferable license for personal, non-commercial use
          only, limited to you only. This means you may view, download, print, email and use one copy of individual
          pages of the Program and Content for your own personal purposes or your own business only.
        </p>
        <p className="font-bold text-justify">
          You may not republish, reproduce, duplicate, copy, sell, display, disclose, distribute to friends, family, or
          any other third party, or otherwise use any material from the Program or Content for commercial purposes or in
          any way that earns you or any third party money (other than by applying them generally in your own business).
        </p>
        <p className="text-justify">
          By downloading, printing, or otherwise using the Program or Content for personal use, you in no way assume any
          ownership rights of the Content – it is still the property of Elite Cash Flow Consulting. Any unauthorized use
          of any materials found in the Program or Content shall constitute infringement. You must receive our written
          permission before using any of the Program or Content for your own commercial use or before sharing with
          others.
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
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-center mb-5 -mt-3">
          {loading ? (
            <Loading />
          ) : (
            <button
              className="w-fit flex gap-3 items-center justify-center bg-black text-white hover:bg-[whitesmoke] hover:text-black px-2 py-1 rounded-full cursor-pointer"
              onClick={PayNow}
            >
              <MdOutlinePayment className="text-2xl" /> Subscribe Now
            </button>
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
    </div>
  );
};

export default Subscription;
