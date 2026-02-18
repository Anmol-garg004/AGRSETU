import React, { useState } from 'react';
import { DollarSign, Upload, AlertCircle, CheckCircle, Eye } from 'lucide-react';

const DashboardFinancials = () => {
    const [lenderView, setLenderView] = useState(false);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2>Financial Insights</h2>
                <button
                    className={`btn-toggle ${lenderView ? 'active bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setLenderView(!lenderView)}
                >
                    {lenderView ? <Eye size={18} className="mr-2" /> : <Eye size={18} className="mr-2" />}
                    {lenderView ? 'Lender View Mode' : 'Farmer View Mode'}
                </button>
            </div>

            {lenderView ? (
                // LENDER DASHBOARD VIEW
                <div className="lender-dashboard bg-slate-50 p-6 rounded-xl border border-blue-200">
                    <h3 className="text-blue-800 mb-4 flex items-center">
                        <CheckCircle className="mr-2" size={20} /> Verified Income Statement
                    </h3>

                    <div className="grid grid-3 gap-6 mb-6">
                        <div className="metric-card bg-white p-4 shadow-sm rounded-lg">
                            <label className="text-gray-500 text-sm">Annual Net Income</label>
                            <div className="text-2xl font-bold text-gray-800">₹ 3.4 Lakhs</div>
                        </div>
                        <div className="metric-card bg-white p-4 shadow-sm rounded-lg">
                            <label className="text-gray-500 text-sm">Credit Utilization</label>
                            <div className="text-2xl font-bold text-green-600">12%</div>
                        </div>
                        <div className="metric-card bg-white p-4 shadow-sm rounded-lg">
                            <label className="text-gray-500 text-sm">Debt-to-Income Ratio</label>
                            <div className="text-2xl font-bold text-blue-600">0.25</div>
                        </div>
                    </div>

                    <div className="risk-assessment bg-white p-6 rounded-lg shadow-sm">
                        <h4 className="mb-4 text-gray-700 font-semibold">Risk Assessment Factors</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center text-green-700">
                                <CheckCircle size={16} className="mr-2" />
                                Consistent repayment history (Last 3 years)
                            </li>
                            <li className="flex items-center text-green-700">
                                <CheckCircle size={16} className="mr-2" />
                                Verified yield data matches regional average
                            </li>
                            <li className="flex items-center text-yellow-600">
                                <AlertCircle size={16} className="mr-2" />
                                Moderate climate risk exposure (Flood zone C)
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                // FARMER FINANCIAL VIEW
                <div className="grid grid-2 gap-6">
                    <div className="card">
                        <h3 className="mb-4">Loan Eligibility</h3>
                        <div className="eligibility-meter mb-6 text-center">
                            <div className="text-5xl font-bold text-green-600 mb-2">₹ 5,00,000</div>
                            <p className="text-gray-500">Maximum Pre-Approved Amount</p>
                        </div>

                        <div className="action-buttons space-y-3">
                            <button className="btn btn-primary w-full justify-center">
                                Apply for KCC Renewal
                            </button>
                            <button className="btn btn-outline w-full justify-center">
                                View Loan Offers
                            </button>
                        </div>
                    </div>

                    <div className="card">
                        <h3 className="mb-4">Document Vault</h3>
                        <div className="doc-list space-y-4">
                            <div className="doc-item flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 bg-white">
                                <span className="flex items-center">
                                    <CheckCircle size={18} className="text-green-500 mr-2" />
                                    Aadhaar Card
                                </span>
                                <span className="text-xs text-gray-400">Verified</span>
                            </div>
                            <div className="doc-item flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 bg-white">
                                <span className="flex items-center">
                                    <CheckCircle size={18} className="text-green-500 mr-2" />
                                    Land Ownership Proof (Khatouni)
                                </span>
                                <span className="text-xs text-gray-400">Verified</span>
                            </div>
                            <div className="doc-item flex justify-between items-center p-3 border-dashed border-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                                <span className="flex items-center text-gray-600">
                                    <Upload size={18} className="mr-2" />
                                    Upload Bank Statement
                                </span>
                                <span className="text-xs text-blue-500">Pending</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardFinancials;
