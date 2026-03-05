import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const LanguageSwitcher = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { lang } = useParams();

    const languages = [
        { code: 'en', name: 'English', native: 'English' },
        { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
        { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
        { code: 'te', name: 'Telugu', native: 'తెలుగు' },
        { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
        { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
        { code: 'bn', name: 'Bengali', native: 'বাংলা' },
        { code: 'mr', name: 'Marathi', native: 'मराठी' },
        { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
        { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
        { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' }
    ];

    const currentLanguage = languages.find(l => l.code === (lang || 'en')) || languages[0];

    const handleLanguageChange = () => {
        // Construct the path for the language selection page
        const prefix = (lang && languages.some(l => l.code === lang) && lang !== 'en') ? `/${lang}` : '';
        navigate(`${prefix}/select-language`);
    };

    return (
        <div className="language-switcher-container">
            <button
                className="language-btn glass-effect"
                onClick={handleLanguageChange}
                title={t('common.select_language')}
            >
                <Globe size={16} />
                <span className="lang-label">{currentLanguage.native}</span>
            </button>
        </div>
    );
};

export default LanguageSwitcher;
