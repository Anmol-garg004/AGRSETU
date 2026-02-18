import React from 'react';
import { ArrowRight, ChevronRight, Activity, TrendingUp, Users } from 'lucide-react';
import '../index.css';

const Hero = ({ onLoginClick }) => {
    return (
        <section id="hero" className="hero" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1595838788869-59ed319de4cd?q=80&w=2670&auto=format&fit=crop")'
        }}>
            <div className="hero-overlay"></div>
            <div className="container hero-content fade-up" style={{ animationDelay: '0.2s' }}>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(255,255,255,0.1)', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.2)', marginBottom: '24px', backdropFilter: 'blur(10px)' }}>
                    <span style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '50%' }}></span>
                    <span style={{ color: '#10B981', fontSize: '0.9rem', fontWeight: '600', letterSpacing: '0.5px' }}>NOW LIVE IN 5 STATES</span>
                </div>

                <h1>Digital Credit Identity<br />for <span style={{ color: '#10B981', textShadow: '0 0 40px rgba(16,185,129,0.4)' }}>Modern Farmers</span></h1>

                <p>Empowering rural India with verified income data, AI risk scoring, and fair access to institutional finance. The bridge between soil and capital.</p>

                <div className="hero-buttons" style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button className="btn btn-primary btn-lg" onClick={onLoginClick}>
                        Get Started <ArrowRight size={20} style={{ marginLeft: '10px' }} />
                    </button>
                    <button
                        className="btn btn-secondary btn-lg"
                        onClick={() => document.getElementById('partners').scrollIntoView({ behavior: 'smooth' })}
                    >
                        Partner With Us <ChevronRight size={20} style={{ marginLeft: '10px' }} />
                    </button>
                </div>

                <div className="hero-stats">
                    <div className="stat-item">
                        <Users size={32} style={{ marginBottom: '12px', opacity: 0.8 }} />
                        <span className="stat-val">10k+</span>
                        <span className="stat-label">Farmers Onboarded</span>
                    </div>
                    <div className="stat-item" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)', padding: '0 40px' }}>
                        <Activity size={32} style={{ marginBottom: '12px', opacity: 0.8 }} />
                        <span className="stat-val">₹50Cr+</span>
                        <span className="stat-label">Loans Disbursed</span>
                    </div>
                    <div className="stat-item">
                        <TrendingUp size={32} style={{ marginBottom: '12px', opacity: 0.8 }} />
                        <span className="stat-val">98%</span>
                        <span className="stat-label">Repayment Rate</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
