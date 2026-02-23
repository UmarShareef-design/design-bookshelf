import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, BookOpen, Info, MessageSquare } from 'lucide-react';
import { Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom';
import CategoryBar from './components/CategoryBar';
import BookCard from './components/BookCard';
import About from './components/About';
import booksData from './books.json';
import { CATEGORY_SUMMARIES, FAVORITES_STORAGE_KEY } from './config';

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [activeCategory, setActiveCategory] = useState('All');
    const [favorites, setFavorites] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);

    // Derived Data: Categories
    const categories = useMemo(() => {
        return ['All', ...new Set(booksData.map(book => book.Category))];
    }, []);

    // Load favorites and handle Title-to-ID migration
    useEffect(() => {
        const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (stored) {
            let parsed = JSON.parse(stored);

            // MIGRATION: If stored items aren't IDs (don't contain '-'), try to find matching IDs
            // This is a bit heuristic but helps existing users
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

    const currentSummary = CATEGORY_SUMMARIES[showFavorites ? 'Favorites' : activeCategory];

    return (
        <div className="app-container">
            <a href="#main-content" className="skip-link">Skip to main content</a>
            <header className="header-section">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    UI/UX Design Bookshelf
                </motion.h1>
                <motion.p
                    className="subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    A new design tool drops every week, but fundamentals are forever. In the age of AI, knowing the "why" through timeless principles is your real competitive edge. Make use of the ultimate list of UI/UX books to read—curated from foundational UX books and top reddit recommendations.
                </motion.p>
            </header>

            <nav className="nav-bar">
                <NavLink
                    to="/"
                    className={({ isActive }) => `nav-btn ${isActive && !showFavorites ? 'active' : ''}`}
                    onClick={() => setShowFavorites(false)}
                >
                    <BookOpen size={18} />
                    All Books
                </NavLink>
                <button
                    className={`nav-btn favorites-btn ${showFavorites ? 'active' : ''}`}
                    onClick={() => {
                        setShowFavorites(true);
                        setActiveCategory('All');
                        navigate('/');
                    }}
                >
                    <Heart size={18} fill={showFavorites ? 'currentColor' : 'none'} />
                    Favorites ({favorites.length})
                </button>
                <NavLink
                    to="/about"
                    className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setShowFavorites(false)}
                >
                    <Info size={18} />
                    About
                </NavLink>
                <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdizXwJUzLnyEQVH_fjZClIUir9lMg9RnIZQkWooexjJz9e7Q/viewform?usp=header"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-btn"
                >
                    <MessageSquare size={18} />
                    Feedback ( Anonymous )
                </a>
            </nav>

            <AnimatePresence mode='wait'>
                <Routes location={location} key={location.pathname}>
                    <Route
                        path="/"
                        element={
                            <motion.div
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
                                                    <p>No books found. {showFavorites ? 'Add some favorites!' : 'Try a different category.'}</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </main>
                            </motion.div>
                        }
                    />
                    <Route path="/about" element={<About />} />
                </Routes>
            </AnimatePresence>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Design Bookshelf. Knowledge is power.</p>
                <div className="footer-links">
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSdizXwJUzLnyEQVH_fjZClIUir9lMg9RnIZQkWooexjJz9e7Q/viewform?usp=header"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-feedback-link"
                    >
                        Share your feedback ( Anonymous )
                    </a>
                </div>
                <p className="footer-disclosure">
                    Full Affiliate Disclosure: This website contains affiliate links. If you purchase through these links, we may earn a small commission at no extra cost to you.
                </p>
            </footer>
        </div>
    );
};

export default App;
