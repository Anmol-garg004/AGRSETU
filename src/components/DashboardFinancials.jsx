import React, { useState } from 'react';
import { DollarSign, Upload, AlertCircle, CheckCircle, Eye, User, Briefcase, FileText, ChevronRight } from 'lucide-react';

const DashboardFinancials = () => {
    const [lenderView, setLenderView] = useState(false);

    return (
        <div className="fade-in">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Financial Insights</h2>
                    <p className="text-slate-500 font-medium">Manage your agricultural credit and documents</p>
                </div>

                {/* Professional Segmented Toggle */}
                <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center shadow-inner">
                    <button
                        onClick={() => setLenderView(false)}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${!lenderView ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <User size={18} /> Farmer View
                    </button>
                    <button
                        onClick={() => setLenderView(true)}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${lenderView ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Briefcase size={18} /> Lender View
                    </button>
                </div>
            </div>

            {lenderView ? (
                // LENDER DASHBOARD VIEW
                <div className="lender-dashboard bg-blue-50/50 p-8 rounded-3xl border border-blue-100 fade-in">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="m-0 text-blue-900 flex items-center">
                            <ShieldCheck className="mr-2 text-blue-600" size={24} /> Verified Income Statement
                        </h3>
                        <span className="text-[10px] font-black bg-blue-600 text-white px-3 py-1 rounded-full uppercase tracking-widest">Audited Data</span>
                    </div>

                    <div className="grid grid-3 gap-6 mb-8">
                        <div className="card bg-white p-6 shadow-sm border-0 group hover:bg-blue-600 transition-all duration-300">
                            <label className="text-slate-400 group-hover:text-blue-100 text-[10px] font-black uppercase tracking-widest mb-1 block">Annual Net Income</label>
                            <div className="text-3xl font-black text-slate-900 group-hover:text-white tracking-tighter">₹ 3.4 Lakhs</div>
                        </div>
                        <div className="card bg-white p-6 shadow-sm border-0 group hover:bg-emerald-600 transition-all duration-300">
                            <label className="text-slate-400 group-hover:text-emerald-100 text-[10px] font-black uppercase tracking-widest mb-1 block">Credit Utilization</label>
                            <div className="text-3xl font-black text-emerald-600 group-hover:text-white tracking-tighter">12%</div>
                        </div>
                        <div className="card bg-white p-6 shadow-sm border-0 group hover:bg-blue-600 transition-all duration-300">
                            <label className="text-slate-400 group-hover:text-blue-100 text-[10px] font-black uppercase tracking-widest mb-1 block">Debt-to-Income</label>
                            <div className="text-3xl font-black text-blue-600 group-hover:text-white tracking-tighter">0.25</div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                        <h4 className="mb-6 text-slate-800 font-black uppercase tracking-tight text-sm">Risk Assessment Profile</h4>
                        <div className="space-y-4">
                            {[
                                { text: "Consistent repayment history (Last 3 years)", status: "safe", icon: CheckCircle },
                                { text: "Verified yield data matches regional average", status: "safe", icon: CheckCircle },
                                { text: "Moderate climate risk exposure (Flood zone C)", status: "warn", icon: AlertCircle },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center p-4 rounded-xl bg-slate-50 border border-slate-100 transition-hover hover:border-blue-200">
                                    <item.icon size={20} className={`mr-3 ${item.status === 'safe' ? 'text-emerald-500' : 'text-amber-500'}`} />
                                    <span className="text-slate-700 font-semibold">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                // FARMER FINANCIAL VIEW
                <div className="grid grid-2 gap-8">
                    <div className="card shadow-md border-0 p-8 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="m-0">Loan Eligibility</h3>
                                <div className="p-3 bg-emerald-50 rounded-2xl">
                                    <DollarSign className="text-emerald-600" size={24} />
                                </div>
                            </div>
                            <div className="my-10 text-center">
                                <div className="text-6xl font-black text-slate-900 tracking-tighter mb-2">₹ 5.0L</div>
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Pre-Approved Limit</p>
                            </div>
                        </div>

                        <div className="space-y-4 mt-4">
                            <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 transition-all">
                                Apply for KCC Renewal
                            </button>
                            <button className="w-full py-4 bg-white border-2 border-slate-100 hover:border-slate-200 text-slate-700 rounded-2xl font-bold transition-all">
                                View Personalized Offers
                            </button>
                        </div>
                    </div>

                    <div className="card shadow-md border-0 p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="m-0">Document Vault</h3>
                            <button className="p-2 border border-slate-100 rounded-lg hover:bg-slate-50">
                                <Upload size={18} className="text-slate-600" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: "Aadhaar Card", status: "Verified", date: "Jan 20, 2026" },
                                { name: "Khatouni (Land Proof)", status: "Verified", date: "Feb 02, 2026" },
                                { name: "Bank Statement", status: "Pending", date: "Action Needed" },
                            ].map((doc, i) => (
                                <div key={i} className="group flex justify-between items-center p-5 border border-slate-50 rounded-2xl hover:bg-slate-50 hover:border-slate-200 transition-all cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${doc.status === 'Verified' ? 'bg-emerald-50' : 'bg-blue-50'}`}>
                                            <FileText size={20} className={doc.status === 'Verified' ? 'text-emerald-600' : 'text-blue-600'} />
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-slate-800 leading-none mb-1">{doc.name}</h5>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{doc.date}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${doc.status === 'Verified' ? 'text-emerald-700 bg-emerald-100/50' : 'text-blue-700 bg-blue-100/50'}`}>
                                            {doc.status}
                                        </span>
                                        <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ShieldCheck = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="M9 12l2 2 4-4"></path>
    </svg>
);

export default DashboardFinancials;
