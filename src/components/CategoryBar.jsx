import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const CategoryBar = ({ categories, activeCategory, setActiveCategory }) => {
    const containerRef = useRef(null);
    const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    const handleCategoryClick = (category, event) => {
        // Scroll the clicked link into view with some padding
        const element = event.currentTarget;
        const container = containerRef.current;

        if (container && element) {
            const containerRect = container.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();

            // Calculate scroll position to center the element
            const scrollLeft = element.offsetLeft - (containerRect.width / 2) + (elementRect.width / 2);

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
                    <NavLink
                        key={category}
                        to={category === 'All' ? '/' : `/category/${slugify(category)}`}
                        className={({ isActive }) => `category-btn ${isActive ? 'active' : ''}`}
                        onClick={(e) => handleCategoryClick(category, e)}
                    >
                        <motion.span
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ display: 'inline-block' }}
                        >
                            {category}
                        </motion.span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default CategoryBar;
