import React, { useState } from 'react';
import ButterflyAnimation from './ButterflyAnimation';
import { useTranslation } from 'react-i18next';
import { Icon } from './Icons';

const BookCard = ({ book, isFavorite, onToggleFavorite }) => {
    const { t } = useTranslation();
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
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!isFavorite && !prefersReducedMotion) {
            setShowButterfly(true);
            // Track Add to Favorites Event
            if (window.gtag) {
                window.gtag('event', 'add_to_favorites', {
                    'book_title': book.Title,
                    'book_category': book.Category
                });
            }
        }
        onToggleFavorite();
    };

    return (
        <article
            className="book-card glass-effect animate-in"
            style={{ zIndex: showButterfly ? 100 : 1 }}
        >
            {onToggleFavorite && (
                <>
                    <ButterflyAnimation
                        isTriggered={showButterfly}
                        onComplete={() => setShowButterfly(false)}
                    />
                    <button
                        className={`favorite-btn ${isFavorite ? 'is-favorite' : ''}`}
                        onClick={handleFavoriteClick}
                        aria-label={isFavorite ? t('common.remove_favorite') : t('common.add_favorite')}
                    >
                        <Icon 
                          id="heart" 
                          size={20} 
                          fill={isFavorite ? 'currentColor' : 'none'} 
                          stroke={isFavorite ? 'none' : 'currentColor'}
                        />
                    </button>

                </>
            )}
            <a
                href={book.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="book-card-link"
                onClick={handleAmazonClick}
            >
                <div className="book-image-container">
                    <img
                        src={book['Image URL']}
                        alt={`${book.Title.split(':')[0]} - ${book.Category}`}
                        className="book-image"
                        loading="lazy"
                        decoding="async"
                        width="300"
                        height="450"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/300x450?text=Design+Book';
                        }}
                    />
                </div>
                <div className="book-info">
                    <span className="book-category">{t(`categories.${book.Category}`)}</span>
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
                    {t('common.check_it_out')} <Icon id="external-link" size={16} />
                </a>
            </div>
        </article>
    );
};

export default BookCard;


