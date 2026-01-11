import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Heart } from 'lucide-react';

const BookCard = ({ book, isFavorite, onToggleFavorite }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="book-card glass-effect"
        >
            <button
                className={`favorite-btn ${isFavorite ? 'is-favorite' : ''}`}
                onClick={onToggleFavorite}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            <div className="book-image-container">
                <img
                    src={book['Image URL']}
                    alt={book.Title}
                    className="book-image"
                    loading="lazy"
                />
            </div>
            <div className="book-info">
                <span className="book-category">{book.Category}</span>
                <h3 className="book-title" title={book.Title}>{book.Title}</h3>
                <a
                    href={book.Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="buy-button"
                >
                    Buy on Amazon <ExternalLink size={16} />
                </a>
            </div>
        </motion.div>
    );
};

export default BookCard;
