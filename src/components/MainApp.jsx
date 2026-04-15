import React, { useEffect, useMemo } from 'react';
import { Routes, Route, useParams, useLocation } from 'react-router-dom';
import App from '../App.jsx';
import CategoryPage from './CategoryPage.jsx';
import LanguageSelectPage from './LanguageSelectPage.jsx';
import i18n from '../i18n';
import { useTranslation, I18nextProvider, initReactI18next } from 'react-i18next';
import RouterWrapper from './RouterWrapper.jsx';
import { GA_MEASUREMENT_ID, LANGUAGE_CODES } from '../config';
import { IconSymbols } from './Icons.jsx';

const PageViewTracker = () => {
    const location = useLocation();
    useEffect(() => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('config', GA_MEASUREMENT_ID, {
                page_path: location.pathname + location.search,
                page_title: document.title
            });
        }
    }, [location]);
    return null;
};

const LangWrapper = () => {
    const { lang } = useParams();
    const { i18n } = useTranslation();

    useEffect(() => {
        const targetLang = LANGUAGE_CODES.includes(lang) ? lang : 'en';

        if (i18n.language !== targetLang) {
            i18n.changeLanguage(targetLang);
        }
    }, [lang, i18n]);

    return (
        <Routes>
            <Route path="category/:categorySlug" element={<CategoryPage />} />
            <Route path="about" element={<App />} />
            <Route path="select-language" element={<LanguageSelectPage />} />
            <Route path="*" element={<App />} />
        </Routes>
    );
};

export default function MainApp({ url, initialResources, lang }) {
    // Create an isolated i18next instance per server render to prevent
    // SSG race conditions. Astro builds pages concurrently — mutating the
    // singleton via changeLanguage() causes one page's language to overwrite
    // another mid-render. We must use createInstance() (not cloneInstance())
    // because the server singleton has no resources loaded — cloning it would
    // propagate an incomplete state where t() returns keys instead of strings.
    // On the client, reuse the singleton pre-filled by i18n.js via
    // window.initialI18nStore (injected by Astro's inline script).
    const i18nInstance = useMemo(() => {
        if (typeof window === 'undefined') {
            const instance = i18n.createInstance();
            instance.use(initReactI18next).init({
                lng: lang,
                fallbackLng: 'en',
                resources: {
                    [lang]: { translation: initialResources }
                },
                initImmediate: false,
                interpolation: { escapeValue: false }
            });
            return instance;
        }
        return i18n;
    }, [initialResources, lang]);

    return (
        <I18nextProvider i18n={i18nInstance}>
            <IconSymbols />
            <RouterWrapper location={url}>
                <PageViewTracker />
                <Routes>
                    <Route path="/select-language" element={<LanguageSelectPage />} />
                    {/* Explicit English (non-prefixed) routes — must come before /:lang/* to avoid category being matched as lang */}
                    <Route path="/category/:categorySlug" element={<CategoryPage />} />
                    <Route path="/about" element={<App />} />
                    <Route path="/" element={<App />} />
                    {/* Language-prefixed routes */}
                    <Route path="/:lang/*" element={<LangWrapper />} />
                </Routes>
            </RouterWrapper>
        </I18nextProvider>
    );
}


