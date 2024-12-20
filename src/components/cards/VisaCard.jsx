import React from 'react';

const VisaCard = ({ card, handlePayment, handleDelete }) => {
  return (
    <div
      className="bg-gradient-to-r from-blue-600 to-blue-900 p-6 pb-2 rounded-xl shadow-lg max-w-xs text-white hover:cursor-pointer"
      onClick={() => handlePayment(card)}
    >
      <div className="text-lg font-semibold tracking-wider mb-4">VISA</div>
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
      <div onClick={(e) => e.stopPropagation()}>
        <button
          className="font-bold hover:font-extrabold text-gray-300 hover:text-gray-200 pt-4"
          onClick={() => handleDelete(card)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default VisaCard;
