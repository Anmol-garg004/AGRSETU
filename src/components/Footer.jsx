import React from 'react';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin, Sprout } from 'lucide-react';
import '../index.css';

const Footer = () => {
    return (
        <footer className="footer" id="contact">
            <div className="container">
                <div className="grid grid-3" style={{ marginBottom: '60px' }}>
                    <div>
                        <div className="logo-container mb-4" style={{ color: 'white' }}>
                            <div className="logo-icon" style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
                                <Sprout size={24} color="white" />
                            </div>
                            <div className="logo-text" style={{ color: 'white' }}>
                                AGR<span style={{ color: '#4ade80' }}>SETU</span>
                            </div>
                        </div>
                        <p style={{ maxWidth: '300px', lineHeight: '1.8' }}>
                            Building the digital bridge between farmers and formal finance with AI-driven trust scores.
                        </p>
                        <div className="flex" style={{ gap: '16px', marginTop: '24px' }}>
                            <a href="#" className="icon-box" style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', color: 'white', marginBottom: 0 }}>
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="icon-box" style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', color: 'white', marginBottom: 0 }}>
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="icon-box" style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', color: 'white', marginBottom: 0 }}>
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1.25rem' }}>Quick Links</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li><a href="#hero">Home</a></li>
                            <li><a href="#features">Features</a></li>
                            <li><a href="#solution">How it Works</a></li>
                            <li><a href="#partners">For Banks</a></li>
                            <li><a href="#impact">Our Impact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1.25rem' }}>Contact Us</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#cbd5e1' }}>
                                <Mail size={20} color="#4ade80" /> info@agrisetu.com
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#cbd5e1' }}>
                                <Phone size={20} color="#4ade80" /> +91 98765 43210
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#cbd5e1' }}>
                                <MapPin size={20} color="#4ade80" /> T-Hub, Hyderabad, India
                            </li>
                        </ul>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>&copy; {new Date().getFullYear()} AGRSETU Technologies Pvt Ltd. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        <a href="#privacy" style={{ fontSize: '0.9rem' }}>Privacy Policy</a>
                        <a href="#terms" style={{ fontSize: '0.9rem' }}>Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
