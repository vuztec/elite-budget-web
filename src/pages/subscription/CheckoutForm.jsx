import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from '../../config/axios';
import useUserStore from '../../app/user';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loader';
import { handleAxiosResponseError } from '../../utils/handleResponseError';

export default function CheckoutForm({ paymentData, couponData }) {
  const stripe = useStripe();
  const { setUser } = useUserStore();
  const elements = useElements();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate display amount from payment data or fallback to default
  const displayAmount = paymentData?.amount ? (paymentData.amount / 100).toFixed(2) : (7.99 * 12).toFixed(2);
  const originalAmount = paymentData?.originalAmount
    ? (paymentData.originalAmount / 100).toFixed(2)
    : (7.99 * 12).toFixed(2);

  // Check if discount is applied - either from backend paymentData or frontend couponData
  const hasDiscount =
    (paymentData?.appliedCoupon && paymentData.appliedCoupon.valid) ||
    (couponData?.discount && couponData.discount > 0) ||
    (couponData?.couponCode && couponData.couponCode !== '');

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
        .patch('/api/payment')
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
      {/* Payment Summary */}
      {hasDiscount && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-sm font-semibold text-green-800 mb-2">Payment Summary</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subscription Amount:</span>
              <span>${originalAmount}</span>
            </div>
            {/* Show coupon discount - prefer backend data, fallback to frontend */}
            {(paymentData?.appliedCoupon || couponData?.couponCode) && (
              <div className="flex justify-between text-green-700">
                <span>Coupon ({paymentData?.appliedCoupon?.name || couponData?.couponCode}):</span>
                <span>
                  -$
                  {paymentData?.appliedCoupon
                    ? ((paymentData.originalAmount - paymentData.amount) / 100).toFixed(2)
                    : (couponData?.discount || 0).toFixed(2)}
                </span>
              </div>
            )}
            <hr className="border-green-300" />
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>${displayAmount}</span>
            </div>
          </div>
        </div>
      )}

      <PaymentElement options={paymentElementOptions} />
      {isLoading ? (
        <Loading />
      ) : (
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className={'px-4 py-1 rounded-full font-semibold bg-black text-white w-full my-2'}
        >
          <span id="button-text">{hasDiscount ? `Pay $${displayAmount} ` : `Pay now $${displayAmount}`}</span>
        </button>
      )}
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
