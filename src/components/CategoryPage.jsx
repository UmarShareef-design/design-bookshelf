import React, { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BookCard from './BookCard';
import LanguageSwitcher from './LanguageSwitcher';
import booksData from '../books.json';
import { useTranslation } from 'react-i18next';

const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

const CategoryPage = () => {
    const { categorySlug } = useParams();
    const { t, i18n } = useTranslation();

    // Find matching category
    const allCategories = [...new Set(booksData.map(book => book.Category))];
    const categoryName = allCategories.find(cat => slugify(cat) === categorySlug);

    const filteredBooks = useMemo(() => {
        if (!categoryName) return [];
        return booksData.filter(book => book.Category === categoryName);
    }, [categoryName]);

    const meta = categoryName ? {
        title: t(`meta.${categoryName}.title`),
        description: t(`meta.${categoryName}.description`),
        h1: t(`meta.${categoryName}.h1`)
    } : null;

    const summary = categoryName ? t(`summaries.${categoryName}`) : '';

    // Update page title and meta for SEO
    useEffect(() => {
        if (meta && meta.title && !meta.title.includes('translation')) {
            document.title = meta.title;
            const updateMeta = (selector, content) => {
                const el = document.querySelector(selector);
                if (el) el.setAttribute('content', content);
            };
            updateMeta('meta[name="description"]', meta.description);
            updateMeta('meta[property="og:title"]', meta.title);
            updateMeta('meta[property="og:description"]', meta.description);
            updateMeta('meta[property="twitter:title"]', meta.title);
            updateMeta('meta[property="twitter:description"]', meta.description);
        }

        return () => {
            document.title = 'UI/UX Design Bookshelf | UX UI Books & Fundamentals in the Age of AI';
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute('content', 'Stop searching Reddit threads. Discover the best UI/UX design books to read for Indian professionals.');
        };
    }, [meta]);

    // 404 for invalid categories
    if (!categoryName) {
        return (
            <div className="app-container">
                <LanguageSwitcher />
                <div className="empty-state">
                    <p>{t('meta.404')}</p>
                    <NavLink
                        to={i18n.language === 'en' ? '/' : `/${i18n.language}/`}
                        className="buy-button"
                        style={{ display: 'inline-flex', width: 'auto', marginTop: '1rem', textDecoration: 'none' }}
                    >
                        <ArrowLeft size={16} /> {t('meta.back_to_all')}
                    </NavLink>
                </div>
            </div>
        );
    }

    return (
        <div className="app-container">
            <LanguageSwitcher />
            <a href="#main-content" className="skip-link">{t('common.skip_to_main')}</a>

            <header className="header-section">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {meta.h1}
                </motion.h1>
                <motion.p
                    className="subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    {summary}
                </motion.p>
                <div style={{ textAlign: 'center' }}>
                    <div className="category-page-actions" style={{ marginBottom: '1rem' }}>
                    </div>
                    <motion.div
                        style={{ display: 'inline-block' }}
                        animate={{ x: [0, -4, 4, -4, 4, -2, 2, 0] }}
                        transition={{ delay: 1, duration: 0.5, repeat: 1, repeatDelay: 0 }}
                    >
                        <NavLink
                            to={i18n.language === 'en' ? '/' : `/${i18n.language}/`}
                            className="buy-button category-page-cta"
                            style={{ textDecoration: 'none' }}
                        >
                            {t('meta.view_all')}
                        </NavLink>
                    </motion.div>
                    <p className="category-page-hint">{t('meta.hint')}</p>
                </div>
            </header>

            {/* Books Grid — no favorites */}
            <main className="books-grid-container" id="main-content">
                <motion.div layout className="books-grid">
                    <AnimatePresence mode='popLayout'>
                        {filteredBooks.map((book, index) => (
                            <BookCard
                                key={`${book.Title}-${index}`}
                                book={book}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </main>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} {t('title')}. {t('common.footer_text')}</p>
                <div className="footer-links">
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSdizXwJUzLnyEQVH_fjZClIUir9lMg9RnIZQkWooexjJz9e7Q/viewform?usp=header"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-feedback-link"
                    >
                        {t('common.share_feedback')}
                    </a>
                </div>
                <p className="footer-disclosure">
                    {t('common.affiliate_disclosure')}
                </p>
            </footer>
        </div>
    );
};

export default CategoryPage;
