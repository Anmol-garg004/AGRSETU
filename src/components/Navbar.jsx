import React, { useState, useEffect } from 'react';
import { Sprout } from 'lucide-react';
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
                        transition: 'all 0.3s ease',
                        filter: scrolled ? 'none' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                    }}>
                        <span className={scrolled ? 'logo-text-gradient-dark' : 'logo-text-gradient-light'}>
                            AGR
                        </span>

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

                        <span className={scrolled ? 'logo-text-gradient-blue-dark' : 'logo-text-gradient-blue-light'}>
                            SETU
                        </span>
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

                {/* Mobile Menu Logic handled via CSS or hidden as requested */}
            </div>

        </nav>
    );
};

export default Navbar;
