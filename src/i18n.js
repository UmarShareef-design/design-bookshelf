import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

const i18nConfig = {
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    },
    detection: {
        order: ['path', 'localStorage', 'navigator'],
        lookupFromPathIndex: 0,
        caches: ['localStorage']
    },
    backend: {
        loadPath: '/locales/{{lng}}.json',
    }
};

if (typeof window !== 'undefined') {
    i18n.use(Backend).use(LanguageDetector);
}

i18n.use(initReactI18next).init(i18nConfig);

export default i18n;

