import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Landing = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <LanguageSwitcher />
      <div className="text-center">
        <h1 className="text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          {t('landing.title')}
        </h1>
        <p className="mt-4 text-lg text-gray-400">{t('landing.subtitle')}</p>
        <Link to="/experiment">
          <button className="mt-8 px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            {t('landing.button')}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
