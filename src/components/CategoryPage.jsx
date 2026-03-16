import React, { useEffect, useMemo } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import BookCard from './BookCard';
import Footer from './Footer';
import LanguageSwitcher from './LanguageSwitcher';
import booksData from '../books.json';
import { useTranslation } from 'react-i18next';
import { Icon } from './Icons';

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

    // Track Category View Event
    useEffect(() => {
        if (window.gtag && categoryName) {
            window.gtag('event', 'view_category_page', {
                'category_name': categoryName,
                'language': i18n.language
            });
        }
    }, [categoryName, i18n.language]);

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
                        <Icon id="arrow-left" size={16} /> {t('meta.back_to_all')}
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
                <h1 className="animate-in">
                    {meta.h1}
                </h1>
                <p className="subtitle animate-in delay-1">
                    {summary}
                </p>
                <div style={{ textAlign: 'center' }}>
                    <div className="category-page-actions" style={{ marginBottom: '1rem' }}>
                    </div>
                    <div className="wiggle-container" style={{ display: 'inline-block' }}>
                        <NavLink
                            to={i18n.language === 'en' ? '/' : `/${i18n.language}/`}
                            className="buy-button category-page-cta wiggle"
                            style={{ textDecoration: 'none' }}
                        >
                            {t('meta.view_all')}
                        </NavLink>
                    </div>
                    <p className="category-page-hint animate-in delay-2">{t('meta.hint')}</p>
                </div>
            </header>

            {/* Books Grid — no favorites */}
            <main className="books-grid-container" id="main-content">
                <div className="books-grid">
                    {filteredBooks.map((book) => (
                        <BookCard
                            key={book.id}
                            book={book}
                        />
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CategoryPage;

