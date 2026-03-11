import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, BookOpen, Info, MessageSquare } from 'lucide-react';
import { Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom';
import CategoryBar from './components/CategoryBar';
import BookCard from './components/BookCard';
import About from './components/About';
import LanguageSwitcher from './components/LanguageSwitcher';
import booksData from './books.json';
import { FAVORITES_STORAGE_KEY } from './config';
import { useTranslation } from 'react-i18next';

const App = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const [activeCategory, setActiveCategory] = useState('All');
    const [favorites, setFavorites] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);

    // Track Category Changes (Home Page)
    useEffect(() => {
        if (window.gtag && !showFavorites) {
            window.gtag('event', 'filter_category', {
                'category_name': activeCategory,
                'language': i18n.language
            });
        }
    }, [activeCategory, showFavorites, i18n.language]);

    // Derived Data: Categories
    const categories = useMemo(() => {
        return ['All', ...new Set(booksData.map(book => book.Category))];
    }, []);

    // Load favorites and handle Title-to-ID migration
    useEffect(() => {
        const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (stored) {
            let parsed = JSON.parse(stored);
            const isOldFormat = parsed.length > 0 && !booksData.some(b => parsed.includes(b.id));
            if (isOldFormat) {
                console.log("Migrating favorites to ID-based system...");
                const newFavorites = booksData
                    .filter(book => parsed.includes(book.Title))
                    .map(book => book.id);
                setFavorites(newFavorites);
            } else {
                setFavorites(parsed);
            }
        }
    }, []);

    // Save favorites
    useEffect(() => {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    // Optimized filtering
    const filteredBooks = useMemo(() => {
        const sourceBooks = showFavorites
            ? booksData.filter(book => favorites.includes(book.id))
            : booksData;

        if (activeCategory === 'All') return sourceBooks;
        return sourceBooks.filter(book => book.Category === activeCategory);
    }, [activeCategory, showFavorites, favorites]);

    const toggleFavorite = (bookId) => {
        setFavorites(prev =>
            prev.includes(bookId)
                ? prev.filter(id => id !== bookId)
                : [...prev, bookId]
        );
    };

    const isFavorite = (bookId) => favorites.includes(bookId);

    const currentSummary = t(`summaries.${showFavorites ? 'Favorites' : activeCategory}`);

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
                    {t('title')}
                </motion.h1>
                <motion.p
                    className="subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    {t('subtitle')}
                </motion.p>
            </header>

            <nav className="nav-bar">
                <NavLink
                    to={i18n.language === 'en' ? '/' : `/${i18n.language}/`}
                    className={({ isActive }) => `nav-btn ${isActive && !showFavorites ? 'active' : ''}`}
                    onClick={() => setShowFavorites(false)}
                >
                    <BookOpen size={18} />
                    {t('nav.all_books')}
                </NavLink>
                <button
                    className={`nav-btn favorites-btn ${showFavorites ? 'active' : ''}`}
                    onClick={() => {
                        setShowFavorites(true);
                        setActiveCategory('All');
                        navigate(i18n.language === 'en' ? '/' : `/${i18n.language}/`);
                    }}
                >
                    <Heart size={18} fill={showFavorites ? 'currentColor' : 'none'} />
                    {t('nav.favorites')} ({favorites.length})
                </button>
                <NavLink
                    to={i18n.language === 'en' ? '/about' : `/${i18n.language}/about`}
                    className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setShowFavorites(false)}
                >
                    <Info size={18} />
                    {t('nav.about')}
                </NavLink>
                <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdizXwJUzLnyEQVH_fjZClIUir9lMg9RnIZQkWooexjJz9e7Q/viewform?usp=header"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-btn"
                >
                    <MessageSquare size={18} />
                    {t('nav.feedback')}
                </a>
            </nav>

            <AnimatePresence mode='wait'>
                {/* 
                  Instead of nested Routes which can be tricky with language prefixes,
                  we use conditional rendering based on the pathname.
                  This ensures the state (like activeCategory) is preserved while 
                  switching between Home and About.
                */}
                {location.pathname.split('/').filter(Boolean).includes('about') ? (
                    <About key="about" />
                ) : (
                    <motion.div
                        key="home"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <section className="filters-section" aria-label="Book Categories">
                            <CategoryBar
                                categories={categories}
                                activeCategory={activeCategory}
                                setActiveCategory={setActiveCategory}
                            />
                        </section>

                        {currentSummary && (
                            <motion.p
                                className="category-summary"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                key={showFavorites ? 'Favorites' : activeCategory}
                            >
                                {currentSummary}
                            </motion.p>
                        )}

                        <main className="books-grid-container" id="main-content">
                            <motion.div layout className="books-grid">
                                <AnimatePresence mode='popLayout'>
                                    {filteredBooks.length > 0 ? (
                                        filteredBooks.map((book) => (
                                            <BookCard
                                                key={book.id}
                                                book={book}
                                                isFavorite={isFavorite(book.id)}
                                                onToggleFavorite={() => toggleFavorite(book.id)}
                                            />
                                        ))
                                    ) : (
                                        <motion.div
                                            className="empty-state"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <p>{t('common.no_books')} {showFavorites ? t('common.add_favorites') : t('common.try_category')}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </main>
                    </motion.div>
                )}
            </AnimatePresence>

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

export default App;
