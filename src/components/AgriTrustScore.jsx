import React, { useState, useEffect } from 'react';
import { ShieldCheck, TrendingUp, CheckCircle, ArrowRight, Zap, Award, Activity, Loader2, BrainCircuit } from 'lucide-react';

const AgriTrustScore = () => {
    const [score, setScore] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(true);
    const [analysisStep, setAnalysisStep] = useState('Initializing AI Model...');
    const [breakdown, setBreakdown] = useState(null);

    // Simulated Farmer Data
    const farmerData = {
        landSize: 5.2, // Acres
        yearsFarming: 15,
        defaults: 0,
        kycVerified: true,
        yieldConsistency: 0.95, // 95%
        transactionVolume: 'High' // High, Medium, Low
    };

    const runAnalysis = () => {
        setIsAnalyzing(true);
        setScore(0);
        setBreakdown(null);
        setAnalysisStep('Initializing...');

        // AI Simulation Sequence - Faster for better UX
        const steps = [
            { msg: 'Fetching Land Records...', delay: 500 },
            { msg: 'Analyzing Satellite Yield...', delay: 1000 },
            { msg: 'Verifying Credit History...', delay: 1500 },
            { msg: 'Calculating Trust Vectors...', delay: 2000 },
        ];

        let currentStep = 0;

        const interval = setInterval(() => {
            if (currentStep < steps.length) {
                setAnalysisStep(steps[currentStep].msg);
                currentStep++;
            } else {
                clearInterval(interval);
                finalizeScore();
            }
        }, 600);
    };

    useEffect(() => {
        runAnalysis();
    }, []);

    const finalizeScore = () => {
        // Scoring Logic...
        let computedScore = 942; // Keeping it high for demo
        setBreakdown({
            land: 250,
            yield: 190,
            credit: 200,
            kyc: 150,
            transaction: 152
        });

        // Animate to final score
        let start = 0;
        const duration = 1000;
        const stepTime = 20;
        const stepValue = computedScore / (duration / stepTime);

        const scoreTimer = setInterval(() => {
            start += stepValue;
            if (start >= computedScore) {
                setScore(computedScore);
                setIsAnalyzing(false);
                clearInterval(scoreTimer);
            } else {
                setScore(Math.round(start));
            }
        }, stepTime);
    };

    const getScoreCategory = (s) => {
        if (s >= 800) return { label: 'Excellent', color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/50' };
        if (s >= 700) return { label: 'Good', color: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-500/50' };
        return { label: 'Fair', color: 'text-rose-400', bg: 'bg-rose-500/20', border: 'border-rose-500/50' };
    };

    const category = getScoreCategory(score);

    return (
        <div className="relative group overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800">
            {/* Background Effects */}
            <div className={`absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-1000 ${isAnalyzing ? 'scale-110 opacity-50' : 'scale-100 opacity-20'}`}></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>

            <div className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <ShieldCheck className="text-emerald-400" size={20} /> AI Trust Score
                        </h3>
                        <p className="text-slate-400 text-xs mt-1">Real-time creditworthiness</p>
                    </div>
                    {isAnalyzing && (
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700">
                            <Loader2 size={12} className="animate-spin text-emerald-400" />
                            <span className="text-[10px] uppercase font-bold text-slate-300">{analysisStep}</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-center justify-center py-4">
                    <div className="relative w-40 h-40 flex items-center justify-center">
                        {/* SVG Gauge */}
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                            {/* Background Track */}
                            <circle cx="100" cy="100" r="90" stroke="#1e293b" strokeWidth="12" fill="none" />
                            {/* Progress Arc */}
                            <circle
                                cx="100" cy="100" r="90"
                                stroke={isAnalyzing ? "#10b981" : category.color.replace('text-', '')} // This color mapping might need explicit hex codes if tailwind stripping happens, but simple replace works for now
                                strokeWidth="12"
                                strokeLinecap="round"
                                fill="none"
                                strokeDasharray="565"
                                strokeDashoffset={565 - (565 * score) / 1000}
                                className="transition-all duration-1000 ease-out"
                                style={{ stroke: isAnalyzing ? '#10b981' : undefined }} // Fallback
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black text-white">{score}</span>
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded mt-1 bg-white/10 text-emerald-400`}>
                                {category.label}
                            </span>
                        </div>
                    </div>
                </div>

                {!isAnalyzing && breakdown && (
                    <div className="grid grid-cols-2 gap-3 mt-6 animate-fade-in-up">
                        <ScoreFactor label="Land Assets" value={breakdown.land} max={250} icon={CheckCircle} />
                        <ScoreFactor label="Yield Consistency" value={breakdown.yield} max={200} icon={TrendingUp} />
                        <ScoreFactor label="Credit History" value={breakdown.credit} max={200} icon={ShieldCheck} />
                        <ScoreFactor label="Transaction Score" value={breakdown.transaction} max={200} icon={Activity} />
                    </div>
                )}

                <div className="mt-6 pt-4 border-t border-slate-800">
                    <button
                        onClick={() => runAnalysis()}
                        disabled={isAnalyzing}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isAnalyzing ? 'Analyzing...' : <>Refresh Score <Activity size={16} /></>}
                    </button>
                    <p className="text-center text-[10px] text-slate-500 mt-2">Next scheduled update in 14 days</p>
                </div>
            </div>
        </div>
    );
};

const ScoreFactor = ({ label, value, max, icon: Icon }) => (
    <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 flex flex-col items-center text-center hover:bg-slate-800 transition-colors">
        <Icon size={16} className="text-emerald-400 mb-1" />
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</span>
        <span className="text-xs font-bold text-white">{value}<span className="text-slate-500 text-[10px]">/{max}</span></span>
    </div>
);

export default AgriTrustScore;
