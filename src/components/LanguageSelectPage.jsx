import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Check } from 'lucide-react';

const LanguageSelectPage = () => {
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

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

    const currentLangCode = i18n.language || 'en';

    const handleLanguageChange = (lng) => {
        // Change language state
        i18n.changeLanguage(lng).then(() => {
            // Navigate back to home or the previous page with the new language prefix
            // We'll just go home for simplicity, or we could try to preserve the page.
            // Let's try to preserve the page if possible.

            // Note: Since we are on /select-language, we don't have a direct "previous path" 
            // easily accessible without state. Let's redirect to the home page with the new lang.
            const newPath = lng === 'en' ? '/' : `/${lng}/`;
            navigate(newPath);
        });
    };

    return (
        <div className="language-page-container">
            <div className="language-page-content">
                <header className="language-page-header">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <ArrowLeft size={24} />
                    </button>
                    <h1>{t('common.select_language')}</h1>
                    <p className="language-page-subtitle">Choose your preferred language to explore the bookshelf</p>
                </header>

                <div className="language-grid">
                    {languages.map((lng, index) => (
                        <motion.button
                            key={lng.code}
                            className={`language-card glass-effect ${currentLangCode === lng.code ? 'active' : ''}`}
                            onClick={() => handleLanguageChange(lng.code)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="language-card-info">
                                <span className="native-name">{lng.native}</span>
                                <span className="english-name">{lng.name}</span>
                            </div>
                            {currentLangCode === lng.code && (
                                <div className="selected-indicator">
                                    <Check size={14} />
                                </div>
                            )}
                        </motion.button>
                    ))}
                </div>

                <div className="language-page-footer">
                    <Globe size={48} className="footer-icon" />
                    <p>{t('common.footer_text')}</p>
                </div>
            </div>
        </div>
    );
};

export default LanguageSelectPage;
