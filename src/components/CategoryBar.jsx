import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const CategoryBar = ({ categories, activeCategory, setActiveCategory }) => {
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
            <div className="category-bar glass-effect" ref={containerRef}>
                {categories.map((category) => (
                    <motion.button
                        key={category}
                        className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                        onClick={(e) => handleCategoryClick(category, e)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {category}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default CategoryBar;
