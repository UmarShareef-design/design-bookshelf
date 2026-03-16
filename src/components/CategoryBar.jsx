import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const CategoryBar = ({ categories, activeCategory, setActiveCategory }) => {
    const { t } = useTranslation();
    const containerRef = useRef(null);

    const handleCategoryClick = (category, event) => {
        setActiveCategory(category);

        // Scroll the clicked button into view with some padding
        const button = event.currentTarget;
        const container = containerRef.current;

        if (container && button) {
            const containerRect = container.getBoundingClientRect();
            const buttonRect = button.getBoundingClientRect();

            // Calculate scroll position to center the button
            const scrollLeft = button.offsetLeft - (containerRect.width / 2) + (buttonRect.width / 2);

            container.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="category-bar-wrapper">
            <div className="category-bar glass-effect" ref={containerRef} role="tablist">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                        onClick={(e) => handleCategoryClick(category, e)}
                        role="tab"
                        aria-selected={activeCategory === category}
                    >
                        {t(`categories.${category}`)}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryBar;

