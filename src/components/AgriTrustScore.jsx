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
        yieldConsistency: 0.95 // 95%
    };

    useEffect(() => {
        // AI Simulation Sequence
        const steps = [
            { msg: 'Fetching Land Records...', delay: 800 },
            { msg: 'Analyzing Satellite Yield Data...', delay: 1800 },
            { msg: 'Verifying Credit History...', delay: 2800 },
            { msg: 'Calculating Trust Vectors...', delay: 3500 },
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
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const finalizeScore = () => {
        // SCORING ALGORITHM
        let computedScore = 0;
        const details = {};

        // 1. Land Stability (Max 300)
        // Base 100 + 40 per acre (capped)
        const landScore = Math.min(300, 100 + (farmerData.landSize * 40));
        computedScore += landScore;
        details.land = Math.round(landScore);

        // 2. Yield Consistency (Max 250)
        // 95% consistency * 250
        const yieldScore = farmerData.yieldConsistency * 250;
        computedScore += yieldScore;
        details.yield = Math.round(yieldScore);

        // 3. Credit History (Max 250)
        // 250 - (50 * defaults)
        const creditScore = Math.max(0, 250 - (farmerData.defaults * 50));
        computedScore += creditScore;
        details.credit = Math.round(creditScore);

        // 4. KYC & Identity (Max 200)
        const kycScore = farmerData.kycVerified ? 200 : 50;
        computedScore += kycScore;
        details.kyc = Math.round(kycScore);

        setBreakdown(details);

        // Animate to final score
        let start = 0;
        const finalScore = Math.round(computedScore);
        const duration = 1000;
        const stepTime = 20;
        const stepValue = finalScore / (duration / stepTime);

        const scoreTimer = setInterval(() => {
            start += stepValue;
            if (start >= finalScore) {
                setScore(finalScore);
                setIsAnalyzing(false);
                clearInterval(scoreTimer);
            } else {
                setScore(Math.round(start));
            }
        }, stepTime);
    };

    const getScoreCategory = (s) => {
        if (s >= 800) return { label: 'Excellent', color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' };
        if (s >= 700) return { label: 'Good', color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' };
        return { label: 'Fair', color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-200' };
    };

    const category = getScoreCategory(score);

    return (
        <div className="card p-0 overflow-hidden border-0 shadow-lg bg-white relative group h-full flex flex-col">
            <div className="p-4 border-b flex justify-between items-center bg-slate-900 text-white">
                <h3 className="m-0 text-sm font-bold flex items-center gap-2">
                    <BrainCircuit size={18} className="text-emerald-400" /> AI Trust Analysis
                </h3>
                <span className="text-[10px] font-bold bg-white/10 px-2 py-1 rounded-lg border border-white/10 uppercase tracking-widest">Live</span>
            </div>

            <div className="p-6 flex-1 flex flex-col items-center justify-center relative overflow-hidden min-h-[300px]">
                {/* Background Glow */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none`}></div>

                <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                    {/* SVG Gauge */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                        {/* Background Track */}
                        <circle cx="100" cy="100" r="85" stroke="#f1f5f9" strokeWidth="10" fill="none" />

                        {/* Progress Arc */}
                        <circle
                            cx="100" cy="100" r="85"
                            stroke={isAnalyzing ? "#10b981" : category.color.replace('text-', '')}
                            strokeWidth="10"
                            strokeLinecap="round"
                            fill="none"
                            strokeDasharray="534"
                            strokeDashoffset={534 - (534 * score) / 1000}
                            className={`${isAnalyzing ? 'animate-pulse' : 'transition-all duration-1000 ease-out'}`}
                            style={{ stroke: isAnalyzing ? undefined : 'url(#gradient)' }}
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#059669" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        {isAnalyzing ? (
                            <div className="flex flex-col items-center animate-pulse">
                                <Loader2 size={32} className="text-emerald-500 animate-spin mb-2" />
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{analysisStep}</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <span className="text-5xl font-black text-slate-800 tracking-tighter loading-none">{score}</span>
                                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${category.bg} ${category.color} mt-1`}>
                                    {category.label}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {!isAnalyzing && breakdown && (
                    <div className="w-full grid grid-cols-2 gap-2 animate-fade-in-up">
                        <ScoreFactor label="Land Assets" value={breakdown.land} max={300} icon={CheckCircle} />
                        <ScoreFactor label="Yield Consistency" value={breakdown.yield} max={250} icon={TrendingUp} />
                        <ScoreFactor label="Credit History" value={breakdown.credit} max={250} icon={ShieldCheck} />
                        <ScoreFactor label="KYC Verified" value={breakdown.kyc} max={200} icon={Award} />
                    </div>
                )}
            </div>

            <div className="p-4 bg-slate-50 border-t mt-auto">
                <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                    {isAnalyzing ? 'Analyzing Data...' : 'Generate New Report'} <ArrowRight size={14} />
                </button>
            </div>
        </div>
    );
};

const ScoreFactor = ({ label, value, max, icon: Icon }) => (
    <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex flex-col items-center text-center">
        <Icon size={14} className="text-emerald-500 mb-1" />
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
        <span className="text-xs font-black text-slate-800">{value}<span className="text-slate-300 text-[9px]">/{max}</span></span>
    </div>
);

export default AgriTrustScore;
