import React, { useState } from 'react';

const currencies = [
  {
    code: 'USD',
    name: 'United States Dollar',
    symbol: '$',
    flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/US.svg',
  },
  {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EU.svg',
  }, // EU flag for Euro
  {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GB.svg',
  },
  {
    code: 'JPY',
    name: 'Japanese Yen',
    symbol: '¥',
    flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JP.svg',
  },
  {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: 'A$',
    flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AU.svg',
  },
  {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'C$',
    flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CA.svg',
  },
  {
    code: 'CHF',
    name: 'Swiss Franc',
    symbol: 'CHF',
    flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CH.svg',
  },
  {
    code: 'CNY',
    name: 'Chinese Yuan',
    symbol: '¥',
    flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CN.svg',
  },
  {
    code: 'SEK',
    name: 'Swedish Krona',
    symbol: 'kr',
    flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SE.svg',
  },
  {
    code: 'NZD',
    name: 'New Zealand Dollar',
    symbol: 'NZ$',
    flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NZ.svg',
  },
];

function CurrencyDropdown() {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]); // Fix here

  const handleChange = (e) => {
    const selected = currencies.find((currency) => currency.code === e.target.value);
    setSelectedCurrency(selected);
  };

  return (
    <div className="relative inline-block w-full max-w-xs">
      <div className="flex items-center gap-2 border border-gray-300 p-2 rounded-md bg-white whitespace-nowrap px-6">
        <img src={selectedCurrency.flag} alt={selectedCurrency.name} className="w-6 h-4" />
        <span>{selectedCurrency.name}</span>
      </div>
      <select
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        value={selectedCurrency.code}
        onChange={handleChange}
      >
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyDropdown;
