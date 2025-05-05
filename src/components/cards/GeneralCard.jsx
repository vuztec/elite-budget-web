import React from 'react';

const GeneralCard = ({ card, handlePayment, handleDelete, isTrial, defaultId, handlePaymentMethod }) => {
  const isDefault = defaultId === card.id;

  return (
    <div
      className="bg-gradient-to-r from-gray-700 to-gray-900 p-6 pb-2 rounded-xl shadow-lg max-w-xs text-white hover:cursor-pointer"
      onClick={() => handlePayment(card)}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold tracking-wider">....</div>
        {isDefault && <div className="font-semibold tracking-wider italic">default</div>}
      </div>
      <div className="text-xl font-bold mb-6 tracking-widest">**** **** **** {card?.card?.last4}</div>
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xs uppercase">Expires</div>
          <div className="font-semibold tracking-wide">
            {card?.card?.exp_month}/{card?.card?.exp_year}
          </div>
        </div>
        <div className="bg-white p-2 rounded-full text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6M9 16h6m-7 4a9 9 0 1018 0 9 9 0 00-18 0z"
            />
          </svg>
        </div>
      </div>
      <div onClick={(e) => e.stopPropagation()} className="flex gap-4 justify-between items-center">
        <div>{card?.billing_details?.name}</div>
        {!isDefault ? (
          <div className="flex gap-2">
            <button
              className="font-bold hover:font-extrabold text-gray-300 hover:text-gray-200 pt-2"
              onClick={() => handleDelete(card)}
              disabled={isTrial && isDefault}
            >
              Delete
            </button>
            <button
              className="font-bold hover:font-extrabold text-gray-300 hover:text-gray-200 pt-2"
              onClick={() => handlePaymentMethod(card)}
            >
              Make Default
            </button>
          </div>
        ) : (
          <div className="h-10"></div>
        )}
      </div>
    </div>
  );
};

export default GeneralCard;
