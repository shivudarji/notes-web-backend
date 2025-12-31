import i18next from 'i18next';
import en from './locales/en';

i18next.init({
  lng: 'en',
  resources: {
    en: {
      translation: en,
    },
  },
});

export default i18next.t.bind(i18next) as any;
