import React from 'react';
import special from '../assets/image/special-offer.avif';
import { IoIosArrowRoundForward } from 'react-icons/io';

export const getNoData = (item) => {
  return (
    <div className="w-fit h-fit bg-white text-red-600 py-5 shadow-md rounded-2xl">
      <span className="text-xl md:text-2xl italic m-5">{`No ${item} Available!!!`}</span>
    </div>
  );
};

export const getSpecial = (isFull) => {
  const isOn = true;
  return (
    <>
      {!isOn && isFull && (
        <div className="flex flex-col gap-0 bg-[#2F2F2F] p-3 items-center rounded-lg">
          <p className="text-yellow-200 text-lg md:text-xl">Start your 14-day FREE Trial!</p>
          <p className="text-yellow-200 text-lg md:text-xl">
            After that, just $95.88 upfront for a year (only $7.99/month)
          </p>
        </div>
      )}
      {isOn && isFull && (
        <div className="flex flex-col gap-1 bg-[#2F2F2F] p-3 items-center rounded-lg">
          <div className="flex flex-col gap-0 items-center">
            <p className="text-yellow-200 text-lg md:text-xl">Start your 14-day FREE Trial!</p>
            <p className="text-yellow-200 text-lg md:text-xl">
              After that, just $<span className="font-bold text-gray-400 line-through decoration-white">95.88</span>{' '}
              upfront for a year (only $
              <span className="font-bold text-gray-400 line-through decoration-white">7.99</span>
              /month)
            </p>
            <img src={special} alt="Special Offer" className="w-24 h-auto" />
          </div>

          <div className="flex flex-col gap-0 text-white">
            <p className="bg-[#FF820E] text-lg md:text-xl rounded-md p-2">
              Launch Special: $50 for the first Year - Limited Time Only!
            </p>
            <p className="text-lg md:text-xl">Use Code: Launch2025</p>
          </div>
        </div>
      )}
      {isOn && !isFull && (
        <div className="flex flex-col text-sm md:text-lg gap-1 w-96 mb-5 p-3 items-center bg-[#2F2F2F] rounded-lg">
          <img src={special} alt="Special Offer" className="w-14 h-auto" />
          <p className="bg-[#FF820E] text-center rounded-md p-2">
            Launch Special: <span className="font-bold text-gray-200 line-through decoration-black">$95.88</span> $50
            for the First Year - Limited Time Only!
          </p>
          <p className="text-white">Use Code: Launch2025</p>
          <a
            href="/signup"
            className="flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 hover:bg-green-300 bg-tryBg text-tryText shadow-md rounded-md"
          >
            Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
          </a>
        </div>
      )}
      {!isOn && !isFull && (
        <div className="text-sm md:text-lg gap-1 w-96 mb-5 p-0">
          <a
            href="/signup"
            className="flex w-fit items-center gap-2 text-lg lg:text-xl font-medium py-3 px-4 hover:bg-green-300 bg-tryBg text-tryText shadow-md rounded-md"
          >
            Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
          </a>
        </div>
      )}
    </>
  );
};
