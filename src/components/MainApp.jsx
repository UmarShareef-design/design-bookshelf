import React, { useEffect, useMemo } from 'react';
import { Routes, Route, useParams, useLocation } from 'react-router-dom';
import App from '../App.jsx';
import CategoryPage from './CategoryPage.jsx';
import LanguageSelectPage from './LanguageSelectPage.jsx';
import i18n from '../i18n';
import { useTranslation, I18nextProvider } from 'react-i18next';
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
    // Add initial resources so it hydrates correctly without a network request
    useMemo(() => {
        if (initialResources) {
            i18n.addResourceBundle(lang, 'translation', initialResources, true, true);
            i18n.changeLanguage(lang);
        }
    }, [initialResources, lang]);

    return (
        <I18nextProvider i18n={i18n}>
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


