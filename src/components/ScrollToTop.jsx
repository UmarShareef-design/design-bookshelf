import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from './Icons';

const SCROLL_THRESHOLD_FOLD = 1; // Show button after scrolling past 1 viewport height (first fold)

const ScrollToTop = () => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const tickingRef = useRef(false);

    const checkScrollPosition = useCallback(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const viewportHeight = window.innerHeight;
        setIsVisible(scrollTop >= viewportHeight * SCROLL_THRESHOLD_FOLD);
    }, []);

    // Throttled scroll handler using requestAnimationFrame
    const handleScroll = useCallback(() => {
        if (!tickingRef.current) {
            tickingRef.current = true;
            requestAnimationFrame(() => {
                checkScrollPosition();
                tickingRef.current = false;
            });
        }
    }, [checkScrollPosition]);

    useEffect(() => {
        // Check initial position (e.g., page restored from scroll)
        checkScrollPosition();

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [handleScroll]);

    const scrollToTop = () => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
    };

    // Guard against SSR (Astro prerendering) where document is undefined
    if (typeof document === 'undefined') return null;

    return createPortal(
        <button
            className={`scroll-to-top ${isVisible ? 'scroll-to-top--visible' : ''}`}
            onClick={scrollToTop}
            aria-label={t('common.back_to_top')}
            aria-hidden={!isVisible}
            tabIndex={isVisible ? 0 : -1}
        >
            <Icon id="arrow-up" size={20} />
        </button>,
        document.body
    );
};

export default ScrollToTop;
