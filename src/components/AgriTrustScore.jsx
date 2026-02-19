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
    ThermometerSun,
    Info,
    RefreshCcw,
    AlertCircle
} from 'lucide-react';

const AgriTrustScore = () => {
    const [score, setScore] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(true);
    const [analysisStep, setAnalysisStep] = useState('Initializing AI Model...');
    const [breakdown, setBreakdown] = useState(null);

    const scoringDimensions = [
        { id: 'income', label: 'Income Strength', weight: 0.30, icon: IndianRupee, color: 'text-emerald-600', bgColor: 'bg-emerald-50', barColor: 'bg-emerald-600', desc: 'Repayment capacity based on total earnings.' },
        { id: 'stability', label: 'Income Stability', weight: 0.20, icon: TrendingUp, color: 'text-blue-600', bgColor: 'bg-blue-50', barColor: 'bg-blue-600', desc: 'Consistency of cashflow over 24 months.' },
        { id: 'discipline', label: 'Behavioral Discipline', weight: 0.20, icon: ShieldCheck, color: 'text-indigo-600', bgColor: 'bg-indigo-50', barColor: 'bg-indigo-600', desc: 'Repayment intent and history.' },
        { id: 'risk', label: 'Crop & Climate Risk', weight: 0.15, icon: ThermometerSun, color: 'text-amber-600', bgColor: 'bg-amber-50', barColor: 'bg-amber-600', desc: 'Resilience to production uncertainty.' },
        { id: 'assets', label: 'Asset & Capacity', weight: 0.15, icon: Landmark, color: 'text-rose-600', bgColor: 'bg-rose-50', barColor: 'bg-rose-600', desc: 'Land value and sustainability backing.' }
    ];

    const runAnalysis = () => {
        setIsAnalyzing(true);
        setScore(0);
        setBreakdown(null);

        const steps = [
            { msg: 'Connecting to Mandi Gateway...', delay: 0 },
            { msg: 'Analyzing Income Streams...', delay: 600 },
            { msg: 'Evaluating Payment Behavior...', delay: 1200 },
            { msg: 'Calculating Landscape Risk...', delay: 1800 },
            { msg: 'Finalizing Trust Score...', delay: 2400 }
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
        const rawValues = {
            income: 96,
            stability: 92,
            discipline: 98,
            risk: 88,
            assets: 94
        };

        let finalValue = (
            (rawValues.income * 0.30) +
            (rawValues.stability * 0.20) +
            (rawValues.discipline * 0.20) +
            (rawValues.risk * 0.15) +
            (rawValues.assets * 0.15)
        ) * 10;

        setBreakdown(rawValues);

        let start = 0;
        const timer = setInterval(() => {
            start += Math.ceil((finalValue - start) / 10);
            if (start >= finalValue) {
                setScore(Math.round(finalValue));
                setIsAnalyzing(false);
                clearInterval(timer);
            } else {
                setScore(start);
            }
        }, 30);
    };

    const getGrade = (s) => {
        if (s >= 900) return { label: 'Excellent', color: 'text-emerald-600', border: 'border-emerald-200', bg: 'bg-emerald-50' };
        if (s >= 800) return { label: 'Great', color: 'text-blue-600', border: 'border-blue-200', bg: 'bg-blue-50' };
        return { label: 'Good', color: 'text-amber-600', border: 'border-amber-200', bg: 'bg-amber-50' };
    };

    const grade = getGrade(score);

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">

            {/* Main Score Overview Card */}
            <div className={`bg-white rounded-3xl border ${grade.border} shadow-xl shadow-slate-200/50 overflow-hidden relative`}>
                <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">

                    {/* Gauge Visual */}
                    <div className="relative w-64 h-64 flex flex-col items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90 scale-x-[-1]" viewBox="0 0 100 100">
                            {/* Background Track */}
                            <circle cx="50" cy="50" r="45" stroke="#f1f5f9" strokeWidth="6" fill="none" strokeDasharray="212 283" strokeLinecap="round" />
                            {/* Active Score Track */}
                            <circle
                                cx="50" cy="50" r="45"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="none"
                                strokeDasharray={`${(score / 1000) * 212} 283`}
                                strokeLinecap="round"
                                className={`transition-all duration-1000 ease-out ${grade.color}`}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center mt-[-10px]">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Your Trust Score</p>
                            <h2 className="text-6xl font-black text-slate-900 tabular-nums">{score}</h2>
                            <div className={`mt-2 px-4 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${grade.bg} ${grade.color}`}>
                                {grade.label}
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 space-y-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-1.5 bg-slate-900 rounded-lg text-white">
                                    <BrainCircuit size={18} />
                                </div>
                                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Financial Health Insights</h1>
                            </div>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed">
                                Your score is <span className="text-emerald-600 font-bold">top-tier</span>. You are eligible for the highest borrowing limits and lowest interest rates on the platform.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Risk Profile</p>
                                <p className="text-sm font-black text-slate-800 flex items-center gap-2">
                                    <ShieldCheck size={16} className="text-emerald-500" /> Low Default Risk
                                </p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Peer Ranking</p>
                                <p className="text-sm font-black text-slate-800 flex items-center gap-2">
                                    <Award size={16} className="text-amber-500" /> Top 2% in Sohna
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Analysis Overlay */}
                {isAnalyzing && (
                    <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 border-4 border-slate-100 border-t-emerald-500 rounded-full animate-spin mb-6"></div>
                        <p className="text-lg font-black text-slate-900 mb-2">{analysisStep}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Running Weighted AI Analysis...</p>
                    </div>
                )}
            </div>

            {/* Dimension Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scoringDimensions.map((dim) => (
                    <div key={dim.id} className="bg-white p-6 rounded-3xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl ${dim.bgColor} ${dim.color} transition-transform group-hover:scale-110 duration-300`}>
                                <dim.icon size={24} strokeWidth={2.5} />
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Weight: {Math.round(dim.weight * 100)}%</p>
                                <p className={`text-2xl font-black ${!isAnalyzing ? 'text-slate-900' : 'text-slate-200'}`}>
                                    {breakdown ? breakdown[dim.id] : 0}%
                                </p>
                            </div>
                        </div>
                        <h3 className="text-sm font-black text-slate-900 mb-1">{dim.label}</h3>
                        <p className="text-xs text-slate-500 font-medium mb-4">{dim.desc}</p>

                        {/* Progress Bar */}
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${dim.barColor} transition-all duration-1000 ease-out`}
                                style={{ width: isAnalyzing ? '0%' : `${breakdown ? breakdown[dim.id] : 0}%` }}
                            ></div>
                        </div>
                    </div>
                ))}

                {/* Benefits / Action Card */}
                <div className="lg:col-span-1 bg-slate-900 rounded-3xl p-6 flex flex-col justify-between text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
                    <div>
                        <h3 className="text-lg font-black mb-2 flex items-center gap-2">
                            <Zap size={20} className="text-amber-400" /> Smart Benefit
                        </h3>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed">
                            Your current score saves you <span className="text-white font-bold">₹4,200 annually</span> in loan interest costs.
                        </p>
                    </div>
                    <button
                        onClick={runAnalysis}
                        disabled={isAnalyzing}
                        className="mt-6 w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                    >
                        <RefreshCcw size={14} className={isAnalyzing ? 'animate-spin' : ''} />
                        Update Profile
                    </button>
                </div>
            </div>

            {/* Verification Footer */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-xl shadow-sm">
                        <AlertCircle size={20} className="text-blue-500" />
                    </div>
                    <div>
                        <p className="text-xs font-black text-slate-900">Blockchain Verified Protocol</p>
                        <p className="text-[10px] font-bold text-slate-400 tracking-wide uppercase">Auth Signature: 0x82...A9B</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-colors">Download Certificate</button>
                    <button className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-colors">Share Report</button>
                </div>
            </div>
        </div>
    );
};

export default AgriTrustScore;
