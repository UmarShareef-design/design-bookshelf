import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { SUPPORTED_LANGUAGES } from '../config';
import { Icon } from './Icons';

const LanguageSwitcher = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { lang } = useParams();

    const currentLanguage = SUPPORTED_LANGUAGES.find(l => l.code === (lang || 'en')) || SUPPORTED_LANGUAGES[0];

    const handleLanguageChange = () => {
        // Construct the path for the language selection page
        const prefix = (lang && SUPPORTED_LANGUAGES.some(l => l.code === lang) && lang !== 'en') ? `/${lang}` : '';
        navigate(`${prefix}/select-language`);
    };

    return (
        <div className="language-switcher-container">
            <button
                className="language-btn glass-effect"
                onClick={handleLanguageChange}
                title={t('common.select_language')}
            >
                <Icon id="globe" size={16} />
                <span className="lang-label">{currentLanguage.native}</span>
            </button>
        </div>
    );
};


export default LanguageSwitcher;
