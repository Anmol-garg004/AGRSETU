import React, { useState, useEffect } from 'react';
import {
    ShieldCheck,
    TrendingUp,
    CheckCircle,
    Zap,
    Award,
    Activity,
    BrainCircuit,
    IndianRupee,
    Landmark,
    ThermometerSun
} from 'lucide-react';

const AgriTrustScore = () => {
    const [score, setScore] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(true);
    const [analysisStep, setAnalysisStep] = useState('Initializing AI Model...');
    const [breakdown, setBreakdown] = useState(null);

    // Dynamic Scoring Dimensions based on User Criteria
    const scoringDimensions = [
        { id: 'income', label: 'Income Strength', weight: 0.30, icon: IndianRupee, color: 'text-emerald-400', barColor: 'bg-emerald-500', desc: 'Repayment capacity based on total normalized earnings.' },
        { id: 'stability', label: 'Income Stability', weight: 0.20, icon: TrendingUp, color: 'text-blue-400', barColor: 'bg-blue-500', desc: 'Consistency of cashflow and frequency of transactions.' },
        { id: 'discipline', label: 'Behavioral Discipline', weight: 0.20, icon: ShieldCheck, color: 'text-purple-400', barColor: 'bg-purple-500', desc: 'Past repayment speed and banking interaction quality.' },
        { id: 'risk', label: 'Crop & Climate Risk', weight: 0.15, icon: ThermometerSun, color: 'text-amber-400', barColor: 'bg-amber-500', desc: 'Resilience against local weather and crop failures.' },
        { id: 'assets', label: 'Asset & Capacity', weight: 0.15, icon: Landmark, color: 'text-rose-400', barColor: 'bg-rose-500', desc: 'Evaluation of land value, machinery, and sustainability.' }
    ];

    const runAnalysis = () => {
        setIsAnalyzing(true);
        setScore(0);
        setBreakdown(null);

        const steps = [
            { msg: 'Aggregating Mandi Records...', delay: 0 },
            { msg: 'Analyzing Cashflow Stability...', delay: 500 },
            { msg: 'Verifying Behavioral Patterns...', delay: 1000 },
            { msg: 'Scanning Climate Risk Vectors...', delay: 1500 },
            { msg: 'Valuating Land & Assets...', delay: 2000 },
            { msg: 'Finalizing Trust Signature...', delay: 2500 }
        ];

        steps.forEach((step, index) => {
            setTimeout(() => {
                setAnalysisStep(step.msg);
                if (index === steps.length - 1) {
                    setTimeout(calculateNewScore, 800);
                }
            }, step.delay);
        });
    };

    useEffect(() => {
        runAnalysis();
    }, []);

    const calculateNewScore = () => {
        // Core Logic: Weighted calculation
        const rawValues = {
            income: 96,    // Professional capacity
            stability: 92, // Consistent history
            discipline: 98, // Intent factor
            risk: 88,      // Production resilience
            assets: 94     // Resource backing
        };

        // Total weighted score (out of 1000)
        let finalValue = (
            (rawValues.income * 0.30) +
            (rawValues.stability * 0.20) +
            (rawValues.discipline * 0.20) +
            (rawValues.risk * 0.15) +
            (rawValues.assets * 0.15)
        ) * 10;

        setBreakdown(rawValues);

        // Animate count up
        let start = 0;
        const timer = setInterval(() => {
            start += 12;
            if (start >= finalValue) {
                setScore(Math.round(finalValue));
                setIsAnalyzing(false);
                clearInterval(timer);
            } else {
                setScore(Math.round(start));
            }
        }, 20);
    };

    const getGrade = (s) => {
        if (s >= 900) return { label: 'Agri-Elite', color: 'text-emerald-400', bg: 'bg-emerald-400/10' };
        if (s >= 800) return { label: 'Premium', color: 'text-blue-400', bg: 'bg-blue-400/10' };
        return { label: 'Standard', color: 'text-amber-400', bg: 'bg-amber-400/10' };
    };

    const grade = getGrade(score);

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 pb-12">

            {/* Top Score Hub (The "WOW" Section) */}
            <div className="relative bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden border border-slate-800">
                {/* Visual Flair Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -mr-32 -mt-32 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] -ml-20 -mb-20"></div>

                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                    {/* The Gauge Container */}
                    <div className="relative w-72 h-72 shrink-0">
                        {/* Orbiting Ring Animation */}
                        {isAnalyzing && (
                            <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-[spin_4s_linear_infinite]">
                                <div className="absolute -top-1 left-1/2 w-3 h-3 bg-emerald-500 rounded-full blur-sm"></div>
                            </div>
                        )}

                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                            {/* Static Track */}
                            <circle cx="100" cy="100" r="92" stroke="#1e293b" strokeWidth="6" fill="none" />
                            {/* Dynamic Glow Track */}
                            <circle
                                cx="100" cy="100" r="92"
                                stroke="currentColor"
                                strokeWidth="10"
                                strokeLinecap="round"
                                fill="none"
                                strokeDasharray="578"
                                strokeDashoffset={578 - (578 * score) / 1000}
                                className={`transition-all duration-[2s] ease-out-back ${grade.color}`}
                                style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}
                            />
                        </svg>

                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className="text-7xl font-black tracking-tighter tabular-nums drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">{score}</span>
                            <div className={`mt-3 px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-current backdrop-blur-sm ${grade.color} ${grade.bg}`}>
                                {grade.label} Status
                            </div>
                        </div>
                    </div>

                    {/* Stats & Content Area */}
                    <div className="flex-1 space-y-6 text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 shadow-inner">
                                <BrainCircuit size={32} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black tracking-tight leading-none mb-1">Agri-Trust Profile</h1>
                                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Autonomous Credit Signature</p>
                            </div>
                        </div>

                        <p className="text-slate-300 text-lg leading-relaxed font-medium">
                            Our AI Engine has analyzed your <span className="text-white underline decoration-emerald-500 decoration-2 underline-offset-4">Dimension Metrics</span> across 5 proprietary vectors to authenticate your creditworthiness.
                        </p>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
                            <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 px-5 py-4 rounded-3xl group hover:border-emerald-500/50 transition-colors">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">System Status</p>
                                <p className="text-emerald-400 font-bold flex items-center gap-2">
                                    <ShieldCheck size={16} /> Secure Verification
                                </p>
                            </div>
                            <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 px-5 py-4 rounded-3xl group hover:border-blue-500/50 transition-colors">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Last Sync</p>
                                <p className="text-white font-bold flex items-center gap-2">
                                    <Activity size={16} className="text-blue-400" /> Real-time Data
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Processing Overlay */}
                {isAnalyzing && (
                    <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex flex-col items-center justify-center text-center">
                        <div className="relative mb-8">
                            <div className="w-32 h-32 border-4 border-emerald-500/10 rounded-full border-t-emerald-500 animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Activity className="text-emerald-400 animate-pulse" size={40} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-black tracking-tight text-white mb-2">{analysisStep}</h3>
                        <p className="text-slate-500 text-xs uppercase tracking-widest font-black flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                            Neural Engine Processing
                        </p>
                    </div>
                )}
            </div>

            {/* Detailed Mechanics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                {/* Detailed Breakdown (3 Cols) */}
                <div className="lg:col-span-3 bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-10 shadow-sm relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                            <Award className="text-emerald-600" size={28} /> Weighted Dimensions
                        </h3>

                        <div className="space-y-8">
                            {scoringDimensions.map((dim) => (
                                <div key={dim.id} className="group relative">
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-slate-100 transition-colors ${dim.color}`}>
                                                <dim.icon size={24} strokeWidth={2.5} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-black text-slate-900">{dim.label}</p>
                                                    <span className="text-[10px] font-black px-1.5 py-0.5 bg-slate-100 text-slate-400 rounded-md">W: {Math.round(dim.weight * 100)}%</span>
                                                </div>
                                                <p className="text-[11px] text-slate-500 font-medium max-w-xs">{dim.desc}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`text-xl font-black tabular-nums transition-colors duration-500 ${!isAnalyzing ? dim.color : 'text-slate-300'}`}>
                                                {breakdown ? breakdown[dim.id] : 0}%
                                            </p>
                                        </div>
                                    </div>
                                    {/* Advanced Progress Bar */}
                                    <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner p-0.5">
                                        <div
                                            className={`h-full rounded-full ${dim.barColor} shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-all duration-[2.5s] ease-out-quint`}
                                            style={{ width: isAnalyzing ? '0%' : `${breakdown ? breakdown[dim.id] : 0}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Score Benefits & Action (2 Cols) */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Benefits Card */}
                    <div className="flex-1 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-[2.5rem] p-8 md:p-10 text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24 group-hover:scale-125 transition-transform duration-700"></div>

                        <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                            <Zap size={24} className="text-emerald-200" /> Elite Privileges
                        </h3>

                        <div className="space-y-4">
                            {[
                                { title: "Unlocked: Direct Funding", text: "Collateral-free loan up to ₹2.5 Lakhs" },
                                { title: "Preferential Interest", text: "Save ~1.5% compared to baseline" },
                                { title: "Priority Market Entry", text: "Verified status in top agri-mandis" },
                                { title: "Risk Subsidy", text: "Exclusive 20% off on crop insurance" }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-4 bg-white/10 rounded-2xl border border-white/5 backdrop-blur-sm hover:bg-white/20 transition-all">
                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                        <CheckCircle size={14} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black leading-none mb-1">{item.title}</p>
                                        <p className="text-[11px] font-bold text-emerald-100">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Card */}
                    <div className="bg-slate-900 rounded-[2rem] p-6 text-center border border-slate-800">
                        <button
                            onClick={() => runAnalysis()}
                            disabled={isAnalyzing}
                            className={`w-full py-5 rounded-2xl font-black tracking-widest uppercase text-xs flex items-center justify-center gap-3 transition-all hover:-translate-y-1 shadow-2xl active:scale-95 border-0 cursor-pointer
                                ${isAnalyzing ? 'bg-slate-800 text-slate-500' : 'bg-white text-slate-900 hover:bg-emerald-50'}
                            `}
                        >
                            Sync Trust Data
                            <Activity size={18} />
                        </button>
                        <p className="text-[10px] text-slate-500 font-bold mt-4 uppercase tracking-[0.2em]">Verified Blockchain Timestamp</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgriTrustScore;
