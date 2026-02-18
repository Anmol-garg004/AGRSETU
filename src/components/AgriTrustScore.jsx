import React, { useState, useEffect } from 'react';
import { ShieldCheck, TrendingUp, CheckCircle, ArrowRight, Zap, Award, Activity } from 'lucide-react';

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
        if (s >= 750) return { label: 'Excellent', color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' };
        if (s >= 650) return { label: 'Good', color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' };
        return { label: 'Fair', color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-200' };
    };

    const category = getScoreCategory(score);

    return (
        <div className="card p-0 overflow-hidden border-0 shadow-lg bg-white relative group">
            <div className="p-6 border-b flex justify-between items-center bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                <h3 className="m-0 text-lg font-bold flex items-center gap-2">
                    <Zap size={20} className="text-amber-400 fill-amber-400" /> Agri-Trust Score
                </h3>
                <span className="text-[10px] font-bold bg-white/10 px-2 py-1 rounded-lg border border-white/10 uppercase tracking-widest">v2026.1</span>
            </div>

            <div className="p-8 flex flex-col items-center relative overflow-hidden">
                {/* Background Glow */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none`}></div>

                <div className="relative w-56 h-56 flex items-center justify-center mb-6">
                    {/* SVG Gauge */}
                    <svg className="w-full h-full transform -rotate-[220deg]" viewBox="0 0 224 224">
                        {/* Track */}
                        <circle cx="112" cy="112" r="90" stroke="#f1f5f9" strokeWidth="12" strokeLinecap="round" fill="transparent" strokeDasharray="440 600" />
                        {/* Progress */}
                        <defs>
                            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#059669" />
                            </linearGradient>
                        </defs>
                        <circle
                            cx="112" cy="112" r="90"
                            stroke="url(#scoreGradient)"
                            strokeWidth="12"
                            strokeLinecap="round"
                            fill="transparent"
                            strokeDasharray="440 600"
                            strokeDashoffset={440 * (1 - score / 900)}
                            className="transition-all duration-1000 ease-out"
                        />
                    </svg>

                    <div className="absolute flex flex-col items-center text-center inset-0 justify-center pt-4">
                        <span className="text-6xl font-black text-slate-800 tracking-tighter leading-none mb-1">{score}</span>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${category.bg} ${category.color} ${category.border}`}>
                            {category.label}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center hover:bg-white hover:shadow-md transition-all">
                        <TrendingUp size={16} className="mx-auto text-emerald-500 mb-1" />
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Consistency</p>
                        <p className="text-sm font-black text-slate-700">Top 5%</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center hover:bg-white hover:shadow-md transition-all">
                        <ShieldCheck size={16} className="mx-auto text-blue-500 mb-1" />
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified</p>
                        <p className="text-sm font-black text-slate-700">100%</p>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-slate-50 border-t">
                <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                    View Full Credit Report <ArrowRight size={14} />
                </button>
            </div>
        </div>
    );
};

export default AgriTrustScore;

