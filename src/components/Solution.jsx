import React from 'react';
import { UserPlus, Sprout, ShieldCheck, BadgeCheck } from 'lucide-react';
import '../index.css';

const Solution = () => {
    return (
        <section className="section bg-white" id="solution">
            <div className="container">
                <h2 className="text-center mb-12">How AGRSETU Works</h2>

                <div className="grid grid-4" style={{ position: 'relative' }}>

                    {/* Step 1 */}
                    <div className="step-card group">
                        <div className="step-number">1</div>
                        <div className="icon-wrapper">
                            <div className="icon-box" style={{ margin: '0 auto 20px', borderRadius: '50%', width: '80px', height: '80px' }}>
                                <UserPlus size={40} />
                            </div>
                        </div>
                        <h3>Farmer Registers</h3>
                        <p>Simple mobile onboarding with basic KYC details.</p>

                        {/* Hover Info Box */}
                        <div className="step-info-box">
                            <h4>Fast & Easy Signup</h4>
                            <ul>
                                <li>Download the App</li>
                                <li>Enter Mobile Number & OTP</li>
                                <li>Upload Aadhaar/Voter ID</li>
                                <li>Instant Digital KYC Verified</li>
                            </ul>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="step-card group">
                        <div className="step-number">2</div>
                        <div className="icon-wrapper">
                            <div className="icon-box" style={{ margin: '0 auto 20px', borderRadius: '50%', width: '80px', height: '80px', background: 'rgba(21, 101, 192, 0.1)', color: '#1565C0' }}>
                                <Sprout size={40} />
                            </div>
                        </div>
                        <h3>Data Tracking</h3>
                        <p>We capture income, crop data, and seasonal patterns.</p>

                        {/* Hover Info Box */}
                        <div className="step-info-box">
                            <h4>Automated Farm Journal</h4>
                            <ul>
                                <li>Log sowing & harvest dates</li>
                                <li>Upload crop photos</li>
                                <li>Satellite validates land use</li>
                                <li>Daily growth tracking</li>
                            </ul>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="step-card group">
                        <div className="step-number">3</div>
                        <div className="icon-wrapper">
                            <div className="icon-box" style={{ margin: '0 auto 20px', borderRadius: '50%', width: '80px', height: '80px' }}>
                                <ShieldCheck size={40} />
                            </div>
                        </div>
                        <h3>Agri-Trust Score</h3>
                        <p>AI generates a credit score based on real earnings.</p>

                        {/* Hover Info Box */}
                        <div className="step-info-box">
                            <h4>Your Financial Passport</h4>
                            <ul>
                                <li>AI analyzes improved yield</li>
                                <li>Monitors steady income</li>
                                <li>Benchmarks regional data</li>
                                <li>Generates Bank-Ready Score</li>
                            </ul>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="step-card group">
                        <div className="step-number">4</div>
                        <div className="icon-wrapper">
                            <div className="icon-box" style={{ margin: '0 auto 20px', borderRadius: '50%', width: '80px', height: '80px', background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }}>
                                <BadgeCheck size={40} />
                            </div>
                        </div>
                        <h3>Loan Approved</h3>
                        <p>Banks access the verified score and disburse loans.</p>

                        {/* Hover Info Box */}
                        <div className="step-info-box">
                            <h4>Instant Credit Access</h4>
                            <ul>
                                <li>Apply for KCC / Agri Loans</li>
                                <li>Banks view Verified Score</li>
                                <li>Paperless Approval</li>
                                <li>Funds Disbursed to Account</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Solution;
