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
                        rotateZ: 0,
                        rotateX: 45 // Better 3D perspective
                    }}
                    animate={{
                        opacity: [0, 1, 1, 0],
                        scale: [1, 1.4, 1.2, 0.8],
                        // More erratic butterfly-like zig-zag path
                        x: [0, 40, -50, 80, -30, 150],
                        y: [0, -60, -120, -220, -320, -500],
                        rotateZ: [0, 20, -20, 30, -15, 40],
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
                        color: '#ffffff',
                        perspective: '1000px',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {/* The Heart morphing out */}
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        style={{ position: 'absolute', top: 0, left: 0 }}
                    >
                        <Heart size={24} fill="#ff6b6b" stroke="none" />
                    </motion.div>

                    {/* The Butterfly (Double Winged Book) */}
                    <div style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transformStyle: 'preserve-3d',
                    }}>
                        {/* Left Wing */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, rotateY: 0 }}
                            animate={{
                                opacity: [0, 1],
                                scale: [0.5, 1],
                                rotateY: [0, -110, 0, -110, 0, -110, 0, -110] // Deeper flap
                            }}
                            transition={{
                                opacity: { duration: 0.6, delay: 0.8 },
                                scale: { duration: 0.6, delay: 0.8 },
                                rotateY: {
                                    duration: 0.4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.8
                                }
                            }}
                            style={{
                                transformOrigin: 'right center',
                                width: '14px',
                                height: '24px',
                                overflow: 'hidden',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                backfaceVisibility: 'hidden'
                            }}
                        >
                            <Book size={24} fill="white" stroke="white" />
                        </motion.div>

                        {/* Right Wing */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, rotateY: 0 }}
                            animate={{
                                opacity: [0, 1],
                                scale: [0.5, 1],
                                rotateY: [0, 110, 0, 110, 0, 110, 0, 110]
                            }}
                            transition={{
                                opacity: { duration: 0.6, delay: 0.8 },
                                scale: { duration: 0.6, delay: 0.8 },
                                rotateY: {
                                    duration: 0.4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.8
                                }
                            }}
                            style={{
                                transformOrigin: 'left center',
                                width: '14px',
                                height: '24px',
                                overflow: 'hidden',
                                backfaceVisibility: 'hidden'
                            }}
                        >
                            <Book size={24} fill="white" stroke="white" style={{ marginLeft: '-10px' }} />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ButterflyAnimation;
