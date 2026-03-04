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

        // Update i18n language based on URL
        if (supportedLangs.includes(currentLang)) {
            if (i18n.language !== currentLang) {
                i18n.changeLanguage(currentLang);
            }
        } else if (lang) {
            // Redirect garbage language paths back to root
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
                {/* Unified multi-language route structure */}
                <Route path="/:lang/*" element={<LangWrapper><AppRoutes /></LangWrapper>} />
                <Route path="/*" element={<LangWrapper><AppRoutes /></LangWrapper>} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)

// Helper component to keep rendering clean
function AppRoutes() {
    return (
        <Routes>
            <Route path="category/:categorySlug" element={<CategoryPage />} />
            <Route path="about" element={<App />} />
            <Route path="*" element={<App />} />
        </Routes>
    );
}
