import React from 'react';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import '../index.css';

const Footer = () => {
    return (
        <footer className="footer bg-dark">
            <div className="container">
                <div className="grid grid-3" style={{ marginBottom: '40px' }}>
                    <div>
                        <div className="logo mb-4" style={{ color: 'white' }}>
                            AGR<span style={{ color: '#4CAF50' }}>SETU</span>
                        </div>
                        <p style={{ color: '#94A3B8' }}>
                            Building the digital bridge between farmers and formal finance.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                            <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h3>Quick Links</h3>
                        <ul style={{ listStyle: 'none' }}>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#features">Features</a></li>
                            <li><a href="#partners">For Banks</a></li>
                            <li><a href="#careers">Careers</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3>Contact Us</h3>
                        <ul style={{ listStyle: 'none', color: '#94A3B8' }}>
                            <li className="flex items-center mb-2">
                                <Mail size={16} style={{ marginRight: '10px' }} /> info@agrisetu.com
                            </li>
                            <li className="flex items-center mb-2">
                                <Phone size={16} style={{ marginRight: '10px' }} /> +91 98765 43210
                            </li>
                            <li className="flex items-center">
                                <MapPin size={16} style={{ marginRight: '10px' }} /> T-Hub, Hyderabad, India
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom flex justify-between items-center" style={{ flexDirection: 'column', gap: '20px' }}>
                    <p>&copy; {new Date().getFullYear()} AGRSETU Technologies Pvt Ltd. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#privacy">Privacy Policy</a>
                        <a href="#terms">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
