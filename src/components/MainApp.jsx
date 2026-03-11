import React, { useEffect } from 'react';
import { Routes, Route, useParams, useLocation } from 'react-router-dom';
import App from '../App.jsx';
import CategoryPage from './CategoryPage.jsx';
import LanguageSelectPage from './LanguageSelectPage.jsx';
import '../i18n';
import { useTranslation } from 'react-i18next';
import RouterWrapper from './RouterWrapper.jsx';
import { GA_MEASUREMENT_ID } from '../config';

const LangWrapper = () => {
    const { lang } = useParams();
    const { i18n } = useTranslation();
    const location = useLocation();

    useEffect(() => {
        const supportedLangs = ['en', 'ta', 'hi', 'te', 'ml', 'kn', 'bn', 'mr', 'gu', 'pa', 'or'];
        const targetLang = supportedLangs.includes(lang) ? lang : 'en';

        if (i18n.language !== targetLang) {
            i18n.changeLanguage(targetLang);
        }
    }, [lang, i18n]);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('config', GA_MEASUREMENT_ID, {
                page_path: location.pathname + location.search,
                page_title: document.title
            });
        }
    }, [location]);

    return (
        <Routes>
            <Route path="category/:categorySlug" element={<CategoryPage />} />
            <Route path="about" element={<App />} />
            <Route path="select-language" element={<LanguageSelectPage />} />
            <Route path="*" element={<App />} />
        </Routes>
    );
};

export default function MainApp({ url }) {
    return (
        <RouterWrapper location={url}>
            <Routes>
                <Route path="/select-language" element={<LanguageSelectPage />} />
                <Route path="/:lang/*" element={<LangWrapper />} />
                <Route path="*" element={<LangWrapper />} />
            </Routes>
        </RouterWrapper>
    );
}
