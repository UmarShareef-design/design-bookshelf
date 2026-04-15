import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Language is determined at build time by Astro static paths and injected
// via window.initialI18nStore / window.initialLanguage before hydration.
// No runtime detector — this prevents React hydration error #418
// (server/client text mismatch) caused by LanguageDetector overriding
// the explicitly set lng during init().
const isClient = typeof window !== 'undefined';
let initialResources = undefined;
let initialLng = 'en';

if (isClient && window.initialI18nStore) {
    initialResources = {
        [window.initialLanguage]: {
            translation: window.initialI18nStore
        }
    };
    initialLng = window.initialLanguage;
}

const i18nConfig = {
    fallbackLng: 'en',
    lng: initialLng,
    resources: initialResources,
    interpolation: {
        escapeValue: false
    },
    initImmediate: false,
};

i18n.use(initReactI18next).init(i18nConfig);

export default i18n;

