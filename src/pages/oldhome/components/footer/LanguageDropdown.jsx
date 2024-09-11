import React, { useState } from 'react';

const languages = [
  {
    code: 'en',
    name: 'English (UK)',
    flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GB.svg',
  },
  {
    code: 'es',
    name: 'Spanish',
    flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ES.svg',
  },
  { code: 'fr', name: 'French', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FR.svg' },
  { code: 'de', name: 'German', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DE.svg' },
  {
    code: 'it',
    name: 'Italian',
    flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IT.svg',
  },
  {
    code: 'pt',
    name: 'Portuguese',
    flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PT.svg',
  },
  {
    code: 'zh',
    name: 'Chinese',
    flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CN.svg',
  },
  {
    code: 'ja',
    name: 'Japanese',
    flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JP.svg',
  },
  {
    code: 'ru',
    name: 'Russian',
    flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RU.svg',
  },
  { code: 'ar', name: 'Arabic', flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SA.svg' },
];

const LanguageDropdown = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const handleChange = (e) => {
    const selected = languages.find((lang) => lang.code === e.target.value);
    setSelectedLanguage(selected);
  };

  return (
    <div className="relative inline-block w-full max-w-xs">
      <div className="flex items-center gap-2 border border-gray-300 p-2 rounded-md bg-white px-6 whitespace-nowrap">
        <img src={selectedLanguage.flag} alt={selectedLanguage.name} className="w-6 h-4" />
        <span>{selectedLanguage.name}</span>
      </div>
      <select
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        value={selectedLanguage.code}
        onChange={handleChange}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageDropdown;
