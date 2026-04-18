import { useState, useEffect } from 'react';
import { booksData } from '../utils/books';
import { FAVORITES_STORAGE_KEY } from '../config';

/**
 * Custom hook for managing book favorites via localStorage.
 * Shared between App and CategoryPage so both routes support favorites.
 * Each component maintains its own React state, but they share
 * the same localStorage key — changes persist across route navigations.
 */
const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);

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
            localStorage.removeItem(FAVORITES_STORAGE_KEY);
            setFavorites([]);
        }
    }, []);

    // Save favorites whenever they change
    useEffect(() => {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (bookId) => {
        setFavorites(prev =>
            prev.includes(bookId)
                ? prev.filter(id => id !== bookId)
                : [...prev, bookId]
        );
    };

    const isFavorite = (bookId) => favorites.includes(bookId);

    return { favorites, toggleFavorite, isFavorite };
};

export default useFavorites;
