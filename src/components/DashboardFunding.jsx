import React from 'react';
import { IndianRupee, Building, Landmark, Percent, ArrowRight, ShieldCheck, Sprout, FileText } from 'lucide-react';

const DashboardFunding = ({ trustScore = 942, searchQuery = '' }) => {
    const [applicationStatus, setApplicationStatus] = React.useState({}); // { [idx]: 'idle' | 'processing' | 'applied' }
    const [notification, setNotification] = React.useState(null);

    const handleApply = (idx, type) => {
        setApplicationStatus(prev => ({ ...prev, [idx]: 'processing' }));

        setTimeout(() => {
            setApplicationStatus(prev => ({ ...prev, [idx]: 'applied' }));
            setNotification(`Application for ${type} submitted successfully!`);

            setTimeout(() => setNotification(null), 4000);
        }, 1800);
    };

    // Mock Data based on Indian Agri Context
    const loans = [
        {
            bank: "State Bank of India",
            type: "Kisan Credit Card (KCC)",
            interest: "7% p.a.",
            amount: "₹5,00,000",
            minScore: 650,
            features: ["No collateral up to ₹1.6 Lakh", "Flexible repayment", "Crop insurance coverage"],
            logo: "SBI"
        },
        {
            bank: "HDFC Bank",
            type: "Agri Gold Loan",
            interest: "8.5% p.a.",
            amount: "₹10,00,000",
            minScore: 700,
            features: ["Instant disbursement", "Zero processing fee", "Minimal documentation"],
            logo: "HDFC"
        },
        {
            bank: "NABARD",
            type: "Farm Mechanization Loan",
            interest: "6.5% p.a.",
            amount: "₹5,00,000",
            minScore: 750,
            features: ["Subsidized interest", "For tractors & equipment", "Long tenure"],
            logo: "NABARD"
        }
    ];

    const schemes = [
        {
            name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
            type: "Crop Insurance",
            benefit: "Risk cover against non-preventable natural risks from pre-sowing to post-harvest.",
            eligibility: "All farmers growing notified crops",
            link: "#"
        },
        {
            name: "PM Kisan Samman Nidhi",
            type: "Income Support",
            benefit: "₹6,000 per year in three equal installments directly to bank accounts.",
            eligibility: "Small & Marginal Farmers",
            link: "#"
        },
        {
            name: "Agriculture Infrastructure Fund (AIF)",
            type: "Infrastructure",
            benefit: "Interest subvention of 3% per annum up to a limit of ₹2 Crore.",
            eligibility: "Agri-Entrepreneurs, Startups",
            link: "#"
        }
    ];

    const filteredLoans = loans.filter(l =>
        l.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredSchemes = schemes.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 fade-in pb-12 relative">
            {/* Notification Toast */}
            {notification && (
                <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 border border-slate-700">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-slate-900">
                        <ShieldCheck size={18} fill="currentColor" className="text-emerald-500 bg-white rounded-full" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm">Application Sent</h4>
                        <p className="text-xs text-slate-300">{notification}</p>
                    </div>
                </div>
            )}

            {/* Header Section */}
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <IndianRupee className="text-emerald-600" size={28} /> Financial Service Center
                </h2>
                <p className="text-slate-500 font-medium">Tailored financial products based on your <span className="text-emerald-600 font-bold">Agri-Trust Score</span>.</p>
            </div>

            {/* Score Context Banner */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold uppercase text-xs tracking-widest">
                            <ShieldCheck size={14} /> Trust Score Analysis
                        </div>
                        <h3 className="text-3xl font-black mb-1">Excellent Credit Profile</h3>
                        <p className="text-slate-300 max-w-xl text-sm leading-relaxed">
                            Your current score of <span className="text-white font-black text-lg">{trustScore}</span> makes you eligible for <span className="text-emerald-400 font-bold">Premium Tier</span> loans with preferential interest rates starting at just 4%.
                        </p>
                    </div>
                    <button className="whitespace-nowrap bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20">
                        View Detailed Report <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            {/* Bank Loans Section */}
            <div>
                <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                    <Building size={20} className="text-slate-400" /> Pre-Approved Bank Offers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLoans.length > 0 ? filteredLoans.map((loan, idx) => (
                        <div key={idx} className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden">
                            {/* ... (rest of card content) */}
                            <div className="absolute top-0 right-0 p-3 opacity-10 font-black text-6xl text-slate-900 select-none">
                                %
                            </div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-slate-50 rounded-xl">
                                    <Landmark size={24} className="text-slate-700" />
                                </div>
                                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase px-2 py-1 rounded-md">
                                    98% Match
                                </span>
                            </div>

                            <h4 className="text-lg font-black text-slate-900 mb-1">{loan.bank}</h4>
                            <p className="text-sm font-bold text-slate-500 mb-4">{loan.type}</p>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between items-center py-2 border-b border-dashed border-slate-100">
                                    <span className="text-xs font-bold text-slate-400 uppercase">Interest Rate</span>
                                    <span className="text-sm font-black text-emerald-600">{loan.interest}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-dashed border-slate-100">
                                    <span className="text-xs font-bold text-slate-400 uppercase">Max Amount</span>
                                    <span className="text-sm font-black text-slate-800">{loan.amount}</span>
                                </div>
                            </div>

                            <ul className="space-y-2 mb-6">
                                {loan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleApply(idx, loan.type)}
                                disabled={applicationStatus[idx] === 'processing' || applicationStatus[idx] === 'applied'}
                                className={`w-full py-3 rounded-xl text-sm font-bold transition-all shadow-lg flex items-center justify-center gap-2
                                    ${applicationStatus[idx] === 'applied'
                                        ? 'bg-emerald-600 text-white cursor-default'
                                        : applicationStatus[idx] === 'processing'
                                            ? 'bg-slate-700 text-slate-300 cursor-wait'
                                            : 'bg-slate-900 text-white hover:bg-emerald-600 shadow-slate-900/10'
                                    }`}
                            >
                                {applicationStatus[idx] === 'processing' ? 'Processing...' :
                                    applicationStatus[idx] === 'applied' ? <>Applied <ShieldCheck size={16} /></> :
                                        'Apply Now'}
                            </button>
                        </div>
                    )) : (
                        <p className="text-slate-500 col-span-3 text-center py-8">No loans found matching "{searchQuery}"</p>
                    )}
                </div>
            </div>

            {/* Government Schemes Section */}
            <div>
                <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                    <Sprout size={20} className="text-slate-400" /> Government Schemes (Govt. of India)
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredSchemes.length > 0 ? filteredSchemes.map((scheme, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row bg-slate-50 border border-slate-100 rounded-2xl p-6 gap-6 hover:bg-white hover:shadow-lg transition-all">
                            {/* ... (rest of scheme card) */}
                            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Govt Emblem" className="w-8 opacity-80" />
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <h4 className="text-base font-black text-slate-900">{scheme.name}</h4>
                                    <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full uppercase">{scheme.type}</span>
                                </div>
                                <p className="text-sm text-slate-600 font-medium mb-3 leading-relaxed">
                                    {scheme.benefit}
                                </p>
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-4">
                                    <FileText size={14} /> Eligibility: <span className="text-slate-700">{scheme.eligibility}</span>
                                </div>
                                <button
                                    onClick={() => handleApply(`scheme-${idx}`, scheme.name)}
                                    disabled={applicationStatus[`scheme-${idx}`] === 'processing' || applicationStatus[`scheme-${idx}`] === 'applied'}
                                    className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-wide transition-all shadow-md flex items-center justify-center gap-2
                                         ${applicationStatus[`scheme-${idx}`] === 'applied'
                                            ? 'bg-emerald-600 text-white cursor-default'
                                            : applicationStatus[`scheme-${idx}`] === 'processing'
                                                ? 'bg-slate-700 text-slate-300 cursor-wait'
                                                : 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-900 hover:text-white hover:border-slate-900'
                                        }`}
                                >
                                    {applicationStatus[`scheme-${idx}`] === 'processing' ? 'Processing...' :
                                        applicationStatus[`scheme-${idx}`] === 'applied' ? <>Enrolled <ShieldCheck size={14} /></> :
                                            'Check & Apply'}
                                </button>
                            </div>
                        </div>
                    )) : (
                        <p className="text-slate-500 col-span-2 text-center py-8">No schemes found matching "{searchQuery}"</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardFunding;
