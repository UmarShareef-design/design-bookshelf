import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// Grab initial translations injected by Astro before React hydrates.
// This ensures i18next has translations synchronously on first render,
// preventing React hydration error #418 (server/client text mismatch).
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
    detection: {
        // htmlTag matches the server-rendered <html lang> to avoid hydration mismatches;
        // path is a secondary fallback for dev-mode HMR edge cases.
        order: ['htmlTag', 'path'],
        lookupFromPathIndex: 0,
        caches: []
    },
};

if (isClient) {
    i18n.use(LanguageDetector);
}

i18n.use(initReactI18next).init(i18nConfig);

export default i18n;

