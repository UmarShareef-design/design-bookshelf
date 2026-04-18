import { useTranslation } from 'react-i18next';
import { Icon } from './Icons';

const About = () => {
    const { t } = useTranslation();
    return (
        <div
            className="about-container glass-effect animate-in"
        >
            <div className="about-header">
                <div className="about-profile-icon">
                    <Icon id="user" size={40} color="#000" />
                </div>
                <h2 className="about-title">{t('about.title')}</h2>
            </div>

            <div className="about-content">
                <p>{t('about.p1')}</p>
                <p>{t('about.p2')}</p>
                <p>{t('about.p3')}</p>
                <p>{t('about.p4')}</p>

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
                        <Icon id="linkedin" size={20} />
                        {t('about.linkedin')}
                    </a>
                </div>
            </div>
        </div>
    );
};


export default About;
