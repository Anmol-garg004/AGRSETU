import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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
                <div className="logo">
                    AGR<span>SETU</span>
                </div>

                {/* Desktop Menu */}
                <div className="nav-links desktop-only">
                    <a href="#hero">Home</a>
                    <a href="#features">Features</a>
                    <a href="#partners">Partners</a>
                    <a href="#impact">Impact</a>
                    <a href="#contact">Contact</a>
                </div>

                <div className="nav-actions desktop-only">
                    <button className="btn btn-primary" onClick={onLoginClick}>Get Started</button>
                </div>

                {/* Mobile Menu Button */}
                <div className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="mobile-menu">
                    <a href="#hero" onClick={() => setIsOpen(false)}>Home</a>
                    <a href="#features" onClick={() => setIsOpen(false)}>Features</a>
                    <a href="#partners" onClick={() => setIsOpen(false)}>Partners</a>
                    <a href="#impact" onClick={() => setIsOpen(false)}>Impact</a>
                    <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
                    <button className="btn btn-primary w-full" onClick={() => { setIsOpen(false); onLoginClick(); }}>Get Started</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
