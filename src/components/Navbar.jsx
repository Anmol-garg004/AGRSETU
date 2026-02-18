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
                        fontSize: '2rem',
                        fontWeight: '900',
                        display: 'flex',
                        alignItems: 'center',
                        letterSpacing: '-1px',
                        transition: 'all 0.3s ease'
                    }}>
                        <span style={{
                            background: scrolled
                                ? 'linear-gradient(135deg, #064E3B 0%, #047857 100%)'
                                : 'linear-gradient(135deg, #FFFFFF 0%, #D1FAE5 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            filter: scrolled ? 'none' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                        }}>AGRSE</span>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: scrolled
                                ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                                : 'linear-gradient(135deg, #34D399 0%, #10B981 100%)',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            margin: '0 4px',
                            boxShadow: scrolled ? '0 4px 10px rgba(16, 185, 129, 0.4)' : '0 4px 15px rgba(0,0,0,0.3)',
                            border: scrolled ? 'none' : '2px solid rgba(255,255,255,0.2)',
                            transition: 'all 0.3s ease'
                        }}>
                            <Sprout size={24} color="white" strokeWidth={2.5} style={{ transform: 'translateY(1px)' }} />
                        </div>

                        <span style={{
                            background: scrolled
                                ? 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)'
                                : 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            filter: scrolled ? 'none' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                        }}>U</span>
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
