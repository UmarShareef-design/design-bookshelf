import { useTranslation } from 'react-i18next';
import { FEEDBACK_URL } from '../config';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <p>&copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> {t('title')}. {t('common.footer_text')}</p>
            <div className="footer-links">
                <a
                    href={FEEDBACK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-feedback-link"
                >
                    {t('common.share_feedback')}
                </a>
            </div>
        </footer>
    );
};

export default Footer;
