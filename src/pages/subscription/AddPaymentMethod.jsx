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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const queryClient = useQueryClient();
  const { setUser } = useUserStore();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name,
        email,
      },
    });

    if (error) {
      console.error(error);
      setMessage(error.message);
    } else {
      setIsLoading(true);
      axios
        .post('/api/payment/payment-method', {
          PaymentMethodId: paymentMethod.id,
        })
        .then(({ data }) => {
          if (isTrial) {
            setUser(data.user);
            queryClient.setQueryData(['payment-methods'], (prev) => ({
              customer: data.customer,
              cards: [...(prev?.cards || []), paymentMethod],
            }));
          } else {
            queryClient.setQueryData(['payment-methods'], (prev) => ({
              ...prev,
              cards: [...(prev?.cards || []), paymentMethod],
            }));
          }

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
        '::placeholder': { color: '#aab7c4' },
      },
      invalid: { color: '#fa755a', iconColor: '#fa755a' },
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="mt-2 mb-10 font-semibold flex items-center justify-center uppercase">
        Enter Card Information below
      </h1>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Card Information (Number, Expiry, CVC)</label>
        <div className="border border-gray-300 rounded-md p-3">
          <CardElement options={options} />
        </div>
      </div>

      <div className="mt-10 mb-2">
        {isLoading ? (
          <Loading />
        ) : (
          <button
            disabled={isLoading || !stripe || !elements}
            type="submit"
            className="px-4 py-1 rounded-full font-semibold bg-black text-white w-full my-2"
          >
            Add Card
          </button>
        )}
      </div>

      {message && (
        <div id="payment-message" className="text-red-500 text-sm">
          {message}
        </div>
      )}
    </form>
  );
};

export default AddPaymentMethod;
