import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
    resources: {
      en: {
        translation: {
          nav: {
            home: 'Home',
            about: 'About',
          },
          home: {
            title: 'Hive Mind',
          },
          about: {
            title: 'About',
          },
        }
      },
      zh: {
        translation: {
          nav: {
            home: '主页',
            about: '关于',
          },
          home: {
            title: '蜂巢思维',
          },
          about: {
            title: '关于',
          },
        }
      }
    }
  });

export default i18n;
