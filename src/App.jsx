import { useState, useEffect, useMemo } from 'react';
import { Routes, Route, NavLink, useLocation, useNavigate, matchPath } from 'react-router-dom';
import CategoryBar from './components/CategoryBar';
import BookCard from './components/BookCard';
import About from './components/About';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LanguageSwitcher from './components/LanguageSwitcher';
import { booksData, categoriesWithAll as categories } from './utils/books';
import { FEEDBACK_URL } from './config';
import { useTranslation } from 'react-i18next';
import { Icon } from './components/Icons';
import useFavorites, { READING_STATUS } from './hooks/useFavorites';

const FavoriteReadingBoard = ({ books, favoriteStatuses, onStatusChange, isFavorite, toggleFavorite }) => {
    const { t } = useTranslation();
    const [draggedBookId, setDraggedBookId] = useState(null);
    const [activeDropStatus, setActiveDropStatus] = useState(null);

    const statusColumns = [
        {
            id: READING_STATUS.DONE,
            title: t('favorites_board.done_reading'),
            description: t('favorites_board.done_reading_hint')
        },
        {
            id: READING_STATUS.READING,
            title: t('favorites_board.currently_reading'),
            description: t('favorites_board.currently_reading_hint')
        },
        {
            id: READING_STATUS.NEXT,
            title: t('favorites_board.to_read_next'),
            description: t('favorites_board.to_read_next_hint')
        }
    ];

    const booksByStatus = statusColumns.reduce((groupedBooks, column) => ({
        ...groupedBooks,
        [column.id]: books.filter(book => favoriteStatuses[book.id] === column.id)
    }), {});

    const moveDraggedBook = (status) => {
        if (!draggedBookId) return;
        onStatusChange(draggedBookId, status);
        setDraggedBookId(null);
        setActiveDropStatus(null);
    };

    if (books.length === 0) {
        return (
            <div className="empty-state">
                <p>{t('common.no_books')} {t('common.add_favorites')}</p>
            </div>
        );
    }

    return (
        <div className="favorites-board" aria-label={t('favorites_board.label')}>
            {statusColumns.map((column) => {
                const columnBooks = booksByStatus[column.id] || [];

                return (
                    <section
                        key={column.id}
                        className={`favorites-column ${activeDropStatus === column.id ? 'is-drag-over' : ''}`}
                        onDragOver={(event) => {
                            event.preventDefault();
                            setActiveDropStatus(column.id);
                        }}
                        onDragLeave={() => setActiveDropStatus(null)}
                        onDrop={(event) => {
                            event.preventDefault();
                            moveDraggedBook(column.id);
                        }}
                    >
                        <div className="favorites-column-header">
                            <div>
                                <h2>{column.title}</h2>
                                <p>{column.description}</p>
                            </div>
                            <span className="favorites-column-count">{columnBooks.length}</span>
                        </div>

                        <div className="favorites-column-books">
                            {columnBooks.length > 0 ? (
                                columnBooks.map((book) => (
                                    <div
                                        key={book.id}
                                        className={`favorite-board-card ${draggedBookId === book.id ? 'is-dragging' : ''}`}
                                        draggable
                                        onDragStart={() => setDraggedBookId(book.id)}
                                        onDragEnd={() => {
                                            setDraggedBookId(null);
                                            setActiveDropStatus(null);
                                        }}
                                    >
                                        <div className="favorite-board-card-toolbar">
                                            <span className="drag-handle" aria-hidden="true">⋮⋮</span>
                                            <label>
                                                <span className="sr-only">{t('favorites_board.move_book')}</span>
                                                <select
                                                    value={favoriteStatuses[book.id]}
                                                    onChange={(event) => onStatusChange(book.id, event.target.value)}
                                                >
                                                    {statusColumns.map((option) => (
                                                        <option key={option.id} value={option.id}>{option.title}</option>
                                                    ))}
                                                </select>
                                            </label>
                                        </div>
                                        <BookCard
                                            book={book}
                                            isFavorite={isFavorite(book.id)}
                                            onToggleFavorite={() => toggleFavorite(book.id)}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="favorites-column-empty">
                                    {t('favorites_board.drop_hint')}
                                </div>
                            )}
                        </div>
                    </section>
                );
            })}
        </div>
    );
};

const App = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const [activeCategory, setActiveCategory] = useState('All');
    const [showFavorites, setShowFavorites] = useState(false);
    const { favorites, favoriteStatuses, toggleFavorite, updateFavoriteStatus, isFavorite } = useFavorites();

    // Track Category Changes (Home Page)
    useEffect(() => {
        if (window.gtag && !showFavorites) {
            window.gtag('event', 'filter_category', {
                'category_name': activeCategory,
                'language': i18n.language
            });
        }
    }, [activeCategory, showFavorites, i18n.language]);

    // Optimized filtering
    const filteredBooks = useMemo(() => {
        const sourceBooks = showFavorites
            ? booksData.filter(book => favorites.includes(book.id))
            : booksData;

        if (activeCategory === 'All') return sourceBooks;
        return sourceBooks.filter(book => book.Category === activeCategory);
    }, [activeCategory, showFavorites, favorites]);



    const currentSummary = t(`summaries.${showFavorites ? 'Favorites' : activeCategory}`);

    return (
        <div className="app-container">
            <LanguageSwitcher />
            <a href="#main-content" className="skip-link">{t('common.skip_to_main')}</a>
            <header className="header-section">
                <h1 className="animate-in">
                    {t('title')}
                </h1>
                <p className="subtitle animate-in delay-1">
                    {t('subtitle')}
                </p>
            </header>

            <nav className="nav-bar animate-in delay-2">
                <NavLink
                    to={i18n.language === 'en' ? '/' : `/${i18n.language}/`}
                    className={({ isActive }) => `nav-btn ${isActive && !showFavorites ? 'active' : ''}`}
                    onClick={() => setShowFavorites(false)}
                >
                    <Icon id="book-open" size={18} />
                    {t('nav.all_books')}
                </NavLink>
                <button
                    className={`nav-btn favorites-btn ${showFavorites ? 'active' : ''}`}
                    onClick={() => {
                        setShowFavorites(true);
                        setActiveCategory('All');
                        navigate(i18n.language === 'en' ? '/' : `/${i18n.language}/`);
                    }}
                >
                    <Icon 
                      id="heart" 
                      size={18} 
                      fill={showFavorites ? 'currentColor' : 'none'} 
                      stroke={showFavorites ? 'none' : 'currentColor'}
                    />
                    {t('nav.favorites')} ({favorites.length})
                </button>

                <NavLink
                    to={i18n.language === 'en' ? '/about/' : `/${i18n.language}/about/`}
                    className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setShowFavorites(false)}
                >
                    <Icon id="info" size={18} />
                    {t('nav.about')}
                </NavLink>
                <a
                    href={FEEDBACK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-btn"
                >
                    <Icon id="message-square" size={18} />
                    {t('nav.feedback')}
                </a>
            </nav>

            <div className="content-area">
                {matchPath('*/about', location.pathname) ? (
                    <About key="about" />
                ) : (
                    <div className="home-content">
                        <section className="filters-section animate-in delay-3" aria-label="Book Categories">
                            <CategoryBar
                                categories={categories}
                                activeCategory={activeCategory}
                                setActiveCategory={setActiveCategory}
                            />
                        </section>

                        {currentSummary && (
                            <p className="category-summary animate-in delay-4">
                                {currentSummary}
                            </p>
                        )}

                        <main className="books-grid-container" id="main-content">
                            {showFavorites ? (
                                <FavoriteReadingBoard
                                    books={filteredBooks}
                                    favoriteStatuses={favoriteStatuses}
                                    onStatusChange={updateFavoriteStatus}
                                    isFavorite={isFavorite}
                                    toggleFavorite={toggleFavorite}
                                />
                            ) : (
                                <div className="books-grid">
                                    {filteredBooks.length > 0 ? (
                                        filteredBooks.map((book) => (
                                            <BookCard
                                                key={book.id}
                                                book={book}
                                                isFavorite={isFavorite(book.id)}
                                                onToggleFavorite={() => toggleFavorite(book.id)}
                                            />
                                        ))
                                    ) : (
                                        <div className="empty-state">
                                            <p>{t('common.no_books')} {t('common.try_category')}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </main>
                    </div>
                )}
            </div>

            <Footer />
            <ScrollToTop />
        </div>
    );
};

export default App;

