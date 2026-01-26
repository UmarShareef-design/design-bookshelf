import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, BookOpen, Info, MessageSquare } from 'lucide-react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import CategoryBar from './components/CategoryBar';
import BookCard from './components/BookCard';
import About from './components/About';
import booksData from './books.json';

const App = () => {
    const location = useLocation();
    const [activeCategory, setActiveCategory] = useState('All');
    const [filteredBooks, setFilteredBooks] = useState(booksData);
    const [categories, setCategories] = useState(['All']);
    const [favorites, setFavorites] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);

    // Load favorites from localStorage on mount
    useEffect(() => {
        const storedFavorites = localStorage.getItem('designBookshelfFavorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('designBookshelfFavorites', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        const cats = ['All', ...new Set(booksData.map(book => book.Category))];
        setCategories(cats);
    }, []);

    useEffect(() => {
        let booksToFilter = showFavorites
            ? booksData.filter(book => favorites.includes(book.Title))
            : booksData;

        if (activeCategory === 'All') {
            setFilteredBooks(booksToFilter);
        } else {
            setFilteredBooks(booksToFilter.filter(book => book.Category === activeCategory));
        }
    }, [activeCategory, showFavorites, favorites]);

    const toggleFavorite = (bookTitle) => {
        setFavorites(prev => {
            if (prev.includes(bookTitle)) {
                return prev.filter(title => title !== bookTitle);
            } else {
                return [...prev, bookTitle];
            }
        });
    };

    const isFavorite = (bookTitle) => favorites.includes(bookTitle);

    return (
        <div className="app-container">
            <header className="header-section">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Design Bookshelf
                </motion.h1>
                <motion.p
                    className="subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    Curated knowledge for the modern UI/UX professional.
                </motion.p>
            </header>

            {/* Navigation Bar */}
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
                    onClick={() => setShowFavorites(true)}
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
                    style={{ textDecoration: 'none' }}
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
                                <CategoryBar
                                    categories={categories}
                                    activeCategory={activeCategory}
                                    setActiveCategory={setActiveCategory}
                                />

                                <main className="books-grid-container">
                                    <motion.div
                                        layout
                                        className="books-grid"
                                    >
                                        <AnimatePresence mode='popLayout'>
                                            {filteredBooks.length > 0 ? (
                                                filteredBooks.map((book, index) => (
                                                    <BookCard
                                                        key={`${book.Title}-${index}`}
                                                        book={book}
                                                        isFavorite={isFavorite(book.Title)}
                                                        onToggleFavorite={() => toggleFavorite(book.Title)}
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

            <footer style={{ marginTop: '5rem', textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                <p>&copy; {new Date().getFullYear()} Design Bookshelf. Knowledge is power.</p>
                <div style={{ marginTop: '1rem' }}>
                    <a 
                        href="https://docs.google.com/forms/d/e/1FAIpQLSdizXwJUzLnyEQVH_fjZClIUir9lMg9RnIZQkWooexjJz9e7Q/viewform?usp=header"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ 
                            background: 'none', 
                            border: 'none', 
                            color: 'var(--accent-secondary)', 
                            textDecoration: 'underline', 
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                        }}
                    >
                        Share your feedback ( Anonymous )
                    </a>
                </div>
                <p style={{ fontSize: '0.8rem', marginTop: '1rem', opacity: 0.8 }}>
                    Full Affiliate Disclosure: This website contains affiliate links. If you purchase through these links, we may earn a small commission at no extra cost to you.
                </p>
            </footer>
        </div>
    );
};

export default App;
