import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from '../../config/axios';
import useUserStore from '../../app/user';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loader';
import { handleAxiosResponseError } from '../../utils/handleResponseError';

export default function CheckoutForm() {
  const stripe = useStripe();
  const { setUser } = useUserStore();
  const elements = useElements();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    // setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      // confirmParams: {
      //   // Make sure to change this to your payment completion page
      //   // return_url: "https://app.elitecashflowconsulting.com/packages",
      // },
      redirect: 'if_required',
    });

    if (paymentIntent?.status === 'succeeded') {
      axios
        .patch('/api/payment', { PaymentMethodId: paymentIntent.payment_method })
        .then(({ data }) => {
          setUser(data);
          navigate('/');

          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          console.log(handleAxiosResponseError(err));
          setIsLoading(false);
        });
    } else setIsLoading(false);

    if (error) {
      setMessage(error?.message);
    }
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement options={paymentElementOptions} />
      {isLoading ? (
        <Loading />
      ) : (
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className={'px-4 py-1 rounded-full font-semibold bg-black text-white w-full my-2'}
        >
          <span id="button-text">{`Pay now $${Number(7.99 * 12).toFixed(2)}`}</span>
        </button>
      )}
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
