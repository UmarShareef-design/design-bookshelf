import React, { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useParams } from 'react-router-dom';
import BookCard from './BookCard';
import booksData from '../books.json';

const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

const categorySummaries = {
    'UX Design': 'Essential reading for understanding user behavior, usability, and the strategy behind successful digital products.',
    'UI Design': 'Books focused on visual hierarchy, typography, color theory, and the aesthetics of interface design.',
    'Interaction Design': 'Guides on how users engage with products, focusing on flow, feedback, and interactive patterns.',
    'Design Fundamentals': 'Mastering core principles is the secret to better AI prompting. Understanding hierarchy and color theory allows you to direct AI tools with precision instead of trial and error.',
    'User Research': 'Methodologies for gathering deep insights into user needs and testing design assumptions.',
    'Portfolio': 'Strategies for showcasing your design process and landing roles in the UI/UX industry.',
    'Design Process': 'Frameworks like Design Thinking and Lean UX that help teams build the right things efficiently.',
    'Complementary Skills': 'Soft skills that help you grow beyond just pixels.',
};

const categoryMeta = {
    'UX Design': {
        title: 'Best UX Design Books | UI/UX Design Bookshelf',
        description: 'Discover the best UX design books covering user behavior, usability, and product strategy. Curated for Indian designers and professionals on Amazon.',
        h1: 'Best UX Design Books',
    },
    'UI Design': {
        title: 'Best UI Design Books | UI/UX Design Bookshelf',
        description: 'Explore top UI design books on visual hierarchy, typography, color theory, and interface aesthetics. Available on Amazon India.',
        h1: 'Best UI Design Books',
    },
    'Interaction Design': {
        title: 'Best Interaction Design Books | UI/UX Design Bookshelf',
        description: 'Find the best interaction design books on user flow, feedback patterns, and interactive experiences. Curated for designers.',
        h1: 'Best Interaction Design Books',
    },
    'Design Fundamentals': {
        title: 'Best Design Fundamentals Books | UI/UX Design Bookshelf',
        description: 'Master core design principles with these essential books. Understanding hierarchy and color theory gives you precision with AI tools.',
        h1: 'Best Design Fundamentals Books',
    },
    'User Research': {
        title: 'Best User Research Books | UI/UX Design Bookshelf',
        description: 'Top user research books covering methodologies for gathering insights into user needs and testing design assumptions.',
        h1: 'Best User Research Books',
    },
    'Portfolio': {
        title: 'Best UX Portfolio Books | UI/UX Design Bookshelf',
        description: 'Learn how to build a winning UI/UX portfolio. These books cover strategies for showcasing your design process and landing roles.',
        h1: 'Best UX Portfolio Books',
    },
    'Design Process': {
        title: 'Best Design Process Books | UI/UX Design Bookshelf',
        description: 'Explore Design Thinking, Lean UX, and other frameworks that help teams build the right products efficiently.',
        h1: 'Best Design Process Books',
    },
    'Complementary Skills': {
        title: 'Best Complementary Skills Books for Designers | UI/UX Design Bookshelf',
        description: 'Soft skills books that help designers grow beyond pixels — communication, productivity, and career development.',
        h1: 'Best Complementary Skills Books for Designers',
    },
};

const CategoryPage = () => {
    const { categorySlug } = useParams();

    // Find matching category
    const allCategories = [...new Set(booksData.map(book => book.Category))];
    const categoryName = allCategories.find(cat => slugify(cat) === categorySlug);

    const filteredBooks = useMemo(() => {
        if (!categoryName) return [];
        return booksData.filter(book => book.Category === categoryName);
    }, [categoryName]);

    const meta = categoryName ? categoryMeta[categoryName] : null;
    const summary = categoryName ? categorySummaries[categoryName] : '';

    // Update page title and meta for SEO
    useEffect(() => {
        if (meta) {
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
                <div className="empty-state">
                    <p>Category not found.</p>
                    <NavLink to="/" className="buy-button" style={{ display: 'inline-flex', width: 'auto', marginTop: '1rem', textDecoration: 'none' }}>
                        <ArrowLeft size={16} /> Back to All Books
                    </NavLink>
                </div>
            </div>
        );
    }

    return (
        <div className="app-container">
            <a href="#main-content" className="skip-link">Skip to main content</a>

            {/* Category Header — h1 is the first visible content */}
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
                    <motion.div
                        style={{ display: 'inline-block' }}
                        animate={{ x: [0, -4, 4, -4, 4, -2, 2, 0] }}
                        transition={{ delay: 1, duration: 0.5, repeat: 1, repeatDelay: 0 }}
                    >
                        <NavLink to="/" className="buy-button category-page-cta" style={{ textDecoration: 'none' }}>
                            View all UI/UX Books!
                        </NavLink>
                    </motion.div>
                    <p className="category-page-hint">You can add custom favorites across categories and bookmark to visit later!</p>
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
                <p>&copy; {new Date().getFullYear()} Design Bookshelf. Knowledge is power.</p>
                <p className="footer-disclosure">
                    Full Affiliate Disclosure: This website contains affiliate links. If you purchase through these links, we may earn a small commission at no extra cost to you.
                </p>
            </footer>
        </div>
    );
};

export default CategoryPage;
