import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, User } from 'lucide-react';

const About = () => {
    return (
        <motion.div
            className="about-container glass-effect"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <div className="about-header">
                <div className="about-profile-icon">
                    <User size={40} color="#000" />
                </div>
                <h2 className="about-title">About Me</h2>
            </div>

            <div className="about-content">
                <p>
                    I'm Umar Shareef, a Designer who loves reading books with 5+ years of experience. Originally a mechanical engineer, I transitioned into website design and am now exploring "vibe coding" to build my own digital products.
                </p>

                <p>
                    I love reading books, but I've always felt confused whenever I visited Amazon to buy one.
                </p>

                <p>
                    Every week, a new free design tool emerges that claims to do everything better. But I realized that while tools cycle quickly, the core fundamentals found in these books are timeless. In the age of AI, knowing these principles is more important than ever—it’s the only way to truly master the new tools instead of being replaced by them.
                </p>

                <p>
                    I hope this curated collection helps you build an AI-proof foundation for your design career.
                </p>

                <div className="about-disclosure-box">
                    Full Affiliate Disclosure: All these links are affiliate links. Using these wouldn't cost you anything extra, but will give me a tiny commission that would motivate me a lot.
                </div>

                <p className="about-closing-text">
                    Happy Upskilling Designers :)
                </p>

                <div className="about-actions">
                    <a
                        href="https://www.linkedin.com/in/umardesignsgraphic/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="buy-button btn-linkedin"
                    >
                        <Linkedin size={20} />
                        Connect on LinkedIn
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default About;
