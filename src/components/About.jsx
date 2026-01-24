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
            style={{
                maxWidth: '800px',
                margin: '2rem auto',
                padding: '3rem',
                borderRadius: '24px',
                color: 'var(--text-primary)',
                lineHeight: '1.8'
            }}
        >
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, var(--accent-color), var(--accent-secondary))',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem auto'
                }}>
                    <User size={40} color="#000" />
                </div>
                <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2rem',
                    marginBottom: '0.5rem'
                }}>About Me</h2>
            </div>

            <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                <p style={{ marginBottom: '1.5rem' }}>
                    I'm Umar Shareef, a mechanical engineer turned website designer and now exploring vibe coding to build my own websites.
                </p>

                <p style={{ marginBottom: '1.5rem' }}>
                    I love reading books, but I've always felt confused whenever I visited Amazon to buy one.
                </p>

                <p style={{ marginBottom: '1.5rem' }}>
                    Then I started researching and categorising books skill-wise, and now it's a live website that will be helpful to anyone who is in the same place where I was a few years ago.
                </p>

                <p style={{
                    marginBottom: '2rem',
                    padding: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    borderLeft: '4px solid var(--accent-color)'
                }}>
                    Full Affiliate Disclosure: All these links are affiliate links. Using these wouldn't cost you anything extra, but will give me a tiny commission that would motivate me a lot.
                </p>

                <p style={{ marginBottom: '2rem', fontStyle: 'italic', color: 'var(--accent-color)' }}>
                    Happy Upskilling Designers :)
                </p>

                <div style={{ textAlign: 'center' }}>
                    <a
                        href="https://www.linkedin.com/in/umardesignsgraphic/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="buy-button"
                        style={{
                            display: 'inline-flex',
                            width: 'auto',
                            padding: '1rem 2rem',
                            textDecoration: 'none'
                        }}
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
