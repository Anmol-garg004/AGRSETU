import React from 'react';
import { UserPlus, Sprout, ShieldCheck, BadgeCheck } from 'lucide-react';
import '../index.css';

const Solution = () => {
    return (
        <section className="section bg-white" id="solution">
            <div className="container">
                <h2 className="text-center mb-12">How AGRSETU Works</h2>

                <div className="grid grid-4" style={{ position: 'relative' }}>
                    <div className="step-card">
                        <div className="step-number">1</div>
                        <div className="icon-box" style={{ margin: '0 auto 20px', borderRadius: '50%', width: '80px', height: '80px' }}>
                            <UserPlus size={40} />
                        </div>
                        <h3>Farmer Registers</h3>
                        <p>Simple mobile onboarding with basic KYC details.</p>
                    </div>

                    <div className="step-card">
                        <div className="step-number">2</div>
                        <div className="icon-box" style={{ margin: '0 auto 20px', borderRadius: '50%', width: '80px', height: '80px', background: 'rgba(21, 101, 192, 0.1)', color: '#1565C0' }}>
                            <Sprout size={40} />
                        </div>
                        <h3>Data Tracking</h3>
                        <p>We capture income, crop data, and seasonal patterns.</p>
                    </div>

                    <div className="step-card">
                        <div className="step-number">3</div>
                        <div className="icon-box" style={{ margin: '0 auto 20px', borderRadius: '50%', width: '80px', height: '80px' }}>
                            <ShieldCheck size={40} />
                        </div>
                        <h3>Agri-Trust Score</h3>
                        <p>AI generates a credit score based on real earnings.</p>
                    </div>

                    <div className="step-card">
                        <div className="step-number">4</div>
                        <div className="icon-box" style={{ margin: '0 auto 20px', borderRadius: '50%', width: '80px', height: '80px', background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }}>
                            <BadgeCheck size={40} />
                        </div>
                        <h3>Loan Approved</h3>
                        <p>Banks access the verified score and disburse loans.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Solution;
