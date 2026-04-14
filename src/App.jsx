import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom';
import CategoryBar from './components/CategoryBar';
import BookCard from './components/BookCard';
import About from './components/About';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LanguageSwitcher from './components/LanguageSwitcher';
import booksData from './books.json';
import { FAVORITES_STORAGE_KEY, FEEDBACK_URL } from './config';
import { useTranslation } from 'react-i18next';
import { Icon } from './components/Icons';

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
        try {
            const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
            if (stored) {
                let parsed = JSON.parse(stored);
                const isOldFormat = parsed.length > 0 && !booksData.some(b => parsed.includes(b.id));
                if (isOldFormat) {
                    const newFavorites = booksData
                        .filter(book => parsed.includes(book.Title))
                        .map(book => book.id);
                    setFavorites(newFavorites);
                } else {
                    setFavorites(parsed);
                }
            }
        } catch (e) {
            console.warn('Failed to load favorites from localStorage:', e);
            localStorage.removeItem(FAVORITES_STORAGE_KEY);
            setFavorites([]);
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
                <h1 className="animate-in">
                    {t('title')}
                </h1>
                <p className="subtitle animate-in delay-1">
                    {t('subtitle')}
                </p>
            </header>

            <nav className="nav-bar animate-in delay-2">
                <NavLink
                    to={i18n.language === 'en' ? '/' : `/${i18n.language}/`}
                    className={({ isActive }) => `nav-btn ${isActive && !showFavorites ? 'active' : ''}`}
                    onClick={() => setShowFavorites(false)}
                >
                    <Icon id="book-open" size={18} />
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
                    <Icon 
                      id="heart" 
                      size={18} 
                      fill={showFavorites ? 'currentColor' : 'none'} 
                      stroke={showFavorites ? 'none' : 'currentColor'}
                    />
                    {t('nav.favorites')} ({favorites.length})
                </button>

                <NavLink
                    to={i18n.language === 'en' ? '/about/' : `/${i18n.language}/about/`}
                    className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setShowFavorites(false)}
                >
                    <Icon id="info" size={18} />
                    {t('nav.about')}
                </NavLink>
                <a
                    href={FEEDBACK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-btn"
                >
                    <Icon id="message-square" size={18} />
                    {t('nav.feedback')}
                </a>
            </nav>

            <div className="content-area">
                {location.pathname.split('/').filter(Boolean).includes('about') ? (
                    <About key="about" />
                ) : (
                    <div className="home-content">
                        <section className="filters-section animate-in delay-3" aria-label="Book Categories">
                            <CategoryBar
                                categories={categories}
                                activeCategory={activeCategory}
                                setActiveCategory={setActiveCategory}
                            />
                        </section>

                        {currentSummary && (
                            <p className="category-summary animate-in delay-4">
                                {currentSummary}
                            </p>
                        )}

                        <main className="books-grid-container" id="main-content">
                            <div className="books-grid">
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
                                    <div className="empty-state">
                                        <p>{t('common.no_books')} {showFavorites ? t('common.add_favorites') : t('common.try_category')}</p>
                                    </div>
                                )}
                            </div>
                        </main>
                    </div>
                )}
            </div>

            <Footer />
            <ScrollToTop />
        </div>
    );
};

export default App;

