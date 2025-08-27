import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { handleAxiosResponseError } from '../../utils/handleResponseError';
import axios from '../../config/axios';
import Loading from '../../components/Loader';
import { useQuery, useQueryClient } from 'react-query';
import useUserStore from '../../app/user';
import { getCoupons } from '../../config/api';

const AddPaymentMethod = ({ handleClose, isTrial }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const queryClient = useQueryClient();
  const { setUser } = useUserStore();

  const { data: coupons, status: isCouponLoaded } = useQuery({
    queryKey: ['coupons'],
    queryFn: getCoupons,
    staleTime: 1000 * 60 * 60,
  });

  const [coupon, setCoupon] = useState(0);
  const subscriptionAmount = Number(7.99 * 12);
  const [finalAmount, setFinalAmount] = useState(subscriptionAmount);

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

    // const CouponCode = useWatch({ control, name: 'Coupon' });
    //   useEffect(() => {
    //     if (CouponCode) {
    //       const filteredData = coupons?.data?.find((item) => item?.name === CouponCode);
    //       if (filteredData) {
    //         const discount = filteredData?.amount_off
    //           ? Number(filteredData?.amount_off) / 100
    //           : (subscriptionAmount * Number(filteredData?.percent_off)) / 100;
    //         setCoupon(discount);
    //         setFinalAmount(subscriptionAmount - discount);
    //       } else {
    //         setCoupon(0);
    //         setFinalAmount(subscriptionAmount);
    //       }
    //     }
    //   }, [CouponCode, subscriptionAmount]);

    if (error) {
      console.error(error);
      setMessage(error.message);
    } else {
      setIsLoading(true);
      axios
        .post('/api/payment/payment-method', {
          PaymentMethodId: paymentMethod.id,
          isTrial: isTrial,
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
      <div className="flex flex-col mb-10 items-center justify-center">
        <h1 className="mt-2 font-semibold  uppercase">Enter Card Information below</h1>
        <p className="italic text-xs text-red-500">
          {isTrial ? 'Your card will not be charged during the 14-day free trial' : ''}
        </p>
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Joe Bright"
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
          placeholder="joe@company.com"
          required
        />
      </div>

      {/* <div className="flex flex-col gap-6 w-full">
                              <div className="flex flex-col md:flex-row gap-6 w-full">
                                <div className="w-full">
                                  <Textbox
                                    placeholder={'$' + subscriptionAmount.toFixed(2)}
                                    type="text"
                                    label="Annual Subscription"
                                    disabled={true}
                                    className="w-full rounded"
                                  />
                                </div>
                                <div className="w-full">
                                  <Textbox
                                    placeholder="Enter a valid coupon code"
                                    type="text"
                                    name="Coupon"
                                    label="Coupon Code"
                                    className="w-full rounded"
                                    register={register('Coupon')}
                                    error={errors.Coupon ? errors.Coupon.message : ''}
                                  />
                                </div>
                              </div>
      
                              <div className="flex flex-col md:flex-row gap-6 w-full">
                                <div className="w-full">
                                  <Textbox
                                    placeholder={'$' + coupon.toFixed(2)}
                                    type="text"
                                    label="Coupon Discount"
                                    disabled={true}
                                    className="w-full rounded"
                                  />
                                </div>
                                <div className="w-full">
                                  <Textbox
                                    placeholder={'$' + finalAmount.toFixed(2)}
                                    type="text"
                                    label="Discounted Amount"
                                    disabled={true}
                                    className="w-full rounded"
                                  />
                                </div>
                              </div>
                            </div> */}

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Card Information (Number, Expiry Date, CVC)
        </label>
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
