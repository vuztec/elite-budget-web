import React, { useState } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { BsFillBagCheckFill } from 'react-icons/bs';
import ModalWrapper from '../components/ModalWrapper';
import { Elements } from '@stripe/react-stripe-js';
import AddPaymentMethod from '../pages/subscription/AddPaymentMethod';
import useUserStore from '../app/user';
import { loadStripe } from '@stripe/stripe-js';
import { isLeapYear } from 'date-fns';
import { MdOutlinePayment } from 'react-icons/md';
import clsx from 'clsx';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const Package = () => {
  const { user } = useUserStore();

  const [openPayment, setOpenPayment] = useState(false);

  const today = new Date();
  const subscription = user?.SubscribeDate ? new Date(user?.SubscribeDate) : '';
  const todayYear = today.getFullYear();
  const subscriptionYear = user?.SubscribeDate ? subscription.getFullYear() : '';
  let totalDaysInYears = 0;

  // Calculate total days in subscription years
  for (let year = subscriptionYear; year <= todayYear; year++) {
    totalDaysInYears += isLeapYear(year) ? 366 : 365;
  }
  // Calculate the renewal date
  const currentDate = new Date();
  const trialEnd = new Date(new Date(user?.CreatedAt).setDate(new Date(user?.CreatedAt).getDate() + 14));
  // const isTrial = !subscription || currentDate <= trialEnd;
  const isTrial = false;

  const navigate = useNavigate();

  const handleClosePaymentMethod = () => {
    setOpenPayment(false);
  };

  const viewSubscription = () => {
    if (isTrial) setOpenPayment(true);
    else navigate('/subscription');
  };
  return (
    <div className="text-xl flex flex-col items-center justify-center p-5 bg-white">
      <p className="flex flex-col items-center justify-center font-bold text-red-500">
        {isTrial ? (
          <div className="flex flex-col items-center justify-center mb-5 text-black">
            <h1>Please add your credit card to activate your 14-day free trial</h1>
            <p className="italic text-xs text-red-500 p-1 rounded-md">
              Your card will not be charged during the 14-day free trial.
            </p>
            <p className="italic text-xs text-red-500 p-1 rounded-md">
              Billing will only occur after the trial period if you choose to continue your subscription.
            </p>
            <p className="italic text-xs text-red-500 p-1 rounded-md">
              You can review your renewal details under the Subscription tab.
            </p>
          </div>
        ) : (
          'Please subscribe to activate'
        )}
      </p>

      <div className="flex flex-col items-center gap-1 pt-3">
        {isTrial ? (
          <Button
            label="Add Card to Activate"
            icon={<MdOutlinePayment className="text-sm md:text-lg" />}
            className="w-fit flex gap-3 items-center justify-center bg-black text-white hover:bg-[whitesmoke] hover:text-black px-2 py-1 rounded-full cursor-pointer"
            onClick={() => viewSubscription()}
          />
        ) : (
          <Button
            label="Subscribe"
            icon={<BsFillBagCheckFill className="text-sm md:text-lg" />}
            className="w-fit flex gap-3 items-center justify-center bg-black text-white hover:bg-[whitesmoke] hover:text-black px-2 py-1 rounded-full cursor-pointer"
            onClick={() => viewSubscription()}
          />
        )}
      </div>
      <ModalWrapper open={openPayment} handleClose={handleClosePaymentMethod}>
        <Elements stripe={stripePromise}>
          <AddPaymentMethod handleClose={handleClosePaymentMethod} isTrial={isTrial} />
        </Elements>
      </ModalWrapper>
    </div>
  );
};

export default Package;
