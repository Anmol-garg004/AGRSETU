import React, { useState, useEffect } from 'react';
import { Menu, X, Sprout } from 'lucide-react';
import '../index.css';

const Navbar = ({ onLoginClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container nav-content">
                <a href="#" className="logo-container" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); }}>
                    <div className="logo-text" style={{
                        fontSize: '1.8rem',
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        letterSpacing: '-1px',
                        color: 'var(--primary-dark)'
                    }}>
                        AGRSE
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                            borderRadius: '50%',
                            width: '36px',
                            height: '36px',
                            margin: '0 2px',
                            boxShadow: '0 4px 10px rgba(16, 185, 129, 0.4)'
                        }}>
                            <Sprout size={22} color="white" strokeWidth={2.5} style={{ transform: 'translateY(1px)' }} />
                        </div>
                        <span style={{ color: 'var(--secondary-main)' }}>U</span>
                    </div>
                </a>

                {/* Desktop Menu */}
                <div className="nav-links desktop-only">
                    <a href="#hero">Home</a>
                    <a href="#features">Features</a>
                    <a href="#solution">How it Works</a>
                    <a href="#partners">Partners</a>
                    <a href="#contact">Contact</a>
                </div>

                <div className="nav-actions desktop-only">
                    <button className="btn btn-primary btn-sm" onClick={onLoginClick}>Get Started</button>
                </div>

                {/* Mobile Menu Button */}
                <div className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} color="#166534" /> : <Menu size={28} color="#166534" />}
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="mobile-menu">
                    <a href="#hero" onClick={() => setIsOpen(false)}>Home</a>
                    <a href="#features" onClick={() => setIsOpen(false)}>Features</a>
                    <a href="#solution" onClick={() => setIsOpen(false)}>How it Works</a>
                    <a href="#partners" onClick={() => setIsOpen(false)}>Partners</a>
                    <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
                    <button className="btn btn-primary w-full" onClick={() => { setIsOpen(false); onLoginClick(); }}>Get Started</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
