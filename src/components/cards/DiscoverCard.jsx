import React from 'react';
import Discover from '../../assets/discover.png';

const DiscoverCard = ({ card, handlePayment, handleDelete, isTrial, defaultId, handlePaymentMethod }) => {
  const isDefault = defaultId === card.id;

  return (
    <div
      className="bg-gradient-to-r from-orange-500 to-red-600 p-6 pb-2 rounded-xl shadow-lg max-w-xs text-white hover:cursor-pointer"
      onClick={() => handlePayment(card)}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold tracking-wider">DISCOVER</div>
        {isDefault && <div className="font-semibold tracking-wider italic">default</div>}
      </div>
      <div className="text-xl font-bold mb-6 tracking-widest">**** **** **** {card?.card?.last4}</div>
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xs uppercase">Expires</div>
          <div className="font-semibold tracking-wide">
            {' '}
            {card?.card?.exp_month}/{card?.card?.exp_year}
          </div>
        </div>
        <img src={Discover} alt="Discover Logo" className="w-16" />
      </div>
      <div onClick={(e) => e.stopPropagation()} className="flex justify-between items-center">
        <button
          className="font-bold hover:font-extrabold text-gray-300 hover:text-gray-200 pt-4"
          onClick={() => handleDelete(card)}
          disabled={isTrial && isDefault}
        >
          Delete
        </button>
        {!isDefault && (
          <button
            className="font-bold hover:font-extrabold text-gray-300 hover:text-gray-200 pt-4"
            onClick={() => handlePaymentMethod(card)}
          >
            Make Default
          </button>
        )}
      </div>
    </div>
  );
};

export default DiscoverCard;
