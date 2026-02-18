import React, { useState } from 'react';
import {
    Search,
    Download,
    Filter,
    ArrowDownLeft,
    Banknote,
    Building2,
    Calendar,
    ChevronDown,
    IndianRupee,
    Laptop,
    Box
} from 'lucide-react';

const DashboardTransactions = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Unified transaction data
    const transactions = [
        {
            id: 'TXN001',
            date: '2026-02-18',
            source: 'Mandi Sale (Wheat)',
            category: 'Direct Market Sale',
            method: 'IOT Cashbox',
            amount: 12500,
            status: 'Deposited',
            type: 'Cash'
        },
        {
            id: 'TXN002',
            date: '2026-02-15',
            source: 'PM-Kisan Installment',
            category: 'Govt. Direct Benefit (DBT)',
            method: 'Bank Account',
            amount: 2000,
            status: 'Completed',
            type: 'Digital'
        },
        {
            id: 'TXN003',
            date: '2026-02-12',
            source: 'Local Merchant (Potato)',
            category: 'Direct Market Sale',
            method: 'IOT Cashbox',
            amount: 8200,
            status: 'Deposited',
            type: 'Cash'
        },
        {
            id: 'TXN004',
            date: '2026-02-10',
            source: 'Crop Insurance Claim',
            category: 'Govt. Directly (KCC)',
            method: 'Bank Account',
            amount: 15400,
            status: 'Completed',
            type: 'Digital'
        },
        {
            id: 'TXN005',
            date: '2026-02-05',
            source: 'Fertilizer Subsidy',
            category: 'Govt. Directly (DBT)',
            method: 'Bank Account',
            amount: 1200,
            status: 'Completed',
            type: 'Digital'
        }
    ];

    const filteredTransactions = transactions.filter(t =>
        t.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fade-in space-y-6">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">Transaction Ledger</h2>
                    <p className="text-slate-500 font-medium">Unified view of Gov payments and Cashbox income</p>
                </div>
                <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-2xl font-bold hover:bg-black transition-all">
                    <Download size={18} /> Export Statement
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 lg-grid-cols-1 gap-6">
                <div className="card p-6 border-slate-100 bg-white shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                            <Laptop size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Gov. Bank Credits</p>
                            <p className="text-2xl font-black text-slate-900 leading-none">₹ 18,600</p>
                        </div>
                    </div>
                </div>
                <div className="card p-6 border-slate-100 bg-white shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                            <Box size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cashbox Income</p>
                            <p className="text-2xl font-black text-slate-900 leading-none">₹ 20,700</p>
                        </div>
                    </div>
                </div>
                <div className="card p-6 border-slate-100 bg-emerald-600 shadow-lg text-white">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-2xl">
                            <IndianRupee size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Total Earnings</p>
                            <p className="text-2xl font-black leading-none">₹ 39,300</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Table Section */}
            <div className="card bg-white border-slate-100 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between flex-wrap gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Filter by source or type..."
                            className="pl-11 pr-4 py-3 bg-slate-50 border-0 rounded-xl w-80 text-sm font-medium focus:ring-2 ring-emerald-500/20 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-600 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-all border-0 cursor-pointer">
                            <Filter size={14} /> Category
                            <ChevronDown size={14} />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-600 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-all border-0 cursor-pointer">
                            <Calendar size={14} /> Feb 2026
                            <ChevronDown size={14} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Date & ID</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Source Description</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Payment Channel</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Amount Received</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredTransactions.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-5">
                                        <p className="text-sm font-bold text-slate-900 mb-0.5">{item.date}</p>
                                        <p className="text-[10px] font-black text-slate-400 tracking-tighter">{item.id}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2.5 rounded-xl ${item.type === 'Digital' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                                {item.type === 'Digital' ? <Building2 size={18} /> : <Banknote size={18} />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-800 leading-none mb-1">{item.source}</p>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <div className="flex flex-col items-start">
                                            <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg ${item.method === 'Bank Account' ? 'bg-slate-100 text-slate-600' : 'bg-emerald-50 text-emerald-700'}`}>
                                                {item.method}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <span className="text-lg font-black text-slate-900 tracking-tighter">₹ {item.amount.toLocaleString()}</span>
                                            <ArrowDownLeft size={16} className="text-emerald-500" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex justify-center">
                                            <span className={`status-badge ${item.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-50 text-amber-700'} border-0`}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardTransactions;
