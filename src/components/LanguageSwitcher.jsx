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
        { code: 'ta', name: 'Tamil', native: 'தமிழ்' }
    ];

    const currentLanguage = languages.find(l => l.code === (lang || 'en')) || languages[0];

    const handleLanguageChange = (lng) => {
        setIsOpen(false);

        let newPath = location.pathname;

        // Remove current lang prefix if exists
        if (lang) {
            newPath = newPath.replace(`/${lang}`, '');
        }

        // Add new lang prefix if not English
        if (lng === 'ta') {
            newPath = `/ta${newPath}`;
        }

        // Ensure path starts with /
        if (!newPath.startsWith('/')) newPath = `/${newPath}`;

        navigate(newPath);
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
