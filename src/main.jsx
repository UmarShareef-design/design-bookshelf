import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useParams, useLocation, useNavigate } from 'react-router-dom'
import App from './App.jsx'
import CategoryPage from './components/CategoryPage.jsx'
import './index.css'
import './i18n';
import { useTranslation } from 'react-i18next';

import LanguageSelectPage from './components/LanguageSelectPage.jsx'

// This wrapper stays mounted and handles the language state sync from the URL
const LangWrapper = () => {
    const { lang } = useParams();
    const { i18n } = useTranslation();
    const location = useLocation();

    useEffect(() => {
        const supportedLangs = ['en', 'ta', 'hi', 'te', 'ml', 'kn', 'bn', 'mr', 'gu', 'pa', 'or'];
        // Determine the target language from the URL param
        // If it's not a supported language (like 'about' in '/about'), default to 'en'
        const targetLang = supportedLangs.includes(lang) ? lang : 'en';

        if (i18n.language !== targetLang) {
            console.log(`Syncing language to: ${targetLang}`);
            i18n.changeLanguage(targetLang);
        }
    }, [lang, i18n]);

    return (
        <Routes>
            <Route path="category/:categorySlug" element={<CategoryPage />} />
            {/* 
              Both /about and / (home) should render App.
              App will then internalize the routing between Home and About
              based on the full pathname.
            */}
            <Route path="about" element={<App />} />
            <Route path="select-language" element={<LanguageSelectPage />} />
            <Route path="*" element={<App />} />
        </Routes>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter basename="/">
            <Routes>
                {/* 
                  Explicit route for /select-language MUST come before /:lang/*
                  to prevent "select-language" from being consumed as a :lang param.
                */}
                <Route path="/select-language" element={<LanguageSelectPage />} />
                {/* 
                  We use two entry points to capture the optional :lang param,
                  but they both render the SAME LangWrapper instance to prevent unmounting.
                */}
                <Route path="/:lang/*" element={<LangWrapper />} />
                <Route path="*" element={<LangWrapper />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
