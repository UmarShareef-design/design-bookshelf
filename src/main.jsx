import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useParams, useLocation, useNavigate } from 'react-router-dom'
import App from './App.jsx'
import CategoryPage from './components/CategoryPage.jsx'
import './index.css'
import './i18n';
import { useTranslation } from 'react-i18next';

const LangWrapper = ({ children }) => {
    const { lang } = useParams();
    const { i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const supportedLangs = ['en', 'ta'];
        const currentLang = lang || 'en';

        if (supportedLangs.includes(currentLang)) {
            if (i18n.language !== currentLang) {
                i18n.changeLanguage(currentLang);
            }
        } else if (lang) {
            // If lang is garbage, redirect to root or default lang
            const newPath = location.pathname.replace(`/${lang}`, '');
            navigate(newPath || '/', { replace: true });
        }
    }, [lang, i18n, navigate, location.pathname]);

    return children;
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/:lang/*" element={
                    <LangWrapper>
                        <Routes>
                            <Route path="category/:categorySlug" element={<CategoryPage />} />
                            <Route path="about" element={<App />} />
                            <Route path="/" element={<App />} />
                        </Routes>
                    </LangWrapper>
                } />
                <Route path="/*" element={
                    <LangWrapper>
                        <Routes>
                            <Route path="category/:categorySlug" element={<CategoryPage />} />
                            <Route path="about" element={<App />} />
                            <Route path="/" element={<App />} />
                        </Routes>
                    </LangWrapper>
                } />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
