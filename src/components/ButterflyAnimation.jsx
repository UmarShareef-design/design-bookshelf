import { useState, useEffect } from 'react';
import { Icon } from './Icons';

const ButterflyAnimation = ({ isTriggered, onComplete }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isTriggered && !prefersReducedMotion) {
            setIsAnimating(true);
            const timer = setTimeout(() => {
                setIsAnimating(false);
                onComplete?.();
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [isTriggered, onComplete]);

    if (!isAnimating) return null;

    return (
        <div
            className="butterfly-wandering"
            style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                pointerEvents: 'none',
                zIndex: 100,
                width: '24px',
                height: '24px',
                perspective: '1000px',
                transformStyle: 'preserve-3d',
                opacity: 0
            }}
        >
            <div style={{ position: 'relative', width: '24px', height: '24px', transformStyle: 'preserve-3d' }}>
                <div
                    className="heart-fold"
                    style={{ position: 'absolute', top: 0, left: 0, width: '24px', height: '24px' }}
                >
                    <Icon id="heart" size={24} fill="white" stroke="none" />
                </div>



                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transformStyle: 'preserve-3d',
                    width: '24px',
                    height: '24px'
                }}>
                    <div
                        className="left-wing-flap"
                        style={{
                            transformOrigin: 'right center',
                            width: '12px',
                            height: '24px',
                            overflow: 'hidden',
                            backfaceVisibility: 'hidden',
                            opacity: 0
                        }}
                    >
                        <Icon id="book-open" size={24} fill="white" stroke="none" />
                    </div>

                    <div
                        className="right-wing-flap"
                        style={{
                            transformOrigin: 'left center',
                            width: '12px',
                            height: '24px',
                            overflow: 'hidden',
                            backfaceVisibility: 'hidden',
                            opacity: 0
                        }}
                    >
                        <Icon id="book-open" size={24} fill="white" stroke="none" style={{ marginLeft: '-12px' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};



export default ButterflyAnimation;

