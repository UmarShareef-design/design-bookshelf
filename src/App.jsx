import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import CategoryBar from './components/CategoryBar';
import BookCard from './components/BookCard';
import booksData from './books.json';

const App = () => {
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
                <button
                    className={`nav-btn ${!showFavorites ? 'active' : ''}`}
                    onClick={() => setShowFavorites(false)}
                >
                    All Books
                </button>
                <button
                    className={`nav-btn favorites-btn ${showFavorites ? 'active' : ''}`}
                    onClick={() => setShowFavorites(true)}
                >
                    <Heart size={18} fill={showFavorites ? 'currentColor' : 'none'} />
                    Favorites ({favorites.length})
                </button>
            </nav>

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

            <footer style={{ marginTop: '5rem', textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                <p>&copy; {new Date().getFullYear()} Design Bookshelf. Knowledge is power.</p>
            </footer>
        </div>
    );
};

export default App;
