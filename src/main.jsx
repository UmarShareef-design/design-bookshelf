import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useParams, useLocation, useNavigate } from 'react-router-dom'
import App from './App.jsx'
import CategoryPage from './components/CategoryPage.jsx'
import './index.css'
import './i18n';
import { useTranslation } from 'react-i18next';

// This wrapper stays mounted and handles the language state sync from the URL
const LangWrapper = () => {
    const { lang } = useParams();
    const { i18n } = useTranslation();

    useEffect(() => {
        const supportedLangs = ['en', 'ta'];
        const targetLang = lang || 'en';

        if (supportedLangs.includes(targetLang)) {
            if (i18n.language !== targetLang) {
                console.log(`Syncing language to: ${targetLang}`);
                i18n.changeLanguage(targetLang);
            }
        }
    }, [lang, i18n]);

    return (
        <Routes>
            <Route path="category/:categorySlug" element={<CategoryPage />} />
            <Route path="about" element={<App />} />
            <Route path="*" element={<App />} />
        </Routes>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter basename="/">
            <Routes>
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
