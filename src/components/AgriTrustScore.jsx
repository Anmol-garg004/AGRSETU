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
        <div className="card p-8 fade-in">
            <div className="flex justify-between items-center mb-10">
                <h3 className="m-0 text-slate-900 font-bold flex items-center gap-2">
                    <Zap size={20} className="text-amber-500 fill-amber-500" /> Agri-Trust Score
                </h3>
                <span className="status-badge bg-slate-100 text-slate-500 border-0">V. 2026</span>
            </div>

            <div className="flex flex-col items-center mb-10">
                <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* Background Progress Circle */}
                    <svg className="w-full h-full transform -rotate-[220deg]" viewBox="0 0 224 224">
                        <circle
                            cx="112" cy="112" r="95"
                            stroke="#f1f5f9"
                            strokeWidth="16"
                            strokeLinecap="round"
                            fill="transparent"
                            strokeDasharray="440 600"
                        />
                        {/* Gradient Score Circle */}
                        <defs>
                            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#059669" />
                                <stop offset="100%" stopColor="#10b981" />
                            </linearGradient>
                        </defs>
                        <circle
                            cx="112" cy="112" r="95"
                            stroke="url(#scoreGradient)"
                            strokeWidth="16"
                            strokeLinecap="round"
                            fill="transparent"
                            strokeDasharray="440 600"
                            strokeDashoffset={440 * (1 - score / 900)}
                            className="transition-all duration-1000 ease-out"
                        />
                    </svg>

                    <div className="absolute flex flex-col items-center text-center">
                        <span className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{score}</span>
                        <div style={{ backgroundColor: category.bg, color: category.color }} className="text-[10px] font-black px-3 py-1 rounded-full mt-3 uppercase tracking-widest">
                            {category.label}
                        </div>
                    </div>
                </div>
                <p className="text-xs text-slate-500 mt-4 font-bold text-center">Top 5% of regional productivity</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {[
                    { label: 'Stability', icon: TrendingUp, title: 'Yield Consistency', desc: 'High performance over 5 seasons.', color: 'emerald' },
                    { label: 'Verification', icon: CheckCircle, title: 'Satellite Verified', desc: '100% match with orbital imagery.', color: 'blue' }
                ].map((factor, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{factor.label}</span>
                            <factor.icon size={14} className={`text-${factor.color}-500`} />
                        </div>
                        <h5 className="text-sm font-bold text-slate-800 mb-1">{factor.title}</h5>
                        <p className="text-[11px] text-slate-500 leading-tight">{factor.desc}</p>
                    </div>
                ))}
            </div>

            <button className="btn-premium w-full mt-8 justify-center gap-2 group">
                Full Credit Report
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};

export default AgriTrustScore;

