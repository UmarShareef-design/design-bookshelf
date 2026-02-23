import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, BookOpen, Info, MessageSquare } from 'lucide-react';
import { Routes, Route, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import CategoryBar from './components/CategoryBar';
import BookCard from './components/BookCard';
import About from './components/About';
import booksData from './books.json';

const categorySummaries = {
    'All': 'A complete collection of UI/UX design books covering everything from basic principles to advanced research methods to soft skills.',
    'UX Design': 'Essential reading for understanding user behavior, usability, and the strategy behind successful digital products.',
    'UI Design': 'Books focused on visual hierarchy, typography, color theory, and the aesthetics of interface design.',
    'Interaction Design': 'Guides on how users engage with products, focusing on flow, feedback, and interactive patterns.',
    'Design Fundamentals': 'Mastering core principles is the secret to better AI prompting. Understanding hierarchy and color theory allows you to direct AI tools like emergent,replit,Bolt,Lovable,Claude code,Antigravity,Google AI studio etc. with precision instead of trial and error.',
    'User Research': 'Methodologies for gathering deep insights into user needs and testing design assumptions.',
    'Portfolio': 'Strategies for showcasing your design process and landing roles in the UI/UX industry.',
    'Design Process': 'Frameworks like Design Thinking and Lean UX that help teams build the right things efficiently.',
    'Complementary Skills': 'Soft skills that help you grow beyond just pixels.',
    'Favorites': 'Your curated collection of design wisdom. These books save to your local browser storage so you can easily reference them later. Tip: You can even bookmark this page in your browser for one-click access to your favorites!'
};

const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { categorySlug } = useParams();

    const [activeCategory, setActiveCategory] = useState('All');
    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem('designBookshelfFavorites');
        return stored ? JSON.parse(stored) : [];
    });
    const [showFavorites, setShowFavorites] = useState(false);

    // Derived State: Essential for performance to avoid redundant renders
    const categories = useMemo(() =>
        ['All', ...new Set(booksData.map(book => book.Category))],
        []);

    const filteredBooks = useMemo(() => {
        let books = showFavorites
            ? booksData.filter(book => favorites.includes(book.Title))
            : booksData;

        return activeCategory === 'All'
            ? books
            : books.filter(book => book.Category === activeCategory);
    }, [activeCategory, showFavorites, favorites]);

    // Update favorites in localStorage
    useEffect(() => {
        localStorage.setItem('designBookshelfFavorites', JSON.stringify(favorites));
    }, [favorites]);

    // Sync active category from URL
    useEffect(() => {
        if (categorySlug) {
            const matched = categories.find(cat => slugify(cat) === categorySlug);
            if (matched) {
                setActiveCategory(matched);
                setShowFavorites(false);
            }
        } else if (location.pathname === '/' && !showFavorites) {
            setActiveCategory('All');
        }
    }, [categorySlug, categories, location.pathname, showFavorites]);

    // Consolidated SEO Update (Title, Meta, JSON-LD, OG)
    useEffect(() => {
        const baseTitle = "Design Bookshelf";
        const title = showFavorites
            ? `Favorites | ${baseTitle}`
            : (activeCategory === 'All' ? baseTitle : `${activeCategory} Books | ${baseTitle}`);

        const description = categorySummaries[showFavorites ? 'Favorites' : activeCategory];

        // 1. Title & Meta
        document.title = title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', description);

        // 2. Social Tags (OG/Twitter)
        const updateMeta = (selector, content) => {
            const el = document.querySelector(selector);
            if (el) el.setAttribute('content', content);
        };
        updateMeta('meta[property="og:title"]', title);
        updateMeta('meta[property="og:description"]', description);
        updateMeta('meta[property="twitter:title"]', title);
        updateMeta('meta[property="twitter:description"]', description);

        // 3. Dynamic JSON-LD
        const schemaId = 'dynamic-json-ld';
        let script = document.getElementById(schemaId);
        if (!script) {
            script = document.createElement('script');
            script.id = schemaId;
            script.type = 'application/ld+json';
            document.head.appendChild(script);
        }
        script.innerHTML = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": title,
            "description": description,
            "url": window.location.href,
        });

    }, [activeCategory, showFavorites]);

    const toggleFavorite = (bookTitle) => {
        setFavorites(prev =>
            prev.includes(bookTitle)
                ? prev.filter(t => t !== bookTitle)
                : [...prev, bookTitle]
        );
    };

    const isFavorite = (bookTitle) => favorites.includes(bookTitle);

    const handleCategoryChange = (category) => {
        if (category === 'All') navigate('/');
        else navigate(`/category/${slugify(category)}`);

        setActiveCategory(category);
        setShowFavorites(false);
    };

    const mainContent = (
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
                    setActiveCategory={handleCategoryChange}
                />
            </section>

            {categorySummaries[showFavorites ? 'Favorites' : activeCategory] && (
                <motion.p
                    className="category-summary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={showFavorites ? 'Favorites' : activeCategory}
                >
                    {categorySummaries[showFavorites ? 'Favorites' : activeCategory]}
                </motion.p>
            )}

            <main className="books-grid-container" id="main-content">
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
    );

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

            {/* Navigation Bar */}
            <nav className="nav-bar">
                <NavLink
                    to="/"
                    className={({ isActive }) => `nav-btn ${isActive && !showFavorites && activeCategory === 'All' ? 'active' : ''}`}
                    onClick={() => {
                        setShowFavorites(false);
                        setActiveCategory('All');
                    }}
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
                    style={{ textDecoration: 'none' }}
                >
                    <MessageSquare size={18} />
                    Feedback ( Anonymous )
                </a>
            </nav>

            <AnimatePresence mode='wait'>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={mainContent} />
                    <Route path="/category/:categorySlug" element={mainContent} />
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
