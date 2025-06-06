import React from 'react';

const VisaCard = ({ card, handlePayment, handleDelete, isTrial, defaultId, handlePaymentMethod }) => {
  const isDefault = defaultId === card.id;

  return (
    <div
      className="bg-gradient-to-r from-blue-600 to-blue-900 p-6 pb-2 rounded-xl shadow-lg max-w-xs text-white hover:cursor-pointer"
      onClick={() => handlePayment(card)}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold tracking-wider">VISA</div>
        {defaultId === card.id && <div className="font-semibold tracking-wider italic">default</div>}
      </div>
      <div className="text-xl font-bold mb-6 tracking-widest">**** **** **** {card?.card?.last4}</div>
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xs uppercase">Expires</div>
          <div className="font-semibold tracking-wide">
            {card?.card?.exp_month}/{card?.card?.exp_year}
          </div>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
          alt="Visa Logo"
          className="w-16"
        />
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

export default VisaCard;
