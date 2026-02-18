import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import '../index.css';

const Hero = () => {
    return (
        <section id="hero" className="hero" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1625246333195-58197bd47f3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")'
        }}>
            <div className="hero-overlay"></div>
            <div className="container hero-content fade-up" style={{ animationDelay: '0.2s' }}>
                <h1>Digital Credit Identity for Farmers</h1>
                <p>Empowering farmers with verified income, AI risk scoring, and fair access to finance. Bridging the gap between agriculture and banking.</p>

                <div className="hero-buttons">
                    <button className="btn btn-primary" style={{ backgroundColor: '#2E7D32', border: 'none', padding: '16px 32px', fontSize: '1.2rem' }}>
                        Get Started <ArrowRight size={20} style={{ marginLeft: '10px' }} />
                    </button>
                    <button className="btn btn-white" style={{ padding: '16px 32px', fontSize: '1.2rem' }}>
                        Partner With Us <ChevronRight size={20} />
                    </button>
                </div>

                <div style={{ marginTop: '60px', display: 'flex', gap: '40px', justifyContent: 'center', opacity: 0.8 }}>
                    <div>
                        <span style={{ display: 'block', fontSize: '2rem', fontWeight: 'bold' }}>10k+</span>
                        <span style={{ fontSize: '0.9rem' }}>Farmers Onboarded</span>
                    </div>
                    <div>
                        <span style={{ display: 'block', fontSize: '2rem', fontWeight: 'bold' }}>₹50Cr+</span>
                        <span style={{ fontSize: '0.9rem' }}>Loans Facilitated</span>
                    </div>
                    <div>
                        <span style={{ display: 'block', fontSize: '2rem', fontWeight: 'bold' }}>98%</span>
                        <span style={{ fontSize: '0.9rem' }}>Poverty Reduction</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
