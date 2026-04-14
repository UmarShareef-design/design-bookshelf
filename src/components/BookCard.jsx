import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import ButterflyAnimation from './ButterflyAnimation';
import { useTranslation } from 'react-i18next';
import { Icon } from './Icons';
import { getPlatformsForBook } from '../config/platforms';

const BookCard = ({ book, isFavorite, onToggleFavorite }) => {
    const { t } = useTranslation();
    const [showButterfly, setShowButterfly] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef(null);

    const platforms = useMemo(() => getPlatformsForBook(book), [book]);

    // Focus trap: get all focusable elements inside the popup
    const getFocusableElements = useCallback(() => {
        if (!popupRef.current) return [];
        const selectors = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
        return [...popupRef.current.querySelectorAll(selectors)];
    }, []);

    // Focus trap handler
    const handleTabTrap = useCallback((e) => {
        if (e.key !== 'Tab' || !popupRef.current) return;
        const focusable = getFocusableElements();
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
            // Shift+Tab: if on first element, wrap to last
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        } else {
            // Tab: if on last element, wrap to first
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }, [getFocusableElements]);

    // Close popup on overlay click or Escape, lock body scroll
    useEffect(() => {
        if (!showPopup) return;

        // Store the currently focused element to restore on close
        const previouslyFocused = document.activeElement;

        // Lock body scroll while modal is open
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        // Move focus into the popup (close button is first focusable)
        requestAnimationFrame(() => {
            const focusable = getFocusableElements();
            if (focusable.length > 0) {
                focusable[0].focus();
            }
        });

        const handleEscape = (e) => {
            if (e.key === 'Escape') setShowPopup(false);
        };
        document.addEventListener('keydown', handleEscape);
        document.addEventListener('keydown', handleTabTrap);
        return () => {
            document.body.style.overflow = previousOverflow;
            // Restore focus to the element that triggered the popup
            if (previouslyFocused && previouslyFocused.focus) {
                previouslyFocused.focus();
            }
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('keydown', handleTabTrap);
        };
    }, [showPopup, getFocusableElements, handleTabTrap]);

    const handlePlatformClick = (platformName) => {
        if (window.gtag) {
            window.gtag('event', 'purchase_click', {
                'event_category': 'Engagement',
                'event_label': book.Title,
                'book_category': book.Category,
                'platform': platformName
            });
        }
        setShowPopup(false);
    };

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!isFavorite && !prefersReducedMotion) {
            setShowButterfly(true);
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
            <div className="book-card-content">
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
            </div>
            <div className="book-info-actions">
                <button
                    className="get-book-btn"
                    onClick={() => setShowPopup(!showPopup)}
                    aria-expanded={showPopup}
                    aria-haspopup="true"
                >
                    <Icon id="shopping-bag" size={16} />
                    <span>{t('common.get_the_book')}</span>
                </button>
            </div>
            {showPopup && createPortal(
                <div className="book-popup-overlay" onClick={() => setShowPopup(false)} />,
                document.body
            )}
            {showPopup && createPortal(
                <div
                    ref={popupRef}
                    className="book-popup"
                    role="dialog"
                    aria-modal="true"
                    aria-label={t('common.get_the_book')}
                >
                    <div className="book-popup-header">
                        <span className="book-popup-title">{t('common.get_the_book')}</span>
                        <button
                            className="book-popup-close"
                            onClick={() => setShowPopup(false)}
                            aria-label={t('common.close')}
                        >
                            <Icon id="x" size={18} />
                        </button>
                    </div>
                    <div className="book-popup-retailers">
                        {platforms.map((platform, index) => (
                            <a
                                key={platform.id}
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`retailer-row retailer-${platform.id}`}
                                style={{ '--stagger-index': index }}
                                onClick={() => handlePlatformClick(platform.name)}
                            >
                                <div className="retailer-icon-wrap">
                                    <img
                                        src={platform.logo}
                                        alt={platform.name}
                                        className="retailer-logo"
                                        width="24"
                                        height="24"
                                        decoding="async"
                                    />
                                </div>
                                <div className="retailer-info">
                                    <span className="retailer-name">{platform.name}</span>
                                    <span className="retailer-format">{t(`platforms.${platform.id}`)}</span>
                                </div>
                                <Icon id="arrow-right" size={16} className="retailer-arrow" />
                            </a>
                        ))}
                    </div>
                </div>,
                document.body
            )}
        </article>
    );
};

export default BookCard;
