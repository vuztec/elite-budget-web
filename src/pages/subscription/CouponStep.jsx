import React, { useState, useEffect } from 'react';
import { MdOutlinePayment } from 'react-icons/md';
import Loading from '../../components/Loader';

const CouponStep = ({ coupons, onProceed, onCancel, loading = false }) => {
  const [couponCode, setCouponCode] = useState('');
  const [coupon, setCoupon] = useState(0);
  const [stripeCoupon, setStripeCoupon] = useState('');
  const [finalAmount, setFinalAmount] = useState(0);

  const subscriptionAmount = Number(7.99 * 12);

  useEffect(() => {
    setFinalAmount(subscriptionAmount);
    if (couponCode && coupons?.data) {
      const filteredData = coupons?.data?.find((item) => item?.name?.toLowerCase() === couponCode?.toLowerCase());
      if (filteredData) {
        setStripeCoupon(filteredData?.name);
        const discount = filteredData?.amount_off
          ? Number(filteredData?.amount_off) / 100
          : (subscriptionAmount * Number(filteredData?.percent_off)) / 100;
        setCoupon(discount);
        setFinalAmount(subscriptionAmount - discount);
      } else {
        setCoupon(0);
        setFinalAmount(subscriptionAmount);
        setStripeCoupon('');
      }
    } else {
      setCoupon(0);
      setFinalAmount(subscriptionAmount);
      setStripeCoupon('');
    }
  }, [couponCode, subscriptionAmount, coupons]);

  const handleProceed = () => {
    onProceed({
      couponCode: stripeCoupon,
      discount: coupon,
      finalAmount,
    });
  };

  const handleCancel = () => {
    setCouponCode('');
    setCoupon(0);
    setStripeCoupon('');
    setFinalAmount(subscriptionAmount);
    onCancel();
  };

  return (
    <div className="p-6">
      <div className="flex flex-col mb-6 items-center justify-center">
        <h1 className="mt-2 font-semibold text-lg uppercase">Apply Coupon (Optional)</h1>
        <p className="italic text-sm text-gray-600 mt-2">Enter a coupon code to get a discount on your subscription</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Subscription Amount</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md bg-gray-50"
              disabled
              value={'$' + subscriptionAmount.toFixed(2)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Coupon Code</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code (optional)"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Discount</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md bg-gray-50"
              disabled
              value={'$' + coupon.toFixed(2)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Final Amount</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md bg-green-50 font-semibold"
              disabled
              value={'$' + finalAmount.toFixed(2)}
            />
          </div>
        </div>

        {couponCode && coupon === 0 && stripeCoupon === '' && (
          <div className="text-red-500 text-sm text-center">Invalid coupon code</div>
        )}

        {coupon > 0 && (
          <div className="text-green-600 text-sm text-center font-medium">
            Coupon applied successfully! You save ${coupon.toFixed(2)}
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleProceed}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-black text-white whitespace-nowrap rounded-lg hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loading />
            ) : (
              <>
                <MdOutlinePayment className="text-lg" />
                Proceed to Payment
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponStep;
