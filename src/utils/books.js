import booksData from '../books.json';

/** All unique categories derived from books data. */
export const categories = [...new Set(booksData.map(b => b.Category))];

/** Categories with the "All" option prepended (for filter UI). */
export const categoriesWithAll = ['All', ...categories];

/** Convert a category name to a URL-safe slug. */
export const slugifyCategory = (text) =>
  text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

/** Find a category name by its slug. Returns undefined if not found. */
export const categoryFromSlug = (slug) =>
  categories.find(c => slugifyCategory(c) === slug);

/** Re-export booksData so consumers don't need to import the JSON directly. */
export { booksData };
