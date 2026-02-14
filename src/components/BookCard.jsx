import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Heart } from 'lucide-react';
import ButterflyAnimation from './ButterflyAnimation';

const BookCard = ({ book, isFavorite, onToggleFavorite }) => {
    const [showButterfly, setShowButterfly] = useState(false);

    const handleAmazonClick = () => {
        if (window.gtag) {
            window.gtag('event', 'purchase_click', {
                'event_category': 'Engagement',
                'event_label': book.Title,
                'book_category': book.Category
            });
        }
    };

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        if (!isFavorite) {
            setShowButterfly(true);
        }
        onToggleFavorite();
    };

    return (
        <motion.article
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="book-card glass-effect"
        >
            <ButterflyAnimation
                isTriggered={showButterfly}
                onComplete={() => setShowButterfly(false)}
            />
            <button
                className={`favorite-btn ${isFavorite ? 'is-favorite' : ''}`}
                onClick={handleFavoriteClick}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            <a
                href={book.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="book-card-link"
                onClick={handleAmazonClick}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
                <div className="book-image-container">
                    <img
                        src={book['Image URL']}
                        alt={`${book.Title.split(':')[0]} - ${book.Category}`}
                        className="book-image"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
                <div className="book-info">
                    <span className="book-category">{book.Category}</span>
                    <h2 className="book-title">{book.Title.split(':')[0]}</h2>
                </div>
            </a>
            <div className="book-info-actions">
                <a
                    href={book.Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="buy-button"
                    onClick={handleAmazonClick}
                >
                    Buy on Amazon <ExternalLink size={16} />
                </a>
            </div>
        </motion.article>
    );
};

export default BookCard;
