import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="absolute top-4 right-4">
      <button
        onClick={() => changeLanguage('en')}
        className={`p-1 ${i18n.language === 'en' ? 'text-cyan-400 font-bold' : 'text-gray-500'}`}
      >
        EN
      </button>
      <span className="text-gray-500">/</span>
      <button
        onClick={() => changeLanguage('zh')}
        className={`p-1 ${i18n.language === 'zh' ? 'text-cyan-400 font-bold' : 'text-gray-500'}`}
      >
        中文
      </button>
    </div>
  );
};

export default LanguageSwitcher;
