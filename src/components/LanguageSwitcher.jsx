import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { lang } = useParams();

    const languages = [
        { code: 'en', name: 'English', native: 'English' },
        { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
        { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
        { code: 'te', name: 'Telugu', native: 'తెలుగు' }
    ];

    const currentLanguage = languages.find(l => l.code === (lang || 'en')) || languages[0];

    const handleLanguageChange = (lng) => {
        setIsOpen(false);

        // 1. Calculate the new path
        let segments = location.pathname.split('/').filter(Boolean);
        const supportedLangs = ['en', 'ta', 'hi', 'te'];

        // Remove existing language prefix if present as the first segment
        if (segments.length > 0 && supportedLangs.includes(segments[0])) {
            segments.shift();
        }

        // Add new language prefix if it's not English
        if (lng !== 'en') {
            segments.unshift(lng);
        }

        let newPath = '/' + segments.join('/');

        // 2. Change language state FIRST, then navigate
        i18n.changeLanguage(lng).then(() => {
            navigate(newPath);
        });
    };

    return (
        <div className="language-switcher-container">
            <button
                className="language-btn glass-effect"
                onClick={() => setIsOpen(true)}
                title={t('common.select_language')}
            >
                <Languages size={20} />
                <span className="lang-label">{currentLanguage.native}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className="modal-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            className="language-modal glass-effect"
                            initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-40%" }}
                            animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
                            exit={{ scale: 0.9, opacity: 0, x: "-50%", y: "-40%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            <div className="modal-header">
                                <h3>{t('common.select_language')}</h3>
                                <button className="close-btn" onClick={() => setIsOpen(false)}>
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="language-list">
                                {languages.map((lng) => (
                                    <button
                                        key={lng.code}
                                        className={`language-option ${currentLanguage.code === lng.code ? 'active' : ''}`}
                                        onClick={() => handleLanguageChange(lng.code)}
                                    >
                                        <div className="lng-info">
                                            <span className="lng-native">{lng.native}</span>
                                            <span className="lng-name">{lng.name}</span>
                                        </div>
                                        {currentLanguage.code === lng.code && <div className="active-dot" />}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSwitcher;
