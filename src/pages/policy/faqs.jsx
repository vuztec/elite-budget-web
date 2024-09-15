import React from 'react';
import Logo from '../../assets/logo.png';
import { useSearchParams } from 'react-router-dom';

export const Faqs = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');

  return (
    <div className="w-full xl:w-1/2 flex flex-col items-center justify-center text-justify bg-white p-5 xl:p-10">
      <div className="flex justify-between mb-10 bg-black px-3 py-1 rounded-full">
        <a
          href={page === 'advert' ? '/advert' : '/login'}
          className="text-sm text-white hover:text-blue-500 underline cursor-pointer"
        >
          Return to Login or Create Account
        </a>
      </div>
      <h1 className="flex items-start justify-start mb-4">
        <img src={Logo} alt="logo" className="h-8 md:h-16 lg:h-32" />
      </h1>
      <h1 className="font-bold text-xl lg:text-2xl mb-5 text-left">FAQs for "budget.elitecashflowconsulting.com"</h1>

      <div className="flex justify-between mt-10 bg-black px-3 py-1 rounded-full">
        <a href="/login" className="text-sm text-white hover:text-blue-500 underline cursor-pointer">
          Return to Login or Create Account
        </a>
      </div>
    </div>
  );
};

export default Faqs;
