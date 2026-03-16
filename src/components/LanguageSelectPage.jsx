import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { SUPPORTED_LANGUAGES } from '../config';
import { Icon } from './Icons';

const LanguageSelectPage = () => {
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const currentLangCode = i18n.language || 'en';

    const handleLanguageChange = (lng) => {
        // Track Language Change Event
        if (window.gtag) {
            window.gtag('event', 'language_select', {
                'selected_language': lng,
                'previous_language': i18n.language
            });
        }

        // Change language state
        i18n.changeLanguage(lng).then(() => {
            // Navigate back to home or the previous page with the new language prefix
            const newPath = lng === 'en' ? '/' : `/${lng}/`;
            navigate(newPath);
        });
    };

    return (
        <div className="language-page-container">
            <div className="language-page-content">
                <header className="language-page-header">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <Icon id="arrow-left" size={24} />
                    </button>
                    <h1 className="animate-in">{t('common.select_language')}</h1>
                    <p className="language-page-subtitle animate-in delay-1">{t('common.language_subtitle')}</p>
                </header>

                <div className="language-grid">
                    {SUPPORTED_LANGUAGES.map((lng, index) => (
                        <button
                            key={lng.code}
                            className={`language-card glass-effect animate-in ${currentLangCode === lng.code ? 'active' : ''}`}
                            style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                            onClick={() => handleLanguageChange(lng.code)}
                        >
                            <div className="language-card-info">
                                <span className="native-name">{lng.native}</span>
                                <span className="english-name">{lng.name}</span>
                            </div>
                            {currentLangCode === lng.code && (
                                <div className="selected-indicator">
                                    <Icon id="check" size={14} />
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                <div className="language-page-footer animate-in" style={{ animationDelay: `${0.2 + SUPPORTED_LANGUAGES.length * 0.05}s` }}>
                    <Icon id="globe" size={48} className="footer-icon" />
                    <p>{t('common.footer_text')}</p>
                </div>
            </div>
        </div>
    );
};


export default LanguageSelectPage;

