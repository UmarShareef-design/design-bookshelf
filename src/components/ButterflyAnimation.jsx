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
            }, 4500); // Increased duration for a slower, graceful flight
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
                        duration: 4.5, // Slower flight
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
                    {/* Morphing & Flapping Container */}
                    <motion.div
                        animate={{
                            rotateY: [0, 70, 0, 70, 0, 70, 0, 70], // More pronounced wing flap
                        }}
                        transition={{
                            duration: 0.6, // Slower wing beats
                            repeat: 7,
                            ease: "easeInOut"
                        }}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* The Heart morphing out */}
                        <motion.div
                            initial={{ opacity: 1 }}
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            style={{ position: 'absolute' }}
                        >
                            <Heart size={24} fill="#ff6b6b" />
                        </motion.div>

                        {/* The Book morphing in */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: [0, 1], scale: [0.5, 1] }}
                            transition={{ duration: 0.8, delay: 1.0 }}
                            style={{ color: '#00f2fe' }}
                        >
                            <Book size={24} fill="#00f2fe" />
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ButterflyAnimation;
