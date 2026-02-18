import React from 'react';
import { Shield, CheckCircle, Smartphone, Lock } from 'lucide-react';
import '../index.css';

const ForBanks = () => {
    return (
        <section className="section" id="partners" style={{ backgroundColor: '#1565C0', color: 'white' }}>
            <div className="container">
                <div className="grid grid-2" style={{ alignItems: 'center' }}>
                    <div>
                        <h2 style={{ color: 'white', marginBottom: '1.5rem' }}>For Banks & NBFCs</h2>
                        <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                            De-risk your agricultural lending portfolio with verifyable data and AI insights.
                        </p>

                        <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
                            <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                <CheckCircle size={24} style={{ marginRight: '12px', color: '#4CAF50' }} />
                                <span>Verified Income Data & Seasonal Insights</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                <Shield size={24} style={{ marginRight: '12px', color: '#4CAF50' }} />
                                <span>Lower Default Risk with AI Scoring</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                <Lock size={24} style={{ marginRight: '12px', color: '#4CAF50' }} />
                                <span>Fraud Prevention & Identity Verification</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center' }}>
                                <Smartphone size={24} style={{ marginRight: '12px', color: '#4CAF50' }} />
                                <span>Digital Monitoring & Early Warnings</span>
                            </li>
                        </ul>

                        <button className="btn btn-white">
                            Request a Demo
                        </button>
                    </div>

                    <div className="card" style={{ color: '#1E293B', padding: '40px' }}>
                        <h3 className="text-center mb-4">Partner With Us</h3>
                        <p className="text-center mb-8">Join the revolution in rural finance.</p>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="mb-4">
                                <input type="email" placeholder="Official Email Address" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1' }} required />
                            </div>
                            <div className="mb-4">
                                <input type="text" placeholder="Organization Name" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1' }} required />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                Get In Touch
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForBanks;
