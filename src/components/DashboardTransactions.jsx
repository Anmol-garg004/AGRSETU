import React from 'react';
import {
    CreditCard,
    Smartphone,
    ArrowUpRight,
    ArrowDownLeft,
    History,
    IndianRupee,
    Laptop,
    Box
} from 'lucide-react';

const DashboardTransactions = () => {
    const bankTransactions = [
        { id: 1, type: 'Credit', source: 'KCC Disbursement', amount: '₹ 50,000', date: '2026-02-15', status: 'Completed', method: 'Bank Transfer' },
        { id: 2, type: 'Credit', source: 'Crop Sale Payment', amount: '₹ 25,400', date: '2026-02-10', status: 'Completed', method: 'NEFT' },
        { id: 3, type: 'Credit', source: 'Subsidy Payment', amount: '₹ 5,000', date: '2026-02-05', status: 'Completed', method: 'DBT' },
    ];

    const cashboxTransactions = [
        { id: 1, type: 'Cash', source: 'Mandi Sale', amount: '₹ 12,500', date: '2026-02-18', status: 'Deposited', location: 'Local Hub X' },
        { id: 2, type: 'Cash', source: 'Rental Income', amount: '₹ 3,000', date: '2026-02-17', status: 'Deposited', location: 'Storage A' },
        { id: 3, type: 'Cash', source: 'Direct Sale', amount: '₹ 8,200', date: '2026-02-14', status: 'Processing', location: 'Main Street Box' },
    ];

    return (
        <div className="fade-in space-y-8">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">Transaction History</h2>
                    <p className="text-slate-500 font-medium">Monitor your digital and physical cash flows</p>
                </div>
                <div className="flex gap-4">
                    <div className="card p-4 flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 rounded-xl">
                            <IndianRupee size={20} className="text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Credit</p>
                            <p className="text-xl font-black text-slate-900 leading-none">₹ 1,04,100</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 lg-grid-cols-1 gap-8">
                {/* Bank Transactions Section */}
                <div className="card p-8 bg-slate-50/50">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white shadow-sm rounded-2xl">
                                <Laptop className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <h3 className="m-0 text-xl font-bold">Bank Transactions</h3>
                                <p className="text-xs text-slate-400 font-black uppercase tracking-wider">Digital Credit Flow</p>
                            </div>
                        </div>
                        <span className="status-badge bg-blue-50 text-blue-600 border-blue-100">Direct Deposit</span>
                    </div>

                    <div className="space-y-4">
                        {bankTransactions.map((tr) => (
                            <div key={tr.id} className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all group cursor-pointer shadow-sm">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                                            <ArrowDownLeft size={18} className="text-emerald-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 leading-none mb-1">{tr.source}</h4>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{tr.method}</span>
                                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                                <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{tr.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-emerald-600 text-lg mb-1">+{tr.amount}</p>
                                        <span className="status-badge bg-emerald-50 text-emerald-600 border-emerald-100 py-0.5 px-2 text-[8px]">{tr.status}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-6 py-4 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 font-bold text-sm hover:border-blue-400 hover:text-blue-500 transition-all bg-transparent">
                        Export Statement (PDF)
                    </button>
                </div>

                {/* IOT Cashbox Section */}
                <div className="card p-8 bg-emerald-50/30">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white shadow-sm rounded-2xl">
                                <Box className="text-emerald-600" size={24} />
                            </div>
                            <div>
                                <h3 className="m-0 text-xl font-bold">IOT Cashbox</h3>
                                <p className="text-xs text-slate-400 font-black uppercase tracking-wider">Physical Cash Tracking</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-emerald-100">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            <span className="text-[10px] font-black text-emerald-600 uppercase">Live Connected</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {cashboxTransactions.map((tr) => (
                            <div key={tr.id} className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all group cursor-pointer shadow-sm">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                                            <Smartphone size={18} className="text-slate-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 leading-none mb-1">{tr.source}</h4>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{tr.location}</span>
                                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                                <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{tr.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-slate-900 text-lg mb-1">{tr.amount}</p>
                                        <span className={`status-badge ${tr.status === 'Deposited' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'} py-0.5 px-2 text-[8px]`}>
                                            {tr.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 p-4 bg-white rounded-2xl border border-emerald-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                                    <History size={16} />
                                </div>
                                <span className="text-xs font-bold text-slate-600">Next collection in 2 days</span>
                            </div>
                            <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-transparent border-0 cursor-pointer hover:underline">Request Early Pickup</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardTransactions;
