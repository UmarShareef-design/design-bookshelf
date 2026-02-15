import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Book } from 'lucide-react';

const ButterflyAnimation = ({ isTriggered, onComplete }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isTriggered) {
            setIsAnimating(true);
            const timer = setTimeout(() => {
                setIsAnimating(false);
                onComplete?.();
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [isTriggered, onComplete]);

    return (
        <AnimatePresence>
            {isAnimating && (
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 1,
                        x: 0,
                        y: 0,
                        rotate: 0
                    }}
                    animate={{
                        opacity: [0, 1, 1, 0],
                        scale: [1, 1.3, 1, 0.6],
                        // More erratic butterfly-like zig-zag path
                        x: [0, 30, -40, 60, -20, 120],
                        y: [0, -40, -100, -180, -280, -450],
                        rotate: [0, 15, -15, 20, -10, 30],
                    }}
                    transition={{
                        duration: 4,
                        ease: "easeInOut",
                        times: [0, 0.15, 0.4, 0.7, 0.9, 1]
                    }}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        pointerEvents: 'none',
                        zIndex: 100,
                        color: '#ff6b6b'
                    }}
                >
                    {/* The Heart morphing out */}
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        style={{ position: 'absolute', top: 0, left: 0 }}
                    >
                        <Heart size={24} fill="#ff6b6b" />
                    </motion.div>

                    {/* The Butterfly (Double Winged Book) */}
                    <div style={{
                        position: 'relative',
                        display: 'flex',
                        transformStyle: 'preserve-3d',
                        perspective: '1000px'
                    }}>
                        {/* Left Wing */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, rotateY: 0 }}
                            animate={{
                                opacity: [0, 1],
                                scale: [0.5, 1],
                                rotateY: [0, -80, 0, -80, 0, -80, 0, -80]
                            }}
                            transition={{
                                opacity: { duration: 0.8, delay: 0.8 },
                                scale: { duration: 0.8, delay: 0.8 },
                                rotateY: {
                                    duration: 0.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.8
                                }
                            }}
                            style={{
                                transformOrigin: 'right center',
                                color: '#ffffff',
                                width: '12px',
                                overflow: 'hidden'
                            }}
                        >
                            <Book size={24} fill="#ffffff" style={{ minWidth: '24px' }} />
                        </motion.div>

                        {/* Right Wing */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, rotateY: 0 }}
                            animate={{
                                opacity: [0, 1],
                                scale: [0.5, 1],
                                rotateY: [0, 80, 0, 80, 0, 80, 0, 80]
                            }}
                            transition={{
                                opacity: { duration: 0.8, delay: 0.8 },
                                scale: { duration: 0.8, delay: 0.8 },
                                rotateY: {
                                    duration: 0.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.8
                                }
                            }}
                            style={{
                                transformOrigin: 'left center',
                                color: '#ffffff',
                                width: '12px',
                                overflow: 'hidden'
                            }}
                        >
                            <Book size={24} fill="#ffffff" style={{ minWidth: '24px', marginLeft: '-12px' }} />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ButterflyAnimation;
