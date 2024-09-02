import React, { useState } from 'react';
import { handleAxiosResponseError } from '../../utils/handleResponseError';
import axios from '../../config/axios';
import Loading from '../../components/Loader';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../app/user';
import { getActiveAccount } from '../../utils/permissions';
import { getFormattedDateSubscription } from '../../utils/budget.calculation';

const ChargeCustomer = ({ card, handleClose }) => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserStore();
  const activeAccount = getActiveAccount(user);
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

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    axios
      .post('/api/payment/invoice', { PaymentMethodId: card.id })
      .then(({ data }) => {
        // setUser(data);
        navigate('/');
        console.log(data);
        handleClose();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        handleClose();
        console.log(handleAxiosResponseError(err));
        setMessage(handleAxiosResponseError(err));
        setIsLoading(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8 flex flex-col gap-y-10"
    >
      <div className="col-span-2 sm:col-span-1">
        <label className="mb-2 block text-sm font-medium text-gray-900 "> Card number* </label>
        <input
          type="text"
          disabled
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
          placeholder="xxxx-xxxx-xxxx-xxxx"
          value={`**** **** **** ${card?.card?.last4}`}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900 ">Card expiration* </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
            <svg
              className="h-4 w-4 text-gray-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            // datepicker
            disabled
            datepicker-format="mm/yy"
            type="text"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
            placeholder="12/23"
            value={`${card?.card?.exp_month}/${card?.card?.exp_year}`}
          />
        </div>
      </div>
      {user.IsExpired ? (
        <>
          {isLoading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Pay now ${Number(7.99 * 12).toFixed(2)}
            </button>
          )}
        </>
      ) : (
        <div>Subscription is still active until {activeAccount ? getFormattedDateSubscription(user, renewal) : ''}</div>
      )}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default ChargeCustomer;
