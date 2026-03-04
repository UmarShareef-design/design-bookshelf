import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About = () => {
    const { t } = useTranslation();
    return (
        <motion.div
            className="about-container glass-effect"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <div className="about-header">
                <div className="about-profile-icon">
                    <User size={40} color="#000" />
                </div>
                <h2 className="about-title">{t('about.title')}</h2>
            </div>

            <div className="about-content">
                <p>{t('about.p1')}</p>
                <p>{t('about.p2')}</p>
                <p>{t('about.p3')}</p>
                <p>{t('about.p4')}</p>

                <div className="about-disclosure-box">
                    {t('about.disclosure')}
                </div>

                <p className="about-closing-text">
                    {t('about.closing')}
                </p>

                <div className="about-actions">
                    <a
                        href="https://www.linkedin.com/in/umardesignsgraphic/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="buy-button btn-linkedin"
                    >
                        <Linkedin size={20} />
                        {t('about.linkedin')}
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default About;
