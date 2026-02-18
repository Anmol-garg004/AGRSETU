import React, { useState, useEffect } from 'react';
import { ShieldCheck, TrendingUp, CheckCircle, ArrowRight, Zap } from 'lucide-react';

const AgriTrustScore = () => {
    const [score, setScore] = useState(0);

    useEffect(() => {
        const target = 780;
        let start = 0;
        const duration = 1500;
        const stepTime = Math.abs(Math.floor(duration / (target / 10)));

        const timer = setInterval(() => {
            start += 10;
            if (start >= target) {
                setScore(target);
                clearInterval(timer);
            } else {
                setScore(start);
            }
        }, stepTime);
        return () => clearInterval(timer);
    }, []);

    const getScoreCategory = (s) => {
        if (s >= 750) return { label: 'Excellent', color: '#10b981', bg: '#ecfdf5' };
        if (s >= 650) return { label: 'Good', color: '#f59e0b', bg: '#fffbeb' };
        return { label: 'Fair', color: '#ef4444', bg: '#fef2f2' };
    };

    const category = getScoreCategory(score);

    return (
        <div className="card shadow-md border-0 bg-white relative overflow-hidden transition-all hover:shadow-xl fade-in">
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <ShieldCheck size={120} />
            </div>

            <div className="flex justify-between items-center mb-8">
                <h3 className="m-0 text-slate-900 font-bold flex items-center gap-2">
                    <Zap size={20} className="text-amber-500 fill-amber-500" /> Agri-Trust Score
                </h3>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded uppercase tracking-widest">Verified 2026</span>
            </div>

            <div className="flex flex-col items-center mb-10">
                <div className="relative w-56 h-56 flex items-center justify-center">
                    {/* Background Progress Circle */}
                    <svg className="w-full h-full transform -rotate-[220deg]">
                        <circle
                            cx="112" cy="112" r="95"
                            stroke="#f1f5f9"
                            strokeWidth="14"
                            strokeLinecap="round"
                            fill="transparent"
                            strokeDasharray="440 600"
                        />
                        {/* Gradient Score Circle */}
                        <defs>
                            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#34d399" />
                            </linearGradient>
                        </defs>
                        <circle
                            cx="112" cy="112" r="95"
                            stroke="url(#scoreGradient)"
                            strokeWidth="14"
                            strokeLinecap="round"
                            fill="transparent"
                            strokeDasharray="440 600"
                            strokeDashoffset={440 * (1 - score / 900)}
                            className="transition-all duration-1000 ease-out"
                        />
                    </svg>

                    <div className="absolute flex flex-col items-center">
                        <span className="text-6xl font-black text-slate-800 tracking-tighter">{score}</span>
                        <div style={{ backgroundColor: category.bg, color: category.color }} className="text-xs font-bold px-3 py-1 rounded-full mt-2 uppercase tracking-wide">
                            {category.label}
                        </div>
                    </div>
                </div>
                <p className="text-sm text-slate-500 mt-2 font-medium">Your financial credibility is in the top 5%</p>
            </div>

            <div className="grid grid-2 gap-4 text-left">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-emerald-200 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Stability</span>
                        <TrendingUp size={14} className="text-emerald-500" />
                    </div>
                    <h5 className="text-sm font-bold text-slate-800 mb-1">Yield Consistency</h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed">High performance maintained over last 5 seasons.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verification</span>
                        <CheckCircle size={14} className="text-blue-500" />
                    </div>
                    <h5 className="text-sm font-bold text-slate-800 mb-1">Satellite Verified</h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed">Farm data 100% matched with orbital imagery.</p>
                </div>
            </div>

            <button className="w-full mt-8 py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all group">
                Access Full Credit Report
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};

export default AgriTrustScore;

