import React from 'react';
import { Lock, BadgeCheck, Server, Globe } from 'lucide-react';
import '../index.css';

const TechTrust = () => {
    return (
        <section className="section bg-white" id="technology">
            <div className="container">
                <h2 className="text-center mb-12">Built on Trust & Technology</h2>
                <div className="grid grid-2">
                    <div className="card text-left" style={{ display: 'flex', alignItems: 'flex-start', borderLeft: '4px solid #2E7D32' }}>
                        <div style={{ marginRight: '20px', color: '#2E7D32' }}>
                            <Lock size={40} />
                        </div>
                        <div>
                            <h3>Bank-Grade Security</h3>
                            <p>256-bit encryption ensures farmer data and financial records are always protected.</p>
                        </div>
                    </div>

                    <div className="card text-left" style={{ display: 'flex', alignItems: 'flex-start', borderLeft: '4px solid #1565C0' }}>
                        <div style={{ marginRight: '20px', color: '#1565C0' }}>
                            <Server size={40} />
                        </div>
                        <div>
                            <h3>AI-Driven Infrastructure</h3>
                            <p>Advanced machine learning models process satellite and ground data for accurate scoring.</p>
                        </div>
                    </div>

                    <div className="card text-left" style={{ display: 'flex', alignItems: 'flex-start', borderLeft: '4px solid #F59E0B' }}>
                        <div style={{ marginRight: '20px', color: '#F59E0B' }}>
                            <BadgeCheck size={40} />
                        </div>
                        <div>
                            <h3>Verified Identity</h3>
                            <p>Unique digital profiles linked to Aadhaar and land records for undeniable proof of farming.</p>
                        </div>
                    </div>

                    <div className="card text-left" style={{ display: 'flex', alignItems: 'flex-start', borderLeft: '4px solid #7C3AED' }}>
                        <div style={{ marginRight: '20px', color: '#7C3AED' }}>
                            <Globe size={40} />
                        </div>
                        <div>
                            <h3>Government Integration</h3>
                            <p>Seamlessly connected with state agricultural databases and digital public infrastructure.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechTrust;
