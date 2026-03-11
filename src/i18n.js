import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import en from './i18n/locales/en.json';
import ta from './i18n/locales/ta.json';
import hi from './i18n/locales/hi.json';
import te from './i18n/locales/te.json';
import ml from './i18n/locales/ml.json';
import kn from './i18n/locales/kn.json';
import bn from './i18n/locales/bn.json';
import mr from './i18n/locales/mr.json';
import gu from './i18n/locales/gu.json';
import pa from './i18n/locales/pa.json';
import or from './i18n/locales/or.json';

const resources = {
    en: { translation: en },
    ta: { translation: ta },
    hi: { translation: hi },
    te: { translation: te },
    ml: { translation: ml },
    kn: { translation: kn },
    bn: { translation: bn },
    mr: { translation: mr },
    gu: { translation: gu },
    pa: { translation: pa },
    or: { translation: or }
};

const i18nConfig = {
    resources,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    },
    detection: {
        order: ['path', 'localStorage', 'navigator'],
        lookupFromPathIndex: 0,
        caches: ['localStorage']
    }
};

if (typeof window !== 'undefined') {
    i18n.use(LanguageDetector);
}

i18n.use(initReactI18next).init(i18nConfig);

export { resources };
export default i18n;
