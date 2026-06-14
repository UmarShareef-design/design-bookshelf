import { useState, useEffect } from 'react';
import { booksData } from '../utils/books';
import { FAVORITES_STORAGE_KEY } from '../config';

export const READING_STATUS = {
    DONE: 'done',
    READING: 'reading',
    NEXT: 'next'
};

export const DEFAULT_READING_STATUS = READING_STATUS.NEXT;

const isValidStatus = (status) => Object.values(READING_STATUS).includes(status);

const normalizeFavorites = (storedFavorites) => {
    if (!storedFavorites) return {};

    if (Array.isArray(storedFavorites)) {
        const isOldTitleFormat = storedFavorites.length > 0 && !booksData.some(book => storedFavorites.includes(book.id));
        const favoriteIds = isOldTitleFormat
            ? booksData
                .filter(book => storedFavorites.includes(book.Title))
                .map(book => book.id)
            : storedFavorites.filter(bookId => booksData.some(book => book.id === bookId));

        return favoriteIds.reduce((items, bookId) => ({
            ...items,
            [bookId]: DEFAULT_READING_STATUS
        }), {});
    }

    if (storedFavorites.items && typeof storedFavorites.items === 'object') {
        return Object.entries(storedFavorites.items).reduce((items, [bookId, status]) => {
            if (!booksData.some(book => book.id === bookId)) return items;
            return {
                ...items,
                [bookId]: isValidStatus(status) ? status : DEFAULT_READING_STATUS
            };
        }, {});
    }

    if (typeof storedFavorites === 'object') {
        return Object.entries(storedFavorites).reduce((items, [bookId, status]) => {
            if (!booksData.some(book => book.id === bookId)) return items;
            return {
                ...items,
                [bookId]: isValidStatus(status) ? status : DEFAULT_READING_STATUS
            };
        }, {});
    }

    return {};
};

/**
 * Custom hook for managing book favorites via localStorage.
 * Shared between App and CategoryPage so both routes support favorites.
 * Each component maintains its own React state, but they share
 * the same localStorage key — changes persist across route navigations.
 */
const useFavorites = () => {
    const [favoriteStatuses, setFavoriteStatuses] = useState({});
    const [hasLoadedFavorites, setHasLoadedFavorites] = useState(false);

    // Load favorites and handle legacy array / Title-to-ID migration
    useEffect(() => {
        try {
            const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
            if (stored) {
                setFavoriteStatuses(normalizeFavorites(JSON.parse(stored)));
            }
        } catch (e) {
            localStorage.removeItem(FAVORITES_STORAGE_KEY);
            setFavoriteStatuses({});
        } finally {
            setHasLoadedFavorites(true);
        }
    }, []);

    // Save favorites whenever they change
    useEffect(() => {
        if (!hasLoadedFavorites) return;

        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify({
            version: 2,
            items: favoriteStatuses
        }));
    }, [favoriteStatuses, hasLoadedFavorites]);

    const toggleFavorite = (bookId) => {
        setFavoriteStatuses(prev => {
            if (prev[bookId]) {
                const next = { ...prev };
                delete next[bookId];
                return next;
            }

            return {
                ...prev,
                [bookId]: DEFAULT_READING_STATUS
            };
        });
    };

    const updateFavoriteStatus = (bookId, status) => {
        if (!isValidStatus(status)) return;

        setFavoriteStatuses(prev => {
            if (!prev[bookId]) return prev;
            return {
                ...prev,
                [bookId]: status
            };
        });
    };

    const favorites = Object.keys(favoriteStatuses);
    const isFavorite = (bookId) => Boolean(favoriteStatuses[bookId]);
    const getFavoriteStatus = (bookId) => favoriteStatuses[bookId] || DEFAULT_READING_STATUS;

    return { favorites, favoriteStatuses, toggleFavorite, updateFavoriteStatus, isFavorite, getFavoriteStatus };
};

export default useFavorites;
