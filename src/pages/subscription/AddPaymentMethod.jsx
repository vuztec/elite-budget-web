import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { handleAxiosResponseError } from '../../utils/handleResponseError';
import axios from '../../config/axios';
import Loading from '../../components/Loader';
import { useQueryClient } from 'react-query';
import useUserStore from '../../app/user';

const AddPaymentMethod = ({ handleClose, isTrial }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { setUser } = useUserStore();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js hasn't loaded yet
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
      setMessage(error.message);
      // Handle error in the UI
    } else {
      setIsLoading(true);
      // Pass the paymentMethod.id back to parent component or directly to backend
      // onPaymentMethodCreated(paymentMethod.id);
      axios
        .post('/api/payment/payment-method', { PaymentMethodId: paymentMethod.id })
        .then(({ data }) => {
          // setUser(data);
          // navigate('/');

          if (isTrial) {
            setUser(data.user);
            queryClient.setQueryData(['payment-methods'], (prev) => ({
              customer: data.customer,
              cards: [...prev?.cards, paymentMethod],
            }));
          } else
            queryClient.setQueryData(['payment-methods'], (prev) => ({
              ...prev,
              cards: [...prev.cards, paymentMethod],
            }));

          handleClose();
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          console.log(handleAxiosResponseError(err));
          setIsLoading(false);
        });
    }
  };

  const options = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="mt-2 mb-10 font-semibold flex items-center justify-center uppercase">
        Enter Card Information below
      </h1>
      <div className="border border-gray-300 rounded-md p-3">
        <CardElement options={options} />
      </div>

      <div className="mt-10 mb-2">
        {isLoading ? (
          <Loading />
        ) : (
          <button
            disabled={isLoading || !stripe || !elements}
            type="submit"
            className={'px-4 py-1 rounded-full font-semibold bg-black text-white w-full my-2'}
          >
            Add Card
          </button>
        )}
      </div>

      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default AddPaymentMethod;
