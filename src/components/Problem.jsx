import React from 'react';
import { Calendar, Banknote, TrendingDown } from 'lucide-react';
import '../index.css';

const Problem = () => {
    return (
        <section className="section bg-light" id="problem">
            <div className="container">
                <h2 className="text-center mb-4">Why Agrsetu?</h2>
                <p className="text-center mb-12" style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
                    Millions of farmers struggle to get fair loans because traditional banking systems don't understand rural cashflows.
                </p>

                <div className="grid grid-3">
                    <div className="card text-center">
                        <div className="icon-box" style={{ margin: '0 auto 20px' }}>
                            <Banknote size={32} />
                        </div>
                        <h3>No Bank Statements</h3>
                        <p>Most transactions are in cash, leaving no digital footprint for banks to assess creditworthiness.</p>
                    </div>

                    <div className="card text-center">
                        <div className="icon-box" style={{ margin: '0 auto 20px' }}>
                            <Calendar size={32} />
                        </div>
                        <h3>Seasonal Earnings</h3>
                        <p>Income is irregular and harvest-dependent, which doesn't fit standard monthly EMI models.</p>
                    </div>

                    <div className="card text-center">
                        <div className="icon-box" style={{ margin: '0 auto 20px' }}>
                            <TrendingDown size={32} />
                        </div>
                        <h3>Low Loan Approval</h3>
                        <p>Without verified income data, banks reject applications or charge predatory interest rates.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Problem;
