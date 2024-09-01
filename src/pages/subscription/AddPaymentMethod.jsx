import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { handleAxiosResponseError } from '../../utils/handleResponseError';
import axios from '../../config/axios';
import Loading from '../../components/Loader';

const AddPaymentMethod = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      // Pass the paymentMethod.id back to parent component or directly to backend
      // onPaymentMethodCreated(paymentMethod.id);
      console.log(paymentMethod);

      axios
        .post('/api/payment/payment-method', { PaymentMethodId: paymentMethod.id })
        .then(({ data }) => {
          // setUser(data);
          // navigate('/');
          console.log(data);

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
      <CardElement options={options} />

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
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default AddPaymentMethod;
