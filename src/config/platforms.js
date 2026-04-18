/**
 * Platform configuration for multi-platform book links.
 * Uses direct product page URLs (not search results) from platform-links.json.
 * 
 * Platform availability is based on research (see BOOK-PLATFORM-LINKS.md).
 * Some books are only available on Amazon (India-specific publications).
 */

import platformLinks from '../data/platform-links.json';

export const PLATFORMS = {
    amazon: {
        id: 'amazon',
        name: 'Amazon',
        logo: '/brand-logos/amazon.svg',
        // Direct link — already in books.json as "Link" field (affiliate)
    },
    flipkart: {
        id: 'flipkart',
        name: 'Flipkart',
        logo: '/brand-logos/flipkart.svg',
    },
    kindle: {
        id: 'kindle',
        name: 'Kindle',
        logo: '/brand-logos/kindle.svg',
    },
    kobo: {
        id: 'kobo',
        name: 'Kobo',
        logo: '/brand-logos/kobo.svg',
    },
    audible: {
        id: 'audible',
        name: 'Audible',
        logo: '/brand-logos/audible.svg',
    },
};

/**
 * Platform order for display — most relevant/popular first.
 * Amazon always first as primary/default; others sorted by availability.
 */
export const PLATFORM_ORDER = ['amazon', 'flipkart', 'kindle', 'kobo', 'audible'];

/**
 * India-specific portfolio books that are ONLY available on Amazon.
 * These books should not show other platform options.
 */
export const AMAZON_ONLY_BOOKS = [
    'the-portfolio-secrets-12',
    'product-design-portfolio-final-final-13',
];

/**
 * Get available platforms for a given book.
 * Returns array of platform objects with their direct product page URLs.
 * Only includes platforms that have a verified direct URL for this book.
 */
export const getPlatformsForBook = (book) => {
    const isAmazonOnly = AMAZON_ONLY_BOOKS.includes(book.id);
    const platforms = [];

    // Amazon is always available (via book.Link)
    platforms.push({
        ...PLATFORMS.amazon,
        url: book.Link,
    });

    if (isAmazonOnly) {
        return platforms;
    }

    // Add other platforms that have direct product page URLs for this book
    const bookLinks = platformLinks[book.id];
    if (!bookLinks) {
        return platforms;
    }

    const otherPlatformIds = PLATFORM_ORDER.filter(id => id !== 'amazon');
    for (const platformId of otherPlatformIds) {
        const url = bookLinks[platformId];
        if (url) {
            platforms.push({
                ...PLATFORMS[platformId],
                url,
            });
        }
    }

    return platforms;
};

