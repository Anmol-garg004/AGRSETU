import React, { useState, useEffect } from 'react';
import { Gauge, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

const AgriTrustScore = () => {
    const [score, setScore] = useState(780);
    const [history, setHistory] = useState([740, 755, 762, 770, 775, 780]);

    useEffect(() => {
        // Simple animation to "generate" the score on load
        const target = 780;
        let start = 0;
        const interval = setInterval(() => {
            start += 20;
            if (start >= target) {
                setScore(target);
                clearInterval(interval);
            } else {
                setScore(start);
            }
        }, 30);
        return () => clearInterval(interval);
    }, []);

    const getScoreColor = (s) => {
        if (s >= 750) return '#166534'; // Green
        if (s >= 650) return '#ea580c'; // Orange
        return '#dc2626'; // Red
    };

    return (
        <div className="card text-center p-8 bg-white shadow-lg rounded-xl">
            <h3 className="mb-6 text-gray-800">Your Agri-Trust Score</h3>

            <div className="score-circle mb-8 relative w-48 h-48 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="96" cy="96" r="88"
                        stroke="#e5e7eb"
                        strokeWidth="12"
                        fill="transparent"
                    />
                    <circle
                        cx="96" cy="96" r="88"
                        stroke={getScoreColor(score)}
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 88}
                        strokeDashoffset={2 * Math.PI * 88 * (1 - score / 900)}
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-gray-900">{score}</span>
                    <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full mt-2">Excellent</span>
                </div>
            </div>

            <div className="grid grid-2 gap-4 text-left">
                <div className="factor-item p-3 rounded-lg bg-green-50 border border-green-100">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-semibold text-green-800">Yield Consistency</span>
                        <TrendingUp size={16} className="text-green-600" />
                    </div>
                    <p className="text-xs text-green-700">High stability over 3 seasons.</p>
                </div>

                <div className="factor-item p-3 rounded-lg bg-blue-50 border border-blue-100">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-semibold text-blue-800">Satellite Validation</span>
                        <CheckCircleIcon />
                    </div>
                    <p className="text-xs text-blue-700">100% Match with claimed data.</p>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
                <button className="text-blue-600 font-semibold hover:text-blue-800 flex items-center justify-center mx-auto text-sm">
                    View Comprehensive Report <ArrowRight size={16} className="ml-1" />
                </button>
            </div>
        </div>
    );
};

const CheckCircleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

export default AgriTrustScore;
